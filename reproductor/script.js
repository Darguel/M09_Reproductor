document.addEventListener('DOMContentLoaded', () => {
    let currentSongIndex = 0;
    let isPlaying = false;

    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeMute = document.getElementById('volume-mute');
    const volumeUp = document.getElementById('volume-up');
    const albumCover = document.getElementById('album-cover');
    const songName = document.getElementById('song-name');
    const artistName = document.getElementById('artist-name');
    const songDuration = document.getElementById('song-duration');
    const volumeValue = document.getElementById('volume-value'); // Nuevo elemento para mostrar el valor del volumen

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const songs = data;
            loadSong(songs[currentSongIndex]);

            playPauseBtn.addEventListener('click', () => {
                if (isPlaying) {
                    audioPlayer.pause();
                    playPauseBtn.textContent = 'play_arrow';
                    albumCover.classList.remove('spin');
                } else {
                    audioPlayer.play();
                    playPauseBtn.textContent = 'pause';
                    albumCover.classList.add('spin');
                }
                isPlaying = !isPlaying;
            });

            prevBtn.addEventListener('click', () => {
                currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
                loadSong(songs[currentSongIndex]);
                audioPlayer.pause();
                playPauseBtn.textContent = 'play_arrow';
                albumCover.classList.remove('spin');
                isPlaying = false;
            });

            nextBtn.addEventListener('click', () => {
                currentSongIndex = (currentSongIndex + 1) % songs.length;
                loadSong(songs[currentSongIndex]);
                audioPlayer.pause();
                playPauseBtn.textContent = 'play_arrow';
                albumCover.classList.remove('spin');
                isPlaying = false;
            });

            volumeSlider.addEventListener('input', (e) => {
                audioPlayer.volume = e.target.value / 100;
                volumeValue.textContent = e.target.value; // Actualiza el valor del volumen
            });

            function loadSong(song) {
                albumCover.src = song.img;
                songName.textContent = song.name;
                artistName.textContent = song.artist;
                songDuration.textContent = song.duration;
                audioPlayer.src = song.path;
                audioPlayer.volume = volumeSlider.value / 100;
                volumeValue.textContent = volumeSlider.value; // Actualiza el valor del volumen al cargar la canción
            }
        })
        .catch(error => console.error('Error loading songs:', error));
});
