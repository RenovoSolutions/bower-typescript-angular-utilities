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
	var types = __webpack_require__(51);
	exports.types = types;
	exports.name = 'rl.utilities';
	angular.module(exports.name, [
	    behaviors.name,
	    filters.name,
	    services.moduleName,
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
	    ArrayUtility.prototype.last = function (array) {
	        if (array != null && array.length > 0) {
	            return array[array.length - 1];
	        }
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
	var dataContracts = __webpack_require__(15);
	exports.dataContracts = dataContracts;
	var date = __webpack_require__(22);
	exports.date = date;
	var fileSize = __webpack_require__(29);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(33);
	exports.genericSearchFilter = genericSearchFilter;
	var guid = __webpack_require__(35);
	exports.guid = guid;
	var moment = __webpack_require__(23);
	exports.moment = moment;
	var notification = __webpack_require__(38);
	exports.notification = notification;
	var numberService = __webpack_require__(30);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(41);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(42);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(43);
	exports.promise = promise;
	var stringService = __webpack_require__(34);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(44);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(45);
	exports.test = test;
	var time = __webpack_require__(25);
	exports.time = time;
	var validation = __webpack_require__(48);
	exports.validation = validation;
	exports.moduleName = 'rl.utilities.services';
	angular.module(exports.moduleName, [
	    array.moduleName,
	    autosave.moduleName,
	    autosaveAction.moduleName,
	    boolean.moduleName,
	    dataContracts.moduleName,
	    date.moduleName,
	    fileSize.moduleName,
	    genericSearchFilter.moduleName,
	    guid.moduleName,
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
	    function AutosaveService($rootScope, $timeout, autosaveService, options) {
	        var _this = this;
	        this.$timeout = $timeout;
	        this.autosaveService = autosaveService;
	        this.debounceDuration = 1000;
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
	        this.hasValidator = options.validate != null;
	        this.contentForm = options.contentForm || this.nullForm();
	        this.save = options.save;
	        this.validate = options.validate;
	        this.initChangeListeners(options);
	        $rootScope.$watch(function () { return _this.contentForm.$dirty; }, function (value) {
	            if (value) {
	                _this.setTimer();
	                _this.clearChangeListener = _this.setChangeListener(function () {
	                    $timeout.cancel(_this.timer);
	                    _this.setTimer();
	                });
	            }
	        });
	    }
	    AutosaveService.prototype.setTimer = function () {
	        var _this = this;
	        this.timer = this.$timeout(function () {
	            _this.clearChangeListener();
	            _this.autosave();
	        }, this.debounceDuration);
	    };
	    AutosaveService.prototype.nullForm = function () {
	        return {
	            $pristine: false,
	            $dirty: true,
	            $setPristine: function () {
	                return;
	            },
	        };
	    };
	    AutosaveService.prototype.initChangeListeners = function (options) {
	        this.setChangeListener = options.setChangeListener || this.nullSetListener;
	        this.clearChangeListener = this.nullClearListener;
	    };
	    AutosaveService.prototype.nullSetListener = function () {
	        console.log('No change listener available');
	        return this.nullClearListener;
	    };
	    AutosaveService.prototype.nullClearListener = function () {
	        console.log('No change listener register');
	    };
	    return AutosaveService;
	})();
	autosaveServiceFactory.$inject = ['$rootScope', '$timeout', autosaveAction_service_1.serviceName];
	function autosaveServiceFactory($rootScope, $timeout, autosaveService) {
	    'use strict';
	    return {
	        getInstance: function (options) {
	            return new AutosaveService($rootScope, $timeout, autosaveService, options);
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
	var baseResourceBuilder_service_1 = __webpack_require__(16);
	var baseData_service_1 = __webpack_require__(17);
	var baseSingletonData_service_1 = __webpack_require__(19);
	exports.moduleName = 'rl.utilities.services.dataContracts';
	__export(__webpack_require__(21));
	var baseData_service_2 = __webpack_require__(17);
	exports.BaseDataService = baseData_service_2.BaseDataService;
	exports.baseDataServiceFactoryName = baseData_service_2.factoryName;
	__export(__webpack_require__(18));
	var baseSingletonData_service_2 = __webpack_require__(19);
	exports.BaseSingletonDataService = baseSingletonData_service_2.BaseSingletonDataService;
	exports.baseSingletonDataServiceFactoryName = baseSingletonData_service_2.factoryName;
	__export(__webpack_require__(20));
	var baseResourceBuilder_service_2 = __webpack_require__(16);
	exports.builderServiceName = baseResourceBuilder_service_2.serviceName;
	angular.module(exports.moduleName, [
	    baseData_service_1.moduleName,
	    baseSingletonData_service_1.moduleName,
	    baseResourceBuilder_service_1.moduleName,
	]);
	//# sourceMappingURL=dataContracts.module.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var array_service_1 = __webpack_require__(8);
	var baseData_service_1 = __webpack_require__(17);
	var baseParentData_service_1 = __webpack_require__(18);
	var baseSingletonData_service_1 = __webpack_require__(19);
	var baseParentSingletonData_service_1 = __webpack_require__(20);
	exports.moduleName = 'rl.utilities.services.baseResourceBuilder';
	exports.serviceName = 'baseResourceBuilder';
	var BaseResourceBuilder = (function () {
	    function BaseResourceBuilder($http, $q, $rootScope, array) {
	        this.$http = $http;
	        this.$q = $q;
	        this.$rootScope = $rootScope;
	        this.array = array;
	    }
	    BaseResourceBuilder.prototype.getLibraryServices = function () {
	        return {
	            $q: this.$q,
	            $rootScope: this.$rootScope,
	        };
	    };
	    BaseResourceBuilder.prototype.createResource = function (options) {
	        options.useMock = options.endpoint == null ? true : options.useMock;
	        return new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentResource = function (options) {
	        options.useMock = options.endpoint == null ? true : options.useMock;
	        return new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createSingletonResource = function (options) {
	        options.useMock = options.endpoint == null ? true : options.useMock;
	        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.prototype.createParentSingletonResource = function (options) {
	        options.useMock = options.endpoint == null ? true : options.useMock;
	        return new baseParentSingletonData_service_1.BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock, options.logRequests);
	    };
	    BaseResourceBuilder.$inject = ['$http', '$q', '$rootScope', array_service_1.serviceName];
	    return BaseResourceBuilder;
	})();
	exports.BaseResourceBuilder = BaseResourceBuilder;
	angular.module(exports.moduleName, [array_service_1.moduleName])
	    .service(exports.serviceName, BaseResourceBuilder);
	//# sourceMappingURL=baseResourceBuilder.service.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var array_service_1 = __webpack_require__(8);
	exports.moduleName = 'rl.utilities.services.baseDataService';
	exports.factoryName = 'baseDataService';
	var BaseDataService = (function () {
	    function BaseDataService($http, $q, array, _endpoint, mockData, transform, useMock, logRequests) {
	        this.$http = $http;
	        this.$q = $q;
	        this.array = array;
	        this._endpoint = _endpoint;
	        this.mockData = mockData;
	        this.transform = transform;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	    }
	    Object.defineProperty(BaseDataService.prototype, "endpoint", {
	        get: function () {
	            return this._endpoint;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseDataService.prototype.getItemEndpoint = function (id) {
	        return this.endpoint + '/' + id.toString();
	    };
	    BaseDataService.prototype.getList = function (params) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            promise = this.$q.when(this.mockData);
	        }
	        else {
	            promise = this.$http.get(this.endpoint, { params: params })
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _.map(data, _this.transform);
	            }
	            if (_this.logRequests) {
	                _this.log('getList', data);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.getDetail = function (id) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            promise = this.$q.when(_.find(this.mockData, function (item) {
	                return item.id === id;
	            }));
	        }
	        else {
	            promise = this.$http.get(this.getItemEndpoint(id))
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _this.transform(data);
	            }
	            if (_this.logRequests) {
	                _this.log('getDetail', data);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.create = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            var nextId = _.max(this.mockData, 'id').id + 1;
	            domainObject.id = nextId;
	            this.mockData.push(domainObject);
	            promise = this.$q.when(domainObject);
	        }
	        else {
	            promise = this.$http.post(this.endpoint, JSON.stringify(domainObject))
	                .then(function (result) {
	                return result.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.logRequests) {
	                _this.log('create', data);
	            }
	            return data;
	        });
	    };
	    BaseDataService.prototype.update = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            var oldObject = _.find(this.mockData, _.find(this.mockData, function (item) {
	                return item.id === domainObject.id;
	            }));
	            oldObject = _.assign(oldObject, domainObject);
	            promise = this.$q.when();
	        }
	        else {
	            promise = this.$http.put(this.getItemEndpoint(domainObject.id), domainObject).then(function () { return null; });
	        }
	        return promise.then(function () {
	            if (_this.logRequests) {
	                _this.log('update', domainObject);
	            }
	        });
	    };
	    BaseDataService.prototype.delete = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            this.array.remove(this.mockData, domainObject);
	            promise = this.$q.when();
	        }
	        else {
	            promise = this.$http.delete(this.getItemEndpoint(domainObject.id)).then(function () { return null; });
	        }
	        return promise.then(function () {
	            if (_this.logRequests) {
	                _this.log('update', domainObject);
	            }
	        });
	    };
	    BaseDataService.prototype.log = function (requestName, data) {
	        var mockString = this.useMock ? 'Mocked ' : '';
	        var endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
	        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
	        console.log(data);
	    };
	    return BaseDataService;
	})();
	exports.BaseDataService = BaseDataService;
	baseDataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
	function baseDataServiceFactory($http, $q, array) {
	    return {
	        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
	            return new BaseDataService($http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	        },
	    };
	}
	exports.baseDataServiceFactory = baseDataServiceFactory;
	angular.module(exports.moduleName, [array_service_1.moduleName])
	    .factory(exports.factoryName, baseDataServiceFactory);
	//# sourceMappingURL=baseData.service.js.map

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseData_service_1 = __webpack_require__(17);
	var BaseParentDataService = (function (_super) {
	    __extends(BaseParentDataService, _super);
	    function BaseParentDataService($http, $q, array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, array, endpoint, mockData, transform, useMock, logRequests);
	        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
	    }
	    BaseParentDataService.prototype.childContracts = function (id) {
	        return this.resourceDictionaryBuilder(this.endpoint + '/' + id);
	    };
	    return BaseParentDataService;
	})(baseData_service_1.BaseDataService);
	exports.BaseParentDataService = BaseParentDataService;
	//# sourceMappingURL=baseParentData.service.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	exports.moduleName = 'rl.utilities.services.baseSingletonDataService';
	exports.factoryName = 'baseSingletonDataService';
	var BaseSingletonDataService = (function () {
	    function BaseSingletonDataService($http, $q, _endpoint, mockData, transform, useMock, logRequests) {
	        this.$http = $http;
	        this.$q = $q;
	        this._endpoint = _endpoint;
	        this.mockData = mockData;
	        this.transform = transform;
	        this.useMock = useMock;
	        this.logRequests = logRequests;
	    }
	    Object.defineProperty(BaseSingletonDataService.prototype, "endpoint", {
	        get: function () {
	            return this._endpoint;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseSingletonDataService.prototype.get = function () {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            promise = this.$q.when(this.mockData);
	        }
	        else {
	            promise = this.$http.get(this.endpoint)
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _this.transform(data);
	            }
	            if (_this.logRequests) {
	                _this.log('get', data);
	            }
	            return data;
	        });
	    };
	    BaseSingletonDataService.prototype.update = function (domainObject) {
	        var _this = this;
	        var promise;
	        if (this.useMock) {
	            this.mockData = _.assign(this.mockData, domainObject);
	            promise = this.$q.when();
	        }
	        else {
	            promise = this.$http.put(this.endpoint, domainObject).then(function () { return null; });
	        }
	        return promise.then(function () {
	            if (_this.logRequests) {
	                _this.log('update', domainObject);
	            }
	        });
	    };
	    BaseSingletonDataService.prototype.log = function (requestName, data) {
	        var mockString = this.useMock ? 'Mocked ' : '';
	        var endpointString = this.endpoint == null ? 'unspecified' : this.endpoint;
	        console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
	        console.log(data);
	    };
	    return BaseSingletonDataService;
	})();
	exports.BaseSingletonDataService = BaseSingletonDataService;
	baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
	function baseSingletonDataServiceFactory($http, $q) {
	    return {
	        getInstance: function (endpoint, mockData, transform, useMock, logRequests) {
	            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock, logRequests);
	        },
	    };
	}
	exports.baseSingletonDataServiceFactory = baseSingletonDataServiceFactory;
	angular.module(exports.moduleName, [])
	    .factory(exports.factoryName, baseSingletonDataServiceFactory);
	//# sourceMappingURL=baseSingletonData.service.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseSingletonData_service_1 = __webpack_require__(19);
	var BaseParentSingletonDataService = (function (_super) {
	    __extends(BaseParentSingletonDataService, _super);
	    function BaseParentSingletonDataService($http, $q, endpoint, mockData, resourceDictionaryBuilder, transform, useMock, logRequests) {
	        _super.call(this, $http, $q, endpoint, mockData, transform, useMock, logRequests);
	        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
	    }
	    BaseParentSingletonDataService.prototype.childContracts = function () {
	        return this.resourceDictionaryBuilder(this.endpoint);
	    };
	    return BaseParentSingletonDataService;
	})(baseSingletonData_service_1.BaseSingletonDataService);
	exports.BaseParentSingletonDataService = BaseParentSingletonDataService;
	//# sourceMappingURL=baseParentSingletonData.service.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	// /// <reference path='../../../../typings/sinon/sinon.d.ts' />
	'use strict';
	var ContractLibrary = (function () {
	    function ContractLibrary(builder) {
	        var services = builder.getLibraryServices();
	        this.$q = services.$q;
	        this.$rootScope = services.$rootScope;
	    }
	    ContractLibrary.prototype.flush = function () {
	        this.$rootScope.$digest();
	    };
	    ContractLibrary.prototype.mockGet = function (resource, data) {
	        return this.baseMockGet(resource, 'get', data);
	    };
	    ContractLibrary.prototype.mockGetList = function (resource, data) {
	        return this.baseMockGet(resource, 'getList', data);
	    };
	    ContractLibrary.prototype.mockGetDetail = function (resource, data) {
	        return this.baseMockGet(resource, 'getDetail', data);
	    };
	    ContractLibrary.prototype.baseMockGet = function (resource, actionName, data) {
	        var _this = this;
	        var sinonInstance = sinon || { spy: function (func) { return func; } };
	        var func = sinonInstance.spy(function () {
	            return _this.$q.when(data);
	        });
	        resource[actionName] = func;
	        return func;
	    };
	    return ContractLibrary;
	})();
	exports.ContractLibrary = ContractLibrary;
	//# sourceMappingURL=contractLibrary.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(23);
	var time_service_1 = __webpack_require__(25);
	var date_service_1 = __webpack_require__(26);
	var dateTimeFormatStrings_1 = __webpack_require__(28);
	__export(__webpack_require__(26));
	__export(__webpack_require__(28));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);
	//# sourceMappingURL=date.module.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(24);
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
/* 24 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var time_service_1 = __webpack_require__(25);
	var moment_module_1 = __webpack_require__(23);
	var compareResult_1 = __webpack_require__(27);
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(30);
	var fileSize_service_1 = __webpack_require__(31);
	var fileSizeFilter_1 = __webpack_require__(32);
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);
	//# sourceMappingURL=fileSize.module.js.map

/***/ },
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(30);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(31);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(34);
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var uuid = __webpack_require__(36);
	exports.moduleName = 'rl.utilities.services.guid';
	exports.serviceName = 'guidService';
	var GuidService = (function () {
	    function GuidService() {
	    }
	    GuidService.prototype.time = function () {
	        return uuid.v1();
	    };
	    GuidService.prototype.random = function () {
	        return uuid.v4();
	    };
	    return GuidService;
	})();
	angular.module(exports.moduleName, [])
	    .service(exports.serviceName, GuidService);
	//# sourceMappingURL=guid.service.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(37);
	
	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}
	
	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;
	
	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });
	
	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }
	
	  return buf;
	}
	
	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}
	
	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html
	
	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();
	
	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];
	
	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;
	
	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];
	
	  options = options || {};
	
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
	
	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
	
	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
	
	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }
	
	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }
	
	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }
	
	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;
	
	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;
	
	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;
	
	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;
	
	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;
	
	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;
	
	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;
	
	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }
	
	  return buf ? buf : unparse(b);
	}
	
	// **`v4()` - Generate random UUID**
	
	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;
	
	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};
	
	  var rnds = options.random || (options.rng || _rng)();
	
	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }
	
	  return buf || unparse(rnds);
	}
	
	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;
	
	module.exports = uuid;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;
	
	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}
	
	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }
	
	    return _rnds;
	  };
	}
	
	module.exports = rng;
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(39);
	__export(__webpack_require__(40));
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
/* 39 */
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
/* 40 */
/***/ function(module, exports) {

	'use strict';
	//# sourceMappingURL=notificationTypes.js.map

/***/ },
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(46);
	exports.mock = mock;
	__export(__webpack_require__(47));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);
	//# sourceMappingURL=test.module.js.map

