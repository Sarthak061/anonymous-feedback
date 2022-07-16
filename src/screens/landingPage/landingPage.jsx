import React, { Component } from "react";
import Heading from "../../components/heading/heading";
import SubHeading from "../../components/subHeading/subHeading";
import Button from "../../components/button/button";
import Spacer from "../../components/spacer/spacer";
import "./landingPage.css";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  lpStyle = {
    background: 'url("/assets/images/background.svg")',
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundColor: "#ebfbff",
    overflowX: "hidden",
    minWidth: "100vw",
    minHeight: "100vh",
    userSelect: "none",
  };

  renderContent() {
    return [
      <div className="left" key="landingpage">
        <div className="centered" key="centered">
          <Heading text="nameléss" withIcon="/assets/images/anonymous.png" />
          <Spacer space="20px" />
          <SubHeading text="Anonymous feedback system" size="1.5em" />
          <Spacer space="20px" />
          <SubHeading
            text="🚫 No login required · 🎭 Go Anonymous"
            size="1em"
            color="#263238"
          />
          <Spacer space="20px" />
          <Link
            to={{
              pathname: "/details",
              state: {
                takeFeedback: true,
              },
            }}
          >
            <Button text="Take feedback" />
          </Link>
          <Link
            to={{
              pathname: "/details",
              state: {
                takeFeedback: false,
              },
            }}
          >
            <Button text="Give feedback" />
          </Link>
          <a
            href="https://www.producthunt.com/posts/namelss?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-namelss"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </div>
      </div>,
      <div className="right" key="right">
        <div className="centered">
          <img
            src="/assets/images/users.svg"
            alt="illustration"
            style={{ width: "140%", height: "140%" }}
          />
        </div>
      </div>,
    ];
  }

  render() {
    return (
      <div className="landing-page" style={this.lpStyle}>
        {this.renderContent()}
      </div>
    );
  }
}
