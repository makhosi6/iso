<<<<<<< HEAD
"use strict";

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
async function saveLink(link, lang) {
  let options = {
    method: "POST",
    url: `http://192.168.0.134:3004/records`,
    headers: {
      "Content-Type": "application/json",
    },
    ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
    body: JSON.stringify({
      id: hashCode(link),
      lang,
      link,
    }),
  };
  request(options, function (error, response) {
    if (error) console.log(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Save Link ==> ",
      link,
      " : ",
      response?.statusCode
    );
  });
}

/**
 * @description Post data to central database
 * @param {Object} data
 */
async function postToAPI(data = {}) {
  var resp;

  console.log({ data });

  if (!(data instanceof Object)) {
    console.log("Error: param 'data' should be an object.");
    return;
  }
  if (JSON.stringify(data) == "{}") {
    console.log("Error: param 'data' cant'be empty.");
    return;
  }
  let options = {
    method: "POST",
    url: `http://192.168.0.134/api/v1/articles`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        process.env.TOKEN || "El11xW0ztdJNoeKpgxWjIv8S51tfZjl42BGAjZpi" //locally
      }`,
    },
    ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
    body: JSON.stringify(data),
  };
  request(options, function (error, response) {
    resp = response;
    if (error) console.log(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Save Article ==> ",
      data.title,
      " : ",
      response?.statusCode
    );
  });

  await waitFor(1000);
  return resp;
}

/**
 * @description delete item/link from list of TODOs
 */
async function deleteLink(id) {
  let options = {
    method: "DELETE",
    url: `http://192.168.0.134:3004/records/${encodeURIComponent(id)}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(options, function (error, response) {
    if (error)console.log(error);
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
  const response = await fetch(`http://192.168.0.134:3004/records`);

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
 * main pages
 */
let allPagesZulu = [
  "https://www.isolezwe.co.za/izindaba",
  "https://www.isolezwe.co.za/ezokungcebeleka",
  "https://www.isolezwe.co.za/ezemidlalo",
  "https://www.isolezwe.co.za/imibono",
  "https://www.isolezwe.co.za/ezokuvakasha",
  "https://www.isolezwe.co.za/impilo-yabantu/ezezimoto",
  "https://www.isolezwe.co.za/impilo-yabantu",
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

/**
 *
 * @param {string} id
 * @returns {Object}
 */
async function getBrowser(id = "browser") {
  ///
  const response = await fetch(`http://192.168.0.134:3003/memory/${id}`);

  ///
  const data = await response.json();

  console.log({ data });

  return data;
}

module.exports = {
  getBrowser,
  hashCode,
  allPages,
  allPagesZulu,
  waitFor,
  postToAPI,
  saveLink,
  getLinks,
  deleteLink,
};
=======
"use strict";

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
async function saveLink(link, lang) {
  let options = {
    method: "PUT",
    url: `http://192.168.0.134:3004/records/${hashCode(link)}`,
    headers: {
      "Content-Type": "application/json",
    },
    ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
    body: JSON.stringify({
      id: hashCode(link),
      lang,
      link,
    }),
  };
  request(options, function (error, response) {
    if (error) console.log(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Save Link ==> ",
      link,
      " : ",
      response?.statusCode
    );
  });
}

/**
 * @description Post data to central database
 * @param {Object} data
 */
async function postToAPI(data = {}) {
  var resp;

  console.log({ data });

  if (!(data instanceof Object)) {
    console.log("Error: param 'data' should be an object.");
    return;
  }
  if (JSON.stringify(data) == "{}") {
    console.log("Error: param 'data' cant'be empty.");
    return;
  }
  let options = {
    method: "POST",
    url: `http://192.168.0.134/api/v1/articles`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        process.env.TOKEN || "El11xW0ztdJNoeKpgxWjIv8S51tfZjl42BGAjZpi" //locally
      }`,
    },
    ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
    body: JSON.stringify(data),
  };
  request(options, function (error, response) {
    resp = response;
    if (error) console.log(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Save Article ==> ",
      data.title,
      " : ",
      response?.statusCode
    );
  });

  await waitFor(1000);
  return resp;
}

/**
 * @description delete item/link from list of TODOs
 */
async function deleteLink(id) {
  let options = {
    method: "DELETE",
    url: `http://192.168.0.134:3004/records/${encodeURIComponent(id)}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(options, function (error, response) {
    if (error)console.log(error);
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
  const response = await fetch(`http://192.168.0.134:3004/records`);

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
 * main pages
 */
let allPagesZulu = [
  "https://www.isolezwe.co.za/izindaba",
  "https://www.isolezwe.co.za/ezokungcebeleka",
  "https://www.isolezwe.co.za/ezemidlalo",
  "https://www.isolezwe.co.za/imibono",
  "https://www.isolezwe.co.za/ezokuvakasha",
  "https://www.isolezwe.co.za/impilo-yabantu/ezezimoto",
  "https://www.isolezwe.co.za/impilo-yabantu",
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

/**
 *
 * @param {string} id
 * @returns {Object}
 */
async function getBrowser(id = "browser") {
  ///
  const response = await fetch(`http://192.168.0.134:3003/memory/${id}`);

  ///
  const data = await response.json();

  console.log({ data });

  return data;
}

module.exports = {
  getBrowser,
  hashCode,
  allPages,
  allPagesZulu,
  waitFor,
  postToAPI,
  saveLink,
  getLinks,
  deleteLink,
};
>>>>>>> d9072ce (Updates)
