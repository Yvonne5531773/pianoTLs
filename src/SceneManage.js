var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneMange = (function (_super) {
    __extends(SceneMange, _super);
    function SceneMange() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneMange.prototype.init = function () {
        // 实例化两个场景
        this.beginScene = new BeginScene();
        this.gameScene = new GameScene();
        // 默认添加开始场景
        this.addChild(this.beginScene);
    };
    // 实例化单例获取方法
    SceneMange.getInstance = function () {
        if (!SceneMange.instance) {
            SceneMange.instance = new SceneMange();
        }
        return SceneMange.instance;
    };
    // 切换场景
    SceneMange.prototype.changeScene = function (type) {
        // 释放资源
        if (type == 'gameScene') {
            this.beginScene.release();
        }
        // 移除所有显示列表中的对象
        this.removeChildren();
        // 添加下一个场景
        this.addChild(this[type]);
    };
    return SceneMange;
}(egret.Sprite));
