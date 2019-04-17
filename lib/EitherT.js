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
var Applicative_1 = require("./Applicative");
var Either_1 = require("./Either");
function fold(F) {
    return function (left, right, fa) { return F.map(fa, function (e) { return (e.isLeft() ? left(e.value) : right(e.value)); }); };
}
exports.fold = fold;
function getEitherT(M) {
    var applicativeComposition = Applicative_1.getApplicativeComposition(M, Either_1.either);
    return __assign({}, applicativeComposition, { chain: function (fa, f) { return M.chain(fa, function (e) { return (e.isLeft() ? M.of(Either_1.left(e.value)) : f(e.value)); }); } });
}
exports.getEitherT = getEitherT;
