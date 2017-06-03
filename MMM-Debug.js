/* Magic Mirror
 * Module: MMM-Debug
 *
 * By B. van Wetten
 * MIT Licensed.
 */

Module.debug = function () {
	Array.prototype.map.call(arguments, function (elem) { console.log(elem); });
};

Module.register("MMM-Debug", {
	// Module config defaults.
	defaults: {
		maxEntries: 25,
	},

	start: function () {
		var self = this;
		this.debugLog = [];
		this._consoleLog = console.log;
		this._log_info = Log.info;

		console.log = function () {
			for (var arg = 0; arg < arguments.length; arg++) {
				self.addLogEntry(`<strong>[${arguments.callee.caller.name}]</strong>: ${JSON.stringify(arguments[arg])}`);
			}
			self._consoleLog.apply(console, arguments);
		};

		this.sendSocketNotification("DEBUG_INIT");
	},

	getStyles: function () {
		return [
			this.file("css/debug.css")
		]
	},

	getScripts: function () {
		return ["moment.js"];
	},

	getDom: function () {
		var debug = document.createElement("div");
		debug.id = "debug";
		debug.innerHTML = "<h1><strong>Debug information:</strong></h1>";
		const logEntry = document.createElement("p");
		this.debugLog.forEach(function (element) {
			logEntry.innerHTML += `${element}<br/>`;
			debug.appendChild(logEntry);
		}, this);
		return debug;
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "DEBUG_LOG") {
			this.addLogEntry(`<strong>[node_helper:${payload.caller}]</strong>: ${payload.debugLog}`, payload.timestamp);
		};
	},

	addLogEntry: function (logEntry, timestamp = Date.now()) {
		this.debugLog.push(`${moment(timestamp).format("hh:mm:ss")} ${logEntry}`);
		this.debugLog = this.debugLog.slice(0 - this.config.maxEntries);
		this.updateDom();
	}
});