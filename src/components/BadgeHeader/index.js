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

const Button = lazy(() => import("../../common/Button"));
const Container = lazy(() => import("../../common/Container"));

class BadgeBlock extends React.Component {
  constructor(props) {
    super(props);
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

            <p align="center">{`Issued by: ${this.props.badge.issuer}`}</p>
            <p align="center">{`Issued to: ${this.props.badge.recipient}`}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default withTranslation()(BadgeBlock);
