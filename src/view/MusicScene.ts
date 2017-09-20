class MusicScene extends egret.DisplayObjectContainer {

    private _sound: egret.Sound;
    private _channel: egret.SoundChannel;

    constructor() {
        super();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public addMusic(musname: string, startTime: number, times: number) {
        this._sound = RES.getRes(musname);
        this._channel = this._sound.play(startTime, times);

        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);

    }

    //停止
    public musicStop(): void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    }

    //播放完成
    private onComplete(e: egret.Event): void {
        console.log("播放完成");
        this.musicStop();
    }

    //声音大小
    public musicSound(index) {
        if (this._channel) {
            this._channel.volume = index;
        }
    }


}