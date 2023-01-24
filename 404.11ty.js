const Twitter = require("./src/twitter");

class Index extends Twitter {
	data() {
		return {
			layout: "layout.11ty.js",
      permalink: "404.html"
		};
	}

	async render(data) {
		return `
		<p class="kimBody-l">
			Tweet not found. 😔
		</p>
`;
	}
}

module.exports = Index;
