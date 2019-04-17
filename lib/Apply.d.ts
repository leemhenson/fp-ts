import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Semigroup } from './Semigroup';
/**
 * @since 1.0.0
 */
export interface Apply<F> extends Functor<F> {
    readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>;
}
export interface Apply1<F extends URIS> extends Functor1<F> {
    readonly ap: <A, B>(fab: Type<F, (a: A) => B>, fa: Type<F, A>) => Type<F, B>;
}
export interface Apply2<F extends URIS2> extends Functor2<F> {
    readonly ap: <L, A, B>(fab: Type2<F, L, (a: A) => B>, fa: Type2<F, L, A>) => Type2<F, L, B>;
}
export interface Apply3<F extends URIS3> extends Functor3<F> {
    readonly ap: <U, L, A, B>(fab: Type3<F, U, L, (a: A) => B>, fa: Type3<F, U, L, A>) => Type3<F, U, L, B>;
}
export interface Apply2C<F extends URIS2, L> extends Functor2C<F, L> {
    readonly ap: <A, B>(fab: Type2<F, L, (a: A) => B>, fa: Type2<F, L, A>) => Type2<F, L, B>;
}
export interface Apply3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
    readonly ap: <A, B>(fab: Type3<F, U, L, (a: A) => B>, fa: Type3<F, U, L, A>) => Type3<F, U, L, B>;
}
/**
 * Combine two effectful actions, keeping only the result of the first
 *
 * @since 1.0.0
 */
export declare function applyFirst<F extends URIS3>(F: Apply3<F>): <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>;
export declare function applyFirst<F extends URIS3, U, L>(F: Apply3C<F, U, L>): <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>;
export declare function applyFirst<F extends URIS2>(F: Apply2<F>): <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, A>;
export declare function applyFirst<F extends URIS2, L>(F: Apply2C<F, L>): <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, A>;
export declare function applyFirst<F extends URIS>(F: Apply1<F>): <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, A>;
export declare function applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A>;
/**
 * Combine two effectful actions, keeping only the result of the second
 *
 * @since 1.0.0
 */
export declare function applySecond<F extends URIS3>(F: Apply3<F>): <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, B>;
export declare function applySecond<F extends URIS3, U, L>(F: Apply3C<F, U, L>): <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, B>;
export declare function applySecond<F extends URIS2>(F: Apply2<F>): <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, B>;
export declare function applySecond<F extends URIS2, L>(F: Apply2C<F, L>): <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, B>;
export declare function applySecond<F extends URIS>(F: Apply1<F>): <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, B>;
export declare function applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B>;
/**
 * If `F` is a `Apply` and `S` is a `Semigroup` over `A` then `HKT<F, A>` is a `Semigroup` over `A` as well
 *
 * @example
 * import { getSemigroup } from 'fp-ts/lib/Apply'
 * import { option, some, none } from 'fp-ts/lib/Option'
 * import { monoidSum } from 'fp-ts/lib/Monoid'
 *
 * const S = getSemigroup(option, monoidSum)()
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(2)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @since 1.4.0
 */
export declare function getSemigroup<F extends URIS3, A>(F: Apply3<F>, S: Semigroup<A>): <U = never, L = never>() => Semigroup<Type3<F, U, L, A>>;
export declare function getSemigroup<F extends URIS3, U, L, A>(F: Apply3C<F, U, L>, S: Semigroup<A>): () => Semigroup<Type3<F, U, L, A>>;
export declare function getSemigroup<F extends URIS2, A>(F: Apply2<F>, S: Semigroup<A>): <L = never>() => Semigroup<Type2<F, L, A>>;
export declare function getSemigroup<F extends URIS2, L, A>(F: Apply2C<F, L>, S: Semigroup<A>): () => Semigroup<Type2<F, L, A>>;
export declare function getSemigroup<F extends URIS, A>(F: Apply1<F>, S: Semigroup<A>): () => Semigroup<Type<F, A>>;
export declare function getSemigroup<F, A>(F: Apply<F>, S: Semigroup<A>): () => Semigroup<HKT<F, A>>;
/**
 * Tuple sequencing, i.e., take a tuple of monadic actions and does them from left-to-right, returning the resulting tuple.
 *
 * @example
 * import { sequenceT } from 'fp-ts/lib/Apply'
 * import { option, some, none } from 'fp-ts/lib/Option'
 *
 * const sequenceTOption = sequenceT(option)
 * assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
 * assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
 * assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)
 *
 * @since 1.5.0
 */
