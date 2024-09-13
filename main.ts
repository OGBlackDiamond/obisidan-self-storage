import { Plugin, TAbstractFile } from "obsidian";
import { ConfigUtil } from "utils/config_util"
import { WebSocketUtil } from "utils/websocket_util"
import { FileUtil } from "utils/file_util"

interface Settings {
	serverIP: string;
	dataDirectory: string;
}

const DEFAULT_SETTINGS: Partial<Settings> = {
	serverIP: "data.exampleip.com",
	dataDirectory: "/data/obsidian",
}

export default class ObsidianSelfStorage extends Plugin {

	settings: Settings;

	websocket: WebSocketUtil;

	unnamedFiles: string[];

	async onload() {
		console.log("Loading Obsidian Self Storage");

		await this.loadSettings();

		this.addSettingTab(new ConfigUtil(this.app, this));

		this.websocket = new WebSocketUtil(this.settings.serverIP);

		this.websocket.init_websocket();

		this.registerEvent(this.app.vault.on('create', (file: TAbstractFile) => {
			console.log("Created File: " + file.name);	
			if (file.name.slice(0, 8) == "Untitled") {
				this.unnamedFiles.push(file.name);
			} else {

			}
		}));

		this.registerEvent(this.app.vault.on('delete', () => {
			
		}));
		
		this.registerEvent(this.app.vault.on('rename', (file: TAbstractFile) => {
			console.log("Renamed File: " + file.name);	
		}));

		this.registerEvent(this.app.vault.on('modify', () => {
			
		}));

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS,	await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onunload() {
		console.log("Unloading Obsidian Self Storage");
	}

}
