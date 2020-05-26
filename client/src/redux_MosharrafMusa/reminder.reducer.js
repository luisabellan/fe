// import actions
import {
  FETCH_REMINDERS_START,
  FETCH_REMINDERS_SUCCESS,
  FETCH_REMINDERS_FAILURE,
  ADD_REMINDERS,
  DELETE_REMINDERS,
} from "./reminder.actions";

// initial
const initialState = {
  reminders: [],
  isRemindersLoading: false,
  error: null,
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REMINDERS_START:
      return {
        ...state,
        isRemindersLoading: true,
        error: "",
      };
    case FETCH_REMINDERS_SUCCESS:
      return {
        ...state,
        isRemindersLoading: false,
        reminders: action.payload,
      };
    case FETCH_REMINDERS_FAILURE:
      return {
        ...state,
        isRemindersLoading: false,
        error: "Yikes, the API is down.",
      };
    case ADD_REMINDERS:
      return {
        ...state,
        isRemindersLoading: false,
        reminders: [action.payload, ...state.reminders],
      };
    case DELETE_REMINDERS:
      return {
        ...state,
        reminders: state.reminders.filter((e) => e.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reminderReducer;
