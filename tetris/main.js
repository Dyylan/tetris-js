class Tetris {
    constructor(canvasID, tetrominoPrefix="tetromino-", gridPrefix="grid-", gridHeight=20, gridWidth=10) {
        this.tetrominoPrefix = tetrominoPrefix;
        this.gridPrefix = gridPrefix;
        this.canvas = document.getElementById(canvasID);
        this.lines = 0;
        this.score = 0;
        this.level = 1;
        this.grid = new Grid(gridHeight, gridWidth);
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
        this.drawGrid();
        this.update();
    }

    update() {
        let nextTetromino = this._nextTetromino(tetrominoesEnum);       
        this.grid.timeStep(nextTetromino);
        this.drawGrid();
        console.log(this.grid.g)
    }

    _nextTetromino(tetrominoes) {
        let keys = Object.keys(tetrominoes)
        let tetromino = new Tetromino(keys[keys.length * Math.random() << 0]);
        return tetromino
    }
}

// Draw the grid in the canvas
;(function() {
    function main(){
        var tetris = new Tetris("game");
        tetris.play();

		setInterval(function(){
			tetris.update();
        }, 400);

    }
    main();
})();

