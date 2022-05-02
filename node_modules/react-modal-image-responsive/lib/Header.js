"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("./icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var image = _ref.image,
      alt = _ref.alt,
      zoomed = _ref.zoomed,
      toggleZoom = _ref.toggleZoom,
      toggleRotate = _ref.toggleRotate,
      onClose = _ref.onClose,
      enableDownload = _ref.enableDownload,
      enableZoom = _ref.enableZoom,
      enableRotate = _ref.enableRotate;
  return _react2.default.createElement(
    "div",
    { className: "__react_modal_image__header" },
    _react2.default.createElement(
      "span",
      { className: "__react_modal_image__icon_menu" },
      enableDownload && _react2.default.createElement(
        "a",
        { href: image, download: true },
        _react2.default.createElement(_icons.DownloadIcon, null)
      ),
      enableZoom && _react2.default.createElement(
        "a",
        { onClick: toggleZoom },
        zoomed ? _react2.default.createElement(_icons.ZoomOutIcon, null) : _react2.default.createElement(_icons.ZoomInIcon, null)
      ),
      enableRotate && _react2.default.createElement(
        "a",
        { onClick: toggleRotate },
        _react2.default.createElement(_icons.RotateIcon, null)
      ),
      _react2.default.createElement(
        "a",
        { onClick: onClose },
        _react2.default.createElement(_icons.CloseIcon, null)
      )
    ),
    alt && _react2.default.createElement(
      "span",
      { className: "__react_modal_image__caption" },
      alt
    )
  );
};

exports.default = Header;
module.exports = exports["default"];