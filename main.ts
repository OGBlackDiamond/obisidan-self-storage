import { Plugin } from "obsidian";
import { ConfigUtil } from "utils/config_util"

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

	async onload() {
		console.log("Loading Obsidian Self Storage");

		await this.loadSettings();

		this.addSettingTab(new ConfigUtil(this.app, this));
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
