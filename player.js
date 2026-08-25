const { spawn } = require("child_process");

function stopCurrentSong(state) {
  if (state.playerProcess) {
    state.playerProcess.kill("SIGKILL");
    state.playerProcess = null;
  }

  state.playingSong = null;
  state.isPaused = false;
}

function startSong(songs, state) {
  const song = songs[state.selectedSong - 1];

  state.playingSong = state.selectedSong;

  state.playerProcess = spawn("afplay", [
    `./songs/${song}`
  ]);

  console.log(`Playing: ${song}`);
}

function playSelectedSong(songs, state) {
  stopCurrentSong(state);

  startSong(songs, state);
}

module.exports = {
  playSelectedSong,
  stopCurrentSong
};