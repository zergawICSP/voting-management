import React, { Component } from "react";

// EXTERNAL IMPORT
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Modal from "react-modal";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-bootstrap.css";

// import "../../../assets/script/Modal";

// COMPONENT IMPORTS
import { instance } from "../../../api/config";

class ViewShareholders extends Component {
  // app state variable
  state = {
    updatedShareholderList: [],
    selectedEditableData: [],
    isModalOpen: false,
    selectedDeletableField: null,
    selectedDeletableShareholderName: "",
  };

  render() {
    // props value
    const { onEditButtonClicked } = this.props;

    // Ag_Grid related values
    const onGridReady = (params) => {
      instance
        .get("/shareholders")
        .then((response) => {
          this.setState({
            updatedShareholderList: response.data.shareholders,
          });
          console.log(this.state.updatedShareholderList);
        })
        .then(() =>
          params.api.applyTransaction({
            add: this.state.updatedShareholderList,
          })
        )
        .catch((error) =>
          toast.warning(
            "Error While Loading Shareholder. Please Refresh the Page. Error Report: " +
              error.response.data.error
          )
        );
    };

    //   getting is_present value
    // const gettingPresentValue = function (params) {
    //   return params.data.is_present ? "Present" : "Not Present";
    // };

    //   getting is_attendant_delegated value
    // const gettingIsAttendantDelegated = function (params) {
    //   return params.data.delegate_id ? "Delegated" : "Not Delegated";
    // };

    const columnDefs = [
      { headerName: "Name", field: "name", checkboxSelection: true },
      {
        headerName: "Total No of Share",
        field: "no_of_shares",
      },
      { headerName: "Phone Number", field: "phone" },
      // {
      //   headerName: "Is Present",
      //   field: "is_present",
      //   valueGetter: gettingPresentValue,
      // },
      // {
      //   headerName: "Delegation",
      //   field: "delegate_id",
      //   valueGetter: gettingIsAttendantDelegated,
      // },
      // { headerName: "Barcode ID", field: "barcode" },
      {
        headerName: "Action",
        field: "id",
        filter:false,
        cellRendererFramework: (params) => (
          <>
            <button
              className="px-2 text-primary rounded-md shadow-2xl"
              onClick={() => editShareholderOnClick(params)}
            >
              Edit
            </button>
            <button
              className="px-2 text-red-400 rounded-md shadow-2xl"
              onClick={() =>
                openingModalElement(params.data.id, params.data.name)
              }
            >
              Delete
            </button>
          </>
        ),
      },
    ];

    const defaultColDef = {
      flex: 1,
      filter: true,
      sortable: true,
      floatingFilter: true,
      resizable: true,
    };

    // row selection type
    const rowSelectionType = "single";

    // operation when the row is selected
    const onSelectionChanged = (e) => {
      console.log(e.api.getSelectedRows());
    };

    // operation on edit btn click
    const editShareholderOnClick = (params) => {
      onEditButtonClicked(params.data); // passing selected data to the parent component
    };

    // opening modal
    const openingModalElement = (selectedField, selectedShareholderName) => {
      this.setState({
        isModalOpen: true,
        selectedDeletableField: selectedField,
        selectedDeletableShareholderName: selectedShareholderName,
      });
    };

    // closing Modal
    const closingModalElement = () => {
      this.setState({
        isModalOpen: false,
        selectedDeletableField: null,
        selectedDeletableShareholderName: "",
      });
    };

    // deleting shareholder
    const deleteShareholder = (selectedField) => {
      if (selectedField !== null) {
        instance
          .delete(`/shareholders/${selectedField}`)
          .then((response) => {
            if (response.status === 200) {
              closingModalElement();
              window.location.reload();
            } else {
              toast.error(response.status + ": Bad Request.", {
                position: "bottom-center",
              });
            }
          })
          .catch((error) => console.log(error));
      } else {
        toast.error(
          "One or more field is required. Please fill and submit again.",
          { position: "bottom-center" }
        );
      }
    };

    // route guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    // setting the modal app element
    Modal.setAppElement("#root");

    return (
      <div className="p-10">
        <div
          className="ag-theme-bootstrap w-full bg-transparent border text-black placeholder-black"
          style={{ height: "575px", color: "black" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelectionType={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            rowMultiSelectWithClick={true}
            pagination={true}
            className="text-left text-black placeholder-black"
          ></AgGridReact>
        </div>
        <Modal
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          isOpen={this.state.isModalOpen}
          onRequestClose={() => closingModalElement()}
          contentLabel="Delete Modal"
          style={{
            content: {
              display: "inline-block",
              alignItems: "bottom",
              background: "white",
              borderRadius: "20px",
              textAlign: "left",
              overflow: "hidden",
              position: "fixed",
              left: "30%",
              right: "auto",
              bottom: "auto",
              top: "30vh",
            },
          }}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Deleting{" "}
                  <span className="font-bold">
                    {this.state.selectedDeletableShareholderName}
                  </span>{" "}
                  from Shareholder
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete{" "}
                    <span className="font-bold">
                      {this.state.selectedDeletableShareholderName}
                    </span>{" "}
                    from shareholder? All data will be permanently removed. This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() =>
                deleteShareholder(this.state.selectedDeletableField)
              }
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => closingModalElement()}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewShareholders;
