import axios from "axios";
import BASE_URL from "./config";
// const apiKey = import.meta.env.BASE_URL;
const openApis = ["auth/login", "auth/register"];

const sendRequest = (method, url, payload, contentType, userType) => {
  //   console.log(url, payload);
  return new Promise((resolve, reject) => {
    axios
      .request(setRequestOptions(method, url, payload, contentType, userType))
      .then((response) => {
        // console.log(url, response);
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // console.log("APICatch - ", error.response.data);
        }
        reject(error.response?.data.error);
      });
  });
};

const setRequestOptions = (method, url, payload, contentType, userType) => {
  //   const storedItem =
  //     userType == "admin"
  //       ? localStorage.getItem("admin_user")
  //       : localStorage.getItem("current_user");
  //   const storedData = JSON.parse(storedItem);

  const filtered = openApis.find((item) => item == url);
  let header = {};

  if (contentType && contentType == "formData") {
    if (filtered == undefined) {
      header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: storedData?.token,
        },
      };
    }
  } else {
    if (!filtered == undefined) {
      header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    } else if (filtered == undefined) {
      header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: storedData?.token,
        },
      };
    }
  }
  header["method"] = method;
  header["url"] = `${BASE_URL}/${url}`;

  if (method !== "GET") {
    header["data"] = payload;
  } else {
    header["params"] = payload;
  }
  //   console.log("headers", header);
  return header;
};

export default sendRequest;
