import axios from "axios";
const { backend_url } = require("../config");
// const backend_url = "http://localhost:5000";

export async function check_wordle(word) {
  const formData = new FormData();
  formData.append("word", word);
  return new Promise((resolve, reject) => {
    axios
      .post(backend_url + "/wordle/check_word", formData)
      .then((response) => {
        // showResult(response.data.result);
        // keyboardColorHandler(JSON.parse(response.data.keyboard));
        // if (
        //   JSON.stringify(response.data.result) ===
        //   JSON.stringify([1, 1, 1, 1, 1])
        // ) {
        //   setSummary({
        //     status: "Win",
        //     message:
        //       "Congrats! You find correct words at Stage " +
        //       (curLine + 1).toString() +
        //       " !",
        //     stage: curLine + 1,
        //   });
        // } else if (curLine === 4) {
        //   setSummary({
        //     status: "Lose",
        //     message: "Sorry, Run out of chances!",
        //     stage: curLine + 1,
        //   });
        // }
        // setCurLine(curLine + 1);
        resolve({ status: true, data: response.data });
      })
      .catch((err) => {
        console.log(err);
        reject({ status: false, err: err.message });
      });
  });
}

export function uploadFiles(city, files) {
  const formData = new FormData();
  formData.append("folderName", city);
  files.forEach((file) => formData.append("files", file));
  console.log(666, formData);
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/files/upload`, formData)
      .then((response) => {
        console.log(response.data);
        resolve({ status: true, data: response.data });
      })
      .catch((err) => {
        console.log(err);
        reject({ status: false, err: err.message });
      });
  });
}

export function getFilesfromCity(city) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/files/${city}`)
      .then((response) => {
        resolve({
          status: true,
          files: response.data.files,
        });
      })
      .catch((err) => {
        console.log(err);
        reject({ status: false, err: err.message });
      });
  });
}
