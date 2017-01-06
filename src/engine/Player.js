import { CIRCLE, sin, cos } from "./../core/math";

const WALL_COLLISION_MARGIN = 3;

class Player {
    constructor({ x = 0, y = 0, direction = 0 } = {}, isCollisionAt) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.collides = (dx, dy) => isCollisionAt(this.x + dx, this.y + dy);
    }
    
    get position() {
        const { x, y, direction } = this;
        return { x, y, direction };
    }

    moveForward(movementSpeed = 1) {
        const { dx, dy } = movement(this.direction, movementSpeed);

        this.move(dx, -dy);
    }

    moveBackward(movementSpeed = 1) {
        const { dx, dy } = movement(this.direction, movementSpeed);

        this.move(-dx, dy);
    }

    move(dx, dy) {
        if (!this.collides(dx * WALL_COLLISION_MARGIN, 0)) {
            this.x += dx;
        }

        if (!this.collides(0, dy * WALL_COLLISION_MARGIN)) {
            this.y += dy;
        }
    }

    rotateLeft(turningSpeed = 1) {
        this.rotate(turningSpeed);
    }

    rotateRight(turningSpeed = 1) {
        this.rotate(-turningSpeed);
    }

    rotate(angle) {
        this.direction = (this.direction + angle) % CIRCLE;
    }
}

function movement(direction, speed) {
    return {
        dx: cos(direction) * speed,
        dy: sin(direction) * speed
    };
}

export default Player;