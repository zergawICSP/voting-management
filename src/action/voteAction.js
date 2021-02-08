// COMPONENT IMPORT
import {
  VOTING_MEETING_AGENDA_SUCCESS,
  VOTING_MEETING_AGENDA_ERROR,
  BOARD_VOTE_SUCCESS,
  BOARD_VOTE_ERROR,
  ISLOADING,
} from "./types";

// EXTERNAL IMPORT
import { instance } from "../api/config";

export const submitMeetingVote = (
  meetingAgendaVoteData,
  selectedMeetingAgenda
) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: ISLOADING });

    // Operation
    instance
      .post(
        "/vote-meeting-agenda/" + selectedMeetingAgenda,
        meetingAgendaVoteData
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          dispatch({ type: VOTING_MEETING_AGENDA_SUCCESS });
        } else {
          dispatch({
            type: VOTING_MEETING_AGENDA_ERROR,
            payload: response.status + ": Bad Request",
          });
        }
      })
      .catch((error) =>
        dispatch({
          type: VOTING_MEETING_AGENDA_ERROR,
          payload: error.response.data.error,
        })
      );
  };
};

export const submitCandidateVote = (candidates, barcode) => {
  return (dispatch) => {
    // console.log(candidates, barcode);
    // Dispatching loading indicator
    dispatch({ type: ISLOADING });

    // Operation
    instance
      .post("/vote/2", { candidates, barcode })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: BOARD_VOTE_SUCCESS });
        } else
          dispatch({
            type: BOARD_VOTE_ERROR,
            payload: response.error + ": Bad Request",
          });
      })
      .catch((error) =>
        dispatch({ type: BOARD_VOTE_ERROR, payload: error.response.data.error })
      );
  };
};