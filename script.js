const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const timeDisplay = document.getElementById("time");
const volume = document.getElementById("volume");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");
const upload = document.getElementById("upload");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

let isPlaying = false;
let isLoop = false;
let isShuffle = false;

const songs = [
  {
    title: "Acoustic Breeze",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    cover: "https://picsum.photos/id/237/200/200"
  },
  {
    title: "Creative Minds",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
    cover: "https://picsum.photos/id/238/200/200"
  }
];

let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  let current = formatTime(audio.currentTime);
  let total = formatTime(audio.duration);
  timeDisplay.textContent = `${current} / ${total}`;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.textContent = isShuffle ? "🔀 Shuffle: On" : "🔀 Shuffle";
});

loopBtn.addEventListener("click", () => {
  isLoop = !isLoop;
  audio.loop = isLoop;
  loopBtn.textContent = isLoop ? "🔁 Loop: On" : "🔁 Loop: Off";
});

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    loadSong({
      title: file.name,
      artist: "Local File",
      src: url,
      cover: "https://picsum.photos/200"
    });
    playSong();
  }
});

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Load first song
loadSong(songs[songIndex]);
document.getElementById('album-img').src = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=320&q=80';

// Advanced features for animation videos
function enhanceVideoFeatures() {
  if (!video) return;
  // Add playback speed control
  let speedControl = document.createElement('select');
  speedControl.id = 'speed-control';
  speedControl.style.margin = '12px 0 0 0';
  ['0.5x','1x','1.5x','2x'].forEach((label, i) => {
    let opt = document.createElement('option');
    opt.value = [0.5,1,1.5,2][i];
    opt.textContent = label;
    if (opt.value == 1) opt.selected = true;
    speedControl.appendChild(opt);
  });
  speedControl.onchange = function() {
    video.playbackRate = parseFloat(this.value);
    showToast('Speed: ' + this.value + 'x');
  };
  video.parentNode.appendChild(speedControl);

  // Add fullscreen button
  let fullscreenBtn = document.createElement('button');
  fullscreenBtn.textContent = 'Fullscreen';
  fullscreenBtn.className = 'main-control';
  fullscreenBtn.style.margin = '12px 0 0 12px';
  fullscreenBtn.onclick = function() {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
  };
  video.parentNode.appendChild(fullscreenBtn);

  // Add loop toggle
  let loopBtn = document.createElement('button');
  loopBtn.textContent = 'Loop: Off';
  loopBtn.className = 'main-control';
  loopBtn.style.margin = '12px 0 0 12px';
  loopBtn.onclick = function() {
    video.loop = !video.loop;
    loopBtn.textContent = 'Loop: ' + (video.loop ? 'On' : 'Off');
    showToast('Loop ' + (video.loop ? 'enabled' : 'disabled'));
  };
  video.parentNode.appendChild(loopBtn);
}
// Call when loading an animation video
function loadTrack(idx) {
  const track = playlist[idx];
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  albumImg.src = track.img;
  albumImg.style.display = 'block';
  if (track.type === 'mp4') {
    audio.style.display = 'none';
    video.style.display = 'block';
    video.src = track.src;
    video.poster = track.img;
    video.load();
    albumImg.style.display = 'none';
    enhanceVideoFeatures();
  } else {
    audio.style.display = 'block';
    video.style.display = 'none';
    audio.src = track.src;
    audio.load();
    albumImg.style.display = 'block';
  }
  highlightPlaylist(idx);
}
