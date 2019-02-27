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
var Setoid_1 = require("./Setoid");
exports.URI = 'Either';
/**
 * Left side of {@link Either}
 */
var Left = /** @class */ (function () {
    function Left(value) {
        this.value = value;
        this._tag = 'Left';
    }
    /** The given function is applied if this is a `Right` */
    Left.prototype.map = function (f) {
        return this;
    };
    Left.prototype.ap = function (fab) {
        return (fab.isLeft() ? fab : this);
    };
    /**
     * Flipped version of {@link ap}
     */
    Left.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    /** Binds the given function across `Right` */
    Left.prototype.chain = function (f) {
        return this;
    };
    Left.prototype.bimap = function (f, g) {
        return new Left(f(this.value));
    };
    Left.prototype.alt = function (fy) {
        return fy;
    };
    /**
     * Lazy version of {@link alt}
     *
     * @example
     * import { right } from 'fp-ts/lib/Either'
     *
     * assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
     *
     * @since 1.6.0
     */
    Left.prototype.orElse = function (fy) {
        return fy(this.value);
    };
    Left.prototype.extend = function (f) {
        return this;
    };
    Left.prototype.reduce = function (b, f) {
        return b;
    };
    /** Applies a function to each case in the data structure */
    Left.prototype.fold = function (onLeft, onRight) {
        return onLeft(this.value);
    };
    /** Returns the value from this `Right` or the given argument if this is a `Left` */
    Left.prototype.getOrElse = function (a) {
        return a;
    };
    /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
    Left.prototype.getOrElseL = function (f) {
        return f(this.value);
    };
    /** Maps the left side of the disjunction */
    Left.prototype.mapLeft = function (f) {
        return new Left(f(this.value));
    };
    Left.prototype.inspect = function () {
        return this.toString();
    };
    Left.prototype.toString = function () {
        return "left(" + function_1.toString(this.value) + ")";
    };
    /** Returns `true` if the either is an instance of `Left`, `false` otherwise */
    Left.prototype.isLeft = function () {
        return true;
    };
    /** Returns `true` if the either is an instance of `Right`, `false` otherwise */
    Left.prototype.isRight = function () {
        return false;
    };
    /** Swaps the disjunction values */
    Left.prototype.swap = function () {
        return new Right(this.value);
    };
    Left.prototype.filterOrElse = function (_, zero) {
        return this;
    };
    Left.prototype.filterOrElseL = function (_, zero) {
        return this;
    };
    /**
     * Use {@link filterOrElse} instead
     * @since 1.6.0
     * @deprecated
     */
    Left.prototype.refineOrElse = function (p, zero) {
        return this;
    };
    /**
     * Lazy version of {@link refineOrElse}
     * Use {@link filterOrElseL} instead
     * @since 1.6.0
     * @deprecated
     */
    Left.prototype.refineOrElseL = function (p, zero) {
        return this;
    };
    return Left;
}());
exports.Left = Left;
/**
 * Right side of {@link Either}
 */
