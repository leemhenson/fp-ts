import { Monad1 } from './Monad';
import { MonadIO1 } from './MonadIO';
import { URI } from './IO_';
/**
 * @since 1.0.0
 */
export declare const io: Monad1<URI> & MonadIO1<URI>;
export { getMonoid, getSemigroup, IO, URI } from './IO_';
