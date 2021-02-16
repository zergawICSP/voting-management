import React, { Component } from "react";

// EXTERNAL IMPORT
import { BiBarcodeReader, BiReset } from "react-icons/bi";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { FiSearch } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import RiseLoader from "react-spinners/RiseLoader";
import { instance } from "../../../api/config";
import { connect } from "react-redux";
import { Tooltip } from "react-tippy";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-dark.css";

// COMPONENT IMPORT
import { submitCandidateVote } from "../../../action/voteAction";

class CandidateVoteForm extends Component {
  // Component state
  state = {
    // app state
    isAttendantFetchingActivated: false,
    returnedAttendantValue: [],
    candiateData: [],
    checkedCandidates: [],
    candidateVoteType: 0,

    // form state
    barcodeIDResult: "",
    toggelingBarcodeReaderCamera: false,
  };

  componentDidMount() {
    instance
      .get("/voting-agendas")
      .then((response) =>
        response.data.votingAgendas && response.data.votingAgendas.length > 0
          ? response.data.votingAgendas.map((SingleData) =>
              this.setState({ candidateVoteType: SingleData.id })
            )
          : this.setState({ candidateVoteType: 0 })
      )
      .catch((error) =>
        toast.error(
          "Unable to load Candidate Vote Type Data: " +
            error.response.data.error
        )
      );
  }

  render() {
    // Local variables
    const { isShareholderCreationLoading, submitCandidateVote } = this.props;
    let dataValue = [];
    // OnGrid ready
    const onGridReady = (params) => {
      let dataValues = [];
      instance.get("/candidates").then((response) => {
        response.data.candidates.map((SingleData) =>
          dataValues.push(SingleData)
        );
        this.setState({ candiateData: [...dataValues] }, () => {
          params.api.applyTransaction({ add: this.state.candiateData });
        });
      });
    };

    // Column Headers
    const columnDefs = [
      {
        headerName: "Name",
        field: "name",
        checkboxSelection: true,
        minWidth: 500,
        maxWidth: 500,
      },
    ];

    const defaultColDef = {
      flex: 1,
    };

    // Row selection type - whether it is single, multiple or both
    const rowSelectionType = "multiple";

    // Operation when the row is selected
    const onSelectionChanged = (e) => {
      // Adding the selected row to the state value
      // Checking if the selected row length is less than 11
      console.log(e.api.getSelectedRows());
      if (e.api.getSelectedRows().length > 11)
        toast.warning(
          "Selected Candidates shouldn't excced 11 Candidates. Your choice will be invalid !",
          { position: "bottom-center" }
        );
      e.api.getSelectedRows().map((SingleData) => {
        dataValue.push(SingleData.id);
        this.setState({
          checkedCandidates: dataValue,
        });
      });
    };

    //   Handling scanned bar code result
    const handleFetchingAttendantInformation = (scannedAttendantBarcodeID) => {
      if (
        scannedAttendantBarcodeID !== "" &&
        scannedAttendantBarcodeID !== null
      ) {
        this.setState({ isAttendantFetchingActivated: true });
        instance
          .get("/barcode?barcode=" + scannedAttendantBarcodeID)
          .then((response) => {
            if (response.data.shareholder !== null) {
              this.setState({
                returnedAttendantValue: [response.data.shareholder],
                isAttendantFetchingActivated: false,
              });
            } else {
              this.setState({
                returnedAttendantValue: [],
                isAttendantFetchingActivated: false,
              });
            }
          });
      } else {
        toast.error(
          "Candidate Barcode ID Not Present. Please Scan Barcode First !",
          { position: "bottom-center" }
        );
      }
    };

    //   Submitting attendant vote
    const submitCandidateVoteInformation = () => {
      // do sth here
      const {
        checkedCandidates,
        barcodeIDResult,
        candidateVoteType,
      } = this.state;
      console.log(checkedCandidates.length);
      if (checkedCandidates.length > 11) {
        toast.error(
          "Selected Candidates shouldn't excced 11 Candidates. Your choice will be invalid !",
          { position: "bottom-center" }
        );
      } else {
        if (checkedCandidates.length > 0) {
          if (barcodeIDResult !== "" && barcodeIDResult !== null) {
            if (candidateVoteType !== 0) {
              submitCandidateVote(
                checkedCandidates,
                barcodeIDResult,
                candidateVoteType
              );
              clearingFormData();
            } else
              toast.error(
                "Candidate vote agenda not retrived or not found in the store.",
                { position: "bottom-center" }
              );
          } else {
            toast.error(
              "One or more fields aren't filled. Please provide and submit again!",
              { position: "bottom-center" }
            );
          }
        } else {
          toast.error(
            "One or more fields aren't filled. Please provide and submit again!",
            { position: "bottom-center" }
          );
        }
      }
    };

    const clearingFormData = () => {
      this.setState({
        barcodeIDResult: "",
        toggelingBarcodeReaderCamera: false,
        returnedAttendantValue: [],
        checkedCandidates: [],
      });
      document.getElementById("userBarcodeID").value = "";
    };

    //   Displaying Fetched attendant data
    const displayingFetchedAttendantData =
      this.state.returnedAttendantValue.length > 0 ? (
        this.state.returnedAttendantValue.map((SingleValue) => {
          return (
            <div key={SingleValue.id}>
              <p className="font-bold text-md">Attendant Information</p>
              <div className="flex flex-row justify-evenly items-center mt-5 mb-5 space-x-4">
                <p className="text-md">
                  Name:{" "}
                  <span className="font-bold">{" " + SingleValue.name}</span>
                </p>
                <p className="text-md">
                  Total Share value:{" "}
                  <span className="font-bold">
                    {" " + SingleValue.no_of_shares}
                  </span>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p className="text-white">No Record Found !</p>
        </div>
      );

    if (isShareholderCreationLoading)
      return <RiseLoader className="text-white mt-5" size={10} color="white" />;

    return (
      <div className="flex flex-col justify-center items-center text-white mb-20">
        <form className="w-3/4 mt-5">
          <div className="flex flex-row justify-center items-center space-x-4 w-full">
            <input
              className="px-5 py-2 bg-transparent border w-1/2 border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
              placeholder="Barcode ID"
              id="userBarcodeID"
              name="userBarcodeID"
              type="text"
              onChange={(e) => {
                this.setState({ barcodeIDResult: e.target.value });
              }}
              value={
                this.state.barcodeIDResult !== ""
                  ? this.state.barcodeIDResult
                  : ""
              }
            />
            <Tooltip title="Scan Barcode">
              <button
                className="px-2 py-2 bg-white text-third rounded-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    toggelingBarcodeReaderCamera: !this.state
                      .toggelingBarcodeReaderCamera,
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
                  this.setState({
                    barcodeIDResult: "",
                    returnedAttendantValue: [],
                  });
                  document.getElementById("userBarcodeID").value = "";
                }}
              >
                <BiReset size="20" />
              </button>
            </Tooltip>

            {/* Displaying identify attendant button only if scanned result is null, toggeling camera is false and feched attendant value is null */}
            <div>
              {this.state.barcodeIDResult !== "" &&
              !this.state.toggelingBarcodeReaderCamera ? (
                this.state.returnedAttendantValue.length > 0 ? null : (
                  <div>
                    <Tooltip title="Identify Attendant">
                      <button
                        className="px-3 py-2 bg-white text-third rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFetchingAttendantInformation(
                            this.state.barcodeIDResult
                          );
                        }}
                      >
                        <FiSearch size="20" />
                      </button>
                    </Tooltip>
                  </div>
                )
              ) : null}
            </div>
          </div>

