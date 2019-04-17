import { Applicative2C } from './Applicative';
import { Apply2C } from './Apply';
import { Contravariant2 } from './Contravariant';
import { Functor2 } from './Functor';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Setoid } from './Setoid';
import { Show } from './Show';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Const: Const<L, A>;
    }
}
export declare const URI = "Const";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Const
 * @since 1.0.0
 */
export declare class Const<L, A> {
    readonly value: L;
    constructor(value: L);
    map<B>(f: (a: A) => B): Const<L, B>;
    contramap<B>(f: (b: B) => A): Const<L, B>;
    fold<B>(f: (l: L) => B): B;
}
/**
 * @since 1.17.0
 */
export declare const getShow: <L, A>(S: Show<L>) => Show<Const<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getSetoid: <L, A>(S: Setoid<L>) => Setoid<Const<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getApply: <L>(S: Semigroup<L>) => Apply2C<"Const", L>;
/**
 * @since 1.0.0
 */
export declare const getApplicative: <L>(M: Monoid<L>) => Applicative2C<"Const", L>;
/**
 * @since 1.0.0
 */
export declare const const_: Functor2<URI> & Contravariant2<URI>;
