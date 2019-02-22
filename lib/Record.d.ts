import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative';
import { Separated } from './Compactable_';
import { Either } from './Either_';
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable';
import { Predicate, Refinement } from './function';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monoid } from './Monoid';
import { Option } from './Option_';
import { Setoid } from './Setoid';
import { Unfoldable, Unfoldable1 } from './Unfoldable';
import { Semigroup } from './Semigroup_';
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 1.10.0
 */
export declare const size: <A>(d: Record<string, A>) => number;
/**
 * Test whether a record is empty
 *
 * @since 1.10.0
 */
export declare const isEmpty: <A>(d: Record<string, A>) => boolean;
/**
 * @since 1.10.0
 */
export declare function collect<K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B>;
export declare function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>;
/**
 * @since 1.10.0
 */
export declare function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]>;
export declare function toArray<A>(d: Record<string, A>): Array<[string, A]>;
/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 1.10.0
 */
export declare function toUnfoldable<F extends URIS>(unfoldable: Unfoldable1<F>): <K extends string, A>(d: Record<K, A>) => Type<F, [K, A]>;
export declare function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]>;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.10.0
 */
export declare function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>;
export declare function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>;
/**
 * Delete a key and value from a map
 *
 * @since 1.10.0
 */
export declare function remove<KS extends string, K extends string, A>(k: K, d: Record<KS, A>): Record<string extends K ? string : Exclude<KS, K>, A>;
export declare function remove<A>(k: string, d: Record<string, A>): Record<string, A>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.10.0
 */
export declare const pop: <A>(k: string, d: Record<string, A>) => Option<[A, Record<string, A>]>;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 1.14.0
 */
export declare const isSubrecord: <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>) => boolean;
/**
 * Use {@link isSubrecord} instead
 * @since 1.10.0
 * @deprecated
 */
export declare const isSubdictionary: <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>) => boolean;
/**
 * @since 1.10.0
 */
export declare function getSetoid<K extends string, A>(S: Setoid<A>): Setoid<Record<K, A>>;
export declare function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>>;
/**
 * Returns a {@link Semigroup} instance for records given a {@link Semigroup} instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/Record'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @since 1.10.0
 */
export declare function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>;
export declare function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>>;
/**
 * Lookup the value for a key in a dictionary
 * @since 1.10.0
 */
export declare const lookup: <A>(key: string, fa: Record<string, A>) => Option<A>;
/**
 * @since 1.10.0
 */
export declare function filter<A, B extends A>(fa: Record<string, A>, p: Refinement<A, B>): Record<string, B>;
export declare function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>;
/**
 * @since 1.10.0
 */
export declare const empty: Record<string, never>;
/**
 * @since 1.10.0
 */
export declare function mapWithKey<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>;
export declare function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>;
/**
 * @since 1.10.0
 */
export declare function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>;
export declare function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>;
/**
 * @since 1.10.0
 */
export declare const reduce: <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * @since 1.10.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (a: A) => M) => M;
/**
 * @since 1.10.0
 */
export declare const foldr: <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B) => B;
/**
 * @since 1.12.0
 */
export declare function reduceWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B;
export declare function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B;
/**
 * @since 1.12.0
 */
export declare const foldMapWithKey: <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M) => M;
/**
 * @since 1.12.0
 */
export declare function foldrWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B;
export declare function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B;
/**
 * Create a dictionary with one key/value pair
 *
 * @since 1.10.0
 */
export declare const singleton: <K extends string, A>(k: K, a: A) => Record<K, A>;
/**
 * @since 1.10.0
 */
export declare function traverseWithKey<F extends URIS3>(F: Applicative3<F>): <U, L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>;
export declare function traverseWithKey<F extends URIS2>(F: Applicative2<F>): <L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>;
export declare function traverseWithKey<F extends URIS>(F: Applicative1<F>): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type<F, B>) => Type<F, Record<string, B>>;
export declare function traverseWithKey<F>(F: Applicative<F>): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>;
/**
 * @since 1.10.0
 */
