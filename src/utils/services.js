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
// function formatDateToFull(dateString,full=true) {
//   if (dateString) {
//     const [datePart, timePart] = dateString.split("T");
//     const [year, month, day] = datePart.split("-");
//     const [hour, minute] = timePart.split(":");

//     // Convert month from "08" to "Aug" or any other short form
//     const monthNames = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];
//     const monthShort = monthNames[parseInt(month, 10) - 1];
    
//     if(!full){
//       const formattedDate = `${parseInt(day, 10)} ${monthShort} ${year} `;
//        return formattedDate
//     }
//     // Format the time as "08:34 AM/PM"
//     let hourInt = parseInt(hour, 10);
//     const period = hourInt >= 12 ? "PM" : "AM";
//     hourInt = hourInt % 12 || 12; // Convert to 12-hour format
//     const formattedTime = `${hourInt}:${minute} ${period}`;

//     // Format the full date as "7 Aug 2024 08:34 AM"
//     const formattedDate = `${parseInt(day, 10)} ${monthShort} ${year} ${formattedTime}`;
//     return formattedDate;
//   }
//   return dateString;
// }

export { postApiData, getApiCall};
