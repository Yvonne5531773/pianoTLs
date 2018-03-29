(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/list-script.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '49700pu68VCtLyNgf33hg0S', 'list-script', __filename);
// scripts/list-script.js

'use strict';

cc.Class({
	extends: cc.Component,

	properties: {
		audio: {
			url: cc.AudioClip,
			default: null
		},
		_current: null
	},

	toScene: function toScene() {
		this.onDestroyMusic();
		cc.director.loadScene("main-scene");
	},
	onLoad: function onLoad() {
		var url = 'song.json';
		this._current = 0;
		cc.loader.loadRes(url, this.onCompleted.bind(this));
	},
	onCompleted: function onCompleted(err, res) {
		if (err) return;
		var data = res.data,
		    node = cc.find('data-store').getComponent('datastore-script');
		node.setdata(data[0]);
		this.audio && (this._current = cc.audioEngine.play(this.audio, false, 1));
	},
	start: function start() {},
	onDestroyMusic: function onDestroyMusic() {
		cc.audioEngine.stop(this._current);
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
        //# sourceMappingURL=list-script.js.map
        