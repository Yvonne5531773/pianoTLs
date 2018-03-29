
cc.Class({
	extends: cc.Component,

	properties: {

	},

	onLoad () {
		cc.game.addPersistRootNode(this.node);
	},

	setdata (json){
		this.data = json;
	},

	getdata (){
		return this.data;
	},
});
