/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/customblock.ts":
/*!****************************!*\
  !*** ./src/customblock.ts ***!
  \****************************/
/*! exports provided: CustomBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomBlock", function() { return CustomBlock; });
class CustomBlock {
    constructor(positions) {
        this.positions = positions;
    }
    get partialPositions() {
        return this.positions;
    }
    draw(ctx, color, tileSize) {
        for (const position of this.positions) {
            ctx.fillStyle = color;
            ctx.fillRect(position.x * tileSize, position.y * tileSize, tileSize, tileSize);
        }
    }
    move(moveVector) {
        for (const position of this.positions) {
            position.x += moveVector.x;
            position.y += moveVector.y;
        }
    }
}


/***/ }),

/***/ "./src/emitter.ts":
/*!************************!*\
  !*** ./src/emitter.ts ***!
  \************************/
/*! exports provided: Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
class Emitter {
    constructor() {
        this.functions = [];
    }
    subscribe(fn) {
        this.functions.push(fn);
    }
    emit(arg) {
        for (const fn of this.functions) {
            fn(arg);
        }
    }
}


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ "./src/scene.ts");
/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./levels */ "./src/levels.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emitter */ "./src/emitter.ts");
/* harmony import */ var _keyboardcontroller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyboardcontroller */ "./src/keyboardcontroller.ts");





class Game {
    constructor(canvas, levels, levelsInfo = levels.map(() => 0 /* UNDONE */)) {
        this.levels = levels;
        this.levelsInfo = levelsInfo;
        this.levelChangeEmitter = new _emitter__WEBPACK_IMPORTED_MODULE_3__["Emitter"]();
        this.endGameEmitter = new _emitter__WEBPACK_IMPORTED_MODULE_3__["Emitter"]();
        this.levelNum = -1;
        this.scene = new _scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        this.keyboardController = new _keyboardcontroller__WEBPACK_IMPORTED_MODULE_4__["KeyboardController"]();
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas is not supported');
        }
        this.renderer = new _renderer__WEBPACK_IMPORTED_MODULE_2__["Renderer"](ctx, this.scene);
    }
    start() {
        this.keyboardController.moveEmitter.subscribe(moveVector => {
            this.scene.movePlayer(moveVector);
            this.renderer.animate();
        });
        this.scene.levelChangeEmitter.subscribe(() => {
            this.levelsInfo[this.levelNum] = 1 /* DONE */;
            this.loadNextLevel();
        });
        window.addEventListener('resize', () => {
            this.renderer.resizeBoard();
            this.renderer.renderBoard();
        });
        this.loadNextLevel();
    }
    loadNextLevel() {
        let nextLevelIndex = this.levelNum + 1;
        if (nextLevelIndex >= this.levels.length) {
            if (this.levelsInfo.every(state => state == 1 /* DONE */)) {
                this.endGameEmitter.emit();
            }
            return;
        }
        if (this.levelsInfo[nextLevelIndex] == 1 /* DONE */) {
            nextLevelIndex = this.levelsInfo.findIndex(state => state == 0 /* UNDONE */ || state == 2 /* SKIPPED */);
        }
        this.loadLevel(nextLevelIndex);
    }
    loadLevel(id) {
        this.levelNum = id;
        const level = _levels__WEBPACK_IMPORTED_MODULE_1__["levels"][this.levelNum];
        this.scene.setLevelData(level);
        this.renderer.resizeBoard();
        this.renderer.renderBoard();
        this.levelChangeEmitter.emit();
    }
    skipCurrentLevel() {
        this.levelsInfo[this.levelNum] = 2 /* SKIPPED */;
        this.loadNextLevel();
    }
    resetLevel() {
        this.levelsInfo = _levels__WEBPACK_IMPORTED_MODULE_1__["levels"].map(() => 0 /* UNDONE */);
        this.levelNum = 0;
        this.loadLevel(this.levelNum);
    }
    resetGame() {
        localStorage.clear();
        for (let i = 0; i < this.levelsInfo.length; i++) {
            this.levelsInfo[i] = 0;
        }
        this.loadLevel(0);
    }
    canLevelBeLoaded(index) {
        if (index === 0 && this.levelsInfo[index] == 0 /* UNDONE */) {
            return true;
        }
        if (this.levelsInfo[index] == 2 /* SKIPPED */) {
            return true;
        }
        if (this.levelsInfo[index] == 1 /* DONE */) {
            return false;
        }
        if (this.levelsInfo[index - 1] == 1 /* DONE */ ||
            this.levelsInfo[index - 1] == 2 /* SKIPPED */) {
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.ts");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./src/menu.ts");
/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levels */ "./src/levels.ts");



