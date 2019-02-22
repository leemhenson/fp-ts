import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup_';
import { Lazy } from './function';
declare module './HKT' {
    interface URI2HKT<A> {
        IO: IO<A>;
    }
}
export declare const URI = "IO";
export declare type URI = typeof URI;
/**
 * `IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent a synchronous computation that may fail, please see {@link IOEither}.
 * @data
 * @constructor IO
 * @since 1.0.0
 */
export declare class IO<A> {
    readonly run: Lazy<A>;
    readonly _A: A;
    readonly _URI: URI;
    constructor(run: Lazy<A>);
    map<B>(f: (a: A) => B): IO<B>;
    ap<B>(fab: IO<(a: A) => B>): IO<B>;
    /**
     * Flipped version of {@link ap}
     */
    ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>;
    /**
     * Combine two effectful actions, keeping only the result of the first
     * @since 1.6.0
     */
    applyFirst<B>(fb: IO<B>): IO<A>;
    /**
     * Combine two effectful actions, keeping only the result of the second
     * @since 1.5.0
     */
    applySecond<B>(fb: IO<B>): IO<B>;
    chain<B>(f: (a: A) => IO<B>): IO<B>;
    inspect(): string;
    toString(): string;
}
export declare const map: <A, B>(fa: IO<A>, f: (a: A) => B) => IO<B>;
export declare const of: <A>(a: A) => IO<A>;
export declare const ap: <A, B>(fab: IO<(a: A) => B>, fa: IO<A>) => IO<B>;
export declare const chain: <A, B>(fa: IO<A>, f: (a: A) => IO<B>) => IO<B>;
/**
 * @since 1.0.0
 */
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<IO<A>>;
/**
 * @since 1.0.0
 */
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<IO<A>>;
