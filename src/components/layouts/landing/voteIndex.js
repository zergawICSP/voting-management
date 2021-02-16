import React, { Component } from "react";

// EXTERNAL IMPORTS
import { toast } from "react-toastify";
import RaiseLoader from "react-spinners/RiseLoader";

// COMPONENT IMPORTS
import { instance } from "../../../api/config";
import { numberFormat } from "../../shared/shareedVariables";
import LogoHeader from "../nav/LogoHeader";

// IMAGE IMPORT
import BrandingImage from "../../../assets/images/Zerga ISP Branding.png";

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
              }, 10000);
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
                }, 10000);
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
                className="flex flex-col justify-between items-center space-y-20 w-full mt-16 z-40"
                key={SingleData.id}
              >
                <div className="items-center px-4 w-full">
                  <p className="text-white text-7xl font-bold">
                    {"የጉባኤው አጀንዳ፡ " + SingleData.title}
                  </p>
                </div>
                <div className="items-center w-full mt-20 bg-third p-5">
                  <div className="flex flex-row justify-center items-center w-full">
                    <div className="flex flex-col justify-center items-center text-white w-1/2 space-y-3">
                      <p className="text-5xl">{numberFormat.format(parseFloat(SingleData.totalShare))}</p>
                      <p className="text-4xl">አጠቃላይ የአክሲዮን መጠን</p>
                    </div>
                    <div className="flex flex-col justify-center items-center text-white w-1/2 space-y-3">
                      <p className="text-5xl">{numberFormat.format(parseFloat(SingleData.korem)) + "( " + parseFloat(SingleData.koremPercentage).toFixed(2) + "% )"}</p>
                      <p className="text-4xl">አጀንዳውን የታደመው የአክሲዮን መጠን</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-screen space-x-3 mt-20">
                  <div className="flex flex-col justify-center items-center space-y-10 w-1/3">
                    <p className="text-7xl text-white">ድጋፍ</p>
                    <p className="text-7xl font-bold text-white mt-20">
                      {numberFormat.format(parseFloat(SingleData.yes)) +
                        " አክሲዮን"}
                    </p>
                    <p className="text-5xl font-bold text-white">
                      {"(" +
                        parseFloat(SingleData.yesPercentage.toFixed(2)) +
                        "%)"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-10 w-1/3">
                    <p className="text-7xl text-white">ተቃውሞ</p>
                    <p className="text-7xl font-bold text-white mt-20">
                      {numberFormat.format(parseFloat(SingleData.no)) +
                        " አክሲዮን"}
                    </p>
                    <p className="text-5xl font-bold text-white">
                      {"(" +
                        parseFloat(SingleData.noPercentage.toFixed(2)) +
                        "%)"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-10 w-1/3">
                    <p className="text-7xl text-white">ድምጸ ተአቅቦ</p>
                    <p className="text-7xl font-bold text-white mt-20">
                      {numberFormat.format(parseFloat(SingleData.neutral)) +
                        " አክሲዮን"}
                    </p>
                    <p className="text-5xl font-bold text-white">
                      {"(" +
                        parseFloat(SingleData.neutralPercentage.toFixed(2)) +
                        "%)"}
                    </p>
                  </div>
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
                className="w-1/6 flex flex-col space-y-2 mb-5 p-4 shadow-lg z-40"
                key={SingleData.id}
              >
                <div className="flex flex-col justify-between px-4 text-center space-y-3 h-full">
                  <p className="text-white text-2xl lg:text-xl xl:text-2xl w-full">
                    {SingleData.name}
                  </p>
                  <p className="text-white text-xl lg:text-lg xl:text-xl font-bold">
                    {parseFloat((SingleData.votePercentage * 100).toFixed(2)) +
                      "%"}
                  </p>
                </div>
                {/* <Line
                  percent={parseFloat(
                    (SingleData.votePercentage * 100).toFixed(2)
                  )}
                  strokeWidth="4"
                  strokeColor="#D3D3D3"
                  className="px-5"
                /> */}
              </div>
            );
          })
        : null;

    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary relative">
        <div className="pt-3 px-10 flex flex-row justify-between space-x-5 items-center">
          <LogoHeader />
          <select
            className="px-5 py-3 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none"
            id="memberVoteType"
            name="memberVoteType"
            type="text"
            onChange={handleSelectionTypeChange}
          >
            <option value="" className="text-third">
              የሚፈልጉትን ይምረጡ
            </option>
            {/* <option value="BOARD_MEMBER_SELECTION" className="text-third">
              የዳይሬክተሮች ቦርድ አባላትን መምረጥ
            </option> */}

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
              <div className="flex flex-row flex-wrap w-full px-20 mt-10">
                {mappingVoteDisplay}
              </div>
            )
          ) : (
            <p className="w-screen mt-52 text-3xl font-bold">የሚፈልጉትን ይምረጡ !</p>
          )}
        </div>
        {/* Branding Zergaw ISP */}
        <img
          src={BrandingImage}
          alt="Zergaw ISP Branding"
          className="absolute bottom-0 left-0 z-0 h-5/6"
        />
      </div>
    );
  }
}

export default VoteIndex;
