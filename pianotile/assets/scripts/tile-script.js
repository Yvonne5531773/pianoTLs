cc.Class({
	extends: cc.Component,

	properties: {
		_type: null,
		_mainScript: null,
	},

	init (type, mainScript) {
		this._type = type;
		this._mainScript = mainScript;
		const touchFunc = (e) => {
			e.stopPropagation()
			console.log('in touchFunc')
			if(this._mainScript._tilesArr[this._mainScript._curBottomRow] === this.node) {
				this.node.opacity = 80
				this.node.off("touchstart", touchFunc, false);
				switch (this._type) {
					case 'START':
						//播放音乐
						this._mainScript._start = true;
						console.log('startstartstartstart')
						this._mainScript.node.on("touchstart", this.onStartDown, this)
						break;
					case 'BLACK':
						//播放音乐
						break;
					case 'LONG':
						//播放音乐
						break;
					default:
						break;
				}
				const curTile = this._mainScript._tilesArr[this._mainScript._curBottomRow]
				curTile._destory = !curTile._destory
				this._mainScript._curBottomRow++
			} else {
				if(!this._mainScript._start) return
				if(!!~['BLACK', 'LONG'].indexOf(this.node.type)) {
					console.log('nothing')
				} else {
					this._mainScript.gameover(this._mainScript._errors[0]);
				}
			}
		}
		this.node.on("touchstart", touchFunc, this);
	},

	onStartDown (e) {
		this._mainScript.node.off("touchstart", this.onStartDown, this)
		e.stopPropagation()
		let x = e.touch.getLocation().x;
		let y = e.touch.getLocation().y;
		console.log('onStartDown x', x)
		console.log('onStartDown y', y)
		let blockX = Math.floor(x / this._mainScript.tileWidth);
		let blockY = 0;
		console.log('onStartDown this._mainScript.movePanel.children', this._mainScript.movePanel.children)
		for (let i = this._mainScript.movePanel.children.length - 1; i >= 0; i--) {
			let distance = this._mainScript.movePanel.children[i].y - y;
			if (distance <= this._mainScript.tileHeight && distance >= 0) {
				blockY = i;
				break;
			}
		}
		this._mainScript.showWrongRedTile(blockX, blockY)
	},

	// update (dt) {
	//
	// },

});
