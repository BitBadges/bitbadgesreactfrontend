import React, { lazy } from 'react';
import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';
import Input from '../../common/Input';
import * as S from './styles';

const Button = lazy(() => import('../../common/Button'));

class SearchProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkApi();
  }

  async checkApi() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    await fetch('https://reqbin.com/echo', {
      //mode: 'no-cors',
      headers: headers,
    });
    console.log('fetched');
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }
  render() {
    console.log(this.state.input);
    return (
      <S.SearchProfile>
        <Row type="flex" justify="center" align="middle">
          <Fade bottom>
            <S.ContentWrapper>
              <Col lg={24} md={24} sm={24} xs={24}>
                <h6>{'Enter a BitClout Username'}</h6>
                <Input
                  placeholder="Enter username here"
                  onChange={this.handleChange}
                ></Input>
                <Button
                  name="submit"
                  type="submit"
                  onClick={() =>
                    (window.location.href = `/user/${this.state.input}`)
                  }
                >
                  View profile
                </Button>
                <p>For a sample profile, search for trevormil</p>
              </Col>
            </S.ContentWrapper>
          </Fade>
        </Row>
      </S.SearchProfile>
    );
  }
}

export default withTranslation()(SearchProfile);
