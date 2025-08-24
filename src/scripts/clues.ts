import songs from '../songs.ts'
const song = songs['Deletee (Intro)']

let clueArray: Array<HTMLElement> = [];

interface ClueData {
    text: string,
    time: number
}

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupClues(): void {
    const labels: Array<ClueData> = [
            {text: '0.5 seconds', time: 0.5},
            {text: '1 second', time: 1},
            {text: 'Start of song', time: 3}
        ];

    const guessFrame: HTMLElement = document.createElement("div");
    guessFrame.setAttribute("class", "guess-frame");
    guessFrame.innerHTML = `
        <div class="guess-features">
            <button class="play">PLAY</button>
            <div class="guess-box">
                <input id="current-guess" placeholder="GUESS A SONG" autocomplete="off">
                <button class="submit">SKIP</button>
            </div>
        </div>
        <div class="clue-type"></div>
    `
    
    for (let i = 0; i < 3; i++) {
        const startTime = i === 2 ? 0 : Math.floor(randomInteger(song.d * 0.1, song.d * 0.9));
        const data = { 
            videoId: song.id,
            startTime: startTime,
            endDelay: labels[i].time
        };

        const clone: HTMLElement = guessFrame.cloneNode(true) as HTMLElement;

        const clue = clone.querySelector(".clue-type") as HTMLElement;
        clue.textContent = labels[i].text;

        const play = clone.querySelector(".play") as HTMLButtonElement;
        play.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('playSong', { detail: data }));
        });

        clueArray[i] = clone;
        document.body.append(clueArray[i]);
    }
}

window.addEventListener('DOMContentLoaded', () => setupClues());