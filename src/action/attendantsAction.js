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
  ADD_NEW_DELEGATE_LOADING,
  UPDATE_DELEGATE_LOADING,
  ADD_NEW_DELEGATE_SUCCESS,
  ADD_NEW_DELEGATE_ERROR,
  UPDATE_DELEGATE_SUCCESS,
  UPDATE_DELEGATE_ERROR,
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

    // Operation
    instance
      .post("/attend-delegate/" + checkedAttendantsID, { barcode: barcode })
      .then((response) => {
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

export const submittingDelegateRegisteration = (newDelegateData) => {
  return (dispatch) => {
    // dispatching loading indicator
    dispatch({ type: ADD_NEW_DELEGATE_LOADING });

    // opertaion
    instance
      .post("/delegates", newDelegateData)
      .then((response) => {
        if (response.status === 201)
          dispatch({ type: ADD_NEW_DELEGATE_SUCCESS });
        else
          dispatch({
            type: ADD_NEW_DELEGATE_ERROR,
            payload: response.status + ": Bad Request",
          });
      })
      .catch((error) =>
        dispatch({
          type: ADD_NEW_DELEGATE_ERROR,
          payload: error.response.data.error,
        })
      );
  };
};

export const updatingDelegate = (updatedDelegateData, delegateID) => {
  return (dispatch) => {
    // dispatching loading indicator
    dispatch({ type: UPDATE_DELEGATE_LOADING });

    // operation
    instance
      .put("/delegates/" + delegateID, updatedDelegateData)
      .then((response) => {
        if (response.status === 200)
          dispatch({ type: UPDATE_DELEGATE_SUCCESS });
        else
          dispatch({
            type: UPDATE_DELEGATE_ERROR,
            payload: response.status + ":Bad Request",
          });
      })
      .catch((error) =>
        dispatch({
          type: UPDATE_DELEGATE_ERROR,
          payload: error.response.data.error,
        })
      );
  };
};
