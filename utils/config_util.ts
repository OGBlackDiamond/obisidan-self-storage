import ObsidianSelfStorage from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class ConfigUtil extends PluginSettingTab {

	plugin: ObsidianSelfStorage;

	constructor(app: App, plugin: ObsidianSelfStorage) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl) 
			.setName("Server IP")
			.setDesc("The IP of the server to save data to")
			.addText((text) =>
				text
					.setPlaceholder("data.exampleip.com")
					.setValue(this.plugin.settings.serverIP)
					.onChange(async (value) => {
						this.plugin.settings.serverIP = value;
						await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName("Data Directory")
			.setDesc("The directory that data should be stored in")
			.addText((text) => 
				text
					.setPlaceholder("/data/obsidian")
					.setValue(this.plugin.settings.dataDirectory)
					.onChange(async (value) => {
						this.plugin.settings.dataDirectory = value;
						await this.plugin.saveSettings();
				})
			);
		
	}

}
