import { useState, Fragment, lazy } from "react";
import { Row, Col, Drawer } from "antd";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";

import * as S from "./styles";
import BitcloutLogin from "react-bitclout-login";
import axios from "axios";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));
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
const Header = ({ t, signedIn }) => {
  return (
    <S.Header>
      <S.Container>
        <Row type="flex" justify="center" gutter={20}>
          {window.localStorage.getItem("publicKey") ? (
            <div>
              <p align="center">
                Username: {window.localStorage.getItem("username")}
              </p>
              <p align="center">
                Not you?
                <a href="/signin"> Click here to sign in to a new account</a>
              </p>
            </div>
          ) : (
            <div>
              <p align="center">
                Looks like you aren't signed in to BitClout! Sign in here:
              </p>
              <p align="center">
                <BitcloutLogin
                  accessLevel={2}
                  onSuccess={responseClout}
                  onFailure={responseClout}
                  // customIcon={<LockOpenIcon/>}
                />
              </p>
            </div>
          )}
          <br />
        </Row>
      </S.Container>
    </S.Header>
  );
};

export default withTranslation()(Header);
