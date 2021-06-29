import { lazy, Fragment } from "react";
import { Row, Col } from "antd";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Container = lazy(() => import("../../common/Container"));

const Footer = ({ t }) => {
  const SocialLink = ({ href, src }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
      <Fade bottom>
        <S.Footer>
          <Container>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <S.Language>{t("Contact")}</S.Language>
                <S.Large to="/">{t("Tell us everything")}</S.Large>
                <S.Para>
                  {t(
                    `Do you have any question regarding the project? Feel free to reach out.`
                  )}
                </S.Para>
                <a href="mailto:trevormil@comcast.net">
                  <S.Chat>{t(`Let's Chat`)}</S.Chat>
                </a>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24}>
                <S.Title>{t("BitBadges")}</S.Title>
                <S.Large left="true" to="/about">
                  {t("About")}
                </S.Large>
                <S.Large left="true" to="/vision">
                  {t("Vision and the Future")}
                </S.Large>
                <S.Large left="true" to="/community">
                  {t("Community")}
                </S.Large>
                <S.Large left="true" to="/policies">
                  {t("Policies")}
                </S.Large>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <S.Title>{t("About the Code")}</S.Title>
                <S.LargeTarget
                  left="true"
                  href="https://github.com/trevormil/bitbadgesreactfrontend"
                >
                  {t("View code on GitHub")}
                </S.LargeTarget>
                <S.Large left="true" to="/whitepaper">
                  {t("Whitepaper")}
                </S.Large>
                <S.LargeTarget
                  left="true"
                  href="https://github.com/trevormil/bitbadgesreactfrontend/issues"
                >
                  {t("Report Issues")}
                </S.LargeTarget>
                <S.LargeTarget
                  left="true"
                  href="https://trevormil.gitbook.io/bitbadges/"
                >
                  {t("Documentation")}
                </S.LargeTarget>
              </Col>
              {/*<S.Select>
                  <S.Label htmlFor="select-lang">{t("Language")}</S.Label>
                  <S.LangSelect
                    onChange={handleChange}
                    value={i18n.language}
                    id="select-lang"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </S.LangSelect>
                </S.Select><Col lg={8} md={8} sm={12} xs={24}>
                <S.Title>{t("Policy")}</S.Title>
                <S.Large to="/" left="true">
                  {t("Application Security")}
                </S.Large>
                <S.Large left="true" to="/">
                  {t("Software Principles")}
                </S.Large>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <S.Empty />
                <S.Large left="true" to="/">
                  {t("Support Center")}
                </S.Large>
                <S.Large left="true" to="/">
                  {t("Customer Support")}
                </S.Large>
                  </Col>*/}
            </Row>
            {/*<Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <S.Empty />
                <S.Language>{t("ADDRESS")}</S.Language>
                <S.Para>Rancho Santa Margarita</S.Para>
                <S.Para>2131 Elk Street</S.Para>
                <S.Para>California</S.Para>
              </Col>
                </Row>*/}
          </Container>
        </S.Footer>
        <S.Extra>
          <Container border="true">
            <Row
              type="flex"
              justify="space-between"
              align="middle"
              style={{ paddingTop: "3rem" }}
            >
              <S.NavLink to="/">
                <S.LogoContainer>
                  <img
                    height="90px"
                    src={process.env.PUBLIC_URL + "/img/icons/logo.png"}
                    alt="BitBadges Logo"
                  />
                </S.LogoContainer>
              </S.NavLink>
              <S.FooterContainer>
                <SocialLink
                  href="https://github.com/trevormil"
                  src="github.svg"
                />
                <SocialLink
                  href="https://twitter.com/trevormil23"
                  src="twitter.svg"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/trevor-miller-1110aa1b1/"
                  src="linkedin.svg"
                />
                {/*<SocialLink
                  href="https://bitclout.com/u/trevormil"
                  src="bitclout.svg"
                />*/}
              </S.FooterContainer>
            </Row>
          </Container>
        </S.Extra>
      </Fade>
    </Fragment>
  );
};

export default withTranslation()(Footer);
