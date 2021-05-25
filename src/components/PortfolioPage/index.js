import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { Paper, Grid, Card, Box } from "@material-ui/core";

import * as S from "./styles";

const Button = lazy(() => import("../../common/Button"));
const PortfolioCard = lazy(() => import("../../components/PortfolioCard"));

const PortfolioPage = ({
  title,
  showTitle,
  content,
  button,
  t,
  portfolioPages,
}) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const getEditProfile = () => {
    let jsx =
      window.localStorage.getItem("username") === getUserId() ? (
        <>
          <Button
            name="submit"
            type="submit"
            onClick={() =>
              (window.location.href = window.location.href + "/edit")
            }
          >
            Edit Profile
          </Button>
        </>
      ) : (
        <></>
      );
    return jsx;
  };

  const getBitcloutProfile = () => {
    let jsx = window.localStorage.getItem("username") ? (
      <>
        <Button
          name="submit"
          type="submit"
          onClick={() =>
            (window.location.href = `https://bitclout.com/u/${getUserId()}`)
          }
        >
          View BitClout Profile
        </Button>
      </>
    ) : (
      <></>
    );
    return jsx;
  };

  const getUserId = () => {
    return window.location.pathname.split("/")[2];
  };
  return (
    <>
      {!portfolioPages || portfolioPages.length === 0 ? (
        <>
          <S.PortfolioPage>
            <Row type="flex" justify="center" align="middle">
              <S.ContentWrapper>
                <h6>Profile: {getUserId()}</h6>
                <p>Oh no! This user has not customized their profile yet!</p>
              </S.ContentWrapper>
            </Row>
          </S.PortfolioPage>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
            spacing={3}
            wrap="wrap"
          >
            {getEditProfile()}
            {getBitcloutProfile()}
          </Grid>
        </>
      ) : (
        <>
          {showTitle ? (
            <>
              <S.PortfolioPage>
                <Row type="flex" justify="center" align="middle">
                  <S.ContentWrapper>
                    <h6>Profile: {getUserId()}</h6>
                  </S.ContentWrapper>
                </Row>
              </S.PortfolioPage>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                spacing={3}
                wrap="wrap"
              >
                {getEditProfile()}
                {getBitcloutProfile()}
              </Grid>
            </>
          ) : (
            <></>
          )}
          {console.log(portfolioPages)}
          {portfolioPages.map((pageObject) => {
            return (
              <div key={pageObject.pageTitle}>
                <Paper elevation={1}>
                  <S.PortfolioPage>
                    <Row type="flex" justify="center" align="middle">
                      <Fade bottom>
                        <S.ContentWrapper>
                          <S.Content>
                            <h6>{pageObject.pageTitle}</h6>
                          </S.Content>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            spacing={3}
                            wrap="wrap"
                          >
                            {pageObject.badges.map((badge) => {
                              {
                                console.log(badge);
                              }
                              return (
                                <S.Content>
                                  <PortfolioCard
                                    badgeId={badge}
                                  ></PortfolioCard>
                                </S.Content>
                              );
                            })}
                          </Grid>
                        </S.ContentWrapper>
                      </Fade>
                    </Row>
                  </S.PortfolioPage>
                </Paper>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default withTranslation()(PortfolioPage);
