//TODO: fix initial buffering on first click!
let player: YT.Player;
let endTimeout: ReturnType<typeof setTimeout> | null = null;

const playerContainer = document.getElementById('ytplayer');
const videoId = playerContainer?.dataset.videoid ?? "";

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

const onPlayerReady = new Promise((resolve) => {
window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player('ytplayer', {
    height: '0',
    width: '0',
    videoId: videoId,
    playerVars: {
        autoplay: 1,
    },
    events: {
        onReady: (e) => {
            console.log('Player ready')
            resolve(player);
            player.pauseVideo();
        },
        onStateChange: (e) => {
            console.log('State changed:', e.data);
        }
    }
    });
}
})

window.addEventListener('playSong', async (event: Event): Promise<void> => {
    const customEvent = event as CustomEvent;
    const startTime = customEvent.detail.startTime;
    const endDelay = customEvent.detail.endDelay;

    await onPlayerReady;

    player.pauseVideo()
    player.seekTo(startTime, true);
    player.playVideo()

    if (endTimeout !== null) {
        clearTimeout(endTimeout);
        endTimeout = null;
    }

    endTimeout = setTimeout(() => {
        player.pauseVideo();
    }, endDelay * 1000); // wait a bit for seek to take effect
});