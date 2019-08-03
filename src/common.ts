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
    blocks: ( CustomBlockJson | RectangleBlockJson )[];
}

export interface RectangleBlockJson {
    type: 'rectangle';
    position: Position;
    width: number;
    height: number;
}

export interface CustomBlockJson {
    type: 'custom';
    points: Position[];
}

export interface Block {
    partialPositions: Position[];
    draw( ctx: CanvasRenderingContext2D, color: string, tileSize: number ): void;
    updatePosition( moveVector: Position ): void;
}