let progress;
if (localStorage.getItem('levelInfo')) {
    progress = JSON.parse(localStorage.getItem('levelInfo'));
}
const game = new _game__WEBPACK_IMPORTED_MODULE_0__["Game"](document.getElementById('blocksBoard'), _levels__WEBPACK_IMPORTED_MODULE_2__["levels"], progress);
const menu = new _menu__WEBPACK_IMPORTED_MODULE_1__["Menu"](game);
game.start();
game.levelChangeEmitter.subscribe(() => {
    localStorage.setItem('levelInfo', JSON.stringify(game.levelsInfo));
});
game.endGameEmitter.subscribe(() => {
    const endScreen = document.getElementById('end-screen');
	const restartButton = document.getElementById('restart-game');
	const welcomeScreen = document.getElementById( 'welcome' );
    endScreen.style.visibility = 'visible';
    restartButton.addEventListener('click', () => {
		game.resetGame();
		welcomeScreen.classList.remove( 'hidden' );
        endScreen.style.visibility = 'hidden';
    });
});
window.game = game;


/***/ }),

/***/ "./src/keyboardcontroller.ts":
/*!***********************************!*\
  !*** ./src/keyboardcontroller.ts ***!
  \***********************************/
/*! exports provided: KeyboardController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardController", function() { return KeyboardController; });
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ "./src/emitter.ts");

const timeInterval = 100;
class KeyboardController {
    constructor() {
        this.moveEmitter = new _emitter__WEBPACK_IMPORTED_MODULE_0__["Emitter"]();
        this.pressedKeys = [];
        this.isIntervalRunning = false;
        this.movementKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        this.handleKeyboard();
    }
    handleKeyboard() {
        document.addEventListener('keydown', event => {
            if (!this.movementKeys.includes(event.key)) {
                return;
            }
            if (this.pressedKeys.includes(event.key)) {
                return;
            }
            this.pressedKeys.push(event.key);
            if (this.isIntervalRunning) {
                return;
            }
            this.emitLastMovementKey();
            this.intervalId = setInterval(() => {
                this.emitLastMovementKey();
            }, timeInterval);
            this.isIntervalRunning = true;
        });
        document.addEventListener('keyup', event => {
            this.pressedKeys = this.pressedKeys.filter(key => key != event.key);
            if (this.pressedKeys.length == 0) {
                clearInterval(this.intervalId);
                this.isIntervalRunning = false;
            }
        });
    }
    emitLastMovementKey() {
        const lastPressedKey = this.pressedKeys[this.pressedKeys.length - 1];
        if (lastPressedKey === 'ArrowUp') {
            this.moveEmitter.emit({ x: 0, y: -1 });
        }
        else if (lastPressedKey === 'ArrowDown') {
            this.moveEmitter.emit({ x: 0, y: 1 });
        }
        else if (lastPressedKey === 'ArrowLeft') {
            this.moveEmitter.emit({ x: -1, y: 0 });
        }
        else if (lastPressedKey === 'ArrowRight') {
            this.moveEmitter.emit({ x: 1, y: 0 });
        }
    }
}


/***/ }),

/***/ "./src/levels.ts":
/*!***********************!*\
  !*** ./src/levels.ts ***!
  \***********************/
