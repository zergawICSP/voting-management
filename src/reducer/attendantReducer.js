// COMPONENT IMPORTS
import { ISLOADING, SEND_ATTENDANCE_DATA_SUCCESS, SEND_ATTENDANCE_DATA_ERROR, ADD_NEW_SHAREHOLDER_ERROR, ADD_NEW_SHAREHOLDER_SUCCESS } from "../action/types";

// EXTERNAL IMPORT
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
};

const attendantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISLOADING:
      console.log("Is Loading . . . ");
      return { ...state, isLoading: true };
    case SEND_ATTENDANCE_DATA_SUCCESS:
      toast.success('Attendant successfully updated !', { position: "bottom-center" });
      return { ...state, isLoading: false };
    case SEND_ATTENDANCE_DATA_ERROR:
      toast.error(action.payload, { position: "bottom-center" });
      return { ...state, isLoading: false };
    case ADD_NEW_SHAREHOLDER_SUCCESS:
      toast.success("Shareholder Added Successfully !", { position: "bottom-center" });
      return { ...state, isLoading: false };
    case ADD_NEW_SHAREHOLDER_ERROR:
      toast.error(action.payload, { position: "bottom-center" });
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default attendantReducer;
