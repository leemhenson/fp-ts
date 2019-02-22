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
var function_1 = require("./function");
var Option_1 = require("./Option_");
var Setoid_1 = require("./Setoid");
exports.URI = 'Map';
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 1.14.0
 */
exports.size = function (d) { return d.size; };
/**
 * Test whether or not a map is empty
 *
 * @since 1.14.0
 */
exports.isEmpty = function (d) { return d.size === 0; };
/**
 * Test whether or not a key exists in a map
 *
 * @since 1.14.0
 */
exports.member = function (S) {
    var lookupS = exports.lookup(S);
    return function (k, m) { return lookupS(k, m).isSome(); };
};
/**
 * Test whether or not a value is a member of a map
 *
 * @since 1.14.0
 */
exports.elem = function (S) { return function (a, m) {
    var values = m.values();
    var e;
    while (!(e = values.next()).done) {
        var v = e.value;
        if (S.equals(a, v)) {
            return true;
        }
    }
    return false;
}; };
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 1.14.0
 */
exports.keys = function (O) { return function (m) { return Array.from(m.keys()).sort(O.compare); }; };
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 1.14.0
 */
exports.values = function (O) { return function (m) { return Array.from(m.values()).sort(O.compare); }; };
/**
 * @since 1.14.0
 */
exports.collect = function (O) {
    var keysO = exports.keys(O);
    return function (m, f) {
        var out = [];
        var ks = keysO(m);
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            out.push(f(key, m.get(key)));
        }
        return out;
    };
};
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 1.14.0
 */
exports.toArray = function (O) {
    var collectO = exports.collect(O);
    return function (m) { return collectO(m, function (k, a) { return function_1.tuple(k, a); }); };
};
function toUnfoldable(O, unfoldable) {
    var toArrayO = exports.toArray(O);
    return function (d) {
        var arr = toArrayO(d);
        var len = arr.length;
        return unfoldable.unfoldr(0, function (b) { return (b < len ? Option_1.some(function_1.tuple(arr[b], b + 1)) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.14.0
 */
exports.insert = function (S) {
    var lookupS = exports.lookupWithKey(S);
    return function (k, a, m) {
        var found = lookupS(k, m);
        if (found.isNone()) {
            var r = new Map(m);
            r.set(k, a);
            return r;
        }
        else if (found.value[1] !== a) {
            var r = new Map(m);
            r.set(found.value[0], a);
            return r;
        }
        return m;
    };
};
/**
 * Delete a key and value from a map
 *
 * @since 1.14.0
 */
exports.remove = function (S) {
    var lookupS = exports.lookupWithKey(S);
    return function (k, m) {
        var found = lookupS(k, m);
        if (found.isSome()) {
            var r = new Map(m);
            r.delete(found.value[0]);
            return r;
        }
        return m;
    };
};
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.14.0
 */
exports.pop = function (S) {
    var lookupS = exports.lookup(S);
    var removeS = exports.remove(S);
    return function (k, m) { return lookupS(k, m).map(function (a) { return function_1.tuple(a, removeS(k, m)); }); };
};
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 1.14.0
 */
exports.lookupWithKey = function (S) { return function (k, m) {
    var entries = m.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, ka = _a[0], a = _a[1];
        if (S.equals(ka, k)) {
            return Option_1.some(function_1.tuple(ka, a));
        }
    }
    return Option_1.none;
}; };
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 1.14.0
 */
exports.lookup = function (S) {
    var lookupWithKeyS = exports.lookupWithKey(S);
    return function (k, m) { return lookupWithKeyS(k, m).map(function (_a) {
        var _ = _a[0], a = _a[1];
        return a;
    }); };
};
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 1.14.0
 */
exports.isSubmap = function (SK, SA) {
    var lookupWithKeyS = exports.lookupWithKey(SK);
    return function (d1, d2) {
        var entries = d1.entries();
        var e;
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], a = _a[1];
            var d2OptA = lookupWithKeyS(k, d2);
            if (d2OptA.isNone() || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
                return false;
            }
        }
        return true;
    };
};
/**
 * @since 1.14.0
 */
exports.empty = new Map();
/**
 * @since 1.14.0
 */
exports.getSetoid = function (SK, SA) {
    var isSubmap_ = exports.isSubmap(SK, SA);
    return Setoid_1.fromEquals(function (x, y) { return isSubmap_(x, y) && isSubmap_(y, x); });
};
/**
 * Gets {@link Monoid} instance for Maps given {@link Semigroup} instance for their values
 *
 * @since 1.14.0
 */
exports.getMonoid = function (SK, SA) {
    var lookupWithKeyS = exports.lookupWithKey(SK);
    return {
        concat: function (mx, my) {
            var r = new Map(mx);
            var entries = my.entries();
            var e;
            while (!(e = entries.next()).done) {
                var _a = e.value, k = _a[0], a = _a[1];
                var mxOptA = lookupWithKeyS(k, mx);
                if (mxOptA.isSome()) {
                    r.set(mxOptA.value[0], SA.concat(mxOptA.value[1], a));
                }
                else {
                    r.set(k, a);
                }
            }
            return r;
        },
        empty: exports.empty
    };
};
/**
 * @since 1.14.0
 */
var filter = function (fa, p) { return filterWithIndex(fa, function (_, a) { return p(a); }); };
/**
 * @since 1.14.0
 */
var mapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, key = _a[0], a = _a[1];
        m.set(key, f(key, a));
    }
    return m;
};
/**
 * @since 1.14.0
 */
