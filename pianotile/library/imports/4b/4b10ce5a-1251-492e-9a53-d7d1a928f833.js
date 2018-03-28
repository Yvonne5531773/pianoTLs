"use strict";
cc._RF.push(module, '4b10c5aElFJLppT19GpKPgz', 'main-script');
// scripts/main-script.js

"use strict";

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
		initRow: 6,
		initCol: 4,
		_newTopRow: null,
		_curBottomRow: null,
		_curTouchRow: -1,
		_startPosition: null,
		_isFirstTile: true,
		_start: false
	},

	onLoad: function onLoad() {
		//加载 填满 屏幕中央
		this._curBottomRow = 0;
		this._newTopRow = 6;
		this._startPosition = this.movePanel.position;

		for (var row = 0; row < 6; row++) {
			var randomBlackCol = Math.floor(Math.random() * 4);
			for (var col = 0; col < 4; col++) {
				var tile = null;
				if (randomBlackCol === col) {
					if (this._isFirstTile) {
						this._isFirstTile = false;
						tile = cc.instantiate(this.bluePrefab);
						tile.getComponent("tile-script").init("start", this);
					} else {
						tile = cc.instantiate(this.blackPrefab);
						tile.getComponent("tile-script").init("black", this);
					}
				} else {
					tile = cc.instantiate(this.whitePrefab);
					tile.getComponent("tile-script").init("white", this);
				}
				this.movePanel.addChild(tile);
				tile.name = row + "#" + col;
				tile.position = cc.pMult(cc.v2(col, row), 150);
				console.log('tile.position', tile.position);
			}
		}
	},

	move: function move() {
		var movePosition = cc.v2(this._startPosition.x, this._startPosition.y + (this._curBottomRow + 1) * -150);
		console.log('move movePosition', movePosition);
		console.log('move this.movePanel', this.movePanel);
		this.movePanel.runAction(cc.sequence(cc.moveTo(0.2, movePosition), cc.callFunc(this.updateRender.bind(this))));
	},

	updateRender: function updateRender() {
		var row = this._newTopRow;
		var randomBlackCol = Math.floor(Math.random() * 4);
		for (var col = 0; col < 4; col++) {
			var tile = null,
			    prefab = randomBlackCol === col ? this.blackPrefab : this.whitePrefab,
			    type = randomBlackCol === col ? "black" : "white";
			tile = cc.instantiate(prefab);
			tile.getComponent("tile-script").init(type, this);
			this.movePanel.addChild(tile);
			tile.name = row + "#" + col;
			tile.position = cc.pMult(cc.v2(col, row), 150);
		}
		//remove bottom row
		var oldRow = this._curBottomRow;
		for (var _col = 0; _col < 4; _col++) {
			this.movePanel.getChildByName(oldRow + "#" + _col).removeFromParent();
		}
		this._curBottomRow++;
		this._curTouchRow++;
		this._newTopRow++;
	}

	// update: function (dt) {
	//
	// },

});

cc._RF.pop();