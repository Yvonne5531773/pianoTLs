(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/main-script.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4b10c5aElFJLppT19GpKPgz', 'main-script', __filename);
// scripts/main-script.js

'use strict';

var _song = require('../../assets/json/songs/song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
	extends: cc.Component,

	editor: {
		//executeInEditMode: true
	},

	properties: {
		movePanel: cc.Node,
		bluePrefab: cc.Prefab,
		whitePrefab: cc.Prefab,
		blackPrefab: cc.Prefab,
		longPrefab: cc.Prefab,
		redPrefab: cc.Prefab,
		initRow: 7,
		tileWidth: 0,
		tileHeight: 0,
		speed: 0,
		_newTopRow: null,
		_curBottomRow: null,
		_startPosition: null,
		_isFirstTile: true,
		_start: false,
		_end: false,
		_idx: 0,
		_preTx: -1,
		_tx: -1,
		_arr: [],
		_tilesArr: [],
		_errors: [],
		_offestY: null
	},

	onLoad: function onLoad() {
		this._curBottomRow = 0;
		this._newTopRow = 0;
		this._startPosition = this.movePanel.position;
		this._arr = [0, 1, 2, 3];
		this._idx = 0;
		this._preTx = -1;
		this._tx = -1;
		this._tilesArr = [];
		this._errors = ['ERROR_SPOT'];
		this._offestY = 0;
		for (var i = 0; i <= this.initRow; i++) {
			this.addTile();
		}
	},
	addTile: function addTile() {
		var y = this._tilesArr.length === 0 ? 0 : this._tilesArr[this._tilesArr.length - 1].y,
		    i = Math.floor(Math.random() * this._arr.length),
		    num = this._arr[i];
		var prefab = {},
		    type = '',
		    tile = {};
		if (this._arr.splice(i, 1), -1 !== this._preTx && this._arr.push(this._preTx), 0 === this.movePanel.children.length) {
			prefab = this.bluePrefab;
			type = 'START';
		} else {
			var rand = Math.floor(Math.random() * 100);
			if (30 >= rand) {
				prefab = this.longPrefab;
				type = 'LONG';
			} else {
				prefab = this.blackPrefab;
				type = 'BLACK';
			}
		}
		tile = cc.instantiate(prefab);
		tile.getComponent("tile-script").init(type, this);
		tile && (this._tilesArr.push(tile), tile.name = 'TILE_' + type, tile.scaleX = this.tileWidth / 135, tile.scaleY = this.tileHeight / 238, this.movePanel.addChild(tile), tile.x = num * this.tileWidth, tile.y = y + this.tileHeight), tile._destory = false, this._preTx = num;
	},
	getCurrentTile: function getCurrentTile() {
		return this._tilesArr[this._curBottomRow];
	},
	initSong: function initSong() {},
	update: function update(dt) {
		var _this = this;

		if (!this._start || this._end) return;
		this._offestY += this.speed;
		var curTile = this.getCurrentTile();
		if (curTile && curTile.y <= 0 && !curTile._destory) {
			console.log('gameover');
			this.scrollback();
			this.showWrongBlackTile(curTile);
			this.gameover();
		}
		this.movePanel.children.forEach(function (tile) {
			tile.y -= _this.speed;
			if (tile && tile._destory && tile.y < 0) {
				console.log('update tile', tile);
				_this.destroyTile(tile);
				_this.addTile();
				_this._newTopRow++;
			}
		});
	},
	scrollback: function scrollback() {
		var _this2 = this;

		var duraction = 1.5;
		this.movePanel.children.forEach(function (child) {
			var jumpUp = cc.moveBy(duraction, cc.p(0, _this2.tileHeight)).easing(cc.easeCubicActionOut());
			child.runAction(jumpUp);
		});
	},
	destroyTile: function destroyTile(tile) {
		this.movePanel.removeChild(tile);
	},
	showWrongBlackTile: function showWrongBlackTile(tile) {
		var fadeIn = cc.fadeIn(.6).easing(cc.easeCubicActionOut()),
		    fadeOut = cc.fadeOut(.6).easing(cc.easeCubicActionOut()),
		    sequences = [fadeIn, fadeOut, fadeIn, fadeOut, fadeIn];
		tile.runAction(cc.sequence(sequences));
	},
	showWrongRedTile: function showWrongRedTile(x, y) {
		console.log('showWrongRedTile x', x);
		console.log('showWrongRedTile y', y);
		var tile = cc.instantiate(this.redPrefab);
		var fadeIn = cc.fadeIn(.6).easing(cc.easeCubicActionOut()),
		    fadeOut = cc.fadeOut(.6).easing(cc.easeCubicActionOut()),
		    sequences = [fadeIn, fadeOut, fadeIn, fadeOut, fadeIn];
		tile && (tile.name = 'TILE_' + 'RED', tile.scaleX = this.tileWidth / 135, tile.scaleY = this.tileHeight / 238, this.movePanel.addChild(tile), tile.x = x * this.tileWidth, tile.y = (y + 1 + this._newTopRow) * this.tileHeight - this._offestY, tile.runAction(cc.sequence(sequences)), this.gameover(this._errors[0]));
	},
	gameover: function gameover(type) {
		// console.log('gameover')
		this._end = true;
	}
}

// move() {
// 	const movePosition = cc.v2(this._startPosition.x,(this._startPosition.y + (this._curBottomRow + 1) * -150));
// 	console.log('move movePosition', movePosition)
// 	console.log('move this.movePanel', this.movePanel)
// 	this.movePanel.runAction(cc.sequence(
// 		cc.moveTo(0.2, movePosition),
// 		cc.callFunc(this.updateRender.bind(this))
// 	))
// }

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
        //# sourceMappingURL=main-script.js.map
        