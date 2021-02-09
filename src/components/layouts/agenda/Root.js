import React, { Component } from "react";

import { toast } from "react-toastify";
import { instance } from "../../../api/config";
import AppNavigation from "../nav/Nav";
import { Redirect } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

class Root extends Component {
  state = {
    meetingAgendaList: [],
    selectedMeetingID: "",
    isLoading: false,
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
    // Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;

    const handleSelectionTypeChange = (e) => {
      this.setState({ selectedMeetingID: e.target.value });
    };

      const onButtonClick = () => {
          this.setState({ isLoading: true });
      instance
        .post("/initialize/" + this.state.selectedMeetingID)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Meeting Agenda Initalized", {
              position: "bottom-center",
            });
              this.setState({ isLoading: false });
          }
        })
        .catch((error) =>
          toast.error(
            "Error Initalizing Meeting Agenda: " + error.response.data.error
          )
        );
    };

    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <AppNavigation />
        <div className="pt-3 px-10 flex flex-row justify-center space-x-5 mt-20">
          <select
            className="px-5 py-4 w-1/2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none"
            id="memberVoteType"
            name="memberVoteType"
            type="text"
            onChange={handleSelectionTypeChange}
          >
            <option value="" className="text-third">
              Choose vote type
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

          {this.state.isLoading === true ? (
            <RiseLoader size="15" color="#fff" />
          ) : (
            <button
              className="px-5 py-4 bg-white text-third rounded-full"
              onClick={() => onButtonClick()}
            >
              Initalize Agenda
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Root;
