"use strict";
cc._RF.push(module, 'a0879sC9l5PCZHnXHrWG8js', 'datastore-script');
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