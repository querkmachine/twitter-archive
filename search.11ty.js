const Twitter = require("./src/twitter");
const dataSource = require("./src/DataSource");

class SearchPage extends Twitter {
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

		return `<is-land on:visible on:save-data="false">
			<template data-island>
				<h1 class="kimHeading-xl">Search tweets</h1>
				<div class="tweets-search">
					<div id="search" class="tweets-search"></div>
					<link href="/_pagefind/pagefind-ui.css" rel="stylesheet">
					<style>
					:root {
						--pagefind-ui-scale: 1;
						--pagefind-ui-primary: var(--color-accent-alt);
						--pagefind-ui-text: var(--color-text);
						--pagefind-ui-background: var(--color-background);
						--pagefind-ui-border: var(--color-furniture);
						--pagefind-ui-font: inherit;
					}
					</style>
					<script src="/_pagefind/pagefind-ui.js" onload="new PagefindUI({ element: '#search', showImages: false });"></script>
				</div>
			</template>
		</is-land>`;
	}
}

module.exports = SearchPage;
