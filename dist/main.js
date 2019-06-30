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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CustomBlock\", function() { return CustomBlock; });\nconst tileSize = 50;\n\nclass CustomBlock {\n\tconstructor( positions ) {\n\t\tthis.positions = positions;\n\t}\n\n\tdraw( ctx, color ) {\n\t\tfor ( const position of this.positions ) {\n\t\t\tctx.fillStyle = color;\n\t\t\tctx.fillRect( position.x * tileSize, position.y * tileSize, tileSize, tileSize );\n\t\t}\n\t}\n\n\tget partialPosition() {\n\t\treturn this.positions;\n\t}\n\n\tupdatePositon( moveVector ) {\n\t\tfor ( const position of this.positions ) {\n\t\t\tposition.x += moveVector.x;\n\t\t\tposition.y += moveVector.y;\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/customblock.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ \"./src/scene.js\");\nconst tileSize = 50;\n\n\n\nclass Game {\n\tstart() {\n\t\tthis.levelNum = 0;\n\t\tconst levelData = _scene__WEBPACK_IMPORTED_MODULE_0__[\"levels\"][ this.levelNum ];\n\t\tthis.scene = new _scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]( levelData );\n\n\t\tconst canvas = document.getElementById( 'blocksBoard' );\n\t\tthis.ctx = canvas.getContext( '2d' );\n\t\tcanvas.height = this.scene.board.height * tileSize;\n\t\tcanvas.width = this.scene.board.width * tileSize;\n\n\t\tthis.renderBoard();\n\n\t\tdocument.addEventListener( 'keyup', event => {\n\t\t\tif ( event.key === 'ArrowUp' ) {\n\t\t\t\tthis.movePlayer( { x: 0, y: -1 } );\n\t\t\t\tthis.renderBoard( this.scene, this.ctx );\n\t\t\t} else if ( event.key === 'ArrowDown' ) {\n\t\t\t\tthis.movePlayer( { x: 0, y: 1 } );\n\t\t\t\tthis.renderBoard( this.ctx );\n\t\t\t} else if ( event.key === 'ArrowLeft' ) {\n\t\t\t\tthis.movePlayer( { x: -1, y: 0 } );\n\t\t\t\tthis.renderBoard( this.scene, this.ctx );\n\t\t\t} else if ( event.key === 'ArrowRight' ) {\n\t\t\t\tthis.movePlayer( { x: 1, y: 0 } );\n\t\t\t\tthis.renderBoard( this.scene, this.ctx );\n\t\t\t}\n\t\t} );\n\t}\n\n\trenderBoard() {\n\t\tthis.clearCanvas();\n\t\tthis.drawBoard();\n\t\tthis.drawBlocks();\n\t\tthis.drawPlayer();\n\t\tthis.drawExit();\n\t}\n\n\tclearCanvas() {\n\t\tthis.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );\n\t}\n\n\tdrawBoard() {\n\t\tconst board = this.scene.board;\n\n\t\tthis.ctx.strokeRect( board.position.x * tileSize, board.position.y * tileSize, board.width * tileSize, board.height * tileSize );\n\t}\n\n\tdrawBlocks() {\n\t\tconst colorAdd = 255 / this.scene.blocks.length;\n\t\tlet colorNum = 0;\n\t\tfor ( const block of this.scene.blocks ) {\n\t\t\tconst color = `rgb( ${ colorNum }, ${ colorNum }, ${ colorNum } )`;\n\n\t\t\tblock.draw( this.ctx, color );\n\t\t\tcolorNum = colorNum + colorAdd;\n\t\t}\n\t}\n\n\tdrawPlayer() {\n\t\tconst player = this.scene.playerPosition;\n\t\tthis.ctx.fillStyle = '#FAED26';\n\t\tthis.ctx.beginPath();\n\t\tthis.ctx.arc( player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2, 0, 2 * Math.PI );\n\t\tthis.ctx.fill();\n\t}\n\n\tdrawExit() {\n\t\tconst exit = this.scene.exit;\n\t\tthis.ctx.fillStyle = '#E64398';\n\t\tthis.ctx.fillRect( exit.x * tileSize, exit.y * tileSize, tileSize, tileSize );\n\t}\n\n\tloadNextLevel() {\n\t\tthis.levelNum += 1;\n\t\tconst level = _scene__WEBPACK_IMPORTED_MODULE_0__[\"levels\"][ this.levelNum ];\n\t\tthis.scene.setLevelData( level );\n\t}\n\n\tmovePlayer( moveVector ) {\n\t\tthis.moveVector = moveVector;\n\t\tconst newPosition = {\n\t\t\tx: this.scene.playerPosition.x + moveVector.x,\n\t\t\ty: this.scene.playerPosition.y + moveVector.y\n\t\t};\n\n\t\tif ( !this.scene.isPositionOnBoard( newPosition ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( this.scene.isExitAt( newPosition ) ) {\n\t\t\tconsole.log( 'Jupijajej' );\n\t\t\tthis.scene.playerPosition = newPosition;\n\t\t\tthis.loadNextLevel();\n\t\t\treturn;\n\t\t}\n\n\t\tif ( this.scene.isEmptyAt( newPosition ) ) {\n\t\t\tthis.scene.playerPosition = newPosition;\n\t\t} else {\n\t\t\tconst block = this.scene.findBlock( newPosition );\n\n\t\t\tif ( this.scene.canBlockBeMoved( block, moveVector ) ) {\n\t\t\t\tthis.scene.playerPosition = newPosition;\n\t\t\t\tblock.updatePositon( moveVector );\n\t\t\t}\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]();\ngame.start();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/rectangleblock.js":
/*!*******************************!*\
  !*** ./src/rectangleblock.js ***!
  \*******************************/
