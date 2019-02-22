import { Either } from './Either_';
import { Lazy } from './function';
import { IO } from './IO_';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup_';
declare module './HKT' {
    interface URI2HKT<A> {
        Task: Task<A>;
    }
}
export declare const URI = "Task";
export declare type URI = typeof URI;
/**
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see {@link TaskEither}.
 * @data
 * @constructor Task
 * @since 1.0.0
 */
export declare class Task<A> {
    readonly run: Lazy<Promise<A>>;
    readonly _A: A;
    readonly _URI: URI;
    constructor(run: Lazy<Promise<A>>);
    map<B>(f: (a: A) => B): Task<B>;
    ap<B>(fab: Task<(a: A) => B>): Task<B>;
    /**
     * Flipped version of {@link ap}
     */
    ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>;
    /**
     * Combine two effectful actions, keeping only the result of the first
     * @since 1.6.0
     */
    applyFirst<B>(fb: Task<B>): Task<A>;
    /**
     * Combine two effectful actions, keeping only the result of the second
     * @since 1.5.0
     */
    applySecond<B>(fb: Task<B>): Task<B>;
    chain<B>(f: (a: A) => Task<B>): Task<B>;
    inspect(): string;
    toString(): string;
}
export declare const map: <A, B>(fa: Task<A>, f: (a: A) => B) => Task<B>;
export declare const of: <A>(a: A) => Task<A>;
export declare const ap: <A, B>(fab: Task<(a: A) => B>, fa: Task<A>) => Task<B>;
export declare const chain: <A, B>(fa: Task<A>, f: (a: A) => Task<B>) => Task<B>;
/**
 * @since 1.0.0
 */
export declare const getRaceMonoid: <A = never>() => Monoid<Task<A>>;
/**
 * @since 1.0.0
 */
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Task<A>>;
/**
 * @since 1.0.0
 */
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<Task<A>>;
/**
 * @since 1.0.0
 */
export declare const tryCatch: <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L) => Task<Either<L, A>>;
/**
 * Lifts an IO action into a Task
 *
 * @since 1.0.0
 */
export declare const fromIO: <A>(io: IO<A>) => Task<A>;
/**
 * @since 1.7.0
 */
export declare const delay: <A>(millis: number, a: A) => Task<A>;
export declare const fromTask: <A>(a: A) => A;