export declare function traverse<F extends URIS3>(F: Applicative3<F>): <U, L, A, B>(ta: Record<string, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>;
export declare function traverse<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): <A, B>(ta: Record<string, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>;
export declare function traverse<F extends URIS2>(F: Applicative2<F>): <L, A, B>(ta: Record<string, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>;
export declare function traverse<F extends URIS2, L>(F: Applicative2C<F, L>): <A, B>(ta: Record<string, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>;
export declare function traverse<F extends URIS>(F: Applicative1<F>): <A, B>(ta: Record<string, A>, f: (a: A) => Type<F, B>) => Type<F, Record<string, B>>;
export declare function traverse<F>(F: Applicative<F>): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>;
/**
 * @since 1.10.0
 */
export declare function sequence<F extends URIS3>(F: Applicative3<F>): <U, L, A>(ta: Record<string, Type3<F, U, L, A>>) => Type3<F, U, L, Record<string, A>>;
export declare function sequence<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): <A>(ta: Record<string, Type3<F, U, L, A>>) => Type3<F, U, L, Record<string, A>>;
export declare function sequence<F extends URIS2>(F: Applicative2<F>): <L, A>(ta: Record<string, Type2<F, L, A>>) => Type2<F, L, Record<string, A>>;
export declare function sequence<F extends URIS2, L>(F: Applicative2C<F, L>): <A>(ta: Record<string, Type2<F, L, A>>) => Type2<F, L, Record<string, A>>;
export declare function sequence<F extends URIS>(F: Applicative1<F>): <A>(ta: Record<string, Type<F, A>>) => Type<F, Record<string, A>>;
export declare function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>;
/**
 * @since 1.10.0
 */
export declare const compact: <A>(fa: Record<string, Option<A>>) => Record<string, A>;
/**
 * @since 1.10.0
 */
export declare const partitionMap: <RL, RR, A>(fa: Record<string, A>, f: (a: A) => Either<RL, RR>) => Separated<Record<string, RL>, Record<string, RR>>;
/**
 * @since 1.10.0
 */
export declare const partition: <A>(fa: Record<string, A>, p: Predicate<A>) => Separated<Record<string, A>, Record<string, A>>;
/**
 * @since 1.10.0
 */
export declare const separate: <RL, RR>(fa: Record<string, Either<RL, RR>>) => Separated<Record<string, RL>, Record<string, RR>>;
/**
 * @since 1.10.0
 */
export declare function wither<F extends URIS3>(F: Applicative3<F>): (<U, L, A, B>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Record<string, B>>);
export declare function wither<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): (<A, B>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Record<string, B>>);
export declare function wither<F extends URIS2>(F: Applicative2<F>): (<L, A, B>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Record<string, B>>);
export declare function wither<F extends URIS2, L>(F: Applicative2C<F, L>): (<A, B>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Record<string, B>>);
export declare function wither<F extends URIS>(F: Applicative1<F>): (<A, B>(wa: Record<string, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Record<string, B>>);
export declare function wither<F>(F: Applicative<F>): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>);
/**
 * @since 1.10.0
 */
export declare function wilt<F extends URIS3>(F: Applicative3<F>): (<U, L, RL, RR, A>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Either<RL, RR>>) => Type3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>);
export declare function wilt<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): (<RL, RR, A>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Either<RL, RR>>) => Type3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>);
export declare function wilt<F extends URIS2>(F: Applicative2<F>): (<L, RL, RR, A>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Either<RL, RR>>) => Type2<F, L, Separated<Record<string, RL>, Record<string, RR>>>);
export declare function wilt<F extends URIS2, L>(F: Applicative2C<F, L>): (<RL, RR, A>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Either<RL, RR>>) => Type2<F, L, Separated<Record<string, RL>, Record<string, RR>>>);
export declare function wilt<F extends URIS>(F: Applicative1<F>): (<RL, RR, A>(wa: Record<string, A>, f: (a: A) => Type<F, Either<RL, RR>>) => Type<F, Separated<Record<string, RL>, Record<string, RR>>>);
export declare function wilt<F>(F: Applicative<F>): (<RL, RR, A>(wa: Record<string, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>);
/**
 * @since 1.10.0
 */
export declare const filterMap: <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>) => Record<string, B>;
/**
 * @since 1.14.0
 */
export declare function partitionMapWithKey<K extends string, RL, RR, A>(fa: Record<K, A>, f: (key: K, a: A) => Either<RL, RR>): Separated<Record<string, RL>, Record<string, RR>>;
export declare function partitionMapWithKey<RL, RR, A>(fa: Record<string, A>, f: (key: string, a: A) => Either<RL, RR>): Separated<Record<string, RL>, Record<string, RR>>;
/**
 * @since 1.14.0
 */
export declare function partitionWithKey<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Separated<Record<string, A>, Record<string, A>>;
export declare function partitionWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Separated<Record<string, A>, Record<string, A>>;
/**
 * @since 1.14.0
 */
export declare function filterMapWithKey<K extends string, A, B>(fa: Record<K, A>, f: (key: K, a: A) => Option<B>): Record<string, B>;
export declare function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>;
/**
 * @since 1.14.0
 */
export declare function filterWithKey<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>;
export declare function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>;
/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.10.0
 */
export declare function fromFoldable<F extends URIS3>(F: Foldable3<F>): <K extends string, U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>;
export declare function fromFoldable<F extends URIS2>(F: Foldable2<F>): <K extends string, L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>;
export declare function fromFoldable<F extends URIS>(F: Foldable1<F>): <K extends string, A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>;
export declare function fromFoldable<F>(F: Foldable<F>): <K extends string, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>;
/**
 * @since 1.14.0
 */
export declare function every<A>(fa: {
    [key: string]: A;
}, predicate: (a: A) => boolean): boolean;
/**
 * @since 1.14.0
 */
export declare function some<A>(fa: {
    [key: string]: A;
}, predicate: (a: A) => boolean): boolean;
/**
 * @since 1.14.0
 */
export declare function elem<A>(S: Setoid<A>): (a: A, fa: {
    [key: string]: A;
}) => boolean;
/**
 * Use {@link partitionMapWithKey} instead
 * @since 1.12.0
 * @deprecated
 */
export declare function partitionMapWithIndex<K extends string, RL, RR, A>(fa: Record<K, A>, f: (key: K, a: A) => Either<RL, RR>): Separated<Record<string, RL>, Record<string, RR>>;
export declare function partitionMapWithIndex<RL, RR, A>(fa: Record<string, A>, f: (key: string, a: A) => Either<RL, RR>): Separated<Record<string, RL>, Record<string, RR>>;
/**
 * Use {@link partitionWithKey} instead
 * @since 1.12.0
 * @deprecated
 */
export declare function partitionWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Separated<Record<string, A>, Record<string, A>>;
export declare function partitionWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Separated<Record<string, A>, Record<string, A>>;
/**
 * Use {@link filterMapWithKey} instead
 * @since 1.12.0
 * @deprecated
 */
export declare function filterMapWithIndex<K extends string, A, B>(fa: Record<K, A>, f: (key: K, a: A) => Option<B>): Record<string, B>;
export declare function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>;
/**
 * Use {@link filterWithKey} instead
 * @since 1.12.0
 * @deprecated
 */
export declare function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>;
export declare function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>;