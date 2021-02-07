import React, { Component } from "react";

// EXTERNAL IMPORTS
import { Line } from "rc-progress";
import RaiseLoader from "react-spinners/RiseLoader";
import { toast } from "react-toastify";
import { instance } from "../../../api/config";

class AppLanding extends Component {
  // Component state
  state = {
    choosenSelectionType: null,
    selectedCandidatesAndTheirVote: [],
    MeetingVote: [],
    attendantsCount: null,
    isLoading: false,
  };

  // Handling real-time fetching
  componentDidMount() {
    setInterval(() => {
      if (this.state.choosenSelectionType === "BOARD_MEMBER_SELECTION") {
        instance
          .get("/candidates")
          .then((response) => {
            this.setState({
              selectedCandidatesAndTheirVote: response.data.candidates,
            });
          })
          .then(() => this.setState({ isLoading: false }))
          .catch((error) => toast.error(error, { position: "bottom-center" }));
      } else if (this.state.choosenSelectionType === "MEETING_AGENDAS") {
        instance
          .get("/meeting-agendas")
          .then((response) => {
            this.setState({ MeetingVote: response.data.agendas });
          })
          .then(() => this.setState({ isLoading: false }))
          .catch((error) => toast.error(error, { position: "bottom-center" }));
      } else {
        this.setState({ selectedCandidatesAndTheirVote: [], MeetingVote: [] });
      }
    }, 10000);

    // For attendants
    setInterval(() => {
      instance
        .get("/attendants")
        .then((response) => {
          this.setState({
            attendantsCount: parseFloat(response.data.no_of_attendants),
          });
        })
        .catch((error) => toast.error(error, { position: "bottom-center" }));
    }, 10000);
  }

  render() {
    // Handling selection type change
    const handleSelectionTypeChange = (e) => {
      this.setState({ choosenSelectionType: e.target.value }, () => {
        if (this.state.choosenSelectionType !== "")
          this.setState({ isLoading: true });
      });
    };

    // Handling vote display mapping
    const mappingVoteDisplay =
      this.state.selectedCandidatesAndTheirVote.length > 0 ? (
        this.state.selectedCandidatesAndTheirVote.map((SingleData) => {
          return (
            <div
              className="w-1/2 flex flex-col space-y-3 mb-10"
              key={SingleData.id}
            >
              <div className="flex flex-row justify-between items-center px-4">
                <p className="text-white text-2xl lg:text-xl text-left">
                  {SingleData.name}
                </p>
                <p className="text-white text-xl lg:text-lg">
                  {parseFloat(SingleData.votePercentage * 100) + "%"}
                </p>
              </div>
              <Line
                percent={parseFloat(SingleData.votePercentage * 100)}
                strokeWidth="4"
                strokeColor="#D3D3D3"
                className="px-5"
              />
            </div>
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center text-white font-medium m-auto w-full">
          <p>No Candidate in the store. Please come later !</p>
        </div>
      );

    const mappingMeetingVote =
      this.state.MeetingVote.length > 0 ? (
        this.state.MeetingVote.map((SingleData) => {
          return (
            <div
              className="flex flex-row justify-between items-center space-y-3 mb-10 w-full"
              key={SingleData.id}
            >
              <div className="items-center px-4 w-1/3">
                <p className="text-white text-2xl lg:text-xl">
                  {SingleData.title}
                </p>
              </div>
              <div className="flex flex-row justify-evenly items-center w-2/3 space-x-3">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-lg font-bold text-white">
                    {parseFloat(SingleData.yesPercentage) + "%"}
                  </p>
                  <p className="text-lg text-white">Yes</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-lg font-bold text-white">
                    {parseFloat(SingleData.noPercentage) + "%"}
                  </p>
                  <p className="text-lg text-white">No</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-lg font-bold text-white">
                    {parseFloat(SingleData.neutralPercentage) + "%"}
                  </p>
                  <p className="text-lg text-white">Neutral</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center text-white font-medium m-auto w-full">
          <p>No Meeting Agenda in the store. Please come later !</p>
        </div>
      );

    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <div className="flex flex-col justify-center py-32 w-3/4 text-white m-auto lg:py-20">
          <p className="text-7xl font-bold py-5 lg:text-5xl lg:py-0 lg:pb-5">
            All your voices
          </p>
          <p className="bg-third text-6xl font-semibold px-24 py-5 m-auto lg:text-4xl">
            Agenda & Member Selection
          </p>
        </div>

        <div className="px-20 mt-20 pb-20 flex flex-row justify-around space-x-10 divide-x-2 divide-solid divide-white lg:mt-5">
          <div className="flex flex-col justify-center items-center text-white w-1/2 lg:w-1/6">
            <p className="font-bold text-9xl">
              {this.state.attendantsCount !== null
                ? this.state.attendantsCount
                : 0}
            </p>
            <p className="font-semibold text-7xl mt-10 lg:text-5xl">
              Attendants
            </p>
          </div>
          <div className="flex flex-col justify-center items-center  w-1/2 lg:w-2/4">
            <p className="font-semibold text-5xl mt-10 text-white lg:text-4xl">
              Choose Which Member Vote
            </p>
            <select
              className="px-5 py-4 mt-10 w-1/2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none"
              id="memberVoteType"
              name="memberVoteType"
              type="text"
              onChange={handleSelectionTypeChange}
            >
              <option value="" className="text-third">
                Choose member vote type
              </option>
              <option value="BOARD_MEMBER_SELECTION" className="text-third">
                Board Member Candidate Vote
              </option>
              <option value="MEETING_AGENDAS" className="text-third">
                Meeting Agendas
              </option>
            </select>

            {this.state.isLoading ? (
              this.state.choosenSelectionType === "" &&
              this.state.choosenSelectionType === null ? null : (
                <div className="mt-20 w-3/4 shadow-2xl px-10 py-10 flex flex-row justify-center items-center rounded-3xl lg:w-full lg:ml-5">
                  <RaiseLoader size="15" color="#fff" />
                </div>
              )
            ) : this.state.choosenSelectionType !== "" &&
              this.state.choosenSelectionType !== null ? (
              this.state.choosenSelectionType === "MEETING_AGENDAS" ? (
                <div className="mt-20 w-3/4 shadow-2xl px-10 py-10 flex flex-col divide-white divide-y-2 divide-solid flex-wrap rounded-3xl lg:w-full lg:ml-5">
                  {mappingMeetingVote}
                </div>
              ) : (
                <div className="mt-20 w-3/4 shadow-2xl px-10 py-10 flex flex-row  flex-wrap rounded-3xl lg:w-full lg:ml-5">
                  {mappingVoteDisplay}
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AppLanding;
