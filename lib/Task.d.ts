import { Monad1 } from './Monad';
import { MonadIO1 } from './MonadIO';
import { MonadTask1 } from './MonadTask';
import { URI } from './Task_';
/**
 * @since 1.0.0
 */
export declare const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI>;
/**
 * Like {@link task} but `ap` is sequential
 *
 * @since 1.10.0
 */
export declare const taskSeq: typeof task;
export { delay, fromIO, fromTask, getMonoid, getRaceMonoid, getSemigroup, Task, tryCatch } from './Task_';
