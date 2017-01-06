function createFpsMeter(filter = 12) {
    let frameTime = 0;

    return {
        update(deltaTime) {
            frameTime += (deltaTime - frameTime) / filter;
        },
        
        get fps() {
            return 1000 / frameTime;
        }
    };
}

export default createFpsMeter;