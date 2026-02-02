import { width, height } from "./conf.js";
import { getVal, getValOnceAndReset, setVal } from "./storage.js";
import { changeGameStatus } from "./looper.js";
import { checkCollision, makeSprite, updatePosition } from "./tool.js";

const game = {
    time: 0,
    score: 0
}

const enemies = [];

const player = makeSprite(
    "player",
    {
        x: 0,
        y: height - 10
    },
    {
        x: 0,
        y: 0
    },
    {
        w: 10, h: 10
    },
    "#ccc",
    1
);

const insert_a_enemy = () => {

    enemies.push(
        makeSprite(
            "enemy",
            {
                x: width,
                y: height - 10
            },
            {
                x: -1,
                y: 0
            },
            {
                w: 10, h: 10
            },
            "#f00",
            1
        )
    );
}

export const setup = () => {
    player.speed = 2;
    player.position = {
        x: 0,
        y: height - player.size.h
    }
    player.vector = {
        x: 1,
        y: 0
    }
    enemies.length = 0;
    game.score = 0;
    game.time = 0;
    insert_a_enemy();
}

export const update = () => {

    const key = getValOnceAndReset("key");

    if (key === "d") {
        player.vector.x = player.speed;
    }
    if (key === "a") {
        player.vector.x = -1 * player.speed;
    }
    if (key === "w") {
        player.vector.y = -1 * player.speed;
    }
    if (key === "s") {
        player.vector.y = player.speed;
    }

    if (key === "p") {
        console.log("press  pppppppppppp")
        changeGameStatus("gaming->pausing");
        return false;
    }

    game.time += 1;

    if (game.time % 100 == 0) {
        insert_a_enemy();
    }

    updatePosition(player, ...enemies);

    enemies.forEach(enemy => {
        if (enemy.life == 0) {
            return;
        }

        if (checkCollision(player, enemy)) {
            const hiscore = localStorage.getItem("hiscore");
            if (hiscore) {
                if (game.score > hiscore) {
                    localStorage.setItem("hiscore", game.score);
                }
            } else {
                localStorage.setItem("hiscore", game.score);
            }
            setVal("score", game.score);
            changeGameStatus("gaming->gameover");
        }
        if (enemy.position.x <= -1 * enemy.size.w) {
            enemy.life = 0;
            game.score += 1;
        }
    });

}

const render_sprite = (ctx, sprite) => {
    ctx.fillStyle = sprite.color;
    const { size: { w, h }, position: { x, y } } = sprite;
    ctx.fillRect(x, y, w, h);
}

export const render = () => {
    const ctx = getVal('ctx');
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    render_sprite(ctx, player);

    ctx.fillStyle = "#f00";
    enemies.forEach(enemy => {
        render_sprite(ctx, enemy);
    });

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '12px Arial';
    ctx.fillStyle = "#fff";
    ctx.fillText(game.score, 10, 10);
}