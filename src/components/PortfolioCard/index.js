import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "react-i18next";
import { Gradient, RepeatOneSharp } from "@material-ui/icons";
import axios from "axios";
import { Hidden } from "@material-ui/core";
class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      badgeId: this.props.badgeId,
      badgeData: {},
      issuerName: "",
    };

    this.getBadgeData = this.getBadgeData.bind(this);

    this.getUsernameFromKeys = this.getUsernameFromKeys.bind(this);
  }
  async componentWillMount() {
    await this.getBadgeData();
    await this.getUsernameFromKeys(this.state.badgeData.issuer);
    this.setState({ loading: false });
  }
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
        });
      })
      .catch((err) => console.log(err));
  };

  async getBadgeData() {
    await axios
      .get(
        `https://us-central1-bitbadges.cloudfunctions.net/api/badges/${this.state.badgeId}`
      )
      .then((response) => {
        this.setState({
          badgeData: response.data,
        });
      });
  }

  render() {
    console.log(this.state.badgeData);
    return (
      <Card
        raised
        style={{
          maxWidth: "300px",
          overflowWrap: "break-word",
          wordWrap: "break-word",
        }}
      >
        {!this.state.loading ? (
          <>
            {this.state.badgeData.imageUrl ? (
              <img
                src={this.state.badgeData.imageUrl}
                width="200px"
                height="200px"
              />
            ) : (
              <img
                class="default-user"
                style={{
                  background: this.state.badgeData.backgroundColor,
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/TransparentPlaceholder.png/120px-TransparentPlaceholder.png"
                width="200px"
                height="200px"
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.badgeData.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Description: </b>
                {this.state.badgeData.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>ID: </b>
                {this.state.badgeData.id}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }} spacing="true">
              <Button
                size="small"
                style={{ color: "" }}
                onClick={() =>
                  (window.location.href = `/badge/${this.state.badgeData.id}`)
                }
              >
                View Badge
              </Button>
              <Button
                size="small"
                style={{ color: "" }}
                onClick={() =>
                  (window.location.href = `/user/${this.state.badgeData.issuer}`)
                }
              >
                View Issuer Profile
              </Button>
            </CardActions>
          </>
        ) : (
          <p align="center">
            <CircularProgress size={30} />
          </p>
        )}
      </Card>
    );
  }
}

export default withTranslation()(MediaCard);
