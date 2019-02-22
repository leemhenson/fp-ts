"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("./IO_");
var function_1 = require("./function");
var fromIO = function_1.identity;
/**
 * @since 1.0.0
 */
exports.io = {
    URI: IO_1.URI,
    map: IO_1.map,
    of: IO_1.of,
    ap: IO_1.ap,
    chain: IO_1.chain,
    fromIO: fromIO
};
var IO_2 = require("./IO_");
exports.getMonoid = IO_2.getMonoid;
exports.getSemigroup = IO_2.getSemigroup;
exports.IO = IO_2.IO;
exports.URI = IO_2.URI;
