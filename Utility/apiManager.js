import axios from "axios";
import BASE_URL from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const apiKey = import.meta.env.BASE_URL;
const openApis = ["auth/login", "auth/register"];

const sendRequest = async (method, url, payload, contentType, userType) => {
  const token = await getMyObject();

  console.log(
    "url",
    setRequestOptions(method, url, payload, contentType, userType, token)
  );

  return new Promise((resolve, reject) => {
    axios
      .request(
        setRequestOptions(method, url, payload, contentType, userType, token)
      )
      .then((response) => {
        // console.log(url, response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log("errorrr", error);
        if (error.response) {
          // console.log("APICatch - ", error.response.data);
        }
        reject(error.response?.data.error);
      });
  });
};

const setRequestOptions = (
  method,
  url,
  payload,
  contentType,
  userType,
  token
) => {
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
          Authorization: token,
        },
      };
    }
  } else {
    header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
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

const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("currentUser");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};

export default sendRequest;
