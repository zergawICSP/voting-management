import React, { Component } from "react";

// EXTERNAL IMMPORTS
import RiseLoader from "react-spinners/RiseLoader";

import { toast } from "react-toastify";
import { connect } from "react-redux";

// COMPONENT IMPORT
import {
  submittingShareholderRegistration,
  updatingShareholder,
} from "../../../action/attendantsAction";
import AppNavigation from "../nav/Nav";

class RegisterShareholderForm extends Component {
  state = {
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
    userNumberOfSharesSubscribed:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.subscribed_shares
        : "",
    userNumberOfSharesPaidup:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.paidup_shares
        : "",
    userNumberOfSharesSubscribedValue:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.total_share_value
        : "",
    userNumberOfSharesPaidupValue:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData
            .total_paidup_share_value
        : "",
    userServiceCharge:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.service_charge
        : "",
    userServiceChargeTransaction:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData
            .service_charge_transaction
        : "",
    userNationality:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.nationality
        : "",
    userCity:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.city
        : "",
    userSubcity:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.subcity
        : "",
    userWoredaKebele:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.woreda_kebele
        : "",
    userGender:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.gender
        : "",
    userBankName:
      this.props.location.state &&
      typeof this.props.location.state.selectedShareholderData !== "undefined"
        ? this.props.location.state.selectedShareholderData.bank_name
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
        userFullName,
        userPhoneNumber,
        userNumberOfSharesSubscribed,
        userNumberOfSharesPaidup,
        userNumberOfSharesSubscribedValue,
        userNumberOfSharesPaidupValue,
        userServiceCharge,
        userServiceChargeTransaction,
        userNationality,
        userBankName,
        userCity,
        userSubcity,
        userWoredaKebele,
        userGender,
      } = this.state;
      if (
        userFullName !== "" &&
        userPhoneNumber !== "" &&
        userNumberOfSharesSubscribed !== "" &&
        userNumberOfSharesPaidup !== "" &&
        userNumberOfSharesSubscribedValue !== "" &&
        userNumberOfSharesPaidupValue !== "" &&
        userServiceChargeTransaction !== "" &&
        userServiceCharge !== "" &&
        userNationality !== "" &&
        userBankName !== "" &&
        userGender !== ""
      ) {
        if (validateName(userFullName)) {
          let cummulativeFormData = {
            name: userFullName,
            subscribed_shares: userNumberOfSharesSubscribed,
            phone: userPhoneNumber,
            paidup_shares: userNumberOfSharesPaidup,
            total_share_value: userNumberOfSharesSubscribedValue,
            total_paidup_share_value: userNumberOfSharesPaidupValue,
            service_charge: userServiceCharge,
            service_charge_transaction: userServiceChargeTransaction,
            nationality: userNationality,
            city: userCity,
            subcity: userSubcity,
            woreda_kebele: userWoredaKebele,
            bank_name: userBankName,
            gender: userGender,
          };
          if (
            this.props.location.state &&
            typeof this.props.location.state.isEditingActivated !== "undefined"
          )
            updatingShareholder(
              cummulativeFormData,
              this.props.location.state.selectedShareholderData.id
            );
          else {
            submittingShareholderRegistration(cummulativeFormData);
            console.log(cummulativeFormData);
            this.setState({
              userFullName: "",
              userPhoneNumber: "",
              userNumberOfSharesSubscribed: "",
              userNumberOfSharesPaidup: "",
              userNumberOfSharesSubscribedValue: "",
              userNumberOfSharesPaidupValue: "",
              userServiceChargeTransaction: "",
              userServiceCharge: "",
              userNationality: "",
              userBankName: "",
              userGender: ""
            });
          }
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
          {this.props.location.state &&
          typeof this.props.location.state.isEditingActivated !== "undefined"
            ? "Edit Share Record"
            : "Register New Share Record"}
        </p>
        <form className="w-2/3 py-10" onSubmit={submitRegisterShareholderData}>
          <div className="flex flex-col space-y-6 px-16 m-auto text-left">
            <div className="flex flex-row space-x-5">
              <div className="flex flex-col space-y-4 w-1/2">
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
                <label>Gender</label>
                <select
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Full Name"
                  id="userGender"
                  name="userGender"
                  type="text"
                  value={this.state.userGender}
                  onChange={handleOnChange}
                >
                  <option value="" className="text-third">
                    Choose Gender
                  </option>
                  <option value="Male" className="text-third">
                    Male
                  </option>
                  <option value="Female" className="text-third">
                    Female
                  </option>
                </select>
              </div>
              <div className="flex flex-col space-y-4">
                <label>Bank Name</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Bank Name"
                  id="userBankName"
                  name="userBankName"
                  type="text"
                  value={this.state.userBankName}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-5">
              <div className="flex flex-col space-y-4 w-1/3">
                <label>No of Share Subscribed</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter No of Share Subscribed"
                  id="userNumberOfSharesSubscribed"
                  name="userNumberOfSharesSubscribed"
                  type="number"
                  value={this.state.userNumberOfSharesSubscribed}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Number of Share Paidup</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter No of Share Paidup"
                  id="userNumberOfSharesPaidup"
                  name="userNumberOfSharesPaidup"
                  type="number"
                  value={this.state.userNumberOfSharesPaidup}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Total Value of Share Subscribed</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Total Subscribed Value"
                  id="userNumberOfSharesSubscribedValue"
                  name="userNumberOfSharesSubscribedValue"
                  type="number"
                  value={this.state.userNumberOfSharesSubscribedValue}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="flex flex-row space-x-5">
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Total Value of Share Paidup</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Total Paidup Value"
                  id="userNumberOfSharesPaidupValue"
                  name="userNumberOfSharesPaidupValue"
                  type="number"
                  value={this.state.userNumberOfSharesPaidupValue}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Service Charge</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Service Charge"
                  id="userServiceCharge"
                  name="userServiceCharge"
                  type="number"
                  value={this.state.userServiceCharge}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Service Charge Transaction</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Service Charge Transaction"
                  id="userServiceChargeTransaction"
                  name="userServiceChargeTransaction"
                  type="text"
                  value={this.state.userServiceChargeTransaction}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="flex flex-row space-x-5">
              <div className="flex flex-col space-y-4 w-1/2">
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
              <div className="flex flex-col space-y-4 w-1/2">
                <label>Nationality</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Nationality"
                  id="userNationality"
                  name="userNationality"
                  type="text"
                  value={this.state.userNationality}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="flex flex-row space-x-5">
              <div className="flex flex-col space-y-4 w-1/3">
                <label>City</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter City"
                  id="userCity"
                  name="userCity"
                  type="text"
                  value={this.state.userCity}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Subcity</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Subcity"
                  id="userSubcity"
                  name="userSubcity"
                  type="text"
                  value={this.state.userSubcity}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-4 w-1/3">
                <label>Woreda/Kebele</label>
                <input
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Woreda/Kebele"
                  id="userWoredaKebele"
                  name="userWoredaKebele"
                  type="text"
                  value={this.state.userWoredaKebele}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            {/* <div className="flex flex-row items-center space-x-4">
              <input
                className=""
                id="isUserDelegated"
                name="isUserDelegated"
                checked={this.state.isUserDelegated}
                onClick={handleOnChange}
                type="checkbox"
              />
              <label htmlFor="isUserDelegated">
                Is the shareholder delegated ? If 'YES', Please Check the box !
              </label>
            </div> */}

            {/* Checking for delegation and display if there is any */}
            {/* {this.state.isUserDelegated ? (
              <div className="flex flex-col space-y-4">
                <label>Delegate Name</label>
                <select
                  className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                  placeholder="Enter Number of Share"
                  id="userDelegateID"
                  name="userDelegateID"
                  value={this.state.userDelegateID}
                  onChange={handleOnChange}
                >
                  <option value="">Choose Delegate</option>
                  {mappingDelegatesToSelect}
                </select>
              </div>
            ) : null} */}

            {/* <div className="flex flex-row space-x-5 items-center">
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
            </div> */}
            {isShareholderCreationLoading || isShareholderUpdationLoading ? (
              <RiseLoader size="15px" color="#fff" className="w-full" />
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
