import { lazy } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import BitcloutLogin from "react-bitclout-login";
import axios from "axios";

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const responseClout = (response) => {
  for (let x in response) {
    window.localStorage.setItem(x, response[x]);
  }

  const url = `https://us-central1-bitbadges.cloudfunctions.net/api/username/${window.localStorage.getItem(
    "publicKey"
  )}`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      console.log(response);
      window.localStorage.setItem("username", response.data.Profile.Username);
      window.location.href = "/home";
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error);
      }
    });
};

const Explore = () => {
  return (
    <Container>
      <div align="center">
        <BitcloutLogin
          onFailure={responseClout}
          onSuccess={responseClout}
          accessLevel={2}
          JWT={true}
        />
      </div>
    </Container>
  );
};

export default Explore;
