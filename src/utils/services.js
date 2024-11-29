import axios from "axios";

export const BASE_URL = "https://monsoonsalon.com/api/";
export const BASE_URL2 = "https://crm.smartsalon.in/";


const postApiData = (endpoint, apidata, success, failur) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      "X-Custom-Header": "foobar", // Custom headers if needed
      "Content-Type": "application/json", // Sample content type header
    },
  });
  // 
  instance
    .post(endpoint, apidata)
    .then((res) => {
      success(res?.data?.data);
    })
    .catch((error) => {
      
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
