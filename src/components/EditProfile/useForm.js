import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

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
    const url = `https://us-central1-bitbadges.cloudfunctions.net/api/users/portfolioPages`;
    if (Object.keys(values).length >= 2) {
      let badgeStr = values.badges;
      if (!badgeStr || badgeStr === "") {
        badgeStr = [];
      } else {
        badgeStr = badgeStr.split("\n");
      }
      console.log(badgeStr);
      axios({
        method: "post",
        url: url,
        data: {
          pageTitle: values.pageTitle,
          pageNum: Number(values.pageNum),
          badges: badgeStr,
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
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      let url = window.location.href;
      window.location.href = url.substring(0, url.lastIndexOf("/"));
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
