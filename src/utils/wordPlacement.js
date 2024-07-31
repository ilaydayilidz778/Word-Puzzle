export const wordPlacement = (words) => {
    const gridSize = 15;
    let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    const placeWord = (word, x, y, direction) => {
        word.split('').forEach((letter, i) => {
            if (direction === 'left-to-right') {
                grid[y][x + i] = letter;
            } else if (direction === 'right-to-left') {
                grid[y][x - i] = letter;
            } else if (direction === 'top-to-bottom') {
                grid[y + i][x] = letter;
            } else if (direction === 'bottom-to-top') {
                grid[y - i][x] = letter;
            }
        });
    };

    const canPlaceWord = (word, x, y, direction) => {
        if (direction === 'left-to-right') {
            if (x + word.length > gridSize) return false;
            return word.split('').every((letter, i) => grid[y][x + i] === '' || grid[y][x + i] === letter);
        } else if (direction === 'right-to-left') {
            if (x - word.length + 1 < 0) return false;
            return word.split('').every((letter, i) => grid[y][x - i] === '' || grid[y][x - i] === letter);
        } else if (direction === 'top-to-bottom') {
            if (y + word.length > gridSize) return false;
            return word.split('').every((letter, i) => grid[y + i][x] === '' || grid[y + i][x] === letter);
        } else if (direction === 'bottom-to-top') {
            if (y - word.length + 1 < 0) return false;
            return word.split('').every((letter, i) => grid[y - i][x] === '' || grid[y - i][x] === letter);
        }
        return false;
    };

    const findPlacement = (word) => {
        let bestPlacement = null;
        let bestScore = -1;

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (canPlaceWord(word, x, y, 'left-to-right')) {
                    const score = calculatePlacementScore(word, x, y, 'left-to-right');
                    if (score > bestScore) {
                        bestScore = score;
                        bestPlacement = { x, y, direction: 'left-to-right' };
                    }
                }
                if (canPlaceWord(word, x, y, 'right-to-left')) {
                    const score = calculatePlacementScore(word, x, y, 'right-to-left');
                    if (score > bestScore) {
                        bestScore = score;
                        bestPlacement = { x, y, direction: 'right-to-left' };
                    }
                }
                if (canPlaceWord(word, x, y, 'top-to-bottom')) {
                    const score = calculatePlacementScore(word, x, y, 'top-to-bottom');
                    if (score > bestScore) {
                        bestScore = score;
                        bestPlacement = { x, y, direction: 'top-to-bottom' };
                    }
                }
                if (canPlaceWord(word, x, y, 'bottom-to-top')) {
                    const score = calculatePlacementScore(word, x, y, 'bottom-to-top');
                    if (score > bestScore) {
                        bestScore = score;
                        bestPlacement = { x, y, direction: 'bottom-to-top' };
                    }
                }
            }
        }
        return bestPlacement;
    };

    const calculatePlacementScore = (word, x, y, direction) => {
        let score = 0;

        if (direction === 'left-to-right') {
            for (let i = 0; i < word.length; i++) {
                if (grid[y][x + i] === word[i]) {
                    score += 1;
                } else if (grid[y][x + i] !== '') {
                    score -= 1; // Negative score for conflicting letters
                }
            }
        } else if (direction === 'right-to-left') {
            for (let i = 0; i < word.length; i++) {
                if (grid[y][x - i] === word[i]) {
                    score += 1;
                } else if (grid[y][x - i] !== '') {
                    score -= 1; // Negative score for conflicting letters
                }
            }
        } else if (direction === 'top-to-bottom') {
            for (let i = 0; i < word.length; i++) {
                if (grid[y + i][x] === word[i]) {
                    score += 1;
                } else if (grid[y + i][x] !== '') {
                    score -= 1; // Negative score for conflicting letters
                }
            }
        } else if (direction === 'bottom-to-top') {
            for (let i = 0; i < word.length; i++) {
                if (grid[y - i][x] === word[i]) {
                    score += 1;
                } else if (grid[y - i][x] !== '') {
                    score -= 1; // Negative score for conflicting letters
                }
            }
        }

        return score;
    };

    const placeWords = (words) => {
        let placedWords = new Set();

        for (const word of words) {
            const placement = findPlacement(word);
            if (placement) {
                placeWord(word, placement.x, placement.y, placement.direction);
                placedWords.add(word);
            } else {
                console.error(`${word} could not be placed in the grid.`);
            }
        }

        words.forEach(word => {
            if (!placedWords.has(word)) {
                console.error(`${word} was not placed on the grid.`);
            }
        });
    };

    placeWords(words);

    return grid;
};
