import React, { Component } from "react";

// EXTERNAL IMPORT
import { toast } from "react-toastify";
import { instance } from "../../../api/config";
import RiseLoader from "react-spinners/RiseLoader";

class RegisterAgenda extends Component {
  state = {
    newAgendaTitle: "",
    isAgendaSubmittionLoading: false,
  };

  render() {
    const handleOnChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const submitNewAgenda = (e) => {
      e.preventDefault();
      if (this.state.newAgendaTitle !== "") {
        this.setState({ isAgendaSubmittionLoading: true });
        const title = this.state.newAgendaTitle;
        instance
          .post("/meeting-agendas", { title })
          .then((response) => {
            console.log(response);
            if (response.status === 201)
              toast.success("New Agenda Added Successfully", {
                position: "bottom-center",
              });
            else
              toast.error(response.status + ": Bad Request.", {
                position: "bottom-center",
              });
          })
          .catch((error) =>
            toast.error(
              "Error Found While Adding Agenda: " + error.response.data.error,
              { position: "bottom-center" }
            )
          );
        this.setState({ isAgendaSubmittionLoading: false });
      } else
        toast.error(
          "One or more field is required. Please fill and submit again.",
          { position: "bottom-center" }
        );
    };

    return (
      <div className="w-3/4 m-auto text-white mt-10">
        <form onSubmit={submitNewAgenda}>
          <div className="flex flex-col space-y-4 text-left">
            <label>New Agenda Title</label>
            <input
              className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
              placeholder="Enter New Agenda Title"
              id="newAgendaTitle"
              name="newAgendaTitle"
              type="text"
              value={this.state.newAgendaTitle}
              onChange={handleOnChange}
            />
          </div>
          {this.state.isAgendaSubmittionLoading ? (
            <RiseLoader size="15" color="#fff" />
          ) : (
            <button
              type="submit"
              className="bg-transparent text-white py-2 px-5 rounded-md w-full mt-5 hover:text-primary hover:bg-companyYello border border-gray-600 shadow-2xl"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default RegisterAgenda;
