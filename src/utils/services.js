import axios from "axios";

export const BASE_URL = "https://monsoonsalon.com/api/";
// export const BASE_URL = "http://192.168.2.19:4010/api/";
export const BASE_URL2 = "https://crm.smartsalon.in/";

// const BASE_URL = "http://192.168.2.25:4000/api";

const postApiData = (endpoint, apidata, success, failur) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      "X-Custom-Header": "foobar", // Custom headers if needed
      "Content-Type": "application/json", // Sample content type header
    },
  });
  // console.log("endpointdata",apidata)
  instance
    .post(endpoint, apidata)
    .then((res) => {
      success(res?.data?.data);
    })
    .catch((error) => {
      console.log("databaase", error);
      failur(error);
    });
};
const getApiCall = (endpoint, success, failur) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      "X-Custom-Header": "foobar", // Custom headers if needed
      "Content-Type": "application/json", // Sample content type header
    },
  });

  instance
    .get(endpoint)
    .then((res) => {
      success(res?.data?.data);
    })
    .catch((error) => {
      failur("error", error);
    });
};


export { postApiData, getApiCall};
