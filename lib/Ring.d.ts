import { Semiring } from './Semiring';
/**
 * The `Ring` class is for types that support addition, multiplication, and subtraction operations.
 *
 * Instances must satisfy the following law in addition to the {@link Semiring} laws:
 *
 * - Additive inverse: `a - a = (zero - a) + a = zero`
 * @typeclass
 * @since 1.0.0
 */
export interface Ring<A> extends Semiring<A> {
    readonly sub: (x: A, y: A) => A;
}
/**
 * @since 1.0.0
 */
export declare const getFunctionRing: <A, B>(ring: Ring<B>) => Ring<(a: A) => B>;
/**
 * `negate x` can be used as a shorthand for `zero - x`
 *
 * @since 1.0.0
 */
export declare const negate: <A>(ring: Ring<A>) => (a: A) => A;
/**
 * @since 1.0.0
 */
export declare const getProductRing: <A, B>(RA: Ring<A>, RB: Ring<B>) => Ring<[A, B]>;
