class GameScene extends eui.Component {

    public startgroup: eui.Group;
    public stopgroup: eui.Group;
    public stop_over: eui.Image;
    public stop_up: eui.Image;

    private slider: Slider.SliderScroll;//为了调用sliderscroll里面的方法

    public constructor() {
        super();
        this.skinName = "SlotViewSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    /**
     * 处理一些遮罩，优化图片和开始
     */
    private onAddToStage(event: egret.Event) {

        //把slider添加到框里
        // this.addSixSlider(139.5, 492);
        this.slider = new Slider.SliderScroll();
        this.addChild(this.slider);

        //添加start事件
        this.startgroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);

    }


    /**
     * 生成6张slider
     */
    private addSixSlider(x: number, y: number) {
        for (var i = 0; i < 6; i++) {
            var sliderindex = (i + 1).toString() + "_png";
            let slide1: egret.Bitmap = this.createImgSlide(sliderindex);
            slide1.x = 139.5;
            slide1.y = 489 + 70 * i;
            slide1.width = 105;
            slide1.height = 70;
            this.addChild(slide1);

            //添加遮罩
            var rectmask: egret.Shape = this.drawMask(x, y);
            this.addChild(rectmask);
            slide1.mask = rectmask;
        }

    }

    /**
     * 动态生成图片
     */
    private createImgSlide(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 生成矩形，mask
     */
    private drawMask(x: number, y: number) {
        var mask: egret.Shape = new egret.Shape();
        mask.graphics.beginFill(0xff0000, 1);
        mask.graphics.drawRect(x, y, 105, 201);
        mask.graphics.endFill();
        return mask;
    }

    /**
     * 添加start
     */
    private gameStart() {
        console.log("start!");
        this.startgroup.visible = false;
        this.stopgroup.visible = true;
        this.stop_up.visible = false;
        this.stop_over.visible = true;

        //控制slider开始翻滚
        this.slider.startRoll();

        //添加stop
        this.stop_over.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStop, this);


    }

    /**
     * 添加stop
     */
    private gameStop() {
        console.log("stop!");
        this.stop_up.visible = true;
        this.stop_over.visible = false;

        var rad = Math.floor(Math.random() * 6 + 1);
        //控制slider停止翻滚
        rad = 3;
        this.slider.stopScroll(rad);

    }
}