import { Alt1 } from './Alt';
import { ChainRec1 } from './ChainRec';
import { Comonad1 } from './Comonad';
import { Foldable2v1 } from './Foldable2v';
import { Lazy } from './function';
import { Monad1 } from './Monad';
import { Setoid } from './Setoid';
import { Traversable2v1 } from './Traversable2v';
declare module './HKTv14_1' {
    interface URI2HKT<A> {
        Identity: Identity<A>;
    }
}
export declare const URI = "Identity";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Identity
 * @since 1.0.0
 */
export declare class Identity<A> {
    readonly value: A;
    readonly _A: A;
    readonly _URI: URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Identity<B>;
    ap<B>(fab: Identity<(a: A) => B>): Identity<B>;
    /**
     * Flipped version of {@link ap}
     */
    ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>;
    chain<B>(f: (a: A) => Identity<B>): Identity<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    alt(fx: Identity<A>): Identity<A>;
    /**
     * Lazy version of {@link alt}
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
    inspect(): string;
    toString(): string;
}
/**
 * @since 1.0.0
 */
export declare const getSetoid: <A>(setoid: Setoid<A>) => Setoid<Identity<A>>;
/**
 * @since 1.0.0
 */
export declare const identity: Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>;
