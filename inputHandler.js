function setupInput(songs, state, render) {

  process.stdin.setEncoding("utf-8");
  process.stdin.setRawMode(true);

  process.stdin.on("data", (input) => {

    // Q → Quit
    if (input === "q") {
      process.stdin.setRawMode(false);
      process.exit(0);
    }


    // ↑ Up Arrow
    if (input[2] === "A") {

      if (state.selectedSong > 1) {
        state.selectedSong--;
      }

      render(songs, state);
    }


    // ↓ Down Arrow
    if (input[2] === "B") {

      if (state.selectedSong === songs.length) {
        state.selectedSong = 1;
      } else {
        state.selectedSong++;
      }

      render(songs, state);
    }


    // Enter
    if (input === "\r") {
      state.playingSong = state.selectedSong;

      console.log("Selected song:", songs[state.selectedSong - 1]);
    }
  });
}

module.exports = { setupInput };