/***/ },
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var notification_service_1 = __webpack_require__(38);
	var validator_1 = __webpack_require__(49);
	var compositeValidator_1 = __webpack_require__(50);
	exports.moduleName = 'rl.utilities.services.validation';
	exports.serviceName = 'validationFactory';
	var ValidationService = (function () {
	    function ValidationService(notification) {
	        this.notification = notification;
	    }
	    ValidationService.prototype.buildNotificationWarningValidator = function () {
	        var _this = this;
	        return new validator_1.Validator(function (error) {
	            _this.notification.warning(error);
	        });
	    };
	    ValidationService.prototype.buildNotificationErrorValidator = function () {
	        var _this = this;
	        return new validator_1.Validator(function (error) {
	            _this.notification.error(error);
	        });
	    };
	    ValidationService.prototype.buildCustomValidator = function (showError) {
	        return new validator_1.Validator(showError);
	    };
	    ValidationService.prototype.buildCompositeNotificationWarningValidator = function () {
	        var _this = this;
	        return new compositeValidator_1.CompositeValidator(function (error) {
	            _this.notification.warning(error);
	        });
	    };
	    ValidationService.prototype.buildCompositeNotificationErrorValidator = function () {
	        var _this = this;
	        return new compositeValidator_1.CompositeValidator(function (error) {
	            _this.notification.error(error);
	        });
	    };
	    ValidationService.prototype.buildCompositeCustomValidator = function (showError) {
	        return new compositeValidator_1.CompositeValidator(showError);
	    };
	    ValidationService.$inject = [notification_service_1.serviceName];
	    return ValidationService;
	})();
	exports.ValidationService = ValidationService;
	angular.module(exports.moduleName, [notification_service_1.moduleName])
	    .service(exports.serviceName, ValidationService);
	//# sourceMappingURL=validation.service.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var Validator = (function () {
	    function Validator(showError) {
	        this.showError = showError;
	        this.validationHandlers = {};
	        this.nextKey = 0;
	    }
	    Validator.prototype.validate = function () {
	        var _this = this;
	        var isValid = true;
	        _.each(this.validationHandlers, function (handler) {
	            var isActive = _this.isActive(handler);
	            if (isActive && !handler.validate()) {
	                isValid = false;
	                var error = _this.errorMessage(handler);
	                _this.showError(error);
	                return false;
	            }
	        });
	        return isValid;
	    };
	    Validator.prototype.getErrorCount = function () {
	        var _this = this;
	        return _.reduce(this.validationHandlers, function (count, handler) {
	            var isActive = _this.isActive(handler);
	            if (isActive && !handler.validate()) {
	                count++;
	            }
	            return count;
	        }, 0);
	    };
	    Validator.prototype.registerValidationHandler = function (handler) {
	        var _this = this;
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.validationHandlers[currentKey] = handler;
	        return function () {
	            _this.unregister(currentKey);
	        };
	    };
	    Validator.prototype.unregister = function (key) {
	        delete this.validationHandlers[key];
	    };
	    Validator.prototype.isActive = function (handler) {
	        return (_.isFunction(handler.isActive) && handler.isActive())
	            || handler.isActive == null
	            || handler.isActive === true;
	    };
	    Validator.prototype.errorMessage = function (handler) {
	        return _.isFunction(handler.errorMessage)
	            ? handler.errorMessage()
	            : handler.errorMessage;
	    };
	    return Validator;
	})();
	exports.Validator = Validator;
	//# sourceMappingURL=validator.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(7);
	var validator_1 = __webpack_require__(49);
	var CompositeValidator = (function () {
	    function CompositeValidator(showError) {
	        this.showError = showError;
	        this.childValidators = {};
	        this.nextKey = 0;
	    }
	    CompositeValidator.prototype.validate = function () {
	        var isValid = true;
	        _.each(this.childValidators, function (handler) {
	            if (!handler.validate()) {
	                isValid = false;
	                return false;
	            }
	        });
	        return isValid;
	    };
	    CompositeValidator.prototype.getErrorCount = function () {
	        return _.reduce(this.childValidators, function (count, handler) {
	            return count += handler.getErrorCount();
	        }, 0);
	    };
	    CompositeValidator.prototype.buildChildValidator = function () {
	        var _this = this;
	        var validator = new validator_1.Validator(function (error) {
	            _this.showError(error);
	        });
	        var currentKey = this.nextKey;
	        this.nextKey++;
	        this.childValidators[currentKey] = validator;
	        validator.key = currentKey;
	        return validator;
	    };
	    CompositeValidator.prototype.unregisterChild = function (validator) {
	        delete this.childValidators[validator.key];
	    };
	    return CompositeValidator;
	})();
	exports.CompositeValidator = CompositeValidator;
	//# sourceMappingURL=compositeValidator.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(27));
	//# sourceMappingURL=types.module.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzA1ODU1YWQzN2M4NmQ3NmJlMGEiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZ3VpZC9ndWlkLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi91dWlkL3V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi91dWlkL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25UeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9tb2NrLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vY29tcG9zaXRlVmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGFBQVksQ0FBQztBQUViLEtBQVksT0FBTyx1QkFBTSxDQUFTLENBQUM7QUFFbkMsS0FBWSxTQUFTLHVCQUFNLENBQThCLENBQUM7QUFLakQsa0JBQVM7QUFKbEIsS0FBWSxPQUFPLHVCQUFNLENBQTBCLENBQUM7QUFJaEMsZ0JBQU87QUFIM0IsS0FBWSxRQUFRLHVCQUFNLEVBQTRCLENBQUM7QUFHMUIsaUJBQVE7QUFGckMsS0FBWSxLQUFLLHVCQUFNLEVBQXNCLENBQUM7QUFFUCxjQUFLO0FBRWpDLGFBQUksR0FBVyxjQUFjLENBQUM7QUFFekMsUUFBTyxDQUFDLE1BQU0sQ0FBQyxZQUFJLEVBQUU7S0FDcEIsU0FBUyxDQUFDLElBQUk7S0FDZCxPQUFPLENBQUMsSUFBSTtLQUNaLFFBQVEsQ0FBQyxVQUFVO0VBQ25CLENBQUMsQ0FBQzs7Ozs7OztBQ2pCSCxjQUFhLGtDQUFrQyxFQUFFLEk7Ozs7OztBQ0FqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEOzs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsMkM7Ozs7OztBQ2pHQSxjQUFhLDRCQUE0QixFQUFFLEk7Ozs7OztBQ0EzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFpRCx3QkFBd0IsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCxrQkFBa0IsRUFBRTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsMEM7Ozs7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7OztBQzFCQTtBQUNBLG1DOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsaUNBQWlDLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLG1EOzs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsNEM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUQ7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx3RDs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFxRCxpQkFBaUI7QUFDdEU7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2R0FBNEcsYUFBYSxFQUFFO0FBQzNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0dBQWlHLGFBQWEsRUFBRTtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDdEpBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsbUQ7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQW9GLGFBQWEsRUFBRTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRDs7Ozs7O0FDaEZBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsNEQ7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyx1QkFBdUIsYUFBYSxFQUFFO0FBQzVFO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSw0Qzs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7OztBQ3RCQSxjQUFhLGlDQUFpQyxFQUFFLEk7Ozs7OztBQ0FoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHlDOzs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxxQ0FBcUMsV0FBVyxFQUFFLEVBQUU7QUFDakUsY0FBYSwwQ0FBMEMseUNBQXlDLEVBQUUsRUFBRTtBQUNwRyxjQUFhLG1DQUFtQyxXQUFXLEVBQUUsRUFBRTtBQUMvRCxjQUFhLG1DQUFtQyxXQUFXLEVBQUUsRUFBRTtBQUMvRCxjQUFhLGlDQUFpQyxXQUFXLEVBQUUsRUFBRTtBQUM3RCxjQUFhLGtDQUFrQyxXQUFXLEVBQUUsRUFBRTtBQUM5RCxjQUFhLGtDQUFrQyxXQUFXLEVBQUUsRUFBRTtBQUM5RCxjQUFhLG9DQUFvQyxXQUFXLEVBQUUsRUFBRTtBQUNoRSxjQUFhLHVDQUF1QyxXQUFXLEVBQUUsRUFBRTtBQUNuRSxjQUFhLHFDQUFxQyxXQUFXLEVBQUUsRUFBRTtBQUNqRSxjQUFhLHNDQUFzQyxXQUFXLEVBQUUsRUFBRTtBQUNsRSxjQUFhLHNDQUFzQyxXQUFXLEVBQUUsRUFBRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLHlDOzs7Ozs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0RBQXNEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0Q7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Qzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0JBQW9CO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDJDOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQseURBQXlELEVBQUU7QUFDOUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RDs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLCtEQUE4RCxnQkFBZ0I7QUFDOUUsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EseUM7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBb0MsRUFBRTtBQUN0QyxtQkFBa0I7QUFDbEI7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW1DO0FBQ25DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDckxBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLHlDOzs7Ozs7QUN2QkE7QUFDQSw4Qzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDOzs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsbURBQWtELHNDQUFzQyxFQUFFO0FBQzFGLDBDQUF5Qyx5QkFBeUIsRUFBRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx3RDs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDRDOzs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEOzs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsaUM7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSwyQzs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsK0M7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxzQzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLCtDOzs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDIiwiZmlsZSI6InV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzA1ODU1YWQzN2M4NmQ3NmJlMGFcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYmVoYXZpb3JzIGZyb20gJy4vYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9maWx0ZXJzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMvc2VydmljZXMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi90eXBlcy90eXBlcy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHsgYmVoYXZpb3JzLCBmaWx0ZXJzLCBzZXJ2aWNlcywgdHlwZXMgfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0YmVoYXZpb3JzLm5hbWUsXHJcblx0ZmlsdGVycy5uYW1lLFxyXG5cdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS91dGlsaXRpZXMudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImFuZ3VsYXJcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBzdG9wRXZlbnRQcm9wb2dhdGlvbiA9IHJlcXVpcmUoJy4vc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24nKTtcclxuZXhwb3J0cy5zdG9wRXZlbnRQcm9wb2dhdGlvbiA9IHN0b3BFdmVudFByb3BvZ2F0aW9uO1xyXG5leHBvcnRzLm5hbWUgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubmFtZSwgW1xyXG4gICAgc3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJlaGF2aW9ycy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcbmV4cG9ydHMuZGlyZWN0aXZlTmFtZSA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZGlyZWN0aXZlKGV4cG9ydHMuZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9wRXZlbnRQcm9wYWdhdGlvbi5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIGlzRW1wdHkgPSByZXF1aXJlKCcuL2lzRW1wdHkvaXNFbXB0eScpO1xyXG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xyXG52YXIgdHJ1bmNhdGUgPSByZXF1aXJlKCcuL3RydW5jYXRlL3RydW5jYXRlJyk7XHJcbmV4cG9ydHMudHJ1bmNhdGUgPSB0cnVuY2F0ZTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWx0ZXInKSk7XHJcbmV4cG9ydHMubmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubmFtZSwgW1xyXG4gICAgaXNFbXB0eS5tb2R1bGVOYW1lLFxyXG4gICAgdHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlcnMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBvYmplY3Rfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdpc0VtcHR5JztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gZXhwb3J0cy5zZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5pc0VtcHR5LiRpbmplY3QgPSBbb2JqZWN0X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB0cnVlV2hlbkVtcHR5KSB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcbiAgICAgICAgaWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhaXNFbXB0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRW1wdHk7XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW29iamVjdF9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmlsdGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIGlzRW1wdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0VtcHR5LmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYXJyYXlfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnb2JqZWN0VXRpbGl0eSc7XHJcbnZhciBPYmplY3RVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9iamVjdFV0aWxpdHkoYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5pc051bGxPckVtcHR5ID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QgPT09ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5pc051bGxPcldoaXRlc3BhY2UgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG4gICAgICAgICAgICBvYmplY3QgPSBvYmplY3QudHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUuYXJlRXF1YWwgPSBmdW5jdGlvbiAob2JqMSwgb2JqMikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR5cGUxID0gdHlwZW9mIG9iajE7XHJcbiAgICAgICAgdmFyIHR5cGUyID0gdHlwZW9mIG9iajI7XHJcbiAgICAgICAgaWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgLy9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG4gICAgICAgICAgICB2YXIga2V5czIgPSBfLmtleXMob2JqMik7XHJcbiAgICAgICAgICAgIF8uZm9ySW4ob2JqMSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFycmF5LnJlbW92ZShrZXlzMiwga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgIGlmIChfLmFueShrZXlzMikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcbiAgICAgICAgICAgIHJldHVybiBvYmoxID09PSBvYmoyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gb2JqZWN0ICsgJyc7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUudmFsdWVPckRlZmF1bHQgPSBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkuJGluamVjdCA9IFthcnJheV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2FycmF5X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYmplY3Quc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiX1wiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiX1wiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnYXJyYXlVdGlsaXR5JztcclxudmFyIEFycmF5VXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcnJheVV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLmZpbmRJbmRleE9mID0gZnVuY3Rpb24gKGFycmF5LCBwcmVkaWNhdGUpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0SW5kZXg7XHJcbiAgICAgICAgXy5lYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChhcnJheSwgaXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleDtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChhcnJheSwgb2xkSXRlbSwgbmV3SXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS5zdW0gPSBmdW5jdGlvbiAoYXJyYXksIHRyYW5zZm9ybSkge1xyXG4gICAgICAgIHZhciBsaXN0O1xyXG4gICAgICAgIGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsaXN0ID0gXy5tYXAoYXJyYXksIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdCA9IGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXy5yZWR1Y2UobGlzdCwgZnVuY3Rpb24gKHN1bSwgbnVtKSB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUudG9EaWN0aW9uYXJ5ID0gZnVuY3Rpb24gKGFycmF5LCBrZXlTZWxlY3Rvcikge1xyXG4gICAgICAgIC8vIG5lZWRzIHRvIGJlIHNlZWRlZCB3aXRoIGFuIG9iamVjdCBvciBpdCB3aWxsIGJlIHZpZXdlZCBhcyBhbiBhcnJheSB3aXRoIG5vIGl0ZW1zXHJcbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKGFycmF5LCBmdW5jdGlvbiAoZGljdGlvbmFyeSwgaXRlbSkge1xyXG4gICAgICAgICAgICBkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgICAgICBpZiAoYXJyYXkgIT0gbnVsbCAmJiBhcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5VXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5LnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG52YXIgb2JqZWN0X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3RydW5jYXRlJztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gZXhwb3J0cy5zZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG50cnVuY2F0ZS4kaW5qZWN0ID0gW29iamVjdF9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB0cnVuY2F0ZVRvLCBpbmNsdWRlRWxsaXBzZXMpIHtcclxuICAgICAgICBpbmNsdWRlRWxsaXBzZXMgPSBpbmNsdWRlRWxsaXBzZXMgPT0gbnVsbCA/IGZhbHNlIDogaW5jbHVkZUVsbGlwc2VzO1xyXG4gICAgICAgIHZhciBvdXQgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKG91dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG4gICAgICAgICAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXQgKz0gJy4uLic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbb2JqZWN0X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5maWx0ZXIoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10cnVuY2F0ZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2ZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBhcnJheSA9IHJlcXVpcmUoJy4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG5leHBvcnRzLmFycmF5ID0gYXJyYXk7XHJcbnZhciBhdXRvc2F2ZSA9IHJlcXVpcmUoJy4vYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZScpO1xyXG5leHBvcnRzLmF1dG9zYXZlID0gYXV0b3NhdmU7XHJcbnZhciBhdXRvc2F2ZUFjdGlvbiA9IHJlcXVpcmUoJy4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZScpO1xyXG5leHBvcnRzLmF1dG9zYXZlQWN0aW9uID0gYXV0b3NhdmVBY3Rpb247XHJcbnZhciBib29sZWFuID0gcmVxdWlyZSgnLi9ib29sZWFuL2Jvb2xlYW4uc2VydmljZScpO1xyXG5leHBvcnRzLmJvb2xlYW4gPSBib29sZWFuO1xyXG52YXIgZGF0YUNvbnRyYWN0cyA9IHJlcXVpcmUoJy4vZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZScpO1xyXG5leHBvcnRzLmRhdGFDb250cmFjdHMgPSBkYXRhQ29udHJhY3RzO1xyXG52YXIgZGF0ZSA9IHJlcXVpcmUoJy4vZGF0ZS9kYXRlLm1vZHVsZScpO1xyXG5leHBvcnRzLmRhdGUgPSBkYXRlO1xyXG52YXIgZmlsZVNpemUgPSByZXF1aXJlKCcuL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZScpO1xyXG5leHBvcnRzLmZpbGVTaXplID0gZmlsZVNpemU7XHJcbnZhciBnZW5lcmljU2VhcmNoRmlsdGVyID0gcmVxdWlyZSgnLi9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZScpO1xyXG5leHBvcnRzLmdlbmVyaWNTZWFyY2hGaWx0ZXIgPSBnZW5lcmljU2VhcmNoRmlsdGVyO1xyXG52YXIgZ3VpZCA9IHJlcXVpcmUoJy4vZ3VpZC9ndWlkLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5ndWlkID0gZ3VpZDtcclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJy4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxuZXhwb3J0cy5tb21lbnQgPSBtb21lbnQ7XHJcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCcuL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcclxudmFyIG51bWJlclNlcnZpY2UgPSByZXF1aXJlKCcuL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG5leHBvcnRzLm51bWJlciA9IG51bWJlclNlcnZpY2U7XHJcbnZhciBvYmplY3RTZXJ2aWNlID0gcmVxdWlyZSgnLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5vYmplY3QgPSBvYmplY3RTZXJ2aWNlO1xyXG52YXIgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoJy4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcclxudmFyIHBhcmVudENoaWxkQmVoYXZpb3IgPSByZXF1aXJlKCcuL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMucGFyZW50Q2hpbGRCZWhhdmlvciA9IHBhcmVudENoaWxkQmVoYXZpb3I7XHJcbnZhciBwcm9taXNlID0gcmVxdWlyZSgnLi9wcm9taXNlL3Byb21pc2Uuc2VydmljZScpO1xyXG5leHBvcnRzLnByb21pc2UgPSBwcm9taXNlO1xyXG52YXIgc3RyaW5nU2VydmljZSA9IHJlcXVpcmUoJy4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nU2VydmljZTtcclxudmFyIHN5bmNocm9uaXplZFJlcXVlc3RzID0gcmVxdWlyZSgnLi9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuc3luY2hyb25pemVkUmVxdWVzdHMgPSBzeW5jaHJvbml6ZWRSZXF1ZXN0cztcclxudmFyIHRlc3QgPSByZXF1aXJlKCcuL3Rlc3QvdGVzdC5tb2R1bGUnKTtcclxuZXhwb3J0cy50ZXN0ID0gdGVzdDtcclxudmFyIHRpbWUgPSByZXF1aXJlKCcuL3RpbWUvdGltZS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMudGltZSA9IHRpbWU7XHJcbnZhciB2YWxpZGF0aW9uID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXHJcbiAgICBhcnJheS5tb2R1bGVOYW1lLFxyXG4gICAgYXV0b3NhdmUubW9kdWxlTmFtZSxcclxuICAgIGF1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWUsXHJcbiAgICBib29sZWFuLm1vZHVsZU5hbWUsXHJcbiAgICBkYXRhQ29udHJhY3RzLm1vZHVsZU5hbWUsXHJcbiAgICBkYXRlLm1vZHVsZU5hbWUsXHJcbiAgICBmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG4gICAgZ2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG4gICAgZ3VpZC5tb2R1bGVOYW1lLFxyXG4gICAgbW9tZW50Lm1vZHVsZU5hbWUsXHJcbiAgICBub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuICAgIG51bWJlclNlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIG9iamVjdFNlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuICAgIHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuICAgIHByb21pc2UubW9kdWxlTmFtZSxcclxuICAgIHN0cmluZ1NlcnZpY2UubW9kdWxlTmFtZSxcclxuICAgIHN5bmNocm9uaXplZFJlcXVlc3RzLm1vZHVsZU5hbWUsXHJcbiAgICB0aW1lLm1vZHVsZU5hbWUsXHJcbiAgICB0ZXN0Lm1vZHVsZU5hbWUsXHJcbiAgICB2YWxpZGF0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlcy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGF1dG9zYXZlQWN0aW9uX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnYXV0b3NhdmVGYWN0b3J5JztcclxudmFyIEF1dG9zYXZlU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBdXRvc2F2ZVNlcnZpY2UoJHJvb3RTY29wZSwgJHRpbWVvdXQsIGF1dG9zYXZlU2VydmljZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmVTZXJ2aWNlID0gYXV0b3NhdmVTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuZGVib3VuY2VEdXJhdGlvbiA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5hdXRvc2F2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90aGlzLmNvbnRlbnRGb3JtLiRwcmlzdGluZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmhhc1ZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWQgPSBfdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IF90aGlzLnNhdmUuYXBwbHkoX3RoaXMsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKHByb21pc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXV0b3NhdmVTZXJ2aWNlLnRyaWdnZXIocHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvbnRlbnRGb3JtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvbnRlbnRGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFzVmFsaWRhdG9yID0gb3B0aW9ucy52YWxpZGF0ZSAhPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29udGVudEZvcm0gPSBvcHRpb25zLmNvbnRlbnRGb3JtIHx8IHRoaXMubnVsbEZvcm0oKTtcclxuICAgICAgICB0aGlzLnNhdmUgPSBvcHRpb25zLnNhdmU7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IG9wdGlvbnMudmFsaWRhdGU7XHJcbiAgICAgICAgdGhpcy5pbml0Q2hhbmdlTGlzdGVuZXJzKG9wdGlvbnMpO1xyXG4gICAgICAgICRyb290U2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmNvbnRlbnRGb3JtLiRkaXJ0eTsgfSwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZXIoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyQ2hhbmdlTGlzdGVuZXIgPSBfdGhpcy5zZXRDaGFuZ2VMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKF90aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIEF1dG9zYXZlU2VydmljZS5wcm90b3R5cGUuc2V0VGltZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnRpbWVyID0gdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmNsZWFyQ2hhbmdlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgX3RoaXMuYXV0b3NhdmUoKTtcclxuICAgICAgICB9LCB0aGlzLmRlYm91bmNlRHVyYXRpb24pO1xyXG4gICAgfTtcclxuICAgIEF1dG9zYXZlU2VydmljZS5wcm90b3R5cGUubnVsbEZvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJHByaXN0aW5lOiBmYWxzZSxcclxuICAgICAgICAgICAgJGRpcnR5OiB0cnVlLFxyXG4gICAgICAgICAgICAkc2V0UHJpc3RpbmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEF1dG9zYXZlU2VydmljZS5wcm90b3R5cGUuaW5pdENoYW5nZUxpc3RlbmVycyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGFuZ2VMaXN0ZW5lciA9IG9wdGlvbnMuc2V0Q2hhbmdlTGlzdGVuZXIgfHwgdGhpcy5udWxsU2V0TGlzdGVuZXI7XHJcbiAgICAgICAgdGhpcy5jbGVhckNoYW5nZUxpc3RlbmVyID0gdGhpcy5udWxsQ2xlYXJMaXN0ZW5lcjtcclxuICAgIH07XHJcbiAgICBBdXRvc2F2ZVNlcnZpY2UucHJvdG90eXBlLm51bGxTZXRMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gY2hhbmdlIGxpc3RlbmVyIGF2YWlsYWJsZScpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm51bGxDbGVhckxpc3RlbmVyO1xyXG4gICAgfTtcclxuICAgIEF1dG9zYXZlU2VydmljZS5wcm90b3R5cGUubnVsbENsZWFyTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGNoYW5nZSBsaXN0ZW5lciByZWdpc3RlcicpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBdXRvc2F2ZVNlcnZpY2U7XHJcbn0pKCk7XHJcbmF1dG9zYXZlU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckdGltZW91dCcsIGF1dG9zYXZlQWN0aW9uX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoJHJvb3RTY29wZSwgJHRpbWVvdXQsIGF1dG9zYXZlU2VydmljZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBdXRvc2F2ZVNlcnZpY2UoJHJvb3RTY29wZSwgJHRpbWVvdXQsIGF1dG9zYXZlU2VydmljZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFthdXRvc2F2ZUFjdGlvbl9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0b3NhdmUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2F1dG9zYXZlQWN0aW9uJztcclxudmFyIEF1dG9zYXZlQWN0aW9uU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBdXRvc2F2ZUFjdGlvblNlcnZpY2UoJHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uID0gMTAwMDtcclxuICAgICAgICB0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmF1dG9zYXZlRmFpbGVkID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlc29sdmVBdXRvc2F2ZSA9IGZ1bmN0aW9uIChkYXRhLCBzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgX3RoaXMuX3N1Y2Nlc3NmdWwgPSBzdWNjZXNzO1xyXG4gICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgX3RoaXMuY29tcGxldGVNZXNzYWdlRHVyYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUsIFwic2F2aW5nXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NhdmluZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBdXRvc2F2ZUFjdGlvblNlcnZpY2UucHJvdG90eXBlLCBcImNvbXBsZXRlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUsIFwic3VjY2Vzc2Z1bFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWNjZXNzZnVsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgICAgICB0aGlzLl9zYXZpbmcgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmF1dG9zYXZlRmFpbGVkKTtcclxuICAgIH07XHJcbiAgICBBdXRvc2F2ZUFjdGlvblNlcnZpY2UuJGluamVjdCA9IFsnJHRpbWVvdXQnXTtcclxuICAgIHJldHVybiBBdXRvc2F2ZUFjdGlvblNlcnZpY2U7XHJcbn0pKCk7XHJcbm5nLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0b3NhdmVBY3Rpb24uc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdib29sZWFuVXRpbGl0eSc7XHJcbnZhciBCb29sZWFuVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCb29sZWFuVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIEJvb2xlYW5VdGlsaXR5LnByb3RvdHlwZS50b0Jvb2wgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuICEhb2JqZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCb29sZWFuVXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vbGVhbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnKTtcclxudmFyIGJhc2VEYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxudmFyIGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRhQ29udHJhY3RzJztcclxuX19leHBvcnQocmVxdWlyZSgnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2NvbnRyYWN0TGlicmFyeScpKTtcclxudmFyIGJhc2VEYXRhX3NlcnZpY2VfMiA9IHJlcXVpcmUoJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5CYXNlRGF0YVNlcnZpY2UgPSBiYXNlRGF0YV9zZXJ2aWNlXzIuQmFzZURhdGFTZXJ2aWNlO1xyXG5leHBvcnRzLmJhc2VEYXRhU2VydmljZUZhY3RvcnlOYW1lID0gYmFzZURhdGFfc2VydmljZV8yLmZhY3RvcnlOYW1lO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJykpO1xyXG52YXIgYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8yID0gcmVxdWlyZSgnLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG5leHBvcnRzLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSA9IGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMi5CYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U7XHJcbmV4cG9ydHMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgPSBiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzIuZmFjdG9yeU5hbWU7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnKSk7XHJcbnZhciBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMiA9IHJlcXVpcmUoJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5idWlsZGVyU2VydmljZU5hbWUgPSBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMi5zZXJ2aWNlTmFtZTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXHJcbiAgICBiYXNlRGF0YV9zZXJ2aWNlXzEubW9kdWxlTmFtZSxcclxuICAgIGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMS5tb2R1bGVOYW1lLFxyXG4gICAgYmFzZVJlc291cmNlQnVpbGRlcl9zZXJ2aWNlXzEubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFDb250cmFjdHMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYXJyYXlfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG52YXIgYmFzZURhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxudmFyIGJhc2VQYXJlbnREYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJyk7XHJcbnZhciBiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG52YXIgYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlUmVzb3VyY2VCdWlsZGVyJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdiYXNlUmVzb3VyY2VCdWlsZGVyJztcclxudmFyIEJhc2VSZXNvdXJjZUJ1aWxkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQmFzZVJlc291cmNlQnVpbGRlcigkaHR0cCwgJHEsICRyb290U2NvcGUsIGFycmF5KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgIH1cclxuICAgIEJhc2VSZXNvdXJjZUJ1aWxkZXIucHJvdG90eXBlLmdldExpYnJhcnlTZXJ2aWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAkcTogdGhpcy4kcSxcclxuICAgICAgICAgICAgJHJvb3RTY29wZTogdGhpcy4kcm9vdFNjb3BlLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgQmFzZVJlc291cmNlQnVpbGRlci5wcm90b3R5cGUuY3JlYXRlUmVzb3VyY2UgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMudXNlTW9jayA9IG9wdGlvbnMuZW5kcG9pbnQgPT0gbnVsbCA/IHRydWUgOiBvcHRpb25zLnVzZU1vY2s7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBiYXNlRGF0YV9zZXJ2aWNlXzEuQmFzZURhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG4gICAgfTtcclxuICAgIEJhc2VSZXNvdXJjZUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVBhcmVudFJlc291cmNlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLnVzZU1vY2sgPSBvcHRpb25zLmVuZHBvaW50ID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy51c2VNb2NrO1xyXG4gICAgICAgIHJldHVybiBuZXcgYmFzZVBhcmVudERhdGFfc2VydmljZV8xLkJhc2VQYXJlbnREYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIG9wdGlvbnMudHJhbnNmb3JtLCBvcHRpb25zLnVzZU1vY2ssIG9wdGlvbnMubG9nUmVxdWVzdHMpO1xyXG4gICAgfTtcclxuICAgIEJhc2VSZXNvdXJjZUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVNpbmdsZXRvblJlc291cmNlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLnVzZU1vY2sgPSBvcHRpb25zLmVuZHBvaW50ID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy51c2VNb2NrO1xyXG4gICAgICAgIHJldHVybiBuZXcgYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8xLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuICAgIH07XHJcbiAgICBCYXNlUmVzb3VyY2VCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVQYXJlbnRTaW5nbGV0b25SZXNvdXJjZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucy51c2VNb2NrID0gb3B0aW9ucy5lbmRwb2ludCA9PSBudWxsID8gdHJ1ZSA6IG9wdGlvbnMudXNlTW9jaztcclxuICAgICAgICByZXR1cm4gbmV3IGJhc2VQYXJlbnRTaW5nbGV0b25EYXRhX3NlcnZpY2VfMS5CYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuICAgIH07XHJcbiAgICBCYXNlUmVzb3VyY2VCdWlsZGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgJyRyb290U2NvcGUnLCBhcnJheV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIEJhc2VSZXNvdXJjZUJ1aWxkZXI7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZVJlc291cmNlQnVpbGRlciA9IEJhc2VSZXNvdXJjZUJ1aWxkZXI7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2FycmF5X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEJhc2VSZXNvdXJjZUJ1aWxkZXIpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBhcnJheV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZURhdGFTZXJ2aWNlJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdiYXNlRGF0YVNlcnZpY2UnO1xyXG52YXIgQmFzZURhdGFTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJhc2VEYXRhU2VydmljZSgkaHR0cCwgJHEsIGFycmF5LCBfZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgICAgICAgdGhpcy5fZW5kcG9pbnQgPSBfZW5kcG9pbnQ7XHJcbiAgICAgICAgdGhpcy5tb2NrRGF0YSA9IG1vY2tEYXRhO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG4gICAgICAgIHRoaXMudXNlTW9jayA9IHVzZU1vY2s7XHJcbiAgICAgICAgdGhpcy5sb2dSZXF1ZXN0cyA9IGxvZ1JlcXVlc3RzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUsIFwiZW5kcG9pbnRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBCYXNlRGF0YVNlcnZpY2UucHJvdG90eXBlLmdldEl0ZW1FbmRwb2ludCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQudG9TdHJpbmcoKTtcclxuICAgIH07XHJcbiAgICBCYXNlRGF0YVNlcnZpY2UucHJvdG90eXBlLmdldExpc3QgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4odGhpcy5tb2NrRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5nZXQodGhpcy5lbmRwb2ludCwgeyBwYXJhbXM6IHBhcmFtcyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLnRyYW5zZm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gXy5tYXAoZGF0YSwgX3RoaXMudHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZygnZ2V0TGlzdCcsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZ2V0RGV0YWlsID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4oXy5maW5kKHRoaXMubW9ja0RhdGEsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldCh0aGlzLmdldEl0ZW1FbmRwb2ludChpZCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMudHJhbnNmb3JtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBfdGhpcy50cmFuc2Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90aGlzLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2coJ2dldERldGFpbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbk9iamVjdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHByb21pc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9jaykge1xyXG4gICAgICAgICAgICB2YXIgbmV4dElkID0gXy5tYXgodGhpcy5tb2NrRGF0YSwgJ2lkJykuaWQgKyAxO1xyXG4gICAgICAgICAgICBkb21haW5PYmplY3QuaWQgPSBuZXh0SWQ7XHJcbiAgICAgICAgICAgIHRoaXMubW9ja0RhdGEucHVzaChkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wb3N0KHRoaXMuZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRvbWFpbk9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nKCdjcmVhdGUnLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCYXNlRGF0YVNlcnZpY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW5PYmplY3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgdmFyIG9sZE9iamVjdCA9IF8uZmluZCh0aGlzLm1vY2tEYXRhLCBfLmZpbmQodGhpcy5tb2NrRGF0YSwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBkb21haW5PYmplY3QuaWQ7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgb2xkT2JqZWN0ID0gXy5hc3NpZ24ob2xkT2JqZWN0LCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wdXQodGhpcy5nZXRJdGVtRW5kcG9pbnQoZG9tYWluT2JqZWN0LmlkKSwgZG9tYWluT2JqZWN0KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2coJ3VwZGF0ZScsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCYXNlRGF0YVNlcnZpY2UucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChkb21haW5PYmplY3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgdGhpcy5hcnJheS5yZW1vdmUodGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZGVsZXRlKHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZygndXBkYXRlJywgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24gKHJlcXVlc3ROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdmFyIG1vY2tTdHJpbmcgPSB0aGlzLnVzZU1vY2sgPyAnTW9ja2VkICcgOiAnJztcclxuICAgICAgICB2YXIgZW5kcG9pbnRTdHJpbmcgPSB0aGlzLmVuZHBvaW50ID09IG51bGwgPyAndW5zcGVjaWZpZWQnIDogdGhpcy5lbmRwb2ludDtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2NrU3RyaW5nICsgcmVxdWVzdE5hbWUgKyAnIGZvciBlbmRwb2ludCAnICsgZW5kcG9pbnRTdHJpbmcgKyAnOicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlRGF0YVNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZURhdGFTZXJ2aWNlID0gQmFzZURhdGFTZXJ2aWNlO1xyXG5iYXNlRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgYXJyYXlfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cCwgJHEsIGFycmF5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmFzZURhdGFTZXJ2aWNlKCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5iYXNlRGF0YVNlcnZpY2VGYWN0b3J5ID0gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbYXJyYXlfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VEYXRhLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn07XHJcbnZhciBiYXNlRGF0YV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZScpO1xyXG52YXIgQmFzZVBhcmVudERhdGFTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhCYXNlUGFyZW50RGF0YVNlcnZpY2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCYXNlUGFyZW50RGF0YVNlcnZpY2UoJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIgPSByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyO1xyXG4gICAgfVxyXG4gICAgQmFzZVBhcmVudERhdGFTZXJ2aWNlLnByb3RvdHlwZS5jaGlsZENvbnRyYWN0cyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIodGhpcy5lbmRwb2ludCArICcvJyArIGlkKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZVBhcmVudERhdGFTZXJ2aWNlO1xyXG59KShiYXNlRGF0YV9zZXJ2aWNlXzEuQmFzZURhdGFTZXJ2aWNlKTtcclxuZXhwb3J0cy5CYXNlUGFyZW50RGF0YVNlcnZpY2UgPSBCYXNlUGFyZW50RGF0YVNlcnZpY2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VQYXJlbnREYXRhLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UnO1xyXG52YXIgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSgkaHR0cCwgJHEsIF9lbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuX2VuZHBvaW50ID0gX2VuZHBvaW50O1xyXG4gICAgICAgIHRoaXMubW9ja0RhdGEgPSBtb2NrRGF0YTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuICAgICAgICB0aGlzLnVzZU1vY2sgPSB1c2VNb2NrO1xyXG4gICAgICAgIHRoaXMubG9nUmVxdWVzdHMgPSBsb2dSZXF1ZXN0cztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UucHJvdG90eXBlLCBcImVuZHBvaW50XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4odGhpcy5tb2NrRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5nZXQodGhpcy5lbmRwb2ludClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF90aGlzLnRyYW5zZm9ybShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZygnZ2V0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluT2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9ja0RhdGEgPSBfLmFzc2lnbih0aGlzLm1vY2tEYXRhLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5wdXQodGhpcy5lbmRwb2ludCwgZG9tYWluT2JqZWN0KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2coJ3VwZGF0ZScsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uIChyZXF1ZXN0TmFtZSwgZGF0YSkge1xyXG4gICAgICAgIHZhciBtb2NrU3RyaW5nID0gdGhpcy51c2VNb2NrID8gJ01vY2tlZCAnIDogJyc7XHJcbiAgICAgICAgdmFyIGVuZHBvaW50U3RyaW5nID0gdGhpcy5lbmRwb2ludCA9PSBudWxsID8gJ3Vuc3BlY2lmaWVkJyA6IHRoaXMuZW5kcG9pbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cobW9ja1N0cmluZyArIHJlcXVlc3ROYW1lICsgJyBmb3IgZW5kcG9pbnQgJyArIGVuZHBvaW50U3RyaW5nICsgJzonKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSA9IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTtcclxuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcSddO1xyXG5mdW5jdGlvbiBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwLCAkcSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSgkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5ID0gYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG52YXIgYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnKTtcclxudmFyIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlKCRodHRwLCAkcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCByZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA9IHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI7XHJcbiAgICB9XHJcbiAgICBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UucHJvdG90eXBlLmNoaWxkQ29udHJhY3RzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIodGhpcy5lbmRwb2ludCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZTtcclxufSkoYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8xLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSk7XHJcbmV4cG9ydHMuQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlID0gQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbid1c2Ugc3RyaWN0JztcclxudmFyIENvbnRyYWN0TGlicmFyeSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb250cmFjdExpYnJhcnkoYnVpbGRlcikge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IGJ1aWxkZXIuZ2V0TGlicmFyeVNlcnZpY2VzKCk7XHJcbiAgICAgICAgdGhpcy4kcSA9IHNlcnZpY2VzLiRxO1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcbiAgICB9XHJcbiAgICBDb250cmFjdExpYnJhcnkucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICB9O1xyXG4gICAgQ29udHJhY3RMaWJyYXJ5LnByb3RvdHlwZS5tb2NrR2V0ID0gZnVuY3Rpb24gKHJlc291cmNlLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXQnLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICBDb250cmFjdExpYnJhcnkucHJvdG90eXBlLm1vY2tHZXRMaXN0ID0gZnVuY3Rpb24gKHJlc291cmNlLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXRMaXN0JywgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgQ29udHJhY3RMaWJyYXJ5LnByb3RvdHlwZS5tb2NrR2V0RGV0YWlsID0gZnVuY3Rpb24gKHJlc291cmNlLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZU1vY2tHZXQocmVzb3VyY2UsICdnZXREZXRhaWwnLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICBDb250cmFjdExpYnJhcnkucHJvdG90eXBlLmJhc2VNb2NrR2V0ID0gZnVuY3Rpb24gKHJlc291cmNlLCBhY3Rpb25OYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgc2lub25JbnN0YW5jZSA9IHNpbm9uIHx8IHsgc3B5OiBmdW5jdGlvbiAoZnVuYykgeyByZXR1cm4gZnVuYzsgfSB9O1xyXG4gICAgICAgIHZhciBmdW5jID0gc2lub25JbnN0YW5jZS5zcHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuJHEud2hlbihkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNvdXJjZVthY3Rpb25OYW1lXSA9IGZ1bmM7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvbnRyYWN0TGlicmFyeTtcclxufSkoKTtcclxuZXhwb3J0cy5Db250cmFjdExpYnJhcnkgPSBDb250cmFjdExpYnJhcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRyYWN0TGlicmFyeS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9jb250cmFjdExpYnJhcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBtb21lbnRfbW9kdWxlXzEgPSByZXF1aXJlKCcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZScpO1xyXG52YXIgdGltZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi90aW1lL3RpbWUuc2VydmljZScpO1xyXG52YXIgZGF0ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2RhdGUuc2VydmljZScpO1xyXG52YXIgZGF0ZVRpbWVGb3JtYXRTdHJpbmdzXzEgPSByZXF1aXJlKCcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncycpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2RhdGUuc2VydmljZScpKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnKSk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW21vbWVudF9tb2R1bGVfMS5tb2R1bGVOYW1lLCB0aW1lX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGRhdGVfc2VydmljZV8xLnNlcnZpY2VOYW1lLCBkYXRlX3NlcnZpY2VfMS5EYXRlVXRpbGl0eSlcclxuICAgIC52YWx1ZShkYXRlVGltZUZvcm1hdFN0cmluZ3NfMS5kYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkYXRlVGltZUZvcm1hdFN0cmluZ3NfMS5kZWZhdWx0Rm9ybWF0cyk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGUubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbW9tZW50V3JhcHBlcic7XHJcbmZ1bmN0aW9uIG1vbWVudFdyYXBwZXIoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICAvLyBVc2luZyBgYW55YCBpbnN0ZWFkIG9mIE1vbWVudFN0YXRpYyBiZWNhdXNlXHJcbiAgICAvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuICAgIC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuICAgIHZhciBtb21lbnRXcmFwcGVyID0gbW9tZW50OyAvLyBtb21lbnQgbXVzdCBhbHJlYWR5IGJlIGxvYWRlZFxyXG4gICAgLy8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcbiAgICAvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcbiAgICAvLyBUaGlzIGFsc28gcHJldmVudHMgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cclxuICAgIG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gbW9tZW50V3JhcHBlcjtcclxufVxyXG5leHBvcnRzLm1vbWVudFdyYXBwZXIgPSBtb21lbnRXcmFwcGVyO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgbW9tZW50V3JhcHBlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vbWVudC5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIm1vbWVudFwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9tZW50XCJcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICd0aW1lVXRpbGl0eSc7XHJcbnZhciBUaW1lVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUaW1lVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb1NlY29uZHMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XHJcbiAgICB9O1xyXG4gICAgVGltZVV0aWxpdHkucHJvdG90eXBlLm1pbGxpc2Vjb25kc1RvTWludXRlcyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG4gICAgfTtcclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb0hvdXJzID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcbiAgICB9O1xyXG4gICAgVGltZVV0aWxpdHkucHJvdG90eXBlLm1pbGxpc2Vjb25kc1RvRGF5cyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzKSAvIDI0KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGltZVV0aWxpdHk7XHJcbn0pKCk7XHJcbmV4cG9ydHMuVGltZVV0aWxpdHkgPSBUaW1lVXRpbGl0eTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIFRpbWVVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgdGltZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi90aW1lL3RpbWUuc2VydmljZScpO1xyXG52YXIgbW9tZW50X21vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxudmFyIGNvbXBhcmVSZXN1bHRfMSA9IHJlcXVpcmUoJy4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQnKTtcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdkYXRlVXRpbGl0eSc7XHJcbnZhciBEYXRlVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEYXRlVXRpbGl0eShtb21lbnQsIHRpbWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubW9tZW50ID0gbW9tZW50O1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy5iYXNlRm9ybWF0ID0gJ01NLURELVlZWVknO1xyXG4gICAgICAgIHRoaXMubW9udGggPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6IGZ1bmN0aW9uICh5ZWFyKSB7IHJldHVybiBfdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdNYXJjaCcsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0FwcmlsJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnTWF5JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnSnVuZScsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMwOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0p1bHknLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5pc0xlYXBZZWFyID0gZnVuY3Rpb24gKHllYXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldEZ1bGxTdHJpbmcgPSBmdW5jdGlvbiAobW9udGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZ2V0RGF5cyA9IGZ1bmN0aW9uIChtb250aCwgeWVhcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5zdWJ0cmFjdERhdGVzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICBpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgcmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgcmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgcmVzdWx0Lm1vbnRocyA9IGVuZERhdGUuZ2V0TW9udGgoKSAtIHN0YXJ0RGF0ZS5nZXRNb250aCgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQuZGF5cyA8IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm1vbnRocyAtPSAxO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF5cyArPSB0aGlzLmdldERheXMoc3RhcnREYXRlLmdldE1vbnRoKCksIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC55ZWFycyAtPSAxO1xyXG4gICAgICAgICAgICByZXN1bHQubW9udGhzICs9IDEyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5zdWJ0cmFjdERhdGVJbkRheXMgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgZGF0ZUZvcm1hdCkge1xyXG4gICAgICAgIGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhcnREYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgZW5kRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuY29tcGFyZURhdGVzID0gZnVuY3Rpb24gKGRhdGUxLCBkYXRlMiwgZGF0ZUZvcm1hdCkge1xyXG4gICAgICAgIC8vIHN1YnRyYWN0RGF0ZUluRGF5cyBzdWJ0cmFjdHMgdGhlIGZpc3QgZnJvbSB0aGUgc2Vjb25kLCBhc3N1bWluZyBzdGFydCBhbmQgZW5kIGRhdGVzXHJcbiAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSB0aGlzLnN1YnRyYWN0RGF0ZUluRGF5cyhkYXRlMiwgZGF0ZTEsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlUmVzdWx0XzEuZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZGF0ZUluUmFuZ2UgPSBmdW5jdGlvbiAoZGF0ZSwgcmFuZ2VTdGFydCwgcmFuZ2VFbmQpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IGNvbXBhcmVSZXN1bHRfMS5Db21wYXJlUmVzdWx0Lmxlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZUVuZCkgPT09IGNvbXBhcmVSZXN1bHRfMS5Db21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24gKGRhdGUsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICB2YXIgZm9ybWF0ID0gZGF0ZUZvcm1hdCAhPSBudWxsID8gZGF0ZUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuICAgICAgICBpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldE5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS4kaW5qZWN0ID0gW21vbWVudF9tb2R1bGVfMS5zZXJ2aWNlTmFtZSwgdGltZV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIERhdGVVdGlsaXR5O1xyXG59KSgpO1xyXG5leHBvcnRzLkRhdGVVdGlsaXR5ID0gRGF0ZVV0aWxpdHk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuKGZ1bmN0aW9uIChDb21wYXJlUmVzdWx0KSB7XHJcbiAgICBDb21wYXJlUmVzdWx0W0NvbXBhcmVSZXN1bHRbXCJncmVhdGVyXCJdID0gMV0gPSBcImdyZWF0ZXJcIjtcclxuICAgIENvbXBhcmVSZXN1bHRbQ29tcGFyZVJlc3VsdFtcImVxdWFsXCJdID0gMF0gPSBcImVxdWFsXCI7XHJcbiAgICBDb21wYXJlUmVzdWx0W0NvbXBhcmVSZXN1bHRbXCJsZXNzXCJdID0gLTFdID0gXCJsZXNzXCI7XHJcbn0pKGV4cG9ydHMuQ29tcGFyZVJlc3VsdCB8fCAoZXhwb3J0cy5Db21wYXJlUmVzdWx0ID0ge30pKTtcclxudmFyIENvbXBhcmVSZXN1bHQgPSBleHBvcnRzLkNvbXBhcmVSZXN1bHQ7XHJcbmZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBpZiAobnVtID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChudW0gPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBDb21wYXJlUmVzdWx0Lmxlc3M7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRDb21wYXJlUmVzdWx0ID0gZ2V0Q29tcGFyZVJlc3VsdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcGFyZVJlc3VsdC5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnRzLmRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuZXhwb3J0cy5kZWZhdWx0Rm9ybWF0cyA9IHtcclxuICAgIGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuICAgIGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcbiAgICB0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG51bWJlcl9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnKTtcclxudmFyIGZpbGVTaXplX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vZmlsZVNpemUuc2VydmljZScpO1xyXG52YXIgZmlsZVNpemVGaWx0ZXJfMSA9IHJlcXVpcmUoJy4vZmlsZVNpemVGaWx0ZXInKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWxlU2l6ZS5zZXJ2aWNlJykpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2ZpbGVTaXplRmlsdGVyJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbbnVtYmVyX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGZpbGVTaXplX3NlcnZpY2VfMS5mYWN0b3J5TmFtZSwgZmlsZVNpemVfc2VydmljZV8xLmZpbGVTaXplRmFjdG9yeSlcclxuICAgIC5maWx0ZXIoZmlsZVNpemVGaWx0ZXJfMS5zaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcl8xLmZpbGVTaXplRmlsdGVyKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemUubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdudW1iZXJVdGlsaXR5JztcclxudmFyIFNpZ247XHJcbihmdW5jdGlvbiAoU2lnbikge1xyXG4gICAgU2lnbltTaWduW1wicG9zaXRpdmVcIl0gPSAxXSA9IFwicG9zaXRpdmVcIjtcclxuICAgIFNpZ25bU2lnbltcIm5lZ2F0aXZlXCJdID0gLTFdID0gXCJuZWdhdGl2ZVwiO1xyXG59KShTaWduIHx8IChTaWduID0ge30pKTtcclxudmFyIE51bWJlclV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTnVtYmVyVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIE51bWJlclV0aWxpdHkucHJvdG90eXBlLnByZWNpc2VSb3VuZCA9IGZ1bmN0aW9uIChudW0sIGRlY2ltYWxzKSB7XHJcbiAgICAgICAgdmFyIHNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoc2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuICAgIH07XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5pbnRlZ2VyRGl2aWRlID0gZnVuY3Rpb24gKGRpdmlkZW5kLCBkaXZpc29yKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuICAgIH07XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5yb3VuZFRvU3RlcCA9IGZ1bmN0aW9uIChudW0sIHN0ZXApIHtcclxuICAgICAgICBpZiAoIXN0ZXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IG51bSAlIHN0ZXA7XHJcbiAgICAgICAgaWYgKHJlbWFpbmRlciA+PSBzdGVwIC8gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtICsgKHN0ZXAgLSByZW1haW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bSAtIHJlbWFpbmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE51bWJlclV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnVtYmVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbnVtYmVyX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcbnZhciBGaWxlU2l6ZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKSB7XHJcbiAgICAgICAgdGhpcy5CWVRFU19QRVJfR0IgPSAxMDczNzQxODI0O1xyXG4gICAgICAgIHRoaXMuQllURVNfUEVSX01CID0gMTA0ODU3NjtcclxuICAgICAgICB0aGlzLkJZVEVTX1BFUl9LQiA9IDEwMjQ7XHJcbiAgICAgICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xyXG4gICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG4gICAgICAgICAgICB0aGlzLmlzR0IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9HQjtcclxuICAgICAgICAgICAgdGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc0dCID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01CID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTUIgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX01CO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01CID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzS0IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNLQiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG4gICAgfVxyXG4gICAgRmlsZVNpemVTZXJ2aWNlLnByb3RvdHlwZS5kaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzR0IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEZpbGVTaXplU2VydmljZTtcclxufSkoKTtcclxuZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZmlsZVNpemVGYWN0b3J5ID0gZmlsZVNpemVGYWN0b3J5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWxlU2l6ZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBmaWxlU2l6ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplLnNlcnZpY2UnKTtcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5leHBvcnRzLnNpbXBsZUZpbHRlck5hbWUgPSAnZmlsZVNpemUnO1xyXG5leHBvcnRzLmZpbHRlck5hbWUgPSBleHBvcnRzLnNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmaWxlU2l6ZV9zZXJ2aWNlXzEuZmFjdG9yeU5hbWVdO1xyXG5mdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3RvcnkpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuICAgICAgICB2YXIgZmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG4gICAgICAgIHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZmlsZVNpemVGaWx0ZXIgPSBmaWxlU2l6ZUZpbHRlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemVGaWx0ZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgb2JqZWN0X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG52YXIgc3RyaW5nX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3N0cmluZy9zdHJpbmcuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gJ3NlYXJjaCc7XHJcbnZhciBHZW5lcmljU2VhcmNoRmlsdGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgICAgICB0aGlzLnR5cGUgPSBleHBvcnRzLmZpbHRlck5hbWU7XHJcbiAgICAgICAgdGhpcy5taW5TZWFyY2hMZW5ndGggPSAxO1xyXG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgR2VuZXJpY1NlYXJjaEZpbHRlci5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpIHx8IHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPCB0aGlzLm1pblNlYXJjaExlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuICAgIH07XHJcbiAgICBHZW5lcmljU2VhcmNoRmlsdGVyLnByb3RvdHlwZS5zZWFyY2hPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gXy52YWx1ZXMoaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmFueSh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhU3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcbiAgICAgICAgICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxufSkoKTtcclxuZXhwb3J0cy5HZW5lcmljU2VhcmNoRmlsdGVyID0gR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Rfc2VydmljZV8xLnNlcnZpY2VOYW1lLCBzdHJpbmdfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0LCBzdHJpbmdVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbb2JqZWN0X3NlcnZpY2VfMS5tb2R1bGVOYW1lLCBzdHJpbmdfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG52YXIgU3RyaW5nVXRpbGl0eVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3RyaW5nVXRpbGl0eVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBTdHJpbmdVdGlsaXR5U2VydmljZS5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICtzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKHN0ciwgc3Vic3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHN1YnN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIFN0cmluZ1V0aWxpdHlTZXJ2aWNlLnByb3RvdHlwZS5zdWJzdGl0dXRlID0gZnVuY3Rpb24gKGZvcm1hdFN0cmluZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXy5lYWNoKHBhcmFtcywgZnVuY3Rpb24gKHBhcmFtLCBpbmRleCkge1xyXG4gICAgICAgICAgICBmb3JtYXRTdHJpbmcgPSBfdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXRTdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLnJlcGxhY2VBbGwgPSBmdW5jdGlvbiAoc3RyLCBwYXR0ZXJuVG9GaW5kLCByZXBsYWNlbWVudFN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN0cmluZ1V0aWxpdHlTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlN0cmluZ1V0aWxpdHlTZXJ2aWNlID0gU3RyaW5nVXRpbGl0eVNlcnZpY2U7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmluZy5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciB1dWlkID0gcmVxdWlyZSgndXVpZCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmd1aWQnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2d1aWRTZXJ2aWNlJztcclxudmFyIEd1aWRTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEd1aWRTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgR3VpZFNlcnZpY2UucHJvdG90eXBlLnRpbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHV1aWQudjEoKTtcclxuICAgIH07XHJcbiAgICBHdWlkU2VydmljZS5wcm90b3R5cGUucmFuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB1dWlkLnY0KCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEd1aWRTZXJ2aWNlO1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgR3VpZFNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ndWlkLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ndWlkL2d1aWQuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbi8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG52YXIgX3JuZyA9IHJlcXVpcmUoJy4vcm5nJyk7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICBidWYgPSBidWYgfHwgW107XG4gIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgfVxuICB9KTtcblxuICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICB3aGlsZSAoaWkgPCAxNikge1xuICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG5mdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG59XG5cbi8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbn1cblxuLy8gRXhwb3J0IHB1YmxpYyBBUElcbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG51dWlkLnBhcnNlID0gcGFyc2U7XG51dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3V1aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgcm5nO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgIHJldHVybiBfcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91dWlkL3JuZy1icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYmFzZU5vdGlmaWVyXzEgPSByZXF1aXJlKCcuL2Jhc2VOb3RpZmllcicpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL25vdGlmaWNhdGlvblR5cGVzJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbm90aWZpY2F0aW9uJztcclxudmFyIE5vdGlmaWNhdGlvblNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTm90aWZpY2F0aW9uU2VydmljZShub3RpZmllcikge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuICAgIH1cclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS53YXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLk5vdGlmaWNhdGlvblNlcnZpY2UgPSBOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG5mdW5jdGlvbiBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgdmFyIHByb3ZpZGVyID0ge1xyXG4gICAgICAgIG5vdGlmaWVyOiBuZXcgYmFzZU5vdGlmaWVyXzEuQmFzZU5vdGlmaWVyKCksXHJcbiAgICAgICAgc2V0Tm90aWZpZXI6IGZ1bmN0aW9uIChub3RpZmllcikge1xyXG4gICAgICAgICAgICBfdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UoX3RoaXMubm90aWZpZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHByb3ZpZGVyO1xyXG59XHJcbmV4cG9ydHMubm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyID0gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnByb3ZpZGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIEJhc2VOb3RpZmllciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlTm90aWZpZXIoKSB7XHJcbiAgICB9XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlTm90aWZpZXI7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZU5vdGlmaWVyID0gQmFzZU5vdGlmaWVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlTm90aWZpZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90aWZpY2F0aW9uVHlwZXMuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG52YXIgT2JzZXJ2YWJsZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMubmV4dEtleSA9IDA7XHJcbiAgICB9XHJcbiAgICBPYnNlcnZhYmxlU2VydmljZS5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEtleSA9IHRoaXMubmV4dEtleTtcclxuICAgICAgICB0aGlzLm5leHRLZXkrKztcclxuICAgICAgICB0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcclxuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgcGFyYW1zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoZnVuY3Rpb24gKHdhdGNoZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh3YXRjaGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseShfdGhpcywgcGFyYW1zKTtcclxuICAgICAgICB9KS52YWx1ZSgpO1xyXG4gICAgfTtcclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9ic2VydmFibGVTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLk9ic2VydmFibGVTZXJ2aWNlID0gT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbmZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkgPSBvYnNlcnZhYmxlU2VydmljZUZhY3Rvcnk7XHJcbm5nLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxudmFyIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLmdldENoaWxkQmVoYXZpb3IgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG4gICAgICAgICAgICA/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUudHJpZ2dlckNoaWxkQmVoYXZpb3IgPSBmdW5jdGlvbiAoY2hpbGQsIGFjdGlvbikge1xyXG4gICAgICAgIHZhciBiZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcbiAgICAgICAgaWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyA9IGZ1bmN0aW9uIChjaGlsZExpc3QsIGFjdGlvbikge1xyXG4gICAgICAgIHZhciBiZWhhdmlvcnMgPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgZnVuY3Rpb24gKGJlaGF2aW9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyA9IGZ1bmN0aW9uIChjaGlsZExpc3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBfKGNoaWxkTGlzdCkubWFwKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gX3RoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7IH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGJlaGF2aW9yKSB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG4gICAgICAgICAgICAudmFsdWUoKTtcclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUucmVnaXN0ZXJDaGlsZEJlaGF2aW9yID0gZnVuY3Rpb24gKGNoaWxkLCBiZWhhdmlvcikge1xyXG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50QmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuICAgICAgICBpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gXy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSA9IFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3Byb21pc2VVdGlsaXR5JztcclxudmFyIFByb21pc2VVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFByb21pc2VVdGlsaXR5KCRxLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kaW5qZWN0b3IgPSAkaW5qZWN0b3I7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlVXRpbGl0eS5wcm90b3R5cGUuaXNQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcbiAgICB9O1xyXG4gICAgUHJvbWlzZVV0aWxpdHkucHJvdG90eXBlLnJlc29sdmVQcm9taXNlcyA9IGZ1bmN0aW9uIChyZXNvbHZlcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHByb21pc2VzID0ge307XHJcbiAgICAgICAgXy5lYWNoKHJlc29sdmVzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfLmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlc1trZXldID0gKF90aGlzLiRxLndoZW4oX3RoaXMuJGluamVjdG9yLmludm9rZSh2YWx1ZSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXNba2V5XSA9IChfdGhpcy4kcS53aGVuKF90aGlzLiRpbmplY3Rvci5nZXQodmFsdWUpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlc1trZXldID0gKF90aGlzLiRxLndoZW4odmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRxLmFsbChwcm9taXNlcyk7XHJcbiAgICB9O1xyXG4gICAgUHJvbWlzZVV0aWxpdHkuJGluamVjdCA9IFsnJHEnLCAnJGluamVjdG9yJ107XHJcbiAgICByZXR1cm4gUHJvbWlzZVV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBQcm9taXNlVXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2Uuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3luY2hyb25pemVkUmVxdWVzdHMnO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ3N5bmNocm9uaXplZFJlcXVlc3RzJztcclxudmFyIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UoZGF0YVByb3ZpZGVyLCBoYW5kbGVSZXF1ZXN0LCAkcSkge1xyXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gZGF0YVByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUmVxdWVzdCA9IGhhbmRsZVJlcXVlc3Q7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdElkID0gMDtcclxuICAgIH1cclxuICAgIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBwYXJhbXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluY3JlbWVudCB0aGUgaWQgZmlyc3QgLSBzaG91bGQgbWF0Y2ggY3VycmVudCByZXF1ZXN0IGlkXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWQrKztcclxuICAgICAgICB2YXIgY3VycmVudFJlcXVlc3RJZCA9IHRoaXMucmVxdWVzdElkO1xyXG4gICAgICAgIHRoaXMuJHEud2hlbih0aGlzLmRhdGFQcm92aWRlci5hcHBseSh0aGlzLCBwYXJhbXMpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRSZXF1ZXN0SWQgPT0gX3RoaXMucmVxdWVzdElkKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVSZXF1ZXN0LmFwcGx5KF90aGlzLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlID0gU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlO1xyXG5zeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkuJGluamVjdCA9IFsnJHEnXTtcclxuZnVuY3Rpb24gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KCRxKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoZGF0YVByb3ZpZGVyLCBoYW5kbGVSZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5ID0gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5O1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbW9jayA9IHJlcXVpcmUoJy4vbW9jaycpO1xyXG5leHBvcnRzLm1vY2sgPSBtb2NrO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2FuZ3VsYXJGaXh0dXJlJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtcclxuICAgIG1vY2subW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlc3QubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIHVzZXMgc2lub24gYnV0IGNhbid0IGltcG9ydCBiZWNhdXNlIHNpbm9uIHVzZXMgZHluYW1pYyByZXF1aXJlc1xyXG4vLyBzaW5vbiB0eXBlcyB3aWxsIGJlIHJlc29sdmVkIGZyb20gdHNkLmQudHNcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5tb2NrJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdtb2NrVXRpbGl0eSc7XHJcbnZhciBNb2NrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vY2soJHEsICRyb290U2NvcGUpIHtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuICAgIE1vY2sucHJvdG90eXBlLnNlcnZpY2UgPSBmdW5jdGlvbiAoc2VydmljZSkge1xyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHNlcnZpY2UpKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH07XHJcbiAgICBNb2NrLnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gKHNlcnZpY2UsIG1ldGhvZE5hbWUsIGRhdGEsIHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuICAgICAgICAgICAgc3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBfdGhpcy4kcS5kZWZlcigpO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHByb21pc2U6IGRlZmVycmVkLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNb2NrLnByb3RvdHlwZS5wcm9taXNlV2l0aENhbGxiYWNrID0gZnVuY3Rpb24gKHNlcnZpY2UsIG1ldGhvZE5hbWUsIGNhbGxiYWNrLCBzdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF90aGlzLiRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTogZGVmZXJyZWQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBjYWxsYmFjay5hcHBseShfdGhpcywgcGFyYW1zKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNb2NrLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChzZXJ2aWNlLCBzY29wZSkge1xyXG4gICAgICAgIC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuICAgICAgICB2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0cyA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG4gICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcbiAgICAgICAgLy8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuICAgICAgICAvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0XHJcbiAgICAgICAgLy8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuICAgICAgICBfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICB9O1xyXG4gICAgTW9jay4kaW5qZWN0ID0gWyckcScsICckcm9vdFNjb3BlJ107XHJcbiAgICByZXR1cm4gTW9jaztcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIE1vY2spO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2NrLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9tb2NrLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItbW9ja3MnKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIEFuZ3VsYXJGaXh0dXJlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFuZ3VsYXJGaXh0dXJlKCkge1xyXG4gICAgfVxyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VydmljZU5hbWVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgc2VydmljZU5hbWVzW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuICAgICAgICB2YXIgc2VydmljZXMgPSB7fTtcclxuICAgICAgICAvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcbiAgICAgICAgdmFyIGluamVjdFBhcmFtZXRlcnMgPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcbiAgICAgICAgaW5qZWN0UGFyYW1ldGVycy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGluamVjdGVkU2VydmljZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGluamVjdGVkU2VydmljZXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2hvdWxkIGdldCBjYWxsZWQgd2l0aCB0aGUgc2VydmljZXMgaW5qZWN0ZWQgYnkgYW5ndWxhclxyXG4gICAgICAgICAgICAvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuICAgICAgICAgICAgXy5lYWNoKHNlcnZpY2VOYW1lcywgZnVuY3Rpb24gKHNlcnZpY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcclxuICAgIH07XHJcbiAgICBBbmd1bGFyRml4dHVyZS5wcm90b3R5cGUubW9jayA9IGZ1bmN0aW9uIChtb2Nrcykge1xyXG4gICAgICAgIGFuZ3VsYXIubW9jay5tb2R1bGUoZnVuY3Rpb24gKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChtb2NrcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICRwcm92aWRlLnZhbHVlKGtleS50b1N0cmluZygpLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5jb250cm9sbGVyV2l0aEJpbmRpbmdzID0gZnVuY3Rpb24gKGNvbnRyb2xsZXJOYW1lLCBiaW5kaW5ncywgbG9jYWxzLCBzY29wZSkge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcbiAgICAgICAgdmFyICRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG4gICAgICAgIHZhciAkY29udHJvbGxlciA9IHNlcnZpY2VzLiRjb250cm9sbGVyO1xyXG4gICAgICAgIHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuICAgICAgICBpZiAobG9jYWxzID09IG51bGwpIHtcclxuICAgICAgICAgICAgbG9jYWxzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMsIGJpbmRpbmdzKSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5kaXJlY3RpdmUgPSBmdW5jdGlvbiAoZG9tKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuICAgICAgICB2YXIgJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcbiAgICAgICAgdmFyICRjb21waWxlID0gc2VydmljZXMuJGNvbXBpbGU7XHJcbiAgICAgICAgYW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9ICRjb21waWxlKGRvbSkoJHJvb3RTY29wZSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcbiAgICAgICAgICAgIHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQW5ndWxhckZpeHR1cmU7XHJcbn0pKCk7XHJcbmV4cG9ydHMuYW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5ndWxhckZpeHR1cmUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBub3RpZmljYXRpb25fc2VydmljZV8xID0gcmVxdWlyZSgnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJyk7XHJcbnZhciB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoJy4vdmFsaWRhdG9yJyk7XHJcbnZhciBjb21wb3NpdGVWYWxpZGF0b3JfMSA9IHJlcXVpcmUoJy4vY29tcG9zaXRlVmFsaWRhdG9yJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAndmFsaWRhdGlvbkZhY3RvcnknO1xyXG52YXIgVmFsaWRhdGlvblNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVmFsaWRhdGlvblNlcnZpY2Uobm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24gPSBub3RpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUuYnVpbGROb3RpZmljYXRpb25XYXJuaW5nVmFsaWRhdG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB2YWxpZGF0b3JfMS5WYWxpZGF0b3IoZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUuYnVpbGROb3RpZmljYXRpb25FcnJvclZhbGlkYXRvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgdmFsaWRhdG9yXzEuVmFsaWRhdG9yKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBfdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5idWlsZEN1c3RvbVZhbGlkYXRvciA9IGZ1bmN0aW9uIChzaG93RXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gbmV3IHZhbGlkYXRvcl8xLlZhbGlkYXRvcihzaG93RXJyb3IpO1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5idWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbldhcm5pbmdWYWxpZGF0b3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IGNvbXBvc2l0ZVZhbGlkYXRvcl8xLkNvbXBvc2l0ZVZhbGlkYXRvcihmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgX3RoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5idWlsZENvbXBvc2l0ZU5vdGlmaWNhdGlvbkVycm9yVmFsaWRhdG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjb21wb3NpdGVWYWxpZGF0b3JfMS5Db21wb3NpdGVWYWxpZGF0b3IoZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlLmJ1aWxkQ29tcG9zaXRlQ3VzdG9tVmFsaWRhdG9yID0gZnVuY3Rpb24gKHNob3dFcnJvcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgY29tcG9zaXRlVmFsaWRhdG9yXzEuQ29tcG9zaXRlVmFsaWRhdG9yKHNob3dFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgVmFsaWRhdGlvblNlcnZpY2UuJGluamVjdCA9IFtub3RpZmljYXRpb25fc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5WYWxpZGF0aW9uU2VydmljZSA9IFZhbGlkYXRpb25TZXJ2aWNlO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtub3RpZmljYXRpb25fc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgVmFsaWRhdGlvblNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0aW9uLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBWYWxpZGF0b3IgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVmFsaWRhdG9yKHNob3dFcnJvcikge1xyXG4gICAgICAgIHRoaXMuc2hvd0Vycm9yID0gc2hvd0Vycm9yO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5uZXh0S2V5ID0gMDtcclxuICAgIH1cclxuICAgIFZhbGlkYXRvci5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSBfdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IF90aGlzLmVycm9yTWVzc2FnZShoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3dFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH07XHJcbiAgICBWYWxpZGF0b3IucHJvdG90eXBlLmdldEVycm9yQ291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gXy5yZWR1Y2UodGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIGZ1bmN0aW9uIChjb3VudCwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSBfdGhpcy5pc0FjdGl2ZShoYW5kbGVyKTtcclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRvci5wcm90b3R5cGUucmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgY3VycmVudEtleSA9IHRoaXMubmV4dEtleTtcclxuICAgICAgICB0aGlzLm5leHRLZXkrKztcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRvci5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNba2V5XTtcclxuICAgIH07XHJcbiAgICBWYWxpZGF0b3IucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICByZXR1cm4gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiBoYW5kbGVyLmlzQWN0aXZlKCkpXHJcbiAgICAgICAgICAgIHx8IGhhbmRsZXIuaXNBY3RpdmUgPT0gbnVsbFxyXG4gICAgICAgICAgICB8fCBoYW5kbGVyLmlzQWN0aXZlID09PSB0cnVlO1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRvci5wcm90b3R5cGUuZXJyb3JNZXNzYWdlID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgICAgICA/IGhhbmRsZXIuZXJyb3JNZXNzYWdlKClcclxuICAgICAgICAgICAgOiBoYW5kbGVyLmVycm9yTWVzc2FnZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVmFsaWRhdG9yO1xyXG59KSgpO1xyXG5leHBvcnRzLlZhbGlkYXRvciA9IFZhbGlkYXRvcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmFsaWRhdG9yLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgdmFsaWRhdG9yXzEgPSByZXF1aXJlKCcuL3ZhbGlkYXRvcicpO1xyXG52YXIgQ29tcG9zaXRlVmFsaWRhdG9yID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvbXBvc2l0ZVZhbGlkYXRvcihzaG93RXJyb3IpIHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvciA9IHNob3dFcnJvcjtcclxuICAgICAgICB0aGlzLmNoaWxkVmFsaWRhdG9ycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubmV4dEtleSA9IDA7XHJcbiAgICB9XHJcbiAgICBDb21wb3NpdGVWYWxpZGF0b3IucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBfLmVhY2godGhpcy5jaGlsZFZhbGlkYXRvcnMsIGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH07XHJcbiAgICBDb21wb3NpdGVWYWxpZGF0b3IucHJvdG90eXBlLmdldEVycm9yQ291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKHRoaXMuY2hpbGRWYWxpZGF0b3JzLCBmdW5jdGlvbiAoY291bnQsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50ICs9IGhhbmRsZXIuZ2V0RXJyb3JDb3VudCgpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfTtcclxuICAgIENvbXBvc2l0ZVZhbGlkYXRvci5wcm90b3R5cGUuYnVpbGRDaGlsZFZhbGlkYXRvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB2YWxpZGF0b3IgPSBuZXcgdmFsaWRhdG9yXzEuVmFsaWRhdG9yKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBfdGhpcy5zaG93RXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBjdXJyZW50S2V5ID0gdGhpcy5uZXh0S2V5O1xyXG4gICAgICAgIHRoaXMubmV4dEtleSsrO1xyXG4gICAgICAgIHRoaXMuY2hpbGRWYWxpZGF0b3JzW2N1cnJlbnRLZXldID0gdmFsaWRhdG9yO1xyXG4gICAgICAgIHZhbGlkYXRvci5rZXkgPSBjdXJyZW50S2V5O1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0b3I7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9zaXRlVmFsaWRhdG9yLnByb3RvdHlwZS51bnJlZ2lzdGVyQ2hpbGQgPSBmdW5jdGlvbiAodmFsaWRhdG9yKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY2hpbGRWYWxpZGF0b3JzW3ZhbGlkYXRvci5rZXldO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb21wb3NpdGVWYWxpZGF0b3I7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQ29tcG9zaXRlVmFsaWRhdG9yID0gQ29tcG9zaXRlVmFsaWRhdG9yO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb3NpdGVWYWxpZGF0b3IuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy92YWxpZGF0aW9uL2NvbXBvc2l0ZVZhbGlkYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2NvbXBhcmVSZXN1bHQnKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9