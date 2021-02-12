// COMPONENT IMPORT
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

export const submittingDelegateAttendantsData = (
  checkedAttendantsID,
  barcode
) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: DELEGATE_ATTENDANCE_LOADING });
    console.log(checkedAttendantsID, barcode);
    // Operation
    instance
      .post("/attend-delegate/" + checkedAttendantsID, { barcode: barcode })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: SEND_DELEGATE_ATTENDANCE_DATA_SUCCESS });
        } else {
          dispatch({
            type: SEND_DELEGATE_ATTENDANCE_DATA_ERROR,
            payload: response.status + ": Bad request.",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SEND_DELEGATE_ATTENDANCE_DATA_ERROR,
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

export const updatingShareholder = (updatedShareholderData, shareholderID) => {
  return (dispatch) => {
    // dispatching loading indicator
    dispatch({ type: UPDATE_SHAREHOLDER_LOADING });

    // operation
    instance
      .put("/shareholders/" + shareholderID, updatedShareholderData)
      .then((response) => {
        if (response.status === 200)
          dispatch({ type: UPDATE_SHAREHOLDER_SUCCESS });
        else
          dispatch({
            type: UPDATE_SHAREHOLDER_ERROR,
            payload: response.status + ":Bad Request",
          });
      })
      .catch((error) =>
        dispatch({
          type: UPDATE_SHAREHOLDER_ERROR,
          payload: error.response.data.error,
        })
      );
  };
};