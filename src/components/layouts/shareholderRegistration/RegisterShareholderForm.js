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
import { submittingShareholderRegistration } from "../../../action/attendantsAction";

class RegisterShareholderForm extends Component {
  state = {
    userScannedBarcode: "",
    toggelingCamera: "",
    userFullName: "",
    userPhoneNumber: "",
    userNumberOfShares: "",
  };

  render() {
    // Local variables
    const { isLoading, submittingShareholderRegistration } = this.props;

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
          submittingShareholderRegistration(cummulativeFormData);
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
      <div>
        <form
          className="mt-10 w-full py-20"
          onSubmit={submitRegisterShareholderData}
        >
          <div className="flex flex-col space-y-6 w-2/4 m-auto text-left">
            <div className="flex flex-col space-y-4">
              <label>Full Name</label>
              <input
                className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Full Name"
                id="userFullName"
                name="userFullName"
                type="text"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label>Number of Share</label>
              <input
                className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Number of Share"
                id="userNumberOfShares"
                name="userNumberOfShares"
                type="number"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label>Phone Number</label>
              <input
                className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Enter Phone Number"
                id="userPhoneNumber"
                name="userPhoneNumber"
                type="text"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <div className="flex flex-col space-y-2 w-2/3">
                <label>Barcode</label>
                <input
                  className="px-5 py-4 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
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
            {isLoading ? (
              <RiseLoader size="15" color="#fff" />
            ) : (
              <button
                type="submit"
                className="bg-third text-white font-bold text-xl py-2 px-5 rounded-full"
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
    isLoading: state.attendant.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submittingShareholderRegistration: (shareholderInformation) =>
      dispatch(submittingShareholderRegistration(shareholderInformation)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterShareholderForm);
