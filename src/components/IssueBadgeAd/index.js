import React, { lazy } from 'react';
import { Row, Col } from 'antd';
import Zoom from 'react-reveal/Zoom';
import { withTranslation } from 'react-i18next';
import { Checkbox } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import BitcloutLogin from 'react-bitclout-login';
import useForm from './useForm';
import validate from './validationRules';
import axios from 'axios';
import * as S from './styles';

const Block = lazy(() => import('../Block'));
const Input = lazy(() => import('../../common/Input'));
const Button = lazy(() => import('../../common/Button'));
const TextArea = lazy(() => import('../../common/TextArea'));

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
        <Row type="flex" justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24}>
            <Block
              padding={true}
              title={'Advertise your badge!'}
              content={
                'Have an idea for a badge in mind? Get it out to the public by advertising it. Explain what the badge is and what needs to be done to obtain it. You can create a badge ad for any service you want to offer or any appreciation you want to give out. Some examples may include creating a badge for completion of the course you are teaching, a gym membership, or an employee of the month award!'
              }
            />
            <img src="https://bitbadges.s3.amazonaws.com/badge.png"></img>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <S.FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="title"
                  id="Title"
                  placeholder=""
                  value={values.title || ''}
                  onChange={handleChange}
                />
                <ValidationType type="title" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Validity"
                  id="Validity"
                  placeholder=""
                  value={values.validity || ''}
                  onChange={handleChange}
                  additionalInfo="*Explain how long the badge is valid for"
                />
                <ValidationType type="validity" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="preReqs"
                  id="Pre-Requisites"
                  placeholder=""
                  value={values.preReqs || ''}
                  onChange={handleChange}
                  additionalInfo="*What needs to be done to obtain the badge"
                />
                <ValidationType type="preReqs" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="imageUrl"
                  id="Image URL"
                  placeholder=""
                  value={values.imageUrl || ''}
                  onChange={handleChange}
                />
                <ValidationType type="imageUrl" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="externalUrl"
                  id="External URL"
                  placeholder=""
                  value={values.externalUrl || ''}
                  onChange={handleChange}
                />
                <ValidationType type="externalUrl" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="backgroundColor"
                  id="Background Color"
                  placeholder=""
                  value={values.backgroundColor || ''}
                  onChange={handleChange}
                  additionalInfo="*Background colors must be a hex value in format '#FFFFFF' or a valid HTML color name. Visit www.w3schools.com/colors/colors_names.asp for more info. Defaults to black."
                />
                <ValidationType type="backgroundColor" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder=""
                  value={values.description || ''}
                  name="description"
                  id="Description"
                  onChange={handleChange}
                  additionalInfo="*Add all additional details you wish to provide here like how to claim the badge, how to contact you, or anything else you want to say about the badge."
                />
                <ValidationType type="description" />
              </Col>
              <S.ButtonContainer>
                <Button name="submit" type="submit" id="submit-ad-button">
                  {t('Submit')}
                </Button>
                <p>
                  <b id="issue-submitad">
                    
                  </b>
                </p>
              </S.ButtonContainer>
            </S.FormGroup>
          </Col>
        </Row>
      </S.IssueBadge>
    </S.IssueBadgeContainer>
  );
};

export default withTranslation()(IssueBadge);
