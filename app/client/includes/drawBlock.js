const colorRelated = require('./colorRelated');
const gameLevelEnvironment = require('./gameLevelEnvironment');

// this function draws a block to a canvas

function drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playAreaMode, fullLines, gameEndFadeAnimationCounter, gameEndFadeAnimationLength, fullLineFadeAnimationCounter, fullLineFadeAnimationLength) {

    let opacity;
    const blockMapNumberOfRows = blockMapToDraw.length;
    const blockMapNumberOfColumns = blockMapToDraw[0].length;
    let lineIsEmpty = true;
    let isRectangleFilled;

    for (let y = 0; y < blockMapNumberOfRows; y++) {
        for (let x = 0; x < blockMapNumberOfColumns; x++) {
            isRectangleFilled = blockMapToDraw[y][x];
            if (isRectangleFilled === 1) {

                lineIsEmpty = false;

                // determine position

                const xOnCalculationArea = x + xModifierInSquares;
                const yOnCalculationArea = y + yModifierInSquares;

                // determine the color of the pixel

                if (playAreaMode === 'gameEndFadeOutAnimation') {
                    opacity = gameEndFadeAnimationCounter / gameEndFadeAnimationLength;
                } else if (fullLines.includes(yOnCalculationArea - 1)) {
                    opacity = fullLineFadeAnimationCounter / fullLineFadeAnimationLength;
                } else {
                    opacity = 1;
                }
                ctx.fillStyle = colorRelated.convertColorHexToRGB(blockToDrawColor, opacity);

                // draw the block
                ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels, (gameLevelEnvironment.pixelSize - 1), (gameLevelEnvironment.pixelSize - 1));

                // check if the block has another pixel on the right this one
                try {
                    const isRightSiblingFilled = blockMapToDraw[y][x + 1];
                    if (isRightSiblingFilled === 1) {
                        ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize + gameLevelEnvironment.pixelSize - 1, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels, 1, (gameLevelEnvironment.pixelSize - 1));
                    }
                } catch {
                    //
                }

                // check if the block has another pixel underneath this one
                try {
                    const isBottomSiblingFilled = blockMapToDraw[y + 1][x];
                    if (isBottomSiblingFilled === 1) {
                        ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels + gameLevelEnvironment.pixelSize - 1, (gameLevelEnvironment.pixelSize - 1), 1);
                    }
                } catch {
                    //
                }

            }
        }
        if ((drawEmptyLines === false) && (lineIsEmpty === true)) {
            yModifierInSquares--;
        }
    }
}

module.exports = {
    drawBlock
};