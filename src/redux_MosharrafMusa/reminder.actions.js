import { axiosWithAuth } from "../utils_MosharrafMusa/axiosWithAuth";

// import axios from "axios";

export const FETCH_REMINDERS_START = "FETCH_REMINDERS_START";
export const FETCH_REMINDERS_SUCCESS = "FETCH_REMINDERS_SUCCESS";
export const FETCH_REMINDERS_FAILURE = "FETCH_REMINDERS_FAILURE";

export const getReminders = () => (dispatch) => {
  let id = localStorage.getItem("professor_id");
  dispatch({
    type: FETCH_REMINDERS_START,
  });
  axiosWithAuth
    .get(`/api/reminders/${id}`)
    .then((res) => {
      dispatch({
        type: FETCH_REMINDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_REMINDERS_FAILURE,
        payload: err.response,
      });
    });
};

export const ADD_REMINDERS = "ADD_REMINDERS";

export const addReminders = ({ name, description, send_date }) => {
  return (dispatch) => {
    axiosWithAuth
      .post(`/api/reminders`, {
        name,
        description,
        send_date,
      })
      .then((res) => {
        console.log("addRes", res);
        let payload = {
          name: name,
          description: description,
          send_date: send_date,
          professor_Id: parseInt(localStorage.getItem("professor_id")),
        };
        // payload.id = id
        dispatch({
          type: ADD_REMINDERS,
          payload: payload,
        });
      });
  };
};

export const DELETE_REMINDERS = "DELETE_REMINDERS";

export const deleteReminder = (id) => (dispatch) => {
  console.log("id", id);
  axiosWithAuth.delete(`/api/reminders/${id}`).then((res) => {
    console.log("delete", res);
    dispatch({ type: DELETE_REMINDERS, payload: id });
  });
};
