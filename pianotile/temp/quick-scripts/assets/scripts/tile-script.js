(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/tile-script.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '848a4/HjVJKe54qv7Yg0j8B', 'tile-script', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=tile-script.js.map
        