import { Alt2 } from './Alt';
import { Bifunctor2 } from './Bifunctor';
import { ChainRec2 } from './ChainRec';
import { Extend2 } from './Extend';
import { Foldable2v2 } from './Foldable2v';
import { Monad2 } from './Monad';
import { Traversable2v2 } from './Traversable2v';
import { URI, Either } from './Either_';
import { Monoid } from './Monoid';
import { Filterable2C } from './Filterable_';
import { Compactable2C } from './Compactable_';
import { Witherable2C } from './Witherable';
import { Validation } from './Validation';
export declare const chainRec: <L, A, B>(a: A, f: (a: A) => Either<L, Either<A, B>>) => Either<L, B>;
/**
 * @since 1.0.0
 */
export declare const fromValidation: <L, A>(fa: Validation<L, A>) => Either<L, A>;
/**
 * Builds {@link Compactable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export declare function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>;
/**
 * Builds {@link Filterable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export declare function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>;
/**
 * Builds {@link Witherable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export declare function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>;
/**
 * @since 1.0.0
 */
export declare const either: Monad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> & Bifunctor2<URI> & Alt2<URI> & Extend2<URI> & ChainRec2<URI>;
export { Either, fromNullable, fromOption, fromOptionL, fromPredicate, fromRefinement, getApplyMonoid, getApplySemigroup, getSemigroup, getSetoid, isLeft, isRight, Left, left, Right, right, toError, tryCatch, tryCatch2v, URI } from './Either_';
