import { lazy } from "react";
import { Row, Col } from "antd";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";
import BitcloutLogin from "react-bitclout-login";
import useForm from "./useForm";
import validate from "./validationRules";
import * as S from "./styles";
import { Grid, Box } from "@material-ui/core";
const Block = lazy(() => import("../Block"));
const Input = lazy(() => import("../../common/Input"));
const Button = lazy(() => import("../../common/Button"));

const List = lazy(() => import("../../common/List"));
const PageList = lazy(() => import("../../common/PageList"));
const TextArea = lazy(() => import("../../common/TextArea"));
const PortfolioPage = lazy(() => import("../../components/PortfolioPage"));

const Contact = ({ badgesReceived, portfolioPages, title, content, id, t }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  const ValidationType = ({ type }) => {
    const ErrorMessage = errors[type];
    return errors[type] ? (
      <Zoom cascade>
        <S.Span>{ErrorMessage}</S.Span>
      </Zoom>
    ) : (
      <S.Span />
    );
  };

  const responseClout = (response) => {
    window.localStorage.publicKey = response["publicKey"];
    window.localStorage.jwt = response["jwt"];

    /**
    {
        "hasExtraText": false,
        "publicKey": USER_publicKey,
        "btcDepositAddress": USER_btcDepositAddress,
        "encryptedSeedHex": USER_encryptedSeedHex,
        "network": "mainnet",
        "accessLevel":  USER_accessLevel,
        "accessLevelHmac": USER_accessLevelHmac,
        "jwt": USER_jwt
    }
    */
  };

  const getPageTitleArray = () => {
    console.log(portfolioPages);
    let arr = [];
    let x = 0;
    portfolioPages.forEach((element) => {
      arr.push(`${element.pageTitle} -- Location ${x}`);
      x++;
    });
    console.log(arr);
    return arr;
  };

  return (
    <>
      <S.ContactContainer id={id}>
        <S.Contact>
          <Row type="flex" justify="space-between" align="middle">
            <Col lg={12} md={11} sm={24}>
              <Block
                padding={true}
                title={"Add a page to your profile"}
                content={
                  "Page title and page number are required fields. For reference on badges you have received, scroll down to see all ids of badges you have received. Your page numbers and page locations are also displayed below. Whatever number you enter into the page number field, the newly created page will be placed at that location and all pages greater than or equal to will be shifted up one location."
                }
              />
            </Col>
            <Col lg={12} md={12} sm={24}>
              <S.FormGroup autoComplete="off" onSubmit={handleSubmit}>
                <Col span={24}>
                  <Input
                    type="text"
                    name="pageTitle"
                    id="Page Title"
                    placeholder="Enter page title here"
                    value={values.pageTitle || ""}
                    onChange={handleChange}
                  />
                  <ValidationType type="pageTitle" />
                </Col>
                <Col span={24}>
                  <Input
                    type="number"
                    name="pageNum"
                    id="Page Number"
                    placeholder="Enter page number here"
                    value={values.pageNum || ""}
                    onChange={handleChange}
                  />
                  <ValidationType type="pageNum" />
                </Col>
                <Col span={24}>
                  <TextArea
                    placeholder="Enter a single badge id per line"
                    value={values.badges || ""}
                    name="badges"
                    id="Badges"
                    onChange={handleChange}
                  />
                  <ValidationType type="badges" />
                </Col>

                <S.ButtonContainer>
                  <BitcloutLogin
                    accessLevel={4}
                    onSuccess={responseClout}
                    onFailure={responseClout}
                    // customIcon={<LockOpenIcon/>}
                  />
                  <Button name="submit" type="submit">
                    {t("Submit")}
                  </Button>
                  <p>Before submitting every time, sign in to BitClout!</p>
                </S.ButtonContainer>
              </S.FormGroup>
            </Col>
          </Row>
          <hr />
        </S.Contact>

        <Row type="flex" justify="space-between">
          <Col lg={24} md={24} sm={24} xs={12}>
            <PageList
              title="My Pages"
              hashArray={getPageTitleArray()}
            ></PageList>
          </Col>
          <PortfolioPage
            portfolioPages={[
              { pageTitle: "All Received Badges", badges: badgesReceived },
            ]}
            showTitle={false}
          />

          {/*
          {badgesReceived ? (
            <Col lg={12} md={12} sm={12} xs={24}>
              <h6 align="center">My Badges</h6>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                spacing={3}
                wrap="wrap"
              >
                {badgesReceived.map((badge) => {
                  {
                    console.log(badge);
                  }
                  return (
                    <S.Span>
                      <PortfolioCard badgeId={badge} />;
                    </S.Span>
                  );
                })}
              </Grid>
            </Col>
          ) : (
            <></>
          )}*/}
        </Row>
      </S.ContactContainer>
    </>
  );
};

export default withTranslation()(Contact);