/*! exports provided: levels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levels", function() { return levels; });
const levels = [
    {
        board: {
            height: 15,
            width: 15
        },
        exit: { x: 14, y: 14 },
        playerPosition: { x: 8, y: 8 },
        blocks: [
            {
                type: 'custom',
                points: [{ x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 }]
            },
            {
                type: 'custom',
                points: [{ x: 9, y: 8 }, { x: 10, y: 8 }, { x: 10, y: 7 }, { x: 10, y: 6 }, { x: 9, y: 6 }]
            },
            {
                type: 'custom',
                points: [{ x: 7, y: 8 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 6, y: 10 }, { x: 7, y: 10 }]
            },
            {
                type: 'custom',
                points: [{ x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 },
                    { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 }, { x: 9, y: 11 }, { x: 10, y: 11 }, { x: 11, y: 11 }, { x: 12, y: 11 },
                    { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 4, y: 11 }, { x: 5, y: 11 },
                    { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 }, { x: 4, y: 9 }, { x: 4, y: 10 }, { x: 12, y: 5 }]
            },
            {
                type: 'custom',
                points: [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 },
                    { x: 10, y: 4 }, { x: 11, y: 4 }, { x: 12, y: 4 }, { x: 13, y: 4 }, { x: 14, y: 4 }, { x: 14, y: 5 },
                    { x: 14, y: 6 }, { x: 14, y: 7 }, { x: 14, y: 8 }, { x: 14, y: 9 }, { x: 14, y: 10 }, { x: 14, y: 11 }, { x: 14, y: 12 },
                    { x: 14, y: 13 }, { x: 13, y: 13 }, { x: 12, y: 13 }, { x: 11, y: 13 }, { x: 10, y: 13 }, { x: 9, y: 13 }, { x: 8, y: 13 },
                    { x: 7, y: 13 }, { x: 6, y: 13 }, { x: 5, y: 13 }, { x: 4, y: 13 }, { x: 3, y: 13 }, { x: 3, y: 11 }, { x: 3, y: 10 },
                    { x: 3, y: 9 }, { x: 3, y: 8 }, { x: 3, y: 7 }, { x: 3, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 4 }]
            },
            {
                type: 'custom',
                points: [{ x: 2, y: 14 }, { x: 2, y: 13 }, { x: 2, y: 1 }]
            },
            {
                type: 'custom',
                points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }]
            }
        ]
    },
    {
        board: {
            height: 20,
            width: 5
        },
        exit: { x: 0, y: 0 },
        playerPosition: { x: 4, y: 19 },
        blocks: [
            {
                type: 'rectangle',
                position: { x: 1, y: 18 },
                width: 4,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 1, y: 17 }, { x: 2, y: 17 }, { x: 2, y: 14 }, { x: 3, y: 14 }]
            },
            {
                type: 'custom',
                points: [{ x: 0, y: 16 }, { x: 2, y: 16 }, { x: 3, y: 16 },
                    { x: 0, y: 13 }, { x: 1, y: 13 }, { x: 2, y: 13 }, { x: 4, y: 13 }]
            },
            {
                type: 'rectangle',
                position: { x: 0, y: 11 },
                width: 4,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 2, y: 10 }, { x: 3, y: 10 }, { x: 1, y: 12 }]
            },
            {
                type: 'custom',
                points: [{ x: 1, y: 9 }, { x: 2, y: 9 }, { x: 4, y: 9 }]
            },
            {
                type: 'custom',
                points: [{ x: 0, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
                    { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }]
            },
            {
                type: 'custom',
                points: [{ x: 1, y: 8 }, { x: 3, y: 6 }]
            },
            {
                type: 'rectangle',
                position: { x: 1, y: 3 },
                width: 4,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 0, y: 1 },
                width: 4,
                height: 1
            }
        ]
    },
    {
        board: {
            height: 8,
            width: 9
        },
        exit: { x: 0, y: 0 },
        playerPosition: { x: 8, y: 7 },
        blocks: [
            {
                type: 'rectangle',
                position: { x: 2, y: 1 },
                width: 6,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 2, y: 3 },
                width: 6,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 2, y: 5 },
                width: 6,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 },]
            },
            {
                type: 'rectangle',
                position: { x: 1, y: 7 },
                width: 5,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 0, y: 2 }]
            },
            {
                type: 'custom',
                points: [{ x: 4, y: 0 }]
            }
        ]
    },
    {
        board: {
            height: 9,
            width: 9
        },
        exit: { x: 4, y: 4 },
        playerPosition: { x: 6, y: 6 },
        blocks: [
            {
                type: 'custom',
                points: [{ x: 3, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 3 }]
            },
            {
                type: 'rectangle',
                position: { x: 2, y: 3 },
                width: 1,
                height: 3
            },
            {
                type: 'rectangle',
                position: { x: 3, y: 2 },
                width: 3,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 6, y: 3 },
                width: 1,
                height: 3
            },
            {
                type: 'rectangle',
                position: { x: 3, y: 6 },
                width: 3,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 7, y: 7 }, { x: 3, y: 4 }]
            },
            {
                type: 'custom',
                points: [{ x: 1, y: 1 }, { x: 4, y: 3 }]
            },
            {
                type: 'custom',
                points: [{ x: 1, y: 7 }, { x: 5, y: 4 }]
            },
            {
                type: 'custom',
                points: [{ x: 7, y: 1 }, { x: 4, y: 5 }]
            },
            {
                type: 'rectangle',
                position: { x: 4, y: 0 },
                width: 1,
                height: 2
            },
            {
                type: 'rectangle',
                position: { x: 4, y: 7 },
                width: 1,
                height: 2
            },
            {
                type: 'rectangle',
                position: { x: 0, y: 4 },
                width: 2,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 7, y: 4 },
                width: 2,
                height: 1
            }
        ]
    },
    {
        board: {
            height: 8,
            width: 9
        },
        exit: { x: 0, y: 0 },
        playerPosition: { x: 8, y: 7 },
        blocks: [
            {
                type: 'rectangle',
                position: { x: 2, y: 1 },
                width: 6,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 2, y: 3 },
                width: 6,
                height: 1
            },
            {
                type: 'rectangle',
                position: { x: 2, y: 5 },
                width: 6,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 },]
            },
            {
                type: 'rectangle',
                position: { x: 1, y: 7 },
                width: 5,
                height: 1
            },
            {
                type: 'custom',
                points: [{ x: 0, y: 2 }]
            },
            {
                type: 'custom',
                points: [{ x: 4, y: 0 }]
            },
            {
                type: 'custom',
                points: [{ x: 1, y: 1 }, { x: 6, y: 6 }]
            }
        ]
    }
];


/***/ }),

