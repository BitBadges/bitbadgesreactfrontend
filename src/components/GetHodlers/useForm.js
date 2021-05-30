import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(values));
    values.numHodlers = Number(values.numHodlers);

    if (Object.keys(values).length > 0) {
      let url = `https://us-central1-bitbadges.cloudfunctions.net/api/hodlers`;
      let hodlerArr = [];
      await axios({
        method: "post",
        url: url,
        data: {
          NumToFetch: values.numHodlers,
          Username: window.localStorage.getItem("username"),
        },
      })
        .then((response) => {
          console.log(response);
          response.data.Hodlers.forEach((hodler) => {
            if (hodler.ProfileEntryResponse) {
              hodlerArr.push(hodler.ProfileEntryResponse.Username);
            } else {
              hodlerArr.push(hodler.HODLerPublicKeyBase58Check);
            }
          });
          document.getElementById("hodler-result-instructions").innerText =
            "Copy and paste the following into the recipients box above:";

          document.getElementById("hodler-result").innerText = hodlerArr
            .toString()
            .split(",")
            .join(", ");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.data);
          } else {
            console.log(error);

            alert(error);
          }
        });
    }
  };

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
