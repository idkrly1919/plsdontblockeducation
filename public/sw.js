importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();
let blocklist = new Set();

self.addEventListener('message', event => {
    if (event.data && event.data.blocklist) {
        blocklist = new Set(event.data.blocklist);
    }
});

async function handleRequest(event) {
    const url = new URL(event.request.url);
    
    // Check if the requested domain is in the blocklist
    if (blocklist.has(url.hostname)) {
        return new Response(null, { status: 451, statusText: 'Blocked by AdBlocker' });
    }

	await scramjet.loadConfig();
	if (scramjet.route(event)) {
		return scramjet.fetch(event);
	}
    
	return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event));
});