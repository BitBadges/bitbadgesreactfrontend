import { Row, Col } from "antd";
import React, { lazy } from "react";
import { withTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";
import { Paper, Box } from "@material-ui/core";

import * as S from "./styles";
const Button = lazy(() => import("../../common/Button"));

class LeftContentBlock extends React.Component {
  render() {
    return (
      <S.LeftContentBlock>
        <Row type="flex" justify="space-around" align="middle">
          <Col lg={11} md={11} sm={12} xs={24}>
            {this.props.badge.imageUrl ? (
              <img
                src={this.props.badge.imageUrl}
                className="about-block-image"
                width="100%"
                height="100%"
              />
            ) : (
              <Box border={10} borderRadius="5%" color="black">
                <Box
                  border={100}
                  color={this.props.badge.backgroundColor}
                ></Box>
              </Box>
            )}
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <S.ContentWrapper>
              <div align="center">
                <h6>Info</h6>

                {this.props.badge.externalUrl ? (
                  <S.Content>
                    <b>URL: </b>
                    {`${this.props.badge.externalUrl}`}
                  </S.Content>
                ) : (
                  <></>
                )}
                {this.props.badge.description ? (
                  <S.Content>
                    <b>Description: </b>
                    {`${this.props.badge.description}`}
                  </S.Content>
                ) : (
                  <></>
                )}
                <S.Content>
                  <b>Date Created: </b>
                  {`${new Date(this.props.badge.dateCreated).toDateString()}`}
                </S.Content>
                <Button
                  align="center"
                  onClick={() =>
                    (window.location.href = `https://ipfs.infura.io/ipfs/${this.props.badge.id}`)
                  }
                >
                  View on IPFS
                </Button>
              </div>
            </S.ContentWrapper>
          </Col>
        </Row>
      </S.LeftContentBlock>
    );
  }
}

export default withTranslation()(LeftContentBlock);
