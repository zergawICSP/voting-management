import React, { Component } from "react";

// EXTERNAL IMPORTS
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// COMPONENT IMPORTS
import LoginForm from "./LoginForm";

// IMAGE IMPORTS

class Root extends Component {
  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      if (localStorage.getItem("isAdmin") === "1") return <Redirect to="/register" />;
      else return <Redirect to="/home" />;
    }

    if (localStorage.getItem("username")) {
      if (localStorage.getItem("isAdmin") === "1") return <Redirect to="/register" />;
      else return <Redirect to="/home" />;
    }

    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <div className="md:w-1/2 xl:w-1/3 p-5 rounded-2xl shadow-2xl">
          <p className="text-5xl text-white font-bold mt-10">Welcome</p>

          {/* Login Form Layout */}
          <LoginForm />
        </div>

        {/* POwered by */}
        <p className="text-white mt-20 md:mt-0 md:absolute bottom-0 pb-5 font-light">
          Powered by <span className="font-bold">Zergaw ISP</span>
        </p>
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
