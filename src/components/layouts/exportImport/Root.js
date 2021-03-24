import React, { Component } from "react";

// External imports
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

// Component imports
import AppNavigation from "../nav/Nav";
import ImportShareholderForm from "./ImportShareholderForm";
import { instance } from "../../../api/config";

class Root extends Component {
  state = {
    selectedExportType: "",
    isExportingLoading: false,
  };

  render() {
    //   Handle on change event
    const handleOnChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const submitExporting = (e) => {
      e.preventDefault();
      const { selectedExportType } = this.state;
      if (selectedExportType !== "") {
        let apiVariable;
        this.setState({ isExportingLoading: true });
        switch (selectedExportType) {
          case "1":
            apiVariable = "shareholders";
            break;
          case "2":
            apiVariable = "delegates";
            break;
          case "3":
            apiVariable = "candidates";
            break;
          case "4":
            apiVariable = "meeting-agenda";
            break;
          default:
            apiVariable = "";
            break;
        }
        instance.get(`/export/${apiVariable}`).then(() =>
          toast.success(
            "File Start Downloading or Prompt it to Start Downloading",
            {
              position: "bottom-center",
            }
          )
        );
      } else {
        toast.error(
          "One or more field is required. Please fill and submit again.",
          { position: "bottom-center" }
        );
      }
      this.setState({ isExportingLoading: false });
    };

    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <AppNavigation />
        <div className="flex flex-col justify-around items-center">
          <div className="m-auto mt-16 flex flex-col justify-center items-center">
            <p className="text-white">Before Importing, Please download and use the below share record entry template</p>
            <a href="..." className="text-white bg-transparent border border-gray-500 rounded-md p-3 mt-4 hover:border-companyYello hover:bg-companyYello hover:text-primary w-1/2" download="Import Template">Download Import Template</a>
          </div>
          <div className="flex flex-row justify-center items-center space-x-5 divide-x-2 divide-white divide-solid mt-24 w-full">
            <div className="w-1/2">
              <p className="text-white font-bold text-2xl">
                Import Share Record Data
              </p>
              <ImportShareholderForm />
            </div>
            <div className="w-1/2">
              <p className="text-white font-bold text-2xl">
                Export Share Record Data
              </p>
              <div className="w-3/4 m-auto text-white mt-10">
                <form onSubmit={submitExporting}>
                  <div className="flex flex-col space-y-4 text-left">
                    <label>Export Share Record Data</label>
                    <select
                      className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                      id="selectedExportType"
                      name="selectedExportType"
                      type="file"
                      value={this.state.selectedExportType}
                      onChange={handleOnChange}
                    >
                      <option value="" className="text-third">
                        Choose your option
                      </option>
                      <option value="1" className="text-third">
                        Shareholders
                      </option>
                      {/* <option value="2" className="text-third">
                      Delegates
                    </option>
                    <option value="3" className="text-third">
                      Candidates
                    </option> */}
                      {/* <option value="4" className="text-third">
                      Meeting Agendas
                    </option> */}
                    </select>
                  </div>
                  {this.state.isExportingLoading ? (
                    <RiseLoader size="15" color="#fff" />
                  ) : (
                    <button
                      className="w-full px-5 py-2 bg-transparent mt-5 text-white rounded-md border border-gray-600 hover:bg-companyYello hover:text-primary shadow-2xl"
                      type="submit"
                    >
                      Export System Data
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
