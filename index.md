<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
	<title>Blocks Game</title>
	<style>
		body {
			background-color: #F1E9DA;
			margin: 0;
		}

		canvas {
			padding-left: 0;
			padding-right: 0;
			margin-left: 400px;
			margin-right: auto;
			display: block;
			background-color: #541388;
		}

		#instruction {
			position: absolute;
			width: 340px;
			text-align: center;
			font-family: Oswald;
			color: white;
			background-color: #D90368;
			padding: 20px;
			margin-top: 10px;
			margin-left: 10px;
		}

		#instruction button {
			cursor: pointer;
		}

		#buttons {
			margin: 20px;
		}

		#buttons button {
			font-family: Oswald;
			margin: 5px;
			margin-top: 20px;
			width: 100px;
			height: 30px;
			border-radius: 5px;
			font-size: 18px;
		}

		#level-list {
			margin-top: 20px;
			margin-left: 130px;
		}
		#level-list button {
			margin: 5px;
			display: block;
			font-family: Oswald;
			width: 80px;
			font-size: 18px;
		}

		button.done {
			background-color: #2E294E;
			color: #FFF;
			border-radius: 4px;
		}

		button.undone {
			background-color: 'white';
			color: 'black';
			border-radius: 4px;
		}

		button.skipped {
			background-color: #FFD400;
			color: black;
			border-radius: 4px;
		}

		button.active {
			background-color: 'white';
			color: 'black';
			border-radius: 4px;

		}

		button.active::before {
			content: '>  ';
		}

		#canvas-space {
			display: block;
		}

		#end-screen {
			position: absolute;
			width: 100%;
			height: 100vh;
			visibility: hidden;
			background-color:#2E294E;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-family: Oswald;
			color: white;
			font-size: 30px;

		}

		#alert {
			margin: 20px;
		}

		#end-screen button {
			font-family: Oswald;
			width: 200px;
			height: 30px;
			border-radius: 5px;
			font-size: 18px;
			cursor: pointer;
		}

	</style>
</head>

<body>
	<div id="instruction">
		<div>Get to the exit.</div>
		<div>You can move one block at a time by pushing it.</div>
	
		<div id="level-list"></div>

		<div id="buttons">
			<button id="skip-level">Skip level</button>
			<button id="reset">Reset</button>
		</div>

	</div>
	<div id="canvas-space">
		<canvas id="blocksBoard"></canvas>
	</div>
	<div id="end-screen">
		<div id="alert">
			You finished all levels! 
		</div>
		<div>
			<button id="restart-game">Restart game</button>
		</div>
	</div>
	<script src="dist/main.js"></script>
</body>

</html>
