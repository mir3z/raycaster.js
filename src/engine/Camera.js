import { cos, tan, BLOCK_SIZE } from "./../core/math";

class Camera {
    constructor({ width = 640, height = 480, fov = 60 } = {}) {
        this.width = width;
        this.height = height;
        this.fov = fov;
        this.center = { x: this.width / 2, y: this.height / 2 };
        this.floorFactor = this.width / this.height * cos(this.fov / 2) - 0.01;

        this.length = this.center.x / tan(this.fov / 2);
        this.delta = this.fov / this.width;

        this.x = 0;
        this.y = 0;
        this.direction = 0;
    }

    setOrientation({ x, y, direction }) {
        this.x = x * BLOCK_SIZE;
        this.y = y * BLOCK_SIZE;
        this.direction = direction;
    }

    viewport() {
        const { width, height } = this;
        return { width, height };
    }
    
    render(raycaster, level) {
        const viewport = this.viewport();

        const wall = level.getWall();
        const floor = level.getFloor();
        const sky = level.getSky();

        this.renderSky(sky);

        for (let vscan = 0; vscan < this.width; vscan += 1) {
            const wallProjection = this.wallProjection(raycaster, vscan);

            this.renderWall(wallProjection, wall, level, vscan);
            this.renderFloor(wallProjection, floor, level, vscan);
        }

        sky.flush(viewport);
        wall.flush(viewport);
        floor.flush();
    }

    renderWall(wallProjection, wall, level, vscan) {
        wall
            .setRenderingStrategy(level.reconcileWall(wallProjection))
            .render(vscan, wallProjection);
    }

    renderFloor(wallProjection, floor, level, vscan) {
        const floorTop = wallProjection.wall.top + wallProjection.wall.height;
        const floorHeight = wallProjection.viewport.height - floorTop;
        const totalHeight = floorTop + floorHeight;
        
        for (let hscan = floorTop; hscan < totalHeight; hscan += 1) {
            const floorProjection = this.floorProjection(wallProjection, hscan);
        
            floor
                .setRenderingStrategy(level.reconcileFloor(floorProjection))
                .render(vscan, hscan, floorProjection);
        }
    }

    renderSky(sky) {
        sky.render({ direction: this.direction, viewport: this.viewport() });
    }

    wallProjection(raycaster, vscan) {
        const angleOffset = vscan * this.delta - this.fov * 0.5;
        const rayAngle = this.direction - angleOffset;
        const fishBowlCorrection = cos(angleOffset);

        const hit = raycaster({ x: this.x, y: this.y, angle: rayAngle });

        const distance = hit.distance * fishBowlCorrection;
        const wallHeight = BLOCK_SIZE * this.length / distance;
        const wallTop = this.center.y - wallHeight / 2;

        return {
            from: { x: this.x, y: this.y, angle: this.direction },
            viewport: { width: this.width, height: this.height },
            wall: {
                x: hit.x / BLOCK_SIZE,
                y: hit.y / BLOCK_SIZE,
                horizontal: hit.horizontal,
                vertical: hit.vertical,
                top: wallTop,
                height: wallHeight,
                distance
            }
        };
    }
    
    floorProjection(wallProjection, hscan) {
        const { wall, from } = wallProjection;

        const floorTop = wall.top + wall.height;
        const floorHeight = this.height - floorTop;
        const totalHeight = floorTop + floorHeight;
        const srcPoint = from;
        const floorDistance = totalHeight / (2 * hscan - totalHeight);
        const weight = this.floorFactor * floorDistance / wall.distance;
        const floorX = srcPoint.x / BLOCK_SIZE + weight * (wall.x * BLOCK_SIZE - srcPoint.x);
        const floorY = srcPoint.y / BLOCK_SIZE + weight * (wall.y * BLOCK_SIZE - srcPoint.y);

        return { 
            floor: { x: floorX, y: floorY, distance: floorDistance }
        };
    }

}

export default Camera;