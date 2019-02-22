import { Applicative } from './Applicative';
import { Lazy, Predicate, Refinement } from './function';
import { HKT } from './HKT';
import { Monoid } from './Monoid';
import { Option } from './Option_';
import { Semigroup } from './Semigroup_';
import { Setoid } from './Setoid';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Either: Either<L, A>;
    }
}
export declare const URI = "Either";
export declare type URI = typeof URI;
/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * right(12).map(double) // right(24)
 * left(23).map(double)  // left(23)
 * ```
 *
 * @data
 * @constructor Left
 * @constructor Right
 * @since 1.0.0
 */
export declare type Either<L, A> = Left<L, A> | Right<L, A>;
/**
 * Left side of {@link Either}
 */
export declare class Left<L, A> {
    readonly value: L;
    readonly _tag: 'Left';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(value: L);
    /** The given function is applied if this is a `Right` */
    map<B>(f: (a: A) => B): Either<L, B>;
    ap<B>(fab: Either<L, (a: A) => B>): Either<L, B>;
    /**
     * Flipped version of {@link ap}
     */
    ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>;
    /** Binds the given function across `Right` */
    chain<B>(f: (a: A) => Either<L, B>): Either<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>;
    alt(fy: Either<L, A>): Either<L, A>;
    /**
     * Lazy version of {@link alt}
     *
     * @example
     * import { right } from 'fp-ts/lib/Either'
     *
     * assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
     *
     * @since 1.6.0
     */
    orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A>;
    extend<B>(f: (ea: Either<L, A>) => B): Either<L, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /** Applies a function to each case in the data structure */
    fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B;
    /** Returns the value from this `Right` or the given argument if this is a `Left` */
    getOrElse(a: A): A;
    /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
    getOrElseL(f: (l: L) => A): A;
    /** Maps the left side of the disjunction */
    mapLeft<M>(f: (l: L) => M): Either<M, A>;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the either is an instance of `Left`, `false` otherwise */
    isLeft(): this is Left<L, A>;
    /** Returns `true` if the either is an instance of `Right`, `false` otherwise */
    isRight(): this is Right<L, A>;
    /** Swaps the disjunction values */
    swap(): Either<A, L>;
    /**
     * Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
     * right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
     * value, returns `Left` with the existing value of `Left` if this is a `Left`.
     *
     * @example
     * import { right, left } from 'fp-ts/lib/Either'
     *
     * assert.deepStrictEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
     * assert.deepStrictEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
     * assert.deepStrictEqual(left(12).filterOrElse(n => n > 10, -1), left(12))
     *
     * @since 1.3.0
     */
    filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>;
    filterOrElse(p: Predicate<A>, zero: L): Either<L, A>;
    /**
     * Lazy version of {@link filterOrElse}
     * @since 1.3.0
     */
    filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>;
    filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>;
    /**
     * Use {@link filterOrElse} instead
     * @since 1.6.0
     * @deprecated
     */
    refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>;
    /**
     * Lazy version of {@link refineOrElse}
     * Use {@link filterOrElseL} instead
     * @since 1.6.0
     * @deprecated
     */
    refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>;
}
/**
 * Right side of {@link Either}
 */
export declare class Right<L, A> {
    readonly value: A;
    readonly _tag: 'Right';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Either<L, B>;
    ap<B>(fab: Either<L, (a: A) => B>): Either<L, B>;
    ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>;
    chain<B>(f: (a: A) => Either<L, B>): Either<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>;
    alt(fy: Either<L, A>): Either<L, A>;
    orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A>;
    extend<B>(f: (ea: Either<L, A>) => B): Either<L, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B;
    getOrElse(a: A): A;
    getOrElseL(f: (l: L) => A): A;
    mapLeft<M>(f: (l: L) => M): Either<M, A>;
    inspect(): string;
    toString(): string;
    isLeft(): this is Left<L, A>;
    isRight(): this is Right<L, A>;
    swap(): Either<A, L>;
    filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>;
    filterOrElse(p: Predicate<A>, zero: L): Either<L, A>;
    filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>;
    filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>;
    refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>;
    refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>;
}
/**
 * @since 1.0.0
 */
export declare const getSetoid: <L, A>(SL: Setoid<L>, SA: Setoid<A>) => Setoid<Either<L, A>>;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
export declare const getSemigroup: <L, A>(S: Semigroup<A>) => Semigroup<Either<L, A>>;
/**
 * {@link Apply} semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
export declare const getApplySemigroup: <L, A>(S: Semigroup<A>) => Semigroup<Either<L, A>>;
/**
 * @since 1.7.0
 */
export declare const getApplyMonoid: <L, A>(M: Monoid<A>) => Monoid<Either<L, A>>;
export declare const map: <L, A, B>(fa: Either<L, A>, f: (a: A) => B) => Either<L, B>;
export declare const ap: <L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>) => Either<L, B>;
export declare const chain: <L, A, B>(fa: Either<L, A>, f: (a: A) => Either<L, B>) => Either<L, B>;
export declare const bimap: <L, V, A, B>(fla: Either<L, A>, f: (u: L) => V, g: (a: A) => B) => Either<V, B>;
export declare const alt: <L, A>(fx: Either<L, A>, fy: Either<L, A>) => Either<L, A>;
export declare const extend: <L, A, B>(ea: Either<L, A>, f: (ea: Either<L, A>) => B) => Either<L, B>;
export declare const reduce: <L, A, B>(fa: Either<L, A>, b: B, f: (b: B, a: A) => B) => B;
export declare const foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Either<L, A>, f: (a: A) => M) => M;
export declare const foldr: <L, A, B>(fa: Either<L, A>, b: B, f: (a: A, b: B) => B) => B;
export declare const traverse: <F>(F: Applicative<F>) => <L, A, B>(ta: Either<L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>;
export declare const sequence: <F>(F: Applicative<F>) => <L, A>(ta: Either<L, HKT<F, A>>) => HKT<F, Either<L, A>>;
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 1.0.0
 */
export declare const left: <L, A>(l: L) => Either<L, A>;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 1.0.0
 * @alias of
 */
export declare const right: <L, A>(a: A) => Either<L, A>;
export declare const of: <L, A>(a: A) => Either<L, A>;
/**
 * @since 1.0.0
 */
export declare function fromPredicate<L, A, B extends A>(predicate: Refinement<A, B>, onFalse: (a: A) => L): (a: A) => Either<L, B>;
export declare function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A>;
/**
 * Use {@link fromPredicate} instead
 *
 * @since 1.6.0
 * @deprecated
 */
export declare const fromRefinement: <L, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => L) => (a: A) => Either<L, B>;
/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
export declare const fromOption: <L>(defaultValue: L) => <A>(fa: Option<A>) => Either<L, A>;
/**
 * Lazy version of {@link fromOption}
 *
 * @since 1.3.0
 */
export declare const fromOptionL: <L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>) => Either<L, A>;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
export declare const fromNullable: <L>(defaultValue: L) => <A>(a: A | null | undefined) => Either<L, A>;
/**
 * Default value for the optional `onerror` argument of `tryCatch`
 *
 * @since 1.0.0
 */
export declare const toError: (e: unknown) => Error;
/**
 * Use {@link tryCatch2v}
 *
 * @since 1.0.0
 * @deprecated
 */
export declare const tryCatch: <A>(f: Lazy<A>, onerror?: (e: unknown) => Error) => Either<Error, A>;
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch2v } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch2v(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 1.11.0
 */
export declare const tryCatch2v: <L, A>(f: Lazy<A>, onerror: (e: unknown) => L) => Either<L, A>;
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isLeft: <L, A>(fa: Either<L, A>) => fa is Left<L, A>;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isRight: <L, A>(fa: Either<L, A>) => fa is Right<L, A>;