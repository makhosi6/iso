const request = require("request");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
/**
 * block program for x milliseconds
 * @param {number} millisecondsCount
 * @returns {Promise<void>}
 */
async function waitFor(millisecondsCount) {
  if (!millisecondsCount) {
    return;
  }
  try {
    return await new Promise((resolve) =>
      setTimeout(resolve, millisecondsCount)
    );
  } catch (err) {
    return console.log(err);
  }
}

/**
 * @description save/store a link/URL for later use
 * @param {string} link 
 */
async function saveLink(link) {
  let options = {
    method: "POST",
    url: `http://localhost:3004/records`,
    headers: {
      "Content-Type": "application/json",
    },
    ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
    body: JSON.stringify({
      id: hashCode(link),
      link,
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Save Link ==> ",
      link,
      " : ",
      response.statusCode
    );
  });
}

/**
 * @description Post data to central database
 * @param {Object} data
 */
async function postToAPI(data = {}) {
  if (!(data instanceof Object))
    throw "Error: param 'data' should be an object.";
  if (JSON.stringify(data) == "{}") throw "Error: param 'data' cant'be empty.";
  let options = {
    method: "POST",
    url: `API`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN || "209r8hvjc92i2jf"}`,
    },
    ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
    body: JSON.stringify(data),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Save Link ==> ",
      link,
      " : ",
      response.statusCode
    );
  });
}

/**
 * @description delete item/link from list of TODOs
 */
async function deleteLink(id) {
  let options = {
    method: "DELETE",
    url: `http://localhost:3004/records/${encodeURIComponent(id)}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "DELETE Link ==> ",
      id,
      " : ",
      response.statusCode
    );
  });
}
/**
 * @description  get list of Links to be scapped
 * @returns
 */
async function getLinks() {
  ///
  const response = await fetch(`http://localhost:3004/records`);

  ///
  const data = await response.json();

  return data;
}
/**
 * main pages
 */
let allPages = [
  "https://www.isolezwelesixhosa.co.za/izimvo/",
  "https://www.isolezwelesixhosa.co.za/iindaba/",
  "https://www.isolezwelesixhosa.co.za/ezemidlalo/",
  "https://www.isolezwelesixhosa.co.za/ezoyolo/",
];

/**
 * @description convert a URL to a hashCode so can be used as ID, becuse a URL is to long to be used as a ID
 * @param {string} s
 * @returns
 */
function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;

  return h.toString();
}
module.exports = {
  hashCode,
  allPages,
  waitFor,
  postToAPI,
  saveLink,
  getLinks,
  deleteLink,
};
