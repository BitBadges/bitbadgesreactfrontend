import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { Paper, Grid, Card, Box } from "@material-ui/core";

import * as S from "./styles";

const Button = lazy(() => import("../../common/Button"));
const AdCard = lazy(() => import("../AdCard"));

const PortfolioPage = ({
  title,
  showTitle,
  content,
  button,
  t,
  badgePages,
}) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const getUserId = () => {
    return window.location.pathname.split("/")[2];
  };
  return (
    <>
      {!badgePages || badgePages.length === 0 ? (
        <>
          <S.PortfolioPage>
            <Row type="flex" justify="center" align="middle">
              <S.ContentWrapper>
                <h6>Explore!</h6>
              </S.ContentWrapper>
            </Row>
          </S.PortfolioPage>
        </>
      ) : (
        <>
          {showTitle ? (
            <>
              <S.PortfolioPage>
                <Row type="flex" justify="center" align="middle">
                  <S.ContentWrapper>
                    <h6>Explore!</h6>
                  </S.ContentWrapper>
                </Row>
              </S.PortfolioPage>
            </>
          ) : (
            <></>
          )}
          {console.log(badgePages)}
          <Paper elevation={1}>
            <S.PortfolioPage>
              <Row type="flex" justify="center" align="middle">
                <Fade bottom>
                  <S.ContentWrapper>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      alignContent="center"
                      spacing={3}
                      wrap="wrap"
                    >
                      {badgePages.map((badge) => {
                        {
                          console.log(badge);
                        }
                        return (
                          <S.Content>
                            <AdCard badge={badge}></AdCard>
                          </S.Content>
                        );
                      })}
                    </Grid>
                  </S.ContentWrapper>
                </Fade>
              </Row>
            </S.PortfolioPage>
          </Paper>
        </>
      )}
    </>
  );
};

export default withTranslation()(PortfolioPage);
