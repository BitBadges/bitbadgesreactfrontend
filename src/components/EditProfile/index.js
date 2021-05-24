import { lazy } from "react";
import { Row, Col } from "antd";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";
import BitcloutLogin from "react-bitclout-login";
import useForm from "./useForm";
import validate from "./validationRules";
import * as S from "./styles";

const Block = lazy(() => import("../Block"));
const Input = lazy(() => import("../../common/Input"));
const Button = lazy(() => import("../../common/Button"));

const List = lazy(() => import("../../common/List"));
const TextArea = lazy(() => import("../../common/TextArea"));

const Contact = ({ badgesReceived, title, content, id, t }) => {
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

  return (
    <S.ContactContainer id={id}>
      <S.Contact>
        <Row type="flex" justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24}>
            <Block
              padding={true}
              title={"Add a page to your profile"}
              content={
                "Page title and page number are required fields. For reference on badges you have received, scroll down to see all ids of badges you have received. Page number is the order you want your pages to be displayed. Yes, I know this needs to be changed, but think of this like an array starting at index 0 and the pageNum is the index to insert at. "
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
        <Row type="flex" justify="space-between">
          <Col lg={24} md={24} sm={24} xs={24}>
            <List title="Badges Received" hashArray={badgesReceived}></List>
          </Col>
        </Row>
      </S.Contact>
    </S.ContactContainer>
  );
};

export default withTranslation()(Contact);
