import React, { Component } from 'react'

// COMPONENT IMPORT
import AppNavigation from "../nav/Nav";
import ViewDelegates from "./ViewDelegates";

// EXTERNAL IMPORT
import {Redirect} from "react-router-dom";

export default class Root extends Component {
  render() {
    // Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    return (
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />

        <div className="w-full">
          <ViewDelegates />
        </div>
      </div>
    );
  }
}
