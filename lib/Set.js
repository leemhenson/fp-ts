"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Setoid_1 = require("./Setoid");
var function_1 = require("./function");
/**
 * @since 1.14.0
 */
exports.empty = new Set();
/**
 * @since 1.0.0
 */
exports.toArray = function (O) { return function (x) {
    var r = [];
    x.forEach(function (e) { return r.push(e); });
    return r.sort(O.compare);
}; };
/**
 * @since 1.0.0
 */
exports.getSetoid = function (S) {
    var subsetS = exports.subset(S);
    return Setoid_1.fromEquals(function (x, y) { return subsetS(x, y) && subsetS(y, x); });
};
/**
 * @since 1.0.0
 */
exports.some = function (x, predicate) {
    var values = x.values();
    var e;
    var found = false;
    while (!found && !(e = values.next()).done) {
        found = predicate(e.value);
    }
    return found;
};
/**
 * Projects a Set through a function
 *
 * @since 1.2.0
 */
exports.map = function (S) {
    var has = exports.elem(S);
    return function (set, f) {
        var r = new Set();
        set.forEach(function (e) {
            var v = f(e);
            if (!has(v, r)) {
                r.add(v);
            }
        });
        return r;
    };
};
/**
 * @since 1.0.0
 */
exports.every = function (x, predicate) {
    return !exports.some(x, function_1.not(predicate));
};
/**
 * @since 1.2.0
 */
exports.chain = function (S) {
    var has = exports.elem(S);
    return function (set, f) {
        var r = new Set();
        set.forEach(function (e) {
            f(e).forEach(function (e) {
                if (!has(e, r)) {
                    r.add(e);
                }
            });
        });
        return r;
    };
};
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 1.0.0
 */
exports.subset = function (S) {
    var has = exports.elem(S);
    return function (x, y) { return exports.every(x, function (a) { return has(a, y); }); };
};
function filter(x, predicate) {
    var values = x.values();
    var e;
    var r = new Set();
    while (!(e = values.next()).done) {
        var value = e.value;
        if (predicate(value)) {
            r.add(value);
        }
    }
    return r;
}
exports.filter = filter;
function partition(x, predicate) {
    var values = x.values();
    var e;
    var right = new Set();
    var left = new Set();
    while (!(e = values.next()).done) {
        var value = e.value;
        if (predicate(value)) {
            right.add(value);
        }
        else {
            left.add(value);
        }
    }
    return { left: left, right: right };
}
exports.partition = partition;
/**
 * Use {@link elem} instead
 * @since 1.0.0
 * @deprecated
 */
exports.member = function (S) {
    var has = exports.elem(S);
    return function (set) { return function (a) { return has(a, set); }; };
};
/**
 * Test if a value is a member of a set
 *
 * @since 1.14.0
 */
exports.elem = function (S) { return function (a, x) {
    return exports.some(x, function (ax) { return S.equals(a, ax); });
}; };
/**
 * Form the union of two sets
 *
 * @since 1.0.0
 */
exports.union = function (S) {
    var has = exports.elem(S);
    return function (x, y) {
        var r = new Set(x);
        y.forEach(function (e) {
            if (!has(e, r)) {
                r.add(e);
            }
        });
        return r;
    };
};
/**
 * The set of elements which are in both the first and second set
 *
 * @since 1.0.0
 */
exports.intersection = function (S) {
    var has = exports.elem(S);
    return function (x, y) {
        var r = new Set();
        x.forEach(function (e) {
            if (has(e, y)) {
                r.add(e);
            }
        });
        return r;
    };
};
/**
 * @since 1.2.0
 */
exports.partitionMap = function (SL, SR) { return function (x, f) {
    var values = x.values();
    var e;
    var left = new Set();
    var right = new Set();
    var hasL = exports.elem(SL);
    var hasR = exports.elem(SR);
    while (!(e = values.next()).done) {
        var v = f(e.value);
        if (v.isLeft()) {
            if (!hasL(v.value, left)) {
                left.add(v.value);
            }
        }
        else {
            if (!hasR(v.value, right)) {
                right.add(v.value);
            }
        }
    }
    return { left: left, right: right };
}; };
/**
 * Use {@link difference2v} instead
 *
 * @since 1.0.0
 * @deprecated
 */
exports.difference = function (S) {
    var d = exports.difference2v(S);
    return function (x, y) { return d(y, x); };
};
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference2v } from 'fp-ts/lib/Set'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepStrictEqual(difference2v(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 1.12.0
 */
exports.difference2v = function (S) {
    var has = exports.elem(S);
    return function (x, y) { return filter(x, function (a) { return !has(a, y); }); };
};
/**
 * @since 1.0.0
 */
exports.getUnionMonoid = function (S) {
    return {
        concat: exports.union(S),
        empty: exports.empty
    };
};
/**
 * @since 1.0.0
 */
exports.getIntersectionSemigroup = function (S) {
    return {
        concat: exports.intersection(S)
    };
};
/**
 * @since 1.0.0
 */
exports.reduce = function (O) {
    var toArrayO = exports.toArray(O);
    return function (fa, b, f) { return toArrayO(fa).reduce(f, b); };
};
/**
 * @since 1.14.0
 */
exports.foldMap = function (O, M) {
    var toArrayO = exports.toArray(O);
    return function (fa, f) { return toArrayO(fa).reduce(function (b, a) { return M.concat(b, f(a)); }, M.empty); };
};
/**
 * Create a set with one element
 *
 * @since 1.0.0
 */
exports.singleton = function (a) {
    return new Set([a]);
};
/**
 * Insert a value into a set
 *
 * @since 1.0.0
 */
exports.insert = function (S) {
    var has = exports.elem(S);
    return function (a, x) {
        if (!has(a, x)) {
            var r = new Set(x);
            r.add(a);
            return r;
        }
        else {
            return x;
        }
    };
};
/**
 * Delete a value from a set
 *
 * @since 1.0.0
 */
exports.remove = function (S) { return function (a, x) {
    return filter(x, function (ax) { return !S.equals(a, ax); });
}; };
/**
 * Create a set from an array
 *
 * @since 1.2.0
 */
exports.fromArray = function (S) { return function (as) {
    var len = as.length;
    var r = new Set();
    var has = exports.elem(S);
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (!has(a, r)) {
            r.add(a);
        }
    }
    return r;
}; };
/**
 * @since 1.12.0
 */
exports.compact = function (S) {
    var filterMapS = exports.filterMap(S);
    return function (fa) { return filterMapS(fa, function_1.identity); };
};
/**
 * @since 1.12.0
 */
exports.separate = function (SL, SR) { return function (fa) {
    var hasL = exports.elem(SL);
    var hasR = exports.elem(SR);
    var left = new Set();
    var right = new Set();
    fa.forEach(function (e) {
        if (e.isLeft()) {
            if (!hasL(e.value, left)) {
                left.add(e.value);
            }
        }
        else {
            if (!hasR(e.value, right)) {
                right.add(e.value);
            }
        }
    });
    return { left: left, right: right };
}; };
/**
 * @since 1.12.0
 */
exports.filterMap = function (S) {
    var has = exports.elem(S);
    return function (fa, f) {
        var r = new Set();
        fa.forEach(function (a) {
            var ob = f(a);
            if (ob.isSome() && !has(ob.value, r)) {
                r.add(ob.value);
            }
        });
        return r;
    };
};