export declare function sequenceT<F extends URIS3>(F: Apply3<F>): <U, L, T extends Array<Type3<F, U, L, any>>>(...t: T & {
    0: Type3<F, U, L, any>;
}) => Type3<F, U, L, {
    [K in keyof T]: [T[K]] extends [Type3<F, U, L, infer A>] ? A : never;
}>;
export declare function sequenceT<F extends URIS3, U, L>(F: Apply3C<F, U, L>): <T extends Array<Type3<F, U, L, any>>>(...t: T & {
    0: Type3<F, U, L, any>;
}) => Type3<F, U, L, {
    [K in keyof T]: [T[K]] extends [Type3<F, U, L, infer A>] ? A : never;
}>;
export declare function sequenceT<F extends URIS2>(F: Apply2<F>): <L, T extends Array<Type2<F, L, any>>>(...t: T & {
    0: Type2<F, L, any>;
}) => Type2<F, L, {
    [K in keyof T]: [T[K]] extends [Type2<F, L, infer A>] ? A : never;
}>;
export declare function sequenceT<F extends URIS2, L>(F: Apply2C<F, L>): <T extends Array<Type2<F, L, any>>>(...t: T & {
    0: Type2<F, L, any>;
}) => Type2<F, L, {
    [K in keyof T]: [T[K]] extends [Type2<F, L, infer A>] ? A : never;
}>;
export declare function sequenceT<F extends URIS>(F: Apply1<F>): <T extends Array<Type<F, any>>>(...t: T & {
    0: Type<F, any>;
}) => Type<F, {
    [K in keyof T]: [T[K]] extends [Type<F, infer A>] ? A : never;
}>;
export declare function sequenceT<F>(F: Apply<F>): <T extends Array<HKT<F, any>>>(...t: T & {
    0: HKT<F, any>;
}) => HKT<F, {
    [K in keyof T]: [T[K]] extends [HKT<F, infer A>] ? A : never;
}>;
declare type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;
/**
 * Like `Apply.sequenceT` but works with structs instead of tuples.
 *
 * @example
 * import { either, right, left } from 'fp-ts/lib/Either'
 * import { sequenceS } from 'fp-ts/lib/Apply'
 *
 * const ado = sequenceS(either)
 *
 * assert.deepStrictEqual(
 *   ado({
 *     a: right<string, number>(1),
 *     b: right<string, boolean>(true)
 *   }),
 *   right({ a: 1, b: true })
 * )
 * assert.deepStrictEqual(
 *   ado({
 *     a: right<string, number>(1),
 *     b: left<string, number>('error')
 *   }),
 *   left('error')
 * )
 *
 * @since 1.15.0
 */
export declare function sequenceS<F extends URIS3>(F: Apply3<F>): <U, L, R extends Record<string, Type3<F, U, L, any>>>(r: EnforceNonEmptyRecord<R> & Record<string, Type3<F, U, L, any>>) => Type3<F, U, L, {
    [K in keyof R]: [R[K]] extends [Type3<F, any, any, infer A>] ? A : never;
}>;
export declare function sequenceS<F extends URIS3, U, L>(F: Apply3C<F, U, L>): <R extends Record<string, Type3<F, U, L, any>>>(r: EnforceNonEmptyRecord<R>) => Type3<F, U, L, {
    [K in keyof R]: [R[K]] extends [Type3<F, any, any, infer A>] ? A : never;
}>;
export declare function sequenceS<F extends URIS2>(F: Apply2<F>): <L, R extends Record<string, Type2<F, L, any>>>(r: EnforceNonEmptyRecord<R> & Record<string, Type2<F, L, any>>) => Type2<F, L, {
    [K in keyof R]: [R[K]] extends [Type2<F, any, infer A>] ? A : never;
}>;
export declare function sequenceS<F extends URIS2, L>(F: Apply2C<F, L>): <R extends Record<string, Type2<F, L, any>>>(r: EnforceNonEmptyRecord<R>) => Type2<F, L, {
    [K in keyof R]: [R[K]] extends [Type2<F, any, infer A>] ? A : never;
}>;
export declare function sequenceS<F extends URIS>(F: Apply1<F>): <R extends Record<string, Type<F, any>>>(r: EnforceNonEmptyRecord<R>) => Type<F, {
    [K in keyof R]: [R[K]] extends [Type<F, infer A>] ? A : never;
}>;
export declare function sequenceS<F>(F: Apply<F>): <R extends Record<string, HKT<F, any>>>(r: EnforceNonEmptyRecord<R>) => HKT<F, {
    [K in keyof R]: [R[K]] extends [HKT<F, infer A>] ? A : never;
}>;
export {};
