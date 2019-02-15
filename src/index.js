import querystring from "querystring";
import cheerio from "cheerio";
import request from "request-promise";
import visit from "async-unist-util-visit";

export default async ({ markdownAST }, options = {}) => {
  const baseUrl = `https://embed.runkit.com/oembed?url=`;
  return await visit(markdownAST, async node => {
    if (
      node.type !== "inlineCode" ||
      !node.value.startsWith("https://runkit.com")
    ) {
      return;
    }

    const url = node.value;
    const body = await request(""+ url);
    const runkitObj = JSON.parse(body);
    const $ = cheerio.load(runkitObj.html);
    const oEmbed = $('iframe');
    oEmbed.attr('style', '');
    oEmbed.attr('scrolling', 'yes');
    oEmbed.attr('width', '100%');
    oEmbed.attr('height', runkitObj.height);

    node.type = "html";
    node.value = $.root().html();

    return markdownAST;
  });
};
