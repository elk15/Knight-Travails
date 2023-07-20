/**
 * Defines a knight incuding its position
 * in the chess board and an array containing
 * the next possible moves it can do.
 */
class Knight {
    constructor(x = 0, y = 0, distance = 0, previous = null) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.previous = previous;
        this.next = []
    }

    appendMove(move) {
        this.next.push(move);
    }
}

class Gameboard {
    constructor(startX, startY, endX, endY) {
        this.startKnight = new Knight(startX, startY, 0);
        this.endX = endX;
        this.endY = endY;
    }


    getNextMoves(knight = this.startKnight) {
        let nextKnight = null;
        // Move two steps up
        if (knight.y >= 2) {
            // Move one step left
            if(knight.x > 0) {
                nextKnight = new Knight(knight.x - 1, knight.y - 2, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }

            // Move one step right
            if(knight.x < 7) {
                nextKnight = new Knight(knight.x + 1, knight.y - 2,  knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }
        }

        // Move two steps down
        if (knight.y <= 5) {
            // Move one step left
            if(knight.x > 0) {
                nextKnight = new Knight(knight.x - 1, knight.y + 2, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }

            // Move one step right
            if(knight.x < 7) {
                nextKnight = new Knight(knight.x + 1, knight.y + 2, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }
        }

        // Move two steps left
        if (knight.x >= 2) {
            // Move one step up
            if(knight.y > 0) {
                nextKnight = new Knight(knight.x - 2, knight.y - 1, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }

            // Move one step down
            if(knight.y < 7) {
                nextKnight = new Knight(knight.x - 2, knight.y + 1, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }
        }

        // Move two steps right
        if (knight.x <= 5) {
            // Move one step up
            if(knight.y > 0) {
                nextKnight = new Knight(knight.x + 2, knight.y - 1, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }

            // Move one step down
            if(knight.y < 7) {
                nextKnight = new Knight(knight.x + 2, knight.y + 1, knight.distance + 1, knight);
                knight.appendMove(nextKnight);
            }
        }
    }
    
    findShortestPath(queue = [this.startKnight]) {
        if (Array.isArray(queue) && queue.length) {
            let currentKnight = queue.shift();
            if (currentKnight.x === this.endX && currentKnight.y === this.endY) return currentKnight;
            this.getNextMoves(currentKnight);
            for (let i = 0; i < currentKnight.next.length; i++) {
                queue.push(currentKnight.next[i]);
            }
            return this.findShortestPath(queue);
        }
    }
}

function printPath(knight) {
    if (knight === null) return;
    printPath(knight.previous);
    console.log('[', knight.x + ',' + knight.y + ']');
}

function knightMoves(firstMove, finalMove) {
    const board = new Gameboard(firstMove[0], firstMove[1], finalMove[0], finalMove[1]);
    const endPath = board.findShortestPath();
    console.log(endPath)
    console.log('=> You made it in ' + endPath.distance + ' moves! Here\'s your path:');
    printPath(endPath);
}

knightMoves([3, 3], [4, 3]);