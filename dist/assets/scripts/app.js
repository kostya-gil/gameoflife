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

	var _handler = __webpack_require__(4);

	var _handler2 = _interopRequireDefault(_handler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
		var handler = new _handler2.default();
		handler.start();
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cell = __webpack_require__(3);

	var _cell2 = _interopRequireDefault(_cell);

	var _board = __webpack_require__(2);

	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Константы, определяющие изначальное количество клеток на поле
	 */
	var MAX_X = 39;
	var MAX_Y = 39;

	/**
	 * Отступы, чтобы корректно определялись координаты.
	 */
	var PADDING_LEFT = 25;
	var PADDING_TOP = 22;

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

				var x = event.pageX - (_this.element.offsetLeft + PADDING_LEFT),
				    y = event.pageY - (_this.element.offsetTop + PADDING_TOP);
				_this.onClickCell(x, y);
				_this.render();
			});
		}

		_createClass(Draw, [{
			key: 'clear',
			value: function clear() {
				this.element.style.backgroundColor = '#d08282';
				clearInterval(this.idInterval);
				this.canvas.clearRect(0, 0, 800, 800);
				this.cells = null;
			}
		}, {
			key: 'initialization',
			value: function initialization(cells) {
				var _this2 = this;

				this.clear();
				for (var y = 0; y <= MAX_Y; y++) {
					for (var x = 0; x <= MAX_X; x++) {
						this.board.addCell(new _cell2.default(x, y, 0));
					}
					if (cells) {
						cells.forEach(function (item) {
							_this2.board.addCell(new _cell2.default(item.x, item.y, item.state));
						});
					}
				}
			}
		}, {
			key: 'onClickCell',
			value: function onClickCell(x, y) {
				var _this3 = this;

				this.cells.forEach(function (item, i, arr) {
					if (y > item.top && y < item.top + item.size && x > item.left && x < item.left + item.size) {
						var cell = _this3.board.getCellAt(item.left / SIZE_CELL, item.top / SIZE_CELL);
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
				var _this4 = this;

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
					_this4.canvas.beginPath();
					_this4.canvas.rect(item.left, item.top, item.size, item.size);
					_this4.canvas.fillStyle = item.color;
					_this4.canvas.fill();
					_this4.canvas.lineWidth = 3;
					_this4.canvas.strokeStyle = 'black';
					_this4.canvas.stroke();
				});
			}
		}, {
			key: 'tick',
			value: function tick() {
				var _this5 = this;

				this.clear();
				this.element.style.backgroundColor = '#8ead65';
				this.render();
				this.idInterval = setInterval(function () {
					_this5.board.nextStep();
					_this5.render();
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cell = __webpack_require__(3);

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

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _draw = __webpack_require__(1);

	var _draw2 = _interopRequireDefault(_draw);

	var _templatesCells = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Обьект, содержащий фигуры
	 */
	var colonies = {
		glider: _templatesCells.glider,
		glidergun: _templatesCells.gliderGun
	};

	/**
	 * Кнопки интерактива
	 */
	var btnStop = document.getElementById('stop');
	var btnStart = document.getElementById('start');
	var btnInit = document.getElementById('init');
	var containerColonies = document.getElementById('colonies');

	/**
	 * Класс интерактива
	 * @class Board
	 */

	var Handler = function () {
		function Handler() {
			_classCallCheck(this, Handler);

			this.draw = new _draw2.default('temp');
			this.draw.initialization();
			this.draw.render();
		}

		_createClass(Handler, [{
			key: 'start',
			value: function start() {
				var _this = this;

				btnInit.addEventListener('click', function (e) {
					e.preventDefault();
					_this.draw.initialization();
					_this.draw.render();
				});
				btnStart.addEventListener('click', function (e) {
					e.preventDefault();
					_this.draw.tick();
				});
				btnStop.addEventListener('click', function (e) {
					e.preventDefault();
					_this.draw.stopTick();
				});
				containerColonies.addEventListener('click', function (e) {
					e.preventDefault();
					var target = e.target;

					if (target.tagName != 'A') return;
					var name = target.getAttribute('data-name');

					if (name) {
						_this.draw.initialization(colonies[name]);
					}
					_this.draw.render();
				});
			}
		}]);

		return Handler;
	}();

	exports.default = Handler;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Константы, задающие фигуры
	 */
	var gliderGun = exports.gliderGun = [{
		x: 1,
		y: 8,
		state: 1
	}, {
		x: 1,
		y: 9,
		state: 1
	}, {
		x: 2,
		y: 8,
		state: 1
	}, {
		x: 2,
		y: 9,
		state: 1
	}, {
		x: 35,
		y: 7,
		state: 1
	}, {
		x: 35,
		y: 8,
		state: 1
	}, {
		x: 36,
		y: 7,
		state: 1
	}, {
		x: 36,
		y: 8,
		state: 1
	}, {
		x: 11,
		y: 8,
		state: 1
	}, {
		x: 11,
		y: 9,
		state: 1
	}, {
		x: 11,
		y: 10,
		state: 1
	}, {
		x: 12,
		y: 7,
		state: 1
	}, {
		x: 12,
		y: 11,
		state: 1
	}, {
		x: 13,
		y: 6,
		state: 1
	}, {
		x: 13,
		y: 12,
		state: 1
	}, {
		x: 14,
		y: 6,
		state: 1
	}, {
		x: 14,
		y: 12,
		state: 1
	}, {
		x: 15,
		y: 9,
		state: 1
	}, {
		x: 16,
		y: 7,
		state: 1
	}, {
		x: 16,
		y: 11,
		state: 1
	}, {
		x: 17,
		y: 8,
		state: 1
	}, {
		x: 17,
		y: 9,
		state: 1
	}, {
		x: 17,
		y: 10,
		state: 1
	}, {
		x: 18,
		y: 9,
		state: 1
	}, {
		x: 21,
		y: 6,
		state: 1
	}, {
		x: 21,
		y: 7,
		state: 1
	}, {
		x: 21,
		y: 8,
		state: 1
	}, {
		x: 22,
		y: 6,
		state: 1
	}, {
		x: 22,
		y: 7,
		state: 1
	}, {
		x: 22,
		y: 8,
		state: 1
	}, {
		x: 23,
		y: 5,
		state: 1
	}, {
		x: 23,
		y: 9,
		state: 1
	}, {
		x: 25,
		y: 4,
		state: 1
	}, {
		x: 25,
		y: 5,
		state: 1
	}, {
		x: 25,
		y: 9,
		state: 1
	}, {
		x: 25,
		y: 10,
		state: 1
	}];

	var glider = exports.glider = [{
		x: 3,
		y: 2,
		state: 1
	}, {
		x: 4,
		y: 3,
		state: 1
	}, {
		x: 4,
		y: 4,
		state: 1
	}, {
		x: 3,
		y: 4,
		state: 1
	}, {
		x: 2,
		y: 4,
		state: 1
	}];

/***/ }
/******/ ]);