/***/ "./src/menu.ts":
/*!*********************!*\
  !*** ./src/menu.ts ***!
  \*********************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
class Menu {
    constructor(game) {
        const startGameButton = document.getElementById('start');
        const skipLevelButton = document.getElementById('skip-level');
        const resetLevelButton = document.getElementById('reset-level');
        const levelsListButton = document.getElementById('levels-button');
        const resetGameButton = document.getElementById('reset-game');
        const levelListContainer = document.getElementById('level-list-container');
        const levelList = document.getElementById('level-list');
        const welcomeScreen = document.getElementById('welcome');
        startGameButton.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
        });
        resetGameButton.addEventListener('click', () => {
            if (window.confirm()) {
                game.resetGame();
                welcomeScreen.classList.remove('hidden');
            }
        });
        levelsListButton.addEventListener('click', () => {
            if (levelListContainer.classList.contains('hidden')) {
                levelListContainer.classList.remove('hidden');
            }
            else {
                levelListContainer.classList.add('hidden');
            }
        });
        skipLevelButton.addEventListener('click', () => {
            let skippedLevels = 1;
            for (const level of game.levelsInfo) {
                if (level == 2 /* SKIPPED */) {
                    skippedLevels++;
                }
            }
            if (skippedLevels > 2) {
                window.alert('You can skip up to 2 levels.');
                return;
            }
            game.skipCurrentLevel();
        });
        resetLevelButton.addEventListener('click', () => game.loadLevel(game.levelNum));
        for (let i = 0; i < game.levels.length; i++) {
            const button = document.createElement('BUTTON');
            levelList.appendChild(button);
            button.innerText = 'Level ' + (i + 1).toString();
            button.addEventListener('click', () => {
                if (game.canLevelBeLoaded(i)) {
                    game.loadLevel(i);
                }
            });
        }
        game.levelChangeEmitter.subscribe(() => {
            setButtonColors(game, levelList);
        });
        welcomeScreen.classList.remove('hidden');
    }
}
function setButtonColors(game, levelList) {
    game.levelsInfo.forEach((state, index) => {
        const button = levelList.children[index];
        button.className = '';
        switch (state) {
            case 1 /* DONE */:
                button.classList.add('done');
                break;
            case 2 /* SKIPPED */:
                button.classList.add('skipped');
                break;
            case 0 /* UNDONE */:
                button.classList.add('undone');
                break;
        }
        if (game.levelNum == index) {
            button.classList.add('active');
        }
        if (!game.canLevelBeLoaded(index)) {
            button.style.cursor = 'auto';
        }
        else {
            button.style.cursor = 'pointer';
        }
    });
}


