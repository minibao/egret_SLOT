/**
* slider类的所有控制机制
*/
module Slider {
    /**
    * slider滚动动画
    */
    export class SliderScroll extends egret.DisplayObjectContainer {

        /**图片引用*/
        private bmpArr1: egret.Bitmap[];
        private bmpArr2: egret.Bitmap[];
        private bmpArr3: egret.Bitmap[];
        /**图片数量*/
        private rowCount: number;
        /**纹理本身的高度*/
        private textureHeight: number;
        /**控制滚动速度*/
        private speed1: number = 0;
        private speed2: number = 0;
        private speed3: number = 0;
        /**slider框的宽*/
        private sliderboxwidth: number = 109.5;
        /**slider框的高*/
        private sliderboxheight: number = 201.5;
        /**slider本身的高度*/
        private sliderHeight: number = 420;
        /**添加计时，阻尼用*/
        private stimer: egret.Timer;
        /**添加计时，阻尼用*/
        private etimer: egret.Timer;
        private flag: boolean;


        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        /**初始化*/
        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.rowCount = Math.ceil(this.sliderboxheight / this.sliderHeight) + 1;//计算在当当前slider框中，需要的图片数量

            //创建第一组sliderBox
            this.bmpArr1 = [];
            this.addSliderBox(139.5, 489, 137.25, 492, this.rowCount, this.bmpArr1);
            //创建第二组sliderBox
            this.bmpArr2 = [];
            this.addSliderBox(267.5, 489, 265.25, 492, this.rowCount, this.bmpArr2);
            //创建第三组sliderBox
            this.bmpArr3 = [];
            this.addSliderBox(395.5, 489, 393.25, 492, this.rowCount, this.bmpArr3);
        }

        /**
         * 添加三个slider框，addSliderBox(sliderX,sliderY,maskX,maskY,count，bmpA)其它bmpA是存入slider的组，里面不止一个slider图片
         */
        private addSliderBox(sliderX, sliderY, maskX, maskY, count, bmpA) {
            for (var i: number = 0; i < count; i++) {
                var slider: egret.Bitmap;
                slider = this.createImgSlide("slider_png");

                //slider的长和宽是固定的，x，y是有三组。下面只是设置了一组。
                slider.width = 105;
                slider.height = 420;
                slider.x = sliderX;
                slider.y = sliderY + this.sliderHeight * i;
                bmpA.push(slider);
                this.addChild(slider);

                //添加遮罩
                var rectmask: egret.Shape = this.drawMask(maskX, maskY);
                this.addChild(rectmask);
                slider.mask = rectmask;

            }

        }

        /**
         * 开始滚动
         */
        public startRoll(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

            //添加计时功能，为了实现阻尼
            this.stimer = new egret.Timer(100, 0);
            this.stimer.addEventListener(egret.TimerEvent.TIMER, function timerFunc() {
                if (this.speed1 <= -50) {

                } else {
                    this.speed1 = this.speed1 - 5;
                }

                if (this.speed2 <= -60) {

                } else {
                    this.speed2 = this.speed2 - 6;
                }

                if (this.speed3 <= -70) {

                } else {
                    this.speed3 = this.speed3 - 7;
                }

            }, this);
            this.stimer.start();
        }

