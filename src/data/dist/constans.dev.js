"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSlash = void 0;

var withSlash = function withSlash(url) {
  return url.replace(/\/+$/, "") + "/";
};

exports.withSlash = withSlash;