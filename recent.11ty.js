const Twitter = require("./src/twitter");
const dataSource = require("./src/DataSource");

class Recent extends Twitter {
	data() {
		return {
			layout: "layout.11ty.js"
		};
	}

	getRecentTweets(tweets) {
		return tweets.filter(tweet => this.isOriginalPost(tweet)).sort(function(a,b) {
			return b.date - a.date;
		}).slice(0, 40);
	}

	async render(data) {
		let tweets = await dataSource.getAllTweets();
		let tweetHtml = await Promise.all(this.getRecentTweets(tweets).map(tweet => this.renderTweet(tweet, {showSentiment: true})));

		return `<h2 class="kimHeading-xl">Most recent tweets</h2>
		<p class="kimBody-l">Not including replies or retweets or mentions.</p>
		<ol class="kimList kimList-spaced tweets tweets-linear-list h-feed hfeed">
			${tweetHtml.join("")}
		</ol>`;
	}
}

module.exports = Recent;
