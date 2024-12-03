import axios from "axios";

const url = "http://localhost:5000";

export const getData = async (id) => {
  id = id || "";
  return await axios.get(`${url}/getData/${id}`);
};

export const getGoal = async (id) => {
  id = id || "";
  return await axios.get(`${url}/getGoal/${id}`);
};

export const postData = async (users) => {
  return await axios.post(`${url}/add`, users);
};
