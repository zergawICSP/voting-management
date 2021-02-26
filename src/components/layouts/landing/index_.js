import React, { Component } from "react";

// EXTERNAL IMPORTS
import { toast } from "react-toastify";
import { instance } from "../../../api/config";
import { numberFormat } from "../../shared/shareedVariables";

// COMPONENET IMPORT
import LogoHeader from "../nav/LogoHeader";

// IMAGE IMPORT
import BrandingImage from "../../../assets/images/Zerga ISP Branding.png";

class AppLanding extends Component {
  // Component state
  state = {
    choosenSelectionType: null,
    selectedCandidatesAndTheirVote: [],
    MeetingVote: [],
    attendantsCount: null,
    precentageOfAttendants: null,
    totalShare: null,
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
            precentageOfAttendants: parseFloat(
              response.data.percentage.toFixed(2)
            ),
            totalShare: parseFloat(response.data.totalShare),
          });
        })
        .catch((error) =>
          toast.error(error.response.data.error, { position: "bottom-center" })
        );
    }, 10000);
  }

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-primary to-secondary pt-5">
        <LogoHeader />
        <div className="px-10 mt-24 pb-20 flex flex-row justify-around space-x-10 divide-x-2 divide-solid divide-white lg:mt-5 z-40">
          <div className="flex flex-col justify-center items-center text-white w-full">
            <div className="flex flex-row w-full justify-center items-start m-auto">
              <div className="flex flex-col justify-center items-center w-1/2">
                <p className="font-extrabold text-6xl">
                  {this.state.attendantsCount !== null
                    ? numberFormat.format(this.state.attendantsCount)
                    : 0}
                </p>
                <p className="font-bold text-5xl mt-10 xl:text-6xl">
                  በእለቱ የታደመው የአክሲዮን መጠን
                </p>
              </div>
              <div className="flex flex-col justify-center items-center w-1/2">
                <p className="font-extrabold text-6xl">
                  {this.state.totalShare !== null
                    ? numberFormat.format(this.state.totalShare)
                    : 0}
                </p>
                <p className="font-bold text-5xl mt-10 lg:text-6xl">
                  አጠቃላይ የአክሲዮን መጠን
                </p>
              </div>
            </div>
            <div className="mt-32">
              <p className="font-extrabold text-9xl">
                {this.state.precentageOfAttendants !== null
                  ? parseFloat(this.state.precentageOfAttendants).toFixed(2) + "%"
                  : 0}
              </p>
              <p className="font-bold text-5xl mt-10 lg:text-6xl">
                ኮረም <br />
                (የታደመው አክሲዮን ከአጠቃላይ አክሲዮን)
              </p>
            </div>
          </div>
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

export default AppLanding;