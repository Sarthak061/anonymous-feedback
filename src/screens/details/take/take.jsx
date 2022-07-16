import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../../components/button/button";
import { Redirect } from "react-router-dom";
import { FcPortraitMode } from "react-icons/fc";
import { MdClearAll } from "react-icons/md";
import { nanoid } from "nanoid";
import axios from "axios";
import Urls from "../../../urls";
import LoadingIndicator from "../../../components/loadingIndicator/loadingIndicator";
import ReactTooltip from "react-tooltip";
import { FiHelpCircle } from "react-icons/fi";
import "./take.css";

export default class Take extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: "",
      linkEnabled: false,
      redirect: false,
      error: "",
      roomId: "",
      loading: false,
    };
  }

  validateRoomName(e) {
    if (e.currentTarget.value) {
      this.setState({
        hostName: e.currentTarget.value,
        linkEnabled: true,
      });
    } else {
      this.setState({
        hostName: e.currentTarget.value,
        linkEnabled: false,
      });
    }
  }

  createRoom = async () => {
    await this.setState({ loading: true });

    const uid = nanoid(10);
    var self = this;
    const url = Urls.createRoom(uid);

    await axios
      .post(url, { host: this.state.hostName })
      .then((res) => {
        if (res.data.status === "success") {
          self.setState({ roomId: uid, redirect: true, loading: false });
        } else {
          self.setState({
            error: "😕 Room creation failed, please retry !",
            loading: false,
          });
        }
      })
      .catch((error) => {
        self.setState({
          error: "😕 Room creation failed, please retry !",
          loading: false,
        });
      });
  };

  getRoomID() {
    return this.state.roomId;
  }

  renderContent() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return [
      <p data-tip data-for="giveHelp" className="help-icon" key="giveHelp">
        <FiHelpCircle />
      </p>,
      <TextField
        label="Host name"
        helperText={<HelperText>Be original!</HelperText>}
        onTrailingIconSelect={() => this.setState({ hostName: "" })}
        leadingIcon={<FcPortraitMode />}
        trailingIcon={<MdClearAll />}
        outlined
        key="taketextfield"
      >
        <Input
          value={this.state.hostName}
          onChange={(e) => this.validateRoomName(e)}
        />
      </TextField>,
      <Button
        disabled={this.state.linkEnabled ? false : true}
        text="Create room"
        callback={this.createRoom}
        key="buttontake"
      />,
      this.state.redirect && (
        <Redirect
          key="redirectake"
          to={{
            pathname: "/room/" + this.getRoomID(),
            state: {
              name: this.state.hostName,
              isHost: true,
            },
          }}
        />
      ),
      <p className="give-error" key="takerror">
        {this.state.error}{" "}
      </p>,
      <ReactTooltip
        id="giveHelp"
        place="top"
        effect="solid"
        aria-haspopup="true"
        key="taketooltip"
      >
        <p>Enter host name. Keep it original !</p>
      </ReactTooltip>,
    ];
  }

  render() {
    return <div className="details-action">{this.renderContent()}</div>;
  }
}
