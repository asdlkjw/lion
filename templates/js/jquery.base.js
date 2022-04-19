/**
 * jQuery Base v0.1.0 [License-Free, Stability NOT Guaranteed]
 * - Extends jQuery Utilities and Methods
 * - Sets Environment Information to <html>
 * - Depends to jQuery and UA-Parser
 */

(function($, win, doc) {
	'use strict';

	var $win = $(win), $doc = $(doc), $html = $doc.find('html'), $body;

	function calcScrollBarSize() {
		var $t = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo($body),
			w = $('<div>').css({width: '100%'}).appendTo($t).outerWidth();

		$t.remove();

		return 100 - w;
	}

	function normalizeString(str, defaultValue) {
		return (str || defaultValue || '').toLowerCase().replace(/(\s+)/g, '-');
	}

	$.extend($, {
		asArray: function(obj) {
			return this.isArray(obj) ? obj : ((obj && !$.isString(obj) && obj.length !== undefined) ? Array.prototype.slice.call(obj) : [obj]);
		},
		collectKeys: function(obj) {
			var keys = [];

			this.iterate(obj, function(v, k) {
				keys.push(k);
			});

			return keys;
		},
		decodeJSON: function(json) {
			try {
				return this.parseJSON(json);
			} catch (err) {
				return json;
			}
		},
		encodeJSON: function(obj) {
			if (win.JSON && this.isFunction(win.JSON.stringify)) {
				return window.JSON.stringify(obj);
			}
			if (this.isString(obj)) {
				return '"' + obj.replace(/"/g, '\\\"') + '"';
			} else if (obj === null || !this.isPlainObject(obj)) {
				return String(obj);
			}
			var jq = this, json = [], isArray = this.isArray(obj);

			this.iterate(obj, function(v, k, l) {
				if (v === undefined) {
					return;
				}
				if (jq.isString(v) || (jq.isPlainObject(v) && v !== null)) {
					v = jq.encodeJSON(v);
				}
				json.push((isArray ? '' : '"' + k + '":') + v);
			});

			return (isArray ? '[' : '{') + json.join() + (isArray ? ']' : '}');
		},
		env: {
			browser: {
				getOrientation: function() {
					return $win.height() > $win.width() ? 'portrait' : 'landscape';
				},
				isIE: function() {
					return this.name === 'ie';
				},
				isModern: function() {
					return !this.isIE() || this.version >= 9;
				},
				markOrientation: function() {
					$html.removeClass('view-portrait view-landscape').addClass('view-' + this.getOrientation());
					return this;
				},
				name: normalizeString($.ua.browser.name, 'unknown'),
				SCROLLBAR_SIZE: 17,
				version: parseInt($.ua.browser.major, 10)
			},
			device: {
				model: normalizeString($.ua.device.model, 'unknown'),
				type: normalizeString($.ua.device.type, 'desktop')
			},
			os: {
				name: normalizeString($.ua.os.name, 'unknown'),
				version: $.ua.os.version
			}
		},
		format: function(format) {
			var jq = this, args = this.asArray(arguments);

			return format.replace(/\$\{([\d+])\}/g, function(s, i) {
				var a = args[parseInt(i, 10)];
				return (jq.isString(a) || jq.isNumeric(a)) ? a : s;
			});
		},
		isBoolean: function(b) {
			return typeof b === 'boolean';
		},
		isEmpty: function(obj) {
			return ((obj === undefined || obj === null)
			|| (this.isString(obj) && this.trim(obj).length === 0)
			|| ((this.isArray(obj) || this.isJq(obj)) && obj.length === 0)
			|| (this.isPlainObject(obj) && this.collectKeys(obj).length === 0));
		},
		isEqual: function(a, b) {
			if (typeof a !== typeof b) {
				return false;
			}
			if (this.isArray(a) && this.isArray(b) && a.length === b.length) {
				for (var i = 0, v; v = a[i]; i++) {
					if (!this.isEqual(v, b[i])) {
						return false;
					}
				}
				return true;
			}
			if (this.isPlainObject(a) && this.isPlainObject(b)) {
				var keys = this.collectKeys(a);

				if (!this.isEqual(keys, this.collectKeys(b))) {
					return false;
				}
				for (var j = 0, k; k = keys[j++];) {
					if (!this.isEqual(a[k], b[k])) {
						return false;
					}
				}
				return true;
			}
			return a === b;
		},
		isInArray: function(item, list) {
			return this.inArray(item, list) >= 0;
		},
		isInString: function(word, str) {
			return this.isEmpty(word) ? false : (new RegExp('(^|\\s+)(' + word + ')(\\s+|$)', 'g')).test(str);
		},
		isJq: function(obj) {
			return !!(obj && obj.jquery);
		},
		isString: function(str) {
			return typeof str === 'string';
		},
		isWheelDown: function(ev) {
			return (ev.originalEvent.deltaY || -ev.originalEvent.wheelDelta || 0) >= 0;
		},
		iterate: function(obj, fn) {
			if (this.isArray(obj)) {
				for (var i = 0; i < obj.length; i++) {
					if (fn(obj[i], i, obj) === false) {
						break;
					}
				}
			} else if (this.isPlainObject(obj)) {
				for (var k in obj) {
					if (!obj.hasOwnProperty(k)) {
						continue;
					}
					if (fn(obj[k], k, obj) === false) {
						break;
					}
				}
			}
			return this;
		},
		jq: function(el) {
			return this.isJq(el) ? el : $(el);
		},
		keyCode: {
			ALT: 18,
			ARROW_DOWN: 40,
			ARROW_LEFT: 37,
			ARROW_RIGHT: 39,
			ARROW_UP: 38,
			BACKSPACE: 8,
			CTRL: 17,
			DELETE: 46,
			END: 35,
			ENTER: 13,
			ESC: 27,
			getActivatableKeyCode: function(tagName) {
				switch (tagName) {
				case 'a':
					return [this.ENTER];
				case 'button':
					return [this.ENTER, this.SPACE];
				default:
					return [this.SPACE];
				}
			},
			HOME: 36,
			isNormal: function(keyCode) {
				return (48 <= keyCode && keyCode <= 90)
					|| (96 <= keyCode && keyCode <= 111)
					|| (219 <= keyCode && keyCode <= 222)
					|| (188 <= keyCode && keyCode <= 192);
			},
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9
		},
		linear: function(x, xMin, xMax, yMin, yMax) {
			return (x - xMin) * (yMax - yMin) / (xMax - xMin) + yMin;
		},
		normalizeString: normalizeString,
		uuid: function(prefix) {
			return (prefix || '') + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
		},
		zerofill: function(value, length) {
			length -= value.toString().length;
			return (length > 0 ? (new Array(length + (/\./.test(value) ? 2 : 1))).join('0') : '') + value;
		}
	});

	$.fn.extend({
		at: function(index) {
			return $(this.get(index));
		},
		calcTextWidth: function() {
			var w, $t =  $('<div></div>');

			$t.text(this.at(0).text()).css({
				position: 'absolute',
				display: 'table',
				zIndex: -1,
				fontFamily: this.css('font-family'),
				fontSize: this.css('font-size'),
				fontWeight: this.css('font-weight')
			}).appendTo($body);

			w = $t.width();
			$t.remove();

			return w;
		},
		calcLocation: function() {
			if (!this.length) {
				return {};
			}
			var el = this.get(0), box = el.getBoundingClientRect(), body = $body.get(0), docElem = doc.documentElement;

			return {
				height: this.outerHeight(true),
				left: Math.round(box.left + (win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - (docElem.clientLeft || body.clientLeft || 0)),
				top: Math.round(box.top + (win.pageYOffset || docElem.scrollTop || body.scrollTop) - (docElem.clientTop || body.clientTop || 0)),
				width: this.outerWidth(true)
			};
		},
		ellipsis: function(isMultiline, surfix) {
			if (!$.isBoolean(isMultiline)) {
				surfix = isMultiline;
				isMultiline = false;
			}
			surfix = surfix || '...';

			return this.each(function() {
				var $el = $.jq(this), html = $el.html(), $temp, fn;

				$el.after($temp = $el.clone(true).hide().css({
					position: 'absolute',
					width: isMultiline ? $el.width() : 'auto',
					height: isMultiline ? 'auto' : $el.height(),
                    maxHeight: 'none',
					overflow: 'visible'
				}));

				fn = isMultiline ? function() {
					return $temp.height() > $el.height();
				} : function() {
					return $temp.width() > $el.width();
				};

				while (html.length > 0 && fn()) {
					html = html.substr(0, html.length - 1);
					$temp.html(html + surfix);
				}
				$el.html($temp.html());
				$temp.remove();
			});
		},
		isTextOverflown: function() {
			return this.calcTextWidth() > this.width();
		},
		setTabbable: function(tabbable) {
			return this.each(function() {
				var $el = $(this);

				if ($.isBoolean(tabbable)) {
					$el.prop('tabIndex', tabbable ? 0 : -1);
				} else {
					$el.removeAttr('tabIndex');
				}
			});
		},
		focusWithoutScroll: function() {
			var y = $win.scrollTop();
			this.focus();
            $win.scrollTop(y);
		}
	});

	(function($) {
		var classes = [];

		if (!$.env.browser.isModern()) {
			$.iterate(['article', 'aside', 'footer', 'header', 'main', 'nav', 'section'], function(t) {
				var el = doc.createElement(t);
				el = null;
			});
		}
		if ($.env.browser.isIE() && $.env.browser.version < 12) {
			for (var i = 11; i > $.env.browser.version; i--) {
				classes.unshift('lt-ie' + i);
			}
			classes.unshift('is-ie', 'is-ie' + $.env.browser.version);
		}
		if ($.env.os.name === 'windows' && $.env.os.version === '10') {
			$.env.device.type = 'desktop';
		}
		classes.push(
			'browser-name-' + $.env.browser.name,
			'browser-version-' + $.env.browser.version,
			'device-model-' + $.env.device.model,
			'device-type-' + $.env.device.type,
			'os-name-' + $.env.os.name,
			'os-version-' + $.env.os.version
		);
		$html.addClass(classes.join(' '));
	})($);

	$(function() {
		$body = $(doc.body);
		$.env.browser.SCROLLBAR_SIZE = calcScrollBarSize();
		$.env.browser.markOrientation();
		$win.on('resize', $.proxy($.env.browser.markOrientation, $.env.browser));
	});
})(jQuery, window, document);