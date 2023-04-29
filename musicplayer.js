class MusicPlayer {
    constructor(musicList){
        this.musicList = musicList 
        this.index = 0;
        // MusicPlayerden bir nesne oluşturduğum anda index numarası 0 a eşitlensin isterim. Ancak ben bir sonraki şarkı dediğim zaman index numarası ile oynarak örneğin 1 ekleyerek bir sonraki index numarasına gidip ordaki bilgileri çekmiş olacakğım.
    }

    getMusic() {
        return this.musicList[this.index]
    }

    next(){
        if (this.musicList.length != this.index + 1 ) {
            this.index++;
        }
        else {
            this.index=0;
        }
    }
    prev(){
        if (this.index != 0  ) {
            this.index--;
        }
        else {
            this.index = this.musicList.length - 1
        }
    }
}