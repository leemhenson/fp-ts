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
var Task_1 = require("./Task_");
/**
 * @since 1.0.0
 */
exports.task = {
    URI: Task_1.URI,
    map: Task_1.map,
    of: Task_1.of,
    ap: Task_1.ap,
    chain: Task_1.chain,
    fromIO: Task_1.fromIO,
    fromTask: Task_1.fromTask
};
/**
 * Like {@link task} but `ap` is sequential
 *
 * @since 1.10.0
 */
exports.taskSeq = __assign({}, exports.task, { ap: function (fab, fa) { return fab.chain(function (f) { return fa.map(f); }); } });
var Task_2 = require("./Task_");
exports.delay = Task_2.delay;
exports.fromIO = Task_2.fromIO;
exports.fromTask = Task_2.fromTask;
exports.getMonoid = Task_2.getMonoid;
exports.getRaceMonoid = Task_2.getRaceMonoid;
exports.getSemigroup = Task_2.getSemigroup;
exports.Task = Task_2.Task;
exports.tryCatch = Task_2.tryCatch;
