import React, { lazy } from "react";
import { Row, Col } from "antd";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";
import { Checkbox } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import BitcloutLogin from "react-bitclout-login";
import useForm from "./useForm";
import validate from "./validationRules";
import axios from "axios";
import * as S from "./styles";

const Block = lazy(() => import("../Block"));
const Input = lazy(() => import("../../common/Input"));
const Button = lazy(() => import("../../common/Button"));
const TextArea = lazy(() => import("../../common/TextArea"));

const IssueBadge = ({ title, content, id, t }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);
  const [checked, setChecked] = React.useState(false);

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

  const [selectedStartDate, setSelectedStartDate] = React.useState(Date.now());
  const [selectedEndDate, setSelectedEndDate] = React.useState(Date.now());

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <S.IssueBadgeContainer id={id}>
      <S.IssueBadge>
        <hr />
        <Row type="flex" justify="center" align="middle">
          <S.FormGroup autoComplete="off" onSubmit={handleSubmit}>
            <p>
              <h6 align="center">Get Public Keys of HODLers</h6>
              <p align="center">
                This will get the public keys of the hodlers of the account you
                are signed into: {window.localStorage.getItem("username")}
              </p>
              <Col span={24}>
                <Input
                  type="number"
                  name="numHodlers"
                  id="Number of Hodlers"
                  placeholder=""
                  value={values.numHodlers || ""}
                  onChange={handleChange}
                />
                <ValidationType type="numHodlers" />
              </Col>
              <S.ButtonContainer>
                <p align="center">
                  <Button name="submit" type="submit">
                    {t("Submit")}
                  </Button>
                </p>
              </S.ButtonContainer>

              <p align="center" id="hodler-result-instructions"></p>
              <p align="center" id="hodler-result"></p>
            </p>
          </S.FormGroup>
        </Row>
      </S.IssueBadge>
    </S.IssueBadgeContainer>
  );
};

export default withTranslation()(IssueBadge);
