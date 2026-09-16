import state from "./state.js";

let previousLines = 0;

export function render() {

  // Move cursor to the first line of the previous UI
  if (previousLines > 0) {
    process.stdout.write(`\x1b[${previousLines - 1}A`);
  }

  const lines = [];

  lines.push("🎶 CLI MUSIC PLAYER 🎶");
  lines.push("");

if (state.songs.length === 0) {

  lines.push("No MP3 songs found in the songs folder.");

} else {

  for (let i = 0; i < state.songs.length; i++) {

    if (i + 1 === state.selectedSong) {
      lines.push(`→ ${i + 1}: ${state.songs[i]}`);
    } else {
      lines.push(`  ${i + 1}: ${state.songs[i]}`);
    }
  }
} ;

  lines.push("");

  if (state.playingSong !== null) {

    const song = state.songs[state.playingSong - 1];

    lines.push(`🎵 Playing: ${song}`);

    const percentage =
      state.duration > 0
        ? (state.currentTime / state.duration) * 100
        : 0;

    const barLength = 20;

    const filled = Math.floor(
      (percentage / 100) * barLength
    );

    const bar =
      "█".repeat(filled) +
      "░".repeat(barLength - filled);

    lines.push(
      `[${bar}] ${percentage.toFixed(0)}%`
    );

    lines.push(
      `${formatTime(state.currentTime)} / ${formatTime(state.duration)}`
    );

    lines.push(
      state.isPaused ? "⏸ PAUSED" : "▶ PLAYING"
    );

  } else {
    lines.push("No song playing");
  }

  lines.push("");
  lines.push(
  "↑ ↓ Navigate | Enter Play | P Pause/Resume | + Forward 10s | - Back 10s | Q Quit"
);

  // Clear the old UI
  for (let i = 0; i < previousLines; i++) {

    process.stdout.write("\x1b[2K\r");

    if (i < previousLines - 1) {
      process.stdout.write("\n");
    }
  }

  // Move back to the first line
  if (previousLines > 0) {
    process.stdout.write(`\x1b[${previousLines - 1}A`);
  }

  process.stdout.write("\r");

  // Draw the new UI
  process.stdout.write(lines.join("\n"));

  previousLines = lines.length;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}