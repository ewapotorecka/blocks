export interface Rectangle {
	width: number;
	height: number;
}

export interface Position {
	x: number;
	y: number;
}

export interface Level {
	board: Rectangle;
	exit: Position;
	playerPosition: Position;
	blocks: Array<CustomBlockJson | RectangleBlockJson>;
}

interface RectangleBlockJson {
	type: string;
	position: Position;
	width: number;
	height: number;
}

interface CustomBlockJson {
	type: string;
	points: Position[];
}