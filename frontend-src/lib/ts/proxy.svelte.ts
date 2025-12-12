import { adBlocklist } from "./adBlocklist";
import config from "./config.svelte";

// Scramjet's controller is loaded dynamically from scripts included in the main HTML.
// We declare it here so TypeScript knows it exists.
declare const $scramjetLoadController: any;
const { ScramjetController } = $scramjetLoadController();

export class ServiceWorkerConfig {
    blocklist: Set<string> = new Set();

    constructor(adblock: boolean) {
        if (adblock) this.blocklist = new Set(adBlocklist);
    }
}

export class ProxyManager {
    scramjet: any; // This will hold the ScramjetController instance
    serviceWorker: ServiceWorker | null = $state(null);

    isProxyOpen: boolean = $state(false);
    url: string = $state("");
    iframeUrl: string = $state("");

    async initializeProxy() {
        const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";

        this.scramjet = new ScramjetController({
            files: {
                wasm: "/scram/scramjet.wasm.wasm",
                all: "/scram/scramjet.all.js",
                sync: "/scram/scramjet.sync.js",
            },
            wisp: wispUrl,
        });

        await this.scramjet.init();
        await this.registerSW();
    }

    reloadIframe() {
        if (!this.scramjet) {
            console.error("Scramjet controller not initialized.");
            return;
        }
        this.iframeUrl = this.scramjet.encodeUrl(this.url);
    }

    setDestination(destination: string) {
        if (destination === "") {
            this.url = "https://duckduckgo.com";
            return;
        }
        if (!destination.includes(".") || destination.includes(" ")) {
            this.url =
                "https://duckduckgo.com/?q=" + destination;
            return;
        }
        if (
            !destination.startsWith("https://") &&
            !destination.startsWith("http://")
        ) {
            this.url = "https://" + destination;
            return;
        }
        this.url = destination;
    }

    async registerSW() {
        if (!navigator.serviceWorker) {
            throw new Error("Your browser doesn't support service workers.");
        }

        const registration = await navigator.serviceWorker.register('/sw.js');
        
        // Wait for the service worker to become active
        await navigator.serviceWorker.ready;

        this.serviceWorker = registration.active;
        this.updateSWConfig(new ServiceWorkerConfig(config.adblock));
    }

    async updateSWConfig(cfg: ServiceWorkerConfig) {
        if (!this.serviceWorker) return;
        // Convert Set to Array for postMessage
        this.serviceWorker.postMessage({ blocklist: Array.from(cfg.blocklist) });
    }

    startProxy(destinationInput: string): boolean {
        if (!this.scramjet || !this.serviceWorker) {
            console.error("Proxy service not ready.");
            return false;
        }
    
        this.setDestination(destinationInput);
        this.isProxyOpen = true;
        this.reloadIframe();
    
        return true;
    }
}

const proxyManager = $state(new ProxyManager());
export default proxyManager;