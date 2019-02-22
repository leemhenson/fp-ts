import { Functor, Functor1, Functor2, Functor2C, Functor3C } from './Functor';
import { URIS, URIS2, URIS3 } from './HKT';
import { Filterable1, FilterableComposition3C1, Filterable2C, FilterableComposition22C, Filterable2, FilterableComposition22, FilterableComposition2C1, FilterableComposition21, FilterableComposition12C, FilterableComposition12, FilterableComposition11, Filterable, FilterableComposition } from './Filterable_';
/**
 * @since 1.12.0
 */
export declare function getFilterableComposition<F extends URIS3, G extends URIS, UF, LF>(F: Functor3C<F, UF, LF>, G: Filterable1<G>): FilterableComposition3C1<F, G, UF, LF>;
export declare function getFilterableComposition<F extends URIS2, G extends URIS2, LG>(F: Functor2<F>, G: Filterable2C<G, LG>): FilterableComposition22C<F, G, LG>;
export declare function getFilterableComposition<F extends URIS2, G extends URIS2>(F: Functor2<F>, G: Filterable2<G>): FilterableComposition22<F, G>;
export declare function getFilterableComposition<F extends URIS2, G extends URIS, LF>(F: Functor2C<F, LF>, G: Filterable1<G>): FilterableComposition2C1<F, G, LF>;
export declare function getFilterableComposition<F extends URIS2, G extends URIS>(F: Functor2<F>, G: Filterable1<G>): FilterableComposition21<F, G>;
export declare function getFilterableComposition<F extends URIS, G extends URIS2, LG>(F: Functor1<F>, G: Filterable2C<G, LG>): FilterableComposition12C<F, G, LG>;
export declare function getFilterableComposition<F extends URIS, G extends URIS2>(F: Functor1<F>, G: Filterable2<G>): FilterableComposition12<F, G>;
export declare function getFilterableComposition<F extends URIS, G extends URIS>(F: Functor1<F>, G: Filterable1<G>): FilterableComposition11<F, G>;
export declare function getFilterableComposition<F, G>(F: Functor<F>, G: Filterable<G>): FilterableComposition<F, G>;
export { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3, Filterable3C, FilterableComposition, FilterableComposition11, FilterableComposition12, FilterableComposition12C, FilterableComposition21, FilterableComposition22, FilterableComposition22C, FilterableComposition2C1, FilterableComposition3C1 } from './Filterable_';
