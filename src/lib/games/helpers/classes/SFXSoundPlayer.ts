import winSound from "$lib/assets/audio/win1.mp3"
import loseSound from "$lib/assets/audio/lose1.mp3"

export default class SFXPlayer {
    
    private _winSound: HTMLAudioElement;
    private _loseSound: HTMLAudioElement;
    private _volumeTable: {[key: number]: number};
    private _volumeLevel: number;

    constructor(volumeLevel: number = 2) {
        this._winSound = new Audio(winSound);
        this._loseSound = new Audio(loseSound);
        this._volumeTable = {
            0: 0.0,
            1: 0.1,
            2: 0.4,
            3: 0.7
        }
        if (volumeLevel in this._volumeTable) {
            this._volumeLevel = volumeLevel;
        } else {
            this._volumeLevel = 2;
        }

        this.setVolumeLevel(this._volumeLevel);
    }

    playWinSound() {
        this._winSound.play();
    }

    playLoseSound() {
        this._loseSound.play();
    }

    playSFXSound(hasWon: boolean) {
        hasWon ? this.playWinSound() : this.playLoseSound();
    }

    setVolumeLevel(volumeLevel: number) {
        if (volumeLevel in this._volumeTable) {
            this._winSound.volume = this._volumeTable[volumeLevel];
            this._loseSound.volume = this._volumeTable[volumeLevel];
            console.log("Level set to : ", volumeLevel);
        }
    }

    getVolumeLevel() {
        return this._volumeLevel;
    }
}
