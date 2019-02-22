import { FilterableWithIndex2C } from './FilterableWithIndex';
import { Foldable2v3, Foldable2v2, Foldable2v1, Foldable2v } from './Foldable2v';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monoid } from './Monoid';
import { Option } from './Option_';
import { Ord } from './Ord';
import { Setoid } from './Setoid';
import { TraversableWithIndex2C } from './TraversableWithIndex';
import { Unfoldable, Unfoldable1 } from './Unfoldable';
import { Semigroup } from './Semigroup_';
import { Witherable2C } from './Witherable';
import { Filterable2 } from './Filterable_';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Map: Map<L, A>;
    }
}
export declare const URI = "Map";
export declare type URI = typeof URI;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 1.14.0
 */
export declare const size: <K, A>(d: Map<K, A>) => number;
/**
 * Test whether or not a map is empty
 *
 * @since 1.14.0
 */
export declare const isEmpty: <K, A>(d: Map<K, A>) => boolean;
/**
 * Test whether or not a key exists in a map
 *
 * @since 1.14.0
 */
export declare const member: <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>) => boolean;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 1.14.0
 */
export declare const elem: <A>(S: Setoid<A>) => <K>(a: A, m: Map<K, A>) => boolean;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 1.14.0
 */
export declare const keys: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => K[];
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 1.14.0
 */
export declare const values: <A>(O: Ord<A>) => <K>(m: Map<K, A>) => A[];
/**
 * @since 1.14.0
 */
export declare const collect: <K>(O: Ord<K>) => <A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => B[];
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 1.14.0
 */
export declare const toArray: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => [K, A][];
/**
 * Unfolds a map into a list of key/value pairs
 *
 * @since 1.14.0
 */
export declare function toUnfoldable<K, F extends URIS>(O: Ord<K>, unfoldable: Unfoldable1<F>): <A>(d: Map<K, A>) => Type<F, [K, A]>;
export declare function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.14.0
 */
export declare const insert: <K>(S: Setoid<K>) => <A>(k: K, a: A, m: Map<K, A>) => Map<K, A>;
/**
 * Delete a key and value from a map
 *
 * @since 1.14.0
 */
export declare const remove: <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>) => Map<K, A>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.14.0
 */
export declare const pop: <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 1.14.0
 */
export declare const lookupWithKey: <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>) => Option<[K, A]>;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 1.14.0
 */
export declare const lookup: <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>) => Option<A>;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 1.14.0
 */
export declare const isSubmap: <K, A>(SK: Setoid<K>, SA: Setoid<A>) => (d1: Map<K, A>, d2: Map<K, A>) => boolean;
/**
 * @since 1.14.0
 */
export declare const empty: Map<never, never>;
/**
 * @since 1.14.0
 */
export declare const getSetoid: <K, A>(SK: Setoid<K>, SA: Setoid<A>) => Setoid<Map<K, A>>;
/**
 * Gets {@link Monoid} instance for Maps given {@link Semigroup} instance for their values
 *
 * @since 1.14.0
 */
export declare const getMonoid: <K, A>(SK: Setoid<K>, SA: Semigroup<A>) => Monoid<Map<K, A>>;
/**
 * Create a map with one key/value pair
 *
 * @since 1.14.0
 */
export declare const singleton: <K, A>(k: K, a: A) => Map<K, A>;
/**
 * Create a map from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.14.0
 */
export declare function fromFoldable<K, F extends URIS3>(S: Setoid<K>, F: Foldable2v3<F>): <U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>;
export declare function fromFoldable<K, F extends URIS2>(S: Setoid<K>, F: Foldable2v2<F>): <L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>;
export declare function fromFoldable<K, F extends URIS>(S: Setoid<K>, F: Foldable2v1<F>): <A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>;
export declare function fromFoldable<K, F>(S: Setoid<K>, F: Foldable2v<F>): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>;
/**
 * @since 1.14.0
 */
export declare const getFilterableWithIndex: <K>() => FilterableWithIndex2C<"Map", K, K>;
/**
 * @since 1.14.0
 */
export declare const getWitherable: <K>(O: Ord<K>) => Witherable2C<"Map", K>;
/**
 * @since 1.14.0
 */
export declare const getTraversableWithIndex: <K>(O: Ord<K>) => TraversableWithIndex2C<"Map", K, K>;
/**
 * @since 1.14.0
 */
export declare const map: Filterable2<URI>;
