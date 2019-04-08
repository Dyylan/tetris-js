/* 
    TetrominoesEnum contains all the blocks and rotation information.
    It also contains the colours of the blocks.
*/
const tetrominoesEnum = {
    I : {
        BLOCKS: [
           [[0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]],
           [[0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]],
           [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]],
           [[0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]]
        ],
        SIZE  : 4
    },
    O : {
        BLOCKS: [
            [[0, 2, 2, 0],
             [0, 2, 2, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]],
            [[0, 2, 2, 0],
             [0, 2, 2, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]],
            [[0, 2, 2, 0],
             [0, 2, 2, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]],
            [[0, 2, 2, 0],
             [0, 2, 2, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]]
        ],
        SIZE  : 4
    },              
    T : {
        BLOCKS: [
            [[0, 3, 0],
             [3, 3, 3],
             [0, 0, 0]],
            [[0, 3, 0],
             [0, 3, 3],
             [0, 3, 0]],
            [[0, 0, 0],
             [3, 3, 3],
             [0, 3, 0]],
            [[0, 3, 0],
             [3, 3, 0],
             [0, 3, 0]]
        ],
        SIZE  : 3
    },      
    J : {
        BLOCKS: [
            [[4, 0, 0],
             [4, 4, 4],
             [0, 0, 0]],
            [[0, 4, 4],
             [0, 4, 0],
             [0, 4, 0]],
            [[0, 0, 0],
             [4, 4, 4],
             [0, 0, 4]],
            [[0, 4, 0],
             [0, 4, 0],
             [4, 4, 0]]
        ],
        SIZE  : 3
    },
    L : {
        BLOCKS: [
            [[0, 0, 5],
             [5, 5, 5],
             [0, 0, 0]],
            [[0, 5, 0],
             [0, 5, 0],
             [0, 5, 5]],
            [[0, 0, 0],
             [5, 5, 5],
             [5, 0, 0]],
            [[5, 5, 0],
             [0, 5, 0],
             [0, 5, 0]]
        ],
        SIZE  : 3
    },      
    S : {
        BLOCKS: [
            [[0, 6, 6],
             [6, 6, 0],
             [0, 0, 0]],
            [[0, 6, 0],
             [0, 6, 6],
             [0, 0, 6]],
            [[0, 0, 0],
             [0, 6, 6],
             [6, 6, 0]],
            [[6, 0, 0],
             [6, 6, 0],
             [0, 6, 0]]
        ],
        SIZE  : 3
    },      
    Z : {
        BLOCKS: [
            [[7, 7, 0],
             [0, 7, 7],
             [0, 0, 0]],
            [[0, 0, 7],
             [0, 7, 7],
             [0, 7, 0]],
            [[0, 0, 0],
             [7, 7, 0],
             [0, 7, 7]],
            [[0, 7, 0],
             [7, 7, 0],
             [7, 0, 0]]
        ],
        SIZE  : 3
    },
} 


/*
    Tetromino class holds the information for a given tetromino type.
*/
class Tetromino {
    // Constructor 
    constructor(tetrominoType) {
        this.tetrominoType = tetrominoType;
        this.tetromino = tetrominoesEnum[tetrominoType];
        this.size = this.tetromino.SIZE;
        this.position = 0;        
        this.array = this.toArray();
    }
    
    // Getters 

    // Setters

    // Methods
    rotateRight() {
        this.position = (this.position + 1) % 4;
    }

    rotateLeft() {
        this.position = (this.position + 3) % 4;
    }

    toArray() {
        return this.tetromino.BLOCKS[this.position]
    }
}