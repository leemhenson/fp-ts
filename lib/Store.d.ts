import { Comonad2 } from './Comonad';
import { Functor, Functor2, Functor3 } from './Functor';
import { HKT, HKT2, HKT3, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Endomorphism } from './function';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Store: Store<L, A>;
    }
}
export declare const URI = "Store";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Store
 * @since 1.0.0
 */
export declare class Store<S, A> {
    readonly peek: (s: S) => A;
    readonly pos: S;
    readonly _A: A;
    readonly _L: S;
    readonly _URI: URI;
    constructor(peek: (s: S) => A, pos: S);
    /** Reposition the focus at the specified position */
    seek(s: S): Store<S, A>;
    map<B>(f: (a: A) => B): Store<S, B>;
    extract(): A;
    extend<B>(f: (sa: Store<S, A>) => B): Store<S, B>;
    inspect(): string;
    toString(): string;
}
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 1.0.0
 */
export declare const peeks: <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S) => A;
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 1.0.0
 */
export declare const seeks: <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => Store<S, A>;
/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 1.0.0
 */
export declare function experiment<F extends URIS3>(F: Functor3<F>): <U, L, S>(f: (s: S) => HKT3<F, U, L, S>) => <A>(sa: Store<S, A>) => Type3<F, U, L, A>;
export declare function experiment<F extends URIS2>(F: Functor2<F>): <L, S>(f: (s: S) => HKT2<F, L, S>) => <A>(sa: Store<S, A>) => Type2<F, L, A>;
export declare function experiment<F extends URIS>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => Type<F, A>;
export declare function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>;
/**
 * @since 1.0.0
 */
export declare const store: Comonad2<URI>;