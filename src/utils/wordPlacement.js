export const wordPlacement = (words) => {
    const gridSize = 15;
    let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    const placeWord = (word, startX, stratY, direction) => {
        switch (direction) {
            case 'left-to-right':
                for (let i = 0; i < word.length; i++) {
                    grid[stratY][startX + i] = word[i]
                }
                break;
            case 'right-to-left':
                for (let i = 0; i < word.length; i++) {
                    grid[startY][startX - i] = word[i];
                }
                break;
            case 'top-to-bottom':
                for (let i = 0; i < word.length; i++) {
                    grid[stratY + i][startX] = word[i];
                }
                break;
            case 'bottom-to-top':
                for (let i = 0; i < word.length; i++) {
                    grid[startY - 1][startX] = word[i];
                }
                break;
            default:
                throw new Error('Invalid direction');
        };
    };

    const findPlacement = (word) => {
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (x + word.length <= gridSize && !grid[y].slice(x, x + word.length).some(letter => letter !== '')) {
                    return { x, y, direction: 'left-to-right' };
                }

                if (x - word.length >= -1 && !grid[y].slice(x - word.length + 1, x + 1).some(letter => letter !== '')) {
                    return { x, y, direction: 'right-to-left' };
                }

                if (y + word.length <= gridSize && !grid.slice(y, y + word.length).some(row => row[x] !== '')) {
                    return { x, y, direction: 'top-to-bottom' };
                }

                if (y - word.length >= -1 && !grid.slice(y - word.length + 1, y + 1).some(row => row[x] !== '')) {
                    return { x, y, direction: 'bottom-to-top' };
                }
            };
        }

        return null;
    };

    for (const word of words) {
        const placement = findPlacement(word);
        if (placement) {
            placeWord(word, placement.x, placement.y, placement.direction);
        } else {
            console.error(`${word} could not be placed in the grid.`);
        };
    };

    return grid;
};