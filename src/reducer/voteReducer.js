// COMPONENT IMPORTS
import {
  ISLOADING,
  VOTING_MEETING_AGENDA_SUCCESS,
  VOTING_MEETING_AGENDA_ERROR,
  BOARD_VOTE_ERROR,
  BOARD_VOTE_SUCCESS,
} from "../action/types";

// EXTERNAL IMPORT
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISLOADING:
      console.log("Is Loading . . . ");
      return { ...state, isLoading: true };
    case VOTING_MEETING_AGENDA_SUCCESS:
      toast.success("Attendant Vote Submitted !", {
        position: "bottom-center",
      });
      return { ...state, isLoading: false };
    case VOTING_MEETING_AGENDA_ERROR:
      toast.error("Error: " + action.payload, { position: "bottom-center" });
      return { ...state, isLoading: false };
    case BOARD_VOTE_SUCCESS:
      toast.success("Vote Submitted Successfully", {
        position: "bottom-center",
      });
      return { ...state, isLoading: false };
    case BOARD_VOTE_ERROR:
      toast.error("Error: " + action.payload, { position: "bottom-center" });
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default voteReducer;
