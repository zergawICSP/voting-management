import React, { Component } from "react";

// EXTERNAL IMPORTS
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import RiseLoader from "react-spinners/RiseLoader";
import { AgGridReact } from "ag-grid-react";
import { BiBarcodeReader } from "react-icons/bi";
import { BiReset } from "react-icons/bi";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { instance } from "../../../api/config";
import { Tooltip } from "react-tippy";
import { Redirect } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-bootstrap.css";

// COMPONENT IMPORTS
import AppNavigation from "../nav/Nav";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { submittingAttendantsData } from "../../../action/attendantsAction";

class AppHomePage extends Component {
  // Component State
  state = {
    filteredLists: null,
    isSearchActivated: false,
    isSearchLoading: false,
    checkedAttendants: [],
    currentlySelectedTotalShares: 0,
    scannedBarCodeResult: null,
    toggelingCamera: false,
    sendingCollectedValue: null,
  };

  render() {
    // Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    // Search form validation
    const SearchFormValidationSchema = Yup.object().shape({
      userSearchInput: Yup.string().required("Search term is required"),
    });

    // Local variables
    let dataValues = [];
    const { submittingAttendantsData, isAttendantLoading } = this.props;

    // Handling onChange
    const handlingOnChange = (e) => {
      let inputValue = e.target.value;

      if (inputValue.length > 2) {
        this.setState({ isSearchActivated: true, isSearchLoading: true });
        instance
          .get("/search?q=" + inputValue)
          .then((data) => {
            data.data.shareholders.map((SingleValue) =>
              dataValues.push(SingleValue)
            );
            this.setState({
              isSearchLoading: false,
              filteredLists: [...dataValues],
            });
            console.log(data.data.shareholders);
          })
          .catch((error) =>
            toast.error(error.response.data.error, {
              position: "bottom-center",
            })
          );
      } else {
        this.setState({ isSearchActivated: false });
      }
    };

    // OnGrid ready
    const onGridReady = (params) => {
      params.api.applyTransaction({ add: this.state.filteredLists });
    };

    // Getting the Present Value parameter
    const gettingPresentValue = function (params) {
      return params.data.is_present ? "Present" : "Not Present";
    };

    // Column Headers
    const columnDefs = [
      {
        headerName: "Name",
        field: "name",
        checkboxSelection: true,
      },
      { headerName: "Total Share Amount", field: "no_of_shares" },
      {
        headerName: "Is Present",
        field: "is_present",
        valueGetter: gettingPresentValue,
      },
    ];

    const defaultColDef = {
      flex: 1,
    };

    // Row selection type - whether it is single, multiple or both
    const rowSelectionType = "multiple";

    // Checking if the row is selectable
    const isRowSelectable = (node) => {
      return node.data ? !node.data.is_present : false;
    };

    // Operation when the row is selected
    const onSelectionChanged = (e) => {
      const singleShareValues = [];
      this.setState({
        checkedAttendants: e.api.getSelectedRows(),
      });

      if (e.api.getSelectedRows().length > 0) {
        e.api.getSelectedRows().map((FechingSingleShareValue) => {
          singleShareValues.push(FechingSingleShareValue.no_of_shares);
          let totalValueShare = singleShareValues.reduce((a, b) => {
            return a + b;
          });
          return this.setState({
            currentlySelectedTotalShares: parseFloat(totalValueShare),
          });
        });
      } else {
        this.setState({ currentlySelectedTotalShares: parseFloat(0) });
      }
    };

    // Sending collected attendant information
    const sendingCollectedAttendanceData = () => {
      const { checkedAttendants, scannedBarCodeResult } = this.state;
      if (checkedAttendants.length > 0) {
        if (scannedBarCodeResult !== null && scannedBarCodeResult !== "") {
          let checkedAttantsID;
          checkedAttendants.map(
            (SingleData) => (checkedAttantsID = SingleData.id)
          );
          submittingAttendantsData(checkedAttantsID, scannedBarCodeResult);
          this.setState({
            isSearchActivated: false,
            scannedBarCodeResult: null,
            checkedAttendants: [],
            currentlySelectedTotalShares: 0,
          });
          document.getElementById("userSearchInput").value = null;
          document.getElementById("userBarcodeID").value = null;
        } else {
          toast.error(
            "One or more fields aren't filled. Please provide and submit again !",
            { position: "bottom-center" }
          );
        }
      } else {
        toast.error(
          "One or more fields aren't filled. Please provide and submit again !",
          { position: "bottom-center" }
        );
      }
    };

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <AppNavigation />
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-5xl font-bold text-white mt-40">
            Search Attendants
          </p>

          {/* Search form */}
          <Formik
            initialValues={{
              userSearchInput: "",
            }}
            validationSchema={SearchFormValidationSchema}
          >
            {({ errors, touched, values, resetForm }) => (
              <Form className="mt-10 w-2/4">
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col space-y-2">
                    <Field
                      className="px-5 py-4 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                      placeholder="Enter attendant name"
                      id="userSearchInput"
                      name="userSearchInput"
                      type="text"
                      onKeyUp={handlingOnChange}
                    />
                    {errors.userSearchInput && touched.userSearchInput ? (
                      <small className="text-sm text-red-600 text-left">
                        {errors.userSearchInput}
                      </small>
                    ) : null}
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {isAttendantLoading ? (
            <div className="mt-20">
              <RiseLoader className="text-white" size={15} color="white" />
            </div>
          ) : this.state.isSearchActivated ? (
            this.state.isSearchLoading ? (
              <div className="mt-20">
                <RiseLoader className="text-white" size={15} color="white" />
              </div>
            ) : (
              <div className="mt-32 flex flex-row justify-center space-x-70 w-full px-32">
                <div className="ag-theme-bootstrap w-full shadow-2xl bg-transparent text-white">
                  <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    rowSelection={rowSelectionType}
                    onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}
                    isRowSelectable={isRowSelectable}
                    className="bg-transparent"
                  ></AgGridReact>
                </div>
                <div className="w-1/2">
                  <h2 className="text-white text-3xl font-bold">Summary</h2>
                  <div className="mt-10 flex flex-col space-y-3">
                    <p className="font-bold text-white text-2xl">
                      {this.state.currentlySelectedTotalShares
                        ? this.state.currentlySelectedTotalShares
                        : 0}
                    </p>
                    <p className="text-xl text-white">Total Share Value</p>
                  </div>
                  <div className="mt-10">
                    <form className="flex flex-row justify-center items-center w-full space-x-3">
                      <div className="flex flex-col space-y-2">
                        <input
                          className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                          placeholder="Barcode ID"
                          id="userBarcodeID"
                          name="userBarcodeID"
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              scannedBarCodeResult: e.target.value,
                            });
                          }}
                          value={
                            this.state.scannedBarCodeResult !== ""
                              ? this.state.scannedBarCodeResult
                              : null
                          }
                        />
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
                            document.getElementById(
                              "userBarcodeID"
                            ).value = null;
                          }}
                        >
                          <BiReset size="20" />
                        </button>
                      </Tooltip>
                    </form>
                  </div>
                  <div className="flex flex-row justify-center items-center mt-10">
                    <button
                      className="px-4 py-2 rounded-full text-third bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        sendingCollectedAttendanceData();
                      }}
                    >
                      Send Data
                    </button>
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
                              scannedBarCodeResult: result.text,
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
                </div>
              </div>
            )
          ) : null}

          {/* Footer */}
          {/* Powered by */}
          <p className="text-white mt-52 relative bottom-0 pb-5 font-light">
            Powered by <span className="font-bold">Zergaw ISP</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAttendantLoading: state.attendant.isAttendantLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submittingAttendantsData: (checkedAttantsID, scannedBarCodeResult) =>
      dispatch(
        submittingAttendantsData(checkedAttantsID, scannedBarCodeResult)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHomePage);
