// COMPONENT IMPORT
import {
  VOTING_MEETING_AGENDA_LOADING,
  BOARD_VOTE_LOADING,
  VOTING_MEETING_AGENDA_SUCCESS,
  VOTING_MEETING_AGENDA_ERROR,
  BOARD_VOTE_SUCCESS,
  BOARD_VOTE_ERROR,
} from "./types";

// EXTERNAL IMPORT
import { instance } from "../api/config";

export const submitMeetingVote = (
  meetingAgendaVoteData,
  selectedMeetingAgenda
) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: VOTING_MEETING_AGENDA_LOADING });

    // Operation
    console.log(meetingAgendaVoteData, selectedMeetingAgenda);
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

export const submitCandidateVote = (candidates, barcode, candidateVoteType) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: BOARD_VOTE_LOADING });

    // Operation
    instance
      .post("/vote/" + candidateVoteType, { candidates, barcode })
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
