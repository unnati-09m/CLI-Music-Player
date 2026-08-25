import fs from "fs";

import state from "./state.js";
import { handleInput } from "./inputHandler.js";
import { render } from "./ui.js";

const songsPath = "./songs";

state.songs = fs
  .readdirSync(songsPath)
  .filter(song => song.endsWith(".mp3"));

process.stdin.setEncoding("utf-8");

process.stdin.setRawMode(true);

render();

process.stdin.on("data", async (input) => {
  await handleInput(input);
});