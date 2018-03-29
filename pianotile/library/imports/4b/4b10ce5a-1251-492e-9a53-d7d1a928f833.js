"use strict";
cc._RF.push(module, '4b10c5aElFJLppT19GpKPgz', 'main-script');
// scripts/main-script.js

'use strict';

var _index = require('index');

var _index2 = _interopRequireDefault(_index);

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
		_offestY: null,
		_soundArr: null,
		_soundData: null
	},

	initSong: function initSong(data) {
		this._soundData = data.musics[0];
		console.log('initSong data', data);
		var arr = void 0,
		    scores = this._soundData.scores,
		    score = scores[0];
		score = this.replaceAll(score);
		arr = score.split(",");
		this._soundArr = arr;
		console.log('arr', arr);
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
		this._soundArr = [];
		this._soundData = [];

		var node = cc.director.getScene().getChildByName('data-store'),
		    data = node.getComponent('datastore-script').getdata(),
		    songURL = data.url;
		console.log('songURL', songURL);
		cc.loader.loadRes(songURL, this.onLoadMusicCompleted.bind(this));

		for (var i = 0; i <= this.initRow; i++) {
			this.addTile();
		}
	},
	onLoadMusicCompleted: function onLoadMusicCompleted(err, res) {
		if (err) return;
		console.log('onLoadMusicCompleted res', res);
		this.initSong(res);
	},
	onTap: function onTap() {
		var name = void 0,
		    a = null,
		    i = this._soundArr[this._idx];
		i.indexOf("(") > -1 ? (i = i.replace(/\(/gm, ""), i = i.replace(/\)/gm, ""), a = i.split("."), name = a[a.length - 1] + "_mp3") : name = i + "_mp3";
		var res = _index2.default.resources.find(function (resource) {
			return resource.name === name;
		});
		// res && cc.loader.load(cc.url.raw('resources/'+res.url), function(){
		// 	console.log('onTap load end')
		// });
		res && cc.audioEngine.play(cc.url.raw('resources/' + res.url), false, 1);
		// RES.getRes(url)
		// XFlash.playEffect(url, 1)
		this.checkWin();
	},
	checkWin: function checkWin() {
		this._idx++;
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
	destroyTile: function destroyTile(tile) {
		this.movePanel.removeChild(tile);
	},
	gameover: function gameover(type) {
		// console.log('gameover')
		this._end = true;
	},
	replaceAll: function replaceAll(e) {
		return e = e.replace(/;/gm, ","), e = e.replace(/\[L\]/gm, ""), e = e.replace(/\[M\]/gm, ""), e = e.replace(/\[N\]/gm, ""), e = e.replace(/\[I\]/gm, ""), e = e.replace(/\[J\]/gm, ""), e = e.replace(/\[K\]/gm, ""), e = e.replace(/\[KL\]/gm, ""), e = e.replace(/\[JK\]/gm, ""), e = e.replace(/\[JL\]/gm, ""), e = e.replace(/\[LM\]/gm, ""), e = e.replace(/\[LL\]/gm, ""), e = e.replace(/\[KM\]/gm, ""), e = e.replace(/\[KKK\]/gm, ""), e = e.replace(/\[IJ]/gm, ""), e = e.replace(/\[KLM]/gm, ""), e = e.replace(/#/gm, "_"), e = e.replace(/U,/gm, ""), e = e.replace(/T,/gm, ""), e = e.replace(/T/gm, ""), e = e.replace(/V,/gm, ""), e = e.replace(/V>/gm, "d"), e = e.replace(/5</gm, ""), e = e.replace(/6</gm, ""), e = e.replace(/>/gm, ""), e = e.replace(/@/gm, "."), e = e.replace(/~/gm, "."), e = e.replace(/S/gm, "d"), e = e.replace(/%/gm, "."), e = e.replace(/\^/gm, "."), e = e.replace(/\&/gm, "."), e = e.substring(0, e.lastIndexOf(","));
	}
});

cc._RF.pop();