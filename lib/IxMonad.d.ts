import { HKT3, Type3, URIS3 } from './HKTv14_1';
/**
 * @typeclass
 * @since 1.0.0
 */
export interface IxMonad<F> {
    readonly URI: F;
    readonly iof: <I, A>(a: A) => HKT3<F, I, I, A>;
    readonly ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>;
}
export interface IxMonad3<F extends URIS3> {
    readonly URI: F;
    readonly iof: <I, A>(a: A) => Type3<F, I, I, A>;
    readonly ichain: <I, O, Z, A, B>(fa: Type3<F, I, O, A>, f: (a: A) => Type3<F, O, Z, B>) => Type3<F, I, Z, B>;
}
/**
 * @since 1.0.0
 */
export declare function iapplyFirst<F extends URIS3>(ixmonad: IxMonad3<F>): <I, O, A, Z, B>(fa: Type3<F, I, O, A>, fb: Type3<F, O, Z, B>) => Type3<F, I, Z, A>;
export declare function iapplyFirst<F>(ixmonad: IxMonad<F>): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>;
/**
 * @since 1.0.0
 */
export declare function iapplySecond<F extends URIS3>(ixmonad: IxMonad3<F>): <I, O, A, Z, B>(fa: Type3<F, I, O, A>, fb: Type3<F, O, Z, B>) => Type3<F, I, Z, B>;
export declare function iapplySecond<F>(ixmonad: IxMonad<F>): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>;
