const { waitFor, deleteLink, hashCode, postToAPI } = require("./helpers");
const puppeteer = require("puppeteer-core");
/**
 * @summary open a new tab
 * @param {puppeteer.Browser} browser
 * @param {string} link URL to a webpage
 * @returns {object} data
 */
const nextTabZulu = async (browser, link) => {
  try {
    console.log({ link });
    console.log(
      "=============================================================="
    );
    /// open new tab
    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(link);
    /// wait for the  page to finish loading
    await page.waitForSelector(".article-page h1 > span");

    //title
    let titleEl = await page.$("h1 > span");
    let title = await page.evaluate((el) => el.innerText, titleEl);

    //body

    let bodyText = "";
    let articleBody = await page.$$(".articleBodyMore p");
    console.log({ numberOfParagraphs: articleBody.length });

    Array.from(articleBody).map(async (text) => {
      let txt = await page.evaluate((el) => el.innerText, text);

      bodyText += txt + " ";
    });
    // wait for the loop above
    await waitFor(2000);

    console.log({
      id: hashCode(link),
      title,
      body: bodyText.trim(),
    });

    /**
     *  store on a central DB
     * @type Response
     */
     let response =  await postToAPI({
      key: hashCode(link),
      title,
      lang: "zulu",
      source: link,
      body: bodyText.trim(),
    });

    console.log(`response.status ${response?.status}  ${response?.statusCode} `);
    /// delete from a list of TODOs
  if(response.statusCode > 199 && response.statusCode < 299)  await deleteLink(hashCode(link));
    ///close the page
    await page.close();
    return {
      id: hashCode(link),
      title,
      /// trim trailing and leading white spaces
      body: bodyText.trim(),
    };
  } catch (error) {
    console.log({ error });
  } finally {
    console.log("\x1b[44m%s\x1b[0m", "PAGE CLOSE", link);
  }
  ///
};

module.exports = {
  nextTabZulu,
};
