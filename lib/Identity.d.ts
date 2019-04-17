import { Alt1 } from './Alt';
import { ChainRec1 } from './ChainRec';
import { Comonad1 } from './Comonad';
import { Foldable1 } from './Foldable';
import { Lazy } from './function';
import { Monad1 } from './Monad';
import { Setoid } from './Setoid';
import { Show } from './Show';
import { Traversable1 } from './Traversable';
declare module './HKT' {
    interface URI2HKT<A> {
        Identity: Identity<A>;
    }
}
export declare const URI = "Identity";
export declare type URI = typeof URI;
/**
 * @since 1.0.0
 */
export declare class Identity<A> {
    readonly value: A;
    constructor(value: A);
    map<B>(f: (a: A) => B): Identity<B>;
    ap<B>(fab: Identity<(a: A) => B>): Identity<B>;
    /**
     * Flipped version of `ap`
     */
    ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>;
    chain<B>(f: (a: A) => Identity<B>): Identity<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    alt(fx: Identity<A>): Identity<A>;
    /**
     * Lazy version of `alt`
     *
     * @example
     * import { Identity } from 'fp-ts/lib/Identity'
     *
     * const a = new Identity(1)
     * assert.deepStrictEqual(a.orElse(() => new Identity(2)), a)
     *
     * @since 1.6.0
     */
    orElse(fx: Lazy<Identity<A>>): Identity<A>;
    extract(): A;
    extend<B>(f: (ea: Identity<A>) => B): Identity<B>;
    fold<B>(f: (a: A) => B): B;
}
/**
 * @since 1.17.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<Identity<A>>;
/**
 * @since 1.0.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Identity<A>>;
/**
 * @since 1.0.0
 */
export declare const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>;
