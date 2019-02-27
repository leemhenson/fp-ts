"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChainRec_1 = require("./ChainRec");
var Either_1 = require("./Either_");
var function_1 = require("./function");
exports.chainRec = function (a, f) {
    return ChainRec_1.tailRec(function (e) {
        if (e.isLeft()) {
            return Either_1.right(Either_1.left(e.value));
        }
        else {
            var r = e.value;
            return r.isLeft() ? Either_1.left(f(r.value)) : Either_1.right(Either_1.right(r.value));
        }
    }, f(a));
};
/**
 * @since 1.0.0
 */
exports.fromValidation = function (fa) {
    return fa.isFailure() ? Either_1.left(fa.value) : Either_1.right(fa.value);
};
/**
 * Builds {@link Compactable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
function getCompactable(ML) {
    var compact = function (fa) {
        if (fa.isLeft()) {
            return fa;
        }
        if (fa.value.isNone()) {
            return Either_1.left(ML.empty);
        }
        return Either_1.right(fa.value.value);
    };
    var separate = function (fa) {
        if (fa.isLeft()) {
            return {
                left: fa,
                right: fa
            };
        }
        if (fa.value.isLeft()) {
            return {
                left: Either_1.right(fa.value.value),
                right: Either_1.left(ML.empty)
            };
        }
        return {
            left: Either_1.left(ML.empty),
            right: Either_1.right(fa.value.value)
        };
    };
    return {
        URI: Either_1.URI,
        _L: function_1.phantom,
        compact: compact,
        separate: separate
    };
}
exports.getCompactable = getCompactable;
/**
 * Builds {@link Filterable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
function getFilterable(ML) {
    var C = getCompactable(ML);
    var partitionMap = function (fa, f) {
        if (fa.isLeft()) {
            return {
                left: fa,
                right: fa
            };
        }
        var e = f(fa.value);
        if (e.isLeft()) {
            return {
                left: Either_1.right(e.value),
                right: Either_1.left(ML.empty)
            };
        }
        return {
            left: Either_1.left(ML.empty),
            right: Either_1.right(e.value)
        };
    };
    var partition = function (fa, p) {
        if (fa.isLeft()) {
            return {
                left: fa,
                right: fa
            };
        }
        if (p(fa.value)) {
            return {
                left: Either_1.left(ML.empty),
                right: Either_1.right(fa.value)
            };
        }
        return {
            left: Either_1.right(fa.value),
            right: Either_1.left(ML.empty)
        };
    };
    var filterMap = function (fa, f) {
        if (fa.isLeft()) {
            return fa;
        }
        var optionB = f(fa.value);
        if (optionB.isSome()) {
            return Either_1.right(optionB.value);
        }
        return Either_1.left(ML.empty);
    };
    var filter = function (fa, p) { return fa.filterOrElse(p, ML.empty); };
    return __assign({}, C, { map: Either_1.map,
        partitionMap: partitionMap,
        filterMap: filterMap,
        partition: partition,
        filter: filter });
}
exports.getFilterable = getFilterable;
/**
 * Builds {@link Witherable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
function getWitherable(ML) {
    var filterableEither = getFilterable(ML);
    var wither = function (F) {
        var traverseF = Either_1.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), filterableEither.compact); };
    };
    var wilt = function (F) {
        var traverseF = Either_1.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), filterableEither.separate); };
    };
    return __assign({}, filterableEither, { traverse: Either_1.traverse,
        reduce: Either_1.reduce,
        wither: wither,
        wilt: wilt });
}
exports.getWitherable = getWitherable;
/**
 * @since 1.0.0
 */
exports.either = {
    URI: Either_1.URI,
    map: Either_1.map,
    of: Either_1.of,
    ap: Either_1.ap,
    chain: Either_1.chain,
    reduce: Either_1.reduce,
    foldMap: Either_1.foldMap,
    foldr: Either_1.foldr,
    traverse: Either_1.traverse,
    sequence: Either_1.sequence,
    bimap: Either_1.bimap,
    alt: Either_1.alt,
    extend: Either_1.extend,
    chainRec: exports.chainRec
};
var Either_2 = require("./Either_");
exports.fromNullable = Either_2.fromNullable;
exports.fromOption = Either_2.fromOption;
exports.fromOptionL = Either_2.fromOptionL;
exports.fromPredicate = Either_2.fromPredicate;
exports.fromRefinement = Either_2.fromRefinement;
exports.getApplyMonoid = Either_2.getApplyMonoid;
exports.getApplySemigroup = Either_2.getApplySemigroup;
exports.getSemigroup = Either_2.getSemigroup;
exports.getSetoid = Either_2.getSetoid;
exports.isLeft = Either_2.isLeft;
exports.isRight = Either_2.isRight;
exports.Left = Either_2.Left;
exports.left = Either_2.left;
exports.Right = Either_2.Right;
exports.right = Either_2.right;
exports.toError = Either_2.toError;
exports.tryCatch = Either_2.tryCatch;
exports.tryCatch2v = Either_2.tryCatch2v;
exports.URI = Either_2.URI;
