/**
 * Класс клетки
 * @class Cell
 * @param {Number} x
 * @param {Number} y
 * @param {Number} state (1 - живая, 0 - мертвая)
 */
export default class Cell {
	constructor(x, y, state) {
		this.x = x;
		this.y = y;
		this.state = state;
	}
	
	isAlive() {
		return !!this.state;
	}
}