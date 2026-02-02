import { width, height } from "./conf.js";
import { getVal, getValOnceAndReset, setVal } from "./storage.js";
import { changeGameStatus } from "./looper.js";
import { fillMask, fillTextAtCenter } from "./tool.js";


export const update = () => {
    const key = getValOnceAndReset("key");
    if (key === "r") {
        changeGameStatus("gameover->restart");
        return false;
    }
}

export const render = () => {
    fillMask();
    const hiscore = localStorage.getItem("hiscore");
    fillTextAtCenter("GameOver", "Arial", 30, "#fff", 1, { x: 0, y: -15 });
    fillTextAtCenter(`this score:${getVal("score")}`, "Arial", 12, "#fff", 1, { x: 0, y: 10 });
    fillTextAtCenter(`hi   score:${hiscore}`, "Arial", 12, "#fff", 1, { x: 0, y: 25 });
    fillTextAtCenter("Press R to Restart", "Arial", 12, "#fff", 1, { x: 0, y: 40 });
}