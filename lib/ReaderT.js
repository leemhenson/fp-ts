"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromReader(F) {
    return function (fa) { return function (e) { return F.of(fa.run(e)); }; };
}
exports.fromReader = fromReader;
function getReaderT(M) {
    return {
        map: function (fa, f) { return function (e) { return M.map(fa(e), f); }; },
        of: function (a) { return function () { return M.of(a); }; },
        ap: function (fab, fa) { return function (e) { return M.ap(fab(e), fa(e)); }; },
        chain: function (fa, f) { return function (e) { return M.chain(fa(e), function (a) { return f(a)(e); }); }; }
    };
}
exports.getReaderT = getReaderT;
