import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative';
import { Endomorphism } from './function';
import { Functor, Functor1, Functor2, Functor3 } from './Functor';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monad, Monad1, Monad2, Monad3 } from './Monad';
import { State } from './State';
export interface StateT<M> {
    readonly map: <S, A, B>(fa: (s: S) => HKT<M, [A, S]>, f: (a: A) => B) => (s: S) => HKT<M, [B, S]>;
    readonly of: <S, A>(a: A) => (s: S) => HKT<M, [A, S]>;
    readonly ap: <S, A, B>(fab: (s: S) => HKT<M, [(a: A) => B, S]>, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => HKT<M, [B, S]>;
    readonly chain: <S, A, B>(fa: (s: S) => HKT<M, [A, S]>, f: (a: A) => (s: S) => HKT<M, [B, S]>) => (s: S) => HKT<M, [B, S]>;
}
export interface StateT1<M extends URIS> {
    readonly map: <S, A, B>(fa: (s: S) => Type<M, [A, S]>, f: (a: A) => B) => (s: S) => Type<M, [B, S]>;
    readonly of: <S, A>(a: A) => (s: S) => Type<M, [A, S]>;
    readonly ap: <S, A, B>(fab: (s: S) => Type<M, [(a: A) => B, S]>, fa: (s: S) => Type<M, [A, S]>) => (s: S) => Type<M, [B, S]>;
    readonly chain: <S, A, B>(fa: (s: S) => Type<M, [A, S]>, f: (a: A) => (s: S) => Type<M, [B, S]>) => (s: S) => Type<M, [B, S]>;
}
export interface StateT2<M extends URIS2> {
    readonly map: <L, S, A, B>(fa: (s: S) => Type2<M, L, [A, S]>, f: (a: A) => B) => (s: S) => Type2<M, L, [B, S]>;
    readonly of: <L, S, A>(a: A) => (s: S) => Type2<M, L, [A, S]>;
    readonly ap: <L, S, A, B>(fab: (s: S) => Type2<M, L, [(a: A) => B, S]>, fa: (s: S) => Type2<M, L, [A, S]>) => (s: S) => Type2<M, L, [B, S]>;
    readonly chain: <L, S, A, B>(fa: (s: S) => Type2<M, L, [A, S]>, f: (a: A) => (s: S) => Type2<M, L, [B, S]>) => (s: S) => Type2<M, L, [B, S]>;
}
export interface StateT3<M extends URIS3> {
    readonly map: <U, L, S, A, B>(fa: (s: S) => Type3<M, U, L, [A, S]>, f: (a: A) => B) => (s: S) => Type3<M, U, L, [B, S]>;
    readonly of: <U, L, S, A>(a: A) => (s: S) => Type3<M, U, L, [A, S]>;
    readonly ap: <U, L, S, A, B>(fab: (s: S) => Type3<M, U, L, [(a: A) => B, S]>, fa: (s: S) => Type3<M, U, L, [A, S]>) => (s: S) => Type3<M, U, L, [B, S]>;
    readonly chain: <U, L, S, A, B>(fa: (s: S) => Type3<M, U, L, [A, S]>, f: (a: A) => (s: S) => Type3<M, U, L, [B, S]>) => (s: S) => Type3<M, U, L, [B, S]>;
}
/**
 * @since 1.14.0
 */
export declare function get<F extends URIS3>(F: Applicative3<F>): <S, U, L>(s: S) => Type3<F, U, L, [S, S]>;
export declare function get<F extends URIS2>(F: Applicative2<F>): <S, L>(s: S) => Type2<F, L, [S, S]>;
export declare function get<F extends URIS>(F: Applicative1<F>): <S>(s: S) => Type<F, [S, S]>;
export declare function get<F>(F: Applicative<F>): <S>(s: S) => HKT<F, [S, S]>;
/**
 * @since 1.0.0
 */
export declare function put<F extends URIS3>(F: Applicative3<F>): <S>(s: S) => <U, L>() => Type3<F, U, L, [void, S]>;
export declare function put<F extends URIS2>(F: Applicative2<F>): <S>(s: S) => <L>() => Type2<F, L, [void, S]>;
export declare function put<F extends URIS>(F: Applicative1<F>): <S>(s: S) => () => Type<F, [void, S]>;
export declare function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>;
/**
 * @since 1.0.0
 */
export declare function modify<F extends URIS3>(F: Applicative3<F>): <S>(f: Endomorphism<S>) => <U, L>(s: S) => Type3<F, U, L, [void, S]>;
export declare function modify<F extends URIS2>(F: Applicative2<F>): <S>(f: Endomorphism<S>) => <L>(s: S) => Type2<F, L, [void, S]>;
export declare function modify<F extends URIS>(F: Applicative1<F>): <S>(f: Endomorphism<S>) => (s: S) => Type<F, [void, S]>;
export declare function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>;
/**
 * @since 1.0.0
 */
export declare function gets<F extends URIS3>(F: Applicative3<F>): <S, A>(f: (s: S) => A) => <U, L>(s: S) => Type3<F, U, L, [A, S]>;
export declare function gets<F extends URIS2>(F: Applicative2<F>): <S, A>(f: (s: S) => A) => <L>(s: S) => Type2<F, L, [A, S]>;
export declare function gets<F extends URIS>(F: Applicative1<F>): <S, A>(f: (s: S) => A) => (s: S) => Type<F, [A, S]>;
export declare function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>;
/**
 * @since 1.2.0
 */
export declare function fromState<F extends URIS3>(F: Applicative3<F>): <S, A, U, L>(fa: State<S, A>) => (s: S) => Type3<F, U, L, [A, S]>;
export declare function fromState<F extends URIS2>(F: Applicative2<F>): <S, A, L>(fa: State<S, A>) => (s: S) => Type2<F, L, [A, S]>;
export declare function fromState<F extends URIS>(F: Applicative1<F>): <S, A>(fa: State<S, A>) => (s: S) => Type<F, [A, S]>;
export declare function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>;
/**
 * @since 1.2.0
 */
export declare function liftF<F extends URIS3>(F: Functor3<F>): <U, L, S, A>(fa: Type3<F, U, L, A>) => (s: S) => Type3<F, U, L, [A, S]>;
export declare function liftF<F extends URIS2>(F: Functor2<F>): <L, S, A>(fa: Type2<F, L, A>) => (s: S) => Type2<F, L, [A, S]>;
export declare function liftF<F extends URIS>(F: Functor1<F>): <S, A>(fa: Type<F, A>) => (s: S) => Type<F, [A, S]>;
export declare function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>;
/**
 * @since 1.14.0
 */
export declare function getStateT<M extends URIS3>(M: Monad3<M>): StateT3<M>;
export declare function getStateT<M extends URIS2>(M: Monad2<M>): StateT2<M>;
export declare function getStateT<M extends URIS>(M: Monad1<M>): StateT1<M>;
export declare function getStateT<M>(M: Monad<M>): StateT<M>;