var _map = function (fa, f) { return mapWithIndex(fa, function (_, a) { return f(a); }); };
/**
 * @since 1.14.0
 */
var reduce = function (O) {
    var reduceWithIndexO = reduceWithIndex(O);
    return function (fa, b, f) { return reduceWithIndexO(fa, b, function (_, b, a) { return f(b, a); }); };
};
/**
 * @since 1.14.0
 */
var foldMap = function (O) { return function (M) {
    var foldMapWithIndexOM = foldMapWithIndex(O)(M);
    return function (fa, f) { return foldMapWithIndexOM(fa, function (_, a) { return f(a); }); };
}; };
/**
 * @since 1.14.0
 */
var foldr = function (O) {
    var foldrWithIndexO = foldrWithIndex(O);
    return function (fa, b, f) { return foldrWithIndexO(fa, b, function (_, a, b) { return f(a, b); }); };
};
/**
 * @since 1.14.0
 */
var reduceWithIndex = function (O) {
    var keysO = exports.keys(O);
    return function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa.get(k));
        }
        return out;
    };
};
/**
 * @since 1.14.0
 */
var foldMapWithIndex = function (O) {
    var keysO = exports.keys(O);
    return function (M) { return function (fa, f) {
        var out = M.empty;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = M.concat(out, f(k, fa.get(k)));
        }
        return out;
    }; };
};
/**
 * @since 1.14.0
 */
var foldrWithIndex = function (O) {
    var keysO = exports.keys(O);
    return function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa.get(k), out);
        }
        return out;
    };
};
/**
 * Create a map with one key/value pair
 *
 * @since 1.14.0
 */
exports.singleton = function (k, a) {
    return new Map([[k, a]]);
};
/**
 * @since 1.14.0
 */
var traverseWithIndex = function (F) {
    return function (ta, f) {
        var fm = F.of(exports.empty);
        var entries = ta.entries();
        var e;
        var _loop_1 = function () {
            var _a = e.value, key = _a[0], a = _a[1];
            fm = F.ap(F.map(fm, function (m) { return function (b) { return new Map(m).set(key, b); }; }), f(key, a));
        };
        while (!(e = entries.next()).done) {
            _loop_1();
        }
        return fm;
    };
};
/**
 * @since 1.14.0
 */
var traverse = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
};
/**
 * @since 1.14.0
 */
var sequence = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta) { return traverseWithIndexF(ta, function (_, a) { return a; }); };
};
/**
 * @since 1.14.0
 */
var compact = function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], oa = _a[1];
        if (oa.isSome()) {
            m.set(k, oa.value);
        }
    }
    return m;
};
/**
 * @since 1.14.0
 */
var partitionMap = function (fa, f) {
    return partitionMapWithIndex(fa, function (_, a) { return f(a); });
};
/**
 * @since 1.14.0
 */
var partition = function (fa, p) {
    return partitionWithIndex(fa, function (_, a) { return p(a); });
};
/**
 * @since 1.14.0
 */
