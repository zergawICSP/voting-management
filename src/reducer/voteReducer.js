// COMPONENT IMPORTS
import {
  BOARD_VOTE_LOADING,
  VOTING_MEETING_AGENDA_LOADING,
  VOTING_MEETING_AGENDA_SUCCESS,
  VOTING_MEETING_AGENDA_ERROR,
  BOARD_VOTE_ERROR,
  BOARD_VOTE_SUCCESS,
} from "../action/types";

// EXTERNAL IMPORT
import { toast } from "react-toastify";

const initialState = {
  isMeetingVoteLoading: false,
  isBoardVoteLoading: false,
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTING_MEETING_AGENDA_LOADING:
      return { ...state, isMeetingVoteLoading: true };
    case BOARD_VOTE_LOADING:
      return { ...state, isBoardVoteLoading: true };
    case VOTING_MEETING_AGENDA_SUCCESS:
      toast.success("Attendant Vote Submitted !", {
        position: "bottom-center",
      });
      return { ...state, isMeetingVoteLoading: false };
    case VOTING_MEETING_AGENDA_ERROR:
      toast.error("Error: " + action.payload, { position: "bottom-center" });
      return { ...state, isMeetingVoteLoading: false };
    case BOARD_VOTE_SUCCESS:
      toast.success("Vote Submitted Successfully", {
        position: "bottom-center",
      });
      return { ...state, isBoardVoteLoading: false };
    case BOARD_VOTE_ERROR:
      toast.error("Error: " + action.payload, { position: "bottom-center" });
      return { ...state, isBoardVoteLoading: false };
    default:
      return state;
  }
};

export default voteReducer;
