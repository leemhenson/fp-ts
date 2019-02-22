import { Ord } from './Ord';
import { Semigroup } from './Semigroup_';
/**
 * @since 1.0.0
 */
export declare const getMeetSemigroup: <A>(O: Ord<A>) => Semigroup<A>;
/**
 * @since 1.0.0
 */
export declare const getJoinSemigroup: <A>(O: Ord<A>) => Semigroup<A>;
export { fold, getArraySemigroup, getDictionarySemigroup, getDualSemigroup, getFirstSemigroup, getFunctionSemigroup, getLastSemigroup, getObjectSemigroup, getProductSemigroup, getRecordSemigroup, getStructSemigroup, getTupleSemigroup, Semigroup, semigroupAll, semigroupAny, semigroupProduct, semigroupString, semigroupSum, semigroupVoid } from './Semigroup_';
