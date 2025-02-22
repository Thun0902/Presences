const presence = new Presence({
		clientId: "610102236374368267",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	});

let author: string, title: string, url: string, openUrlText: string;

presence.on("UpdateData", async () => {
	if (document.querySelector("[class^='PlayerControls__PlayerContainer']")) {
		const normalIsPlaying: boolean =
				document
					.querySelector("div[class^='PlayButton__PlayerControl']")
					?.getAttribute("aria-label") === "Pause",
			liveIsPlaying: boolean =
				document
					.querySelector(
						"[class^=LiveVideo__VideoContainer] .shaka-play-button"
					)
					?.getAttribute("icon") === "pause",
			isPlaying = normalIsPlaying || liveIsPlaying;

		if (normalIsPlaying) {
			const normalDetails = document.querySelector(
				"[class^='shared__ShowDetails'] > a:nth-child(1)"
			);

			title = normalDetails.textContent;
			url = new URL(normalDetails.getAttribute("href"), window.location.origin)
				.href;
			openUrlText = "Listen to Show";
			author = document.querySelector(
				"[class^='PlayerControls__ShowOwnerName']"
			).textContent;
		} else if (liveIsPlaying) {
			url = window.location.href;
			openUrlText = "View Livestream";
			title = document.querySelector(
				"[class^='LiveStreamDetails__StreamTitleContainer'] > h4"
			).textContent;
			author = document.querySelector(
				"[class^='LiveStreamStreamerDetails__StreamerDetailsTextContainer'] h4"
			).textContent;
		}

		const presenceData: PresenceData = {
			details: title,
			state: author,
			largeImageKey: "mixcloud",
			smallImageKey: isPlaying ? "play" : "pause",
			smallImageText: isPlaying ? (await strings).play : (await strings).pause,
			buttons: [{ label: openUrlText, url }],
		};

		if (liveIsPlaying) {
			presenceData.smallImageKey = "live";
			presenceData.smallImageText = (await strings).live;
		}

		if (isPlaying) presence.setActivity(presenceData);
		else presence.setActivity();
	}
});
