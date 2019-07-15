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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/customblock.js":
/*!****************************!*\
  !*** ./src/customblock.js ***!
  \****************************/
/*! exports provided: CustomBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CustomBlock\", function() { return CustomBlock; });\n\nclass CustomBlock {\n\tconstructor( positions ) {\n\t\tthis.positions = positions;\n\t}\n\n\tdraw( ctx, color, tileSize ) {\n\t\tfor ( const position of this.positions ) {\n\t\t\tctx.fillStyle = color;\n\t\t\tctx.fillRect( position.x * tileSize, position.y * tileSize, tileSize, tileSize );\n\t\t}\n\t}\n\n\tget partialPosition() {\n\t\treturn this.positions;\n\t}\n\n\tupdatePosition( moveVector ) {\n\t\tfor ( const position of this.positions ) {\n\t\t\tposition.x += moveVector.x;\n\t\t\tposition.y += moveVector.y;\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/customblock.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ \"./src/scene.js\");\n/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./levels */ \"./src/levels.js\");\n\n\n\n\nclass Game {\n\tstart() {\n\t\tthis.levelNum = 0;\n\t\tconst levelData = _levels__WEBPACK_IMPORTED_MODULE_1__[\"levels\"][ this.levelNum ];\n\t\tthis.scene = new _scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]( levelData );\n\t\tthis.sizeBoard();\n\n\t\tconst canvas = document.getElementById( 'blocksBoard' );\n\t\tthis.ctx = canvas.getContext( '2d' );\n\t\tcanvas.height = this.scene.board.height * this.tileSize;\n\t\tcanvas.width = this.scene.board.width * this.tileSize;\n\n\t\tthis.renderBoard();\n\t\tthis.helper();\n\t}\n\n\t// TODO: The `Renderer` class would be cool here. This class could render (draw) the current scene on the canvas.\n\t// TODO: So instead we could have the `this.renderer.render();` invocation.\n\t// TODO: The tile size could be calculated in the renderer.\n\trenderBoard() {\n\t\tthis.clearCanvas();\n\t\tthis.drawBoard();\n\t\tthis.drawBlocks();\n\t\tthis.drawPlayer();\n\t\tthis.drawExit();\n\t}\n\n\tclearCanvas() {\n\t\tthis.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );\n\t}\n\n\tdrawBoard() {\n\t\tconst board = this.scene.board;\n\n\t\tthis.ctx.strokeRect(\n\t\t\t0, 0, board.width * this.tileSize, board.height * this.tileSize\n\t\t);\n\t}\n\n\tdrawBlocks() {\n\t\tconst colorAdd = 255 / this.scene.blocks.length;\n\t\tlet colorNum = 0;\n\t\tfor ( const block of this.scene.blocks ) {\n\t\t\tconst color = `rgb( ${ colorNum }, ${ colorNum }, ${ colorNum } )`;\n\n\t\t\tblock.draw( this.ctx, color, this.tileSize );\n\t\t\tcolorNum = colorNum + colorAdd;\n\t\t}\n\t}\n\n\tdrawPlayer() {\n\t\tconst player = this.scene.playerPosition;\n\t\tthis.ctx.fillStyle = '#FAED26';\n\t\tthis.ctx.beginPath();\n\t\tthis.ctx.arc(\n\t\t\tplayer.x * this.tileSize + this.tileSize / 2, player.y * this.tileSize + this.tileSize / 2, this.tileSize / 2, 0, 2 * Math.PI\n\t\t);\n\t\tthis.ctx.fill();\n\t}\n\n\tdrawExit() {\n\t\tconst exit = this.scene.exit;\n\t\tthis.ctx.fillStyle = '#E64398';\n\t\tthis.ctx.fillRect( exit.x * this.tileSize, exit.y * this.tileSize, this.tileSize, this.tileSize );\n\t}\n\n\tloadLevel( id ) {\n\t\tthis.levelNum = id;\n\t\tconst level = _levels__WEBPACK_IMPORTED_MODULE_1__[\"levels\"][ this.levelNum ];\n\t\tthis.scene.setLevelData( level );\n\t\tthis.tileSize = window.innerHeight / level.board.height;\n\t\tthis.ctx.canvas.height = level.board.height * this.tileSize;\n\t\tthis.ctx.canvas.width = level.board.width * this.tileSize;\n\t\tthis.renderBoard();\n\t}\n\tloadNextLevel() {\n\t\tconst num = this.levelNum + 1;\n\t\tthis.loadLevel( num );\n\t}\n\n\tmove( moveVector ) {\n\t\tconst newPosition = {\n\t\t\tx: this.scene.playerPosition.x + moveVector.x,\n\t\t\ty: this.scene.playerPosition.y + moveVector.y\n\t\t};\n\n\t\tif ( !this.scene.isPositionOnBoard( newPosition ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( this.scene.isExitAt( newPosition ) ) {\n\t\t\tthis.scene.playerPosition = newPosition;\n\t\t\tthis.loadNextLevel();\n\t\t\treturn;\n\t\t}\n\n\t\tif ( this.scene.isEmptyAt( newPosition ) ) {\n\t\t\tthis.scene.playerPosition = newPosition;\n\t\t} else {\n\t\t\tconst block = this.scene.findBlock( newPosition );\n\n\t\t\tif ( this.scene.canBlockBeMoved( block, moveVector ) ) {\n\t\t\t\tthis.scene.playerPosition = newPosition;\n\t\t\t\tblock.updatePosition( moveVector );\n\t\t\t}\n\t\t}\n\t}\n\n\tsizeBoard() {\n\t\tif ( window.innerHeight / this.scene.board.height < ( window.innerWidth - 400 ) / this.scene.board.width ) {\n\t\t\tthis.tileSize = window.innerHeight / this.scene.board.height;\n\t\t} else {\n\t\t\tthis.tileSize = ( window.innerWidth - 400 ) / this.scene.board.width;\n\t\t}\n\t}\n\n\thelper() {\n\t\tdocument.addEventListener( 'keyup', event => {\n\t\t\tif ( event.key === 'ArrowUp' ) {\n\t\t\t\tthis.move( { x: 0, y: -1 } );\n\t\t\t\tthis.renderBoard( this.scene, this.ctx );\n\t\t\t} else if ( event.key === 'ArrowDown' ) {\n\t\t\t\tthis.move( { x: 0, y: 1 } );\n\t\t\t\tthis.renderBoard( this.ctx );\n\t\t\t} else if ( event.key === 'ArrowLeft' ) {\n\t\t\t\tthis.move( { x: -1, y: 0 } );\n\t\t\t\tthis.renderBoard( this.scene, this.ctx );\n\t\t\t} else if ( event.key === 'ArrowRight' ) {\n\t\t\t\tthis.move( { x: 1, y: 0 } );\n\t\t\t\tthis.renderBoard( this.scene, this.ctx );\n\t\t\t}\n\t\t} );\n\t\twindow.addEventListener( 'resize', () => {\n\t\t\tthis.sizeBoard();\n\t\t\tthis.renderBoard();\n\t\t} );\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]();\ngame.start();\n\nconst levelInfo = document.getElementById( 'level' );\nconst levelList = document.getElementById( 'level-list' );\nconst skipLevelButton = document.getElementById( 'skip-level' );\nskipLevelButton.addEventListener( 'click', () => game.loadNextLevel() );\nlevelInfo.innerText = 'Level ' + ( undefined.levelNum + 1 );\nlevelInfo.innerText = 'Level ' + ( undefined.levelNum + 1 ); // TODO: <- Change it to a string template.\n// for ( const level of levels ) {\n// \tconst button = document.createElement( 'BUTTON' );\n// \tthis.levelList.appendChild( button );\n// \tbutton.innerText = levels.indexOf( level ) + 1;\n// }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! exports provided: levels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"levels\", function() { return levels; });\n/* harmony import */ var _rectangleblock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangleblock */ \"./src/rectangleblock.js\");\n/* harmony import */ var _customblock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customblock */ \"./src/customblock.js\");\n\n\n\nconst levels = [\n\t{\n\t\tboard: {\n\t\t\theight: 20,\n\t\t\twidth: 10 },\n\t\texit: { x: 0, y: 0 },\n\t\tplayerPosition: { x: 9, y: 9 },\n\t\tblocks: [\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 3, y: 4 }, 3, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 7, y: 7 }, { x: 7, y: 5 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]\n\t},\n\t{\n\t\tboard: {\n\t\t\theight: 10,\n\t\t\twidth: 10 },\n\t\texit: { x: 0, y: 0 },\n\t\tplayerPosition: { x: 9, y: 9 },\n\t\tblocks: [\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 3, y: 4 }, 3, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]\n\t},\n\t{\n\t\tboard: {\n\t\t\theight: 8,\n\t\t\twidth: 9 },\n\t\texit: { x: 0, y: 0 },\n\t\tplayerPosition: { x: 8, y: 7 },\n\t\tblocks: [\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 1 }, 6, 1 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 3 }, 6, 1 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 5 }, 6, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ] ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 1, y: 7 }, 5, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 0, y: 2 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 4, y: 0 } ] ),\n\t\t]\n\t},\n\t{\n\t\tboard: {\n\t\t\theight: 9,\n\t\t\twidth: 9\n\t\t},\n\t\texit: { x: 4, y: 4 },\n\t\tplayerPosition: { x: 6, y: 6 },\n\t\tblocks: [\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 3 } ] ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 3 }, 1, 3 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 3, y: 2 }, 3, 1 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 6, y: 3 }, 1, 3 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 3, y: 6 }, 3, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 7 }, { x: 3, y: 4 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 1 }, { x: 4, y: 3 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 7 }, { x: 5, y: 4 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 1 }, { x: 4, y: 5 } ] ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 4, y: 0 }, 1, 2 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 4, y: 7 }, 1, 2 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 0, y: 4 }, 2, 1 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 7, y: 4 }, 2, 1 ),\n\t\t]\n\t},\n\t{\n\t\tboard: {\n\t\t\theight: 8,\n\t\t\twidth: 9\n\t\t},\n\t\texit: { x: 0, y: 0 },\n\t\tplayerPosition: { x: 8, y: 7 },\n\t\tblocks: [\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 1 }, 6, 1 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 3 }, 6, 1 ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 2, y: 5 }, 6, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ] ),\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 1, y: 7 }, 5, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 0, y: 2 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 4, y: 0 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 1 }, { x: 6, y: 6 } ] ),\n\t\t]\n\t}\n];\n\n\n//# sourceURL=webpack:///./src/levels.js?");

