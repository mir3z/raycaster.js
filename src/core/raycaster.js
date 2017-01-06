import {
    CIRCLE_1_2, CIRCLE_1_4, CIRCLE_3_4, BLOCK_SIZE,
    tan, cos, trunc, normDeg
} from "./math";

const horz = (x, y, angleDeg, size) => {
    if (angleDeg === 0 || angleDeg === CIRCLE_1_2) {
        return null;
    }

    const angleUp = angleDeg > 0 && angleDeg < CIRCLE_1_2;

    const y0 = trunc(y / size) * size + (angleUp ? -0.001 : size);
    const x0 = x + (y - y0) / tan(angleDeg);

    const dy = angleUp ? -size : size;
    const dx = -dy / tan(angleDeg);

    return { x0, y0, dx, dy };
};

const vert = (x, y, angleDeg, size) => {
    if (angleDeg === CIRCLE_1_4 || angleDeg === CIRCLE_3_4) {
        return null;
    }

    const angleRight = angleDeg < CIRCLE_1_4 || angleDeg > CIRCLE_3_4;

    const x0 = trunc(x / size) * size + (angleRight ? size : -0.001);
    const y0 = y + (x - x0) * tan(angleDeg);

    const dx = angleRight ? size : -size;
    const dy = -dx * tan(angleDeg);

    return { x0, y0, dx, dy };
};

const calcDistance = (x0, x1, angleDeg) => Math.abs((x0 - x1) / cos(angleDeg));

export function createRaycaster(isHit) {

    const follow = ({ x0, y0, dx, dy, limit = 20 }) => {
        for (let i = 0; i < limit; ++i) {
            const vx = x0 + i * dx;
            const vy = y0 + i * dy;

            const gridX = trunc(vx / BLOCK_SIZE);
            const gridY = trunc(vy / BLOCK_SIZE);

            if (isHit(gridX, gridY)) {
                return { x: vx, y: vy };
            }
        }

        return { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
    };

    return function raycast({ x, y, angle }) {
        const normAngle = normDeg(angle);
        const pv = horz(x, y, normAngle, BLOCK_SIZE);
        const ph = vert(x, y, normAngle, BLOCK_SIZE);

        const crosspts = [];

        if (pv) {
            const hitv = follow(pv);
            hitv.vertical = true;
            hitv.horizontal = false;
            crosspts.push(hitv);
        }

        if (ph) {
            const hith = follow(ph);
            hith.vertical = false;
            hith.horizontal = true;
            crosspts.push(hith);
        }

        let closest = { x: null, y: null, distance: Number.MAX_VALUE };

        for (let i = 0, len = crosspts.length; i < len; ++i) {
            const pt = crosspts[i];
            const distance = calcDistance(x, pt.x, normAngle);

            if (distance < closest.distance) {
                closest = pt;
                closest.distance = distance;
            }
        }

        return closest;
    };
}