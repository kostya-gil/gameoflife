/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _draw = __webpack_require__(1);

	var _draw2 = _interopRequireDefault(_draw);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (global) {
		var btnStop = document.getElementById('stop');
		var btnStart = document.getElementById('start');
		var btnInit = document.getElementById('init');

		var draw = new _draw2.default('temp');

		draw.initialization();
		draw.render();

		btnInit.addEventListener('click', function () {
			draw.initialization();
			draw.render();
		});

		btnStart.addEventListener('click', function () {
			draw.tick();
		});
		btnStop.addEventListener('click', function () {
			draw.stopTick();
		});
	})(undefined);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cell = __webpack_require__(2);

	var _cell2 = _interopRequireDefault(_cell);

	var _board = __webpack_require__(3);

	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Константы, определяющие изначальное количество клеток на поле
	 */
	var MAX_X = 20;
	var MAX_Y = 20;

	/**
	 * Константа для резмера клетки
	 */
	var SIZE_CELL = 25;

	/**
	 * Константы,определяющие цвет живой и мертвой клетки (зеленая, красная)
	 */
	var ALIVE_CELL_COLOR = 'green';
	var DEATH_CELL_COLOR = 'red';
	/**
	 * Класс отрисовки игрового поля
	 * @class Cell
	 * @param {Object} board
	 * @param {Object} canvas
	 */

	var Draw = function () {
		function Draw(element) {
			var _this = this;

			_classCallCheck(this, Draw);

			this.board = new _board2.default();

			this.cells = null;
			this.idInterval = null;

			this.element = document.getElementById(element);
			this.canvas = this.element.getContext('2d');

			this.element.addEventListener('click', function (event) {
				_this.stopTick();

				var x = event.pageX - _this.element.offsetLeft,
				    y = event.pageY - _this.element.offsetTop;
				_this.onClickCell(x, y);
				_this.render();
			});
		}

		_createClass(Draw, [{
			key: 'clear',
			value: function clear() {
				clearInterval(this.idInterval);
				this.canvas.clearRect(0, 0, 800, 800);
				this.cells = null;
			}
		}, {
			key: 'initialization',
			value: function initialization() {
				this.clear();
				for (var y = 0; y <= MAX_Y; y++) {
					for (var x = 0; x <= MAX_X; x++) {
						this.board.addCell(new _cell2.default(x, y, Math.floor(Math.random() * (1 - 0 + 1)) + 0));
					}
				}
			}
		}, {
			key: 'onClickCell',
			value: function onClickCell(x, y) {
				var _this2 = this;

				this.cells.forEach(function (item, i, arr) {
					if (y > item.top && y < item.top + item.size && x > item.left && x < item.left + item.size) {
						var cell = _this2.board.getCellAt(item.left / SIZE_CELL, item.top / SIZE_CELL);
						if (item.color === ALIVE_CELL_COLOR) {
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
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				this.cells = [];
				for (var y = 0; y <= MAX_Y; y++) {
					for (var x = 0; x <= MAX_X; x++) {
						var cell = this.board.getCellAt(x, y);
						this.cells.push({
							color: cell.isAlive() ? ALIVE_CELL_COLOR : DEATH_CELL_COLOR,
							left: cell.x * SIZE_CELL,
							top: cell.y * SIZE_CELL,
							size: SIZE_CELL
						});
					}
				}
				this.cells.forEach(function (item) {
					_this3.canvas.beginPath();
					_this3.canvas.rect(item.left, item.top, item.size, item.size);
					_this3.canvas.fillStyle = item.color;
					_this3.canvas.fill();
					_this3.canvas.lineWidth = 3;
					_this3.canvas.strokeStyle = 'black';
					_this3.canvas.stroke();
				});
			}
		}, {
			key: 'tick',
			value: function tick() {
				var _this4 = this;

				this.clear();
				this.render();
				this.idInterval = setInterval(function () {
					_this4.board.nextStep();
					_this4.render();
				}, 100);
			}
		}, {
			key: 'stopTick',
			value: function stopTick() {
				this.clear();
				this.render();
			}
		}]);

		return Draw;
	}();

	exports.default = Draw;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Класс клетки
	 * @class Cell
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} state (1 - живая, 0 - мертвая)
	 */
	var Cell = function () {
		function Cell(x, y, state) {
			_classCallCheck(this, Cell);

			this.x = x;
			this.y = y;
			this.state = state;
		}

		_createClass(Cell, [{
			key: "isAlive",
			value: function isAlive() {
				return !!this.state;
			}
		}]);

		return Cell;
	}();

	exports.default = Cell;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cell = __webpack_require__(2);

	var _cell2 = _interopRequireDefault(_cell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Board = function () {
		function Board() {
			_classCallCheck(this, Board);

			this.cells = {};
		}

		_createClass(Board, [{
			key: 'addCell',
			value: function addCell(cell) {
				this.cells[getCellRepresentation(cell.x, cell.y)] = cell;
			}
		}, {
			key: 'getCellAt',
			value: function getCellAt(x, y) {
				return this.cells[getCellRepresentation(x, y)];
			}
		}, {
			key: 'getAliveNeighbors',
			value: function getAliveNeighbors(cell) {
				var x = cell.x;
				var y = cell.y;
				var aliveCells = 0;

				for (var i = -1; i < 2; i++) {
					for (var j = -1; j < 2; j++) {
						if (i === 0 && i === j) {
							continue;
						}
						var currentCell = this.getCellAt(x + i, y + j);
						if (currentCell && currentCell.isAlive()) {
							aliveCells++;
						}
					}
				}
				return aliveCells;
			}
		}, {
			key: 'calculateNextState',
			value: function calculateNextState(cell) {
				var tempCell = new _cell2.default(cell.x, cell.y, cell.state);
				var livingNeighbors = this.getAliveNeighbors(cell);

				if (cell.state) {
					if (livingNeighbors === 2 || livingNeighbors === 3) {
						tempCell.state = 1;
					} else {
						tempCell.state = 0;
					}
				} else {
					if (livingNeighbors === 3) {
						tempCell.state = 1;
					}
				}
				return tempCell;
			}
		}, {
			key: 'nextStep',
			value: function nextStep() {
				var cells = this.cells;
				var tempBoard = {};

				for (var c in this.cells) {
					var cell = this.cells[c];
					var newCell = this.calculateNextState(cell);
					tempBoard[c] = newCell;
				}

				this.cells = tempBoard;
			}
		}]);

		return Board;
	}();

	exports.default = Board;
	module.exports = exports['default'];

/***/ }
/******/ ]);