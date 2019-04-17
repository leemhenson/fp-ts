import { Either } from './Either';
import { Group } from './Group';
import { Setoid } from './Setoid';
import { Monad1 } from './Monad';
declare module './HKT' {
    interface URI2HKT<A> {
        FreeGroup: FreeGroup<A>;
    }
}
export declare const URI = "FreeGroup";
export declare type URI = typeof URI;
/**
 * @since 1.13.0
 */
export declare class FreeGroup<A> {
    readonly value: Array<Either<A, A>>;
    constructor(value: Array<Either<A, A>>);
    map<B>(f: (a: A) => B): FreeGroup<B>;
    ap<B>(fab: FreeGroup<(a: A) => B>): FreeGroup<B>;
    ap_<B, C>(this: FreeGroup<(b: B) => C>, fb: FreeGroup<B>): FreeGroup<C>;
    chain<B>(f: (a: A) => FreeGroup<B>): FreeGroup<B>;
}
/**
 * Smart constructor which normalizes an array
 *
 * @since 1.13.0
 */
export declare const fromArray: <A>(S: Setoid<A>) => (as: Either<A, A>[]) => FreeGroup<A>;
/**
 * Reduce a term of a free group to canonical form, i.e. cancelling adjacent inverses.
 *
 * @since 1.13.0
 */
export declare const normalize: <A>(S: Setoid<A>) => (g: Either<A, A>[]) => Either<A, A>[];
/**
 * @since 1.13.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<FreeGroup<A>>;
/**
 * @since 1.13.0
 */
export declare const empty: FreeGroup<never>;
/**
 * @since 1.13.0
 */
export declare const getGroup: <A>(S: Setoid<A>) => Group<FreeGroup<A>>;
/**
 * @since 1.13.0
 */
export declare const freeGroup: Monad1<URI>;
