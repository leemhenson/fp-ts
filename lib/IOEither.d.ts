/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt';
import { Bifunctor2 } from './Bifunctor';
import { Either } from './Either';
import { Lazy } from './function';
import { IO } from './IO';
import { Monad2 } from './Monad';
import { MonadThrow2 } from './MonadThrow';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        IOEither: IOEither<L, A>;
    }
}
export declare const URI = "IOEither";
export declare type URI = typeof URI;
/**
 * @since 1.6.0
 */
export declare class IOEither<L, A> {
    readonly value: IO<Either<L, A>>;
    constructor(value: IO<Either<L, A>>);
    /**
     * Runs the inner io
     */
    run(): Either<L, A>;
    map<B>(f: (a: A) => B): IOEither<L, B>;
    ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B>;
    /**
     * Flipped version of `ap`
     */
    ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C>;
    /**
     * Combine two effectful actions, keeping only the result of the first
     */
    applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A>;
    /**
     * Combine two effectful actions, keeping only the result of the second
     */
    applySecond<B>(fb: IOEither<L, B>): IOEither<L, B>;
    chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B>;
    fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R>;
    mapLeft<M>(f: (l: L) => M): IOEither<M, A>;
    orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A>;
    alt(fy: IOEither<L, A>): IOEither<L, A>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B>;
}
/**
 * @since 1.6.0
 */
export declare const right: <L, A>(fa: IO<A>) => IOEither<L, A>;
/**
 * @since 1.6.0
 */
export declare const left: <L, A>(fa: IO<L>) => IOEither<L, A>;
/**
 * @since 1.6.0
 */
export declare const fromEither: <L, A>(fa: Either<L, A>) => IOEither<L, A>;
/**
 * @since 1.6.0
 */
export declare const fromLeft: <L, A>(l: L) => IOEither<L, A>;
/**
 * @since 1.11.0
 */
export declare const tryCatch: <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L) => IOEither<L, A>;
/**
 * @since 1.6.0
 */
export declare const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI>;
