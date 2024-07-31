export const wordPlacement = (words) => {
    const gridSize = 15;
    let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    const placeWord = (word, x, y, direction) => {
        word.split('').forEach((letter, i) => {
            if (direction === 'left-to-right') {
                grid[y][x + i] = letter;
            } else if (direction === 'top-to-bottom') {
                grid[y + i][x] = letter;
            }
        });
    };

    const canPlaceWord = (word, x, y, direction) => {
        if (direction === 'left-to-right') {
            if (x + word.length > gridSize) return false;
            return word.split('').every((letter, i) => grid[y][x + i] === '' || grid[y][x + i] === letter);
        } else if (direction === 'top-to-bottom') {
            if (y + word.length > gridSize) return false;
            return word.split('').every((letter, i) => grid[y + i][x] === '' || grid[y + i][x] === letter);
        }
        return false;
    };

    const checkSurroundingSpaces = (x, y, direction, length) => {
        const directions = {
            'left-to-right': [[-1, 0], [1, 0], [0, -1], [0, length]],
            'top-to-bottom': [[-1, 0], [1, 0], [0, -1], [length, 0]]
        };
        return directions[direction].every(([dy, dx]) => {
            const ny = y + dy;
            const nx = x + dx;
            if (ny < 0 || ny >= gridSize || nx < 0 || nx >= gridSize) return true; // Out of bounds is allowed
            return grid[ny][nx] === '';
        });
    };

    const findIntersectionPlacement = (word) => {
        let bestPlacement = null;
        let bestScore = -1;

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                for (const direction of ['left-to-right', 'top-to-bottom']) {
                    if (canPlaceWord(word, x, y, direction) && checkSurroundingSpaces(x, y, direction, word.length)) {
                        const score = calculatePlacementScore(word, x, y, direction);
                        if (score > bestScore) {
                            bestScore = score;
                            bestPlacement = { x, y, direction };
                        }
                    }
                }
            }
        }

        return bestPlacement;
    };

    const findRandomPlacement = (word) => {
        const directions = ['left-to-right', 'top-to-bottom'];
        let bestPlacement = null;
        let bestScore = -1;

        const coordinates = [];
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                coordinates.push({ x, y });
            }
        }
        coordinates.sort(() => Math.random() - 0.5); // Shuffle coordinates

        for (const { x, y } of coordinates) {
            for (const direction of directions) {
                if (canPlaceWord(word, x, y, direction) && checkSurroundingSpaces(x, y, direction, word.length)) {
                    const score = calculatePlacementScore(word, x, y, direction);
                    if (score > bestScore) {
                        bestScore = score;
                        bestPlacement = { x, y, direction };
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
        } else if (direction === 'top-to-bottom') {
            for (let i = 0; i < word.length; i++) {
                if (grid[y + i][x] === word[i]) {
                    score += 1;
                } else if (grid[y + i][x] !== '') {
                    score -= 1; // Negative score for conflicting letters
                }
            }
        }

        return score;
    };

    const placeWords = (words) => {
        // Place the first word randomly
        const firstWord = words.shift();
        const initialPlacement = findRandomPlacement(firstWord);
        if (initialPlacement) {
            placeWord(firstWord, initialPlacement.x, initialPlacement.y, initialPlacement.direction);
        } else {
            console.error(`${firstWord} could not be placed in the grid.`);
        }

        // Place the remaining words
        words.forEach(word => {
            let placement = findIntersectionPlacement(word);
            if (!placement) {
                placement = findRandomPlacement(word);
            }
            if (placement) {
                placeWord(word, placement.x, placement.y, placement.direction);
            } else {
                console.error(`${word} could not be placed in the grid.`);
            }
        });
    };

    placeWords(words);

    return grid;
};
