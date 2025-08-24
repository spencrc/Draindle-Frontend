import songs from '../songs.ts'

const song = songs['Deletee (Intro)']    
const guessFrames = document.querySelectorAll(".guess-frame") as NodeListOf<HTMLElement>;

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

guessFrames.forEach((guessFrame) => {
    const time = Number(guessFrame?.dataset.time ?? 0);
    const startTime = time === 3 ? 0 : Math.floor(randomInteger(song.d * 0.1, song.d * 0.9));
    const data = { 
        videoId: song.id,
        startTime: startTime,
        endDelay: time
    };

    const playButton = guessFrame.querySelector('.play');
    playButton?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('playSong', { detail: data }));
    });
});