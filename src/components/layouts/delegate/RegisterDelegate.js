import React, { Component } from "react";

// COMPONENT IMPORTS
import DelegateRegistrationForm from "./RegisterDelegateForm";

class RegisterDelegate extends Component {
  render() {
    return (
      <div className="w-1/2">
        <div className="p-5 rounded-2xl shadow-xl flex flex-col justify-center mt-3 mb-10">
          <p className="font-bold text-xl">Register New Delegate</p>
          <DelegateRegistrationForm
            selectedDelegateData={this.state.selectedDelegateData}
          />
        </div>
      </div>
    );
  }
}

export default RegisterDelegate;
