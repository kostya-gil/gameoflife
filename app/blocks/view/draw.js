import Cell from '../model/cell';
import Board from '../model/board';
/**
 * Константы, определяющие изначальное количество клеток на поле
 */
const MAX_X = 39;
const MAX_Y = 39;

/**
 * Отступы, чтобы корректно определялись координаты.
 */
const PADDING_LEFT = 25;
const PADDING_TOP = 22;

/**
 * Константа для резмера клетки
 */
const SIZE_CELL= 25;

/**
 * Константы,определяющие цвет живой и мертвой клетки (зеленая, красная)
 */
const ALIVE_CELL_COLOR = 'green';
const DEATH_CELL_COLOR = 'red';
/**
 * Класс отрисовки игрового поля
 * @class Cell
 * @param {Object} board
 * @param {Object} canvas
 */
export default class Draw {
	
	constructor(element) {
		this.board = new Board();
		
		this.cells = null;
		this.idInterval = null;
		
		this.element = document.getElementById(element);
		this.canvas = this.element.getContext('2d');
		
		this.element.addEventListener('click', (event) => {
			this.stopTick();
			
			let x = event.pageX - (this.element.offsetLeft + PADDING_LEFT),
					y = event.pageY - (this.element.offsetTop + PADDING_TOP);
			this.onClickCell(x, y);
			this.render();
		});
	}
	
	clear() {
		this.element.style.backgroundColor = '#d08282';
		clearInterval(this.idInterval);
		this.canvas.clearRect(0, 0, 800, 800);
		this.cells = null;
	}

	initialization(cells) {
		this.clear();
		for(let y = 0; y <= MAX_Y; y++) {
			for(let x = 0; x <= MAX_X; x++) {
				this.board.addCell(new Cell(x, y, 0));
			}
			if(cells) {
				cells.forEach((item) =>{
					this.board.addCell(new Cell(item.x, item.y, item.state));
				});
			}
		}
	}
	
	onClickCell(x, y) {
		this.cells.forEach((item, i, arr) => {
			if (y > item.top && y < item.top + item.size && x > item.left && x < item.left + item.size) {
				let cell = this.board.getCellAt(item.left/SIZE_CELL, item.top/SIZE_CELL);
				if(item.color === ALIVE_CELL_COLOR) {
					arr.splice(i, 1, {
						color: DEATH_CELL_COLOR,
						left: item.left,
						top: item.top,
						size: item.size
					});
					cell.state = 0;
				} else {
					arr.splice(i, 1, {
						color: ALIVE_CELL_COLOR,
						left: item.left,
						top: item.top,
						size: item.size
					});
					cell.state = 1;
				}
			}
		});
	}
	
	render() {
		this.cells = [];
		for(let y = 0; y <= MAX_Y; y++) {
			for(let x = 0; x <= MAX_X; x++) {
				let cell = this.board.getCellAt(x, y);
				this.cells.push({
					color: cell.isAlive() ? ALIVE_CELL_COLOR  : DEATH_CELL_COLOR,
					left: cell.x * SIZE_CELL,
					top: cell.y * SIZE_CELL,
					size: SIZE_CELL
				});
			}
		}
		this.cells.forEach((item) => {
			this.canvas.beginPath();
			this.canvas.rect(item.left, item.top, item.size,item.size);
			this.canvas.fillStyle = item.color;
			this.canvas.fill();
			this.canvas.lineWidth = 3;
			this.canvas.strokeStyle = 'black';
			this.canvas.stroke();
		});
	}
				
	tick() {
		this.clear();
		this.element.style.backgroundColor = '#8ead65';
		this.render();
		this.idInterval = setInterval(() => {
			this.board.nextStep();
			this.render();
		}, 100);
	}
	
	stopTick() {
		this.clear();
		this.render();
	}
}