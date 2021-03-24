import React, { Component } from "react";

// COMPONENT IMPORT
import AppNavigation from "../nav/Nav";
import ViewDelegates from "./ViewDelegates";

// EXTERNAL IMPORT
import { Redirect, Link } from "react-router-dom";

export default class Root extends Component {
  state = { selectedDelegateData: [], isDelegateEditingActivated: false };

  render() {
    // Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    const onEditDelegateButtonClicked = (selectedDelegateData) => {
      this.setState(
        {
          selectedDelegateData: selectedDelegateData,
          isDelegateEditingActivated: true,
        },
        () => {
          console.log(this.state.selectedDelegateData);
        }
      );
    };

    // checking if the edit operation is activated
    if (this.state.isDelegateEditingActivated)
      return (
        <Redirect
          to={{
            pathname: "/register_delegate",
            state: {
              selectedDelegateData: this.state.selectedDelegateData,
              isDelegateEditingActivated: this.state.isDelegateEditingActivated,
            },
          }}
        />
      );

    return (
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />

        <div className="mr-auto ml-10">
          <Link to="/register_delegate">
            <button className="px-5 py-2 bg-transparent shadow-2xl text-white text-md mr-auto border border-primary rounded-md hover:bg-companyYello hover:text-primary">
              Add Delegate
            </button>
          </Link>
        </div>

        <div className="w-full">
          <ViewDelegates onEditDelegateButtonClicked={onEditDelegateButtonClicked} />
        </div>
      </div>
    );
  }
}
