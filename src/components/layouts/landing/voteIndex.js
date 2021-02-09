import React, { Component } from "react";

// EXTERNAL IMPORTS
import CompanyLogo from "../../../assets/images/Zergaw ISP Logo.png";
import { toast } from "react-toastify";
import { Line } from "rc-progress";
import RaiseLoader from "react-spinners/RiseLoader";

// COMPONENT IMPORTS
import { instance } from "../../../api/config";

class VoteIndex extends Component {
  state = {
    meetingAgendaList: [],
    selectedAgenda: [],
    selectedOption: "",
    isShiftingLoading: false,
    selectedCandidatesAndTheirVote: [],
  };

  componentDidMount() {
    instance
      .get("/meeting-agendas")
      .then((response) =>
        this.setState({ meetingAgendaList: response.data.agendas })
      )
      .catch((error) =>
        toast.error("Error Loading Meeting Agenda: " + error, {
          position: "bottom-center",
        })
      );
  }

  render() {
    // Managing meeting agenda on change
    const handleSelectionTypeChange = (e) => {
      let inputAgendaValue = e.target.value;

      if (inputAgendaValue !== "") {
        this.setState(
          { selectedOption: inputAgendaValue, isShiftingLoading: true },
          () => {
            if (inputAgendaValue === "BOARD_MEMBER_SELECTION") {
              // Setting the Meeting Member Candidate state Empty
              this.setState({ selectedAgenda: [] });
              setInterval(() => {
                instance
                  .get("/candidates")
                  .then((response) => {
                    this.setState({
                      selectedCandidatesAndTheirVote: response.data.candidates,
                    });
                  })
                  .then(() => this.setState({ isShiftingLoading: false }))
                  .catch((error) =>
                    toast.error(error.response.data.error, {
                      position: "bottom-center",
                    })
                  );
              }, 4000);
            } else {
              // Setting the Board Member Candidate State Empty
              this.setState({ selectedCandidatesAndTheirVote: [] }, () => {
                setInterval(() => {
                  instance
                    .get("/meeting-agendas/" + this.state.selectedOption)
                    .then((response) => {
                      this.setState({
                        selectedAgenda: [response.data.agenda],
                        isShiftingLoading: false,
                      });
                    });
                }, 2000);
              });
            }
          }
        );
      } else {
        this.setState({
          selectedOption: "",
          isShiftingLoading: false,
          selectedAgenda: [],
          selectedCandidatesAndTheirVote: [],
        });
      }
    };

    const mappingMeetingVote =
      this.state.selectedAgenda.length > 0
        ? this.state.selectedAgenda.map((SingleData) => {
            console.log(this.state.selectedAgenda);
            return (
              <div
                className="flex flex-col justify-between items-center space-y-20 w-full mt-44"
                key={SingleData.id}
              >
                <div className="flex flex-row justify-between items-center w-screen space-x-3">
                  <div className="flex flex-col justify-center items-center space-y-10 w-1/3">
                    <p className="text-9xl font-bold text-white">
                      {parseFloat(SingleData.yesPercentage.toFixed(2)) + "%"}
                    </p>
                    <p className="text-4xl text-white">እደግፋለሁ</p>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-10 w-1/3">
                    <p className="text-9xl font-bold text-white">
                      {parseFloat(SingleData.noPercentage.toFixed(2)) + "%"}
                    </p>
                    <p className="text-4xl text-white">እቃወማለሁ</p>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-10 w-1/3">
                    <p className="text-9xl font-bold text-white">
                      {parseFloat(SingleData.neutralPercentage.toFixed(2)) +
                        "%"}
                    </p>
                    <p className="text-4xl text-white">ድምጸ ተኣቅቦ</p>
                  </div>
                </div>
                <div className="items-center px-4 w-full">
                  <p className="text-white text-3xl font-bold">
                    {SingleData.title}
                  </p>
                </div>
              </div>
            );
          })
        : null;

    const mappingVoteDisplay =
      this.state.selectedCandidatesAndTheirVote.length > 0
        ? this.state.selectedCandidatesAndTheirVote.map((SingleData) => {
            return (
              <div
                className="w-1/3 flex flex-col space-y-3 mb-16"
                key={SingleData.id}
              >
                <div className="flex flex-row justify-between items-center px-4">
                  <p className="text-white text-2xl lg:text-xl text-left xl:text-2xl">
                    {SingleData.name}
                  </p>
                  <p className="text-white text-xl lg:text-lg xl:text-xl">
                    {parseFloat((SingleData.votePercentage * 100).toFixed(2)) +
                      "%"}
                  </p>
                </div>
                <Line
                  percent={parseFloat(
                    (SingleData.votePercentage * 100).toFixed(2)
                  )}
                  strokeWidth="4"
                  strokeColor="#D3D3D3"
                  className="px-5"
                />
              </div>
            );
          })
        : null;

    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <div className="pt-3 px-10 flex flex-row justify-between space-x-5 items-center">
          <div className="flex flex-row space-x-5 items-center">
            <img src={CompanyLogo} alt="Zergaw ISP Logo" className="w-24" />
            <div className="flex flex-col space-y-1 text-left">
              <span className="text-white">POWERED BY</span>
              <p className="text-white font-bold text-2xl">Zergaw ISP</p>
            </div>
          </div>
          <select
            className="px-5 py-4 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none"
            id="memberVoteType"
            name="memberVoteType"
            type="text"
            onChange={handleSelectionTypeChange}
          >
            <option value="" className="text-third">
              Choose vote type
            </option>
            <option value="BOARD_MEMBER_SELECTION" className="text-third">
              የዳይሬክተሮች ቦርድ አባላትን መምረጥ
            </option>

            {/* Mapping Meeting list from the store */}
            {this.state.meetingAgendaList.length > 0 ? (
              this.state.meetingAgendaList.map((SingleTitleAndID) => (
                <option value={SingleTitleAndID.id} className="text-third">
                  {SingleTitleAndID.title}
                </option>
              ))
            ) : (
              <option>No Meeting List Available</option>
            )}
            {/* End of mapping */}
          </select>
        </div>
        <div className="flex flex-col justify-center items-center text-white w-full mt-16">
          {console.log(this.state.selectedCandidatesAndTheirVote)}
          {this.state.selectedOption !== "" ? (
            this.state.isShiftingLoading === true ? (
              <RaiseLoader size="15" color="#fff" />
            ) : this.state.selectedAgenda.length > 0 ? (
              <>
                <>{mappingMeetingVote}</>
              </>
            ) : (
              <div className="flex flex-row flex-wrap w-full px-20 mt-20">
                {mappingVoteDisplay}
              </div>
            )
          ) : (
            <p className="w-screen mt-52 text-3xl font-bold">
              No Option Selected
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default VoteIndex;
