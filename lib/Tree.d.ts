import { Comonad1 } from './Comonad';
import { Foldable1 } from './Foldable';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad';
import { Setoid } from './Setoid';
import { Show } from './Show';
import { Traversable1 } from './Traversable';
declare module './HKT' {
    interface URI2HKT<A> {
        Tree: Tree<A>;
    }
}
export declare const URI = "Tree";
export declare type URI = typeof URI;
export declare type Forest<A> = Array<Tree<A>>;
/**
 * @since 1.6.0
 */
export declare class Tree<A> {
    readonly value: A;
    readonly forest: Forest<A>;
    constructor(value: A, forest: Forest<A>);
    map<B>(f: (a: A) => B): Tree<B>;
    ap<B>(fab: Tree<(a: A) => B>): Tree<B>;
    /**
     * Flipped version of `ap`
     * @since 1.6.0
     */
    ap_<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C>;
    chain<B>(f: (a: A) => Tree<B>): Tree<B>;
    extract(): A;
    extend<B>(f: (fa: Tree<A>) => B): Tree<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
}
/**
 * @since 1.17.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<Tree<A>>;
/**
 * @since 1.6.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Tree<A>>;
/**
 * @since 1.6.0
 */
export declare const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>;
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 1.6.0
 */
export declare const drawForest: (forest: Tree<string>[]) => string;
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { Tree, drawTree, tree } from 'fp-ts/lib/Tree'
 *
 * const fa = new Tree('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   new Tree('d', [tree.of('e'), tree.of('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 1.6.0
 */
export declare const drawTree: (tree: Tree<string>) => string;
/**
 * Build a tree from a seed value
 *
 * @since 1.6.0
 */
export declare const unfoldTree: <A, B>(b: B, f: (b: B) => [A, B[]]) => Tree<A>;
/**
 * Build a tree from a seed value
 *
 * @since 1.6.0
 */
export declare const unfoldForest: <A, B>(bs: B[], f: (b: B) => [A, B[]]) => Tree<A>[];
/**
 * Monadic tree builder, in depth-first order
 *
 * @since 1.6.0
 */
export declare function unfoldTreeM<M extends URIS3>(M: Monad3<M>): <U, L, A, B>(b: B, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Tree<A>>;
export declare function unfoldTreeM<M extends URIS3, U, L>(M: Monad3C<M, U, L>): <A, B>(b: B, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Tree<A>>;
export declare function unfoldTreeM<M extends URIS2>(M: Monad2<M>): <L, A, B>(b: B, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Tree<A>>;
export declare function unfoldTreeM<M extends URIS2, L>(M: Monad2C<M, L>): <A, B>(b: B, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Tree<A>>;
export declare function unfoldTreeM<M extends URIS>(M: Monad1<M>): <A, B>(b: B, f: (b: B) => Type<M, [A, Array<B>]>) => Type<M, Tree<A>>;
export declare function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>;
/**
 * Monadic forest builder, in depth-first order
 *
 * @since 1.6.0
 */
export declare function unfoldForestM<M extends URIS3>(M: Monad3<M>): <U, L, A, B>(bs: Array<B>, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Forest<A>>;
export declare function unfoldForestM<M extends URIS3, U, L>(M: Monad3C<M, U, L>): <A, B>(bs: Array<B>, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Forest<A>>;
export declare function unfoldForestM<M extends URIS2>(M: Monad2<M>): <L, A, B>(bs: Array<B>, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Forest<A>>;
export declare function unfoldForestM<M extends URIS2, L>(M: Monad2C<M, L>): <A, B>(bs: Array<B>, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Forest<A>>;
export declare function unfoldForestM<M extends URIS>(M: Monad1<M>): <A, B>(bs: Array<B>, f: (b: B) => Type<M, [A, Array<B>]>) => Type<M, Forest<A>>;
export declare function unfoldForestM<M>(M: Monad<M>): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>;
/**
 * @since 1.14.0
 */
export declare function elem<A>(S: Setoid<A>): (a: A, fa: Tree<A>) => boolean;
