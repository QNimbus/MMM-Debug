/* Magic Mirror
 * Node Helper: MMM-Debug
 *
 * By B. van Wetten
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

var nodeHelper = NodeHelper.create({
	// Override start method.
	start: function () {
		var self = this;
		this._consoleLog = console.log;

		console.log = function () {
			self.sendSocketNotification("DEBUG_LOG", { timestamp: Date.now(), caller: arguments.callee.caller.name, debugLog: Array.from(arguments) });
			self._consoleLog.apply(console, arguments);
		};

		console.log("Starting node helper for: " + this.name);
	},

	// Override socketNotificationReceived method.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "DEBUG_INIT") {
			this.sendSocketNotification("DEBUG_INIT", "node_helper socker connection established");
		}
	},
});

module.exports = nodeHelper;