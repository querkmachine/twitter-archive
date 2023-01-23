let data = {
	username: "batbeeps", // No leading @ here
	homeLabel: "beeps.website",
	homeUrl: "https://beeps.website/",
};

data.avatar = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(data.homeUrl)}/`;

module.exports = data;