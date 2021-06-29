import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

var identityWindow = null;
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
        } else if (method == "login" && !("signedTransactionHex" in payload)) {
          handleLogin(payload);
          identityWindow = window.open(
            `https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif`,
            null,
            "toolbar=no, width=800, height=1000, top=0, left=0"
          );
        } else if ("jwt" in payload) {
          handleJWT(payload);
        }
      });

      var init = false;
      var pm_id = "";
      var source = null;
      var user = null;
      var pendingRequests = [];

      login();
    });
  }
  function initApprove(transactionHex, amountNanos) {
    return new Promise(function (resolve, reject) {
      function approve() {
        identityWindow = window.open(
          `https://identity.bitclout.com/approve?tx=${transactionHex}`,
          null,
          "toolbar=no, width=800, height=1000, top=0, left=0"
        );
      }

      window.addEventListener("message", (message) => {
        const {
          data: { id: id, method: method, service: service, payload: payload },
        } = message;
        if (service !== "identity") {
          return;
        }
        console.log(message);
        if ("signedTransactionHex" in payload && payload.signedTransactionHex) {
          identityWindow.close();
          identityWindow = null;
          resolve([payload.signedTransactionHex, amountNanos]);
        } else if ("signedTransactionHex" in payload) {
          if (identityWindow) {
            identityWindow.close();
          }
          identityWindow = null;
          reject("Error: User denied transaction");
        }
      });
      approve();
    });
  }

  const handleSubmit = async (event) => {
    document.getElementById("issue-submit").innerText =
      "Submitting...Submit button is disabled. Please log in and approve on the pop up window.";
    document.getElementById("submit-button").setAttribute("disabled", true);
    event.preventDefault();

    //set validDates
    let checked = event.target[6].checked;
    let startDate;
    let endDate;
    if (checked) {
      //hardcoded to index 7 and 9 of the form
      startDate = Date.parse(event.target[7].value);
      endDate = Date.parse(event.target[9].value);
    } else {
      //lasts forever
      startDate = Date.now();
      endDate = 8640000000000000;
    }
    values.validDates = checked;
    values.validDateStart = startDate;
    values.validDateEnd = endDate;

    if (typeof values.recipients === "string") {
      values.recipients = values.recipients.split(" ").join("").split(",");
    }

    values.recipients = [...new Set(values.recipients)]; //remove duplicate usernames

    //validate form inputs are correct
    event.preventDefault();
    let errorObj = validate(values); //need this because setErrors() is async
    setErrors(errorObj);

    if (Object.keys(errorObj).length === 0) {
      let transactionHex = null;
      let amountNanos = null;

      let result = window.confirm(
        `Confirm the details of your badge. \nBadges are permanent once issued, so please double check thoroughly.\nBadge will be issued by whatever account is chosen next on the pop up window login page.\nTitle: ${
          values.title
        }\nNum Recipients: ${values.recipients.length}\nCost: ${
          values.recipients.length * 0.005
        } BitClout (plus network fees)\nRecipients: ${
          values.recipients
        }\nValidity: Valid from ${new Date(
          values.validDateStart
        ).toDateString()} to ${new Date(
          values.validDateEnd
        ).toDateString()} \nDescription: ${
          values.description
        }\nBackground Color: ${values.backgroundColor}\nImage URL: ${
          values.imageUrl
        }\nExternal URL: ${values.externalUrl}`
      );
      if (!result) {
        if (identityWindow) {
          identityWindow.close();
        }
        document.getElementById("submit-button").removeAttribute("disabled");
        document.getElementById("issue-submit").innerText = "";
        return;
      }

      //have user log in to verify jwt and set local storage items
      await initLogin(2, true)
        .then(async (e) => {
          for (let x in e) {
            window.localStorage.setItem(x, e[x]);
          }
        })
        //anything beyond here, we should have a valid jwt and publicKey in local storage
        .then(async () => {
          //convert values.recipients string to public key array
          let url = "";
          let recipients = [];
          let usernameCount = 0;
          for (let recipient in values.recipients) {
            recipient = values.recipients[recipient];
            console.log(recipient);
            //if public key, push to final recipients array
            if (recipient.startsWith("BC") || recipient.startsWith("tBC")) {
              recipients.push(recipient);
              continue;
            }

            usernameCount++;
            if (usernameCount > 100) {
              return Promise.reject(
                "Error: You may only use up to 100 usernames. The rest must be public keys."
              );
            }

            //get public keys for all usernames specified
            url = `https://us-central1-bitbadges.cloudfunctions.net/api/publicKey/${recipient}`;
            await axios({
              method: "get",
              url: url,
            })
              .then((response) => {
                if (response.data.error) {
                  return Promise.reject(
                    `Error: Could not get public key for ${recipient}`
                  );
                } else {
                  recipients.push(response.data.Profile.PublicKeyBase58Check);
                }
              })
              .catch((err) => {
                return Promise.reject(
                  `Error: Could not get public key for ${recipient}`
                );
              });
          }
          values.recipients = recipients;
        })
        .then(async () => {
          //get transaction hex for payment per recipient transaction
          let url = `https://us-central1-bitbadges.cloudfunctions.net/api/feeTxn/${window.localStorage.getItem(
            "publicKey"
          )}/${values.recipients.length}`;
          await axios({ method: "get", url: url }).then((response) => {
            transactionHex = response.data.TransactionHex;
            amountNanos = response.data.amountNanos;
            console.log(transactionHex, amountNanos);
            let numNanos = Number(amountNanos);

            if (!transactionHex || isNaN(numNanos) || numNanos < 0) {
              return Promise.reject(
                "Error: Couldn't get transaction hex. This usually means you do not have enough BitClout balance in your account."
              );
            }
          });
        })
        .catch((err) => {
          if (identityWindow) {
            identityWindow.close();
          }
          console.log(err);

          document.getElementById("issue-submit").innerText = "";

          document.getElementById("submit-button").removeAttribute("disabled");
          alert(err);
          return;
        });
      if (!transactionHex) return;
      //approve transaction
      await initApprove(transactionHex, amountNanos)
        .then(async (ret) => {
          let signedHex = ret[0];
          let amountNanos = ret[1];
          document.getElementById("issue-submit").innerText =
            "Transaction Approved. Creating badge.... You will be redirected once badge is created. This may take awhile if you have a high number of recipients.";
          let url = `https://us-central1-bitbadges.cloudfunctions.net/api/badges`;
          await axios({
            method: "post",
            url: url,
            data: {
              ...values,
              issuer: window.localStorage.getItem("publicKey"),
              jwt: window.localStorage.getItem("jwt"),
              publickey: window.localStorage.getItem("publicKey"),
              signedTransactionHex: signedHex,
              amountNanos,
            },
          }).then((response) => {
            if (response.general) {
              setShouldSubmit(false);
              return Promise.reject(`Error: ${response.general}`);
            }
            setBadgeId(response.data.id);
            setShouldSubmit(true);
          });
        })
        .catch((err) => {
          console.log(err);

          if (identityWindow) {
            identityWindow.close();
          }

          document.getElementById("submit-button").removeAttribute("disabled");
          document.getElementById("issue-submit").innerText = "";
          alert(err);
        });
    } else {
      document.getElementById("submit-button").removeAttribute("disabled");
      document.getElementById("issue-submit").innerText = "";
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      window.location.href = `/badge/${badgeId}`;
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
