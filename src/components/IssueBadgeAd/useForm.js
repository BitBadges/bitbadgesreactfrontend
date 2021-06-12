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
    document.getElementById("issue-submitad").innerText =
      "Submitting... Don't press submit button again";

    document.getElementById("submit-ad-button").setAttribute("disabled", true);
    event.preventDefault();

    let errorObj = validate(values);
    setErrors(errorObj);

    if (Object.keys(errorObj).length === 0) {
      let result = window.confirm(
        `Confirm the details of your badge ad. \nAd will be issued by whatever account is chosen next on the pop up window login page.\nTitle: ${values.title}\nValidity: ${values.validity}\nPre Requisities: ${values.preReqs}\nDescription: ${values.description}\nBackground Color: ${values.backgroundColor}\nImage URL: ${values.imageUrl}\nExternal URL: ${values.externalUrl}`
      );
      if (!result) {
        document.getElementById("issue-submitad").innerText = "";
        document.getElementById("submit-ad-button").removeAttribute("disabled");
        return;
      }
      initLogin(2, true)
        .then(async (e) => {
          for (let x in e) {
            window.localStorage.setItem(x, e[x]);
          }
        })
        .then(async () => {
          let url = `https://us-central1-bitbadges.cloudfunctions.net/api/badgePages`;
          await axios({
            method: "post",
            url: url,
            data: {
              ...values,
              issuer: window.localStorage.getItem("publicKey"),
              jwt: window.localStorage.getItem("jwt"),
              publickey: window.localStorage.getItem("publicKey"),
            },
          }).then((response) => {
            if (response.data.general) {
              setShouldSubmit(false);
              return Promise.reject(
                `Could not create badge page: ${response.data.general}`
              );
            }
            setBadgeId(response.data.id);
            setShouldSubmit(true);
          });
        })
        .catch((err) => {
          console.log(err);
          alert(`Error: ${err}`);

          document.getElementById("issue-submitad").innerText = "";
          document
            .getElementById("submit-ad-button")
            .removeAttribute("disabled");
        });
    } else {
      document.getElementById("issue-submitad").innerText = "";
      document.getElementById("submit-ad-button").removeAttribute("disabled");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
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
