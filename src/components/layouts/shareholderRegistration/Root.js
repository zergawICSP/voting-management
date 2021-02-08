import React, { Component } from "react";

// EXTERNAL IMPORT
import { Redirect } from "react-router-dom";

// COMPONENT IMPORT
import AppNavigation from "../nav/Nav";
import ShareholderRegistrationForm from "./RegisterShareholderForm";

class Root extends Component {
  render() {
    // Route Guarding
    // if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    return (
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />
        <div className="w-4/5 xl:w-2/3 p-5 rounded-2xl shadow-2xl flex flex-col justify-center mt-10 mb-10">
          <p className="font-bold text-3xl pt-10">Register New Shareholder</p>
          <ShareholderRegistrationForm />
        </div>

        {/* POwered by */}
        {/* <p className="text-white mt-20 md:mt-0 md:absolute bottom-0 pb-5 font-light">
          Powered by <span className="font-bold">Zergaw ISP</span>
        </p> */}
      </div>
    );
  }
}

export default Root;
