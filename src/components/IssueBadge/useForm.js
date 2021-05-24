import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [badgeId, setBadgeId] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description:
        "Your page has been created! You may have to refresh the page to view it.",
    });
  };

  const handleSubmit = (event) => {
    let checked = event.target[6].checked;
    let startDate;
    let endDate;
    if (checked) {
      //hardcoded to index 7 and 9 of the form
      startDate = Date.parse(event.target[7].value);
      endDate = Date.parse(event.target[9].value);
    } else {
      startDate = Date.now();
      endDate = 8640000000000000;
    }
    values.validDates = checked;
    values.validDateStart = startDate;
    values.validDateEnd = endDate;
    values.issuer = window.localStorage.getItem("publicKey");
    if (!values.externalUrl) {
      values.externalUrl = "";
    }
    if (!values.imageUrl) {
      values.imageUrl = "";
    }
    if (!values.description) {
      values.description = "";
    }

    event.preventDefault();
    console.log(values);
    setErrors(validate(values));
    // Your url for API
    const url = `https://us-central1-bitbadges.cloudfunctions.net/api/badges`;
    if (Object.keys(values).length >= 2) {
      axios({
        method: "post",
        url: url,
        data: {
          ...values,
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
