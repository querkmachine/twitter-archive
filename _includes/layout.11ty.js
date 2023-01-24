const dataSource = require("../src/DataSource");
const metadata = require("../_data/metadata.js");

module.exports = async function(data) {
	let titleTweetNumberStr = "";
	if(data.page.fileSlug === "tweet-pages") {
		titleTweetNumberStr = `—№ ${this.renderNumber(data.pagination.hrefs.length - data.pagination.pageNumber)}`;
	} else if(data.page.fileSlug === "newest") {
		titleTweetNumberStr = `—№ ${this.renderNumber((await dataSource.getAllTweets()).length)}`;
	}

	let navHtml = "";
	if(data.page.fileSlug === "tweet-pages" || data.page.fileSlug === "newest") {
		let newestHref = "/newest/";
		let previousHref = data.pagination.previousPageHref;
		let nextHref = data.pagination.nextPageHref;

		if(data.page.fileSlug === "newest") {
			newestHref = "";
			previousHref = "";
			nextHref = "/" + (await dataSource.getAllTweets()).sort((a, b) => b.date - a.date).slice(1, 2).map(tweet => tweet.id_str).join("") + "/";
		} else if(data.page.fileSlug === "tweet-pages" && data.pagination.firstPageHref === data.page.url) {
			newestHref = "";
		}

		navHtml = `<ul class="kimList">
			<li>${newestHref ? `<a class="kimLink-plain" href="${newestHref}">` : ""}⇤ Newest<span class="kim-!-sr"> Tweet</span>${newestHref ? `</a>` : ""}</li>
			<li>${previousHref ? `<a class="kimLink-plain" href="${previousHref}">` : ""}⇠ Newer<span class="kim-!-sr"> Tweet</span>${previousHref ? `</a>` : ""}</li>
			<li>${nextHref ? `<a class="kimLink-plain" href="${nextHref}">` : ""}Older<span class="kim-!-sr"> Tweet</span> ⇢${nextHref ? `</a>` : ""}</li>
		</ul>`;
	}

	let meta_description = `A read-only indieweb self-hosted archive of${ data.pagination && data.pagination.hrefs && data.pagination.hrefs.length ? ` all ${data.pagination.hrefs.length} of` : ""} ${data.metadata.username}’s tweets.`;
	if (data.page.fileSlug === "tweet-pages" && data.tweet && data.tweet.full_text) {
		// note that data.tweet.full_text is already HTML-escaped
		meta_description = data.tweet.full_text.replace(/\s+/g, " ");
	}

	return `<!doctype html>
<html class="kimPage" lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${data.metadata.username}’s Twitter Archive${titleTweetNumberStr}</title>
		<meta name="description" content="${meta_description}" />

		<link rel="profile" href="https://microformats.org/profile/hatom">
		<link rel="stylesheet" href="//beeps.website/assets/stylesheet.css">
		<link rel="stylesheet" href="/assets/custom.css">
		<script src="/assets/script.js" type="module"></script>
		<script src="/assets/is-land.js" type="module"></script>

		${data.page.fileSlug === "newest" ? `
			<link rel="canonical" href="/${data.tweet.id_str}/">
			<meta http-equiv="refresh" content="0; url=/${data.tweet.id_str}/">
			` : ""}
	</head>
	<body class="kimPage_body">
		<header class="kimMasthead">
			<div class="kimWrapper kimMasthead_inner">
				<a class="kimMasthead_logo kimLink-plain" href="${data.metadata.homeUrl}">
					<span class="kim-!-sr">Back to home</span>
					<span aria-hidden="true">beeps</span>
				</a>
				&rarr; <a class="kimLink-plain" href="/">twitter archive</a>
			</div>
		</header>
		<main id="content">
			<div class="kimWrapper">
				${data.content}
			</div>
		</main>
		<footer class="kimFooter">
			<div class="kimWrapper kimFooter_inner">
				<small class="kimFooter_boilerplate">An open source project from <a class="kimLink-plain" href="https://github.com/tweetback">tweetback</a>.</small>
			</div>
		</footer>
	</body>
</html>`;
};