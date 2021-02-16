// COMPONENT IMPORTS
import {
  IS_SENDING_ATTENDANT_DATA_LOADING,
  SEND_ATTENDANCE_DATA_SUCCESS,
  SEND_ATTENDANCE_DATA_ERROR,
  ADD_NEW_SHAREHOLDER_ERROR,
  ADD_NEW_SHAREHOLDER_SUCCESS,
  ADD_NEW_SHAREHOLDER_LOADING,
  UPDATE_SHAREHOLDER_LOADING,
  UPDATE_SHAREHOLDER_SUCCESS,
  UPDATE_SHAREHOLDER_ERROR,
  SEND_DELEGATE_ATTENDANCE_DATA_ERROR,
  SEND_DELEGATE_ATTENDANCE_DATA_SUCCESS,
  DELEGATE_ATTENDANCE_LOADING,
} from "../action/types";

// EXTERNAL IMPORT
import { toast } from "react-toastify";

const initialState = {
  isAttendantLoading: false,
  isShareholderCreationLoading: false,
  isShareholderUpdationLoading: false,
  isDelegateAttendantLoading: false,
};

const attendantReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_SENDING_ATTENDANT_DATA_LOADING:
      return { ...state, isAttendantLoading: true };
    case ADD_NEW_SHAREHOLDER_LOADING:
      return { ...state, isShareholderCreationLoading: true };
    case UPDATE_SHAREHOLDER_LOADING:
      return { ...state, isShareholderUpdationLoading: true };
    case DELEGATE_ATTENDANCE_LOADING:
      return { ...state, isDelegateAttendantLoading: true };
    case SEND_ATTENDANCE_DATA_SUCCESS:
      toast.success("Attendant successfully updated !", {
        position: "bottom-center",
      });
      return { ...state, isAttendantLoading: false };
    case SEND_ATTENDANCE_DATA_ERROR:
      toast.error(action.payload, { position: "bottom-center" });
      return { ...state, isAttendantLoading: false };
    case ADD_NEW_SHAREHOLDER_SUCCESS:
      toast.success("Shareholder Added Successfully !", {
        position: "bottom-center",
      });
      return { ...state, isShareholderCreationLoading: false };
    case ADD_NEW_SHAREHOLDER_ERROR:
      toast.error(action.payload, { position: "bottom-center" });
      return { ...state, isShareholderCreationLoading: false };
    case UPDATE_SHAREHOLDER_SUCCESS:
      toast.success("Shareholder Updated Successfully !", {
        position: "bottom-center",
      });
      return { ...state, isShareholderUpdationLoading: false };
    case UPDATE_SHAREHOLDER_ERROR:
      toast.error("Error Found While Updating Shareholder: " + action.payload, {
        position: "bottom-center",
      });
      return { ...state, isShareholderUpdationLoading: false };
    case SEND_DELEGATE_ATTENDANCE_DATA_SUCCESS:
      toast.success("Delegate Attendance Submitted Successfully !", { position: "bottom-center" });
      return { ...state, isDelegateAttendantLoading: false };
    case SEND_DELEGATE_ATTENDANCE_DATA_ERROR:
      toast.error("Delegate Attendance Error: " + action.payload, { position: "bottom-center" });
      return { ...state, isDelegateAttendantLoading: false };
    default:
      return state;
  }
};

export default attendantReducer;
