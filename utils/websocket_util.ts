export class WebSocketUtil {
	
	ip: string
	ws: WebSocket;

	constructor(ip: string) {
		this.ip = ip;
	}

	init_websocket(): void {
		//this.ws = new  WebSocket("ws://" + this.ip);
		this.ws = new WebSocket("ws://localhost:3000")
		
		this.ws.addEventListener('open', () => {
			console.log("Obsidian Self Storage connected to the websocket.");
		})

		this.ws.addEventListener('message', (event) => {
			this.handle_message(event.data);
		})

		this.ws.addEventListener('close', () => {
			console.log("Obsidian Self Storage disconnected from the websocket!");
		})

	}

	handle_message(message: string): void {
		console.log(message);
	}
	
	send_message(message: object): void {
		this.ws.send(JSON.stringify(message));
	}

	
	
}
