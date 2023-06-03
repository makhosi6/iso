const puppeteer = require("puppeteer-core");
const { task } = require("./src/tasks/recursive");
const { taskWeekly } = require("./src/tasks/weekly");
const { allPages, getLinks, a, allPagesZulu, waitFor, getBrowser } = require("./src/utils/helpers");
const { nextTab } = require("./src/utils/page");
const cron = require("node-cron");
const { taskWeeklyZulu } = require("./src/tasks_zulu/weekly");
const { taskZulu } = require("./src/tasks_zulu/recursive");
const { nextTabZulu } = require("./src/utils/page_zulu");

(async () => {
/**
 * wait for the browser to boot up
 */
  await waitFor(120000)
  /**
   * @type puppeteer.Browser
   */
let currentBr = await getBrowser()
console.log({currentBr});
  const browser = await puppeteer.connect({browserWSEndpoint: currentBr.index});
  // const browser = await puppeteer.launch({
  //   executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // headless: true
  // });
  allPages.map((url) => task(browser, url));
  /// 2 mins buffer in between
  await waitFor(120000)
  allPagesZulu.map((url) => taskZulu(browser, url));

  /// extract content from saved links, Every 15mins
  cron.schedule("*/15 * * * *", async () => {
    /// get all links but only use the first

    let links = await getLinks();

    console.log({ LINKS: links[0] || "EMPTY" });
    /// if links object is empty
    if (links.length < 1) {
      return;
    }
    if (links[0].lang === "zulu") {
      await nextTabZulu(browser, links[0].link);
    } else {
      await nextTab(browser, links[0].link);
    }
  });

  /// get links every week
  cron.schedule("0 15 * * 2", async () => {
    allPages.map((url) => taskWeekly(browser, url));
      /// 2 mins buffer in between
  await waitFor(120000)
    allPagesZulu.map((url) => taskWeeklyZulu(browser, url));
  });
})();
