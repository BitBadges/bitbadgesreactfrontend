import { useState, Fragment, lazy } from "react";
import { Row, Col, Drawer } from "antd";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";

import * as S from "./styles";
import BitcloutLogin from "react-bitclout-login";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));
const responseClout = (response) => {
  window.localStorage.publicKey = response["publicKey"];
  window.localStorage.jwt = response["jwt"];
};
const Header = ({ t }) => {
  return (
    <S.Header>
      <S.Container>
        <Row type="flex" justify="center" gutter={20}>
          <h6 align="center">
            Looks like you aren't signed in to BitClout! Sign in here:
          </h6>
          <BitcloutLogin
            accessLevel={4}
            onSuccess={responseClout}
            onFailure={responseClout}
            // customIcon={<LockOpenIcon/>}
          />
        </Row>
      </S.Container>
    </S.Header>
  );
};

export default withTranslation()(Header);
