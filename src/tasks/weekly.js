<<<<<<< HEAD
//// Will only get front page articles from the main pages

//// Scape all articles form all pages

const { waitFor, saveLink } = require("../utils/helpers");
const { nextTab } = require("../utils/page");

/**
 * 'var' statement declares a function-scoped or globally-scoped variable, so you will see 'var' in a number of place. DO PANIC!!
 * @param {puppeteer.Browser} browser
 * @param {string} link URL to a webpage
 * @returns {object} data
 */
const taskWeekly = async (browser, link) => {
  try {
    console.log("BROWSER HAS x TABS OPEN", (await browser.pages()).length);

    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(link);
    /// wait for the load more btn
    await page.waitForSelector(".td_ajax_load_more");
    /**
     * main content sections class names
     */
    let mainSections = ["td-category-grid", "td-main-content-wrap"];



    ////OR rest of the code here
    mainSections.forEach(async (element) => {
      try {
        console.log("start here");
        ///
        let links = await page.$$(`.${element} .td-module-thumb > a`);

        Array.from(links).map(async (lnk) => {
          try {
            /**
             * @type string
             */
            let href = await page.evaluate((el) => el.href, lnk);

            /// Scap content from the href | save href for later use
            if (!href.toLocaleLowerCase().includes("english"))
              await saveLink(href, 'xhosa');

          } catch (error) {
            console.log({
              error,
            });
          }
        });

        ///
      } catch (error) {
        console.log({
          error,
        });
      }
    });
  } catch (error) {
    console.log({
      error,
    });
  } finally
  {
    await waitFor(120000)
    page.close()
  }
  ////
};

module.exports = {
  taskWeekly,
};
=======
//// Will only get front page articles from the main pages

//// Scape all articles form all pages

const { waitFor, saveLink } = require("../utils/helpers");
const { nextTab } = require("../utils/page");

/**
 * 'var' statement declares a function-scoped or globally-scoped variable, so you will see 'var' in a number of place. DO PANIC!!
 * @param {puppeteer.Browser} browser
 * @param {string} link URL to a webpage
 * @returns {object} data
 */
const taskWeekly = async (browser, link) => {
  try {
    console.log("BROWSER HAS x TABS OPEN", (await browser.pages()).length);

    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(link);
    /// wait for the load more btn
    await page.waitForSelector(".td_ajax_load_more");
    /**
     * main content sections class names
     */
    let mainSections = ["td-category-grid", "td-main-content-wrap"];



    ////OR rest of the code here
    mainSections.forEach(async (element) => {
      try {
        console.log("start here");
        ///
        let links = await page.$$(`.${element} .td-module-thumb > a`);

        Array.from(links).map(async (lnk) => {
          try {
            /**
             * @type string
             */
            let href = await page.evaluate((el) => el.href, lnk);

            /// Scap content from the href | save href for later use
            if (!href.toLocaleLowerCase().includes("english"))
              await saveLink(href, 'xhosa');

          } catch (error) {
            console.log({
              error,
            });
          }
        });

        ///
      } catch (error) {
        console.log({
          error,
        });
      }
    });
  } catch (error) {
    console.log({
      error,
    });
  } finally
  {
    await waitFor(120000)
    page.close()
  }
  ////
};

module.exports = {
  taskWeekly,
};
>>>>>>> d9072ce (Updates)
