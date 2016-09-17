import Draw from '../view/draw';
import {glider, gliderGun} from '../data/templates-cells';
/**
 * Обьект, содержащий фигуры
 */
let colonies = {
	glider: glider,
	glidergun : gliderGun
};

/**
 * Кнопки интерактива
 */
let btnStop = document.getElementById('stop');
let btnStart = document.getElementById('start');
let btnInit = document.getElementById('init');
let containerColonies = document.getElementById('colonies');

/**
 * Класс интерактива
 * @class Board
 */
export default class Handler {
	constructor() {
		this.draw = new Draw('temp');
		this.draw.initialization();
		this.draw.render();
	}
	
	start() {
		btnInit.addEventListener('click', (e) => {
			e.preventDefault();
			this.draw.initialization();
			this.draw.render();
		});
		btnStart.addEventListener('click', (e) => {
			e.preventDefault();
			this.draw.tick();
		});
		btnStop.addEventListener('click', (e) => {
			e.preventDefault();
			this.draw.stopTick();
		});
		containerColonies.addEventListener('click', (e) => {
			e.preventDefault();
			let target = e.target;
			
			if(target.tagName != 'A') return;
			let name = target.getAttribute('data-name');
			
			if (name) {
				this.draw.initialization(colonies[name]);
			}
			this.draw.render();
		});
	}
}