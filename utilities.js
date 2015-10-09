this["rl_utilities"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var behaviors = __webpack_require__(2);
	exports.behaviors = behaviors;
	var filters = __webpack_require__(4);
	exports.filters = filters;
	var services = __webpack_require__(11);
	exports.services = services;
	var types = __webpack_require__(39);
	exports.types = types;
	exports.name = 'rl.utilities';
	angular.module(exports.name, [
	    behaviors.name,
	    filters.name,
	    services.name,
	]);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() { module.exports = this["angular"]; }());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var stopEventPropogation = __webpack_require__(3);
	exports.stopEventPropogation = stopEventPropogation;
	exports.name = 'rl.utilities.behaviors';
	angular.module(exports.name, [
	    stopEventPropogation.moduleName,
	]);
	//# sourceMappingURL=behaviors.module.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.behaviors.stopEventPropogation';
	exports.directiveName = 'rlStopEventPropagation';
	function stopEventPropagation() {
	    'use strict';
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            element.on(attrs.rlStopEventPropagation, function (event) {
	                event.preventDefault();
	                event.stopPropagation();
	            });
	        }
	    };
	}
	angular.module(exports.moduleName, [])
	    .directive(exports.directiveName, stopEventPropagation);
	//# sourceMappingURL=stopEventPropagation.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var isEmpty = __webpack_require__(5);
	exports.isEmpty = isEmpty;
	var truncate = __webpack_require__(9);
	exports.truncate = truncate;
	__export(__webpack_require__(10));
	exports.name = 'rl.utilities.filters';
	angular.module(exports.name, [
	    isEmpty.moduleName,
	    truncate.moduleName,
	]);
	//# sourceMappingURL=filters.module.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var object_service_1 = __webpack_require__(6);
	exports.moduleName = 'rl.utilities.filters.isEmpty';
	exports.serviceName = 'isEmpty';
	exports.filterName = exports.serviceName + 'Filter';
	isEmpty.$inject = [object_service_1.serviceName];
	function isEmpty(object) {
	    'use strict';
	    return function (input, trueWhenEmpty) {
	        var isEmpty = object.isNullOrEmpty(input);
	        if (trueWhenEmpty === false) {
	            return !isEmpty;
	        }
	        return isEmpty;
	    };
	}
	angular.module(exports.moduleName, [object_service_1.moduleName])
	    .filter(exports.serviceName, isEmpty);
	//# sourceMappingURL=isEmpty.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var array_service_1 = __webpack_require__(8);
	exports.moduleName = 'rl.utilities.services.object';
	exports.serviceName = 'objectUtility';
	var ObjectUtility = (function () {
	    function ObjectUtility(array) {
	        this.array = array;
	    }
	    ObjectUtility.prototype.isNullOrEmpty = function (object) {
	        if (object == null) {
	            return true;
	        }
	        else if (_.isArray(object)) {
	            return _.any(object) === false;
	        }
	        else if (_.isNumber(object)) {
	            return _.isNaN(object);
	        }
	        else {
	            return object === '';
	        }
	    };
	    ObjectUtility.prototype.isNullOrWhitespace = function (object) {
	        if (_.isString(object)) {
	            object = object.trim();
	        }
	        return this.isNullOrEmpty(object);
	    };
	    ObjectUtility.prototype.areEqual = function (obj1, obj2) {
	        var _this = this;
	        var type1 = typeof obj1;
	        var type2 = typeof obj2;
	        if (obj1 == null && obj2 == null) {
	            return true;
	        }
	        else if (obj1 == null || obj2 == null) {
	            return false;
	        }
	        if (type1 !== type2) {
	            return false;
	        }
	        else if (obj1 instanceof Array) {
	            if (obj1.length !== obj2.length) {
	                return false;
	            }
	            for (var i = 0; i < obj1.length; i++) {
	                if (this.areEqual(obj1[i], obj2[i]) === false) {
	                    return false;
	                }
	            }
	        }
	        else if (type1 === 'object') {
	            //init an object with the keys from obj2
	            var keys2 = _.keys(obj2);
	            _.forIn(obj1, function (value, key) {
	                if (_.has(obj2, key)) {
	                    //compare value against the value with the same key in obj2, then remove the key
	                    if (_this.areEqual(value, obj2[key]) === false) {
	                        return false;
	                    }
	                    else {
	                        _this.array.remove(keys2, key);
	                    }
	                }
	                else {
	                    return false;
	                }
	            });
	            //if there are still keys left in keys2, we know they are not equal (obj2 has more properties)
	            if (_.any(keys2)) {
	                return false;
	            }
	        }
	        else {
	            //if types are primitive, do a simple comparison
	            return obj1 === obj2;
	        }
	        return true;
	    };
	    ObjectUtility.prototype.toString = function (object) {
	        return object + '';
	    };
	    ObjectUtility.prototype.valueOrDefault = function (value, defaultValue) {
	        if (value != null) {
	            return value;
	        }
	        else {
	            return defaultValue;
	        }
	    };
	    ObjectUtility.$inject = [array_service_1.serviceName];
	    return ObjectUtility;
	})();
	angular.module(exports.moduleName, [array_service_1.moduleName])
	    .service(exports.serviceName, ObjectUtility);
	//# sourceMappingURL=object.service.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	(function() { module.exports = this["_"]; }());

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.array';
	exports.serviceName = 'arrayUtility';
	var ArrayUtility = (function () {
	    function ArrayUtility() {
	    }
	    ArrayUtility.prototype.findIndexOf = function (array, predicate) {
	        var targetIndex;
	        _.each(array, function (item, index) {
	            if (predicate(item)) {
	                targetIndex = index;
	                return false;
	            }
	        });
	        return targetIndex != null ? targetIndex : -1;
	    };
	    ArrayUtility.prototype.remove = function (array, item) {
	        var index;
	        if (_.isFunction(item)) {
	            index = this.findIndexOf(array, item);
	        }
	        else {
	            index = _.indexOf(array, item);
	        }
	        if (index >= 0) {
	            return array.splice(index, 1)[0];
	        }
	        else {
	            return null;
	        }
	    };
	    ArrayUtility.prototype.replace = function (array, oldItem, newItem) {
	        var index = _.indexOf(array, oldItem);
	        if (index >= 0) {
	            array.splice(index, 1, newItem);
	        }
	    };
	    ArrayUtility.prototype.sum = function (array, transform) {
	        var list;
	        if (transform != null) {
	            list = _.map(array, function (item) { return transform(item); });
	        }
	        else {
	            list = array;
	        }
	        return _.reduce(list, function (sum, num) { return sum + num; }, 0);
	    };
	    ArrayUtility.prototype.toDictionary = function (array, keySelector) {
	        // needs to be seeded with an object or it will be viewed as an array with no items
	        return _.reduce(array, function (dictionary, item) {
	            dictionary[keySelector(item)] = item;
	            return dictionary;
	        }, {});
	    };
	    return ArrayUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, ArrayUtility);
	//# sourceMappingURL=array.service.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
	var object_service_1 = __webpack_require__(6);
	exports.moduleName = 'rl.utilities.filters.truncate';
	exports.serviceName = 'truncate';
	exports.filterName = exports.serviceName + 'Filter';
	truncate.$inject = [object_service_1.serviceName];
	function truncate(objectUtility) {
	    'use strict';
	    return function (input, truncateTo, includeEllipses) {
	        includeEllipses = includeEllipses == null ? false : includeEllipses;
	        var out = objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
	        if (out.length) {
	            if (truncateTo != null && out.length > truncateTo) {
	                out = out.substring(0, truncateTo);
	                if (includeEllipses) {
	                    out += '...';
	                }
	            }
	        }
	        return out;
	    };
	}
	angular.module(exports.moduleName, [object_service_1.moduleName])
	    .filter(exports.serviceName, truncate);
	//# sourceMappingURL=truncate.js.map

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	//# sourceMappingURL=filter.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var array = __webpack_require__(8);
	exports.array = array;
	var autosave = __webpack_require__(12);
	exports.autosave = autosave;
	var autosaveAction = __webpack_require__(13);
	exports.autosaveAction = autosaveAction;
	var boolean = __webpack_require__(14);
	exports.boolean = boolean;
	var date = __webpack_require__(15);
	exports.date = date;
	var fileSize = __webpack_require__(22);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(26);
	exports.genericSearchFilter = genericSearchFilter;
	var moment = __webpack_require__(16);
	exports.moment = moment;
	var notification = __webpack_require__(28);
	exports.notification = notification;
	var numberService = __webpack_require__(23);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(31);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(32);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(33);
	exports.promise = promise;
	var stringService = __webpack_require__(27);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(34);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(35);
	exports.test = test;
	var time = __webpack_require__(18);
	exports.time = time;
	var validation = __webpack_require__(38);
	exports.validation = validation;
	exports.name = 'rl.utilities.services';
	angular.module(exports.name, [
	    array.moduleName,
	    autosave.moduleName,
	    autosaveAction.moduleName,
	    boolean.moduleName,
	    date.moduleName,
	    fileSize.moduleName,
	    genericSearchFilter.moduleName,
	    moment.moduleName,
	    notification.moduleName,
	    numberService.moduleName,
	    objectService.moduleName,
	    observable.moduleName,
	    parentChildBehavior.moduleName,
	    promise.moduleName,
	    stringService.moduleName,
	    synchronizedRequests.moduleName,
	    time.moduleName,
	    test.moduleName,
	    validation.moduleName,
	]);
	//# sourceMappingURL=services.module.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var autosaveAction_service_1 = __webpack_require__(13);
	exports.moduleName = 'rl.utilities.services.autosave';
	exports.factoryName = 'autosaveFactory';
	var AutosaveService = (function () {
	    function AutosaveService(autosaveService, save, contentForm, validate) {
	        var _this = this;
	        this.autosaveService = autosaveService;
	        this.save = save;
	        this.contentForm = contentForm;
	        this.validate = validate;
	        this.autosave = function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i - 0] = arguments[_i];
	            }
	            if (_this.contentForm.$pristine) {
	                return true;
	            }
	            var valid = true;
	            if (_this.hasValidator) {
	                valid = _this.validate();
	                if (valid === undefined) {
	                    valid = true;
	                }
	            }
	            if (valid) {
	                var promise = _this.save.apply(_this, data);
	                if (!_.isUndefined(promise)) {
	                    _this.autosaveService.trigger(promise.then(function () {
	                        if (_this.contentForm != null) {
	                            _this.contentForm.$setPristine();
	                        }
	                    }));
	                }
	                return true;
	            }
	            else {
	                return false;
	            }
	        };
	        this.hasValidator = validate != null;
	        if (this.contentForm == null) {
	            this.contentForm = this.nullForm();
	        }
	    }
	    AutosaveService.prototype.nullForm = function () {
	        return {
	            $pristine: false,
	            $setPristine: function () {
	                return;
	            },
	        };
	    };
	    return AutosaveService;
	})();
	autosaveServiceFactory.$inject = [autosaveAction_service_1.serviceName];
	function autosaveServiceFactory(autosaveService) {
	    'use strict';
	    return {
	        getInstance: function (save, contentForm, validate) {
	            return new AutosaveService(autosaveService, save, contentForm, validate);
	        }
	    };
	}
	angular.module(exports.moduleName, [autosaveAction_service_1.moduleName])
	    .factory(exports.factoryName, autosaveServiceFactory);
	//# sourceMappingURL=autosave.service.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.autosaveAction';
	exports.serviceName = 'autosaveAction';
	var AutosaveActionService = (function () {
	    function AutosaveActionService($timeout) {
	        var _this = this;
	        this.$timeout = $timeout;
	        this.completeMessageDuration = 1000;
	        this.autosaveSuccessful = function (data) {
	            return _this.resolveAutosave(data, true);
	        };
	        this.autosaveFailed = function (data) {
	            return _this.resolveAutosave(data, false);
	        };
	        this.resolveAutosave = function (data, success) {
	            _this._saving = false;
	            _this._complete = true;
	            _this._successful = success;
	            _this.$timeout(function () {
	                _this._complete = false;
	            }, _this.completeMessageDuration);
	            return data;
	        };
	    }
	    Object.defineProperty(AutosaveActionService.prototype, "saving", {
	        get: function () {
	            return this._saving;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AutosaveActionService.prototype, "complete", {
	        get: function () {
	            return this._complete;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AutosaveActionService.prototype, "successful", {
	        get: function () {
	            return this._successful;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AutosaveActionService.prototype.trigger = function (promise) {
	        this._saving = true;
	        return promise.then(this.autosaveSuccessful)
	            .catch(this.autosaveFailed);
	    };
	    AutosaveActionService.$inject = ['$timeout'];
	    return AutosaveActionService;
	})();
	ng.module(exports.moduleName, [])
	    .service(exports.serviceName, AutosaveActionService);
	//# sourceMappingURL=autosaveAction.service.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.boolean';
	exports.serviceName = 'booleanUtility';
	var BooleanUtility = (function () {
	    function BooleanUtility() {
	    }
	    BooleanUtility.prototype.toBool = function (object) {
	        return !!object;
	    };
	    return BooleanUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, BooleanUtility);
	//# sourceMappingURL=boolean.service.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(16);
	var time_service_1 = __webpack_require__(18);
	var date_service_1 = __webpack_require__(19);
	var dateTimeFormatStrings_1 = __webpack_require__(21);
	__export(__webpack_require__(19));
	__export(__webpack_require__(21));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);
	//# sourceMappingURL=date.module.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(17);
	exports.moduleName = 'rl.utilities.services.momentWrapper';
	exports.serviceName = 'momentWrapper';
	function momentWrapper() {
	    'use strict';
	    // Using `any` instead of MomentStatic because
	    //  createFromInputFallback doesn't appear to be
	    //  defined in MomentStatic... :-(
	    var momentWrapper = moment; // moment must already be loaded
	    // Set default method for handling non-ISO date conversions.
	    // See 4/28 comment in https://github.com/moment/moment/issues/1407
	    // This also prevents the deprecation warning message to the console.
	    momentWrapper.createFromInputFallback = function (config) {
	        config._d = new Date(config._i);
	    };
	    return momentWrapper;
	}
	exports.momentWrapper = momentWrapper;
	angular.module(exports.moduleName, [])
	    .factory(exports.serviceName, momentWrapper);
	//# sourceMappingURL=moment.module.js.map

/***/ },
/* 17 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.time';
	exports.serviceName = 'timeUtility';
	var TimeUtility = (function () {
	    function TimeUtility() {
	    }
	    TimeUtility.prototype.millisecondsToSeconds = function (milliseconds) {
	        return Math.floor(milliseconds / 1000);
	    };
	    TimeUtility.prototype.millisecondsToMinutes = function (milliseconds) {
	        return Math.floor(this.millisecondsToSeconds(milliseconds) / 60);
	    };
	    TimeUtility.prototype.millisecondsToHours = function (milliseconds) {
	        return Math.floor(this.millisecondsToMinutes(milliseconds) / 60);
	    };
	    TimeUtility.prototype.millisecondsToDays = function (milliseconds) {
	        return Math.floor(this.millisecondsToHours(milliseconds) / 24);
	    };
	    return TimeUtility;
	})();
	exports.TimeUtility = TimeUtility;
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, TimeUtility);
	//# sourceMappingURL=time.service.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var time_service_1 = __webpack_require__(18);
	var moment_module_1 = __webpack_require__(16);
	var compareResult_1 = __webpack_require__(20);
	exports.serviceName = 'dateUtility';
	var DateUtility = (function () {
	    function DateUtility(moment, time) {
	        var _this = this;
	        this.moment = moment;
	        this.time = time;
	        this.baseFormat = 'MM-DD-YYYY';
	        this.month = [
	            { name: 'January', days: function () { return 31; } },
	            { name: 'February', days: function (year) { return _this.isLeapYear(year) ? 29 : 28; } },
	            { name: 'March', days: function () { return 31; } },
	            { name: 'April', days: function () { return 30; } },
	            { name: 'May', days: function () { return 31; } },
	            { name: 'June', days: function () { return 30; } },
	            { name: 'July', days: function () { return 31; } },
	            { name: 'August', days: function () { return 31; } },
	            { name: 'September', days: function () { return 30; } },
	            { name: 'October', days: function () { return 31; } },
	            { name: 'November', days: function () { return 30; } },
	            { name: 'December', days: function () { return 31; } },
	        ];
	    }
	    DateUtility.prototype.isLeapYear = function (year) {
	        return new Date(year, 1, 29).getMonth() === 1;
	    };
	    DateUtility.prototype.getFullString = function (month) {
	        return this.month[month].name;
	    };
	    DateUtility.prototype.getDays = function (month, year) {
	        return this.month[month].days(year);
	    };
	    DateUtility.prototype.subtractDates = function (start, end, dateFormat) {
	        if (start == null || end == null) {
	            return null;
	        }
	        var startDate = this.getDate(start, dateFormat);
	        var endDate = this.getDate(end, dateFormat);
	        var result = {};
	        result.days = endDate.getDate() - startDate.getDate();
	        result.years = endDate.getFullYear() - startDate.getFullYear();
	        result.months = endDate.getMonth() - startDate.getMonth();
	        if (result.days < 0) {
	            result.months -= 1;
	            result.days += this.getDays(startDate.getMonth(), startDate.getFullYear());
	        }
	        if (result.months < 0) {
	            result.years -= 1;
	            result.months += 12;
	        }
	        return result;
	    };
	    DateUtility.prototype.subtractDateInDays = function (start, end, dateFormat) {
	        if (start == null || end == null) {
	            return null;
	        }
	        var startDate = this.getDate(start, dateFormat);
	        var endDate = this.getDate(end, dateFormat);
	        var milliseconds = endDate.getTime() - startDate.getTime();
	        return this.time.millisecondsToDays(milliseconds);
	    };
	    DateUtility.prototype.compareDates = function (date1, date2, dateFormat) {
	        // subtractDateInDays subtracts the fist from the second, assuming start and end dates
	        var difference = this.subtractDateInDays(date2, date1, dateFormat);
	        return compareResult_1.getCompareResult(difference);
	    };
	    DateUtility.prototype.dateInRange = function (date, rangeStart, rangeEnd) {
	        if (this.compareDates(date, rangeStart) === compareResult_1.CompareResult.less) {
	            return false;
	        }
	        else if (this.compareDates(date, rangeEnd) === compareResult_1.CompareResult.greater) {
	            return false;
	        }
	        else {
	            return true;
	        }
	    };
	    DateUtility.prototype.getDate = function (date, dateFormat) {
	        var format = dateFormat != null ? dateFormat : this.baseFormat;
	        if (_.isDate(date)) {
	            return date;
	        }
	        else {
	            return this.moment(date, format).toDate();
	        }
	    };
	    DateUtility.prototype.getNow = function () {
	        return new Date();
	    };
	    DateUtility.$inject = [moment_module_1.serviceName, time_service_1.serviceName];
	    return DateUtility;
	})();
	exports.DateUtility = DateUtility;
	//# sourceMappingURL=date.service.js.map

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	(function (CompareResult) {
	    CompareResult[CompareResult["greater"] = 1] = "greater";
	    CompareResult[CompareResult["equal"] = 0] = "equal";
	    CompareResult[CompareResult["less"] = -1] = "less";
	})(exports.CompareResult || (exports.CompareResult = {}));
	var CompareResult = exports.CompareResult;
	function getCompareResult(num) {
	    'use strict';
	    if (num === 0) {
	        return CompareResult.equal;
	    }
	    else if (num > 0) {
	        return CompareResult.greater;
	    }
	    else {
	        return CompareResult.less;
	    }
	}
	exports.getCompareResult = getCompareResult;
	//# sourceMappingURL=compareResult.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	exports.dateTimeFormatServiceName = 'dateTimeFormatStrings';
	exports.defaultFormats = {
	    dateTimeFormat: 'M/D/YYYY h:mm A',
	    dateFormat: 'M/D/YYYY',
	    timeFormat: 'h:mmA',
	};
	//# sourceMappingURL=dateTimeFormatStrings.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(23);
	var fileSize_service_1 = __webpack_require__(24);
	var fileSizeFilter_1 = __webpack_require__(25);
	__export(__webpack_require__(24));
	__export(__webpack_require__(25));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);
	//# sourceMappingURL=fileSize.module.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.number';
	exports.serviceName = 'numberUtility';
	var Sign;
	(function (Sign) {
	    Sign[Sign["positive"] = 1] = "positive";
	    Sign[Sign["negative"] = -1] = "negative";
	})(Sign || (Sign = {}));
	var NumberUtility = (function () {
	    function NumberUtility() {
	    }
	    NumberUtility.prototype.preciseRound = function (num, decimals) {
	        var sign = num >= 0 ? Sign.positive : Sign.negative;
	        return (Math.round((num * Math.pow(10, decimals)) + (sign * 0.001)) / Math.pow(10, decimals));
	    };
	    NumberUtility.prototype.integerDivide = function (dividend, divisor) {
	        return Math.floor(dividend / divisor);
	    };
	    NumberUtility.prototype.roundToStep = function (num, step) {
	        if (!step) {
	            return num;
	        }
	        var remainder = num % step;
	        if (remainder >= step / 2) {
	            return num + (step - remainder);
	        }
	        else {
	            return num - remainder;
	        }
	    };
	    return NumberUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, NumberUtility);
	//# sourceMappingURL=number.service.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(23);
	exports.factoryName = 'fileSizeFactory';
	var FileSizeService = (function () {
	    function FileSizeService(numberUtility, bytes) {
	        this.BYTES_PER_GB = 1073741824;
	        this.BYTES_PER_MB = 1048576;
	        this.BYTES_PER_KB = 1024;
	        this.bytes = bytes;
	        if (bytes >= this.BYTES_PER_GB) {
	            this.isGB = true;
	            this.GB = bytes / this.BYTES_PER_GB;
	            this.GB = numberUtility.preciseRound(this.GB, 1);
	        }
	        else {
	            this.isGB = false;
	            if (bytes >= this.BYTES_PER_MB) {
	                this.isMB = true;
	                this.MB = bytes / this.BYTES_PER_MB;
	                this.MB = numberUtility.preciseRound(this.MB, 1);
	            }
	            else {
	                this.isMB = false;
	                if (bytes >= this.BYTES_PER_KB) {
	                    this.isKB = true;
	                    this.KB = bytes / this.BYTES_PER_KB;
	                    this.KB = numberUtility.preciseRound(this.KB, 1);
	                }
	                else {
	                    this.isKB = false;
	                }
	            }
	        }
	        this.bytes = Math.round(this.bytes);
	    }
	    FileSizeService.prototype.display = function () {
	        if (this.isGB) {
	            return this.GB + ' GB';
	        }
	        else if (this.isMB) {
	            return this.MB + ' MB';
	        }
	        else if (this.isKB) {
	            return this.KB + ' KB';
	        }
	        else {
	            return this.bytes + ' bytes';
	        }
	    };
	    return FileSizeService;
	})();
	fileSizeFactory.$inject = [number_service_1.serviceName];
	function fileSizeFactory(numberUtility) {
	    'use strict';
	    return {
	        getInstance: function (bytes) {
	            return new FileSizeService(numberUtility, bytes);
	        },
	    };
	}
	exports.fileSizeFactory = fileSizeFactory;
	//# sourceMappingURL=fileSize.service.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(24);
	// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
	exports.simpleFilterName = 'fileSize';
	exports.filterName = exports.simpleFilterName + 'Filter';
	fileSizeFilter.$inject = [fileSize_service_1.factoryName];
	function fileSizeFilter(fileSizeFactory) {
	    'use strict';
	    return function (bytes) {
	        var fileSize = fileSizeFactory.getInstance(bytes);
	        return fileSize.display();
	    };
	}
	exports.fileSizeFilter = fileSizeFilter;
	//# sourceMappingURL=fileSizeFilter.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(27);
	exports.moduleName = 'rl.utilities.services.genericSearchFilter';
	exports.factoryName = 'genericSearchFilterFactory';
	exports.filterName = 'search';
	var GenericSearchFilter = (function () {
	    function GenericSearchFilter(object, string) {
	        this.object = object;
	        this.string = string;
	        this.type = exports.filterName;
	        this.minSearchLength = 1;
	        this.caseSensitive = false;
	    }
	    GenericSearchFilter.prototype.filter = function (item) {
	        if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
	            return true;
	        }
	        return this.searchObject(item, this.searchText, this.caseSensitive);
	    };
	    GenericSearchFilter.prototype.searchObject = function (item, search, caseSensitive) {
	        var _this = this;
	        if (_.isObject(item)) {
	            var values = _.values(item);
	            return _.any(values, function (value) { return _this.searchObject(value, search, caseSensitive); });
	        }
	        else {
	            var dataString = this.object.toString(item);
	            if (!caseSensitive) {
	                search = search.toLowerCase();
	                dataString = dataString.toLowerCase();
	            }
	            return this.string.contains(dataString, search);
	        }
	    };
	    return GenericSearchFilter;
	})();
	exports.GenericSearchFilter = GenericSearchFilter;
	genericSearchFilterFactory.$inject = [object_service_1.serviceName, string_service_1.serviceName];
	function genericSearchFilterFactory(object, stringUtility) {
	    'use strict';
	    return {
	        getInstance: function () {
	            return new GenericSearchFilter(object, stringUtility);
	        }
	    };
	}
	angular.module(exports.moduleName, [object_service_1.moduleName, string_service_1.moduleName])
	    .factory(exports.factoryName, genericSearchFilterFactory);
	//# sourceMappingURL=genericSearchFilter.service.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.string';
	exports.serviceName = 'stringUtilityService';
	var StringUtilityService = (function () {
	    function StringUtilityService() {
	    }
	    StringUtilityService.prototype.toNumber = function (string) {
	        return +string;
	    };
	    StringUtilityService.prototype.contains = function (str, substring) {
	        if (substring) {
	            return str.indexOf(substring) !== -1;
	        }
	        return true;
	    };
	    StringUtilityService.prototype.substitute = function (formatString) {
	        var _this = this;
	        var params = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            params[_i - 1] = arguments[_i];
	        }
	        _.each(params, function (param, index) {
	            formatString = _this.replaceAll(formatString, '\\{' + index + '\\}', param);
	        });
	        return formatString;
	    };
	    StringUtilityService.prototype.replaceAll = function (str, patternToFind, replacementString) {
	        return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
	    };
	    return StringUtilityService;
	})();
	exports.StringUtilityService = StringUtilityService;
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, StringUtilityService);
	//# sourceMappingURL=string.service.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(29);
	__export(__webpack_require__(30));
	exports.moduleName = 'rl.utilities.services.notification';
	exports.serviceName = 'notification';
	var NotificationService = (function () {
	    function NotificationService(notifier) {
	        this.notifier = notifier;
	    }
	    NotificationService.prototype.info = function (message) {
	        this.notifier.info(message);
	    };
	    NotificationService.prototype.warning = function (message) {
	        this.notifier.warning(message);
	    };
	    NotificationService.prototype.error = function (message) {
	        this.notifier.error(message);
	    };
	    NotificationService.prototype.success = function (message) {
	        this.notifier.success(message);
	    };
	    return NotificationService;
	})();
	exports.NotificationService = NotificationService;
	function notificationServiceProvider() {
	    'use strict';
	    var _this = this;
	    var provider = {
	        notifier: new baseNotifier_1.BaseNotifier(),
	        setNotifier: function (notifier) {
	            _this.notifier = notifier;
	        },
	        $get: function () {
	            return new NotificationService(_this.notifier);
	        },
	    };
	    return provider;
	}
	exports.notificationServiceProvider = notificationServiceProvider;
	angular.module(exports.moduleName, [])
	    .provider(exports.serviceName, notificationServiceProvider);
	//# sourceMappingURL=notification.service.js.map

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	var BaseNotifier = (function () {
	    function BaseNotifier() {
	    }
	    BaseNotifier.prototype.info = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.warning = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.error = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.success = function (message) {
	        this.notify(message);
	    };
	    BaseNotifier.prototype.notify = function (message) {
	        window.alert(message);
	        console.log(message);
	    };
	    return BaseNotifier;
	})();
	exports.BaseNotifier = BaseNotifier;
	//# sourceMappingURL=baseNotifier.js.map

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	//# sourceMappingURL=notificationTypes.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.observable';
	exports.factoryName = 'observableFactory';
	var ObservableService = (function () {
	    function ObservableService() {
	        this.watchers = [];
	        this.nextKey = 0;
	    }
	    ObservableService.prototype.register = function (action, event) {
	        var _this = this;
	        if (!_.isFunction(action)) {
	            console.log('Error: watcher must be a function');
	            return null;
	        }
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.watchers[currentKey] = {
	            action: action,
	            event: event,
	        };
	        return function () {
	            _this.unregister(currentKey);
	        };
	    };
	    ObservableService.prototype.fire = function (event) {
	        var _this = this;
	        var params = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            params[_i - 1] = arguments[_i];
	        }
	        return _(this.watchers).filter(function (watcher) {
	            return watcher != null && watcher.event === event;
	        })
	            .map(function (watcher) {
	            return watcher.action.apply(_this, params);
	        }).value();
	    };
	    ObservableService.prototype.unregister = function (key) {
	        this.watchers[key] = null;
	    };
	    return ObservableService;
	})();
	exports.ObservableService = ObservableService;
	function observableServiceFactory() {
	    'use strict';
	    return {
	        getInstance: function () {
	            return new ObservableService();
	        }
	    };
	}
	exports.observableServiceFactory = observableServiceFactory;
	ng.module(exports.moduleName, [])
	    .factory(exports.factoryName, observableServiceFactory);
	//# sourceMappingURL=observable.service.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.parentChildBehavior';
	exports.serviceName = 'parentChildBehavior';
	var ParentChildBehaviorService = (function () {
	    function ParentChildBehaviorService() {
	    }
	    ParentChildBehaviorService.prototype.getChildBehavior = function (child) {
	        return child && child.viewData != null
	            ? child.viewData.behavior
	            : null;
	    };
	    ParentChildBehaviorService.prototype.triggerChildBehavior = function (child, action) {
	        var behavior = this.getChildBehavior(child);
	        if (behavior == null) {
	            return null;
	        }
	        else {
	            return action(behavior);
	        }
	    };
	    ParentChildBehaviorService.prototype.triggerAllChildBehaviors = function (childList, action) {
	        var behaviors = this.getAllChildBehaviors(childList);
	        return _.map(behaviors, function (behavior) {
	            return action(behavior);
	        });
	    };
	    ParentChildBehaviorService.prototype.getAllChildBehaviors = function (childList) {
	        var _this = this;
	        return _(childList).map(function (child) { return _this.getChildBehavior(child); })
	            .filter(function (behavior) { return behavior != null; })
	            .value();
	    };
	    ParentChildBehaviorService.prototype.registerChildBehavior = function (child, behavior) {
	        if (child == null) {
	            return;
	        }
	        if (child.viewData == null) {
	            child.viewData = { behavior: null };
	        }
	        var currentBehavior = child.viewData.behavior;
	        if (currentBehavior == null) {
	            child.viewData.behavior = behavior;
	        }
	        else {
	            child.viewData.behavior = _.extend(currentBehavior, behavior);
	        }
	    };
	    return ParentChildBehaviorService;
	})();
	exports.ParentChildBehaviorService = ParentChildBehaviorService;
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, ParentChildBehaviorService);
	//# sourceMappingURL=parentChildBehavior.service.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.promise';
	exports.serviceName = 'promiseUtility';
	var PromiseUtility = (function () {
	    function PromiseUtility($q, $injector) {
	        this.$q = $q;
	        this.$injector = $injector;
	    }
	    PromiseUtility.prototype.isPromise = function (promise) {
	        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	    };
	    PromiseUtility.prototype.resolvePromises = function (resolves) {
	        var _this = this;
	        var promises = {};
	        _.each(resolves, function (value, key) {
	            if (_.isFunction(value) || _.isArray(value)) {
	                promises[key] = (_this.$q.when(_this.$injector.invoke(value)));
	            }
	            else if (_.isString(value)) {
	                promises[key] = (_this.$q.when(_this.$injector.get(value)));
	            }
	            else {
	                promises[key] = (_this.$q.when(value));
	            }
	        });
	        return this.$q.all(promises);
	    };
	    PromiseUtility.$inject = ['$q', '$injector'];
	    return PromiseUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, PromiseUtility);
	//# sourceMappingURL=promise.service.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.synchronizedRequests';
	exports.factoryName = 'synchronizedRequests';
	var SynchronizedRequestsService = (function () {
	    function SynchronizedRequestsService(dataProvider, handleRequest, $q) {
	        this.dataProvider = dataProvider;
	        this.handleRequest = handleRequest;
	        this.$q = $q;
	        this.requestId = 0;
	    }
	    SynchronizedRequestsService.prototype.getData = function () {
	        var _this = this;
	        var params = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            params[_i - 0] = arguments[_i];
	        }
	        // increment the id first - should match current request id
	        this.requestId++;
	        var currentRequestId = this.requestId;
	        this.$q.when(this.dataProvider.apply(this, params)).then(function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i - 0] = arguments[_i];
	            }
	            if (currentRequestId == _this.requestId) {
	                _this.handleRequest.apply(_this, data);
	            }
	        });
	    };
	    return SynchronizedRequestsService;
	})();
	exports.SynchronizedRequestsService = SynchronizedRequestsService;
	synchronizedRequestsFactory.$inject = ['$q'];
	function synchronizedRequestsFactory($q) {
	    return {
	        getInstance: function (dataProvider, handleRequest) {
	            return new SynchronizedRequestsService(dataProvider, handleRequest, $q);
	        },
	    };
	}
	exports.synchronizedRequestsFactory = synchronizedRequestsFactory;
	angular.module(exports.moduleName, [])
	    .factory(exports.factoryName, synchronizedRequestsFactory);
	//# sourceMappingURL=synchronizedRequests.service.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(36);
	exports.mock = mock;
	__export(__webpack_require__(37));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);
	//# sourceMappingURL=test.module.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// uses sinon but can't import because sinon uses dynamic requires
	// sinon types will be resolved from tsd.d.ts
	var _ = __webpack_require__(7);
	var angular = __webpack_require__(1);
	exports.moduleName = 'rl.utilities.services.test.mock';
	exports.serviceName = 'mockUtility';
	var Mock = (function () {
	    function Mock($q, $rootScope) {
	        this.$q = $q;
	        this.$rootScope = $rootScope;
	    }
	    Mock.prototype.service = function (service) {
	        if (_.isUndefined(service)) {
	            service = {};
	        }
	        service._mock_requestList_ = [];
	        return service;
	    };
	    Mock.prototype.promise = function (service, methodName, data, successful) {
	        var _this = this;
	        // Default successful to true
	        if (_.isUndefined(successful)) {
	            successful = true;
	        }
	        service[methodName] = sinon.spy(function () {
	            var deferred = _this.$q.defer();
	            service._mock_requestList_.push({
	                promise: deferred,
	                data: data,
	                successful: successful,
	            });
	            return deferred.promise;
	        });
	    };
	    Mock.prototype.promiseWithCallback = function (service, methodName, callback, successful) {
	        var _this = this;
	        // Default successful to true
	        if (_.isUndefined(successful)) {
	            successful = true;
	        }
	        service[methodName] = sinon.spy(function () {
	            var params = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                params[_i - 0] = arguments[_i];
	            }
	            var deferred = _this.$q.defer();
	            service._mock_requestList_.push({
	                promise: deferred,
	                data: callback.apply(_this, params),
	                successful: successful,
	            });
	            return deferred.promise;
	        });
	    };
	    Mock.prototype.flush = function (service, scope) {
	        // Save local reference to the request list and then clear
	        var currentPendingRequests = service._mock_requestList_;
	        service._mock_requestList_ = [];
	        // Process the saved list.
	        // This way if any additional requests are generated while processing the current / local list
	        //  these requests will be queued until the next call to flush().
	        _.each(currentPendingRequests, function (request) {
	            if (request.successful) {
	                request.promise.resolve(request.data);
	            }
	            else {
	                request.promise.reject(request.data);
	            }
	            if (_.isUndefined(scope) === false) {
	                scope.$digest();
	            }
	        });
	        this.$rootScope.$apply();
	    };
	    Mock.$inject = ['$q', '$rootScope'];
	    return Mock;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, Mock);
	//# sourceMappingURL=mock.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	__webpack_require__(1);
	var _ = __webpack_require__(7);
	var AngularFixture = (function () {
	    function AngularFixture() {
	    }
	    AngularFixture.prototype.inject = function () {
	        var serviceNames = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            serviceNames[_i - 0] = arguments[_i];
	        }
	        // object that will contain all of the services requested
	        var services = {};
	        // clone the array and add a function that iterates over the original array
	        // this avoids iterating over the function itself
	        var injectParameters = _.clone(serviceNames);
	        injectParameters.push(function () {
	            var injectedServices = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                injectedServices[_i - 0] = arguments[_i];
	            }
	            // should get called with the services injected by angular
	            // we'll add these to services using the serviceName as the key
	            _.each(serviceNames, function (service, index) {
	                services[service] = injectedServices[index];
	            });
	        });
	        angular.mock.inject(injectParameters);
	        return services;
	    };
	    AngularFixture.prototype.mock = function (mocks) {
	        angular.mock.module(function ($provide) {
	            _.each(mocks, function (value, key) {
	                $provide.value(key.toString(), value);
	            });
	        });
	    };
	    AngularFixture.prototype.controllerWithBindings = function (controllerName, bindings, locals, scope) {
	        var services = this.inject('$rootScope', '$controller');
	        var $rootScope = services.$rootScope;
	        var $controller = services.$controller;
	        scope = _.extend($rootScope.$new(), scope);
	        if (locals == null) {
	            locals = {};
	        }
	        locals.$scope = scope;
	        return {
	            scope: scope,
	            controller: $controller(controllerName, locals, bindings),
	        };
	    };
	    AngularFixture.prototype.directive = function (dom) {
	        var services = this.inject('$rootScope', '$compile');
	        var $rootScope = services.$rootScope;
	        var $compile = services.$compile;
	        angular.mock.module('renovoTemplates');
	        var component = $compile(dom)($rootScope);
	        $rootScope.$digest();
	        return {
	            directive: component,
	            scope: component.isolateScope(),
	        };
	    };
	    return AngularFixture;
	})();
	exports.angularFixture = new AngularFixture();
	//# sourceMappingURL=angularFixture.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var notification_service_1 = __webpack_require__(28);
	exports.moduleName = 'rl.utilities.services.validation';
	exports.factoryName = 'validationFactory';
	var ValidationService = (function () {
	    function ValidationService(notification) {
	        this.notification = notification;
	        this.validationHandlers = {};
	        this.nextKey = 0;
	        this.notifyAsError = false;
	    }
	    ValidationService.prototype.validate = function () {
	        var _this = this;
	        var isValid = true;
	        _.each(this.validationHandlers, function (handler) {
	            var isActive = (_.isFunction(handler.isActive) && handler.isActive())
	                || handler.isActive == null
	                || handler.isActive === true;
	            if (isActive && !handler.validate()) {
	                isValid = false;
	                var error = _.isFunction(handler.errorMessage)
	                    ? handler.errorMessage()
	                    : handler.errorMessage;
	                if (_this.notifyAsError) {
	                    _this.notification.error(error);
	                }
	                else {
	                    _this.notification.warning(error);
	                }
	                return false;
	            }
	        });
	        return isValid;
	    };
	    ValidationService.prototype.registerValidationHandler = function (handler) {
	        var _this = this;
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.validationHandlers[currentKey] = handler;
	        return function () {
	            _this.unregister(currentKey);
	        };
	    };
	    ValidationService.prototype.unregister = function (key) {
	        delete this.validationHandlers[key];
	    };
	    return ValidationService;
	})();
	exports.ValidationService = ValidationService;
	validationServiceFactory.$inject = [notification_service_1.serviceName];
	function validationServiceFactory(notification) {
	    'use strict';
	    return {
	        getInstance: function () {
	            return new ValidationService(notification);
	        }
	    };
	}
	exports.validationServiceFactory = validationServiceFactory;
	angular.module(exports.moduleName, [notification_service_1.moduleName])
	    .factory(exports.factoryName, validationServiceFactory);
	//# sourceMappingURL=validation.service.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(20));
	//# sourceMappingURL=types.module.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODc1YWI4ZDA1ZWJlMjE4MjczM2MiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQyxLQUFZLFNBQVMsdUJBQU0sQ0FBOEIsQ0FBQztBQUtqRCxrQkFBUztBQUpsQixLQUFZLE9BQU8sdUJBQU0sQ0FBMEIsQ0FBQztBQUloQyxnQkFBTztBQUgzQixLQUFZLFFBQVEsdUJBQU0sRUFBNEIsQ0FBQztBQUcxQixpQkFBUTtBQUZyQyxLQUFZLEtBQUssdUJBQU0sRUFBc0IsQ0FBQztBQUVQLGNBQUs7QUFFakMsYUFBSSxHQUFXLGNBQWMsQ0FBQztBQUV6QyxRQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtLQUNwQixTQUFTLENBQUMsSUFBSTtLQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1osUUFBUSxDQUFDLElBQUk7RUFDYixDQUFDLENBQUM7Ozs7Ozs7QUNqQkgsY0FBYSxrQ0FBa0MsRUFBRSxJOzs7Ozs7QUNBakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDJDOzs7Ozs7QUNqR0EsY0FBYSw0QkFBNEIsRUFBRSxJOzs7Ozs7QUNBM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBaUQsd0JBQXdCLEVBQUU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsa0JBQWtCLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUyxJQUFJO0FBQ2I7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsMEM7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7OztBQzFCQTtBQUNBLG1DOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsbUQ7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSw0Qzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7O0FDdEJBLGNBQWEsaUNBQWlDLEVBQUUsSTs7Ozs7O0FDQWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLHFDQUFxQyxXQUFXLEVBQUUsRUFBRTtBQUNqRSxjQUFhLDBDQUEwQyx5Q0FBeUMsRUFBRSxFQUFFO0FBQ3BHLGNBQWEsbUNBQW1DLFdBQVcsRUFBRSxFQUFFO0FBQy9ELGNBQWEsbUNBQW1DLFdBQVcsRUFBRSxFQUFFO0FBQy9ELGNBQWEsaUNBQWlDLFdBQVcsRUFBRSxFQUFFO0FBQzdELGNBQWEsa0NBQWtDLFdBQVcsRUFBRSxFQUFFO0FBQzlELGNBQWEsa0NBQWtDLFdBQVcsRUFBRSxFQUFFO0FBQzlELGNBQWEsb0NBQW9DLFdBQVcsRUFBRSxFQUFFO0FBQ2hFLGNBQWEsdUNBQXVDLFdBQVcsRUFBRSxFQUFFO0FBQ25FLGNBQWEscUNBQXFDLFdBQVcsRUFBRSxFQUFFO0FBQ2pFLGNBQWEsc0NBQXNDLFdBQVcsRUFBRSxFQUFFO0FBQ2xFLGNBQWEsc0NBQXNDLFdBQVcsRUFBRSxFQUFFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EseUM7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxzREFBc0Q7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRDs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvQkFBb0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsMkM7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCx5REFBeUQsRUFBRTtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEOzs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsK0RBQThELGdCQUFnQjtBQUM5RSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUQ7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSx5Qzs7Ozs7O0FDdkJBO0FBQ0EsOEM7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQzs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRCxzQ0FBc0MsRUFBRTtBQUMxRiwwQ0FBeUMseUJBQXlCLEVBQUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0Esd0Q7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSw0Qzs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RDs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLGlDOzs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsMkM7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUMiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4NzVhYjhkMDVlYmUyMTgyNzMzY1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgKiBhcyBiZWhhdmlvcnMgZnJvbSAnLi9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIGZpbHRlcnMgZnJvbSAnLi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgc2VydmljZXMgZnJvbSAnLi9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGVzL3R5cGVzLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgeyBiZWhhdmlvcnMsIGZpbHRlcnMsIHNlcnZpY2VzLCB0eXBlcyB9O1xyXG5cclxuZXhwb3J0IHZhciBuYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRiZWhhdmlvcnMubmFtZSxcclxuXHRmaWx0ZXJzLm5hbWUsXHJcblx0c2VydmljZXMubmFtZSxcclxuXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL3V0aWxpdGllcy50c1xuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiYW5ndWxhclwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIHN0b3BFdmVudFByb3BvZ2F0aW9uID0gcmVxdWlyZSgnLi9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbicpO1xyXG5leHBvcnRzLnN0b3BFdmVudFByb3BvZ2F0aW9uID0gc3RvcEV2ZW50UHJvcG9nYXRpb247XHJcbmV4cG9ydHMubmFtZSA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5uYW1lLCBbXHJcbiAgICBzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5dKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmVoYXZpb3JzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuZXhwb3J0cy5kaXJlY3RpdmVOYW1lID0gJ3JsU3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5mdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5kaXJlY3RpdmUoZXhwb3J0cy5kaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3BFdmVudFByb3BhZ2F0aW9uLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgaXNFbXB0eSA9IHJlcXVpcmUoJy4vaXNFbXB0eS9pc0VtcHR5Jyk7XHJcbmV4cG9ydHMuaXNFbXB0eSA9IGlzRW1wdHk7XHJcbnZhciB0cnVuY2F0ZSA9IHJlcXVpcmUoJy4vdHJ1bmNhdGUvdHJ1bmNhdGUnKTtcclxuZXhwb3J0cy50cnVuY2F0ZSA9IHRydW5jYXRlO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2ZpbHRlcicpKTtcclxuZXhwb3J0cy5uYW1lID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5uYW1lLCBbXHJcbiAgICBpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcbiAgICB0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5dKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVycy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG9iamVjdF9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2lzRW1wdHknO1xyXG5leHBvcnRzLmZpbHRlck5hbWUgPSBleHBvcnRzLnNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcbmlzRW1wdHkuJGluamVjdCA9IFtvYmplY3Rfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3QpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIHRydWVXaGVuRW1wdHkpIHtcclxuICAgICAgICB2YXIgaXNFbXB0eSA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuICAgICAgICBpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuICFpc0VtcHR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNFbXB0eTtcclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbb2JqZWN0X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5maWx0ZXIoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgaXNFbXB0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRW1wdHkuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBhcnJheV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9hcnJheS9hcnJheS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0JztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdvYmplY3RVdGlsaXR5JztcclxudmFyIE9iamVjdFV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gT2JqZWN0VXRpbGl0eShhcnJheSkge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgIH1cclxuICAgIE9iamVjdFV0aWxpdHkucHJvdG90eXBlLmlzTnVsbE9yRW1wdHkgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdCA9PT0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkucHJvdG90eXBlLmlzTnVsbE9yV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcbiAgICAgICAgICAgIG9iamVjdCA9IG9iamVjdC50cmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5hcmVFcXVhbCA9IGZ1bmN0aW9uIChvYmoxLCBvYmoyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgdHlwZTEgPSB0eXBlb2Ygb2JqMTtcclxuICAgICAgICB2YXIgdHlwZTIgPSB0eXBlb2Ygb2JqMjtcclxuICAgICAgICBpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob2JqMSA9PSBudWxsIHx8IG9iajIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXJlRXF1YWwob2JqMVtpXSwgb2JqMltpXSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcbiAgICAgICAgICAgIHZhciBrZXlzMiA9IF8ua2V5cyhvYmoyKTtcclxuICAgICAgICAgICAgXy5mb3JJbihvYmoxLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vaWYgdGhlcmUgYXJlIHN0aWxsIGtleXMgbGVmdCBpbiBrZXlzMiwgd2Uga25vdyB0aGV5IGFyZSBub3QgZXF1YWwgKG9iajIgaGFzIG1vcmUgcHJvcGVydGllcylcclxuICAgICAgICAgICAgaWYgKF8uYW55KGtleXMyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuICAgICAgICAgICAgcmV0dXJuIG9iajEgPT09IG9iajI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBvYmplY3QgKyAnJztcclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS52YWx1ZU9yRGVmYXVsdCA9IGZ1bmN0aW9uICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS4kaW5qZWN0ID0gW2FycmF5X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbYXJyYXlfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9iamVjdC5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJfXCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJfXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdhcnJheVV0aWxpdHknO1xyXG52YXIgQXJyYXlVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFycmF5VXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUuZmluZEluZGV4T2YgPSBmdW5jdGlvbiAoYXJyYXksIHByZWRpY2F0ZSkge1xyXG4gICAgICAgIHZhciB0YXJnZXRJbmRleDtcclxuICAgICAgICBfLmVhY2goYXJyYXksIGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEluZGV4ICE9IG51bGwgPyB0YXJnZXRJbmRleCA6IC0xO1xyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGFycmF5LCBpdGVtKSB7XHJcbiAgICAgICAgdmFyIGluZGV4O1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbSkpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSlbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKGFycmF5LCBvbGRJdGVtLCBuZXdJdGVtKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLnN1bSA9IGZ1bmN0aW9uIChhcnJheSwgdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgdmFyIGxpc3Q7XHJcbiAgICAgICAgaWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxpc3QgPSBfLm1hcChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIHRyYW5zZm9ybShpdGVtKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsaXN0ID0gYXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfLnJlZHVjZShsaXN0LCBmdW5jdGlvbiAoc3VtLCBudW0pIHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcbiAgICB9O1xyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS50b0RpY3Rpb25hcnkgPSBmdW5jdGlvbiAoYXJyYXksIGtleVNlbGVjdG9yKSB7XHJcbiAgICAgICAgLy8gbmVlZHMgdG8gYmUgc2VlZGVkIHdpdGggYW4gb2JqZWN0IG9yIGl0IHdpbGwgYmUgdmlld2VkIGFzIGFuIGFycmF5IHdpdGggbm8gaXRlbXNcclxuICAgICAgICByZXR1cm4gXy5yZWR1Y2UoYXJyYXksIGZ1bmN0aW9uIChkaWN0aW9uYXJ5LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGRpY3Rpb25hcnlba2V5U2VsZWN0b3IoaXRlbSldID0gaXRlbTtcclxuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheVV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxudmFyIG9iamVjdF9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICd0cnVuY2F0ZSc7XHJcbmV4cG9ydHMuZmlsdGVyTmFtZSA9IGV4cG9ydHMuc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxudHJ1bmNhdGUuJGluamVjdCA9IFtvYmplY3Rfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgdHJ1bmNhdGVUbywgaW5jbHVkZUVsbGlwc2VzKSB7XHJcbiAgICAgICAgaW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuICAgICAgICB2YXIgb3V0ID0gb2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoaW5wdXQpID8gJycgOiBpbnB1dC50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChvdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVuY2F0ZVRvICE9IG51bGwgJiYgb3V0Lmxlbmd0aCA+IHRydW5jYXRlVG8pIHtcclxuICAgICAgICAgICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcoMCwgdHJ1bmNhdGVUbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0ICs9ICcuLi4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW29iamVjdF9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmlsdGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJ1bmNhdGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L2FycmF5LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5hcnJheSA9IGFycmF5O1xyXG52YXIgYXV0b3NhdmUgPSByZXF1aXJlKCcuL2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5hdXRvc2F2ZSA9IGF1dG9zYXZlO1xyXG52YXIgYXV0b3NhdmVBY3Rpb24gPSByZXF1aXJlKCcuL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5hdXRvc2F2ZUFjdGlvbiA9IGF1dG9zYXZlQWN0aW9uO1xyXG52YXIgYm9vbGVhbiA9IHJlcXVpcmUoJy4vYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5ib29sZWFuID0gYm9vbGVhbjtcclxudmFyIGRhdGUgPSByZXF1aXJlKCcuL2RhdGUvZGF0ZS5tb2R1bGUnKTtcclxuZXhwb3J0cy5kYXRlID0gZGF0ZTtcclxudmFyIGZpbGVTaXplID0gcmVxdWlyZSgnLi9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUnKTtcclxuZXhwb3J0cy5maWxlU2l6ZSA9IGZpbGVTaXplO1xyXG52YXIgZ2VuZXJpY1NlYXJjaEZpbHRlciA9IHJlcXVpcmUoJy4vZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5nZW5lcmljU2VhcmNoRmlsdGVyID0gZ2VuZXJpY1NlYXJjaEZpbHRlcjtcclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJy4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxuZXhwb3J0cy5tb21lbnQgPSBtb21lbnQ7XHJcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcclxudmFyIG51bWJlclNlcnZpY2UgPSByZXF1aXJlKCcuL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG5leHBvcnRzLm51bWJlciA9IG51bWJlclNlcnZpY2U7XHJcbnZhciBvYmplY3RTZXJ2aWNlID0gcmVxdWlyZSgnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5vYmplY3QgPSBvYmplY3RTZXJ2aWNlO1xyXG52YXIgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcclxudmFyIHBhcmVudENoaWxkQmVoYXZpb3IgPSByZXF1aXJlKCcuL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMucGFyZW50Q2hpbGRCZWhhdmlvciA9IHBhcmVudENoaWxkQmVoYXZpb3I7XHJcbnZhciBwcm9taXNlID0gcmVxdWlyZSgnLi9wcm9taXNlL3Byb21pc2Uuc2VydmljZScpO1xyXG5leHBvcnRzLnByb21pc2UgPSBwcm9taXNlO1xyXG52YXIgc3RyaW5nU2VydmljZSA9IHJlcXVpcmUoJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nU2VydmljZTtcclxudmFyIHN5bmNocm9uaXplZFJlcXVlc3RzID0gcmVxdWlyZSgnLi9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuc3luY2hyb25pemVkUmVxdWVzdHMgPSBzeW5jaHJvbml6ZWRSZXF1ZXN0cztcclxudmFyIHRlc3QgPSByZXF1aXJlKCcuL3Rlc3QvdGVzdC5tb2R1bGUnKTtcclxuZXhwb3J0cy50ZXN0ID0gdGVzdDtcclxudmFyIHRpbWUgPSByZXF1aXJlKCcuL3RpbWUvdGltZS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMudGltZSA9IHRpbWU7XHJcbnZhciB2YWxpZGF0aW9uID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xyXG5leHBvcnRzLm5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5uYW1lLCBbXHJcbiAgICBhcnJheS5tb2R1bGVOYW1lLFxyXG4gICAgYXV0b3NhdmUubW9kdWxlTmFtZSxcclxuICAgIGF1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWUsXHJcbiAgICBib29sZWFuLm1vZHVsZU5hbWUsXHJcbiAgICBkYXRlLm1vZHVsZU5hbWUsXHJcbiAgICBmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG4gICAgZ2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG4gICAgbW9tZW50Lm1vZHVsZU5hbWUsXHJcbiAgICBub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuICAgIG51bWJlclNlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuICAgIHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuICAgIHByb21pc2UubW9kdWxlTmFtZSxcclxuICAgIHN0cmluZ1NlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIHN5bmNocm9uaXplZFJlcXVlc3RzLm1vZHVsZU5hbWUsXHJcbiAgICB0aW1lLm1vZHVsZU5hbWUsXHJcbiAgICB0ZXN0Lm1vZHVsZU5hbWUsXHJcbiAgICB2YWxpZGF0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlcy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGF1dG9zYXZlQWN0aW9uX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnYXV0b3NhdmVGYWN0b3J5JztcclxudmFyIEF1dG9zYXZlU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBdXRvc2F2ZVNlcnZpY2UoYXV0b3NhdmVTZXJ2aWNlLCBzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmVTZXJ2aWNlID0gYXV0b3NhdmVTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuc2F2ZSA9IHNhdmU7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Rm9ybSA9IGNvbnRlbnRGb3JtO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcclxuICAgICAgICB0aGlzLmF1dG9zYXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaGFzVmFsaWRhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IF90aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gX3RoaXMuc2F2ZS5hcHBseShfdGhpcywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQocHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hdXRvc2F2ZVNlcnZpY2UudHJpZ2dlcihwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29udGVudEZvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudEZvcm0uJHNldFByaXN0aW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYXNWYWxpZGF0b3IgPSB2YWxpZGF0ZSAhPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRGb3JtID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Rm9ybSA9IHRoaXMubnVsbEZvcm0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBBdXRvc2F2ZVNlcnZpY2UucHJvdG90eXBlLm51bGxGb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICRwcmlzdGluZTogZmFsc2UsXHJcbiAgICAgICAgICAgICRzZXRQcmlzdGluZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEF1dG9zYXZlU2VydmljZTtcclxufSkoKTtcclxuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW2F1dG9zYXZlQWN0aW9uX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoYXV0b3NhdmVTZXJ2aWNlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoc2F2ZSwgY29udGVudEZvcm0sIHZhbGlkYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXV0b3NhdmVTZXJ2aWNlKGF1dG9zYXZlU2VydmljZSwgc2F2ZSwgY29udGVudEZvcm0sIHZhbGlkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2F1dG9zYXZlQWN0aW9uX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIGF1dG9zYXZlU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRvc2F2ZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnYXV0b3NhdmVBY3Rpb24nO1xyXG52YXIgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEF1dG9zYXZlQWN0aW9uU2VydmljZSgkdGltZW91dCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVNZXNzYWdlRHVyYXRpb24gPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmVTdWNjZXNzZnVsID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCB0cnVlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmVGYWlsZWQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVzb2x2ZUF1dG9zYXZlID0gZnVuY3Rpb24gKGRhdGEsIHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgX3RoaXMuX3NhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBfdGhpcy5fY29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBfdGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcbiAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBfdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZSwgXCJzYXZpbmdcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2F2aW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUsIFwiY29tcGxldGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGxldGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZSwgXCJzdWNjZXNzZnVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBBdXRvc2F2ZUFjdGlvblNlcnZpY2UucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xyXG4gICAgICAgIHRoaXMuX3NhdmluZyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG4gICAgfTtcclxuICAgIEF1dG9zYXZlQWN0aW9uU2VydmljZS4kaW5qZWN0ID0gWyckdGltZW91dCddO1xyXG4gICAgcmV0dXJuIEF1dG9zYXZlQWN0aW9uU2VydmljZTtcclxufSkoKTtcclxubmcubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBBdXRvc2F2ZUFjdGlvblNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4nO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxudmFyIEJvb2xlYW5VdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJvb2xlYW5VdGlsaXR5KCkge1xyXG4gICAgfVxyXG4gICAgQm9vbGVhblV0aWxpdHkucHJvdG90eXBlLnRvQm9vbCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gISFvYmplY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJvb2xlYW5VdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQm9vbGVhblV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib29sZWFuLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG1vbWVudF9tb2R1bGVfMSA9IHJlcXVpcmUoJy4uL21vbWVudC9tb21lbnQubW9kdWxlJyk7XHJcbnZhciB0aW1lX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3RpbWUvdGltZS5zZXJ2aWNlJyk7XHJcbnZhciBkYXRlX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vZGF0ZS5zZXJ2aWNlJyk7XHJcbnZhciBkYXRlVGltZUZvcm1hdFN0cmluZ3NfMSA9IHJlcXVpcmUoJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJyk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZGF0ZS5zZXJ2aWNlJykpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncycpKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbbW9tZW50X21vZHVsZV8xLm1vZHVsZU5hbWUsIHRpbWVfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLnNlcnZpY2UoZGF0ZV9zZXJ2aWNlXzEuc2VydmljZU5hbWUsIGRhdGVfc2VydmljZV8xLkRhdGVVdGlsaXR5KVxyXG4gICAgLnZhbHVlKGRhdGVUaW1lRm9ybWF0U3RyaW5nc18xLmRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRhdGVUaW1lRm9ybWF0U3RyaW5nc18xLmRlZmF1bHRGb3JtYXRzKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0ZS5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdtb21lbnRXcmFwcGVyJztcclxuZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuICAgIC8vICBjcmVhdGVGcm9tSW5wdXRGYWxsYmFjayBkb2Vzbid0IGFwcGVhciB0byBiZVxyXG4gICAgLy8gIGRlZmluZWQgaW4gTW9tZW50U3RhdGljLi4uIDotKFxyXG4gICAgdmFyIG1vbWVudFdyYXBwZXIgPSBtb21lbnQ7IC8vIG1vbWVudCBtdXN0IGFscmVhZHkgYmUgbG9hZGVkXHJcbiAgICAvLyBTZXQgZGVmYXVsdCBtZXRob2QgZm9yIGhhbmRsaW5nIG5vbi1JU08gZGF0ZSBjb252ZXJzaW9ucy5cclxuICAgIC8vIFNlZSA0LzI4IGNvbW1lbnQgaW4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDdcclxuICAgIC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG4gICAgbW9tZW50V3JhcHBlci5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBtb21lbnRXcmFwcGVyO1xyXG59XHJcbmV4cG9ydHMubW9tZW50V3JhcHBlciA9IG1vbWVudFdyYXBwZXI7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLnNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9tZW50Lm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibW9tZW50XCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJtb21lbnRcIlxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3RpbWVVdGlsaXR5JztcclxudmFyIFRpbWVVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRpbWVVdGlsaXR5KCkge1xyXG4gICAgfVxyXG4gICAgVGltZVV0aWxpdHkucHJvdG90eXBlLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuICAgIH07XHJcbiAgICBUaW1lVXRpbGl0eS5wcm90b3R5cGUubWlsbGlzZWNvbmRzVG9NaW51dGVzID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcbiAgICB9O1xyXG4gICAgVGltZVV0aWxpdHkucHJvdG90eXBlLm1pbGxpc2Vjb25kc1RvSG91cnMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuICAgIH07XHJcbiAgICBUaW1lVXRpbGl0eS5wcm90b3R5cGUubWlsbGlzZWNvbmRzVG9EYXlzID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUaW1lVXRpbGl0eTtcclxufSkoKTtcclxuZXhwb3J0cy5UaW1lVXRpbGl0eSA9IFRpbWVVdGlsaXR5O1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciB0aW1lX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3RpbWUvdGltZS5zZXJ2aWNlJyk7XHJcbnZhciBtb21lbnRfbW9kdWxlXzEgPSByZXF1aXJlKCcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZScpO1xyXG52YXIgY29tcGFyZVJlc3VsdF8xID0gcmVxdWlyZSgnLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdCcpO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2RhdGVVdGlsaXR5JztcclxudmFyIERhdGVVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERhdGVVdGlsaXR5KG1vbWVudCwgdGltZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5tb21lbnQgPSBtb21lbnQ7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcclxuICAgICAgICB0aGlzLmJhc2VGb3JtYXQgPSAnTU0tREQtWVlZWSc7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnSmFudWFyeScsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogZnVuY3Rpb24gKHllYXIpIHsgcmV0dXJuIF90aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ01hcmNoJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnQXByaWwnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdNYXknLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdKdW5lJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnSnVseScsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0F1Z3VzdCcsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMwOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdOb3ZlbWJlcicsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMwOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmlzTGVhcFllYXIgPSBmdW5jdGlvbiAoeWVhcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZ2V0RnVsbFN0cmluZyA9IGZ1bmN0aW9uIChtb250aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5uYW1lO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXREYXlzID0gZnVuY3Rpb24gKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLnN1YnRyYWN0RGF0ZXMgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgZGF0ZUZvcm1hdCkge1xyXG4gICAgICAgIGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhcnREYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgZW5kRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICByZXN1bHQuZGF5cyA9IGVuZERhdGUuZ2V0RGF0ZSgpIC0gc3RhcnREYXRlLmdldERhdGUoKTtcclxuICAgICAgICByZXN1bHQueWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICByZXN1bHQubW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5kYXlzIDwgMCkge1xyXG4gICAgICAgICAgICByZXN1bHQubW9udGhzIC09IDE7XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXlzICs9IHRoaXMuZ2V0RGF5cyhzdGFydERhdGUuZ2V0TW9udGgoKSwgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0Lm1vbnRocyA8IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnllYXJzIC09IDE7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tb250aHMgKz0gMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLnN1YnRyYWN0RGF0ZUluRGF5cyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBkYXRlRm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFydERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHZhciBlbmREYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IGVuZERhdGUuZ2V0VGltZSgpIC0gc3RhcnREYXRlLmdldFRpbWUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lLm1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHMpO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5jb21wYXJlRGF0ZXMgPSBmdW5jdGlvbiAoZGF0ZTEsIGRhdGUyLCBkYXRlRm9ybWF0KSB7XHJcbiAgICAgICAgLy8gc3VidHJhY3REYXRlSW5EYXlzIHN1YnRyYWN0cyB0aGUgZmlzdCBmcm9tIHRoZSBzZWNvbmQsIGFzc3VtaW5nIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHRoaXMuc3VidHJhY3REYXRlSW5EYXlzKGRhdGUyLCBkYXRlMSwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVSZXN1bHRfMS5nZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5kYXRlSW5SYW5nZSA9IGZ1bmN0aW9uIChkYXRlLCByYW5nZVN0YXJ0LCByYW5nZUVuZCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gY29tcGFyZVJlc3VsdF8xLkNvbXBhcmVSZXN1bHQubGVzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlRW5kKSA9PT0gY29tcGFyZVJlc3VsdF8xLkNvbXBhcmVSZXN1bHQuZ3JlYXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbiAoZGF0ZSwgZGF0ZUZvcm1hdCkge1xyXG4gICAgICAgIHZhciBmb3JtYXQgPSBkYXRlRm9ybWF0ICE9IG51bGwgPyBkYXRlRm9ybWF0IDogdGhpcy5iYXNlRm9ybWF0O1xyXG4gICAgICAgIGlmIChfLmlzRGF0ZShkYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlLCBmb3JtYXQpLnRvRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZ2V0Tm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LiRpbmplY3QgPSBbbW9tZW50X21vZHVsZV8xLnNlcnZpY2VOYW1lLCB0aW1lX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbiAgICByZXR1cm4gRGF0ZVV0aWxpdHk7XHJcbn0pKCk7XHJcbmV4cG9ydHMuRGF0ZVV0aWxpdHkgPSBEYXRlVXRpbGl0eTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0ZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4oZnVuY3Rpb24gKENvbXBhcmVSZXN1bHQpIHtcclxuICAgIENvbXBhcmVSZXN1bHRbQ29tcGFyZVJlc3VsdFtcImdyZWF0ZXJcIl0gPSAxXSA9IFwiZ3JlYXRlclwiO1xyXG4gICAgQ29tcGFyZVJlc3VsdFtDb21wYXJlUmVzdWx0W1wiZXF1YWxcIl0gPSAwXSA9IFwiZXF1YWxcIjtcclxuICAgIENvbXBhcmVSZXN1bHRbQ29tcGFyZVJlc3VsdFtcImxlc3NcIl0gPSAtMV0gPSBcImxlc3NcIjtcclxufSkoZXhwb3J0cy5Db21wYXJlUmVzdWx0IHx8IChleHBvcnRzLkNvbXBhcmVSZXN1bHQgPSB7fSkpO1xyXG52YXIgQ29tcGFyZVJlc3VsdCA9IGV4cG9ydHMuQ29tcGFyZVJlc3VsdDtcclxuZnVuY3Rpb24gZ2V0Q29tcGFyZVJlc3VsdChudW0pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGlmIChudW0gPT09IDApIHtcclxuICAgICAgICByZXR1cm4gQ29tcGFyZVJlc3VsdC5lcXVhbDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG51bSA+IDApIHtcclxuICAgICAgICByZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldENvbXBhcmVSZXN1bHQgPSBnZXRDb21wYXJlUmVzdWx0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wYXJlUmVzdWx0LmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmV4cG9ydHMuZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSA9ICdkYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5leHBvcnRzLmRlZmF1bHRGb3JtYXRzID0ge1xyXG4gICAgZGF0ZVRpbWVGb3JtYXQ6ICdNL0QvWVlZWSBoOm1tIEEnLFxyXG4gICAgZGF0ZUZvcm1hdDogJ00vRC9ZWVlZJyxcclxuICAgIHRpbWVGb3JtYXQ6ICdoOm1tQScsXHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGVUaW1lRm9ybWF0U3RyaW5ncy5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbnVtYmVyX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG52YXIgZmlsZVNpemVfc2VydmljZV8xID0gcmVxdWlyZSgnLi9maWxlU2l6ZS5zZXJ2aWNlJyk7XHJcbnZhciBmaWxlU2l6ZUZpbHRlcl8xID0gcmVxdWlyZSgnLi9maWxlU2l6ZUZpbHRlcicpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2ZpbGVTaXplLnNlcnZpY2UnKSk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZmlsZVNpemVGaWx0ZXInKSk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtudW1iZXJfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZmlsZVNpemVfc2VydmljZV8xLmZhY3RvcnlOYW1lLCBmaWxlU2l6ZV9zZXJ2aWNlXzEuZmlsZVNpemVGYWN0b3J5KVxyXG4gICAgLmZpbHRlcihmaWxlU2l6ZUZpbHRlcl8xLnNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyXzEuZmlsZVNpemVGaWx0ZXIpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWxlU2l6ZS5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXInO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ251bWJlclV0aWxpdHknO1xyXG52YXIgU2lnbjtcclxuKGZ1bmN0aW9uIChTaWduKSB7XHJcbiAgICBTaWduW1NpZ25bXCJwb3NpdGl2ZVwiXSA9IDFdID0gXCJwb3NpdGl2ZVwiO1xyXG4gICAgU2lnbltTaWduW1wibmVnYXRpdmVcIl0gPSAtMV0gPSBcIm5lZ2F0aXZlXCI7XHJcbn0pKFNpZ24gfHwgKFNpZ24gPSB7fSkpO1xyXG52YXIgTnVtYmVyVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOdW1iZXJVdGlsaXR5KCkge1xyXG4gICAgfVxyXG4gICAgTnVtYmVyVXRpbGl0eS5wcm90b3R5cGUucHJlY2lzZVJvdW5kID0gZnVuY3Rpb24gKG51bSwgZGVjaW1hbHMpIHtcclxuICAgICAgICB2YXIgc2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArIChzaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG4gICAgfTtcclxuICAgIE51bWJlclV0aWxpdHkucHJvdG90eXBlLmludGVnZXJEaXZpZGUgPSBmdW5jdGlvbiAoZGl2aWRlbmQsIGRpdmlzb3IpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpO1xyXG4gICAgfTtcclxuICAgIE51bWJlclV0aWxpdHkucHJvdG90eXBlLnJvdW5kVG9TdGVwID0gZnVuY3Rpb24gKG51bSwgc3RlcCkge1xyXG4gICAgICAgIGlmICghc3RlcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVtYWluZGVyID0gbnVtICUgc3RlcDtcclxuICAgICAgICBpZiAocmVtYWluZGVyID49IHN0ZXAgLyAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW0gKyAoc3RlcCAtIHJlbWFpbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtIC0gcmVtYWluZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTnVtYmVyVXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1udW1iZXIuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBudW1iZXJfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnZmlsZVNpemVGYWN0b3J5JztcclxudmFyIEZpbGVTaXplU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpIHtcclxuICAgICAgICB0aGlzLkJZVEVTX1BFUl9HQiA9IDEwNzM3NDE4MjQ7XHJcbiAgICAgICAgdGhpcy5CWVRFU19QRVJfTUIgPSAxMDQ4NTc2O1xyXG4gICAgICAgIHRoaXMuQllURVNfUEVSX0tCID0gMTAyNDtcclxuICAgICAgICB0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcbiAgICAgICAgaWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0dCKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNHQiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG4gICAgICAgICAgICB0aGlzLkdCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5HQiwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzR0IgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTUIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTUIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNLQiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5LQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfS0I7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0tCID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ieXRlcyA9IE1hdGgucm91bmQodGhpcy5ieXRlcyk7XHJcbiAgICB9XHJcbiAgICBGaWxlU2l6ZVNlcnZpY2UucHJvdG90eXBlLmRpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNHQikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzTUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTUIgKyAnIE1CJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLktCICsgJyBLQic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gRmlsZVNpemVTZXJ2aWNlO1xyXG59KSgpO1xyXG5maWxlU2l6ZUZhY3RvcnkuJGluamVjdCA9IFtudW1iZXJfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHkpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIChieXRlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZpbGVTaXplU2VydmljZShudW1iZXJVdGlsaXR5LCBieXRlcyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5maWxlU2l6ZUZhY3RvcnkgPSBmaWxlU2l6ZUZhY3Rvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGVTaXplLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGZpbGVTaXplX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vZmlsZVNpemUuc2VydmljZScpO1xyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcbmV4cG9ydHMuc2ltcGxlRmlsdGVyTmFtZSA9ICdmaWxlU2l6ZSc7XHJcbmV4cG9ydHMuZmlsdGVyTmFtZSA9IGV4cG9ydHMuc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5maWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZpbGVTaXplX3NlcnZpY2VfMS5mYWN0b3J5TmFtZV07XHJcbmZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChieXRlcykge1xyXG4gICAgICAgIHZhciBmaWxlU2l6ZSA9IGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZShieXRlcyk7XHJcbiAgICAgICAgcmV0dXJuIGZpbGVTaXplLmRpc3BsYXkoKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5maWxlU2l6ZUZpbHRlciA9IGZpbGVTaXplRmlsdGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWxlU2l6ZUZpbHRlci5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBvYmplY3Rfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbnZhciBzdHJpbmdfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnknO1xyXG5leHBvcnRzLmZpbHRlck5hbWUgPSAnc2VhcmNoJztcclxudmFyIEdlbmVyaWNTZWFyY2hGaWx0ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGV4cG9ydHMuZmlsdGVyTmFtZTtcclxuICAgICAgICB0aGlzLm1pblNlYXJjaExlbmd0aCA9IDE7XHJcbiAgICAgICAgdGhpcy5jYXNlU2Vuc2l0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBHZW5lcmljU2VhcmNoRmlsdGVyLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdC5pc051bGxPckVtcHR5KHRoaXMuc2VhcmNoVGV4dCkgfHwgdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA8IHRoaXMubWluU2VhcmNoTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QoaXRlbSwgdGhpcy5zZWFyY2hUZXh0LCB0aGlzLmNhc2VTZW5zaXRpdmUpO1xyXG4gICAgfTtcclxuICAgIEdlbmVyaWNTZWFyY2hGaWx0ZXIucHJvdG90eXBlLnNlYXJjaE9iamVjdCA9IGZ1bmN0aW9uIChpdGVtLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBfLnZhbHVlcyhpdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuIF8uYW55KHZhbHVlcywgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFTdHJpbmcgPSB0aGlzLm9iamVjdC50b1N0cmluZyhpdGVtKTtcclxuICAgICAgICAgICAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGRhdGFTdHJpbmcgPSBkYXRhU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG59KSgpO1xyXG5leHBvcnRzLkdlbmVyaWNTZWFyY2hGaWx0ZXIgPSBHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS4kaW5qZWN0ID0gW29iamVjdF9zZXJ2aWNlXzEuc2VydmljZU5hbWUsIHN0cmluZ19zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeShvYmplY3QsIHN0cmluZ1V0aWxpdHkpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljU2VhcmNoRmlsdGVyKG9iamVjdCwgc3RyaW5nVXRpbGl0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtvYmplY3Rfc2VydmljZV8xLm1vZHVsZU5hbWUsIHN0cmluZ19zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdzdHJpbmdVdGlsaXR5U2VydmljZSc7XHJcbnZhciBTdHJpbmdVdGlsaXR5U2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTdHJpbmdVdGlsaXR5U2VydmljZSgpIHtcclxuICAgIH1cclxuICAgIFN0cmluZ1V0aWxpdHlTZXJ2aWNlLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gK3N0cmluZztcclxuICAgIH07XHJcbiAgICBTdHJpbmdVdGlsaXR5U2VydmljZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoc3RyLCBzdWJzdHJpbmcpIHtcclxuICAgICAgICBpZiAoc3Vic3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHJpbmcpICE9PSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLnN1YnN0aXR1dGUgPSBmdW5jdGlvbiAoZm9ybWF0U3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgcGFyYW1zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfLmVhY2gocGFyYW1zLCBmdW5jdGlvbiAocGFyYW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFN0cmluZyA9IF90aGlzLnJlcGxhY2VBbGwoZm9ybWF0U3RyaW5nLCAnXFxcXHsnICsgaW5kZXggKyAnXFxcXH0nLCBwYXJhbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFN0cmluZztcclxuICAgIH07XHJcbiAgICBTdHJpbmdVdGlsaXR5U2VydmljZS5wcm90b3R5cGUucmVwbGFjZUFsbCA9IGZ1bmN0aW9uIChzdHIsIHBhdHRlcm5Ub0ZpbmQsIHJlcGxhY2VtZW50U3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3RyaW5nVXRpbGl0eVNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuU3RyaW5nVXRpbGl0eVNlcnZpY2UgPSBTdHJpbmdVdGlsaXR5U2VydmljZTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIFN0cmluZ1V0aWxpdHlTZXJ2aWNlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RyaW5nLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBiYXNlTm90aWZpZXJfMSA9IHJlcXVpcmUoJy4vYmFzZU5vdGlmaWVyJyk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vbm90aWZpY2F0aW9uVHlwZXMnKSk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdub3RpZmljYXRpb24nO1xyXG52YXIgTm90aWZpY2F0aW9uU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOb3RpZmljYXRpb25TZXJ2aWNlKG5vdGlmaWVyKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xyXG4gICAgfVxyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci5pbmZvKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UucHJvdG90eXBlLndhcm5pbmcgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIud2FybmluZyhtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci5lcnJvcihtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyLnN1Y2Nlc3MobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuTm90aWZpY2F0aW9uU2VydmljZSA9IE5vdGlmaWNhdGlvblNlcnZpY2U7XHJcbmZ1bmN0aW9uIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICB2YXIgcHJvdmlkZXIgPSB7XHJcbiAgICAgICAgbm90aWZpZXI6IG5ldyBiYXNlTm90aWZpZXJfMS5CYXNlTm90aWZpZXIoKSxcclxuICAgICAgICBzZXROb3RpZmllcjogZnVuY3Rpb24gKG5vdGlmaWVyKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAkZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uU2VydmljZShfdGhpcy5ub3RpZmllcik7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gcHJvdmlkZXI7XHJcbn1cclxuZXhwb3J0cy5ub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgPSBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXI7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAucHJvdmlkZXIoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90aWZpY2F0aW9uLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgQmFzZU5vdGlmaWVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJhc2VOb3RpZmllcigpIHtcclxuICAgIH1cclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS53YXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUubm90aWZ5ID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB3aW5kb3cuYWxlcnQobWVzc2FnZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJhc2VOb3RpZmllcjtcclxufSkoKTtcclxuZXhwb3J0cy5CYXNlTm90aWZpZXIgPSBCYXNlTm90aWZpZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VOb3RpZmllci5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3RpZmljYXRpb25UeXBlcy5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcbnZhciBPYnNlcnZhYmxlU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLndhdGNoZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5uZXh0S2V5ID0gMDtcclxuICAgIH1cclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50S2V5ID0gdGhpcy5uZXh0S2V5O1xyXG4gICAgICAgIHRoaXMubmV4dEtleSsrO1xyXG4gICAgICAgIHRoaXMud2F0Y2hlcnNbY3VycmVudEtleV0gPSB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxyXG4gICAgICAgICAgICBldmVudDogZXZlbnQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgT2JzZXJ2YWJsZVNlcnZpY2UucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBwYXJhbXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfKHRoaXMud2F0Y2hlcnMpLmZpbHRlcihmdW5jdGlvbiAod2F0Y2hlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHdhdGNoZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KF90aGlzLCBwYXJhbXMpO1xyXG4gICAgICAgIH0pLnZhbHVlKCk7XHJcbiAgICB9O1xyXG4gICAgT2JzZXJ2YWJsZVNlcnZpY2UucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuT2JzZXJ2YWJsZVNlcnZpY2UgPSBPYnNlcnZhYmxlU2VydmljZTtcclxuZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSA9IG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeTtcclxubmcubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG52YXIgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUuZ2V0Q2hpbGRCZWhhdmlvciA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciA9IGZ1bmN0aW9uIChjaGlsZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGJlaGF2aW9yID0gdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTtcclxuICAgICAgICBpZiAoYmVoYXZpb3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzID0gZnVuY3Rpb24gKGNoaWxkTGlzdCwgYWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGJlaGF2aW9ycyA9IHRoaXMuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMoY2hpbGRMaXN0KTtcclxuICAgICAgICByZXR1cm4gXy5tYXAoYmVoYXZpb3JzLCBmdW5jdGlvbiAoYmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLmdldEFsbENoaWxkQmVoYXZpb3JzID0gZnVuY3Rpb24gKGNoaWxkTGlzdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIF8oY2hpbGRMaXN0KS5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBfdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTsgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoYmVoYXZpb3IpIHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcbiAgICAgICAgICAgIC52YWx1ZSgpO1xyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IgPSBmdW5jdGlvbiAoY2hpbGQsIGJlaGF2aW9yKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG4gICAgICAgIGlmIChjdXJyZW50QmVoYXZpb3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBfLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlID0gUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2U7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAncHJvbWlzZVV0aWxpdHknO1xyXG52YXIgUHJvbWlzZVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUHJvbWlzZVV0aWxpdHkoJHEsICRpbmplY3Rvcikge1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiRpbmplY3RvciA9ICRpbmplY3RvcjtcclxuICAgIH1cclxuICAgIFByb21pc2VVdGlsaXR5LnByb3RvdHlwZS5pc1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xyXG4gICAgICAgIHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuICAgIH07XHJcbiAgICBQcm9taXNlVXRpbGl0eS5wcm90b3R5cGUucmVzb2x2ZVByb21pc2VzID0gZnVuY3Rpb24gKHJlc29sdmVzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZXMgPSB7fTtcclxuICAgICAgICBfLmVhY2gocmVzb2x2ZXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpIHx8IF8uaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzW2tleV0gPSAoX3RoaXMuJHEud2hlbihfdGhpcy4kaW5qZWN0b3IuaW52b2tlKHZhbHVlKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlc1trZXldID0gKF90aGlzLiRxLndoZW4oX3RoaXMuJGluamVjdG9yLmdldCh2YWx1ZSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzW2tleV0gPSAoX3RoaXMuJHEud2hlbih2YWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKHByb21pc2VzKTtcclxuICAgIH07XHJcbiAgICBQcm9taXNlVXRpbGl0eS4kaW5qZWN0ID0gWyckcScsICckaW5qZWN0b3InXTtcclxuICAgIHJldHVybiBQcm9taXNlVXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvbWlzZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zeW5jaHJvbml6ZWRSZXF1ZXN0cyc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnc3luY2hyb25pemVkUmVxdWVzdHMnO1xyXG52YXIgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZShkYXRhUHJvdmlkZXIsIGhhbmRsZVJlcXVlc3QsICRxKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBkYXRhUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVSZXF1ZXN0ID0gaGFuZGxlUmVxdWVzdDtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWQgPSAwO1xyXG4gICAgfVxyXG4gICAgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5jcmVtZW50IHRoZSBpZCBmaXJzdCAtIHNob3VsZCBtYXRjaCBjdXJyZW50IHJlcXVlc3QgaWRcclxuICAgICAgICB0aGlzLnJlcXVlc3RJZCsrO1xyXG4gICAgICAgIHZhciBjdXJyZW50UmVxdWVzdElkID0gdGhpcy5yZXF1ZXN0SWQ7XHJcbiAgICAgICAgdGhpcy4kcS53aGVuKHRoaXMuZGF0YVByb3ZpZGVyLmFwcGx5KHRoaXMsIHBhcmFtcykpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFJlcXVlc3RJZCA9PSBfdGhpcy5yZXF1ZXN0SWQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhhbmRsZVJlcXVlc3QuYXBwbHkoX3RoaXMsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5TeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UgPSBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbnN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeS4kaW5qZWN0ID0gWyckcSddO1xyXG5mdW5jdGlvbiBzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkoJHEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIChkYXRhUHJvdmlkZXIsIGhhbmRsZVJlcXVlc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UoZGF0YVByb3ZpZGVyLCBoYW5kbGVSZXF1ZXN0LCAkcSk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5zeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkgPSBzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3Rvcnk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBzeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBtb2NrID0gcmVxdWlyZSgnLi9tb2NrJyk7XHJcbmV4cG9ydHMubW9jayA9IG1vY2s7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vYW5ndWxhckZpeHR1cmUnKSk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW1xyXG4gICAgbW9jay5tb2R1bGVOYW1lLFxyXG5dKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVzdC5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L3Rlc3QubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8gdXNlcyBzaW5vbiBidXQgY2FuJ3QgaW1wb3J0IGJlY2F1c2Ugc2lub24gdXNlcyBkeW5hbWljIHJlcXVpcmVzXHJcbi8vIHNpbm9uIHR5cGVzIHdpbGwgYmUgcmVzb2x2ZWQgZnJvbSB0c2QuZC50c1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lm1vY2snO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ21vY2tVdGlsaXR5JztcclxudmFyIE1vY2sgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTW9jaygkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG4gICAgTW9jay5wcm90b3R5cGUuc2VydmljZSA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc2VydmljZSkpIHtcclxuICAgICAgICAgICAgc2VydmljZSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgfTtcclxuICAgIE1vY2sucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoc2VydmljZSwgbWV0aG9kTmFtZSwgZGF0YSwgc3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG4gICAgICAgICAgICBzdWNjZXNzZnVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF90aGlzLiRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTogZGVmZXJyZWQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1vY2sucHJvdG90eXBlLnByb21pc2VXaXRoQ2FsbGJhY2sgPSBmdW5jdGlvbiAoc2VydmljZSwgbWV0aG9kTmFtZSwgY2FsbGJhY2ssIHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuICAgICAgICAgICAgc3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gX3RoaXMuJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlOiBkZWZlcnJlZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGNhbGxiYWNrLmFwcGx5KF90aGlzLCBwYXJhbXMpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1vY2sucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKHNlcnZpY2UsIHNjb3BlKSB7XHJcbiAgICAgICAgLy8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG4gICAgICAgIHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcbiAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuICAgICAgICAvLyBQcm9jZXNzIHRoZSBzYXZlZCBsaXN0LlxyXG4gICAgICAgIC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3RcclxuICAgICAgICAvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG4gICAgICAgIF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wcm9taXNlLnJlamVjdChyZXF1ZXN0LmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgIH07XHJcbiAgICBNb2NrLiRpbmplY3QgPSBbJyRxJywgJyRyb290U2NvcGUnXTtcclxuICAgIHJldHVybiBNb2NrO1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgTW9jayk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vY2suanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L21vY2suanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxucmVxdWlyZSgnYW5ndWxhci1tb2NrcycpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgQW5ndWxhckZpeHR1cmUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQW5ndWxhckZpeHR1cmUoKSB7XHJcbiAgICB9XHJcbiAgICBBbmd1bGFyRml4dHVyZS5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlTmFtZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBzZXJ2aWNlTmFtZXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiBhbGwgb2YgdGhlIHNlcnZpY2VzIHJlcXVlc3RlZFxyXG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHt9O1xyXG4gICAgICAgIC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgIC8vIHRoaXMgYXZvaWRzIGl0ZXJhdGluZyBvdmVyIHRoZSBmdW5jdGlvbiBpdHNlbGZcclxuICAgICAgICB2YXIgaW5qZWN0UGFyYW1ldGVycyA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuICAgICAgICBpbmplY3RQYXJhbWV0ZXJzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5qZWN0ZWRTZXJ2aWNlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgaW5qZWN0ZWRTZXJ2aWNlc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcbiAgICAgICAgICAgIC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG4gICAgICAgICAgICBfLmVhY2goc2VydmljZU5hbWVzLCBmdW5jdGlvbiAoc2VydmljZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzW3NlcnZpY2VdID0gaW5qZWN0ZWRTZXJ2aWNlc1tpbmRleF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xyXG4gICAgfTtcclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5tb2NrID0gZnVuY3Rpb24gKG1vY2tzKSB7XHJcbiAgICAgICAgYW5ndWxhci5tb2NrLm1vZHVsZShmdW5jdGlvbiAoJHByb3ZpZGUpIHtcclxuICAgICAgICAgICAgXy5lYWNoKG1vY2tzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgJHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLmNvbnRyb2xsZXJXaXRoQmluZGluZ3MgPSBmdW5jdGlvbiAoY29udHJvbGxlck5hbWUsIGJpbmRpbmdzLCBsb2NhbHMsIHNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuICAgICAgICB2YXIgJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcbiAgICAgICAgdmFyICRjb250cm9sbGVyID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcbiAgICAgICAgc2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG4gICAgICAgIGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2NhbHMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscywgYmluZGluZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLmRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChkb20pIHtcclxuICAgICAgICB2YXIgc2VydmljZXMgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG4gICAgICAgIHZhciAkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuICAgICAgICB2YXIgJGNvbXBpbGUgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuICAgICAgICBhbmd1bGFyLm1vY2subW9kdWxlKCdyZW5vdm9UZW1wbGF0ZXMnKTtcclxuICAgICAgICB2YXIgY29tcG9uZW50ID0gJGNvbXBpbGUoZG9tKSgkcm9vdFNjb3BlKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuICAgICAgICAgICAgc2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBbmd1bGFyRml4dHVyZTtcclxufSkoKTtcclxuZXhwb3J0cy5hbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmd1bGFyRml4dHVyZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIG5vdGlmaWNhdGlvbl9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcbnZhciBWYWxpZGF0aW9uU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWYWxpZGF0aW9uU2VydmljZShub3RpZmljYXRpb24pIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25IYW5kbGVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubmV4dEtleSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlBc0Vycm9yID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmIGhhbmRsZXIuaXNBY3RpdmUoKSlcclxuICAgICAgICAgICAgICAgIHx8IGhhbmRsZXIuaXNBY3RpdmUgPT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IF8uaXNGdW5jdGlvbihoYW5kbGVyLmVycm9yTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICA/IGhhbmRsZXIuZXJyb3JNZXNzYWdlKClcclxuICAgICAgICAgICAgICAgICAgICA6IGhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm5vdGlmeUFzRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG4gICAgVmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlLnJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSB0aGlzLm5leHRLZXk7XHJcbiAgICAgICAgdGhpcy5uZXh0S2V5Kys7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNba2V5XTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVmFsaWRhdGlvblNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuVmFsaWRhdGlvblNlcnZpY2UgPSBWYWxpZGF0aW9uU2VydmljZTtcclxudmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbbm90aWZpY2F0aW9uX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeShub3RpZmljYXRpb24pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0aW9uU2VydmljZShub3RpZmljYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkgPSB2YWxpZGF0aW9uU2VydmljZUZhY3Rvcnk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbl9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCB2YWxpZGF0aW9uU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0aW9uLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2NvbXBhcmVSZXN1bHQnKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9