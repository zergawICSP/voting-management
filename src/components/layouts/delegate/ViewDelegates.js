import React, { Component } from "react";

// EXTERNAL IMPORTS
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-blue.css";

// COMPONENT IMPORTS
import { instance } from "../../../api/config";

export default class ViewDelegates extends Component {
  state = {
    updatedDelegateList: []
  };

  render() {
    // Ag_Grid related values
    const onGridReady = (params) => {
      instance
        .get("/delegates")
        .then((response) => {
          this.setState({
            updatedDelegateList: response.data.delegates,
          });
          console.log(response);
        })
        .then(() =>
          params.api.applyTransaction({
            add: this.state.updatedDelegateList,
          })
        )
        .catch((error) =>
          toast.warning(
            "Error While Loading Delegates. Please Refresh the Page. Error Report: " +
              error.response.data.error
          )
        );
    };

    //   getting is_present value
    const gettingPresentValue = function (params) {
      return params.data.is_present ? "Present" : "Not Present";
    };

    //   getting is_attendant_delegated value
    const gettingIsAttendantDelegated = function (params) {
      return params.data.delegate_id ? "Delegated" : "Not Delegated";
    };

    const columnDefs = [
      { headerName: "Name", field: "name", checkboxSelection: true },
      {
        headerName: "Is Present",
        field: "is_present",
        valueGetter: gettingPresentValue,
      },
      { headerName: "Barcode ID", field: "barcode" },
    ];
    const defaultColDef = {
      flex: 1,
      filter: true,
      sortable: true,
      floatingFilter: true,
    };

    // row selection type
    const rowSelectionType = "single";

    // operation when the row is selected
    const onSelectionChanged = (e) => {
      console.log(e.api.getSelectedRows());
    };

    // route guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    return (
      <div className="p-10">
        <div
          className="ag-theme-blue w-full bg-transparent border"
          style={{ height: "575px" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelectionType={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            rowMultiSelectWithClick={true}
            pagination={true}
            className="bg-transparent text-left text-black"
          ></AgGridReact>
        </div>
      </div>
    );
  }
}
