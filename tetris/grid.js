const gridEnum = {
    bufferSize   : 2,
    bufferConst  : 9,
}

class Grid {
    // Constructor
    constructor(height, width, tetromino) {
        this.height = height;
        this.width = width;
        this.gInactive = this.generateGrid(height, width);
        this.gActive = this.generateGrid(height, width);
        this.activeTetromino = tetromino;
    }

    // Getters
    get g() {
        let grid = [];
        let bs = gridEnum.bufferSize;
        for (let i=0; i<this.height; i++) {
            grid[i] = [];
            for (let j=0; j<this.width; j++) {
                grid[i][j] = this.gActive[i+bs][j+bs] + this.gInactive[i+bs][j+bs];
            }     
        }  
        return grid
    }

    // Setters

    // Methods
    timeStep(nextTetromino) {
        let rowsDeleted = 0;
        let bs = gridEnum.bufferSize;
        if (this._checkTopRow()) {
            rowsDeleted = -1;
        } else {
            let moveBool = this.moveDown();
            if (!moveBool) {
                this.updateInactiveGrid();
                this.activeTetromino = nextTetromino;
            }
            for (let i=this.height-1; i>=0; i--) {
                rowsDeleted += this._deleteRow(i+bs);
            }
            if (rowsDeleted) ;
        }
        return {lines: rowsDeleted, activeTetromino: this.activeTetromino}
    }

    generateGrid(height, width) {
        let grid = [];
        let bs = gridEnum.bufferSize;
        let heightEdges = [];
        let widthEdges = [];
        for (let buff=0; buff<bs; buff++) {
            heightEdges.push(height+bs+buff);
            widthEdges.push(buff);
            widthEdges.push(width+bs+buff);
        }
        for (let i = 0; i < height+4; i++) {
                grid[i] = []; 
            for(let j = 0; j < width+4; j++) {
                grid[i][j] = 0;
                if (heightEdges.includes(i) || widthEdges.includes(j)) {
                    grid[i][j] = 9
                } 
            }
        }
        return grid
    }

    updateActiveGrid() {
        let tetromino = this.activeTetromino;
        let position = this.activeTetromino.position;
        let nextPosition = this.activeTetromino.nextPosition;
        for (let i=0; i<tetromino.size; i++) {                
            for (let j=0; j<tetromino.size; j++) {
                if ((this.gInactive[nextPosition[0]+i][nextPosition[1]+j] != 0) && (tetromino.array[i][j] != 0)) {
                    for (let i=0; i<tetromino.size; i++) {                
                        for (let j=0; j<tetromino.size; j++) {
                            this.gActive[position[0]+i][position[1]+j] = tetromino.array[i][j];
                        }
                    }
                    return 0
                } 
            }
            for (let j=0; j<tetromino.size; j++) {
                this.gActive[nextPosition[0]+i][nextPosition[1]+j] = tetromino.array[i][j];
            }  
        }
        this.activeTetromino.setPosition();
        return 1
    }
  
    updateInactiveGrid() {
        let tetromino = this.activeTetromino;
        let position = this.activeTetromino.position;
        for (let i=0; i<tetromino.size; i++) {
            for (let j=0; j<tetromino.size; j++) {
                if (this.gInactive[position[0]+i][position[1]+j] < 10) {
                    this.gInactive[position[0]+i][position[1]+j] += this.gActive[position[0]+i][position[1]+j];
                }
            }
        }
        this.gActive = this.generateGrid(this.height, this.width);
    }

    drop() {
        let position = this.activeTetromino.position[0];
        for (let i=0; i<(20-position); i++) {
            this.moveDown();
        }
    }

    moveDown() {     
        return this.move([1,0])
    }

    moveLeft() {
        return this.move([0,-1])
    }

    moveRight() {
        return this.move([0,1])
    }

    move(move) {
        this.gActive = this.generateGrid(this.height, this.width);
        this.activeTetromino.addToPosition(move);
        return this.updateActiveGrid(); 
    }

    rotateRight() {
        this.activeTetromino.rotateRight();
        this._checkRotation()
    }

    rotateLeft() {
        this.activeTetromino.rotateLeft();
        this._checkRotation()
    }

    _checkRotation() {
        let tetromino = this.activeTetromino;
        let position = this.activeTetromino.position;
        for (let i=0; i<tetromino.size; i++) {                
            for (let j=0; j<tetromino.size; j++) {
                if ((this.gInactive[position[0]+i][position[1]+j] != 0) && (tetromino.rotatedArray[i][j] != 0)) {
                    return 0
                } 
            }  
        }
        this.activeTetromino.setRotation();
        return this.updateActiveGrid();
    }

    _checkTopRow() {
        // Check the top row to see if game is over
        if (this.gInactive[this.height-2].every(j => {return j>0})) {
            return true 
        } else {
            return false
        }
    }

    _deleteRow(i) {
        // Delete row if all the blocks are filled
        for (let j=0; j<this.width; j++) {
            if (this.gInactive[i][j+2] == 0) {
                return 0
            }
        }
        for (let inew=i; inew>1; inew--){
            this.gInactive[inew] = this.gInactive[inew-1];
        }
        return 1 
    }
}