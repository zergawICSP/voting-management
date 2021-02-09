import React, { Component } from "react";

// EXTERNAL IMPORTS
import { toast } from "react-toastify";
import { instance } from "../../../api/config";

// IMAGE IMPORT
import CompanyLogo from "../../../assets/images/Zergaw ISP Logo.png";

class AppLanding extends Component {
  // Component state
  state = {
    choosenSelectionType: null,
    selectedCandidatesAndTheirVote: [],
    MeetingVote: [],
    attendantsCount: null,
    precentageOfAttendants: null,
    isLoading: false,
  };

  // Handling real-time fetching
  componentDidMount() {
    // For attendants
    setInterval(() => {
      instance
        .get("/attendants")
        .then((response) => {
          console.log(response.data);
          this.setState({
            attendantsCount: parseFloat(response.data.no_of_attendants),
            precentageOfAttendants: parseFloat(response.data.percentage.toFixed(2))
          });
        })
        .catch((error) =>
          toast.error(error.response.data.error, { position: "bottom-center" })
        );
    }, 10000);
  }

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary">
        <div className="py-10 px-10 flex flex-row space-x-5 items-center">
          <img src={CompanyLogo} alt="Zergaw ISP Logo" className="w-24" />
          <div className="flex flex-col space-y-1 text-left">
            <span className="text-white">POWERED BY</span>
            <p className="text-white font-bold text-2xl">Zergaw ISP</p>
          </div>
        </div>
        <div className="px-20 mt-20 pb-20 flex flex-row justify-around space-x-10 divide-x-2 divide-solid divide-white lg:mt-5">
          <div className="flex flex-col justify-center items-center text-white w-full">
            <p className="font-extrabold text-9xl">
              {this.state.attendantsCount !== null
                ? this.state.attendantsCount
                : 0}
            </p>
            <p className="font-bold text-7xl mt-10 lg:text-7xl">
              Attendant Share
            </p>
            <div className="mt-20">
              <p className="font-extrabold text-9xl">
                {this.state.precentageOfAttendants !== null
                  ? this.state.precentageOfAttendants + "%"
                  : 0}
              </p>
              <p className="font-bold text-7xl mt-10 lg:text-7xl">
                Percent of Total Share
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppLanding;
