import React, { Component } from "react";

// EXTERNAL IMPORTS
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { hashString } from "react-hash-string";

// COMPONENT IMPORTS
import LoginForm from "./LoginForm";

// IMAGE IMPORTS
import CompanyLogo from "../../../assets/images/Zergaw ISP Logo.png";
import BrandingImage from "../../../assets/images/Zerga ISP Branding.png";

class Root extends Component {
  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      if (localStorage.getItem("isAdmin") === hashString(`"1"`).toString())
        return <Redirect to="/admin" />;
      else if (localStorage.getItem("isAdmin") === hashString(`"2"`).toString())
        return <Redirect to="/delegate_home" />;
      else return <Redirect to="/home" />;
    }

    if (localStorage.getItem("username")) {
      if (localStorage.getItem("isAdmin") === hashString(`"1"`).toString())
        return <Redirect to="/admin" />;
      else if (localStorage.getItem("isAdmin") === hashString(`"2"`).toString())
        return <Redirect to="/delegate_home" />;
      else return <Redirect to="/home" />;
    }

    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <div className="md:w-1/2 xl:w-1/3 p-5 rounded-2xl shadow-2xl">
          <img
            src={CompanyLogo}
            alt="Zergaw ISP Logo"
            className="w-24 m-auto pt-10"
          />
          {/* Login Form Layout */}
          <LoginForm />
        </div>

        {/* Powered by */}
        <p className="text-white mt-20 md:mt-0 md:absolute bottom-0 pb-5 font-light">
          Powered by{" "}
          <span className="font-bold text-companyYello">Zergaw ISP</span>
        </p>

        {/* Branding Zergaw ISP */}
        <img
          src={BrandingImage}
          alt="Zergaw ISP Branding"
          className="absolute bottom-0 left-0 z-0 h-5/6"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Root);
