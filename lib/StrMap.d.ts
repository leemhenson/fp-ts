import { Compactable1, Separated } from './Compactable';
import { Either } from './Either';
import { FilterableWithIndex1 } from './FilterableWithIndex';
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable';
import { FoldableWithIndex1 } from './FoldableWithIndex';
import { Predicate, Refinement } from './function';
import { FunctorWithIndex1 } from './FunctorWithIndex';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Semigroup } from './Semigroup';
import { Setoid } from './Setoid';
import { Show } from './Show';
import { TraversableWithIndex1 } from './TraversableWithIndex';
import { Unfoldable, Unfoldable1 } from './Unfoldable';
import { Witherable1 } from './Witherable';
declare module './HKT' {
    interface URI2HKT<A> {
        StrMap: StrMap<A>;
    }
}
export declare const URI = "StrMap";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor StrMap
 * @since 1.0.0
 */
export declare class StrMap<A> {
    readonly value: {
        [key: string]: A;
    };
    constructor(value: {
        [key: string]: A;
    });
    mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B>;
    map<B>(f: (a: A) => B): StrMap<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /**
     * @since 1.12.0
     */
    foldr<B>(b: B, f: (a: A, b: B) => B): B;
    /**
     * @since 1.12.0
     */
    reduceWithKey<B>(b: B, f: (k: string, b: B, a: A) => B): B;
    /**
     * @since 1.12.0
     */
    foldrWithKey<B>(b: B, f: (k: string, a: A, b: B) => B): B;
    /**
     * @since 1.4.0
     */
    filter<B extends A>(p: Refinement<A, B>): StrMap<B>;
    filter(p: Predicate<A>): StrMap<A>;
    /**
     * @since 1.12.0
     */
    filterMap<B>(f: (a: A) => Option<B>): StrMap<B>;
    /**
     * @since 1.12.0
     */
    partition(p: Predicate<A>): Separated<StrMap<A>, StrMap<A>>;
    /**
     * @since 1.12.0
     */
    partitionMap<RL, RR>(f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>;
    /**
     * @since 1.12.0
     */
    separate<RL, RR>(this: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>>;
    /**
     * @since 1.14.0
     */
    partitionMapWithKey<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>;
    /**
     * @since 1.14.0
     */
    partitionWithKey(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>>;
    /**
     * @since 1.14.0
     */
    filterMapWithKey<B>(f: (i: string, a: A) => Option<B>): StrMap<B>;
    /**
     * @since 1.14.0
     */
    filterWithKey(p: (i: string, a: A) => boolean): StrMap<A>;
    /**
     * @since 1.14.0
     */
    every(predicate: (a: A) => boolean): boolean;
    /**
     * @since 1.14.0
     */
    some(predicate: (a: A) => boolean): boolean;
}
/**
 * @since 1.17.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<StrMap<A>>;
/**
 *
 * @since 1.0.0
 */
export declare const getMonoid: <A = never>(S?: Semigroup<A>) => Monoid<StrMap<A>>;
/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 *
 * @since 1.0.0
 */
export declare const isSubdictionary: <A>(S: Setoid<A>) => (d1: StrMap<A>, d2: StrMap<A>) => boolean;
/**
 * Calculate the number of key/value pairs in a dictionary
 *
 * @since 1.0.0
 */
export declare const size: <A>(d: StrMap<A>) => number;
/**
 * Test whether a dictionary is empty
 *
 * @since 1.0.0
 */
export declare const isEmpty: <A>(d: StrMap<A>) => boolean;
/**
 *
 * @since 1.0.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<StrMap<A>>;
/**
 * Create a dictionary with one key/value pair
 *
 * @since 1.0.0
 */
export declare const singleton: <A>(k: string, a: A) => StrMap<A>;
/**
 * Lookup the value for a key in a dictionary
 *
 * @since 1.0.0
 */
export declare const lookup: <A>(k: string, d: StrMap<A>) => Option<A>;
/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.0.0
 */
export declare function fromFoldable<F extends URIS3>(F: Foldable3<F>): <U, L, A>(ta: Type3<F, U, L, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>;
export declare function fromFoldable<F extends URIS2>(F: Foldable2<F>): <L, A>(ta: Type2<F, L, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>;
export declare function fromFoldable<F extends URIS>(F: Foldable1<F>): <A>(ta: Type<F, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>;
export declare function fromFoldable<F>(F: Foldable<F>): <A>(ta: HKT<F, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>;
/**
 *
 * @since 1.0.0
 */
export declare const collect: <A, B>(d: StrMap<A>, f: (k: string, a: A) => B) => B[];
/**
 *
 * @since 1.0.0
 */
export declare const toArray: <A>(d: StrMap<A>) => [string, A][];
/**
 * Unfolds a dictionary into a list of key/value pairs
 *
 * @since 1.0.0
 */
export declare function toUnfoldable<F extends URIS>(U: Unfoldable1<F>): (<A>(d: StrMap<A>) => Type<F, [string, A]>);
export declare function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>);
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.0.0
 */
export declare const insert: <A>(k: string, a: A, d: StrMap<A>) => StrMap<A>;
/**
 * Delete a key and value from a map
 *
 * @since 1.0.0
 */
export declare const remove: <A>(k: string, d: StrMap<A>) => StrMap<A>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.0.0
 */
export declare const pop: <A>(k: string, d: StrMap<A>) => Option<[A, StrMap<A>]>;
/**
 * @since 1.14.0
 */
export declare function elem<A>(S: Setoid<A>): (a: A, fa: StrMap<A>) => boolean;
/**
 * @since 1.0.0
 */
export declare const strmap: FunctorWithIndex1<URI, string> & Foldable1<URI> & TraversableWithIndex1<URI, string> & Compactable1<URI> & FilterableWithIndex1<URI, string> & Witherable1<URI> & FoldableWithIndex1<URI, string>;
