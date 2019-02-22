import { Functor, Functor1, Functor2, Functor2C, Functor3C } from './Functor';
import { URIS, URIS2, URIS3 } from './HKT';
import { CompactableComposition3C1, Compactable1, Compactable2C, CompactableComposition22C, Compactable2, CompactableComposition22, CompactableComposition2C1, CompactableComposition21, CompactableComposition12, CompactableComposition11, Compactable, CompactableComposition } from './Compactable_';
/**
 * @since 1.12.0
 */
export declare function getCompactableComposition<F extends URIS3, G extends URIS, UF, LF>(F: Functor3C<F, UF, LF>, G: Compactable1<G> & Functor1<G>): CompactableComposition3C1<F, G, UF, LF>;
export declare function getCompactableComposition<F extends URIS2, G extends URIS2, LG>(F: Functor2<F>, G: Compactable2C<G, LG> & Functor2C<G, LG>): CompactableComposition22C<F, G, LG>;
export declare function getCompactableComposition<F extends URIS2, G extends URIS2>(F: Functor2<F>, G: Compactable2<G> & Functor2<G>): CompactableComposition22<F, G>;
export declare function getCompactableComposition<F extends URIS2, G extends URIS, LF>(F: Functor2C<F, LF>, G: Compactable1<G> & Functor1<G>): CompactableComposition2C1<F, G, LF>;
export declare function getCompactableComposition<F extends URIS2, G extends URIS>(F: Functor2<F>, G: Compactable1<G> & Functor1<G>): CompactableComposition21<F, G>;
export declare function getCompactableComposition<F extends URIS, G extends URIS2, LG>(F: Functor1<F>, G: Compactable2C<G, LG> & Functor2C<G, LG>): CompactableComposition12<F, G>;
export declare function getCompactableComposition<F extends URIS, G extends URIS2>(F: Functor1<F>, G: Compactable2<G> & Functor2<G>): CompactableComposition12<F, G>;
export declare function getCompactableComposition<F extends URIS, G extends URIS>(F: Functor1<F>, G: Compactable1<G> & Functor1<G>): CompactableComposition11<F, G>;
export declare function getCompactableComposition<F, G>(F: Functor<F>, G: Compactable<G> & Functor<G>): CompactableComposition<F, G>;
