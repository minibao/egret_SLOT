class GameScene extends eui.Component {

    public slotstart: eui.Image;
    public constructor() {
        super();
        this.skinName = "SlotViewSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    /**
     * 处理一些遮罩，优化图片
     */
    private onAddToStage(event: egret.Event) {

        //把slider添加到框里
        this.addSixSlider(139.5, 492);

        //添加start事件



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


}