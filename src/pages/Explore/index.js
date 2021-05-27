import React from "react";
import { lazy } from "react";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import PortfolioPage from "../../components/PortfolioPage";
import axios from "axios";
import { Paper, Box, CircularProgress } from "@material-ui/core";

import { Row, Col } from "antd";
import AdPage from "../../components/AdPage";

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));

const List = lazy(() => import("../../common/List"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId: window.location.pathname.split("/")[2],
      badgePages: [],
    };

    this.getBadgeeData = this.getBadgeeData.bind(this);
    this.getBadgeeData();
  }

  getBadgeeData() {
    axios
      .get(`https://us-central1-bitbadges.cloudfunctions.net/api/badgePages`)
      .then((response) => {
        console.log(response);
        let data = response.data;
        this.setState({
          badgePages: data,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Container>
        <ScrollToTop />
        <Box border={5}>
          {!this.state.loading ? (
            <AdPage
              showTitle={true}
              badgePages={this.state.badgePages}
            ></AdPage>
          ) : (
            <p align="center">
              <CircularProgress size={100} />
            </p>
          )}
        </Box>
      </Container>
    );
  }
}

export default User;
