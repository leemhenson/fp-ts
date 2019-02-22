"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 1.14.0
 */
exports.fromEquals = function (equals) {
    return {
        equals: function (x, y) { return x === y || equals(x, y); }
    };
};
/**
 * @since 1.0.0
 */
exports.strictEqual = function (a, b) {
    return a === b;
};
var setoidStrict = { equals: exports.strictEqual };
/**
 * @since 1.0.0
 */
exports.setoidString = setoidStrict;
/**
 * @since 1.0.0
 */
exports.setoidNumber = setoidStrict;
/**
 * @since 1.0.0
 */
exports.setoidBoolean = setoidStrict;
/**
 * @since 1.0.0
 */
exports.getArraySetoid = function (S) {
    return exports.fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return S.equals(x, ys[i]); }); });
};
/**
 * @since 1.14.2
 */
exports.getStructSetoid = function (setoids) {
    return exports.fromEquals(function (x, y) {
        for (var k in setoids) {
            if (!setoids[k].equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    });
};
/**
 * Use {@link getStructSetoid} instead
 * @since 1.0.0
 * @deprecated
 */
exports.getRecordSetoid = function (setoids) {
    return exports.getStructSetoid(setoids);
};
/**
 * @since 1.14.2
 */
exports.getTupleSetoid = function (SA, SB) {
    return exports.fromEquals(function (a, b) { return SA.equals(a[0], b[0]) && SB.equals(a[1], b[1]); });
};
/**
 * Use {@link getTupleSetoid} instead
 * @since 1.0.0
 * @deprecated
 */
exports.getProductSetoid = function (SA, SB) {
    return exports.getTupleSetoid(SA, SB);
};
/**
 * Returns the `Setoid` corresponding to the partitions of `B` induced by `f`
 *
 * @since 1.2.0
 */
exports.contramap = function (f, fa) {
    return exports.fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
};
/**
 * @since 1.4.0
 */
exports.setoidDate = exports.contramap(function (date) { return date.valueOf(); }, exports.setoidNumber);