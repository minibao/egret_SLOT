var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "SlotViewSkin";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /**
     * 处理一些遮罩，优化图片和开始
     */
    GameScene.prototype.onAddToStage = function (event) {
        //把slider添加到框里
        // this.addSixSlider(139.5, 492);
        this.slider = new Slider.SliderScroll();
        this.addChild(this.slider);
        //添加start事件
        this.startgroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
    };
    /**
     * 生成6张slider
     */
    GameScene.prototype.addSixSlider = function (x, y) {
        for (var i = 0; i < 6; i++) {
            var sliderindex = (i + 1).toString() + "_png";
            var slide1 = this.createImgSlide(sliderindex);
            slide1.x = 139.5;
            slide1.y = 489 + 70 * i;
            slide1.width = 105;
            slide1.height = 70;
            this.addChild(slide1);
            //添加遮罩
            var rectmask = this.drawMask(x, y);
            this.addChild(rectmask);
            slide1.mask = rectmask;
        }
    };
    /**
     * 动态生成图片
     */
    GameScene.prototype.createImgSlide = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 生成矩形，mask
     */
    GameScene.prototype.drawMask = function (x, y) {
        var mask = new egret.Shape();
        mask.graphics.beginFill(0xff0000, 1);
        mask.graphics.drawRect(x, y, 105, 201);
        mask.graphics.endFill();
        return mask;
    };
    /**
     * 添加start
     */
    GameScene.prototype.gameStart = function () {
        console.log("start!");
        this.startgroup.visible = false;
        this.stopgroup.visible = true;
        this.stop_up.visible = false;
        this.stop_over.visible = true;
        //控制slider开始翻滚
        this.slider.startRoll();
        //添加stop
        this.stop_over.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStop, this);
    };
    /**
     * 添加stop
     */
    GameScene.prototype.gameStop = function () {
        console.log("stop!");
        this.stop_up.visible = true;
        this.stop_over.visible = false;
        var rad = Math.floor(Math.random() * 6 + 1);
        //控制slider停止翻滚
        rad = 3;
        this.slider.stopScroll(rad);
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map