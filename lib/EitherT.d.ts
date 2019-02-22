import { Applicative, Applicative1, Applicative2, ApplicativeComposition, ApplicativeComposition12, ApplicativeComposition22 } from './Applicative';
import { Either, URI } from './Either';
import { Functor, Functor1, Functor2 } from './Functor';
import { HKT, Type, Type2, URIS, URIS2 } from './HKT';
import { Monad, Monad1, Monad2 } from './Monad';
export interface EitherT<F> extends ApplicativeComposition<F, URI> {
    readonly chain: <L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>) => HKT<F, Either<L, B>>;
}
export interface EitherT1<F extends URIS> extends ApplicativeComposition12<F, URI> {
    readonly chain: <L, A, B>(f: (a: A) => Type<F, Either<L, B>>, fa: Type<F, Either<L, A>>) => Type<F, Either<L, B>>;
}
export interface EitherT2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
    readonly chain: <L, M, A, B>(f: (a: A) => Type2<F, M, Either<L, B>>, fa: Type2<F, M, Either<L, A>>) => Type2<F, M, Either<L, B>>;
}
/**
 * @since 1.0.0
 */
export declare function chain<F extends URIS2>(F: Monad2<F>): EitherT2<F>['chain'];
export declare function chain<F extends URIS>(F: Monad1<F>): EitherT1<F>['chain'];
export declare function chain<F>(F: Monad<F>): EitherT<F>['chain'];
/**
 * @since 1.0.0
 */
export declare function right<F extends URIS2>(F: Functor2<F>): <L, M, A>(fa: Type2<F, M, A>) => Type2<F, M, Either<L, A>>;
export declare function right<F extends URIS>(F: Functor1<F>): <L, A>(fa: Type<F, A>) => Type<F, Either<L, A>>;
export declare function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>;
/**
 * @since 1.0.0
 */
export declare function left<F extends URIS2>(F: Functor2<F>): <L, M, A>(fl: Type2<F, M, L>) => Type2<F, M, Either<L, A>>;
export declare function left<F extends URIS>(F: Functor1<F>): <L, A>(fl: Type<F, L>) => Type<F, Either<L, A>>;
export declare function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>;
/**
 * @since 1.0.0
 */
export declare function fromEither<F extends URIS2>(F: Applicative2<F>): <L, M, A>(fa: Either<L, A>) => Type2<F, M, Either<L, A>>;
export declare function fromEither<F extends URIS>(F: Applicative1<F>): <L, A>(fa: Either<L, A>) => Type<F, Either<L, A>>;
export declare function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>;
/**
 * @since 1.0.0
 */
export declare function fold<F extends URIS2>(F: Functor2<F>): <R, L, M, A>(left: (l: L) => R, right: (a: A) => R, fa: Type2<F, M, Either<L, A>>) => Type2<F, M, R>;
export declare function fold<F extends URIS>(F: Functor1<F>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: Type<F, Either<L, A>>) => Type<F, R>;
export declare function fold<F>(F: Functor<F>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>;
/**
 * @since 1.0.0
 */
export declare function mapLeft<F extends URIS2>(F: Functor2<F>): <N, L, M>(f: (l: L) => N) => <A>(fa: Type2<F, M, Either<L, A>>) => Type2<F, M, Either<N, A>>;
export declare function mapLeft<F extends URIS>(F: Functor1<F>): <N, L>(f: (l: L) => N) => <A>(fa: Type<F, Either<L, A>>) => Type<F, Either<N, A>>;
export declare function mapLeft<F>(F: Functor<F>): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>;
/**
 * @since 1.2.0
 */
export declare function bimap<F extends URIS2>(F: Functor2<F>): <M, L, V, A, B>(fa: Type2<F, M, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => Type2<F, M, Either<V, B>>;
export declare function bimap<F extends URIS>(F: Functor1<F>): <L, V, A, B>(fa: Type<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => Type<F, Either<V, B>>;
export declare function bimap<F>(F: Functor<F>): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>;
/**
 * @since 1.0.0
 */
export declare function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>;
export declare function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>;
export declare function getEitherT<M>(M: Monad<M>): EitherT<M>;