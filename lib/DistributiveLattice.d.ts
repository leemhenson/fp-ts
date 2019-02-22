import { Lattice } from './Lattice';
import { Ord } from './Ord';
/**
 * A `DistributiveLattice` must satisfy the following laws in addition to {@link Lattice} laws:
 *
 * - Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
 * - Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface DistributiveLattice<A> extends Lattice<A> {
}
/**
 * @since 1.4.0
 */
export declare const getMinMaxDistributiveLattice: <A>(O: Ord<A>) => DistributiveLattice<A>;