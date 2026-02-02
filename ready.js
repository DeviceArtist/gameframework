import { width, height } from "./conf.js";
import { getVal, getValOnceAndReset, setVal } from "./storage.js";
import { changeGameStatus } from "./looper.js";
import { fillTextAtCenter, log } from "./tool.js";

export const update = () => {

}
export const render = () => {
    const ctx = getVal('ctx');
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);


    fillTextAtCenter("hello", "Arial", 30, "#fff", 1, { x: 0, y: -5 });
    fillTextAtCenter("Press S to start", "Arial", 12, "#fff", 1, { x: 0, y: 20 });

    log(getVal("key"));
    if (getValOnceAndReset("key") === "s") {
        log("yes....")
        changeGameStatus("ready->gaming");
    }
}