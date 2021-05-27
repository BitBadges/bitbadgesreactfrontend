import React, { lazy } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const EditProfile = lazy(() => import("../../components/EditProfile"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

class EditUser extends React.Component {
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

  getUserProfileData() {
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
  }

  render() {
    return (
      <Container>
        <ScrollToTop />
        {!this.state.loading ? (
          <EditProfile
            portfolioPages={this.state.portfolioPages}
            badgesReceived={this.state.badgesReceived}
          />
        ) : (
          <p align="center">
            <CircularProgress size={100} />
          </p>
        )}
      </Container>
    );
  }
}

export default EditUser;
