function render(songs, state) {
  console.clear();

  console.log("🎶 MUSIC PLAYER 🎶\n");

  for (let i = 0; i < songs.length; i++) {
    const songName = songs[i].split(".")[0];

    if (i + 1 === state.selectedSong) {
      console.log(`→ ${i + 1}. ${songName}`);
    } else {
      console.log(`  ${i + 1}. ${songName}`);
    }
  }

  console.log("\n↑ ↓ Navigate");
  console.log("Enter Play");
  console.log("P Pause / Resume");
  console.log("Q Quit");
}

module.exports = { render };