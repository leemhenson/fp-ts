import { Functor2, Functor3, Functor4 } from './Functor';
import { HKT2, Type2, Type3, Type4, URIS2, URIS3, URIS4 } from './HKTv14_1';
/**
 * @typeclass
 * @since 1.0.0
 */
export interface Profunctor<F> {
    readonly URI: F;
    readonly map: <L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B) => HKT2<F, L, B>;
    readonly promap: <A, B, C, D>(fbc: HKT2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => HKT2<F, A, D>;
}
export interface Profunctor2<F extends URIS2> extends Functor2<F> {
    readonly promap: <A, B, C, D>(fbc: Type2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => Type2<F, A, D>;
}
export interface Profunctor3<F extends URIS3> extends Functor3<F> {
    readonly promap: <U, A, B, C, D>(fbc: Type3<F, U, B, C>, f: (a: A) => B, g: (c: C) => D) => Type3<F, U, A, D>;
}
export interface Profunctor4<F extends URIS4> extends Functor4<F> {
    readonly promap: <X, U, A, B, C, D>(fbc: Type4<F, X, U, B, C>, f: (a: A) => B, g: (c: C) => D) => Type4<F, X, U, A, D>;
}
/**
 * @since 1.0.0
 */
export declare function lmap<F extends URIS3>(profunctor: Profunctor3<F>): <U, A, B, C>(fbc: Type3<F, U, B, C>, f: (a: A) => B) => Type3<F, U, A, C>;
export declare function lmap<F extends URIS2>(profunctor: Profunctor2<F>): <A, B, C>(fbc: Type2<F, B, C>, f: (a: A) => B) => Type2<F, A, C>;
export declare function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C>;
/**
 * @since 1.0.0
 */
export declare function rmap<F extends URIS3>(profunctor: Profunctor3<F>): <U, B, C, D>(fbc: Type3<F, U, B, C>, g: (c: C) => D) => Type3<F, U, B, D>;
export declare function rmap<F extends URIS2>(profunctor: Profunctor2<F>): <B, C, D>(fbc: Type2<F, B, C>, g: (c: C) => D) => Type2<F, B, D>;
export declare function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D>;
