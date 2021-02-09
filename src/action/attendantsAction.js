// COMPONENT IMPORT
import {
  IS_SENDING_ATTENDANT_DATA_LOADING,
  SEND_ATTENDANCE_DATA_SUCCESS,
  SEND_ATTENDANCE_DATA_ERROR,
  ADD_NEW_SHAREHOLDER_ERROR,
  ADD_NEW_SHAREHOLDER_SUCCESS,
  ADD_NEW_SHAREHOLDER_LOADING,
} from "./types";

// EXTERNAL IMPORT
import { instance } from "../api/config";

export const submittingAttendantsData = (checkedAttendantsID, barcode) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: IS_SENDING_ATTENDANT_DATA_LOADING });

    // Operation
    instance
      .post("/attend/" + checkedAttendantsID, { barcode: barcode })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SEND_ATTENDANCE_DATA_SUCCESS });
        } else {
          dispatch({
            type: SEND_ATTENDANCE_DATA_ERROR,
            payload: response.status + ": Bad request.",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SEND_ATTENDANCE_DATA_ERROR,
          payload: error.response.data.error,
        });
      });
  };
};

export const submittingShareholderRegistration = (newShareholderData) => {
  return (dispatch) => {
    // dispatching loading indicator
    dispatch({ type: ADD_NEW_SHAREHOLDER_LOADING });

    // opertaion
    instance
      .post("/shareholders", newShareholderData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201)
          dispatch({ type: ADD_NEW_SHAREHOLDER_SUCCESS });
        else
          dispatch({
            type: ADD_NEW_SHAREHOLDER_ERROR,
            payload: response.status + ": Bad Request",
          });
      })
      .catch((error) =>
        dispatch({
          type: ADD_NEW_SHAREHOLDER_ERROR,
          payload: error.response.data.error,
        })
      );
  };
};