/*! exports provided: RectangleBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RectangleBlock\", function() { return RectangleBlock; });\nconst tileSize = 50;\n\nclass RectangleBlock {\n\tconstructor( position, width, height ) {\n\t\tthis.position = position;\n\t\tthis.width = width;\n\t\tthis.height = height;\n\t}\n\n\tdraw( ctx ) {\n\t\tctx.fillStyle = 'black';\n\t\tctx.fillRect( this.position.x * tileSize, this.position.y * tileSize, this.width * tileSize, this.height * tileSize );\n\t}\n\n\tget partialPosition() {\n\t\tconst blockPartialPositions = [];\n\n\t\tfor ( let i = 0; i < this.height; i++ ) {\n\t\t\tfor ( let j = 0; j < this.width; j++ ) {\n\t\t\t\tblockPartialPositions.push( {\n\t\t\t\t\tx: this.position.x + j,\n\t\t\t\t\ty: this.position.y + i\n\t\t\t\t} );\n\t\t\t}\n\t\t}\n\n\t\treturn blockPartialPositions;\n\t}\n\n\tupdatePositon( moveVector ) {\n\t\tthis.position.x += moveVector.x;\n\t\tthis.position.y += moveVector.y;\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/rectangleblock.js?");

/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: Scene, levels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"levels\", function() { return levels; });\n/* harmony import */ var _rectangleblock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangleblock */ \"./src/rectangleblock.js\");\n/* harmony import */ var _customblock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customblock */ \"./src/customblock.js\");\n\n\n\nclass Scene {\n\tconstructor( levelData ) {\n\t\tthis.setLevelData( levelData );\n\t}\n\n\tsetLevelData( level ) {\n\t\tthis.board = level.board;\n\t\tthis.blocks = level.blocks;\n\t\tthis.exit = level.exit;\n\t\tthis.playerPosition = level.playerPosition;\n\t}\n\n\tisExitAt( position ) {\n\t\treturn position.x == this.exit.x && position.y == this.exit.y;\n\t}\n\n\tisEmptyAt( position ) {\n\t\tfor ( const block of this.blocks ) {\n\t\t\tconst blockPartialPositions = block.partialPosition;\n\t\t\tfor ( const partialPosition of blockPartialPositions ) {\n\t\t\t\tif ( position.x == partialPosition.x && position.y == partialPosition.y ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn true;\n\t}\n\n\tcanBlockBeMoved( block, moveVector ) {\n\t\tconst levelData = {\n\t\t\tboard: this.board,\n\t\t\tblocks: this.blocks.filter( blockInArr => block !== blockInArr ),\n\t\t\texit: this.exit,\n\t\t\tplayerPosition: this.playerPosition,\n\t\t};\n\n\t\tconst sceneWithoutMovedBlock = new Scene( levelData );\n\t\tconst blockPartialPositions = block.partialPosition;\n\n\t\tfor ( const partialPosition of blockPartialPositions ) {\n\t\t\tconst newPosition = {\n\t\t\t\tx: partialPosition.x + moveVector.x,\n\t\t\t\ty: partialPosition.y + moveVector.y\n\t\t\t};\n\n\t\t\tif ( !sceneWithoutMovedBlock.isPositionOnBoard( newPosition ) ) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tif ( !sceneWithoutMovedBlock.isEmptyAt( newPosition ) ) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\treturn true;\n\t}\n\n\tfindBlock( position ) {\n\t\tfor ( const block of this.blocks ) {\n\t\t\tfor ( const partialPosition of block.partialPosition ) {\n\t\t\t\tif ( position.x == partialPosition.x && position.y == partialPosition.y ) {\n\t\t\t\t\treturn block;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tisPositionOnBoard( position ) {\n\t\treturn (\n\t\t\tposition.x < this.board.width &&\n\t\t\tposition.y < this.board.height &&\n\t\t\tposition.x >= 0 &&\n\t\t\tposition.y >= 0\n\t\t);\n\t}\n}\n\nconst levels = [\n\t{\n\t\tboard: {\n\t\t\tposition: { x: 0, y: 0 },\n\t\t\theight: 10,\n\t\t\twidth: 10 },\n\t\texit: { x: 0, y: 0 },\n\t\tplayerPosition: { x: 9, y: 9 },\n\t\tblocks: [\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 3, y: 4 }, 3, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 7, y: 7 }, { x: 7, y: 5 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]\n\t},\n\t{\n\t\tboard: {\n\t\t\tposition: { x: 0, y: 0 },\n\t\t\theight: 10,\n\t\t\twidth: 10 },\n\t\texit: { x: 0, y: 0 },\n\t\tplayerPosition: { x: 9, y: 9 },\n\t\tblocks: [\n\t\t\tnew _rectangleblock__WEBPACK_IMPORTED_MODULE_0__[\"RectangleBlock\"]( { x: 3, y: 4 }, 3, 1 ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),\n\t\t\tnew _customblock__WEBPACK_IMPORTED_MODULE_1__[\"CustomBlock\"]( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]\n\t}\n];\n\n\n//# sourceURL=webpack:///./src/scene.js?");

/***/ })

/******/ });