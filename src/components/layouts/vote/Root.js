import React, { Component } from "react";

// EXTERNAL IMPORTS
import { Redirect } from "react-router-dom";
import { instance } from "../../../api/config";

// COMPONENT IMPORTS
import AppNavigation from "../nav/Nav";
import AgendaVoteForm from "./AgendaVoteForm";
import CandidateVoteForm from "./CandidateVoteForm";

class Root extends Component {
  // Component state value
  state = {
    isAgendaSelected: false,
    isCandidateTypeSelected: false,
    selectedAgendaId: null,
    selectedCandidateType: null,
    meetingAgendaList: [],
  };

  componentDidMount() {
    instance
      .get("/meeting-agendas")
      .then((response) =>
        this.setState({ meetingAgendaList: response.data.agendas })
      );
  }

  render() {
    // Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    // Local variables
    const { meetingAgendaList } = this.state;
    // Handling agenda id selection
    const handleAgendaIDSelection = (e) => {
      let inputSelectedValue = e.target.value;
      if (inputSelectedValue !== "") {
        this.setState(
          {
            isAgendaSelected: true,
            selectedAgendaId: inputSelectedValue,
          },
          () => {
            console.log("Meeting ID: " + this.state.selectedAgendaId);
            console.log("Agenda Selected:" + this.state.isAgendaSelected);
          }
        );
      } else {
        this.setState({ isAgendaSelected: false, selectedAgendaId: "" });
      }
    };

    const handleCandidateVoteTypeID = (e) => {
      let inputSelectedValue = e.target.value;
      if (inputSelectedValue !== "") {
        this.setState({
          selectedCandidateType: inputSelectedValue,
          isCandidateTypeSelected: true,
        });
      } else {
        this.setState({
          isCandidateTypeSelected: false,
          selectedCandidateType: "",
        });
      }
    };

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />
        <div className="flex flex-col justify-center h-full mb-32">
          <p className="text-5xl font-bold mt-40">Attendant Vote Count Form</p>
          <div className="flex flex-row justify-center mt-20 divide-x-2 divider-white divider-solid">
            <div className="flex flex-col space-y-5 w-1/2">
              <p className="text-2xl font-semibold">Agenda Vote</p>
              <form className="pt-10">
                <div className="">
                  <select
                    className="px-5 py-2 bg-transparent border border-gray-100 rounded-full focus:outline-none focus:text-third w-1/2"
                    id="agendaName"
                    name="agendaName"
                    onChange={handleAgendaIDSelection}
                  >
                    <option value="" className="text-third">
                      Choose Agenda
                    </option>

                    {/* Mapping Meeting list from the store */}
                    {meetingAgendaList.length > 0 ? (
                      meetingAgendaList.map((SingleTitleAndID) => (
                        <option
                          value={SingleTitleAndID.id}
                          className="text-third"
                        >
                          {SingleTitleAndID.title}
                        </option>
                      ))
                    ) : (
                      <option>No Meeting List Available</option>
                    )}

                    {/* End of mapping */}
                  </select>
                </div>
              </form>

              {/* Detail list of Form elements */}

              {this.state.isAgendaSelected ? (
                <AgendaVoteForm
                  selectedAgendaId={this.state.selectedAgendaId}
                />
              ) : null}

              {/* End of detail list of form element */}
            </div>
            <div className="flex flex-col space-y-5 w-1/2">
              <p className="text-2xl font-semibold">Candidate Vote</p>
              <form className="pt-10">
                <div className="">
                  <select
                    className="px-5 py-2 bg-transparent border border-gray-100 rounded-full focus:outline-none focus:text-third w-1/2"
                    id="agendaName"
                    name="agendaName"
                    onChange={handleCandidateVoteTypeID}
                  >
                    <option value="" className="text-third">
                      Choose Candidate Type
                    </option>
                    <option
                      value="BOARD_MEMBER_SELECTION"
                      className="text-third"
                    >
                      Board Member Candidate Vote Count
                    </option>
                  </select>
                </div>
              </form>

              {/* Detail list of Form elements */}

              {this.state.isCandidateTypeSelected ? (
                <CandidateVoteForm />
              ) : null}

              {/* End of detail list of form element */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
