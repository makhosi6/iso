const puppeteer = require("puppeteer-core");
const { task } = require("./src/tasks/recursive");
const { taskWeekly } = require("./src/tasks/weekly");
const { allPages, getLinks } = require("./src/utils/helpers");
const { nextTab } = require("./src/utils/page");
const cron = require("node-cron");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: false,
  });
  allPages.map((url) => task(browser, url));

  /// extract content from saved links
  cron.schedule("*/15 * * * *", async () => {
    /// get all links but only use the first

    let links = await getLinks();

    console.log({ LINKS: links[0] || "EMPTY" });
    /// if links object is empty
    if (links.length < 1) {
      return;
    }
    await nextTab(browser, links[0].link);
  });

  /// get links every week
  cron.schedule("0 15 * * 2", async () => {
    allPages.map((url) => taskWeekly(browser, url));
  });
})();