/***/ }),

/***/ "./src/rectangleblock.js":
/*!*******************************!*\
  !*** ./src/rectangleblock.js ***!
  \*******************************/
/*! exports provided: RectangleBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RectangleBlock\", function() { return RectangleBlock; });\n\nclass RectangleBlock {\n\tconstructor( position, width, height ) {\n\t\tthis.position = position;\n\t\tthis.width = width;\n\t\tthis.height = height;\n\t}\n\n\tdraw( ctx, color, tileSize ) {\n\t\tctx.fillStyle = color;\n\t\tctx.fillRect( this.position.x * tileSize, this.position.y * tileSize, this.width * tileSize, this.height * tileSize );\n\t}\n\n\tget partialPosition() {\n\t\tconst blockPartialPositions = [];\n\n\t\tfor ( let i = 0; i < this.height; i++ ) {\n\t\t\tfor ( let j = 0; j < this.width; j++ ) {\n\t\t\t\tblockPartialPositions.push( {\n\t\t\t\t\tx: this.position.x + j,\n\t\t\t\t\ty: this.position.y + i\n\t\t\t\t} );\n\t\t\t}\n\t\t}\n\n\t\treturn blockPartialPositions;\n\t}\n\n\tupdatePosition( moveVector ) {\n\t\tthis.position.x += moveVector.x;\n\t\tthis.position.y += moveVector.y;\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/rectangleblock.js?");

/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n// TODO: The board position does not make sense. It will be always the (0, 0) point.\n\nclass Scene {\n\tconstructor( levelData ) {\n\t\tthis.setLevelData( levelData );\n\t}\n\n\tsetLevelData( level ) {\n\t\t// level = JSON.parse( JSON.stringify( level ) );\n\t\t// TODO: All these things should be private and be available only from this class.\n\t\t// TODO: All these things should be cloned to not change original objects later.\n\t\tthis.board = level.board;\n\t\tthis.blocks = level.blocks;\n\t\tthis.exit = level.exit;\n\t\tthis.playerPosition = level.playerPosition;\n\t}\n\n\t_parseBlocks( blocks ) {\n\t\t// \n\t}\n\n\tisExitAt( position ) {\n\t\treturn position.x == this.exit.x && position.y == this.exit.y;\n\t}\n\n\tisEmptyAt( position ) {\n\t\tfor ( const block of this.blocks ) {\n\t\t\tconst blockPartialPositions = block.partialPosition;\n\t\t\tfor ( const partialPosition of blockPartialPositions ) {\n\t\t\t\tif ( position.x == partialPosition.x && position.y == partialPosition.y ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn true;\n\t}\n\n\tcanBlockBeMoved( block, moveVector ) {\n\t\tconst levelData = {\n\t\t\tboard: this.board,\n\t\t\tblocks: this.blocks.filter( blockInArr => block !== blockInArr ),\n\t\t\texit: this.exit,\n\t\t\tplayerPosition: this.playerPosition,\n\t\t};\n\n\t\tconst sceneWithoutMovedBlock = new Scene( levelData );\n\t\tconst blockPartialPositions = block.partialPosition;\n\n\t\tfor ( const partialPosition of blockPartialPositions ) {\n\t\t\tconst newPosition = {\n\t\t\t\tx: partialPosition.x + moveVector.x,\n\t\t\t\ty: partialPosition.y + moveVector.y\n\t\t\t};\n\n\t\t\tif ( !sceneWithoutMovedBlock.isPositionOnBoard( newPosition ) ) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tif ( !sceneWithoutMovedBlock.isEmptyAt( newPosition ) ) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\treturn true;\n\t}\n\n\tfindBlock( position ) {\n\t\tfor ( const block of this.blocks ) {\n\t\t\tfor ( const partialPosition of block.partialPosition ) {\n\t\t\t\tif ( position.x == partialPosition.x && position.y == partialPosition.y ) {\n\t\t\t\t\treturn block;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tisPositionOnBoard( position ) {\n\t\treturn (\n\t\t\tposition.x < this.board.width &&\n\t\t\tposition.y < this.board.height &&\n\t\t\tposition.x >= 0 &&\n\t\t\tposition.y >= 0\n\t\t);\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/scene.js?");

/***/ })

/******/ });