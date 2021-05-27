import React, { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { Paper } from "@material-ui/core";
import Slide from "react-reveal/Slide";

import SvgIcon from "../../common/SvgIcon";
import * as S from "./styles";
import DateFnsUtils from "@date-io/date-fns";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";
const Button = lazy(() => import("../../common/Button"));
const Container = lazy(() => import("../../common/Container"));

class BadgeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      recipientName: "",
      issuerName: "",
    };
    this.getUsernameFromKeys = this.getUsernameFromKeys.bind(this);
    this.getUsernameFromKeys(
      this.props.badge.issuer,
      this.props.badge.recipient
    );
  }
  /*
let badgeData = {
    
    validDates: req.body.validDates,
    validDateStart: req.body.validDateStart,
    validDateEnd: req.body.validDateEnd,
    backgroundColor: req.body.backgroundColor,
    dateCreated: Date.now(),
  };
  */

  getUsernameFromKeys = async (issuerKey, recipientKey) => {
    let url = `https://us-central1-bitbadges.cloudfunctions.net/api/userName/${issuerKey}`;
    let userName = null;
    await axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        this.setState({
          issuerName: response.data.Profile.Username,
          loading: false,
        });
        userName = response.data.Profile.Username;
      })
      .catch((err) => {
        console.log(err);
      });
    if (recipientKey) {
      url = `https://us-central1-bitbadges.cloudfunctions.net/api/userName/${recipientKey}`;
      await axios({
        method: "get",
        url: url,
      })
        .then((response) => {
          this.setState({
            recipientName: response.data.Profile.Username,
            loading: false,
          });
          userName = response.data.Profile.Username;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    let currDate = Date.now();
    let validDateStart = this.props.badge.validDateStart;
    let validDateEnd = this.props.badge.validDateEnd;

    let validDateStartStr = new Date(validDateStart).toDateString();
    let validDateEndStr = new Date(validDateEnd).toDateString();
    let valid = currDate >= validDateStart && currDate <= validDateEnd;
    let validColor = valid ? "green" : "red";
    return (
      <div>
        {this.props.badge.issuer ? (
          <>
            <h6 align="center">{this.props.badge.title}</h6>
            {this.props.validDates ? (
              <>
                {valid ? (
                  <div align="center">
                    <CheckCircleIcon
                      align="center"
                      fontSize="large"
                      style={{ color: "green" }}
                    />
                  </div>
                ) : (
                  <div align="center">
                    <ErrorIcon
                      align="center"
                      fontSize="large"
                      style={{ color: "red" }}
                    />
                  </div>
                )}
              </>
            ) : (
              <></>
            )}

            {this.props.badge.validDates ? (
              <p
                align="center"
                color={validColor}
              >{`Valid from ${validDateStartStr} to ${validDateEndStr}`}</p>
            ) : (
              <p
                align="center"
                color={validColor}
              >{`This badge is valid forever!`}</p>
            )}
            {this.props.badge.recipient ? (
              <div display="inline">
                <p align="center">{`Issued by @${this.state.issuerName} to @${this.state.recipientName}`}</p>
                <p align="center">
                  <button
                    onClick={() =>
                      (window.location.href = `/user/${this.state.issuerName}`)
                    }
                  >
                    View Issuer Profile
                  </button>{" "}
                  -{" "}
                  <button
                    onClick={() =>
                      (window.location.href = `/user/${this.state.recipientName}`)
                    }
                  >
                    View Recipient Profile
                  </button>
                </p>
              </div>
            ) : (
              <div display="inline">
                <p align="center">{`Issuer: @${this.state.issuerName}`}</p>
                <p align="center">
                  <button
                    onClick={() =>
                      (window.location.href = `/user/${this.state.issuerName}`)
                    }
                  >
                    View Issuer Profile
                  </button>
                </p>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default withTranslation()(BadgeBlock);
