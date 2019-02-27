import { Alternative1 } from './Alternative';
import { Compactable1 } from './Compactable_';
import { Extend1 } from './Extend';
import { Filterable1 } from './Filterable_';
import { Foldable2v1 } from './Foldable2v';
import { Monad1 } from './Monad';
import { Plus1 } from './Plus';
import { Traversable2v1 } from './Traversable2v';
import { Witherable1 } from './Witherable';
import { Option, URI } from './Option_';
import { Either } from './Either_';
/**
 * Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
 * value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromEither } from 'fp-ts/lib/Option'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(left(1)), none)
 * assert.deepStrictEqual(fromEither(right(1)), some(1))
 *
 * @since 1.0.0
 */
export declare const fromEither: <L, A>(fa: Either<L, A>) => Option<A>;
/**
 * @since 1.0.0
 */
export declare const option: Monad1<URI> & Foldable2v1<URI> & Plus1<URI> & Traversable2v1<URI> & Alternative1<URI> & Extend1<URI> & Compactable1<URI> & Filterable1<URI> & Witherable1<URI>;
export { fromNullable, fromPredicate, fromRefinement, getApplyMonoid, getApplySemigroup, getFirstMonoid, getLastMonoid, getMonoid, getOrd, getRefinement, getSetoid, isNone, isSome, none, None, Option, some, Some, tryCatch, URI } from './Option_';
