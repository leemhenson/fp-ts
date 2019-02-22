"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("./Option_");
var function_1 = require("./function");
var separate = function (fa) {
    if (fa.isNone()) {
        return {
            left: Option_1.none,
            right: Option_1.none
        };
    }
    var e = fa.value;
    if (e.isLeft()) {
        return {
            left: Option_1.some(e.value),
            right: Option_1.none
        };
    }
    return {
        left: Option_1.none,
        right: Option_1.some(e.value)
    };
};
var partitionMap = function (fa, f) {
    return separate(fa.map(f));
};
var partition = function (fa, p) { return ({
    left: fa.filter(function_1.not(p)),
    right: fa.filter(p)
}); };
var wilt = function (F) { return function (fa, f) {
    if (fa.isNone()) {
        return F.of({
            left: Option_1.none,
            right: Option_1.none
        });
    }
    return F.map(f(fa.value), function (e) {
        if (e.isLeft()) {
            return {
                left: Option_1.some(e.value),
                right: Option_1.none
            };
        }
        return {
            left: Option_1.none,
            right: Option_1.some(e.value)
        };
    });
}; };
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
exports.fromEither = function (fa) {
    return fa.isLeft() ? Option_1.none : Option_1.some(fa.value);
};
/**
 * @since 1.0.0
 */
exports.option = {
    URI: Option_1.URI,
    map: Option_1.map,
    of: Option_1.of,
    ap: Option_1.ap,
    chain: Option_1.chain,
    reduce: Option_1.reduce,
    foldMap: Option_1.foldMap,
    foldr: Option_1.foldr,
    traverse: Option_1.traverse,
    sequence: Option_1.sequence,
    zero: Option_1.zero,
    alt: Option_1.alt,
    extend: Option_1.extend,
    compact: Option_1.compact,
    separate: separate,
    filter: Option_1.filter,
    filterMap: Option_1.filterMap,
    partition: partition,
    partitionMap: partitionMap,
    wither: Option_1.wither,
    wilt: wilt
};
var Option_2 = require("./Option_");
exports.fromNullable = Option_2.fromNullable;
exports.fromPredicate = Option_2.fromPredicate;
exports.fromRefinement = Option_2.fromRefinement;
exports.getApplyMonoid = Option_2.getApplyMonoid;
exports.getApplySemigroup = Option_2.getApplySemigroup;
exports.getFirstMonoid = Option_2.getFirstMonoid;
exports.getLastMonoid = Option_2.getLastMonoid;
exports.getMonoid = Option_2.getMonoid;
exports.getOrd = Option_2.getOrd;
exports.getRefinement = Option_2.getRefinement;
exports.getSetoid = Option_2.getSetoid;
exports.isNone = Option_2.isNone;
exports.isSome = Option_2.isSome;
exports.none = Option_2.none;
exports.None = Option_2.None;
exports.some = Option_2.some;
exports.Some = Option_2.Some;
exports.tryCatch = Option_2.tryCatch;
exports.URI = Option_2.URI;
