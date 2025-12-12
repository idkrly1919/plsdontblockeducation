"use strict";

const form = document.getElementById("proxy-form");
const input = document.getElementById("proxy-input");
const errorMessage = document.getElementById("error-message");
const errorCode = document.getElementById("error-code");
const frame = document.getElementById("content-frame");

const { ScramjetController } = $scramjetLoadController();

const wispUrl =
	(location.protocol === "https:" ? "wss" : "ws") +
	"://" +
	location.host +
	"/wisp/";

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
	wisp: wispUrl,
});

scramjet.init();

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	errorMessage.textContent = "";
	errorCode.textContent = "";

	try {
		await registerSW();
	} catch (err) {
		errorMessage.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		return;
	}

	const url = search(input.value);
	const encodedUrl = scramjet.encodeUrl(url);

	frame.src = encodedUrl;
	frame.style.display = "block";
	document.body.classList.add("iframe-visible");

	frame.addEventListener("load", () => {
		const frameLocation = frame.contentWindow.location.toString();
		const newPath =
			"/view/" + frameLocation.split(window.location.origin)[1];
		window.history.pushState({}, "", newPath);
	});

	window.history.pushState({}, "", "/view/" + encodedUrl);
});

function search(input, template = "https://www.google.com/search?q=%s") {
	try {
		return new URL(input).toString();
	} catch (err) {}

	try {
		const url = new URL(`http://${input}`);
		if (url.hostname.includes(".")) return url.toString();
	} catch (err) {}

	return template.replace("%s", encodeURIComponent(input));
}