export class ImageManager {
	images: Map<string, HTMLImageElement>;

	constructor() {
		this.images = new Map();
	}

	// This function can be optimized in the future, when more images will be required.
	async load( imageSources: Record<string, string> ) {
		for ( const imageName in imageSources ) {
			this.images.set( imageName, await loadImage( imageSources[ imageName ] ) );
		}
	}
}

async function loadImage( src: string ): Promise<HTMLImageElement> {
	const image = new Image();

	image.src = src;

	return new Promise( ( resolve, reject ) => {
		image.onload = () => resolve( image );
		image.onerror = reject;
	} );
}
