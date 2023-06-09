const container = document.querySelector(".conteiner");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");



const player = new MusicPlayer(musicList); //MusicPlayer classı içerisinden musicList bilgisini al.

window.addEventListener("load" , () => {
//sayffa yüklendiği zaman bu fonksiyonu uygula.
    let  music = player.getMusic(); //player sayesinde şarkıcı bilgilerini alır ve 
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
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
        isPlayingNow();
    })
    const prevMusic = () => {   

        player.prev();
        let music = player.getMusic(); // Bir üste index no değiştiğinden index e göre şarkıcı çağırırız.
        displayMusic(music);
        playMusic();
    };

    next.addEventListener("click" , () => { 
        nextMusic()
        isPlayingNow();
    })
    const nextMusic = () => {
        player.next()
        let music = player.getMusic();
        displayMusic(music);
        playMusic();
    }

    const pauseMusic = () => {
        container.classList.remove("playing")
        play.querySelector("i").classList = "fa-solid fa-play"
        audio.pause(); // pasuse,play audio elementi ile alakalı bir metot.
    }

    const playMusic = () => {
        container.classList.add("playing")
        play.querySelector("i").classList = "fa-solid fa-pause"
        audio.play();
    }

    const calculateTime = (toplamSaniye) => {
        const dakika = Math.floor(toplamSaniye / 60);
        const saniye = Math.floor(toplamSaniye % 60);
        const güncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}` 
        const sonuc = `${dakika}:${güncellenenSaniye}`;
        return sonuc;
    }


    audio.addEventListener("loadedmetadata" , () => {
    // loadedmetadata audionun bilgilerinin getirilmeisni sağlar.
        duration.textContent = calculateTime(audio.duration) ;
        progressBar.max = Math.floor(audio.duration)
    })


    audio.addEventListener("timeupdate" , () => { 
    // timeupdate audio nun saniyesi var ve bu saniye geçtiği sürece yap.
        progressBar.value= Math.floor(audio.currentTime);
    // currentTime o ana audio kaçıncı saniyedeyse o bilgi gelir 
        currentTime.textContent = calculateTime(progressBar.value)
    })

    progressBar.addEventListener("input" , () => {
    // progressBar a her tıkladığımızda fonksiyonu aktif et.
        currentTime.textContent = calculateTime(progressBar.value)
        audio.currentTime = progressBar.value;
    }) 
    
    volumeBar.addEventListener("input" , (e) => {
        const value = e.target.value;
        audio.volume=value/100;
    // Fonksiyonun içindeki e değeri valuemeBar a tıklandğı zaman ki hakkında bir ton bilgi veriri ve biz o bilgiler arasında target aldında ki value değerlini alırırzı.
    // Audio nun volume değeri 0 ile 1 arasında değer alır o yüzden value değerini 100 e böldük.
    if (value == 0 ) {
        audio.muted = true; //sesi kapatmak
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark"
    }
    else {
        audio.muted = false; //sesi açmak
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high" ;
        }
    })


    let sesDurumu = "sesli";
    volume.addEventListener("click" , (e) => {
        
        if (sesDurumu === "sesli") {
            audio.muted = true; //sesi kapatmak
            sesDurumu = "sessiz";
            volume.classList = "fa-solid fa-volume-xmark"
            volumeBar.value=0;
        } 
        else{
            audio.muted = false; //sesi açmak
            sesDurumu = "sesli";
            volume.classList = "fa-solid fa-volume-high" ;
            volumeBar.value= "50";
        }
    })
    

let displayMusicList = (list) => {
    for (let i=0; i < list.length; i++) {
        let liTag=`
            <li li-index='${i}' onclick="selectedMusic(this)"class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            </li>
            <audio class="music-${i}" src="mp3/${list[i].file}" ></audio>
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

            let liAudioDuration = ul.querySelector(`#music-${i}`); //id
            let liAudioTag = ul.querySelector(`.music-${i}`); //class
            liAudioTag.addEventListener("loadeddata", () => { 
            liAudioDuration.innerText = calculateTime(liAudioTag.duration)
        } )
// loadeddata dosyayı inceler e saniye cinsinden şarkının kaç saniye olduğunu bulur.

    }
}

const selectedMusic = (li) =>{
    player.index = li.getAttribute("li-index");
    //playerin in index numarasını listenin index numarsı ile değiştiriyoruz.
    //sayfa yüklendiği zaman zaten bizim listedeki değerler displaMusicList aracılığıyla takır takır içine değerler yazılıp listeleniyor.
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}


const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")){
        if (li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing")
        }
    } 
}

audio.addEventListener("ended" , () =>{
    nextMusic();
//şarkı bitince bu fonksiyonu uygula.
})