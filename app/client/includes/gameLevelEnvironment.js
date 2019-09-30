const pixelSize = 20;

const gameWidth = 10; // how many columns do we have
const playAreaWidth = gameWidth * pixelSize;

const fullLineFadeAnimationLength = 10;
const gravityAnimationFallingSpeed = 4;
const gameEndFadeAnimationLength = 100;

module.exports = {
    pixelSize,
    playAreaWidth,
    fullLineFadeAnimationLength,
    gravityAnimationFallingSpeed,
    gameEndFadeAnimationLength
};