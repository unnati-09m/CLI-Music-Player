const fs = require("fs");

const state = require("./state");
const { render } = require("./ui");
const { setupInput } = require("./inputHandler");


// Load songs
const songs = fs
  .readdirSync("./songs")
  .filter((file) => file.endsWith(".mp3"));


// Initial render
render(songs, state);


// Start keyboard handling
setupInput(songs, state, render);