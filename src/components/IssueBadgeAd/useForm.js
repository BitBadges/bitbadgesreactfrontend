import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [badgeId, setBadgeId] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.externalUrl) {
      values.externalUrl = "";
    }
    if (!values.imageUrl) {
      values.imageUrl = "";
    }
    if (!values.description) {
      values.description = "";
    }
    if (!values.validity) {
      values.validity = "";
    }
    if (!values.preReqs) {
      values.preReqs = "";
    }

    event.preventDefault();
    console.log(values);
    setErrors(validate(values));

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
          url = `https://us-central1-bitbadges.cloudfunctions.net/api/badgePages`;
          console.log(window.localStorage.getItem("username"));
          if (err == null) {
            axios({
              method: "post",
              url: url,
              data: {
                ...values,
                issuer: window.localStorage.getItem("username"),
                jwt: window.localStorage.getItem("jwt"),
                publickey: window.localStorage.getItem("publicKey"),
              },
            })
              .then((response) => {
                console.log(response);
                setBadgeId(response.data.id);
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
          } else {
            alert("Error: Could not create badge!");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (/*Object.keys(errors).length === 0 && */ shouldSubmit) {
      setValues("");
      window.location.href = `/badgePage/${badgeId}`;
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
