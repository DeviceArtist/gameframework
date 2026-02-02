let loop = false;
let p = true;

import * as ready from "./ready.js";
import * as gaming from "./gaming.js";
import * as pausing from "./pausing.js";
import * as gameover from "./gameover.js";
import { width, height, fps } from "./conf.js";
import { getVal, setVal } from "./storage.js";
import { log } from "./tool.js";

const looper = () => {
    const ctx = getVal('ctx');
    ctx.clearRect(0, 0, width, height);

    setTimeout(() => {
        looper();
    }, 1000 / fps);

    log(getVal("status"));

    switch (getVal("status")) {
        case "ready":
            ready.update();
            ready.render();
            break;
        case "gaming":
            gaming.update();
            gaming.render();
            break;
        case "pausing":
            pausing.update();
            gaming.render();
            pausing.render();
            break;
        case "gameover":
            gameover.update();
            gaming.render();
            gameover.render();
            break;
        default:
            break;
    }
}

export const start = () => {
    log("start");
    setVal("status", "ready");
    looper();
}

export const changeGameStatus = (action) => {
    switch (action) {
        case "ready->gaming":
            gaming.setup();
            setVal("status", "gaming");
            break;
        case "gaming->pausing":
            setVal("status", "pausing");
            break;
        case "pausing->gaming":
            setVal("status", "gaming");
            break;
        case "gaming->gameover":
            setVal("status", "gameover");
            break;
        case "gameover->restart":
            gaming.setup();
            setVal("status", "gaming");
            break;
        default:
            break;
    }
}