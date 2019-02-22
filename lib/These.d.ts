import { Bifunctor2 } from './Bifunctor';
import { Either } from './Either_';
import { Foldable2v2 } from './Foldable2v';
import { Functor2 } from './Functor';
import { Monad2C } from './Monad';
import { Option } from './Option_';
import { Semigroup } from './Semigroup_';
import { Setoid } from './Setoid';
import { Traversable2v2 } from './Traversable2v';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        These: These<L, A>;
    }
}
export declare const URI = "These";
export declare type URI = typeof URI;
/**
 * A data structure providing "inclusive-or" as opposed to {@link Either}'s "exclusive-or".
 *
 * If you interpret `Either<L, A>` as suggesting the computation may either fail or succeed (exclusively), then
 * `These<L, A>` may fail, succeed, or do both at the same time.
 *
 * There are a few ways to interpret the both case:
 *
 * - You can think of a computation that has a non-fatal error.
 * - You can think of a computation that went as far as it could before erroring.
 * - You can think of a computation that keeps track of errors as it completes.
 *
 * Another way you can think of `These<L, A>` is saying that we want to handle `L` kind of data, `A` kind of data, or
 * both `L` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.
 *
 * (description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)
 *
 * @data
 * @constructor This
 * @constructor That
 * @constructor Both
 * @since 1.0.0
 */
export declare type These<L, A> = This<L, A> | That<L, A> | Both<L, A>;
export declare class This<L, A> {
    readonly value: L;
    readonly _tag: 'This';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(value: L);
    map<B>(f: (a: A) => B): These<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /** Applies a function to each case in the data structure */
    fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the these is `This`, `false` otherwise */
    isThis(): this is This<L, A>;
    /** Returns `true` if the these is `That`, `false` otherwise */
    isThat(): this is That<L, A>;
    /** Returns `true` if the these is `Both`, `false` otherwise */
    isBoth(): this is Both<L, A>;
}
export declare class That<L, A> {
    readonly value: A;
    readonly _tag: 'That';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): These<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B;
    inspect(): string;
    toString(): string;
    isThis(): this is This<L, A>;
    isThat(): this is That<L, A>;
    isBoth(): this is Both<L, A>;
}
export declare class Both<L, A> {
    readonly l: L;
    readonly a: A;
    readonly _tag: 'Both';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(l: L, a: A);
    map<B>(f: (a: A) => B): These<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B;
    inspect(): string;
    toString(): string;
    isThis(): this is This<L, A>;
    isThat(): this is That<L, A>;
    isBoth(): this is Both<L, A>;
}
/**
 *
 * @since 1.0.0
 */
export declare const getSetoid: <L, A>(SL: Setoid<L>, SA: Setoid<A>) => Setoid<These<L, A>>;
/**
 *
 * @since 1.0.0
 */
export declare const getSemigroup: <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => Semigroup<These<L, A>>;
/**
 *
 * @since 1.0.0
 */
export declare const getMonad: <L>(S: Semigroup<L>) => Monad2C<"These", L>;
/**
 *
 * @since 1.0.0
 */
export declare const this_: <L, A>(l: L) => These<L, A>;
/**
 *
 * @since 1.0.0
 * @alias of
 */
export declare const that: <L, A>(a: A) => These<L, A>;
/**
 *
 * @since 1.0.0
 */
export declare const both: <L, A>(l: L, a: A) => These<L, A>;
/**
 *
 * @example
 * import { fromThese, this_, that, both } from 'fp-ts/lib/These'
 *
 * const from = fromThese('a', 1)
 * assert.deepStrictEqual(from(this_('b')), ['b', 1])
 * assert.deepStrictEqual(from(that(2)), ['a', 2])
 * assert.deepStrictEqual(from(both('b', 2)), ['b', 2])
 *
 * @since 1.0.0
 */
export declare const fromThese: <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>) => [L, A];
/**
 * Returns an `L` value if possible
 *
 * @example
 * import { theseLeft, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseLeft(this_('a')), some('a'))
 * assert.deepStrictEqual(theseLeft(that(1)), none)
 * assert.deepStrictEqual(theseLeft(both('a', 1)), some('a'))
 *
 * @since 1.0.0
 */
export declare const theseLeft: <L, A>(fa: These<L, A>) => Option<L>;
/**
 * Returns an `A` value if possible
 *
 * @example
 * import { theseRight, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseRight(this_('a')), none)
 * assert.deepStrictEqual(theseRight(that(1)), some(1))
 * assert.deepStrictEqual(theseRight(both('a', 1)), some(1))
 *
 * @since 1.0.0
 */
export declare const theseRight: <L, A>(fa: These<L, A>) => Option<A>;
/**
 * Returns `true` if the these is an instance of `This`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isThis: <L, A>(fa: These<L, A>) => fa is This<L, A>;
/**
 * Returns `true` if the these is an instance of `That`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isThat: <L, A>(fa: These<L, A>) => fa is That<L, A>;
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isBoth: <L, A>(fa: These<L, A>) => fa is Both<L, A>;
/**
 * @example
 * import { thisOrBoth, this_, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(thisOrBoth('a', none), this_('a'))
 * assert.deepStrictEqual(thisOrBoth('a', some(1)), both('a', 1))
 *
 * @since 1.13.0
 */
export declare const thisOrBoth: <L, A>(defaultThis: L, ma: Option<A>) => These<L, A>;
/**
 * @example
 * import { thatOrBoth, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(thatOrBoth(1, none), that(1))
 * assert.deepStrictEqual(thatOrBoth(1, some('a')), both('a', 1))
 *
 * @since 1.13.0
 */
export declare const thatOrBoth: <L, A>(defaultThat: A, ml: Option<L>) => These<L, A>;
/**
 * Returns the `L` value if and only if the value is constructed with `This`
 *
 * @example
 * import { theseThis, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseThis(this_('a')), some('a'))
 * assert.deepStrictEqual(theseThis(that(1)), none)
 * assert.deepStrictEqual(theseThis(both('a', 1)), none)
 *
 * @since 1.13.0
 */
export declare const theseThis: <L, A>(fa: These<L, A>) => Option<L>;
/**
 * Returns the `A` value if and only if the value is constructed with `That`
 *
 * @example
 * import { theseThat, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseThat(this_('a')), none)
 * assert.deepStrictEqual(theseThat(that(1)), some(1))
 * assert.deepStrictEqual(theseThat(both('a', 1)), none)
 *
 *
 * @since 1.13.0
 */
export declare const theseThat: <L, A>(fa: These<L, A>) => Option<A>;
/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(this_('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(that(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 1.13.0
 */
export declare const fromOptions: <L, A>(fl: Option<L>, fa: Option<A>) => Option<These<L, A>>;
/**
 * @example
 * import { fromEither, this_, that } from 'fp-ts/lib/These'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(left('a')), this_('a'))
 * assert.deepStrictEqual(fromEither(right(1)), that(1))
 *
 * @since 1.13.0
 */
export declare const fromEither: <L, A>(fa: Either<L, A>) => These<L, A>;
/**
 * @since 1.0.0
 */
export declare const these: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI>;
