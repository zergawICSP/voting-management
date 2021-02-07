import React, { Component } from "react";

// EXTERNAL IMMPORTS
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import RiseLoader from "react-spinners/RiseLoader";
import { BiBarcodeReader } from "react-icons/bi";
import { BiReset } from "react-icons/bi";
import { toast } from "react-toastify";
import { Tooltip } from "react-tippy";

class RegisterShareholderForm extends Component {
  state = {
    userScannedBarcode: "",
  };

  render() {

    return (
      <div>
        <Formik
          initialValues={{
            userFullName: "",
            userNoOfShares: "",
            userPhoneNumber: "",
            userBarCode:
              this.state.userScannedBarcode !== ""
                ? this.state.userScannedBarcode
                : "",
          }}
        >
          {({ errors, touched, values, resetForm }) => (
            <Form className="mt-10 w-full">
              <div className="flex flex-col space-y-6 w-2/4 m-auto text-left">
                <div className="flex flex-col space-y-4">
                  <label>Full Name</label>
                  <Field
                    className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                    placeholder="Enter Full Name"
                    id="userFullName"
                    name="userFullName"
                    type="text"
                  />
                  {errors.userFullName && touched.userFullName ? (
                    <small className="text-sm text-red-600 text-left">
                      {errors.userFullName}
                    </small>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-4">
                  <label>Number of Share</label>
                  <Field
                    className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                    placeholder="Enter Number of Share"
                    id="userNoOfShares"
                    name="userNoOfShares"
                    type="number"
                  />
                  {errors.userNoOfShares && touched.userNoOfShares ? (
                    <small className="text-sm text-red-600 text-left">
                      {errors.userNoOfShares}
                    </small>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-4">
                  <label>Phone Number</label>
                  <Field
                    className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                    placeholder="Enter Phone Number"
                    id="userPhoneNumber"
                    name="userPhoneNumber"
                    type="text"
                  />
                  {errors.userFullName && touched.userFullName ? (
                    <small className="text-sm text-red-600 text-left">
                      {errors.userFullName}
                    </small>
                  ) : null}
                </div>
                <div className="flex flex-row space-x-5 items-center">
                  <div className="flex flex-col space-y-2 w-2/3">
                    <label>Full Name</label>
                    <Field
                      className="px-5 py-4 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                      placeholder="Enter Full Name"
                      id="userBarcodeID"
                      name="userBarcodeID"
                      type="text"
                    />
                    {errors.userFullName && touched.userFullName ? (
                      <small className="text-sm text-red-600 text-left">
                        {errors.userFullName}
                      </small>
                    ) : null}
                  </div>
                  <Tooltip title="Scan Barcode">
                    <button
                      className="px-2 py-2 bg-white text-third rounded-2xl"
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
                      className="px-2 py-2 bg-white text-third rounded-2xl"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ scannedBarCodeResult: null });
                        document.getElementById("userBarcodeID").value = null;
                      }}
                    >
                      <BiReset size="20" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default RegisterShareholderForm;
