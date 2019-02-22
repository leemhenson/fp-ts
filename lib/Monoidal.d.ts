import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative';
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
/**
 * Applicative functors are equivalent to strong lax monoidal functors
 *
 * - https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
 * - https://bartoszmilewski.com/2017/02/06/applicative-functors/
 *
 * @typeclass
 * @since 1.0.0
 */
export interface Monoidal<F> extends Functor<F> {
    readonly unit: () => HKT<F, void>;
    readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>;
}
export interface Monoidal1<F extends URIS> extends Functor1<F> {
    readonly unit: () => Type<F, void>;
    readonly mult: <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, [A, B]>;
}
export interface Monoidal2<F extends URIS2> extends Functor2<F> {
    readonly unit: <L>() => Type2<F, L, void>;
    readonly mult: <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>;
}
export interface Monoidal3<F extends URIS3> extends Functor3<F> {
    readonly unit: <U, L>() => Type3<F, U, L, void>;
    readonly mult: <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [A, B]>;
}
export interface Monoidal2C<F extends URIS2, L> extends Functor2C<F, L> {
    readonly unit: () => Type2<F, L, void>;
    readonly mult: <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>;
}
export interface Monoidal3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
    readonly unit: () => Type3<F, U, L, void>;
    readonly mult: <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [A, B]>;
}
/**
 * @since 1.0.0
 */
export declare function fromApplicative<F extends URIS3>(applicative: Applicative3<F>): Monoidal3<F>;
export declare function fromApplicative<F extends URIS2>(applicative: Applicative2<F>): Monoidal2<F>;
export declare function fromApplicative<F extends URIS>(applicative: Applicative1<F>): Monoidal1<F>;
export declare function fromApplicative<F>(applicative: Applicative<F>): Monoidal<F>;
/**
 * @since 1.0.0
 */
export declare function toApplicative<F extends URIS3>(monoidal: Monoidal3<F>): Applicative3<F>;
export declare function toApplicative<F extends URIS2>(monoidal: Monoidal2<F>): Applicative2<F>;
export declare function toApplicative<F extends URIS>(monoidal: Monoidal1<F>): Applicative1<F>;
export declare function toApplicative<F>(monoidal: Monoidal<F>): Applicative<F>;
