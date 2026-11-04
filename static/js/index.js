'use strict';
const videos = [...document.querySelectorAll('#video-results video')];
const toggleButton = document.querySelector('#toggle-videos');
const restartButton = document.querySelector('#restart-videos');
const status = document.querySelector('#playback-status');
let playing = true;
let ready = false;
let startTime = 0;
let pausedTime = 0;
let cycleDuration = 10;
let requestId = 0;

// Wait for every comparison so the entire gallery starts on the same frame.
const mediaReady = videos.map(video => {
  video.muted = true;
  video.pause();
  return new Promise(resolve => {
    if (video.readyState >= 3) { resolve(video); return; }
    video.addEventListener('canplay', () => resolve(video), { once: true });
    video.addEventListener('error', () => resolve(null), { once: true });
  });
});
const availableVideos = () => videos.filter(video => !video.error && video.readyState >= 1);
const currentTime = () => playing ? ((performance.now() - startTime) / 1000) % cycleDuration : pausedTime;

async function playAll(time) {
  const request = ++requestId;
  const playable = availableVideos();
  playable.forEach(video => { video.currentTime = time; });
  const results = await Promise.allSettled(playable.map(video => video.play()));
  if (request !== requestId) return;
  playing = true;
  startTime = performance.now() - time * 1000;
  toggleButton.textContent = 'Pause videos';
  status.textContent = results.length > 0 && results.every(result => result.status === 'rejected')
    ? 'Press Play videos to enable playback.' : '';
  if (results.length > 0 && results.every(result => result.status === 'rejected')) {
    playing = false;
    pausedTime = time;
    playable.forEach(video => video.pause());
    toggleButton.textContent = 'Play videos';
  }
}
Promise.all(mediaReady).then(loaded => {
  ready = true;
  const durations = loaded.filter(Boolean).map(video => video.duration).filter(Number.isFinite);
  cycleDuration = durations.length ? Math.min(...durations) : 10;
  if (playing) void playAll(0);
  else status.textContent = '';
});
toggleButton.addEventListener('click', () => {
  if (playing) {
    pausedTime = ready ? currentTime() : 0;
    playing = false;
    requestId++;
    videos.forEach(video => video.pause());
    toggleButton.textContent = 'Play videos';
    status.textContent = '';
  } else {
    playing = true;
    toggleButton.textContent = 'Pause videos';
    if (ready) void playAll(pausedTime);
  }
});
restartButton.addEventListener('click', () => {
  pausedTime = 0;
  playing = true;
  if (ready) void playAll(0);
});
// A single clock keeps every dataset and comparison aligned, including loops.
setInterval(() => {
  if (!ready || !playing) return;
  const target = currentTime();
  availableVideos().forEach(video => {
    const delta = Math.abs(video.currentTime - target);
    if (video.readyState >= 3 && Math.min(delta, Math.abs(delta - cycleDuration)) > 0.3) video.currentTime = target;
    if (video.paused) void video.play().catch(() => {});
  });
}, 750);

document.querySelector('#copy-bibtex').addEventListener('click', async () => {
  const citation = document.querySelector('#citation');
  const feedback = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent);
    feedback.textContent = 'Citation copied.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges(); selection.addRange(range);
    feedback.textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
  }
});
