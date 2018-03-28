"use strict";
cc._RF.push(module, '848a4/HjVJKe54qv7Yg0j8B', 'tile-script');
// scripts/tile-script.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		_type: null,
		_mainScript: null
	},

	init: function init(type, mainScript) {
		this._type = type;
		this._mainScript = mainScript;
		var touchFunc = function () {
			console.log("init this._type", this._type);
			if (this._type === 'start') {
				this._mainScript._start = true;
			} else if (this._type === "white") {
				console.log("white white white");
			} else {
				var tileRow = this.node.name.split("#")[0];
				if (parseInt(tileRow) !== this._mainScript._curTouchRow + 1) {
					console.log("111111");
				} else {
					this._mainScript.move();
				}
			}
		}.bind(this);
		this.node.on("touchstart", touchFunc, false);
	}
}

// update (dt) {
// 	this._mainScript._start && (console.log('start'))
// },

);

cc._RF.pop();