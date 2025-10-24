// test/polyfills.js
// Ensure TextEncoder/TextDecoder exist in the jsdom VM *before* modules load
const { TextEncoder, TextDecoder } = require("node:util");

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}
