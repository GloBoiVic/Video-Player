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
const playbackSpeed = document.querySelector('.player-speed');

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
}

let lastVolume = 1;

function changeVolume(e) {
	let volume = e.offsetX / volumeRange.offsetWidth;
	if (volume < 0.1) volume = 0;
	if (volume > 0.9) volume = 1;
	video.volume = volume;
	volumeBar.style.width = `${volume * 100}%`;
	// Change Icon depending on volume
	volumeIcon.className = '';

	if (volume < 0.5 || volume > 0.1) {
		volumeIcon.className = 'fas fa-volume-down';
	}
	if (volume > 0.5) {
		volumeIcon.className = 'fas fa-volume-up';
	}
	if (volume === 0) {
		volumeIcon.className = 'fas fa-volume-off';
	}
	lastVolume = volume;
}

function toggleMute() {
	volumeIcon.className = '';
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;
		volumeIcon.className = 'fas fa-volume-mute';
		volumeIcon.setAttribute('title', 'Unmute');
	} else {
		video.volume = lastVolume;
		volumeBar.style.width = `${lastVolume * 100}%`;
		volumeIcon.className =
			lastVolume > 0.5 ? 'fas fa-volume-up' : 'fas fa-volume-down';
		volumeIcon.setAttribute('title', 'Mute');
	}
}

function changeSpeed() {
	video.playbackRate = playbackSpeed.value;
}

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
playbackSpeed.addEventListener('change', changeSpeed);
