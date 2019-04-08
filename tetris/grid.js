class Grid {
    // Constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.g = this._generateGrid(height, width);
    }

    // Getters

    // Setters

    // Methods
    addTetromino(tetromino) {
        let index = Math.floor(this.width/2) - 1;
        for (let i=0; i<tetromino.size; i++) {
            for (let j=0; j<tetromino.size; j++) {
                this.g[i][index+j] = tetromino.array[i][j];
            }
        }
    }

    timeStep(tetrominoPos, nextTetromino) {
        // Loop through entire array starting from bottom of grid
        // rowsDeleted = -1 indicates game over
        let rowsDeleted = 0;
        if (this._checkTopRow()) {
            rowsDeleted = -1;
        } else {
            let count = 0;
            for (let i=this.height-1; i>0; i--) {
                rowsDeleted += this._deleteRow(i)
                for (let j=this.width-1; j>=0; j--) { 
                    if (this.g[i][j] == tetrominoPos) {
                        let gridSquare1 = this.g[i][j];
                        let gridSquare2 = this.g[i-1][j];
                        this.g[i][j] = this.g[i-1][j];
                        this.g[i-1][j] = 0;
                        if (gridSquare1 == this.g[i][j] && gridSquare2 == this.g[i-1][j]) {
                            count += 1;
                            console.log(count);
                            if (count == ((this.height-1) * this.width)) {
                                this.addTetromino(nextTetromino);
                            }
                        }
                    } 
                }
            }
        }            
        return {grid: this.g, lines: rowsDeleted, tetrominoPosition: tetrominoPos}
    }

    moveDown(tetrominoPos) {

    }

    moveLeft(tetrominoPos) {

    }

    moveRight(tetrominoPos) {

    }
    
    _checkTopRow() {
        // Check the top row to see if game is over
        if (this.g[this.height-2].every(j => {return j=0})) {
            return true 
        } else {
            return false
        }
    }

    _deleteRow(i) {
        // Delete row if all the blocks are filled
        if (this.g[i].every(j => {return j>0})) {
            this.g[i] = Array(this.width).fill(0)
            return true
        }
        return false 
    }

    _generateGrid(height, width) {
        let grid = [];
        for (let i = 0; i < height; i++) {
            grid[i] = [];
            for(let j = 0; j < width; j++) {
                grid[i][j] = 0;
            }
        }
        return grid
    }
}