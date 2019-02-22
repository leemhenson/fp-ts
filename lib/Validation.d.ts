import { Alt2C } from './Alt';
import { Applicative2C } from './Applicative';
import { Bifunctor2 } from './Bifunctor';
import { Compactable2C } from './Compactable_';
import { Either } from './Either_';
import { Filterable2C } from './Filterable_';
import { Foldable2v2 } from './Foldable2v';
import { Predicate, Refinement } from './function';
import { Functor2 } from './Functor';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup_';
import { Setoid } from './Setoid';
import { Traversable2v2 } from './Traversable2v';
import { Witherable2C } from './Witherable';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Validation: Validation<L, A>;
    }
}
export declare const URI = "Validation";
export declare type URI = typeof URI;
/**
 * The `Validation` functor, used for applicative validation
 *
 * The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.
 *
 * @example
 *
 * import { Validation, getApplicative, success, failure } from 'fp-ts/lib/Validation'
 * import { NonEmptyArray, getSemigroup } from 'fp-ts/lib/NonEmptyArray'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * // curried constructor
 * const person = (name: string) => (age: number): Person => ({ name, age })
 *
 * // validators
 * function validateName(input: string): Validation<NonEmptyArray<string>, string> {
 *   return input.length === 0 ? failure(new NonEmptyArray('Invalid name: empty string', [])) : success(input)
 * }
 * function validateAge(input: string): Validation<NonEmptyArray<string>, number> {
 *   const n = parseFloat(input)
 *   if (isNaN(n)) {
 *     return failure(new NonEmptyArray(`Invalid age: not a number ${input}`, []))
 *   }
 *   return n % 1 !== 0 ? failure(new NonEmptyArray(`Invalid age: not an integer ${n}`, [])) : success(n)
 * }
 *
 * // get an `Applicative` instance for Validation<NonEmptyArray<string>, ?>
 * const A = getApplicative(getSemigroup<string>())
 *
 * function validatePerson(input: Record<string, string>): Validation<NonEmptyArray<string>, Person> {
 *   return A.ap(validateName(input['name']).map(person), validateAge(input['age']))
 * }
 *
 * assert.deepStrictEqual(validatePerson({ name: '', age: '1.2' }), failure(new NonEmptyArray("Invalid name: empty string", ["Invalid age: not an integer 1.2"])))
 *
 * assert.deepStrictEqual(validatePerson({ name: 'Giulio', age: '44' }), success({ "name": "Giulio", "age": 44 }))
 *
 * @data
 * @constructor Failure
 * @constructor Success
 * @since 1.0.0
 */
export declare type Validation<L, A> = Failure<L, A> | Success<L, A>;
export declare class Failure<L, A> {
    readonly value: L;
    readonly _tag: 'Failure';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(value: L);
    map<B>(f: (a: A) => B): Validation<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(failure: (l: L) => B, success: (a: A) => B): B;
    /** Returns the value from this `Success` or the given argument if this is a `Failure` */
    getOrElse(a: A): A;
    /** Returns the value from this `Success` or the result of given argument if this is a `Failure` */
    getOrElseL(f: (l: L) => A): A;
    mapFailure<M>(f: (l: L) => M): Validation<M, A>;
    swap(): Validation<A, L>;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the validation is an instance of `Failure`, `false` otherwise */
    isFailure(): this is Failure<L, A>;
    /** Returns `true` if the validation is an instance of `Success`, `false` otherwise */
    isSuccess(): this is Success<L, A>;
}
export declare class Success<L, A> {
    readonly value: A;
    readonly _tag: 'Success';
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Validation<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(failure: (l: L) => B, success: (a: A) => B): B;
    getOrElse(a: A): A;
    getOrElseL(f: (l: L) => A): A;
    mapFailure<M>(f: (l: L) => M): Validation<M, A>;
    swap(): Validation<A, L>;
    inspect(): string;
    toString(): string;
    isFailure(): this is Failure<L, A>;
    isSuccess(): this is Success<L, A>;
}
/**
 * @since 1.0.0
 */
export declare const getSetoid: <L, A>(SL: Setoid<L>, SA: Setoid<A>) => Setoid<Validation<L, A>>;
/**
 * @example
 * import { Validation, success, failure, getApplicative } from 'fp-ts/lib/Validation'
 * import { getArraySemigroup } from 'fp-ts/lib/Semigroup'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const person = (name: string) => (age: number): Person => ({ name, age })
 *
 * const validateName = (name: string): Validation<string[], string> =>
 *   name.length === 0 ? failure(['invalid name']) : success(name)
 *
 * const validateAge = (age: number): Validation<string[], number> =>
 *   age > 0 && age % 1 === 0 ? success(age) : failure(['invalid age'])
 *
 * const A = getApplicative(getArraySemigroup<string>())
 *
 * const validatePerson = (name: string, age: number): Validation<string[], Person> =>
 *   A.ap(A.map(validateName(name), person), validateAge(age))
 *
 * assert.deepStrictEqual(validatePerson('Nicolas Bourbaki', 45), success({ "name": "Nicolas Bourbaki", "age": 45 }))
 * assert.deepStrictEqual(validatePerson('Nicolas Bourbaki', -1), failure(["invalid age"]))
 * assert.deepStrictEqual(validatePerson('', 0), failure(["invalid name", "invalid age"]))
 *
 * @since 1.0.0
 */
export declare const getApplicative: <L>(S: Semigroup<L>) => Applicative2C<"Validation", L>;
/**
 * **Note**: This function is here just to avoid switching to / from {@link Either}
 *
 * @since 1.0.0
 */
export declare const getMonad: <L>(S: Semigroup<L>) => Monad2C<"Validation", L>;
/**
 * @since 1.0.0
 */
export declare const failure: <L, A>(l: L) => Validation<L, A>;
/**
 * @since 1.0.0
 * @alias of
 */
export declare const success: <L, A>(a: A) => Validation<L, A>;
/**
 * @since 1.0.0
 */
export declare function fromPredicate<L, A, B extends A>(predicate: Refinement<A, B>, f: (a: A) => L): (a: A) => Validation<L, B>;
export declare function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A>;
/**
 * @since 1.0.0
 */
export declare const fromEither: <L, A>(e: Either<L, A>) => Validation<L, A>;
/**
 * @since 1.0.0
 */
export declare const getSemigroup: <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => Semigroup<Validation<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getMonoid: <L, A>(SL: Semigroup<L>, SA: Monoid<A>) => Monoid<Validation<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getAlt: <L>(S: Semigroup<L>) => Alt2C<"Validation", L>;
/**
 * Returns `true` if the validation is an instance of `Failure`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isFailure: <L, A>(fa: Validation<L, A>) => fa is Failure<L, A>;
/**
 * Returns `true` if the validation is an instance of `Success`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isSuccess: <L, A>(fa: Validation<L, A>) => fa is Success<L, A>;
/**
 * Builds {@link Compactable} instance for {@link Validation} given {@link Monoid} for the failure side
 *
 * @since 1.7.0
 */
export declare function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>;
/**
 * Builds {@link Filterable} instance for {@link Validation} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export declare function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>;
/**
 * Builds {@link Witherable} instance for {@link Validation} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export declare function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>;
/**
 * @since 1.0.0
 */
export declare const validation: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI>;