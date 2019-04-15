class Tetris {
    constructor(canvasID, timeStep, tetrominoPrefix="tetromino-", gridPrefix="grid-", gridHeight=20, gridWidth=10) {
        this.tetrominoPrefix = tetrominoPrefix;
        this.gridPrefix = gridPrefix;
        this.canvas = document.getElementById(canvasID);
        this.timeStep = timeStep;
        this.lines = 0;
        this.score = 0;
        this.level = 1;
        this.tetrominoStartPosition = [1, (Math.floor((gridWidth+2)/2) - 1)];
        this.grid = new Grid(gridHeight, gridWidth, this._nextTetromino(tetrominoesEnum));
        this.idgrid = this.drawIDGrid();
    }

    // Getters


    // Setters


    // Methods
    drawIDGrid() {
        let idgrid = [];
        for (let i = 0; i < this.grid.height; i++) {
            idgrid[i] = [];
            for (let j = 0; j < this.grid.width; j++) {
                idgrid[i][j] = this.gridPrefix + i + j;
            }
        }
        return idgrid
    }

    drawGrid() {
        for (let i=0; i<this.grid.height; i++) {
            for (let j=0; j<this.grid.width; j++) {
                document.getElementById(this.idgrid[i][j]).className = this.tetrominoPrefix + this.grid.g[i][j];
            }
        }
    }

    play() {        
        let tetromino = this._nextTetromino(tetrominoesEnum);              
        let nextTetromino = this._nextTetromino(tetrominoesEnum); 
        let startPosition = this.grid.startPosition;      
        this.game = this.grid.timeStep(tetromino, startPosition, nextTetromino);
    }

    update() {
        let nextTetromino = this._nextTetromino(tetrominoesEnum); 
        this.game = this.grid.timeStep(nextTetromino);
        this.score += this.game.lines
    }

    _nextTetromino(tetrominoes) {
        let keys = Object.keys(tetrominoes)
        let tetromino = new Tetromino(keys[keys.length * Math.random() << 0], this.tetrominoStartPosition);
        return tetromino
    }
}

var tetris = new Tetris("game", 500);

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        
        // Left
        case 37: 
            tetris.grid.moveLeft();
            tetris.drawGrid();
        break;

        // Up
        case 38: 
            tetris.grid.rotateRight();
            tetris.drawGrid();
        break;

        // Right
        case 39: 
            tetris.grid.moveRight();
            tetris.drawGrid();
        break;

        // Down
        case 40: 
            tetris.grid.moveDown();
            tetris.drawGrid();
        break;

        // Space
        case 32:
            tetris.grid.drop();
            tetris.drawGrid();
        break;   
    }
}, false);

function main(){
    tetris.play();
    tetris.drawGrid();
    setInterval(function(){
        tetris.update();
        tetris.drawGrid();
        //console.log(tetris);
        //console.log(tetris.grid.gActive);
        //console.log(tetris.grid.gActive);
    }, tetris.timeStep);
}

main();

