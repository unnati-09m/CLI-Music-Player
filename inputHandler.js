import state from "./state.js";
import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  jumpForward
} from "./player.js";

import { render } from "./ui.js";

export async function handleInput(input) {

  // Q → Quit
  if (input === "q") {

    stopSong();

    process.stdin.setRawMode(false);
    process.stdin.pause();

    process.stdout.write("\n");
    process.exit(0);
  }

  // ↑
  if (input[2] === "A") {

    if (state.selectedSong > 1) {
      state.selectedSong--;
    }

    render();
    return;
  }

  // ↓
  if (input[2] === "B") {

    if (state.selectedSong === state.songs.length) {
      state.selectedSong = 1;
    } else {
      state.selectedSong++;
    }

    render();
    return;
  }

  // Enter
  if (input === "\r") {

    await playSong(state.selectedSong);

    render();
    return;
  }

  // P → Pause / Resume
  if (input === "p") {

    if (state.isPaused) {
      resumeSong();
    } else {
      pauseSong();
    }

    render();
    return;
  }

  // + → Jump forward 10 seconds
  if (input === "+") {

    jumpForward();

    render();
    return;
  }
}