var separate = function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], ei = _a[1];
        if (ei.isLeft()) {
            left.set(k, ei.value);
        }
        else {
            right.set(k, ei.value);
        }
    }
    return {
        left: left,
        right: right
    };
};
/**
 * @since 1.14.0
 */
var wither = function (F) {
    var traverseF = traverse(F);
    return function (wa, f) { return F.map(traverseF(wa, f), compact); };
};
/**
 * @since 1.14.0
 */
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (wa, f) { return F.map(traverseF(wa, f), separate); };
};
/**
 * @since 1.14.0
 */
var filterMap = function (fa, f) {
    return filterMapWithIndex(fa, function (_, a) { return f(a); });
};
/**
 * @since 1.14.0
 */
var partitionMapWithIndex = function (fa, f) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var ei = f(k, a);
        if (ei.isLeft()) {
            left.set(k, ei.value);
        }
        else {
            right.set(k, ei.value);
        }
    }
    return {
        left: left,
        right: right
    };
};
/**
 * @since 1.14.0
 */
var partitionWithIndex = function (fa, p) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            right.set(k, a);
        }
        else {
            left.set(k, a);
        }
    }
    return {
        left: left,
        right: right
    };
};
/**
 * @since 1.14.0
 */
var filterMapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var o = f(k, a);
        if (o.isSome()) {
            m.set(k, o.value);
        }
    }
    return m;
};
/**
 * @since 1.14.0
 */
var filterWithIndex = function (fa, p) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            m.set(k, a);
        }
    }
    return m;
};
function fromFoldable(S, F) {
    return function (ta, f) {
        var lookupWithKeyS = exports.lookupWithKey(S);
        return F.reduce(ta, new Map(), function (b, _a) {
            var k = _a[0], a = _a[1];
            var bOpt = lookupWithKeyS(k, b);
            if (bOpt.isSome()) {
                b.set(bOpt.value[0], f(bOpt.value[1], a));
            }
            else {
                b.set(k, a);
            }
            return b;
        });
    };
}
exports.fromFoldable = fromFoldable;
/**
 * @since 1.14.0
 */
var compactable = {
    URI: exports.URI,
    compact: compact,
    separate: separate
};
/**
 * @since 1.14.0
 */
var functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @since 1.14.0
 */
var getFunctorWithIndex = function () {
    return __assign({ _L: function_1.phantom }, functor, { mapWithIndex: mapWithIndex });
};
/**
 * @since 1.14.0
 */
var getFoldable = function (O) {
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        reduce: reduce(O),
        foldMap: foldMap(O),
        foldr: foldr(O)
    };
};
/**
 * @since 1.14.0
 */
var getFoldableWithIndex = function (O) {
    return __assign({}, getFoldable(O), { reduceWithIndex: reduceWithIndex(O), foldMapWithIndex: foldMapWithIndex(O), foldrWithIndex: foldrWithIndex(O) });
};
/**
 * @since 1.14.0
 */
var filterable = __assign({}, compactable, functor, { filter: filter,
    filterMap: filterMap,
    partition: partition,
    partitionMap: partitionMap });
/**
 * @since 1.14.0
 */
exports.getFilterableWithIndex = function () {
    return __assign({}, filterable, getFunctorWithIndex(), { partitionMapWithIndex: partitionMapWithIndex,
        partitionWithIndex: partitionWithIndex,
        filterMapWithIndex: filterMapWithIndex,
        filterWithIndex: filterWithIndex });
};
/**
 * @since 1.14.0
 */
var getTraversable = function (O) {
    return __assign({ _L: function_1.phantom }, getFoldable(O), functor, { traverse: traverse,
        sequence: sequence });
};
/**
 * @since 1.14.0
 */
exports.getWitherable = function (O) {
    return __assign({}, filterable, getTraversable(O), { wilt: wilt,
        wither: wither });
};
/**
 * @since 1.14.0
 */
exports.getTraversableWithIndex = function (O) {
    return __assign({}, getFunctorWithIndex(), getFoldableWithIndex(O), getTraversable(O), { traverseWithIndex: traverseWithIndex });
};
/**
 * @since 1.14.0
 */
exports.map = __assign({ URI: exports.URI }, compactable, functor, filterable);