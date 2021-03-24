import React, { Component } from "react";

// EXTERNAL IMMPORTS
import RiseLoader from "react-spinners/RiseLoader";

import { toast } from "react-toastify";
import { connect } from "react-redux";
// import { Tooltip } from "react-tippy";
// import { BiBarcodeReader } from "react-icons/bi";
// import { BiReset } from "react-icons/bi";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";

// COMPONENT IMPORT
import {
  submittingDelegateRegisteration,
  updatingDelegate,
} from "../../../action/attendantsAction";
import AppNavigation from "../nav/Nav";

class RegisterDelegateForm extends Component {
  state = {
    delegateFullName:
      this.props.location.state &&
      typeof this.props.location.state.selectedDelegateData !== "undefined"
        ? this.props.location.state.selectedDelegateData.name
        : "",
  };
  render() {
    //   local variable
    const {
      isDelegateCreationLoading,
      isDelegateUpdationLoading,
      submittingDelegateRegisteration,
      updatingDelegate,
    } = this.props;

    // validating name input
    const validateName = (delegateFullName) => {
      let letterOnlyValidationRegex = /^[A-Za-z][A-Za-z\s]+$/;
      if (delegateFullName.match(letterOnlyValidationRegex)) return true;
      else return false;
    };

    // Handling onChange of Input Fields
    const handleOnChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    //   Submitting delegate data
    const submitRegisterDelegatedata = (e) => {
      e.preventDefault();
      const { delegateFullName } = this.state;
      if (delegateFullName !== "") {
        if (validateName(delegateFullName)) {
          let cummulativeFormData = {
            name: delegateFullName,
          };
          if (
            this.props.location.state &&
            typeof this.props.location.state.isDelegateEditingActivated !==
              "undefined"
          )
            updatingDelegate(
              cummulativeFormData,
              this.props.location.state.selectedDelegateData.id
            );
          else {
            submittingDelegateRegisteration(cummulativeFormData);
            this.setState({
              delegateFullName: "",
            });
          }
        } else toast.error("Invalid Name Field Entry. Please Correct !");
      } else
        toast.error(
          "One or more fields aren't filled. Please check and submit again !"
        );
    };

    return (
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />
        <p className="text-white font-bold text-xl mt-20">
          {this.props.location.state &&
          typeof this.props.location.state.isEditingActivated !== "undefined"
            ? "Edit Delegate"
            : "Register New Delegate"}
        </p>
        <form className="w-1/2 py-10" onSubmit={submitRegisterDelegatedata}>
          <div className="flex flex-col space-y-6 px-16 m-auto text-left">
            <div className="flex flex-col space-y-4">
              <label>Full Name</label>
              <input
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Full Name"
                id="delegateFullName"
                name="delegateFullName"
                type="text"
                value={this.state.delegateFullName}
                onChange={handleOnChange}
              />
            </div>
            {isDelegateCreationLoading || isDelegateUpdationLoading ? (
              <RiseLoader size="15" color="#fff" className="w-full" />
            ) : (
              <button
                type="submit"
                className="bg-transparent text-white py-2 px-6 rounded-md w-full border border-gray-600 shadow-2xl hover:bg-companyYello hover:text-primary"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDelegateCreationLoading: state.attendant.isDelegateCreationLoading,
    isDelegateUpdationLoading: state.attendant.isDelegateUpdationLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submittingDelegateRegisteration: (delegateInformation) =>
      dispatch(submittingDelegateRegisteration(delegateInformation)),
    updatingDelegate: (delegateInformation, delegateID) =>
      dispatch(updatingDelegate(delegateInformation, delegateID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterDelegateForm);
