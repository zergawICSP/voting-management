import React, { Component } from "react";

// EXTERNAL IMMPORTS
import RiseLoader from "react-spinners/RiseLoader";
import { BiBarcodeReader } from "react-icons/bi";
import { BiReset } from "react-icons/bi";
import { toast } from "react-toastify";
import { Tooltip } from "react-tippy";
import { connect } from "react-redux";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

// COMPONENT IMPORT
import {
  submittingShareholderRegistration,
  updatingShareholder,
} from "../../../action/attendantsAction";
import AppNavigation from "../nav/Nav";

class RegisterShareholderForm extends Component {
  state = {
    userScannedBarcode:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.barcode
        : "",
    toggelingCamera: "",
    userFullName:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.name
        : "",
    userPhoneNumber:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.phone
        : "",
    userNumberOfShares:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.no_of_shares
        : "",
  };

  render() {
    // Local variables
    const {
      isShareholderCreationLoading,
      isShareholderUpdationLoading,
      submittingShareholderRegistration,
      updatingShareholder,
    } = this.props;

    // Validating name input
    const validateName = (userFullName) => {
      let letterOnlyValidationRegex = /^[A-Za-z][A-Za-z\s]+$/;
      if (userFullName.match(letterOnlyValidationRegex)) return true;
      else return false;
    };

    // Handling onChange of Input Fields
    const handleOnChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    // Submitting shareholder data
    const submitRegisterShareholderData = (e) => {
      e.preventDefault();
      const {
        userScannedBarcode,
        userFullName,
        userPhoneNumber,
        userNumberOfShares,
      } = this.state;
      if (
        userScannedBarcode !== "" &&
        userFullName !== "" &&
        userPhoneNumber !== "" &&
        userNumberOfShares !== ""
      ) {
        if (validateName(userFullName)) {
          let cummulativeFormData = {
            name: userFullName,
            no_of_shares: userNumberOfShares,
            phone: userPhoneNumber,
            barcode: userScannedBarcode,
          };
          if (
            this.props.location.state &&
            typeof this.props.location.state.isEditingActivated !== "undefined"
          )
            updatingShareholder(
              cummulativeFormData,
              this.props.location.state.selectedShareholderData.id
            );
          else submittingShareholderRegistration(cummulativeFormData);
          this.setState({
            userFullName: "",
            userPhoneNumber: "",
            userNumberOfShares: "",
            userScannedBarcode: "",
          });
        } else toast.error("Invalid Name Field Entry. Please Correct !");
      } else {
        toast.error(
          "One or more fields aren't filled. Please check and submit again !"
        );
      }
    };

    return (
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />
        <p className="text-white font-bold text-xl mt-20">
          Register New Shareholder
        </p>
        <form className="w-1/2 py-10" onSubmit={submitRegisterShareholderData}>
          <div className="flex flex-col space-y-6 px-16 m-auto text-left">
            <div className="flex flex-col space-y-4">
              <label>Full Name</label>
              <input
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Full Name"
                id="userFullName"
                name="userFullName"
                type="text"
                value={this.state.userFullName}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label>Number of Share</label>
              <input
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Number of Share"
                id="userNumberOfShares"
                name="userNumberOfShares"
                type="number"
                value={this.state.userNumberOfShares}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label>Phone Number</label>
              <input
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Phone Number"
                id="userPhoneNumber"
                name="userPhoneNumber"
                type="text"
                value={this.state.userPhoneNumber}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <div className="flex flex-col space-y-2 w-2/3">
                <label>Barcode</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter barcode"
                  id="userScannedBarcode"
                  name="userScannedBarcode"
                  type="text"
                  onChange={handleOnChange}
                  value={
                    this.state.userScannedBarcode !== ""
                      ? this.state.userScannedBarcode
                      : null
                  }
                />
              </div>
              <Tooltip title="Scan Barcode">
                <button
                  className="px-2 py-2 bg-white text-third rounded-2xl mt-8"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      toggelingCamera: !this.state.toggelingCamera,
                    });
                  }}
                >
                  <BiBarcodeReader size="20" />
                </button>
              </Tooltip>
              <Tooltip title="Reset Barcode">
                <button
                  className="px-2 py-2 bg-white text-third rounded-2xl mt-8"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ userScannedBarcode: null });
                    document.getElementById("userBarcodeID").value = null;
                  }}
                >
                  <BiReset size="20" />
                </button>
              </Tooltip>
            </div>
            <div className="">
              {this.state.toggelingCamera && (
                <BarcodeScannerComponent
                  width={500}
                  height={100}
                  onUpdate={(error, result) => {
                    if (result) {
                      console.log(result.text);
                      this.setState({
                        userScannedBarcode: result.text,
                        toggelingCamera: false,
                      });
                    } else
                      toast.error(error, {
                        position: "bottom-center",
                      });
                  }}
                />
              )}
            </div>
            {isShareholderCreationLoading || isShareholderUpdationLoading ? (
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
    isShareholderCreationLoading: state.attendant.isShareholderCreationLoading,
    isShareholderUpdationLoading: state.attendant.isShareholderUpdationLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submittingShareholderRegistration: (shareholderInformation) =>
      dispatch(submittingShareholderRegistration(shareholderInformation)),
    updatingShareholder: (shareholderInformation, shareholderID) =>
      dispatch(updatingShareholder(shareholderInformation, shareholderID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterShareholderForm);
