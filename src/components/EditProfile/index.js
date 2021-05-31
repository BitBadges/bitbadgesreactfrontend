import { lazy } from "react";
import { Row, Col } from "antd";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";
import BitcloutLogin from "react-bitclout-login";
import useForm from "./useForm";
import validate from "./validationRules";
import * as S from "./styles";
import { Grid, Box } from "@material-ui/core";
import axios from "axios";
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
                  "Show off the badges you have earned! Group certain badges into a page, give it a title and description, and showcase it on your profile!"
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
                    additionalInfo="*Required and must not be same as any of your other page titles"
                  />
                  <ValidationType type="pageTitle" />
                </Col>
                <Col span={24}>
                  <Input
                    type="number"
                    name="pageNum"
                    id="Page Number"
                    placeholder="Enter page number here."
                    value={values.pageNum || ""}
                    onChange={handleChange}
                    additionalInfo="*View your current page numbers below under 'My Pages'. If you have no pages, enter zero as the page number. Otherwise, the page you are creating will be placed at the specified page number and all other pages greater or equal to will be shifted up one location."
                  />
                  <ValidationType type="pageNum" />
                </Col>
                <Col span={24}>
                  <Input
                    type="text"
                    name="description"
                    id="Description"
                    placeholder="Enter short description here"
                    value={values.description || ""}
                    onChange={handleChange}
                  />
                  <ValidationType type="description" />
                </Col>
                <Col span={24}>
                  <TextArea
                    placeholder="Enter a single badge id per line."
                    value={values.badges || ""}
                    name="badges"
                    id="Badges"
                    onChange={handleChange}
                    additionalInfo="*Separate badge IDs with a new line. Badge IDs can be obtained below under 'All Received Badges'. They must be badges that you own.."
                  />
                  <ValidationType type="badges" />
                </Col>

                <S.ButtonContainer>
                  <Button name="submit" type="submit">
                    {t("Submit")}
                  </Button>
                  <p id="issue-submitprofilepage"></p>
                  <p>Please double check everything!</p>
                </S.ButtonContainer>
              </S.FormGroup>
            </Col>
          </Row>
          <hr />
        </S.Contact>

        <Row type="flex" justify="space-between">
          <Col lg={24} md={24} sm={24} xs={24}>
            <PageList
              title="My Pages"
              hashArray={getPageTitleArray()}
            ></PageList>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <PortfolioPage
              portfolioPages={[
                { pageTitle: "All Received Badges", badges: badgesReceived },
              ]}
              showTitle={false}
            />
          </Col>
        </Row>
      </S.ContactContainer>
    </>
  );
};

export default withTranslation()(Contact);
