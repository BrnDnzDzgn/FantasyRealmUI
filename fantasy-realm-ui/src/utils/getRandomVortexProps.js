export function getRandomVortexProps() {
    const randomIntInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

    return {
    rangeY: randomIntInRange(400, 1500),
    particleCount: randomIntInRange(3000, 5000),
    baseHue: randomIntInRange(0, 1500),
    };
}