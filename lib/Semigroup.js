"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ord_1 = require("./Ord");
/**
 * @since 1.0.0
 */
exports.getMeetSemigroup = function (O) {
    return {
        concat: Ord_1.min(O)
    };
};
/**
 * @since 1.0.0
 */
exports.getJoinSemigroup = function (O) {
    return {
        concat: Ord_1.max(O)
    };
};
var Semigroup_1 = require("./Semigroup_");
exports.fold = Semigroup_1.fold;
exports.getArraySemigroup = Semigroup_1.getArraySemigroup;
exports.getDictionarySemigroup = Semigroup_1.getDictionarySemigroup;
exports.getDualSemigroup = Semigroup_1.getDualSemigroup;
exports.getFirstSemigroup = Semigroup_1.getFirstSemigroup;
exports.getFunctionSemigroup = Semigroup_1.getFunctionSemigroup;
exports.getLastSemigroup = Semigroup_1.getLastSemigroup;
exports.getObjectSemigroup = Semigroup_1.getObjectSemigroup;
exports.getProductSemigroup = Semigroup_1.getProductSemigroup;
exports.getRecordSemigroup = Semigroup_1.getRecordSemigroup;
exports.getStructSemigroup = Semigroup_1.getStructSemigroup;
exports.getTupleSemigroup = Semigroup_1.getTupleSemigroup;
exports.semigroupAll = Semigroup_1.semigroupAll;
exports.semigroupAny = Semigroup_1.semigroupAny;
exports.semigroupProduct = Semigroup_1.semigroupProduct;
exports.semigroupString = Semigroup_1.semigroupString;
exports.semigroupSum = Semigroup_1.semigroupSum;
exports.semigroupVoid = Semigroup_1.semigroupVoid;
