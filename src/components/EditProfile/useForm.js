import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);
  function initLogin(accessLevel, JWT) {
    return new Promise(function (resolve, reject) {
      function login() {
        identityWindow = window.open(
          "https://identity.bitclout.com/log-in?accessLevelRequest=" +
            accessLevel,
          null,
          "toolbar=no, width=800, height=1000, top=0, left=0"
        );
      }

      function handleInit(e) {
        if (!init) {
          init = true;

          for (const e of pendingRequests) {
            e.source.postMessage(e, "*");
          }

          pendingRequests = [];
          pm_id = e.data.id;
          source = e.source;
        }
        respond(e.source, e.data.id, {});
      }

      function handleLogin(payload) {
        user = payload["users"][payload.publicKeyAdded];
        user["publicKey"] = payload.publicKeyAdded;
        if (identityWindow) {
          if (JWT === false) {
            identityWindow.close();
            identityWindow = null;
            resolve(user);
          } else {
            var payload = {
              accessLevel: user.accessLevel,
              accessLevelHmac: user.accessLevelHmac,
              encryptedSeedHex: user.encryptedSeedHex,
            };
            source.postMessage(
              {
                id: pm_id,
                service: "identity",
                method: "jwt",
                payload: payload,
              },
              "*"
            );
          }
        }
      }

      function handleJWT(payload) {
        user["jwt"] = payload["jwt"];
        if (identityWindow) {
          identityWindow.close();
          identityWindow = null;
        }
        resolve(user);
      }

      function respond(e, t, n) {
        e.postMessage(
          {
            id: t,
            service: "identity",
          },
          "*"
        );
      }

      window.addEventListener("message", (message) => {
        const {
          data: { id: id, method: method, service: service, payload: payload },
        } = message;
        if (service !== "identity") {
          return;
        }

        if (method == "initialize") {
          handleInit(message);
        } else if (method == "login") {
          handleLogin(payload);
        } else if ("jwt" in payload) {
          handleJWT(payload);
        }
      });

      var init = false;
      var pm_id = "";
      var source = null;
      var user = null;
      var pendingRequests = [];
      var identityWindow = null;
      login();
    });
  }
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description:
        "Your page has been created! You may have to refresh the page to view it.",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));

    // Your url for API

    if (Object.keys(values).length >= 2) {
      initLogin(2, true)
        .then(async (e) => {
          for (let x in e) {
            window.localStorage.setItem(x, e[x]);
          }
          let err = null;
          let url = `https://us-central1-bitbadges.cloudfunctions.net/api/username/${window.localStorage.getItem(
            "publicKey"
          )}`;
          await axios({
            method: "get",
            url: url,
          })
            .then((response) => {
              console.log(response);
              window.localStorage.setItem(
                "username",
                response.data.Profile.Username
              );
            })
            .catch((error) => {
              err = error;
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else {
                console.log(error);
              }
            });
          console.log(err);

          let badgeStr = values.badges;
          if (!badgeStr || badgeStr === "") {
            badgeStr = [];
          } else {
            badgeStr = badgeStr.split("\n");
          }
          if (!values.description) {
            values.description = "";
          }
          console.log(badgeStr);
          url = `https://us-central1-bitbadges.cloudfunctions.net/api/users/portfolioPages`;
          if (err == null) {
            axios({
              method: "post",
              url: url,
              data: {
                pageTitle: values.pageTitle,
                pageNum: Number(values.pageNum),
                badges: badgeStr,
                description: values.description,
                jwt: window.localStorage.getItem("jwt"),
                publickey: window.localStorage.getItem("publicKey"),
              },
            })
              .then((response) => {
                console.log(response);
                setShouldSubmit(true);
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  alert(error.response.data.general);
                } else {
                  alert(error);
                }
                setShouldSubmit(false);
              });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      let url = window.location.href;
      window.location.href = `/user/${window.localStorage.getItem("username")}`;
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
