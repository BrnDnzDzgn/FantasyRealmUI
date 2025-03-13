export function getRandomVortexProps() {
    const randomIntInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

    return {
    rangeY: randomIntInRange(400, 1000),
    particleCount: randomIntInRange(500, 2000),
    baseHue: randomIntInRange(100, 1000),
    };
}