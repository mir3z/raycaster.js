export const CIRCLE = 360;
export const CIRCLE_1_2 = CIRCLE / 2;
export const CIRCLE_1_4 = CIRCLE / 4;
export const CIRCLE_3_4 = 3 * CIRCLE_1_4;
export const BLOCK_SIZE = 64;

export const normDeg = deg => {
    const _deg = deg % CIRCLE;
    return _deg < 0 ? _deg + CIRCLE : _deg;
};

export const trunc = v => Math.floor(v);

export const rad = deg => deg * Math.PI / CIRCLE_1_2 + 0.001;
export const sin = deg => Math.sin(rad(deg));
export const cos = deg => Math.cos(rad(deg));
export const tan = deg => Math.tan(rad(deg));