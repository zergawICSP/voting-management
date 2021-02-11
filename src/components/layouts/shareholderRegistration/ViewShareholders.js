import React, { Component } from "react";

// EXTERNAL IMPORT
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-blue.css";

// COMPONENT IMPORTS
import { instance } from "../../../api/config";
import { AgGridReact } from "ag-grid-react";
import { Redirect } from "react-router-dom";

class ViewShareholders extends Component {
  // app state variable
  state = {
    updatedShareholderList: [],
    selectedEditableData: [],
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
        headerName: "Total No of Share",
        field: "no_of_shares",
      },
      { headerName: "Phone Number", field: "phone" },
      {
        headerName: "Is Present",
        field: "is_present",
        valueGetter: gettingPresentValue,
      },
      {
        headerName: "Delegation",
        field: "delegate_id",
        valueGetter: gettingIsAttendantDelegated,
      },
      { headerName: "Barcode ID", field: "barcode" },
      {
        headerName: "Action",
        field: "id",
        cellRendererFramework: (params) => (
          <button
            className="px-2 text-white py-1 bg-third rounded-2xl"
            onClick={() => editShareholderOnClick(params)}
          >
            <AiFillEdit />
          </button>
        ),
      },
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

    // operation on edit btn click
    const editShareholderOnClick = (params) => {
      onEditButtonClicked(params.data); // passing selected data to the parent component
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

export default ViewShareholders;
