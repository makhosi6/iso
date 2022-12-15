//// Scape all articles form all pages

const { waitFor, saveLink } = require("../utils/helpers");
const { nextTab } = require("../utils/page");

/**
 * 'var' statement declares a function-scoped or globally-scoped variable, so you will see 'var' in a number of place. DO PANIC!
 * @param {puppeteer.Browser} browser
 * @param {string} link URL to a webpage
 * @returns {object} data
 */
const taskZulu = async (browser, link) => {
  try {
    console.log("BROWSER HAS x TABS OPEN", (await browser.pages()).length);

    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(link);
    /// wait for the laod more btn
    await page.waitForSelector(".article-list .sections article");

    /// count pages
    let num = 0;

    /// paginate, before grabbing the content
    let interval = setInterval(async () => {
      try {
        //increment on paginate
        num++;

        console.log("CLick");

        /// click to page
        let loadMoreBtn = await page.$(
          "button#viewMoreButton"
        );
        await page.evaluate((el) => el.click(), loadMoreBtn);
      } catch (error) {}
    }, 1900);
    /// stop paginating/ clear interval
    setTimeout(() => {
      console.log("Clear interval Now  @ ", num);
      clearInterval(interval);
    }, 80000);

    // wait for pagination to finish
    await waitFor(81000);
    console.log({
      num,
      hey: "There",
    });

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
              await saveLink(href, "zulu");

            // console.log({
            //     data,
            // });

            // await waitFor(10000);
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
  }
  finally
  {
    await waitFor(120000)
    page.close()
  }
  ////
};

module.exports = {
  taskZulu,
};
