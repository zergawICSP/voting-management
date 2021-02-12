import React, { Component } from "react";

// COMPONENT IMPORT
import AppNavigation from "../nav/Nav";
import CandidateVoteForm from "./CandidateVoteForm";

// EXPORT IMPORT
import { Redirect } from "react-router-dom";

class CandidateVoteRoot extends Component {
  render() {
    //   Route Guarding
    if (!localStorage.getItem("username")) return <Redirect to="/login" />;
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-bl from-primary to-secondary text-white">
        <AppNavigation />
        <div className="flex flex-col justify-center h-full mb-32">
          <p className="text-5xl font-bold mt-40">
            Board Member Vote Entry Form
          </p>
        </div>

        {/* Board Member Vote Form */}
        <CandidateVoteForm />

        {/* Footer */}
        {/* Powered by */}
        <p className="text-white mt-52 relative bottom-0 pb-5 font-light">
          Powered by{" "}
          <span className="font-bold text-companyYello">Zergaw ISP</span>
        </p>
      </div>
    );
  }
}

export default CandidateVoteRoot;
