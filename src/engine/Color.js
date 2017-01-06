export default class Color {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    multiply(v) {
        return new Color(this.r * v, this.g * v, this.b * v);
    }

    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a}`;
    }

    static fromRGB({ r, g, b, a }) {
        return new Color(r, g, b, a);
    }

    static fromHex(hexColor) {
        return Color.fromRGB(hexToRGB(toHexValue(hexColor)));
    }
}

function toHexValue(str) {
    let numAsStr = str.replace(/[^0-9A-F]/gi, "");

    if (numAsStr.length === 3) {
        numAsStr = numAsStr.split("").map(c => c+c).join("");
    }

    return parseInt(numAsStr, 16);
}

function hexToRGB(hex) {
    return {
        r: (hex >> 16) & 255,
        g: (hex >> 8) & 255,
        b: hex & 255
    };
}