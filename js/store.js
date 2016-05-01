(function (window) {
	'use strict';

	function Store(name, callback) {
		callback = callback || function () {};

		this._dbName = name;

		if (!localStorage[name]) {
			var opts = {
				data: []
			};

			localStorage[name] = JSON.stringify(opts);
		}

		callback.call(this, JSON.parse(localStorage[name]));
	}

	Store.prototype.find = function (query, callback) {
		if (!callback) {
			return;
		}

		var data = JSON.parse(localStorage[this._dbName]).data;

		callback.call(this, data.filter(function (items) {
			for (var q in query) {
				if (query[q] !== items[q]) {
					return false;
				}
			}
			return true;
		}));
	};

	Store.prototype.findAll = function (callback) {
		callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage[this._dbName]).data);
	};

	Store.prototype.save = function (updateData, callback, id) {
		var opts = JSON.parse(localStorage[this._dbName]);
		var data = opts.data;

		callback = callback || function () {};

		if (id) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].id === id) {
					for (var key in updateData) {
						data[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(opts);
			callback.call(this, JSON.parse(localStorage[this._dbName]).data);
		} else {
			updateData.id = new Date().getTime();

			data.push(updateData);
			localStorage[this._dbName] = JSON.stringify(opts);
			callback.call(this, [updateData]);
		}
	};

	Store.prototype.drop = function (callback) {
		localStorage[this._dbName] = JSON.stringify({data: []});
		callback.call(this, JSON.parse(localStorage[this._dbName]).data);
	};

	window.app = window.app || {};
	window.app.Store = Store;
})(window);
