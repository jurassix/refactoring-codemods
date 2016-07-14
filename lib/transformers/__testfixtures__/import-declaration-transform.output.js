'use strict';

var _bar = require('./new/path/to/bar');

var _bar2 = _interopRequireDefault(_bar);

var _foo = require('./new/path/to/foo');

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bar2.default)();
(0, _foo2.default)();