import React, { Component } from "react";

// EXTERNAL IMPORT
import { Redirect, Link } from "react-router-dom";
import { Tooltip } from "react-tippy";

// COMPONENT IMPORT
import AppNavigation from "../nav/Nav";
import ShareholderView from "./ViewShareholders";

class Root extends Component {
  // app state value
  state = {
    selectedShareholderData: [],
    isEditingActivated: false,
  };

  render() {
    // Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    // callback props function for click event in edit clicked
    const onEditButtonClicked = (selectedShareholderRow) => {
      this.setState({ selectedShareholderData: selectedShareholderRow, isEditingActivated: true }, () => {
        console.log(this.state.selectedShareholderData);
      });
    };

    // checking if editing operation is activated
    if (this.state.isEditingActivated)
      return (
        <Redirect
          to={{
            pathname: "/admin/register",
            state: {
              selectedShareholderData: this.state.selectedShareholderData,
              isEditingActivated: this.state.isEditingActivated,
            },
          }}
        />
      );

    return (
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />

        <div className="mr-auto ml-10">
          <Link to="/admin/register">
              <button className="px-5 py-2 bg-transparent shadow-2xl text-white text-md mr-auto border border-primary rounded-md hover:bg-companyYello hover:text-primary">
                Add Shareholder
              </button>
          </Link>
        </div>

        <div className="w-full">
          <ShareholderView onEditButtonClicked={onEditButtonClicked} />
        </div>
      </div>
    );
  }
}

export default Root;
