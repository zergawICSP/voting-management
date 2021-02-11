import React, { Component } from "react";

import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

import { instance } from "../../../api/config";
import AppNavigation from "../nav/Nav";
import AgendaRegisterForm from "./RegisterNewAgenda";

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

      if (this.state.selectedMeetingID !== "") {
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
      } else {
        toast.error(
          "One of more fields aren't filled. Please fill them and submit again !",
          { position: "bottom-center" }
        );
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <AppNavigation />
        <div className="flex flex-row justify-center items-center space-x-5 divide-x-2 divide-white divide-solid mt-32">
          <div className="w-1/2">
            <p className="text-white font-bold text-2xl">Register New Agenda</p>
            <AgendaRegisterForm />
          </div>
          <div className="w-1/2">
            <p className="text-white font-bold text-2xl">
              Initialize Specific Agenda
            </p>
            <div className="w-3/4 flex flex-col justify-center space-y-5 m-auto mt-20">
              <select
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none"
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
                  <option className="text-third">No Meeting List Available</option>
                )}
                {/* End of mapping */}
              </select>

              {this.state.isLoading === true ? (
                <RiseLoader size="15" color="#fff" />
              ) : (
                <button
                  className="px-5 py-2 bg-third text-white rounded-full"
                  onClick={() => onButtonClick()}
                >
                  Initalize Agenda
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
