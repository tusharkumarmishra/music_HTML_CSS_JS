
let songs = [
    {
        name: 'Shree Ram',
        path: 'media/1.mp3',
        artist: 'unknown',
        cover: 'media/1.1.jpg'
    },
    {
        name: 'Hanuman',
        path: ' media/2.mp3 ',
        artist: 'unknown',
        cover: 'media/2.1.jpg'
    },
    {
        name: 'Har Har Mahadev',
        path: ' media/3.mp3 ',
        artist: 'unknown',
        cover: 'media/3.1.jpg'
    },
    {
        name: 'Mata Durga',
        path: ' media/4.mp3 ',
        artist: 'unknown',
        cover: 'media/4.1.jpg'
    }

]

let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');

const songName = document.querySelector('.music-name');

const artistName = document.querySelector('.artist-name');

const disk = document.querySelector('.disk');

const currentTime = document.querySelector('.current-time');

const musicDuration = document.querySelector('.song-duration');

const playBtn = document.querySelector('.play-btn');

const forwardBtn = document.querySelector('.for-btn');

const backwardBtn = document.querySelector('.back-btn');


playBtn.addEventListener('click' , () => {

    playBtn.classList.toggle('playing');
    disk.classList.toggle('play');

    if (playBtn.className.includes('playing')) {
        music.play();
    } else {
        music.pause();
    }
})

const setMusic = (i) => {
    seekBar.value = 0;  // set range slide value to 0 ;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}  :  ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500); 

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
    playMusic();
})

const playMusic = () => {
    music.play();
    playBtn.classList.add('playing');
    disk.classList.add('play');
}
//forward and backward

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})
backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})