var Right = /** @class */ (function () {
    function Right(value) {
        this.value = value;
        this._tag = 'Right';
    }
    Right.prototype.map = function (f) {
        return new Right(f(this.value));
    };
    Right.prototype.ap = function (fab) {
        return fab.isRight() ? this.map(fab.value) : exports.left(fab.value);
    };
    Right.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Right.prototype.chain = function (f) {
        return f(this.value);
    };
    Right.prototype.bimap = function (f, g) {
        return new Right(g(this.value));
    };
    Right.prototype.alt = function (fy) {
        return this;
    };
    Right.prototype.orElse = function (fy) {
        return this;
    };
    Right.prototype.extend = function (f) {
        return new Right(f(this));
    };
    Right.prototype.reduce = function (b, f) {
        return f(b, this.value);
    };
    Right.prototype.fold = function (onLeft, onRight) {
        return onRight(this.value);
    };
    Right.prototype.getOrElse = function (a) {
        return this.value;
    };
    Right.prototype.getOrElseL = function (f) {
        return this.value;
    };
    Right.prototype.mapLeft = function (f) {
        return new Right(this.value);
    };
    Right.prototype.inspect = function () {
        return this.toString();
    };
    Right.prototype.toString = function () {
        return "right(" + function_1.toString(this.value) + ")";
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.swap = function () {
        return new Left(this.value);
    };
    Right.prototype.filterOrElse = function (p, zero) {
        return p(this.value) ? this : exports.left(zero);
    };
    Right.prototype.filterOrElseL = function (p, zero) {
        return p(this.value) ? this : exports.left(zero(this.value));
    };
    Right.prototype.refineOrElse = function (p, zero) {
        return p(this.value) ? this : exports.left(zero);
    };
    Right.prototype.refineOrElseL = function (p, zero) {
        return p(this.value) ? this : exports.left(zero(this.value));
    };
    return Right;
}());
exports.Right = Right;
/**
 * @since 1.0.0
 */
exports.getSetoid = function (SL, SA) {
    return Setoid_1.fromEquals(function (x, y) { return (x.isLeft() ? y.isLeft() && SL.equals(x.value, y.value) : y.isRight() && SA.equals(x.value, y.value)); });
};
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
exports.getSemigroup = function (S) {
    return {
        concat: function (x, y) { return (y.isLeft() ? x : x.isLeft() ? y : exports.right(S.concat(x.value, y.value))); }
    };
};
/**
 * {@link Apply} semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
exports.getApplySemigroup = function (S) {
    return {
        concat: function (x, y) { return (x.isLeft() ? x : y.isLeft() ? y : exports.right(S.concat(x.value, y.value))); }
    };
};
/**
 * @since 1.7.0
 */
exports.getApplyMonoid = function (M) {
    return __assign({}, exports.getApplySemigroup(M), { empty: exports.right(M.empty) });
};
exports.map = function (fa, f) {
    return fa.map(f);
};
exports.ap = function (fab, fa) {
    return fa.ap(fab);
};
exports.chain = function (fa, f) {
    return fa.chain(f);
};
exports.bimap = function (fla, f, g) {
    return fla.bimap(f, g);
};
exports.alt = function (fx, fy) {
    return fx.alt(fy);
};
exports.extend = function (ea, f) {
    return ea.extend(f);
};
exports.reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
exports.foldMap = function (M) { return function (fa, f) {
    return fa.isLeft() ? M.empty : f(fa.value);
}; };
exports.foldr = function (fa, b, f) {
    return fa.isLeft() ? b : f(fa.value, b);
};
exports.traverse = function (F) { return function (ta, f) {
    return ta.isLeft() ? F.of(exports.left(ta.value)) : F.map(f(ta.value), exports.of);
}; };
exports.sequence = function (F) { return function (ta) {
    return ta.isLeft() ? F.of(exports.left(ta.value)) : F.map(ta.value, exports.right);
}; };
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 1.0.0
 */
exports.left = function (l) {
    return new Left(l);
};
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 1.0.0
 * @alias of
 */
exports.right = function (a) {
    return new Right(a);
};
exports.of = exports.right;
function fromPredicate(predicate, onFalse) {
    return function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); };
}
exports.fromPredicate = fromPredicate;
/**
 * Use {@link fromPredicate} instead
 *
 * @since 1.6.0
 * @deprecated
 */
exports.fromRefinement = function (refinement, onFalse) { return function (a) {
    return refinement(a) ? exports.right(a) : exports.left(onFalse(a));
}; };
/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
exports.fromOption = function (defaultValue) { return function (fa) {
    return fa.isNone() ? exports.left(defaultValue) : exports.right(fa.value);
}; };
/**
 * Lazy version of {@link fromOption}
 *
 * @since 1.3.0
 */
exports.fromOptionL = function (defaultValue) { return function (fa) {
    return fa.isNone() ? exports.left(defaultValue()) : exports.right(fa.value);
}; };
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
exports.fromNullable = function (defaultValue) { return function (a) {
    return a == null ? exports.left(defaultValue) : exports.right(a);
}; };
/**
 * Default value for the optional `onerror` argument of `tryCatch`
 *
 * @since 1.0.0
 */
exports.toError = function (e) {
    if (e instanceof Error) {
        return e;
    }
    else {
        return new Error(String(e));
    }
};
/**
 * Use {@link tryCatch2v}
 *
 * @since 1.0.0
 * @deprecated
 */
exports.tryCatch = function (f, onerror) {
    if (onerror === void 0) { onerror = exports.toError; }
    return exports.tryCatch2v(f, onerror);
};
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch2v } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch2v(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 1.11.0
 */
exports.tryCatch2v = function (f, onerror) {
    try {
        return exports.right(f());
    }
    catch (e) {
        return exports.left(onerror(e));
    }
};
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 1.0.0
 */
exports.isLeft = function (fa) {
    return fa.isLeft();
};
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 1.0.0
 */
exports.isRight = function (fa) {
    return fa.isRight();
};
