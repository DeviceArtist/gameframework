import { width, height } from "./conf.js";
import { getVal, getValOnceAndReset, setVal } from "./storage.js";
import { changeGameStatus } from "./looper.js";
import { fillMask, fillTextAtCenter } from "./tool.js";

export const update = () => {
    const key = getValOnceAndReset("key");
    if (key === "p") {
        changeGameStatus("pausing->gaming");
        return false;
    }
}

export const render = () => {
    fillMask();
    fillTextAtCenter("Pause", "Arial", 20, "#fff", 1, { x: 0, y: 0 });
}