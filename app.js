import { width, height } from "./conf.js";
import { start } from "./looper.js";
import { setVal } from "./storage.js";
import { log } from "./tool.js";

const app = document.querySelector("#app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
app.appendChild(canvas);

document.addEventListener("keypress", ({ key }) => {
    log("press", key);
    setVal("key", key);
});

setVal('ctx', ctx);
start();