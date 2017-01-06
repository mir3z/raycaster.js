export default class Game {
    
    constructor(raf) {
        this.running = false;
        this.raf = raf;
    }


    start() {
        this.running = true;
        this.raf.request();
    }
    
    stop() {
        this.running = false;
        this.raf.cancel();
    }

    loop(fn) {
        this.stop();

        let lastGameTime = 0;
        const frame = gameTime => {
            if (!this.running) {
                return;
            }

            const frameTime = gameTime - lastGameTime;
            fn(frameTime, gameTime);

            lastGameTime = gameTime;
            this.raf.request();
        };

        this.raf.register(frame);
    }
}
