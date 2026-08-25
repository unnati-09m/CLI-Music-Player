import audio from "audio";
import state from "./state.js";

let currentAudio = null;
let playRequestId = 0;

export async function playSong(songNumber) {

  // Every new play request gets a new ID
  const requestId = ++playRequestId;

  // Stop whatever is currently playing
  stopSong();

  const song = state.songs[songNumber - 1];
  const filePath = `./songs/${song}`;

  // Create the new audio object
  const newAudio = audio(filePath);

  // Wait until the new audio is decoded
  await newAudio;

  // If another song was requested while this one was loading,
  // this audio is old, so don't start it.
  if (requestId !== playRequestId) {
    newAudio.stop();
    return;
  }

  // This is now the current audio
  currentAudio = newAudio;

  state.playingSong = songNumber;
  state.isPaused = false;
  state.currentTime = 0;
  state.duration = currentAudio.duration;

  // Update progress using the audio object's real position
  currentAudio.on("timeupdate", (time) => {

    // Ignore events from an old audio object
    if (currentAudio !== newAudio) {
      return;
    }

    state.currentTime = time;

    // Redraw so the progress bar actually moves
    // while the song is playing.
    if (!state.isPaused) {
      import("./ui.js").then(({ render }) => {
        render();
      });
    }
  });

  currentAudio.on("ended", () => {

    // Ignore an old song finishing after we switched
    if (currentAudio !== newAudio) {
      return;
    }

    state.playingSong = null;
    state.isPaused = false;
    state.currentTime = 0;

    currentAudio = null;

    import("./ui.js").then(({ render }) => {
      render();
    });
  });

  // Start the new song
  currentAudio.play();
}

export function pauseSong() {

  if (!currentAudio) return;

  currentAudio.pause();

  state.isPaused = true;

  // Take the exact position from the audio object
  state.currentTime = currentAudio.currentTime;
}

export function resumeSong() {

  if (!currentAudio) return;

  currentAudio.resume();

  state.isPaused = false;
}

export function stopSong() {

  if (currentAudio) {

    currentAudio.stop();

    currentAudio.dispose();

    currentAudio = null;
  }

  state.playingSong = null;
  state.isPaused = false;
  state.currentTime = 0;
  state.duration = 0;
}

export function jumpForward() {

  if (!currentAudio) return;

  const newTime = Math.min(
    currentAudio.currentTime + 10,
    currentAudio.duration
  );

  currentAudio.seek(newTime);

  state.currentTime = newTime;
}