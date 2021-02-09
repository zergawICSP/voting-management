import React, { Component } from "react";

// EXTERNAL IMPORTS
import { BiBarcodeReader, BiReset } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import RiseLoader from "react-spinners/RiseLoader";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { instance } from "../../../api/config";
import { connect } from "react-redux";
import { Tooltip } from "react-tippy";

// COMPONENT IMPORTS
import { submitMeetingVote } from "../../../action/voteAction";

class AgendaVoteForm extends Component {
  // Component state
  state = {
    // app states
    toggelingCamera: false,
    isFetchingActivated: false,
    fechedAttendantValue: [],

    // form state
    scannedBarCodeResult: "",
    selectedAgendaID: "",
    yesField: true,
    noField: false,
    neutralField: false,
    selected: "yesField",
  };

  //   Handling vote selection
  handleVotSelectionChange = (e) => {
    this.setState({ selected: e.target.value }, () => {
      this.setState({ [this.state.selected]: true });
    });
  };

  render() {
    // Props values
    const {
      selectedAgendaId,
      submitMeetingVote,
      isMeetingVoteLoading,
    } = this.props;

    //   Handling scanned bar code result
    const handleFetchingAttendantInformation = (scannedAttendantBarcodeID) => {
      console.log(scannedAttendantBarcodeID);

      if (
        scannedAttendantBarcodeID !== "" &&
        scannedAttendantBarcodeID !== null
      ) {
        this.setState({ isFetchingActivated: true });
        instance
          .get("/barcode?barcode=" + scannedAttendantBarcodeID)
          .then((response) => {
            if (response.data.shareholder !== null) {
              this.setState({
                fechedAttendantValue: [response.data.shareholder],
                isFetchingActivated: false,
              });
            } else {
              this.setState({
                fechedAttendantValue: [],
                isFetchingActivated: false,
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
    const submitAttendatVote = () => {
      if (this.state.selected === "noField") {
        this.setState({ neutralField: false, yesField: false });
      } else if (this.state.selected === "neutralField") {
        this.setState({ noField: false, yesField: false });
      } else if (this.state.selected === "yesField") {
        this.setState({ noField: false, neutralField: false });
      }
      this.setState({ selectedAgendaID: selectedAgendaId }, () => {
        let finalAttendantVote = {
          yesField: this.state.yesField,
          noField: this.state.noField,
          neutralField: this.state.neutralField,
          barcode: this.state.scannedBarCodeResult,
        };
        submitMeetingVote(finalAttendantVote, selectedAgendaId);
        console.log(finalAttendantVote);
        this.setState({ scannedBarCodeResult: "" });
        clearingData();
      });
    };

    // Clearing data
    const clearingData = () => {
      this.setState({
        toggelingCamera: false,
        scannedBarCodeResult: "",
        selected: "yesField",
        fechedAttendantValue: [],
      });
      // document.getElementById("userBarcode").value = null;
    };

    //   Displaying Fetched attendant data
    const displayingFetchedAttendantData =
      this.state.fechedAttendantValue.length > 0 ? (
        this.state.fechedAttendantValue.map((SingleValue) => {
          console.log(this.state.fechedAttendantValue);
          return (
            <div>
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
          <p>No Record Found !</p>
        </div>
      );

    return (
      <div className="flex flex-col justify-center items-center text-white">
        <form className="w-3/4 mt-5">
          <div className="flex flex-row justify-center items-center space-x-4 w-full ">
            <input
              className="px-5 py-2 bg-transparent border w-1/2 border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
              placeholder="Barcode ID"
              id="userBarcodeID"
              name="userBarcodeID"
              type="text"
              onChange={(e) => {
                this.setState({ scannedBarCodeResult: e.target.value });
              }}
              value={
                this.state.scannedBarCodeResult !== ""
                  ? this.state.scannedBarCodeResult
                  : null
              }
            />
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
                  this.setState({
                    scannedBarCodeResult: "",
                    fechedAttendantValue: [],
                  });
                  document.getElementById("userBarcodeID").value = "";
                }}
              >
                <BiReset size="20" />
              </button>
            </Tooltip>

            {/* Displaying identify attendant button only if scanned result is null, toggeling camera is false and feched attendant value is null */}
            <div>
              {this.state.scannedBarCodeResult !== "" &&
              !this.state.toggelingCamera ? (
                this.state.fechedAttendantValue.length > 0 ? null : (
                  <div>
                    <Tooltip title="Identify Attendant">
                      <button
                        className="px-3 py-2 bg-white text-third rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFetchingAttendantInformation(
                            this.state.scannedBarCodeResult
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
          <div className="">
            {this.state.toggelingCamera && (
              <BarcodeScannerComponent
                width={500}
                height={100}
                onUpdate={(error, result) => {
                  if (result) {
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

          {/* Displaying fetched attendant data only if the fetched attendant data state is loaded */}
          <div className="mt-10">
            {this.state.isFetchingActivated ? (
              <RiseLoader className="text-white" size={10} color="white" />
            ) : this.state.fechedAttendantValue.length > 0 ? (
              <div>
                {displayingFetchedAttendantData}
                <div className="flex flex-row justify-evenly items-center">
                  <label>
                    <input
                      name="yesField"
                      id="yesField"
                      type="checkbox"
                      value="yesField"
                      checked={this.state.selected === "yesField"}
                      onChange={this.handleVotSelectionChange}
                    />
                    <span className="px-5">Yes</span>
                  </label>
                  <label>
                    <input
                      name="noField"
                      id="noField"
                      type="checkbox"
                      value="noField"
                      checked={this.state.selected === "noField"}
                      onChange={this.handleVotSelectionChange}
                    />
                    <span className="px-5">No</span>
                  </label>
                  <label>
                    <input
                      name="neutralField"
                      id="neutralField"
                      type="checkbox"
                      value="neutralField"
                      checked={this.state.selected === "neutralField"}
                      onChange={this.handleVotSelectionChange}
                    />
                    <span className="px-5">Neutral</span>
                  </label>
                </div>
                {isMeetingVoteLoading ? (
                  <RiseLoader
                    className="text-white mt-5"
                    size={10}
                    color="white"
                  />
                ) : (
                  <button
                    className="px-3 py-2 bg-white text-third rounded-full mt-5"
                    onClick={(e) => {
                      e.preventDefault();
                      submitAttendatVote();
                    }}
                  >
                    Submit Vote
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMeetingVoteLoading: state.vote.isMeetingVoteLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitMeetingVote: (meetingVoteData, selectedAgendaId) =>
      dispatch(submitMeetingVote(meetingVoteData, selectedAgendaId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgendaVoteForm);
