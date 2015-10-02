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
	var types = __webpack_require__(38);
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
	exports.moduleName = 'rl21.utilities.filters.truncate';
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
	var test = __webpack_require__(34);
	exports.test = test;
	var time = __webpack_require__(18);
	exports.time = time;
	var validation = __webpack_require__(37);
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
	exports.moduleName = 'rl21.utilities.services.fileSize';
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
	exports.moduleName = 'rl21.utilities.services.parentChildBehavior';
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
	    function PromiseUtility() {
	    }
	    PromiseUtility.prototype.isPromise = function (promise) {
	        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
	    };
	    return PromiseUtility;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, PromiseUtility);
	//# sourceMappingURL=promise.service.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(35);
	exports.mock = mock;
	__export(__webpack_require__(36));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);
	//# sourceMappingURL=test.module.js.map

/***/ },
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(20));
	//# sourceMappingURL=types.module.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2VlNTQ3MjcwNzJmZWE5MzdlZjciLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQyxLQUFZLFNBQVMsdUJBQU0sQ0FBOEIsQ0FBQztBQUtqRCxrQkFBUztBQUpsQixLQUFZLE9BQU8sdUJBQU0sQ0FBMEIsQ0FBQztBQUloQyxnQkFBTztBQUgzQixLQUFZLFFBQVEsdUJBQU0sRUFBNEIsQ0FBQztBQUcxQixpQkFBUTtBQUZyQyxLQUFZLEtBQUssdUJBQU0sRUFBc0IsQ0FBQztBQUVQLGNBQUs7QUFFakMsYUFBSSxHQUFXLGNBQWMsQ0FBQztBQUV6QyxRQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtLQUNwQixTQUFTLENBQUMsSUFBSTtLQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1osUUFBUSxDQUFDLElBQUk7RUFDYixDQUFDLENBQUM7Ozs7Ozs7QUNqQkgsY0FBYSxrQ0FBa0MsRUFBRSxJOzs7Ozs7QUNBakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDJDOzs7Ozs7QUNqR0EsY0FBYSw0QkFBNEIsRUFBRSxJOzs7Ozs7QUNBM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBaUQsd0JBQXdCLEVBQUU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsa0JBQWtCLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUyxJQUFJO0FBQ2I7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsMEM7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7OztBQzFCQTtBQUNBLG1DOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsbUQ7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSw0Qzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7O0FDdEJBLGNBQWEsaUNBQWlDLEVBQUUsSTs7Ozs7O0FDQWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLHFDQUFxQyxXQUFXLEVBQUUsRUFBRTtBQUNqRSxjQUFhLDBDQUEwQyx5Q0FBeUMsRUFBRSxFQUFFO0FBQ3BHLGNBQWEsbUNBQW1DLFdBQVcsRUFBRSxFQUFFO0FBQy9ELGNBQWEsbUNBQW1DLFdBQVcsRUFBRSxFQUFFO0FBQy9ELGNBQWEsaUNBQWlDLFdBQVcsRUFBRSxFQUFFO0FBQzdELGNBQWEsa0NBQWtDLFdBQVcsRUFBRSxFQUFFO0FBQzlELGNBQWEsa0NBQWtDLFdBQVcsRUFBRSxFQUFFO0FBQzlELGNBQWEsb0NBQW9DLFdBQVcsRUFBRSxFQUFFO0FBQ2hFLGNBQWEsdUNBQXVDLFdBQVcsRUFBRSxFQUFFO0FBQ25FLGNBQWEscUNBQXFDLFdBQVcsRUFBRSxFQUFFO0FBQ2pFLGNBQWEsc0NBQXNDLFdBQVcsRUFBRSxFQUFFO0FBQ2xFLGNBQWEsc0NBQXNDLFdBQVcsRUFBRSxFQUFFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EseUM7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxzREFBc0Q7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRDs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvQkFBb0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsMkM7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCx5REFBeUQsRUFBRTtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEOzs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsK0RBQThELGdCQUFnQjtBQUM5RSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUQ7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSx5Qzs7Ozs7O0FDdkJBO0FBQ0EsOEM7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQzs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRCxzQ0FBc0MsRUFBRTtBQUMxRiwwQ0FBeUMseUJBQXlCLEVBQUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0Esd0Q7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDRDOzs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxpQzs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLDJDOzs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDOzs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDIiwiZmlsZSI6InV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgN2VlNTQ3MjcwNzJmZWE5MzdlZjdcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYmVoYXZpb3JzIGZyb20gJy4vYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9maWx0ZXJzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMvc2VydmljZXMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi90eXBlcy90eXBlcy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHsgYmVoYXZpb3JzLCBmaWx0ZXJzLCBzZXJ2aWNlcywgdHlwZXMgfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0YmVoYXZpb3JzLm5hbWUsXHJcblx0ZmlsdGVycy5uYW1lLFxyXG5cdHNlcnZpY2VzLm5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS91dGlsaXRpZXMudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImFuZ3VsYXJcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBzdG9wRXZlbnRQcm9wb2dhdGlvbiA9IHJlcXVpcmUoJy4vc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24nKTtcclxuZXhwb3J0cy5zdG9wRXZlbnRQcm9wb2dhdGlvbiA9IHN0b3BFdmVudFByb3BvZ2F0aW9uO1xyXG5leHBvcnRzLm5hbWUgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubmFtZSwgW1xyXG4gICAgc3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJlaGF2aW9ycy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcbmV4cG9ydHMuZGlyZWN0aXZlTmFtZSA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZGlyZWN0aXZlKGV4cG9ydHMuZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9wRXZlbnRQcm9wYWdhdGlvbi5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIGlzRW1wdHkgPSByZXF1aXJlKCcuL2lzRW1wdHkvaXNFbXB0eScpO1xyXG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xyXG52YXIgdHJ1bmNhdGUgPSByZXF1aXJlKCcuL3RydW5jYXRlL3RydW5jYXRlJyk7XHJcbmV4cG9ydHMudHJ1bmNhdGUgPSB0cnVuY2F0ZTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWx0ZXInKSk7XHJcbmV4cG9ydHMubmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubmFtZSwgW1xyXG4gICAgaXNFbXB0eS5tb2R1bGVOYW1lLFxyXG4gICAgdHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlcnMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBvYmplY3Rfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdpc0VtcHR5JztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gZXhwb3J0cy5zZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5pc0VtcHR5LiRpbmplY3QgPSBbb2JqZWN0X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB0cnVlV2hlbkVtcHR5KSB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcbiAgICAgICAgaWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhaXNFbXB0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRW1wdHk7XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW29iamVjdF9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmlsdGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIGlzRW1wdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0VtcHR5LmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYXJyYXlfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnb2JqZWN0VXRpbGl0eSc7XHJcbnZhciBPYmplY3RVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9iamVjdFV0aWxpdHkoYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5pc051bGxPckVtcHR5ID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QgPT09ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5pc051bGxPcldoaXRlc3BhY2UgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG4gICAgICAgICAgICBvYmplY3QgPSBvYmplY3QudHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUuYXJlRXF1YWwgPSBmdW5jdGlvbiAob2JqMSwgb2JqMikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR5cGUxID0gdHlwZW9mIG9iajE7XHJcbiAgICAgICAgdmFyIHR5cGUyID0gdHlwZW9mIG9iajI7XHJcbiAgICAgICAgaWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgLy9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG4gICAgICAgICAgICB2YXIga2V5czIgPSBfLmtleXMob2JqMik7XHJcbiAgICAgICAgICAgIF8uZm9ySW4ob2JqMSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFycmF5LnJlbW92ZShrZXlzMiwga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgIGlmIChfLmFueShrZXlzMikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcbiAgICAgICAgICAgIHJldHVybiBvYmoxID09PSBvYmoyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gb2JqZWN0ICsgJyc7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUudmFsdWVPckRlZmF1bHQgPSBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkuJGluamVjdCA9IFthcnJheV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2FycmF5X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYmplY3Quc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiX1wiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiX1wiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnYXJyYXlVdGlsaXR5JztcclxudmFyIEFycmF5VXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcnJheVV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLmZpbmRJbmRleE9mID0gZnVuY3Rpb24gKGFycmF5LCBwcmVkaWNhdGUpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0SW5kZXg7XHJcbiAgICAgICAgXy5lYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChhcnJheSwgaXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleDtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChhcnJheSwgb2xkSXRlbSwgbmV3SXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS5zdW0gPSBmdW5jdGlvbiAoYXJyYXksIHRyYW5zZm9ybSkge1xyXG4gICAgICAgIHZhciBsaXN0O1xyXG4gICAgICAgIGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsaXN0ID0gXy5tYXAoYXJyYXksIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdCA9IGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXy5yZWR1Y2UobGlzdCwgZnVuY3Rpb24gKHN1bSwgbnVtKSB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUudG9EaWN0aW9uYXJ5ID0gZnVuY3Rpb24gKGFycmF5LCBrZXlTZWxlY3Rvcikge1xyXG4gICAgICAgIC8vIG5lZWRzIHRvIGJlIHNlZWRlZCB3aXRoIGFuIG9iamVjdCBvciBpdCB3aWxsIGJlIHZpZXdlZCBhcyBhbiBhcnJheSB3aXRoIG5vIGl0ZW1zXHJcbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKGFycmF5LCBmdW5jdGlvbiAoZGljdGlvbmFyeSwgaXRlbSkge1xyXG4gICAgICAgICAgICBkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXJyYXlVdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXkuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcbnZhciBvYmplY3Rfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybDIxLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICd0cnVuY2F0ZSc7XHJcbmV4cG9ydHMuZmlsdGVyTmFtZSA9IGV4cG9ydHMuc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxudHJ1bmNhdGUuJGluamVjdCA9IFtvYmplY3Rfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgdHJ1bmNhdGVUbywgaW5jbHVkZUVsbGlwc2VzKSB7XHJcbiAgICAgICAgaW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuICAgICAgICB2YXIgb3V0ID0gb2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoaW5wdXQpID8gJycgOiBpbnB1dC50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChvdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVuY2F0ZVRvICE9IG51bGwgJiYgb3V0Lmxlbmd0aCA+IHRydW5jYXRlVG8pIHtcclxuICAgICAgICAgICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcoMCwgdHJ1bmNhdGVUbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0ICs9ICcuLi4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW29iamVjdF9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmlsdGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJ1bmNhdGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L2FycmF5LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5hcnJheSA9IGFycmF5O1xyXG52YXIgYXV0b3NhdmUgPSByZXF1aXJlKCcuL2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5hdXRvc2F2ZSA9IGF1dG9zYXZlO1xyXG52YXIgYXV0b3NhdmVBY3Rpb24gPSByZXF1aXJlKCcuL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5hdXRvc2F2ZUFjdGlvbiA9IGF1dG9zYXZlQWN0aW9uO1xyXG52YXIgYm9vbGVhbiA9IHJlcXVpcmUoJy4vYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5ib29sZWFuID0gYm9vbGVhbjtcclxudmFyIGRhdGUgPSByZXF1aXJlKCcuL2RhdGUvZGF0ZS5tb2R1bGUnKTtcclxuZXhwb3J0cy5kYXRlID0gZGF0ZTtcclxudmFyIGZpbGVTaXplID0gcmVxdWlyZSgnLi9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUnKTtcclxuZXhwb3J0cy5maWxlU2l6ZSA9IGZpbGVTaXplO1xyXG52YXIgZ2VuZXJpY1NlYXJjaEZpbHRlciA9IHJlcXVpcmUoJy4vZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5nZW5lcmljU2VhcmNoRmlsdGVyID0gZ2VuZXJpY1NlYXJjaEZpbHRlcjtcclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJy4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxuZXhwb3J0cy5tb21lbnQgPSBtb21lbnQ7XHJcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcclxudmFyIG51bWJlclNlcnZpY2UgPSByZXF1aXJlKCcuL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG5leHBvcnRzLm51bWJlciA9IG51bWJlclNlcnZpY2U7XHJcbnZhciBvYmplY3RTZXJ2aWNlID0gcmVxdWlyZSgnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5vYmplY3QgPSBvYmplY3RTZXJ2aWNlO1xyXG52YXIgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcclxudmFyIHBhcmVudENoaWxkQmVoYXZpb3IgPSByZXF1aXJlKCcuL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMucGFyZW50Q2hpbGRCZWhhdmlvciA9IHBhcmVudENoaWxkQmVoYXZpb3I7XHJcbnZhciBwcm9taXNlID0gcmVxdWlyZSgnLi9wcm9taXNlL3Byb21pc2Uuc2VydmljZScpO1xyXG5leHBvcnRzLnByb21pc2UgPSBwcm9taXNlO1xyXG52YXIgc3RyaW5nU2VydmljZSA9IHJlcXVpcmUoJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nU2VydmljZTtcclxudmFyIHRlc3QgPSByZXF1aXJlKCcuL3Rlc3QvdGVzdC5tb2R1bGUnKTtcclxuZXhwb3J0cy50ZXN0ID0gdGVzdDtcclxudmFyIHRpbWUgPSByZXF1aXJlKCcuL3RpbWUvdGltZS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMudGltZSA9IHRpbWU7XHJcbnZhciB2YWxpZGF0aW9uID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xyXG5leHBvcnRzLm5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5uYW1lLCBbXHJcbiAgICBhcnJheS5tb2R1bGVOYW1lLFxyXG4gICAgYXV0b3NhdmUubW9kdWxlTmFtZSxcclxuICAgIGF1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWUsXHJcbiAgICBib29sZWFuLm1vZHVsZU5hbWUsXHJcbiAgICBkYXRlLm1vZHVsZU5hbWUsXHJcbiAgICBmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG4gICAgZ2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG4gICAgbW9tZW50Lm1vZHVsZU5hbWUsXHJcbiAgICBub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuICAgIG51bWJlclNlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuICAgIHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuICAgIHByb21pc2UubW9kdWxlTmFtZSxcclxuICAgIHN0cmluZ1NlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIHRpbWUubW9kdWxlTmFtZSxcclxuICAgIHRlc3QubW9kdWxlTmFtZSxcclxuICAgIHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYXV0b3NhdmVBY3Rpb25fc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdhdXRvc2F2ZUZhY3RvcnknO1xyXG52YXIgQXV0b3NhdmVTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5hdXRvc2F2ZVNlcnZpY2UgPSBhdXRvc2F2ZVNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5zYXZlID0gc2F2ZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRGb3JtID0gY29udGVudEZvcm07XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IHZhbGlkYXRlO1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5jb250ZW50Rm9ybS4kcHJpc3RpbmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5oYXNWYWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkID0gX3RoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBfdGhpcy5zYXZlLmFwcGx5KF90aGlzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChwcm9taXNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF1dG9zYXZlU2VydmljZS50cmlnZ2VyKHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb250ZW50Rm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb250ZW50Rm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhhc1ZhbGlkYXRvciA9IHZhbGlkYXRlICE9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudEZvcm0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRGb3JtID0gdGhpcy5udWxsRm9ybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEF1dG9zYXZlU2VydmljZS5wcm90b3R5cGUubnVsbEZvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJHByaXN0aW5lOiBmYWxzZSxcclxuICAgICAgICAgICAgJHNldFByaXN0aW5lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXV0b3NhdmVTZXJ2aWNlO1xyXG59KSgpO1xyXG5hdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbYXV0b3NhdmVBY3Rpb25fc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeShhdXRvc2F2ZVNlcnZpY2UpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIChzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBdXRvc2F2ZVNlcnZpY2UoYXV0b3NhdmVTZXJ2aWNlLCBzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbYXV0b3NhdmVBY3Rpb25fc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dG9zYXZlLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdhdXRvc2F2ZUFjdGlvbic7XHJcbnZhciBBdXRvc2F2ZUFjdGlvblNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKCR0aW1lb3V0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbiA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIHRydWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hdXRvc2F2ZUZhaWxlZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZXNvbHZlQXV0b3NhdmUgPSBmdW5jdGlvbiAoZGF0YSwgc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBfdGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIF90aGlzLl9zdWNjZXNzZnVsID0gc3VjY2VzcztcclxuICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIF90aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBdXRvc2F2ZUFjdGlvblNlcnZpY2UucHJvdG90eXBlLCBcInNhdmluZ1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zYXZpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZSwgXCJjb21wbGV0ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21wbGV0ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBdXRvc2F2ZUFjdGlvblNlcnZpY2UucHJvdG90eXBlLCBcInN1Y2Nlc3NmdWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3VjY2Vzc2Z1bDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XHJcbiAgICAgICAgdGhpcy5fc2F2aW5nID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKHRoaXMuYXV0b3NhdmVTdWNjZXNzZnVsKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5hdXRvc2F2ZUZhaWxlZCk7XHJcbiAgICB9O1xyXG4gICAgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLiRpbmplY3QgPSBbJyR0aW1lb3V0J107XHJcbiAgICByZXR1cm4gQXV0b3NhdmVBY3Rpb25TZXJ2aWNlO1xyXG59KSgpO1xyXG5uZy5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEF1dG9zYXZlQWN0aW9uU2VydmljZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dG9zYXZlQWN0aW9uLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnYm9vbGVhblV0aWxpdHknO1xyXG52YXIgQm9vbGVhblV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQm9vbGVhblV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBCb29sZWFuVXRpbGl0eS5wcm90b3R5cGUudG9Cb29sID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiAhIW9iamVjdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQm9vbGVhblV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBCb29sZWFuVXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb2xlYW4uc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbW9tZW50X21vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxudmFyIHRpbWVfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vdGltZS90aW1lLnNlcnZpY2UnKTtcclxudmFyIGRhdGVfc2VydmljZV8xID0gcmVxdWlyZSgnLi9kYXRlLnNlcnZpY2UnKTtcclxudmFyIGRhdGVUaW1lRm9ybWF0U3RyaW5nc18xID0gcmVxdWlyZSgnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9kYXRlLnNlcnZpY2UnKSk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFttb21lbnRfbW9kdWxlXzEubW9kdWxlTmFtZSwgdGltZV9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuc2VydmljZShkYXRlX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZSwgZGF0ZV9zZXJ2aWNlXzEuRGF0ZVV0aWxpdHkpXHJcbiAgICAudmFsdWUoZGF0ZVRpbWVGb3JtYXRTdHJpbmdzXzEuZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGF0ZVRpbWVGb3JtYXRTdHJpbmdzXzEuZGVmYXVsdEZvcm1hdHMpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ21vbWVudFdyYXBwZXInO1xyXG5mdW5jdGlvbiBtb21lbnRXcmFwcGVyKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLy8gVXNpbmcgYGFueWAgaW5zdGVhZCBvZiBNb21lbnRTdGF0aWMgYmVjYXVzZVxyXG4gICAgLy8gIGNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrIGRvZXNuJ3QgYXBwZWFyIHRvIGJlXHJcbiAgICAvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcbiAgICB2YXIgbW9tZW50V3JhcHBlciA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuICAgIC8vIFNldCBkZWZhdWx0IG1ldGhvZCBmb3IgaGFuZGxpbmcgbm9uLUlTTyBkYXRlIGNvbnZlcnNpb25zLlxyXG4gICAgLy8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG4gICAgLy8gVGhpcyBhbHNvIHByZXZlbnRzIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXHJcbiAgICBtb21lbnRXcmFwcGVyLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcbn1cclxuZXhwb3J0cy5tb21lbnRXcmFwcGVyID0gbW9tZW50V3JhcHBlcjtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuc2VydmljZU5hbWUsIG1vbWVudFdyYXBwZXIpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb21lbnQubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm1vbWVudFwiXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAndGltZVV0aWxpdHknO1xyXG52YXIgVGltZVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVGltZVV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBUaW1lVXRpbGl0eS5wcm90b3R5cGUubWlsbGlzZWNvbmRzVG9TZWNvbmRzID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG4gICAgfTtcclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb01pbnV0ZXMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuICAgIH07XHJcbiAgICBUaW1lVXRpbGl0eS5wcm90b3R5cGUubWlsbGlzZWNvbmRzVG9Ib3VycyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG4gICAgfTtcclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb0RheXMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRpbWVVdGlsaXR5O1xyXG59KSgpO1xyXG5leHBvcnRzLlRpbWVVdGlsaXR5ID0gVGltZVV0aWxpdHk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIHRpbWVfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vdGltZS90aW1lLnNlcnZpY2UnKTtcclxudmFyIG1vbWVudF9tb2R1bGVfMSA9IHJlcXVpcmUoJy4uL21vbWVudC9tb21lbnQubW9kdWxlJyk7XHJcbnZhciBjb21wYXJlUmVzdWx0XzEgPSByZXF1aXJlKCcuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0Jyk7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnZGF0ZVV0aWxpdHknO1xyXG52YXIgRGF0ZVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRGF0ZVV0aWxpdHkobW9tZW50LCB0aW1lKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm1vbWVudCA9IG1vbWVudDtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMuYmFzZUZvcm1hdCA9ICdNTS1ERC1ZWVlZJztcclxuICAgICAgICB0aGlzLm1vbnRoID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnRmVicnVhcnknLCBkYXlzOiBmdW5jdGlvbiAoeWVhcikgeyByZXR1cm4gX3RoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjg7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnTWFyY2gnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdBcHJpbCcsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMwOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ01heScsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0p1bmUnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdKdWx5JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnQXVndXN0JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnT2N0b2JlcicsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuaXNMZWFwWWVhciA9IGZ1bmN0aW9uICh5ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXRGdWxsU3RyaW5nID0gZnVuY3Rpb24gKG1vbnRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldERheXMgPSBmdW5jdGlvbiAobW9udGgsIHllYXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuc3VidHJhY3REYXRlcyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBkYXRlRm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFydERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHZhciBlbmREYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHJlc3VsdC55ZWFycyA9IGVuZERhdGUuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICBpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tb250aHMgLT0gMTtcclxuICAgICAgICAgICAgcmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG4gICAgICAgICAgICByZXN1bHQueWVhcnMgLT0gMTtcclxuICAgICAgICAgICAgcmVzdWx0Lm1vbnRocyArPSAxMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuc3VidHJhY3REYXRlSW5EYXlzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICBpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmNvbXBhcmVEYXRlcyA9IGZ1bmN0aW9uIChkYXRlMSwgZGF0ZTIsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICAvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG4gICAgICAgIHZhciBkaWZmZXJlbmNlID0gdGhpcy5zdWJ0cmFjdERhdGVJbkRheXMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICByZXR1cm4gY29tcGFyZVJlc3VsdF8xLmdldENvbXBhcmVSZXN1bHQoZGlmZmVyZW5jZSk7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmRhdGVJblJhbmdlID0gZnVuY3Rpb24gKGRhdGUsIHJhbmdlU3RhcnQsIHJhbmdlRW5kKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlU3RhcnQpID09PSBjb21wYXJlUmVzdWx0XzEuQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBjb21wYXJlUmVzdWx0XzEuQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uIChkYXRlLCBkYXRlRm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIGZvcm1hdCA9IGRhdGVGb3JtYXQgIT0gbnVsbCA/IGRhdGVGb3JtYXQgOiB0aGlzLmJhc2VGb3JtYXQ7XHJcbiAgICAgICAgaWYgKF8uaXNEYXRlKGRhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUsIGZvcm1hdCkudG9EYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXROb3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkuJGluamVjdCA9IFttb21lbnRfbW9kdWxlXzEuc2VydmljZU5hbWUsIHRpbWVfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuICAgIHJldHVybiBEYXRlVXRpbGl0eTtcclxufSkoKTtcclxuZXhwb3J0cy5EYXRlVXRpbGl0eSA9IERhdGVVdGlsaXR5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbihmdW5jdGlvbiAoQ29tcGFyZVJlc3VsdCkge1xyXG4gICAgQ29tcGFyZVJlc3VsdFtDb21wYXJlUmVzdWx0W1wiZ3JlYXRlclwiXSA9IDFdID0gXCJncmVhdGVyXCI7XHJcbiAgICBDb21wYXJlUmVzdWx0W0NvbXBhcmVSZXN1bHRbXCJlcXVhbFwiXSA9IDBdID0gXCJlcXVhbFwiO1xyXG4gICAgQ29tcGFyZVJlc3VsdFtDb21wYXJlUmVzdWx0W1wibGVzc1wiXSA9IC0xXSA9IFwibGVzc1wiO1xyXG59KShleHBvcnRzLkNvbXBhcmVSZXN1bHQgfHwgKGV4cG9ydHMuQ29tcGFyZVJlc3VsdCA9IHt9KSk7XHJcbnZhciBDb21wYXJlUmVzdWx0ID0gZXhwb3J0cy5Db21wYXJlUmVzdWx0O1xyXG5mdW5jdGlvbiBnZXRDb21wYXJlUmVzdWx0KG51bSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgaWYgKG51bSA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBDb21wYXJlUmVzdWx0LmVxdWFsO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobnVtID4gMCkge1xyXG4gICAgICAgIHJldHVybiBDb21wYXJlUmVzdWx0LmdyZWF0ZXI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0Q29tcGFyZVJlc3VsdCA9IGdldENvbXBhcmVSZXN1bHQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBhcmVSZXN1bHQuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS90eXBlcy9jb21wYXJlUmVzdWx0LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0cy5kYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcbmV4cG9ydHMuZGVmYXVsdEZvcm1hdHMgPSB7XHJcbiAgICBkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcbiAgICBkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG4gICAgdGltZUZvcm1hdDogJ2g6bW1BJyxcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBudW1iZXJfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJyk7XHJcbnZhciBmaWxlU2l6ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplLnNlcnZpY2UnKTtcclxudmFyIGZpbGVTaXplRmlsdGVyXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplRmlsdGVyJyk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZmlsZVNpemUuc2VydmljZScpKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWxlU2l6ZUZpbHRlcicpKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbbnVtYmVyX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGZpbGVTaXplX3NlcnZpY2VfMS5mYWN0b3J5TmFtZSwgZmlsZVNpemVfc2VydmljZV8xLmZpbGVTaXplRmFjdG9yeSlcclxuICAgIC5maWx0ZXIoZmlsZVNpemVGaWx0ZXJfMS5zaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcl8xLmZpbGVTaXplRmlsdGVyKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemUubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdudW1iZXJVdGlsaXR5JztcclxudmFyIFNpZ247XHJcbihmdW5jdGlvbiAoU2lnbikge1xyXG4gICAgU2lnbltTaWduW1wicG9zaXRpdmVcIl0gPSAxXSA9IFwicG9zaXRpdmVcIjtcclxuICAgIFNpZ25bU2lnbltcIm5lZ2F0aXZlXCJdID0gLTFdID0gXCJuZWdhdGl2ZVwiO1xyXG59KShTaWduIHx8IChTaWduID0ge30pKTtcclxudmFyIE51bWJlclV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTnVtYmVyVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIE51bWJlclV0aWxpdHkucHJvdG90eXBlLnByZWNpc2VSb3VuZCA9IGZ1bmN0aW9uIChudW0sIGRlY2ltYWxzKSB7XHJcbiAgICAgICAgdmFyIHNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoc2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuICAgIH07XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5pbnRlZ2VyRGl2aWRlID0gZnVuY3Rpb24gKGRpdmlkZW5kLCBkaXZpc29yKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuICAgIH07XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5yb3VuZFRvU3RlcCA9IGZ1bmN0aW9uIChudW0sIHN0ZXApIHtcclxuICAgICAgICBpZiAoIXN0ZXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IG51bSAlIHN0ZXA7XHJcbiAgICAgICAgaWYgKHJlbWFpbmRlciA+PSBzdGVwIC8gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtICsgKHN0ZXAgLSByZW1haW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bSAtIHJlbWFpbmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE51bWJlclV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnVtYmVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbnVtYmVyX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcbnZhciBGaWxlU2l6ZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKSB7XHJcbiAgICAgICAgdGhpcy5CWVRFU19QRVJfR0IgPSAxMDczNzQxODI0O1xyXG4gICAgICAgIHRoaXMuQllURVNfUEVSX01CID0gMTA0ODU3NjtcclxuICAgICAgICB0aGlzLkJZVEVTX1BFUl9LQiA9IDEwMjQ7XHJcbiAgICAgICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xyXG4gICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG4gICAgICAgICAgICB0aGlzLmlzR0IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9HQjtcclxuICAgICAgICAgICAgdGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc0dCID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01CID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTUIgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX01CO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01CID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzS0IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNLQiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG4gICAgfVxyXG4gICAgRmlsZVNpemVTZXJ2aWNlLnByb3RvdHlwZS5kaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzR0IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEZpbGVTaXplU2VydmljZTtcclxufSkoKTtcclxuZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZmlsZVNpemVGYWN0b3J5ID0gZmlsZVNpemVGYWN0b3J5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWxlU2l6ZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBmaWxlU2l6ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplLnNlcnZpY2UnKTtcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5leHBvcnRzLnNpbXBsZUZpbHRlck5hbWUgPSAnZmlsZVNpemUnO1xyXG5leHBvcnRzLmZpbHRlck5hbWUgPSBleHBvcnRzLnNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmaWxlU2l6ZV9zZXJ2aWNlXzEuZmFjdG9yeU5hbWVdO1xyXG5mdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3RvcnkpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuICAgICAgICB2YXIgZmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG4gICAgICAgIHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZmlsZVNpemVGaWx0ZXIgPSBmaWxlU2l6ZUZpbHRlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemVGaWx0ZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgb2JqZWN0X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG52YXIgc3RyaW5nX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3N0cmluZy9zdHJpbmcuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gJ3NlYXJjaCc7XHJcbnZhciBHZW5lcmljU2VhcmNoRmlsdGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgICAgICB0aGlzLnR5cGUgPSBleHBvcnRzLmZpbHRlck5hbWU7XHJcbiAgICAgICAgdGhpcy5taW5TZWFyY2hMZW5ndGggPSAxO1xyXG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgR2VuZXJpY1NlYXJjaEZpbHRlci5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpIHx8IHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPCB0aGlzLm1pblNlYXJjaExlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuICAgIH07XHJcbiAgICBHZW5lcmljU2VhcmNoRmlsdGVyLnByb3RvdHlwZS5zZWFyY2hPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gXy52YWx1ZXMoaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmFueSh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhU3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcbiAgICAgICAgICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxufSkoKTtcclxuZXhwb3J0cy5HZW5lcmljU2VhcmNoRmlsdGVyID0gR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Rfc2VydmljZV8xLnNlcnZpY2VOYW1lLCBzdHJpbmdfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0LCBzdHJpbmdVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbb2JqZWN0X3NlcnZpY2VfMS5tb2R1bGVOYW1lLCBzdHJpbmdfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG52YXIgU3RyaW5nVXRpbGl0eVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3RyaW5nVXRpbGl0eVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBTdHJpbmdVdGlsaXR5U2VydmljZS5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICtzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKHN0ciwgc3Vic3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHN1YnN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIFN0cmluZ1V0aWxpdHlTZXJ2aWNlLnByb3RvdHlwZS5zdWJzdGl0dXRlID0gZnVuY3Rpb24gKGZvcm1hdFN0cmluZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXy5lYWNoKHBhcmFtcywgZnVuY3Rpb24gKHBhcmFtLCBpbmRleCkge1xyXG4gICAgICAgICAgICBmb3JtYXRTdHJpbmcgPSBfdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXRTdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLnJlcGxhY2VBbGwgPSBmdW5jdGlvbiAoc3RyLCBwYXR0ZXJuVG9GaW5kLCByZXBsYWNlbWVudFN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN0cmluZ1V0aWxpdHlTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlN0cmluZ1V0aWxpdHlTZXJ2aWNlID0gU3RyaW5nVXRpbGl0eVNlcnZpY2U7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmluZy5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYmFzZU5vdGlmaWVyXzEgPSByZXF1aXJlKCcuL2Jhc2VOb3RpZmllcicpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL25vdGlmaWNhdGlvblR5cGVzJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbm90aWZpY2F0aW9uJztcclxudmFyIE5vdGlmaWNhdGlvblNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTm90aWZpY2F0aW9uU2VydmljZShub3RpZmllcikge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuICAgIH1cclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS53YXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLk5vdGlmaWNhdGlvblNlcnZpY2UgPSBOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG5mdW5jdGlvbiBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgdmFyIHByb3ZpZGVyID0ge1xyXG4gICAgICAgIG5vdGlmaWVyOiBuZXcgYmFzZU5vdGlmaWVyXzEuQmFzZU5vdGlmaWVyKCksXHJcbiAgICAgICAgc2V0Tm90aWZpZXI6IGZ1bmN0aW9uIChub3RpZmllcikge1xyXG4gICAgICAgICAgICBfdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UoX3RoaXMubm90aWZpZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHByb3ZpZGVyO1xyXG59XHJcbmV4cG9ydHMubm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyID0gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnByb3ZpZGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIEJhc2VOb3RpZmllciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlTm90aWZpZXIoKSB7XHJcbiAgICB9XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlTm90aWZpZXI7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZU5vdGlmaWVyID0gQmFzZU5vdGlmaWVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlTm90aWZpZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90aWZpY2F0aW9uVHlwZXMuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG52YXIgT2JzZXJ2YWJsZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMubmV4dEtleSA9IDA7XHJcbiAgICB9XHJcbiAgICBPYnNlcnZhYmxlU2VydmljZS5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEtleSA9IHRoaXMubmV4dEtleTtcclxuICAgICAgICB0aGlzLm5leHRLZXkrKztcclxuICAgICAgICB0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcclxuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgcGFyYW1zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoZnVuY3Rpb24gKHdhdGNoZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh3YXRjaGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseShfdGhpcywgcGFyYW1zKTtcclxuICAgICAgICB9KS52YWx1ZSgpO1xyXG4gICAgfTtcclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9ic2VydmFibGVTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLk9ic2VydmFibGVTZXJ2aWNlID0gT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbmZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkgPSBvYnNlcnZhYmxlU2VydmljZUZhY3Rvcnk7XHJcbm5nLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG52YXIgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUuZ2V0Q2hpbGRCZWhhdmlvciA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciA9IGZ1bmN0aW9uIChjaGlsZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGJlaGF2aW9yID0gdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTtcclxuICAgICAgICBpZiAoYmVoYXZpb3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzID0gZnVuY3Rpb24gKGNoaWxkTGlzdCwgYWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGJlaGF2aW9ycyA9IHRoaXMuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMoY2hpbGRMaXN0KTtcclxuICAgICAgICByZXR1cm4gXy5tYXAoYmVoYXZpb3JzLCBmdW5jdGlvbiAoYmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLmdldEFsbENoaWxkQmVoYXZpb3JzID0gZnVuY3Rpb24gKGNoaWxkTGlzdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIF8oY2hpbGRMaXN0KS5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBfdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTsgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoYmVoYXZpb3IpIHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcbiAgICAgICAgICAgIC52YWx1ZSgpO1xyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IgPSBmdW5jdGlvbiAoY2hpbGQsIGJlaGF2aW9yKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG4gICAgICAgIGlmIChjdXJyZW50QmVoYXZpb3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBfLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlID0gUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2U7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAncHJvbWlzZVV0aWxpdHknO1xyXG52YXIgUHJvbWlzZVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUHJvbWlzZVV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlVXRpbGl0eS5wcm90b3R5cGUuaXNQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFByb21pc2VVdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgUHJvbWlzZVV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9taXNlLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBtb2NrID0gcmVxdWlyZSgnLi9tb2NrJyk7XHJcbmV4cG9ydHMubW9jayA9IG1vY2s7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vYW5ndWxhckZpeHR1cmUnKSk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW1xyXG4gICAgbW9jay5tb2R1bGVOYW1lLFxyXG5dKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVzdC5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L3Rlc3QubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8gdXNlcyBzaW5vbiBidXQgY2FuJ3QgaW1wb3J0IGJlY2F1c2Ugc2lub24gdXNlcyBkeW5hbWljIHJlcXVpcmVzXHJcbi8vIHNpbm9uIHR5cGVzIHdpbGwgYmUgcmVzb2x2ZWQgZnJvbSB0c2QuZC50c1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lm1vY2snO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ21vY2tVdGlsaXR5JztcclxudmFyIE1vY2sgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTW9jaygkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG4gICAgTW9jay5wcm90b3R5cGUuc2VydmljZSA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc2VydmljZSkpIHtcclxuICAgICAgICAgICAgc2VydmljZSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgfTtcclxuICAgIE1vY2sucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoc2VydmljZSwgbWV0aG9kTmFtZSwgZGF0YSwgc3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG4gICAgICAgICAgICBzdWNjZXNzZnVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF90aGlzLiRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTogZGVmZXJyZWQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1vY2sucHJvdG90eXBlLnByb21pc2VXaXRoQ2FsbGJhY2sgPSBmdW5jdGlvbiAoc2VydmljZSwgbWV0aG9kTmFtZSwgY2FsbGJhY2ssIHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuICAgICAgICAgICAgc3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gX3RoaXMuJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlOiBkZWZlcnJlZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGNhbGxiYWNrLmFwcGx5KF90aGlzLCBwYXJhbXMpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1vY2sucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKHNlcnZpY2UsIHNjb3BlKSB7XHJcbiAgICAgICAgLy8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG4gICAgICAgIHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcbiAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuICAgICAgICAvLyBQcm9jZXNzIHRoZSBzYXZlZCBsaXN0LlxyXG4gICAgICAgIC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3RcclxuICAgICAgICAvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG4gICAgICAgIF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wcm9taXNlLnJlamVjdChyZXF1ZXN0LmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgIH07XHJcbiAgICBNb2NrLiRpbmplY3QgPSBbJyRxJywgJyRyb290U2NvcGUnXTtcclxuICAgIHJldHVybiBNb2NrO1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgTW9jayk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vY2suanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L21vY2suanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxucmVxdWlyZSgnYW5ndWxhci1tb2NrcycpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgQW5ndWxhckZpeHR1cmUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQW5ndWxhckZpeHR1cmUoKSB7XHJcbiAgICB9XHJcbiAgICBBbmd1bGFyRml4dHVyZS5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlTmFtZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBzZXJ2aWNlTmFtZXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiBhbGwgb2YgdGhlIHNlcnZpY2VzIHJlcXVlc3RlZFxyXG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHt9O1xyXG4gICAgICAgIC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgIC8vIHRoaXMgYXZvaWRzIGl0ZXJhdGluZyBvdmVyIHRoZSBmdW5jdGlvbiBpdHNlbGZcclxuICAgICAgICB2YXIgaW5qZWN0UGFyYW1ldGVycyA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuICAgICAgICBpbmplY3RQYXJhbWV0ZXJzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5qZWN0ZWRTZXJ2aWNlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgaW5qZWN0ZWRTZXJ2aWNlc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcbiAgICAgICAgICAgIC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG4gICAgICAgICAgICBfLmVhY2goc2VydmljZU5hbWVzLCBmdW5jdGlvbiAoc2VydmljZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzW3NlcnZpY2VdID0gaW5qZWN0ZWRTZXJ2aWNlc1tpbmRleF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xyXG4gICAgfTtcclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5tb2NrID0gZnVuY3Rpb24gKG1vY2tzKSB7XHJcbiAgICAgICAgYW5ndWxhci5tb2NrLm1vZHVsZShmdW5jdGlvbiAoJHByb3ZpZGUpIHtcclxuICAgICAgICAgICAgXy5lYWNoKG1vY2tzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgJHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLmNvbnRyb2xsZXJXaXRoQmluZGluZ3MgPSBmdW5jdGlvbiAoY29udHJvbGxlck5hbWUsIGJpbmRpbmdzLCBsb2NhbHMsIHNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuICAgICAgICB2YXIgJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcbiAgICAgICAgdmFyICRjb250cm9sbGVyID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcbiAgICAgICAgc2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG4gICAgICAgIGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2NhbHMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscywgYmluZGluZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLmRpcmVjdGl2ZSA9IGZ1bmN0aW9uIChkb20pIHtcclxuICAgICAgICB2YXIgc2VydmljZXMgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG4gICAgICAgIHZhciAkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuICAgICAgICB2YXIgJGNvbXBpbGUgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuICAgICAgICBhbmd1bGFyLm1vY2subW9kdWxlKCdyZW5vdm9UZW1wbGF0ZXMnKTtcclxuICAgICAgICB2YXIgY29tcG9uZW50ID0gJGNvbXBpbGUoZG9tKSgkcm9vdFNjb3BlKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuICAgICAgICAgICAgc2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBbmd1bGFyRml4dHVyZTtcclxufSkoKTtcclxuZXhwb3J0cy5hbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmd1bGFyRml4dHVyZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIG5vdGlmaWNhdGlvbl9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcbnZhciBWYWxpZGF0aW9uU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWYWxpZGF0aW9uU2VydmljZShub3RpZmljYXRpb24pIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25IYW5kbGVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubmV4dEtleSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlBc0Vycm9yID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmIGhhbmRsZXIuaXNBY3RpdmUoKSlcclxuICAgICAgICAgICAgICAgIHx8IGhhbmRsZXIuaXNBY3RpdmUgPT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IF8uaXNGdW5jdGlvbihoYW5kbGVyLmVycm9yTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICA/IGhhbmRsZXIuZXJyb3JNZXNzYWdlKClcclxuICAgICAgICAgICAgICAgICAgICA6IGhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm5vdGlmeUFzRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG4gICAgVmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlLnJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSB0aGlzLm5leHRLZXk7XHJcbiAgICAgICAgdGhpcy5uZXh0S2V5Kys7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNba2V5XTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVmFsaWRhdGlvblNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuVmFsaWRhdGlvblNlcnZpY2UgPSBWYWxpZGF0aW9uU2VydmljZTtcclxudmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbbm90aWZpY2F0aW9uX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeShub3RpZmljYXRpb24pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0aW9uU2VydmljZShub3RpZmljYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkgPSB2YWxpZGF0aW9uU2VydmljZUZhY3Rvcnk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW25vdGlmaWNhdGlvbl9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCB2YWxpZGF0aW9uU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0aW9uLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2NvbXBhcmVSZXN1bHQnKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9