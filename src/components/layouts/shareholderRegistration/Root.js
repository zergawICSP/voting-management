import React, { Component } from "react";

// EXTERNAL IMPORT
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { Tooltip } from "react-tippy";

// COMPONENT IMPORT
import AppNavigation from "../nav/Nav";
import ShareholderView from "./ViewShareholders";
import { instance } from "../../../api/config";

class Root extends Component {
  // app state value
  state = {
    selectedShareholderData: [],
    isEditingActivated: false,
    totalSubscribedCapital: 0,
    totalPaidCapital: 0,
  };

  // componentDidMount() {
  //   instance.get("/").then((response) => {
  //     this.setState({ totalSubscribedCapital: 10, totalPaidCapital: 10 });
  //   }).catch((error) => { toast.warning("Error while loading summary") });
  // }

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
            pathname: "/register_sharerecord",
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

        {/* <div className="flex flex-row justify-between items-center w-full pr-20 pl-10 mt-5">
          <div className="flex flex-row justify-start space-x-5">
            <p>
              Total subscribed capital:{" "}
              <span className="font-extrabold text-xl">
                {this.state.totalSubscribedCapital}
              </span>
            </p>
            <p>
              Total paid capital: <span className="font-extrabold text-xl">{this.state.totalPaidCapital}</span>
            </p>
          </div>
          <div>
            <Link to="/register_sharerecord">
              <button className="px-5 py-2 bg-transparent shadow-2xl text-white text-md mr-auto border border-primary rounded-md hover:bg-companyYello hover:text-primary">
                Add Share Record
              </button>
            </Link>
          </div>
        </div> */}

        <div className="w-full">
          <ShareholderView onEditButtonClicked={onEditButtonClicked} />
        </div>
      </div>
    );
  }
}

export default Root;
