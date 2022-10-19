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
const taskWeeklyZulu = async (browser, link) => {
  try {
    console.log("BROWSER HAS x TABS OPEN", (await browser.pages()).length);

    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(link);
    /// wait for the load more btn
    await page.waitForSelector(".article-list .sections article");



        console.log("start here");
        ///
        let links = await page.$$(`.article-list .sections article > a`);

        Array.from(links).map(async (lnk) => {
          try {
            /**
             * @type string
             */
            let href = await page.evaluate((el) => el.href, lnk);

            /// Scap content from the href | save href for later use
            if (!href.toLocaleLowerCase().includes("english"))
              await saveLink(href,"zulu");

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
  }finally
  {
    page.close()
  }
  ////
};

module.exports = {
  taskWeeklyZulu,
};