          {/* Displaying the barcode scanner only if toggling camera state is true */}
          <div className="w-3/4 m-auto">
            {this.state.toggelingBarcodeReaderCamera && (
              <BarcodeScannerComponent
                width={500}
                height={100}
                onUpdate={(error, result) => {
                  if (result) {
                    this.setState({
                      barcodeIDResult: result.text,
                      toggelingBarcodeReaderCamera: false,
                    });
                  } else
                    toast.error(error, {
                      position: "bottom-center",
                    });
                }}
              />
            )}
          </div>

          {/* Displaying fetched attendant data only if the fetched attendant data state is loaded */}
          <div className="mt-10">
            {this.state.isAttendantFetchingActivated ? (
              <RiseLoader className="text-white" size={10} color="white" />
            ) : this.state.returnedAttendantValue.length > 0 ? (
              <div>
                {displayingFetchedAttendantData}
                <div className="flex flex-row justify-between items-center">
                  <div
                    className="ag-theme-dark w-full shadow-2xl bg-transparent text-white m-auto"
                    style={{ height: "300px", width: "530px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                      rowSelection={rowSelectionType}
                      onSelectionChanged={onSelectionChanged}
                      rowMultiSelectWithClick={true}
                      suppressHorizontalScroll={false}
                      className="bg-transparent"
                    ></AgGridReact>
                  </div>
                  <div>
                    <p className="text-white">
                      <span className="text-2xl">
                        Selected Candidate Item Count:
                      </span>
                      <br />
                      <span className="font-bold text-5xl mt-5">
                        {parseFloat(this.state.checkedCandidates.length)}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  className="px-3 py-2 bg-transparent text-white rounded-md mt-5 shadow-2xl border border-gray-600 hover:bg-companyYello hover:text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    submitCandidateVoteInformation();
                  }}
                >
                  Submit Vote
                </button>
              </div>
            ) : (
              <p className="mt-10 text-white">No Record Found</p>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isShareholderCreationLoading: state.vote.isShareholderCreationLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitCandidateVote: (
      candidateVoteData,
      selectedAttendantBarcodeID,
      candidateVoteType
    ) =>
      dispatch(
        submitCandidateVote(
          candidateVoteData,
          selectedAttendantBarcodeID,
          candidateVoteType
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateVoteForm);
