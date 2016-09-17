import Cell from './cell';
/**
 * Вспомогательная функция для уникального идентификатора клетки
 * @param {Number} x
 * @param {Number} y
 */
function getCellRepresentation(x, y) {
 return 'x' + x + 'y' + y;
}

/**
 * Класс игрового поля
 * @class Board
 */
export default class Board {
	constructor() {
		this.cells = {};
	}
	
	addCell(cell) {
		this.cells[getCellRepresentation(cell.x, cell.y)] = cell;
	}
	
	getCellAt(x, y) {
		return this.cells[getCellRepresentation(x, y)];
	}
	
	getAliveNeighbors(cell) {
		let x = cell.x;
		let y = cell.y;
		let aliveCells = 0;
 
		for (let i = -1; i < 2; i++) {
			for(let j = -1; j < 2; j++) {
				if(i === 0 && i === j) {
					continue;
				}
				let currentCell = this.getCellAt(x + i, y + j);
				if(currentCell && currentCell.isAlive()) {
					aliveCells++;
				}
			}
		}
		return aliveCells;
	}
	
	calculateNextState(cell) {
		let tempCell = new Cell(cell.x, cell.y, cell.state);
		let livingNeighbors = this.getAliveNeighbors(cell);
 
		if(cell.state) {
			if(livingNeighbors === 2 || livingNeighbors === 3) {
				tempCell.state = 1;
			} else {
				tempCell.state = 0;
			}
		} else {
			if(livingNeighbors === 3) {
				tempCell.state = 1;
			}
		}
		return tempCell;
	}
	
	nextStep() {
		let cells = this.cells;
		let tempBoard = {};
  
		for(let c in this.cells) {
			let cell = this.cells[c];
			let newCell = this.calculateNextState(cell);
			tempBoard[c] = newCell;
		}
  
		this.cells = tempBoard;
	}
}