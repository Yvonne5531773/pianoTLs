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
		initRow: 7,
		initCol: 4,
		tileWidth: 0,
		tileHeight: 0,
		_newTopRow: null,
		_curBottomRow: null,
		_curTouchRow: -1,
		_startPosition: null,
		_isFirstTile: true,
		_start: false,
		_idx: 0,
		_preTx: -1,
		_tx: -1,
		_arr: [0, 1, 2, 3],
		_tilesArr: [],
	},

	onLoad () {
		//加载 填满 屏幕中央
		this._curBottomRow = 0;
		this._newTopRow = 6;
		this._startPosition = this.movePanel.position;
		this._arr = [0, 1, 2, 3]
		this._idx = 0
		this._preTx = -1
		this._tx = -1
		this._tilesArr = []
		// for(let row = 0; row < 6; row++){
		// 	let randomBlackCol = Math.floor(Math.random() * 4);
		// 	for(let col = 0; col < 4; col++){
		// 		let tile = null;
		// 		if(randomBlackCol === col){
		// 			if(this._isFirstTile) {
		// 				this._isFirstTile = false
		// 				tile = cc.instantiate(this.bluePrefab);
		// 				tile.getComponent("tile-script").init("start", this);
		// 			} else {
		// 				tile = cc.instantiate(this.blackPrefab);
		// 				tile.getComponent("tile-script").init("black",this);
		// 			}
		// 		}else{
		// 			tile = cc.instantiate(this.whitePrefab);
		// 			tile.getComponent("tile-script").init("white",this);
		// 		}
		// 		this.movePanel.addChild(tile);
		// 		tile.name = row + "#" + col;
		// 		tile.position = cc.pMult(cc.v2(col, row), 150);
		// 		console.log('tile.position', tile.position)
		// 		console.log('this', this)
		// 		console.log('this movePanel', this.movePanel)
		// 	}
		// }
		for (let i = 0; i < this.initRow; i++)
			this.addTile()
	},

	addTile () {
		console.log('this._tilesArr', this._tilesArr)
		const y = this._tilesArr.length===0? 0 : this._tilesArr[this._tilesArr.length - 1].y,
			i = Math.floor(Math.random() * 4),
			num = this._arr[i]
		let prefab = {},
			type = '',
			tile = {}
		if (this._arr.splice(i, 1),
			-1 !== this._preTx && this._arr.push(this._preTx),
			0 === this.movePanel.children.length){
			prefab = this.bluePrefab;
			type = 'start'
		} else {
			const rand = Math.floor(Math.random() * 100);
			if(30 >= rand) {
				prefab = this.longPrefab
				type = 'long'
			} else {
				prefab = this.blackPrefab
				type = 'black'
			}
		}
		tile = cc.instantiate(prefab);
		tile.getComponent("tile-script").init(type, this);
		tile && (this._tilesArr.push(tile),
			tile.scaleX = this.tileWidth / 126,
			tile.scaleY = this.tileHeight / 238,
			this.movePanel.addChild(tile),
			tile.x = num * this.tileWidth,
			tile.y = y + this.tileHeight),
			this._preTx = num
		console.log('tile', tile)
	},

	initSong() {

	},


	move() {
		const movePosition = cc.v2(this._startPosition.x,(this._startPosition.y + (this._curBottomRow + 1) * -150));
		console.log('move movePosition', movePosition)
		console.log('move this.movePanel', this.movePanel)
		this.movePanel.runAction(cc.sequence(
			cc.moveTo(0.2, movePosition),
			cc.callFunc(this.updateRender.bind(this))
		))
	},

	updateRender() {
		let row = this._newTopRow;
		let randomBlackCol = Math.floor(Math.random() * 4);
		for(let col = 0; col < 4; col++){
			let tile = null,
				prefab = randomBlackCol === col? this.blackPrefab : this.whitePrefab,
				type = randomBlackCol === col? "black" : "white"
			tile = cc.instantiate(prefab);
			tile.getComponent("tile-script").init(type, this);
			this.movePanel.addChild(tile);
			tile.name = row + "#" + col;
			tile.position = cc.pMult(cc.v2(col,row), 150);
		}
		//移除一行
		let oldRow = this._curBottomRow;
		for(let col = 0; col < 4; col++){
			this.movePanel.getChildByName(oldRow + "#" + col).removeFromParent();
		}
		this._curBottomRow++;
		this._curTouchRow++;
		this._newTopRow++;
	},


	// update: function (dt) {
	//
	// },

});
