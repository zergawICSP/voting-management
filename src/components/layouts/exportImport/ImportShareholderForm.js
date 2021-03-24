import React, { Component } from "react";

// EXTERNAL IMPORT
import { toast } from "react-toastify";
import { instance } from "../../../api/config";
import RiseLoader from "react-spinners/RiseLoader";

class ImportShareholderForm extends Component {
  state = {
    importedFile: null,
    isImportedFileLoading: false,
  };

  render() {
    const handleOnChange = (e) => {
      this.setState({importedFile: e.target.files[0]});
      // this.setState({ [e.target.name]: e.target.value });
    };

    const submitImporting = (e) => {
      e.preventDefault();
      if (this.state.importedFile !== null) {
        this.setState({ isImportedFileLoading: true });

        let shareholdersFormData = new FormData();
        shareholdersFormData.set('shareholders', this.state.importedFile);
        // let shareholders = shareholdersFormData.get('importedFile');
        // shareholdersFormData.entries().map((shareholder => console.log(shareholder[0])));
        // console.log(shareholdersFormData.entries('shareholders').map);

        instance
          .post("/import/shareholders", shareholdersFormData)
          .then((response) => {
            console.log(response);
            if (response.status === 200)
              toast.success("File Imported Successfully", {
                position: "bottom-center",
              });
            else
              toast.error(response.status + ": Bad Request.", {
                position: "bottom-center",
              });
          })
          .catch((error) =>
            toast.error(
              "Error Found While Importing File: " + error.response.data.error,
              { position: "bottom-center" }
            )
          );
        this.setState({ isImportedFileLoading: false });
      } else
        toast.error(
          "One or more field is required. Please fill and submit again.",
          { position: "bottom-center" }
        );
    };

    return (
      <div className="w-3/4 m-auto text-white mt-10">
        <form onSubmit={submitImporting} enctype="multipart/form-data">
          <div className="flex flex-col space-y-4 text-left">
            <label>Import Share Record Data</label>
            <input
              className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
              placeholder="Enter New Agenda Title"
              id="importedFile"
              name="importedFile"
              type="file"
              // value={this.state.importedFile}
              onChange={handleOnChange}
            />
          </div>
          {this.state.isImportedFileLoading ? (
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

export default ImportShareholderForm;
