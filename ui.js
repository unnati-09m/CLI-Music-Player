import state from "./state.js";

export function render() {
  console.clear();

  const lines = [];

  lines.push("🎶 CLI MUSIC PLAYER 🎶");
  lines.push("");

  // Show songs
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
  }

  lines.push("");

  // Show playing song
  if (state.playingSong !== null) {
    const song = state.songs[state.playingSong - 1];

    lines.push(`🎵 Playing: ${song}`);

    // Calculate progress percentage
    const percentage =
      state.duration > 0
        ? (state.currentTime / state.duration) * 100
        : 0;

    // Progress bar
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

    // Time
    lines.push(
      `${formatTime(state.currentTime)} / ${formatTime(state.duration)}`
    );

    // Playing / Paused
    if (state.isPaused) {
      lines.push("⏸ PAUSED");
    } else {
      lines.push("▶ PLAYING");
    }

  } else {
    lines.push("No song playing");
  }

  lines.push("");

  // Controls
  lines.push(
    "↑ ↓ Navigate | Enter Play | P Pause/Resume | + Forward 10s | - Back 10s | Q Quit"
  );

  // Display everything
  process.stdout.write(lines.join("\n"));
}


// Convert seconds into minutes:seconds
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}