// COMPONENT IMPORT
import {
  SEND_ATTENDANCE_DATA_SUCCESS,
  SEND_ATTENDANCE_DATA_ERROR,
  ISLOADING,
} from "./types";

// EXTERNAL IMPORT
import { instance } from "../api/config";

export const submittingAttendantsData = (checkedAttendantsID, barcode) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: ISLOADING });

    // Operation
    instance
      .post("/attend/" + checkedAttendantsID, {barcode: barcode})
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
        dispatch({ type: SEND_ATTENDANCE_DATA_ERROR, payload: error });
        console.log(error.response);
        console.log(barcode);
      });
  };
};
