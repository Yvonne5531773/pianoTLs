"use strict";
cc._RF.push(module, '848a4/HjVJKe54qv7Yg0j8B', 'tile-script');
// scripts/tile-script.js

'use strict';

cc.Class({
	extends: cc.Component,

	properties: {
		_type: null,
		_mainScript: null
	},

	init: function init(type, mainScript) {
		var _this = this;

		this._type = type;
		this._mainScript = mainScript;
		var touchFunc = function touchFunc(e) {
			e.stopPropagation();
			console.log('in touchFunc');
			if (_this._mainScript._tilesArr[_this._mainScript._curBottomRow] === _this.node) {
				_this.node.opacity = 80;
				_this.node.off("touchstart", touchFunc, false);
				switch (_this._type) {
					case 'START':
						_this._mainScript._start = true;
						_this._mainScript.node.on("touchstart", _this.onStartDown, _this);
						break;
					case 'BLACK':
						break;
					case 'LONG':
						break;
					default:
						break;
				}
				var curTile = _this._mainScript._tilesArr[_this._mainScript._curBottomRow];
				curTile._destory = !curTile._destory;
				_this._mainScript._curBottomRow++;
				//音效和是否胜利
				_this._mainScript.onTap();
			} else {
				if (!_this._mainScript._start) return;
				if (!!~['BLACK', 'LONG'].indexOf(_this.node.type)) {
					console.log('nothing');
				} else {
					_this._mainScript.gameover(_this._mainScript._errors[0]);
				}
			}
		};
		this.node.on("touchstart", touchFunc, this);
	},
	onStartDown: function onStartDown(e) {
		this._mainScript.node.off("touchstart", this.onStartDown, this);
		e.stopPropagation();
		var x = e.touch.getLocation().x;
		var y = e.touch.getLocation().y;
		console.log('onStartDown x', x);
		console.log('onStartDown y', y);
		var blockX = Math.floor(x / this._mainScript.tileWidth);
		var blockY = 0;
		console.log('onStartDown this._mainScript.movePanel.children', this._mainScript.movePanel.children);
		for (var i = this._mainScript.movePanel.children.length - 1; i >= 0; i--) {
			var distance = this._mainScript.movePanel.children[i].y - y;
			if (distance <= this._mainScript.tileHeight && distance >= 0) {
				blockY = i;
				break;
			}
		}
		this._mainScript.showWrongRedTile(blockX, blockY);
	}
}

// update (dt) {
//
// },

);

cc._RF.pop();