/***/ }),

/***/ "./src/rectangleblock.ts":
/*!*******************************!*\
  !*** ./src/rectangleblock.ts ***!
  \*******************************/
/*! exports provided: RectangleBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleBlock", function() { return RectangleBlock; });
class RectangleBlock {
    constructor(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }
    get partialPositions() {
        const blockPartialPositions = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                blockPartialPositions.push({
                    x: this.position.x + j,
                    y: this.position.y + i
                });
            }
        }
        return blockPartialPositions;
    }
    draw(ctx, color, tileSize) {
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x * tileSize, this.position.y * tileSize, this.width * tileSize, this.height * tileSize);
    }
    move(moveVector) {
        this.position.x += moveVector.x;
        this.position.y += moveVector.y;
    }
}


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
class Renderer {
    constructor(ctx, scene) {
        this.animationFrame = 5;
        this._ctx = ctx;
        this._scene = scene;
    }
    animate() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.animationFrame = i + 1;
                this.renderBoard();
            }, i * 20);
        }
    }
    renderBoard() {
        this._clearCanvas();
        this._drawBoard();
        this._drawBlocks();
        this._drawPlayer();
        this._drawExit();
    }
    resizeBoard() {
        if (window.innerHeight / this._scene.board.height < (window.innerWidth - 400) / this._scene.board.width) {
            this._tileSize = window.innerHeight / this._scene.board.height;
        }
        else {
            this._tileSize = (window.innerWidth - 400) / this._scene.board.width;
        }
        this._ctx.canvas.height = this._scene.board.height * this._tileSize;
        this._ctx.canvas.width = this._scene.board.width * this._tileSize;
    }
    _clearCanvas() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }
    _drawBoard() {
        const board = this._scene.board;
        this._ctx.strokeRect(0, 0, board.width * this._tileSize, board.height * this._tileSize);
    }
    _drawBlocks() {
        const colorAdd = 255 / this._scene.blocks.length;
        let colorNum = 0;
        for (const block of this._scene.blocks) {
            const color = `rgb( ${colorNum}, ${colorNum}, ${colorNum} )`;
            if (block == this._scene.moveInfo.block) {
                this._ctx.save();
                this._ctx.translate(this._tileSize * -(5 - this.animationFrame) / 5 * this._scene.moveInfo.moveVector.x, this._tileSize * -(5 - this.animationFrame) / 5 * this._scene.moveInfo.moveVector.y);
                block.draw(this._ctx, color, this._tileSize);
                this._ctx.restore();
            }
            else {
                block.draw(this._ctx, color, this._tileSize);
            }
            colorNum = colorNum + colorAdd;
        }
    }
    _drawPlayer() {
        const player = {
            x: this._scene.playerPosition.x - (5 - this.animationFrame) / 5 * this._scene.moveInfo.moveVector.x,
            y: this._scene.playerPosition.y - (5 - this.animationFrame) / 5 * this._scene.moveInfo.moveVector.y
        };
        this._ctx.fillStyle = '#FFEE00';
        this._ctx.beginPath();
        this._ctx.arc(player.x * this._tileSize + this._tileSize / 2, player.y * this._tileSize + this._tileSize / 2, this._tileSize / 2, 0, 2 * Math.PI);
        this._ctx.fill();
    }
    _drawExit() {
        const exit = this._scene.exit;
        this._ctx.fillStyle = '#F549C8';
        this._ctx.fillRect(exit.x * this._tileSize, exit.y * this._tileSize, this._tileSize, this._tileSize);
    }
}


/***/ }),

