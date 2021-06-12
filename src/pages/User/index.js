import React from "react";
import { lazy } from "react";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import PortfolioPage from "../../components/PortfolioPage";
import axios from "axios";
import { Paper, Box, CircularProgress } from "@material-ui/core";

import { Row, Col } from "antd";

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));

const List = lazy(() => import("../../common/List"));
const AdList = lazy(() => import("../../common/AdList"));

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId: window.location.pathname.split("/")[2],
      badgesCreated: [],
      badgesReceived: [],
      badgesIssued: [],
      portfolioPages: [],
    };

    this.getUserProfileData = this.getUserProfileData.bind(this);

    this.getUserProfileData();
  }

  getUserProfileData = async () => {
    axios
      .get(
        `https://us-central1-bitbadges.cloudfunctions.net/api/users/${this.state.userId}`
      )
      .then((response) => {
        let data = response.data;
        this.setState({
          badgesCreated: data.badgesCreated,
          badgesIssued: data.badgesIssued,
          badgesReceived: data.badgesReceived,
          portfolioPages: data.portfolioPages.sort(
            (a, b) => a.pageNum - b.pageNum
          ),
          loading: false,
        });
      });
  };

  render() {
    return (
      <Container>
        <ScrollToTop />
        {!this.state.loading ? (
          <Box border={5}>
            <PortfolioPage
              showTitle={true}
              portfolioPages={this.state.portfolioPages}
            ></PortfolioPage>
            <Row
              style={{
                margin: "50px 0px",
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
              type="flex"
              justify="space-between"
            >
              <Col lg={11} md={11} sm={12} xs={24}>
                <List
                  title="All Issued Badges"
                  hashArray={this.state.badgesIssued}
                ></List>
              </Col>
              <Col lg={11} md={11} sm={12} xs={24}>
                <List
                  title="All Received Badges"
                  hashArray={this.state.badgesReceived}
                ></List>
              </Col>
            </Row>
          </Box>
        ) : (
          <p align="center">
            <CircularProgress size={100} />
          </p>
        )}
      </Container>
    );
  }
}

export default User;
