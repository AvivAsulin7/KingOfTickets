import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let axiosConfig = {
  headers: {
    "Content-Type": "multpart/form-data",
  },
};

const uploadTickets = async (ticket, token) => {
  let result;

  try {
    result = await api.post("uploadTickets", ticket, {
      headers: {
        "Content-Type": "multpart/form-data",
        Authorization: `JWT ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error.response.data.error;
  }
};

const checkTicketsDetails = async (ticket, token) => {
  let result;

  try {
    result = await api.post("checkFieldsTickets", ticket, {
      headers: {
        "Content-Type": "multpart/form-data",
        Authorization: `JWT ${token}`,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error.response.data.error;
  }
};

const signUp = async (user) => {
  let result;
  try {
    result = await api.post("signUp", user, axiosConfig);
    if (result.data.error) throw new Error(result.data.error);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error.toString().replace("Error: ", "");
  }
};

export const actions = {
  uploadTickets,
  signUp,
  checkTicketsDetails,
};
