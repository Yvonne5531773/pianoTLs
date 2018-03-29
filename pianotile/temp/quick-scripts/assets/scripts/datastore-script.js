(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/datastore-script.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a0879sC9l5PCZHnXHrWG8js', 'datastore-script', __filename);
// scripts/datastore-script.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {},

	onLoad: function onLoad() {
		cc.game.addPersistRootNode(this.node);
	},
	setdata: function setdata(json) {
		this.data = json;
	},
	getdata: function getdata() {
		return this.data;
	}
});

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
        //# sourceMappingURL=datastore-script.js.map
        