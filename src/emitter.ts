export class Emitter<T = void> {
    private functions: Callback<T>[] = [];

    subscribe( fn: Callback<T> ) {
        this.functions.push( fn );
    }

    emit( arg: T ) {
        for ( const fn of this.functions ) {
            fn( arg );
        }
    }
}

type Callback<T> = ( arg: T ) => void;
