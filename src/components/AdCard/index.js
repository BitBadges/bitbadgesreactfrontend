import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withTranslation } from "react-i18next";
import { Gradient, RepeatOneSharp } from "@material-ui/icons";
import axios from "axios";
import { Hidden } from "@material-ui/core";
class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      issuerName: "",
    };
    this.getUsernameFromKeys = this.getUsernameFromKeys.bind(this);
    this.getUsernameFromKeys(this.props.badge.issuer);
  }
  componentWillMount() {}
  /*
let badgeData = {
    
    validDates: req.body.validDates,
    validDateStart: req.body.validDateStart,
    validDateEnd: req.body.validDateEnd,
    backgroundColor: req.body.backgroundColor,
    dateCreated: Date.now(),
  };
  */

  getUsernameFromKeys = async (issuerKey) => {
    let url = `https://us-central1-bitbadges.cloudfunctions.net/api/userName/${issuerKey}`;
    let userName = null;
    await axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        console.log("TEST", response.data);
        this.setState({
          issuerName: response.data.Profile.Username,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.props.badge);
    return (
      <>
        {this.props.badge ? (
          <Card raised style={{ maxWidth: "300px" }}>
            {this.props.badge.imageUrl ? (
              <img
                src={this.props.badge.imageUrl}
                width="200px"
                height="200px"
              />
            ) : (
              <img
                class="default-user"
                style={{
                  background: this.props.badge.backgroundColor,
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/TransparentPlaceholder.png/120px-TransparentPlaceholder.png"
                width="200px"
                height="200px"
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.badge.title}
              </Typography>
              {this.props.badge.preReqs ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>Pre Requisites: </b>
                  {this.props.badge.preReqs}
                </Typography>
              ) : (
                <></>
              )}
              {this.props.badge.validity ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>Validity: </b>
                  {this.props.badge.validity}
                </Typography>
              ) : (
                <></>
              )}
              {this.props.badge.description ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>Description: </b>
                  {this.props.badge.description}
                </Typography>
              ) : (
                <></>
              )}

              <Typography variant="body2" color="textSecondary" component="p">
                <b>ID: </b>
                {this.props.badge.id}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }} spacing="true">
              <Button
                size="small"
                style={{ color: "" }}
                onClick={() =>
                  (window.location.href = `/badgePage/${this.props.badge.id}`)
                }
              >
                View Badge
              </Button>
              <Button
                size="small"
                style={{ color: "" }}
                onClick={() =>
                  (window.location.href = `/user/${this.state.issuerName}`)
                }
              >
                View Issuer Profile
              </Button>
            </CardActions>
          </Card>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default withTranslation()(MediaCard);
