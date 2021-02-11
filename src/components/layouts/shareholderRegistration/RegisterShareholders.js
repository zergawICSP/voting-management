import React, { Component } from 'react';

// COMPONENT IMPORTS
import ShareholderRegistrationForm from "./RegisterShareholderForm";

class RegisterShareholder extends Component {

    render() {
        return (
          <div className="w-1/2">
            <div className="p-5 rounded-2xl shadow-xl flex flex-col justify-center mt-3 mb-10">
              <p className="font-bold text-xl">Register New Shareholder</p>
              <ShareholderRegistrationForm
                selectedShareholderData={this.state.selectedShareholderData}
              />
            </div>
          </div>
        );
    }
}

export default RegisterShareholder;