        /**
         * 逐帧运动
         */
        private enterFrameHandler(event: egret.Event): void {

            for (var i: number = 0; i < this.rowCount; i++) {
                var bgBmp1: egret.Bitmap = this.bmpArr1[i];
                bgBmp1.y += this.speed1;
                //判断超出屏幕后，回到队首，这样来实现循环反复

                //第一组
                if (this.bmpArr1[0].y < 69) {
                    this.bmpArr1[0].y = this.bmpArr1[0].y + 420 * 2;
                }
                if (this.bmpArr1[1].y < 69) {
                    this.bmpArr1[1].y = this.bmpArr1[1].y + 420 * 2;
                }

                //第二组
                var bgBmp2: egret.Bitmap = this.bmpArr2[i];
                bgBmp2.y += this.speed2;
                if (this.bmpArr2[0].y < 69) {
                    this.bmpArr2[0].y = this.bmpArr2[0].y + 420 * 2;
                }
                if (this.bmpArr2[1].y < 69) {
                    this.bmpArr2[1].y = this.bmpArr2[1].y + 420 * 2;
                }

                //第三组
                var bgBmp3: egret.Bitmap = this.bmpArr3[i];
                bgBmp3.y += this.speed3;
                if (this.bmpArr3[0].y < 69) {
                    this.bmpArr3[0].y = this.bmpArr3[0].y + 420 * 2;
                }
                if (this.bmpArr3[1].y < 69) {
                    this.bmpArr3[1].y = this.bmpArr3[1].y + 420 * 2;
                }
            }
        }

        /**
         * stop事件
         */
        public stopScroll(rad1, rad2, rad3, callback): void {
            //开始减速
            this.stimer.stop();
            this.flag = false;
            this.etimer = new egret.Timer(500, 0);

            this.etimer.addEventListener(egret.TimerEvent.TIMER, function timerFunc() {
        
                //第一组
                if (this.speed1 == -5) {
                    this.etimer.stop();
                    setTimeout(() => {//保存this不变
                        this.addEventListener(egret.Event.ENTER_FRAME, function AdjustmentSlider() {
                            //停止的关键代码
                            var stopsign1 = 0;
                            stopsign1 = (-1) * (rad1) * 70 + 140;//调整slider的吻合
                            if ((this.bmpArr1[0].y - 489 > -4 + stopsign1) && (this.bmpArr1[0].y - 489 < 4 + stopsign1)) {
                                this.speed1 = 0;

                                //控制返回状的回调
                                if (this.speed1 == 0 && this.speed2 == 0 && this.speed3 == 0 && !this.flag) {
                                    this.flag = true;
                                    callback(this.flag);
                                }

                            }
                        }, this);
                    }, 500);

                } else {
                    this.speed1 = this.speed1 + 5;
                }

                //第二组
                if (this.speed2 == -6) {
                    this.etimer.stop();
                    var count2 = 0;
                    setTimeout(() => {//保存this不变
                        this.addEventListener(egret.Event.ENTER_FRAME, function AdjustmentSlider() {
                            var stopsign2 = 0;
                            stopsign2 = (-1) * (rad2) * 70 + 140;//调整slider的吻合
                            if ((this.bmpArr2[0].y - 489 > -4 + stopsign2) && (this.bmpArr2[0].y - 489 < 4 + stopsign2)) {
                                this.speed2 = 0;
                                //控制返回状的回调
                                if (this.speed1 == 0 && this.speed2 == 0 && this.speed3 == 0 && !this.flag) {
                                    this.flag = true;
                                    callback(this.flag);
                                }
                            }
                        }, this);
                    }, 500);

                } else {
                    this.speed2 = this.speed2 + 6;
                }

                //第三组
                if (this.speed3 == -7) {
                    this.etimer.stop();
                    var count3 = 0;
                    setTimeout(() => {//保存this不变
                        this.addEventListener(egret.Event.ENTER_FRAME, function AdjustmentSlider() {
                            var stopsign3 = 0;
                            stopsign3 = (-1) * (rad3) * 70 + 140;//调整slider的吻合
                            if ((this.bmpArr3[0].y - 489 > -4 + stopsign3) && (this.bmpArr3[0].y - 489 < 4 + stopsign3)) {
                                this.speed3 = 0;
                                //控制返回状的回调
                                if (this.speed1 == 0 && this.speed2 == 0 && this.speed3 == 0 && !this.flag) {
                                    this.flag = true;
                                    callback(this.flag);
                                }
                            }
                        }, this);
                    }, 500);

                } else {
                    this.speed3 = this.speed3 + 7;
                }

            }, this);
            this.etimer.start();
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

    }


}
