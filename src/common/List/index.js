import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox, Paper, IconButton, Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import * as S from "./styles";

const goToBadgePage = (event) => {
  console.log(event);
  window.location.href = `/badge/${event.target.value}`;
};
class HashList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("test");
    return (
      <>
        <S.Container>
          <Paper>
            <h5 align="center">{this.props.title}</h5>

            <List>
              {this.props.hashArray.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                  <>
                    <ListItem key={value} role={undefined}>
                      <ListItemText id={labelId} primary={`${value}`} />
                      {/*<ListItemIcon>
                        <IconButton
                          value={value}
                          onClick={goToBadgePage}
                        ></IconButton>
                      </ListItemIcon>*/}
                      <button value={value} onClick={goToBadgePage}>
                        View
                      </button>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </Paper>
        </S.Container>
      </>
    );
  }
}

export default HashList;
