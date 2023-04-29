const container = document.querySelector(".conteiner");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");




const player = new MusicPlayer(musicList); //MusicPlayer classı içerisinden musicList bilgisini al.

window.addEventListener("load" , () => {
//sayffa yüklendiği zaman bu fonksiyonu uygula.
    let  music = player.getMusic(); //player sayesinde şarkıcı bilgilerini alır ve 
    displayMusic(music);
})

    function displayMusic(music){
        title.innerText = music.getName(); //html deki title yerine şarkıcı ismini yazar.
        singer.innerText = music.singer;
        image.src = "img/" + music.img; //img dosyayı altındaki resimlere erişir
        //image.src html de ki image title na git ve src kısmına musci.img yaz 
        audio.src = "mp3/" + music.file;
     }

    play.addEventListener("click" , () => { //html deki play daki audio yu başlat
        const isMusicPlay = container.classList.contains("playing");
        isMusicPlay ? pauseMusic() : playMusic(); //true ise pauseMusic() olur, değilse diğeri
    })
    prev.addEventListener("click" , () => {  //????????????????? 32-50 ???????????????????
        prevMusic();
    })
    function prevMusic(){   
        
        player.prev();
        let music = player.getMusic(); // Bir üste index no değiştiğinden index e göre şarkıcı çağırırız.
        displayMusic(music);
        playMusic();
    };

    next.addEventListener("click" , () => { 
        nextMusic()
    })
    function nextMusic(){
        player.next()
        let music = player.getMusic();
        displayMusic(music);
        playMusic();
    }

    function pauseMusic(){
        container.classList.remove("playing")
        play.classList = "fa-solid fa-play"
        audio.pause(); // pasuse,play audio elementi ile alakalı bir metot.
    }

    function playMusic(){
        container.classList.add("playing")
        play.classList = "fa-solid fa-pause"
        audio.play();
    }

    