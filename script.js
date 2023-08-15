const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('playBtn');
const volumeIcon = document.getElementById('volumeIcon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

function showPlayIcon() {
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
	if (video.paused) {
		video.play();
		playBtn.classList.replace('fa-play', 'fa-pause');
		playBtn.setAttribute('title', 'Pause');
	} else {
		video.pause();
		showPlayIcon();
	}
}

function displayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	seconds = seconds > 9 ? seconds : `0${seconds}`;
	return `${minutes}:${seconds}`;
}

function updateProgress() {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
	currentTime.textContent = `${displayTime(video.currentTime)} /`;
	duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
	const newTime = e.offsetX / progressRange.offsetWidth;
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
	console.log(newTime);
}

function changeVolume(e) {
	let volume = e.offsetX / volumeRange.offsetWidth;
	if (volume < 0.1) volume = 0;
	if (volume > 0.9) volume = 1;
	console.log(volume);
	video.volume = volume;
	volumeBar.style.width = `${volume * 100}%`;
}

let muted = false;

function toggleMute(e) {
	let volume = e.offsetX / volumeRange.offsetWidth;
	muted = !muted;
	if (!muted) {
		video.muted = true;
		volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
	}
	if (muted) {
		video.muted = false;
		volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
	}
}

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
// On Video End, Show play button icon
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