/***/ "./src/scene.ts":
/*!**********************!*\
  !*** ./src/scene.ts ***!
  \**********************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ "./src/emitter.ts");
/* harmony import */ var _rectangleblock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rectangleblock */ "./src/rectangleblock.ts");
/* harmony import */ var _customblock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customblock */ "./src/customblock.ts");



class Scene {
    constructor() {
        this.moveInfo = {
            moveVector: {
                x: 0, y: 0,
            }
        };
        this.levelChangeEmitter = new _emitter__WEBPACK_IMPORTED_MODULE_0__["Emitter"]();
    }
    setLevelData(level) {
        level = JSON.parse(JSON.stringify(level));
        this.blocks = this._createBlocksFromJson(level.blocks);
        this.board = level.board;
        this.exit = level.exit;
        this.playerPosition = level.playerPosition;
    }
    _createBlocksFromJson(jsonBlocks) {
        return jsonBlocks.map(jsonBlock => {
            if (jsonBlock.type == 'rectangle') {
                return new _rectangleblock__WEBPACK_IMPORTED_MODULE_1__["RectangleBlock"](jsonBlock.position, jsonBlock.width, jsonBlock.height);
            }
            if (jsonBlock.type == 'custom') {
                return new _customblock__WEBPACK_IMPORTED_MODULE_2__["CustomBlock"](jsonBlock.points);
            }
            throw new Error();
        });
    }
    isExitAt(position) {
        return position.x == this.exit.x && position.y == this.exit.y;
    }
    isEmptyAt(position) {
        for (const block of this.blocks) {
            for (const partialPosition of block.partialPositions) {
                if (position.x == partialPosition.x && position.y == partialPosition.y) {
                    return false;
                }
            }
        }
        return true;
    }
    canBlockBeMoved(block, moveVector) {
        let canBlockBeMoved = true;
        const previousBlocks = this.blocks.slice();
        this.blocks = this.blocks.filter(blockInArr => block !== blockInArr);
        for (const partialPosition of block.partialPositions) {
            const newPosition = {
                x: partialPosition.x + moveVector.x,
                y: partialPosition.y + moveVector.y
            };
            if (!this.isPositionOnBoard(newPosition)) {
                canBlockBeMoved = false;
            }
            if (!this.isEmptyAt(newPosition)) {
                canBlockBeMoved = false;
            }
            if (this.isExitAt(newPosition)) {
                canBlockBeMoved = false;
            }
        }
        this.blocks = previousBlocks;
        return canBlockBeMoved;
    }
    findBlock(position) {
        for (const block of this.blocks) {
            for (const partialPosition of block.partialPositions) {
                if (position.x == partialPosition.x && position.y == partialPosition.y) {
                    return block;
                }
            }
        }
    }
    isPositionOnBoard(position) {
        return (position.x < this.board.width &&
            position.y < this.board.height &&
            position.x >= 0 &&
            position.y >= 0);
    }
    movePlayer(moveVector) {
        const newPosition = {
            x: this.playerPosition.x + moveVector.x,
            y: this.playerPosition.y + moveVector.y
        };
        this.moveInfo = {
            moveVector: {
                x: 0,
                y: 0,
            }
        };
        if (!this.isPositionOnBoard(newPosition)) {
            return;
        }
        if (this.isExitAt(newPosition)) {
            this.playerPosition = newPosition;
            this.levelChangeEmitter.emit();
            this.moveInfo.moveVector = moveVector;
            return;
        }
        if (this.isEmptyAt(newPosition)) {
            this.playerPosition = newPosition;
            this.moveInfo.moveVector = moveVector;
        }
        else {
            const block = this.findBlock(newPosition);
            if (this.canBlockBeMoved(block, moveVector)) {
                this.moveInfo.block = block;
                this.playerPosition = newPosition;
                this.moveInfo.moveVector = moveVector;
                block.move(moveVector);
            }
        }
    }
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map