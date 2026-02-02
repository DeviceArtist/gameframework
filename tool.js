import { debug } from "./conf.js";
import { getVal } from "./storage.js";
import { width, height } from "./conf.js";

export const log = (...value) => {
    if (debug) {
        value.forEach(v => {
            console.log(v);
        })
    }
}

export const checkCollision = (sprite1, sprite2) => {
    // 获取第一个精灵的边界
    const left1 = sprite1.position.x;
    const right1 = sprite1.position.x + sprite1.size.w;
    const top1 = sprite1.position.y;
    const bottom1 = sprite1.position.y + sprite1.size.h;

    // 获取第二个精灵的边界
    const left2 = sprite2.position.x;
    const right2 = sprite2.position.x + sprite2.size.w;
    const top2 = sprite2.position.y;
    const bottom2 = sprite2.position.y + sprite2.size.h;

    // 检测是否没有碰撞的情况（如果有一个条件成立，则没有碰撞）
    if (right1 < left2 || left1 > right2 || bottom1 < top2 || top1 > bottom2) {
        return false; // 没有碰撞
    }

    // 如果所有不碰撞的条件都不成立，则发生了碰撞
    return true;
}

export const fillMask = () => {
    const ctx = getVal('ctx');
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
}

export const fillTextAtCenter = (text, font, size, color, alpha, offset) => {
    const ctx = getVal('ctx');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerX = width / 2;
    const centerY = height / 2;
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fillText(text, centerX + offset.x, centerY + offset.y);
}

export const makeSprite = (name, position, vector, size, color, speed) => {
    return {
        name,
        color,
        life: 1,
        size,
        position,
        vector,
        speed,
    }
}

export const updatePosition = (...sprites) => {
    sprites.forEach(sprite => {
        if (sprite.life == 0) {
            return;
        }
        sprite.position.x += sprite.vector.x * sprite.speed;
        sprite.position.y += sprite.vector.y * sprite.speed;
        if (sprite.name === "player") {
            sprite.vector = {
                x: 0,
                y: 0
            }
        }
    });
};