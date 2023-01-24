const Twitter = require("./src/twitter");
const dataSource = require("./src/DataSource");

class Popular extends Twitter {
	data() {
		return {
			layout: "layout.11ty.js"
		};
	}

	async render(data) {
		let tweets = await dataSource.getAllTweets();
		let tweetHtml = await Promise.all(this.getMostPopularTweets(tweets).map(tweet => this.renderTweet(tweet, {showPopularity: true, showSentiment: true})));

		return `<h2 class="kimHeading-xl">Most popular tweets</h2>
		<p class="kimBody-l">A list of popular tweets by retweets and favorites.</p>
		<ol class="kimList kimList-spaced tweets tweets-linear-list h-feed hfeed">
			${tweetHtml.join("")}
		</ol>`;
	}
}

module.exports = Popular;
