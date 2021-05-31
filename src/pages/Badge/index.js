import React from "react";
import { lazy } from "react";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import PortfolioPage from "../../components/PortfolioPage";
import axios from "axios";
import { Paper, Box, CircularProgress } from "@material-ui/core";

import { Row, Col } from "antd";
import BadgeBody from "../../components/BadgeBody";

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const BadgeHeader = lazy(() => import("../../components/BadgeHeader"));

const List = lazy(() => import("../../common/List"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      badgeId: window.location.pathname.split("/")[2],
      badge: {},
    };

    this.getBadgeData = this.getBadgeData.bind(this);
    this.getBadgeData();
  }

  getBadgeData() {
    axios
      .get(
        `https://us-central1-bitbadges.cloudfunctions.net/api/badges/${this.state.badgeId}`
      )
      .then((response) => {
        let data = response.data;
        this.setState({
          badge: data,
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state.badge);
    return (
      <div border="100px solid black">
        <Container>
          <ScrollToTop />
          {this.state.loading ? (
            <CircularProgress size={100} />
          ) : (
            <Box
              border={5}
              borderRadius={"10%"}
              borderColor={this.state.badge.backgroundColor}
              style={{
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
            >
              <BadgeHeader badge={this.state.badge} />
              <BadgeBody badge={this.state.badge} />
            </Box>
          )}
        </Container>
      </div>
    );
  }
}

export default Badge;
