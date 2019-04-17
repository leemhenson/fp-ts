import { Monad2 } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        State: State<L, A>;
    }
}
export declare const URI = "State";
export declare type URI = typeof URI;
/**
 * @since 1.0.0
 */
export declare class State<S, A> {
    readonly run: (s: S) => [A, S];
    constructor(run: (s: S) => [A, S]);
    eval(s: S): A;
    exec(s: S): S;
    map<B>(f: (a: A) => B): State<S, B>;
    ap<B>(fab: State<S, (a: A) => B>): State<S, B>;
    /**
     * Flipped version of `ap`
     */
    ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>;
    /**
     * Combine two effectful actions, keeping only the result of the first
     * @since 1.7.0
     */
    applyFirst<B>(fb: State<S, B>): State<S, A>;
    /**
     * Combine two effectful actions, keeping only the result of the second
     * @since 1.7.0
     */
    applySecond<B>(fb: State<S, B>): State<S, B>;
    chain<B>(f: (a: A) => State<S, B>): State<S, B>;
}
/**
 * Get the current state
 *
 * @since 1.0.0
 */
export declare const get: <S>() => State<S, S>;
/**
 * Set the state
 *
 * @since 1.0.0
 */
export declare const put: <S>(s: S) => State<S, void>;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 1.0.0
 */
export declare const modify: <S>(f: (s: S) => S) => State<S, undefined>;
/**
 * Get a value which depends on the current state
 *
 * @since 1.0.0
 */
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>;
/**
 * @since 1.0.0
 */
export declare const state: Monad2<URI>;
