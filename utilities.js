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
	var types = __webpack_require__(45);
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
	var date = __webpack_require__(21);
	exports.date = date;
	var fileSize = __webpack_require__(28);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(32);
	exports.genericSearchFilter = genericSearchFilter;
	var moment = __webpack_require__(22);
	exports.moment = moment;
	var notification = __webpack_require__(34);
	exports.notification = notification;
	var numberService = __webpack_require__(29);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(37);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(38);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(39);
	exports.promise = promise;
	var stringService = __webpack_require__(33);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(40);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(41);
	exports.test = test;
	var time = __webpack_require__(24);
	exports.time = time;
	var validation = __webpack_require__(44);
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
	    function BaseResourceBuilder($http, $q, array) {
	        this.$http = $http;
	        this.$q = $q;
	        this.array = array;
	    }
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
	    BaseResourceBuilder.$inject = ['$http', '$q', array_service_1.serviceName];
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(22);
	var time_service_1 = __webpack_require__(24);
	var date_service_1 = __webpack_require__(25);
	var dateTimeFormatStrings_1 = __webpack_require__(27);
	__export(__webpack_require__(25));
	__export(__webpack_require__(27));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);
	//# sourceMappingURL=date.module.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(23);
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
/* 23 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var time_service_1 = __webpack_require__(24);
	var moment_module_1 = __webpack_require__(22);
	var compareResult_1 = __webpack_require__(26);
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
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(29);
	var fileSize_service_1 = __webpack_require__(30);
	var fileSizeFilter_1 = __webpack_require__(31);
	__export(__webpack_require__(30));
	__export(__webpack_require__(31));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);
	//# sourceMappingURL=fileSize.module.js.map

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(29);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(30);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(33);
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(35);
	__export(__webpack_require__(36));
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
/* 35 */
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
/* 36 */
/***/ function(module, exports) {

	'use strict';
	//# sourceMappingURL=notificationTypes.js.map

/***/ },
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(42);
	exports.mock = mock;
	__export(__webpack_require__(43));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);
	//# sourceMappingURL=test.module.js.map

/***/ },
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var notification_service_1 = __webpack_require__(34);
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(26));
	//# sourceMappingURL=types.module.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2EyZmUzYTBiNWNjZmU3OTg0MTMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQyxLQUFZLFNBQVMsdUJBQU0sQ0FBOEIsQ0FBQztBQUtqRCxrQkFBUztBQUpsQixLQUFZLE9BQU8sdUJBQU0sQ0FBMEIsQ0FBQztBQUloQyxnQkFBTztBQUgzQixLQUFZLFFBQVEsdUJBQU0sRUFBNEIsQ0FBQztBQUcxQixpQkFBUTtBQUZyQyxLQUFZLEtBQUssdUJBQU0sRUFBc0IsQ0FBQztBQUVQLGNBQUs7QUFFakMsYUFBSSxHQUFXLGNBQWMsQ0FBQztBQUV6QyxRQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtLQUNwQixTQUFTLENBQUMsSUFBSTtLQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1osUUFBUSxDQUFDLFVBQVU7RUFDbkIsQ0FBQyxDQUFDOzs7Ozs7O0FDakJILGNBQWEsa0NBQWtDLEVBQUUsSTs7Ozs7O0FDQWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUQ7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDakdBLGNBQWEsNEJBQTRCLEVBQUUsSTs7Ozs7O0FDQTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWlELHdCQUF3QixFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELGtCQUFrQixFQUFFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsSUFBSTtBQUNiO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDBDOzs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7QUMxQkE7QUFDQSxtQzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDOzs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLGlDQUFpQyxFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDOzs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxtRDs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDRDOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx3RDs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFxRCxpQkFBaUI7QUFDdEU7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2R0FBNEcsYUFBYSxFQUFFO0FBQzNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0dBQWlHLGFBQWEsRUFBRTtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDdEpBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsbUQ7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQW9GLGFBQWEsRUFBRTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRDs7Ozs7O0FDaEZBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsNEQ7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7QUN0QkEsY0FBYSxpQ0FBaUMsRUFBRSxJOzs7Ozs7QUNBaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx5Qzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEscUNBQXFDLFdBQVcsRUFBRSxFQUFFO0FBQ2pFLGNBQWEsMENBQTBDLHlDQUF5QyxFQUFFLEVBQUU7QUFDcEcsY0FBYSxtQ0FBbUMsV0FBVyxFQUFFLEVBQUU7QUFDL0QsY0FBYSxtQ0FBbUMsV0FBVyxFQUFFLEVBQUU7QUFDL0QsY0FBYSxpQ0FBaUMsV0FBVyxFQUFFLEVBQUU7QUFDN0QsY0FBYSxrQ0FBa0MsV0FBVyxFQUFFLEVBQUU7QUFDOUQsY0FBYSxrQ0FBa0MsV0FBVyxFQUFFLEVBQUU7QUFDOUQsY0FBYSxvQ0FBb0MsV0FBVyxFQUFFLEVBQUU7QUFDaEUsY0FBYSx1Q0FBdUMsV0FBVyxFQUFFLEVBQUU7QUFDbkUsY0FBYSxxQ0FBcUMsV0FBVyxFQUFFLEVBQUU7QUFDakUsY0FBYSxzQ0FBc0MsV0FBVyxFQUFFLEVBQUU7QUFDbEUsY0FBYSxzQ0FBc0MsV0FBVyxFQUFFLEVBQUU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSx5Qzs7Ozs7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHNEQUFzRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLG9CQUFvQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDZDOzs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELHlEQUF5RCxFQUFFO0FBQzlHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0Q7Ozs7OztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQSwrREFBOEQsZ0JBQWdCO0FBQzlFLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLHlDOzs7Ozs7QUN2QkE7QUFDQSw4Qzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDOzs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsbURBQWtELHNDQUFzQyxFQUFFO0FBQzFGLDBDQUF5Qyx5QkFBeUIsRUFBRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx3RDs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDRDOzs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEOzs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsaUM7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSwyQzs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQzs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QyIsImZpbGUiOiJ1dGlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGNhMmZlM2EwYjVjY2ZlNzk4NDEzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAqIGFzIGJlaGF2aW9ycyBmcm9tICcuL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgZmlsdGVycyBmcm9tICcuL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMvdHlwZXMubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7IGJlaGF2aW9ycywgZmlsdGVycywgc2VydmljZXMsIHR5cGVzIH07XHJcblxyXG5leHBvcnQgdmFyIG5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdGJlaGF2aW9ycy5uYW1lLFxyXG5cdGZpbHRlcnMubmFtZSxcclxuXHRzZXJ2aWNlcy5tb2R1bGVOYW1lLFxyXG5dKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvdXRpbGl0aWVzLnRzXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJhbmd1bGFyXCJdOyB9KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgc3RvcEV2ZW50UHJvcG9nYXRpb24gPSByZXF1aXJlKCcuL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uJyk7XHJcbmV4cG9ydHMuc3RvcEV2ZW50UHJvcG9nYXRpb24gPSBzdG9wRXZlbnRQcm9wb2dhdGlvbjtcclxuZXhwb3J0cy5uYW1lID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm5hbWUsIFtcclxuICAgIHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iZWhhdmlvcnMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24nO1xyXG5leHBvcnRzLmRpcmVjdGl2ZU5hbWUgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcbmZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmRpcmVjdGl2ZShleHBvcnRzLmRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcEV2ZW50UHJvcGFnYXRpb24uanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBpc0VtcHR5ID0gcmVxdWlyZSgnLi9pc0VtcHR5L2lzRW1wdHknKTtcclxuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtcclxudmFyIHRydW5jYXRlID0gcmVxdWlyZSgnLi90cnVuY2F0ZS90cnVuY2F0ZScpO1xyXG5leHBvcnRzLnRydW5jYXRlID0gdHJ1bmNhdGU7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZmlsdGVyJykpO1xyXG5leHBvcnRzLm5hbWUgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm5hbWUsIFtcclxuICAgIGlzRW1wdHkubW9kdWxlTmFtZSxcclxuICAgIHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXJzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgb2JqZWN0X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnaXNFbXB0eSc7XHJcbmV4cG9ydHMuZmlsdGVyTmFtZSA9IGV4cG9ydHMuc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuaXNFbXB0eS4kaW5qZWN0ID0gW29iamVjdF9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBpc0VtcHR5KG9iamVjdCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgdHJ1ZVdoZW5FbXB0eSkge1xyXG4gICAgICAgIHZhciBpc0VtcHR5ID0gb2JqZWN0LmlzTnVsbE9yRW1wdHkoaW5wdXQpO1xyXG4gICAgICAgIGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gIWlzRW1wdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0VtcHR5O1xyXG4gICAgfTtcclxufVxyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtvYmplY3Rfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZpbHRlcihleHBvcnRzLnNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNFbXB0eS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGFycmF5X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2FycmF5L2FycmF5LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ29iamVjdFV0aWxpdHknO1xyXG52YXIgT2JqZWN0VXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBPYmplY3RVdGlsaXR5KGFycmF5KSB7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUuaXNOdWxsT3JFbXB0eSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8uaXNBcnJheShvYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmFueShvYmplY3QpID09PSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmlzTmFOKG9iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0ID09PSAnJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUuaXNOdWxsT3JXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuICAgICAgICAgICAgb2JqZWN0ID0gb2JqZWN0LnRyaW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkucHJvdG90eXBlLmFyZUVxdWFsID0gZnVuY3Rpb24gKG9iajEsIG9iajIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0eXBlMSA9IHR5cGVvZiBvYmoxO1xyXG4gICAgICAgIHZhciB0eXBlMiA9IHR5cGVvZiBvYmoyO1xyXG4gICAgICAgIGlmIChvYmoxID09IG51bGwgJiYgb2JqMiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUxICE9PSB0eXBlMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZTEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIC8vaW5pdCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyBmcm9tIG9iajJcclxuICAgICAgICAgICAgdmFyIGtleXMyID0gXy5rZXlzKG9iajIpO1xyXG4gICAgICAgICAgICBfLmZvckluKG9iajEsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXy5oYXMob2JqMiwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29tcGFyZSB2YWx1ZSBhZ2FpbnN0IHRoZSB2YWx1ZSB3aXRoIHRoZSBzYW1lIGtleSBpbiBvYmoyLCB0aGVuIHJlbW92ZSB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmFyZUVxdWFsKHZhbHVlLCBvYmoyW2tleV0pID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICBpZiAoXy5hbnkoa2V5czIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vaWYgdHlwZXMgYXJlIHByaW1pdGl2ZSwgZG8gYSBzaW1wbGUgY29tcGFyaXNvblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdCArICcnO1xyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkucHJvdG90eXBlLnZhbHVlT3JEZWZhdWx0ID0gZnVuY3Rpb24gKHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LiRpbmplY3QgPSBbYXJyYXlfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuICAgIHJldHVybiBPYmplY3RVdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFthcnJheV9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBPYmplY3RVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JqZWN0LnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIl9cIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIl9cIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXknO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2FycmF5VXRpbGl0eSc7XHJcbnZhciBBcnJheVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXJyYXlVdGlsaXR5KCkge1xyXG4gICAgfVxyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS5maW5kSW5kZXhPZiA9IGZ1bmN0aW9uIChhcnJheSwgcHJlZGljYXRlKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldEluZGV4O1xyXG4gICAgICAgIF8uZWFjaChhcnJheSwgZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcbiAgICB9O1xyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoYXJyYXksIGl0ZW0pIHtcclxuICAgICAgICB2YXIgaW5kZXg7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXggPSBfLmluZGV4T2YoYXJyYXksIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAoYXJyYXksIG9sZEl0ZW0sIG5ld0l0ZW0pIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSwgbmV3SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUuc3VtID0gZnVuY3Rpb24gKGFycmF5LCB0cmFuc2Zvcm0pIHtcclxuICAgICAgICB2YXIgbGlzdDtcclxuICAgICAgICBpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGlzdCA9IF8ubWFwKGFycmF5LCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxpc3QgPSBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKGxpc3QsIGZ1bmN0aW9uIChzdW0sIG51bSkgeyByZXR1cm4gc3VtICsgbnVtOyB9LCAwKTtcclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLnRvRGljdGlvbmFyeSA9IGZ1bmN0aW9uIChhcnJheSwga2V5U2VsZWN0b3IpIHtcclxuICAgICAgICAvLyBuZWVkcyB0byBiZSBzZWVkZWQgd2l0aCBhbiBvYmplY3Qgb3IgaXQgd2lsbCBiZSB2aWV3ZWQgYXMgYW4gYXJyYXkgd2l0aCBubyBpdGVtc1xyXG4gICAgICAgIHJldHVybiBfLnJlZHVjZShhcnJheSwgZnVuY3Rpb24gKGRpY3Rpb25hcnksIGl0ZW0pIHtcclxuICAgICAgICAgICAgZGljdGlvbmFyeVtrZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5VXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5LnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG52YXIgb2JqZWN0X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3RydW5jYXRlJztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gZXhwb3J0cy5zZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG50cnVuY2F0ZS4kaW5qZWN0ID0gW29iamVjdF9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB0cnVuY2F0ZVRvLCBpbmNsdWRlRWxsaXBzZXMpIHtcclxuICAgICAgICBpbmNsdWRlRWxsaXBzZXMgPSBpbmNsdWRlRWxsaXBzZXMgPT0gbnVsbCA/IGZhbHNlIDogaW5jbHVkZUVsbGlwc2VzO1xyXG4gICAgICAgIHZhciBvdXQgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKG91dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG4gICAgICAgICAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXQgKz0gJy4uLic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbb2JqZWN0X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5maWx0ZXIoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10cnVuY2F0ZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2ZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2ZpbHRlcnMvZmlsdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBhcnJheSA9IHJlcXVpcmUoJy4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG5leHBvcnRzLmFycmF5ID0gYXJyYXk7XHJcbnZhciBhdXRvc2F2ZSA9IHJlcXVpcmUoJy4vYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZScpO1xyXG5leHBvcnRzLmF1dG9zYXZlID0gYXV0b3NhdmU7XHJcbnZhciBhdXRvc2F2ZUFjdGlvbiA9IHJlcXVpcmUoJy4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZScpO1xyXG5leHBvcnRzLmF1dG9zYXZlQWN0aW9uID0gYXV0b3NhdmVBY3Rpb247XHJcbnZhciBib29sZWFuID0gcmVxdWlyZSgnLi9ib29sZWFuL2Jvb2xlYW4uc2VydmljZScpO1xyXG5leHBvcnRzLmJvb2xlYW4gPSBib29sZWFuO1xyXG52YXIgZGF0YUNvbnRyYWN0cyA9IHJlcXVpcmUoJy4vZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZScpO1xyXG5leHBvcnRzLmRhdGFDb250cmFjdHMgPSBkYXRhQ29udHJhY3RzO1xyXG52YXIgZGF0ZSA9IHJlcXVpcmUoJy4vZGF0ZS9kYXRlLm1vZHVsZScpO1xyXG5leHBvcnRzLmRhdGUgPSBkYXRlO1xyXG52YXIgZmlsZVNpemUgPSByZXF1aXJlKCcuL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZScpO1xyXG5leHBvcnRzLmZpbGVTaXplID0gZmlsZVNpemU7XHJcbnZhciBnZW5lcmljU2VhcmNoRmlsdGVyID0gcmVxdWlyZSgnLi9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZScpO1xyXG5leHBvcnRzLmdlbmVyaWNTZWFyY2hGaWx0ZXIgPSBnZW5lcmljU2VhcmNoRmlsdGVyO1xyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnLi9tb21lbnQvbW9tZW50Lm1vZHVsZScpO1xyXG5leHBvcnRzLm1vbWVudCA9IG1vbWVudDtcclxudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJy4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uO1xyXG52YXIgbnVtYmVyU2VydmljZSA9IHJlcXVpcmUoJy4vbnVtYmVyL251bWJlci5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubnVtYmVyID0gbnVtYmVyU2VydmljZTtcclxudmFyIG9iamVjdFNlcnZpY2UgPSByZXF1aXJlKCcuL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG5leHBvcnRzLm9iamVjdCA9IG9iamVjdFNlcnZpY2U7XHJcbnZhciBvYnNlcnZhYmxlID0gcmVxdWlyZSgnLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZScpO1xyXG5leHBvcnRzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xyXG52YXIgcGFyZW50Q2hpbGRCZWhhdmlvciA9IHJlcXVpcmUoJy4vcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5wYXJlbnRDaGlsZEJlaGF2aW9yID0gcGFyZW50Q2hpbGRCZWhhdmlvcjtcclxudmFyIHByb21pc2UgPSByZXF1aXJlKCcuL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMucHJvbWlzZSA9IHByb21pc2U7XHJcbnZhciBzdHJpbmdTZXJ2aWNlID0gcmVxdWlyZSgnLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmdTZXJ2aWNlO1xyXG52YXIgc3luY2hyb25pemVkUmVxdWVzdHMgPSByZXF1aXJlKCcuL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5zeW5jaHJvbml6ZWRSZXF1ZXN0cyA9IHN5bmNocm9uaXplZFJlcXVlc3RzO1xyXG52YXIgdGVzdCA9IHJlcXVpcmUoJy4vdGVzdC90ZXN0Lm1vZHVsZScpO1xyXG5leHBvcnRzLnRlc3QgPSB0ZXN0O1xyXG52YXIgdGltZSA9IHJlcXVpcmUoJy4vdGltZS90aW1lLnNlcnZpY2UnKTtcclxuZXhwb3J0cy50aW1lID0gdGltZTtcclxudmFyIHZhbGlkYXRpb24gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtcclxuICAgIGFycmF5Lm1vZHVsZU5hbWUsXHJcbiAgICBhdXRvc2F2ZS5tb2R1bGVOYW1lLFxyXG4gICAgYXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZSxcclxuICAgIGJvb2xlYW4ubW9kdWxlTmFtZSxcclxuICAgIGRhdGFDb250cmFjdHMubW9kdWxlTmFtZSxcclxuICAgIGRhdGUubW9kdWxlTmFtZSxcclxuICAgIGZpbGVTaXplLm1vZHVsZU5hbWUsXHJcbiAgICBnZW5lcmljU2VhcmNoRmlsdGVyLm1vZHVsZU5hbWUsXHJcbiAgICBtb21lbnQubW9kdWxlTmFtZSxcclxuICAgIG5vdGlmaWNhdGlvbi5tb2R1bGVOYW1lLFxyXG4gICAgbnVtYmVyU2VydmljZS5tb2R1bGVOYW1lLFxyXG4gICAgb2JqZWN0U2VydmljZS5tb2R1bGVOYW1lLFxyXG4gICAgb2JzZXJ2YWJsZS5tb2R1bGVOYW1lLFxyXG4gICAgcGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG4gICAgcHJvbWlzZS5tb2R1bGVOYW1lLFxyXG4gICAgc3RyaW5nU2VydmljZS5tb2R1bGVOYW1lLFxyXG4gICAgc3luY2hyb25pemVkUmVxdWVzdHMubW9kdWxlTmFtZSxcclxuICAgIHRpbWUubW9kdWxlTmFtZSxcclxuICAgIHRlc3QubW9kdWxlTmFtZSxcclxuICAgIHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VzLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYXV0b3NhdmVBY3Rpb25fc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdhdXRvc2F2ZUZhY3RvcnknO1xyXG52YXIgQXV0b3NhdmVTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEF1dG9zYXZlU2VydmljZSgkcm9vdFNjb3BlLCAkdGltZW91dCwgYXV0b3NhdmVTZXJ2aWNlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5hdXRvc2F2ZVNlcnZpY2UgPSBhdXRvc2F2ZVNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5kZWJvdW5jZUR1cmF0aW9uID0gMTAwMDtcclxuICAgICAgICB0aGlzLmF1dG9zYXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaGFzVmFsaWRhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IF90aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gX3RoaXMuc2F2ZS5hcHBseShfdGhpcywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQocHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hdXRvc2F2ZVNlcnZpY2UudHJpZ2dlcihwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29udGVudEZvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudEZvcm0uJHNldFByaXN0aW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYXNWYWxpZGF0b3IgPSBvcHRpb25zLnZhbGlkYXRlICE9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Rm9ybSA9IG9wdGlvbnMuY29udGVudEZvcm0gfHwgdGhpcy5udWxsRm9ybSgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZSA9IG9wdGlvbnMuc2F2ZTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlID0gb3B0aW9ucy52YWxpZGF0ZTtcclxuICAgICAgICB0aGlzLmluaXRDaGFuZ2VMaXN0ZW5lcnMob3B0aW9ucyk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuY29udGVudEZvcm0uJGRpcnR5OyB9LCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXJDaGFuZ2VMaXN0ZW5lciA9IF90aGlzLnNldENoYW5nZUxpc3RlbmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwoX3RoaXMudGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgQXV0b3NhdmVTZXJ2aWNlLnByb3RvdHlwZS5zZXRUaW1lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMudGltZXIgPSB0aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuY2xlYXJDaGFuZ2VMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICBfdGhpcy5hdXRvc2F2ZSgpO1xyXG4gICAgICAgIH0sIHRoaXMuZGVib3VuY2VEdXJhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgQXV0b3NhdmVTZXJ2aWNlLnByb3RvdHlwZS5udWxsRm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAkcHJpc3RpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAkZGlydHk6IHRydWUsXHJcbiAgICAgICAgICAgICRzZXRQcmlzdGluZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgQXV0b3NhdmVTZXJ2aWNlLnByb3RvdHlwZS5pbml0Q2hhbmdlTGlzdGVuZXJzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnNldENoYW5nZUxpc3RlbmVyID0gb3B0aW9ucy5zZXRDaGFuZ2VMaXN0ZW5lciB8fCB0aGlzLm51bGxTZXRMaXN0ZW5lcjtcclxuICAgICAgICB0aGlzLmNsZWFyQ2hhbmdlTGlzdGVuZXIgPSB0aGlzLm51bGxDbGVhckxpc3RlbmVyO1xyXG4gICAgfTtcclxuICAgIEF1dG9zYXZlU2VydmljZS5wcm90b3R5cGUubnVsbFNldExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBjaGFuZ2UgbGlzdGVuZXIgYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVsbENsZWFyTGlzdGVuZXI7XHJcbiAgICB9O1xyXG4gICAgQXV0b3NhdmVTZXJ2aWNlLnByb3RvdHlwZS5udWxsQ2xlYXJMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gY2hhbmdlIGxpc3RlbmVyIHJlZ2lzdGVyJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEF1dG9zYXZlU2VydmljZTtcclxufSkoKTtcclxuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgYXV0b3NhdmVBY3Rpb25fc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSgkcm9vdFNjb3BlLCAkdGltZW91dCwgYXV0b3NhdmVTZXJ2aWNlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZSgkcm9vdFNjb3BlLCAkdGltZW91dCwgYXV0b3NhdmVTZXJ2aWNlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2F1dG9zYXZlQWN0aW9uX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIGF1dG9zYXZlU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRvc2F2ZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBuZyA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnYXV0b3NhdmVBY3Rpb24nO1xyXG52YXIgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEF1dG9zYXZlQWN0aW9uU2VydmljZSgkdGltZW91dCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVNZXNzYWdlRHVyYXRpb24gPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmVTdWNjZXNzZnVsID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCB0cnVlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXV0b3NhdmVGYWlsZWQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVzb2x2ZUF1dG9zYXZlID0gZnVuY3Rpb24gKGRhdGEsIHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgX3RoaXMuX3NhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBfdGhpcy5fY29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBfdGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcbiAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBfdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZSwgXCJzYXZpbmdcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2F2aW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUsIFwiY29tcGxldGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGxldGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZSwgXCJzdWNjZXNzZnVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBBdXRvc2F2ZUFjdGlvblNlcnZpY2UucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xyXG4gICAgICAgIHRoaXMuX3NhdmluZyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG4gICAgfTtcclxuICAgIEF1dG9zYXZlQWN0aW9uU2VydmljZS4kaW5qZWN0ID0gWyckdGltZW91dCddO1xyXG4gICAgcmV0dXJuIEF1dG9zYXZlQWN0aW9uU2VydmljZTtcclxufSkoKTtcclxubmcubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBBdXRvc2F2ZUFjdGlvblNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4nO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxudmFyIEJvb2xlYW5VdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJvb2xlYW5VdGlsaXR5KCkge1xyXG4gICAgfVxyXG4gICAgQm9vbGVhblV0aWxpdHkucHJvdG90eXBlLnRvQm9vbCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gISFvYmplY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJvb2xlYW5VdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQm9vbGVhblV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib29sZWFuLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIGJhc2VSZXNvdXJjZUJ1aWxkZXJfc2VydmljZV8xID0gcmVxdWlyZSgnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZScpO1xyXG52YXIgYmFzZURhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZScpO1xyXG52YXIgYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGFDb250cmFjdHMnO1xyXG52YXIgYmFzZURhdGFfc2VydmljZV8yID0gcmVxdWlyZSgnLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZScpO1xyXG5leHBvcnRzLkJhc2VEYXRhU2VydmljZSA9IGJhc2VEYXRhX3NlcnZpY2VfMi5CYXNlRGF0YVNlcnZpY2U7XHJcbmV4cG9ydHMuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgPSBiYXNlRGF0YV9zZXJ2aWNlXzIuZmFjdG9yeU5hbWU7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnKSk7XHJcbnZhciBiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzIgPSByZXF1aXJlKCcuL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlID0gYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8yLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZTtcclxuZXhwb3J0cy5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5TmFtZSA9IGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMi5mYWN0b3J5TmFtZTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZScpKTtcclxudmFyIGJhc2VSZXNvdXJjZUJ1aWxkZXJfc2VydmljZV8yID0gcmVxdWlyZSgnLi9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZScpO1xyXG5leHBvcnRzLmJ1aWxkZXJTZXJ2aWNlTmFtZSA9IGJhc2VSZXNvdXJjZUJ1aWxkZXJfc2VydmljZV8yLnNlcnZpY2VOYW1lO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtcclxuICAgIGJhc2VEYXRhX3NlcnZpY2VfMS5tb2R1bGVOYW1lLFxyXG4gICAgYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8xLm1vZHVsZU5hbWUsXHJcbiAgICBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMS5tb2R1bGVOYW1lLFxyXG5dKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YUNvbnRyYWN0cy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBhcnJheV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJyk7XHJcbnZhciBiYXNlRGF0YV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZScpO1xyXG52YXIgYmFzZVBhcmVudERhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UnKTtcclxudmFyIGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlJyk7XHJcbnZhciBiYXNlUGFyZW50U2luZ2xldG9uRGF0YV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9iYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVBhcmVudFNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2Jhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG52YXIgQmFzZVJlc291cmNlQnVpbGRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlUmVzb3VyY2VCdWlsZGVyKCRodHRwLCAkcSwgYXJyYXkpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgIH1cclxuICAgIEJhc2VSZXNvdXJjZUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVJlc291cmNlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLnVzZU1vY2sgPSBvcHRpb25zLmVuZHBvaW50ID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy51c2VNb2NrO1xyXG4gICAgICAgIHJldHVybiBuZXcgYmFzZURhdGFfc2VydmljZV8xLkJhc2VEYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLm1vY2tEYXRhLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuICAgIH07XHJcbiAgICBCYXNlUmVzb3VyY2VCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVQYXJlbnRSZXNvdXJjZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucy51c2VNb2NrID0gb3B0aW9ucy5lbmRwb2ludCA9PSBudWxsID8gdHJ1ZSA6IG9wdGlvbnMudXNlTW9jaztcclxuICAgICAgICByZXR1cm4gbmV3IGJhc2VQYXJlbnREYXRhX3NlcnZpY2VfMS5CYXNlUGFyZW50RGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgdGhpcy5hcnJheSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyLCBvcHRpb25zLnRyYW5zZm9ybSwgb3B0aW9ucy51c2VNb2NrLCBvcHRpb25zLmxvZ1JlcXVlc3RzKTtcclxuICAgIH07XHJcbiAgICBCYXNlUmVzb3VyY2VCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVTaW5nbGV0b25SZXNvdXJjZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucy51c2VNb2NrID0gb3B0aW9ucy5lbmRwb2ludCA9PSBudWxsID8gdHJ1ZSA6IG9wdGlvbnMudXNlTW9jaztcclxuICAgICAgICByZXR1cm4gbmV3IGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMS5CYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgb3B0aW9ucy5lbmRwb2ludCwgb3B0aW9ucy5tb2NrRGF0YSwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcbiAgICB9O1xyXG4gICAgQmFzZVJlc291cmNlQnVpbGRlci5wcm90b3R5cGUuY3JlYXRlUGFyZW50U2luZ2xldG9uUmVzb3VyY2UgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMudXNlTW9jayA9IG9wdGlvbnMuZW5kcG9pbnQgPT0gbnVsbCA/IHRydWUgOiBvcHRpb25zLnVzZU1vY2s7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBiYXNlUGFyZW50U2luZ2xldG9uRGF0YV9zZXJ2aWNlXzEuQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIG9wdGlvbnMuZW5kcG9pbnQsIG9wdGlvbnMubW9ja0RhdGEsIG9wdGlvbnMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgb3B0aW9ucy50cmFuc2Zvcm0sIG9wdGlvbnMudXNlTW9jaywgb3B0aW9ucy5sb2dSZXF1ZXN0cyk7XHJcbiAgICB9O1xyXG4gICAgQmFzZVJlc291cmNlQnVpbGRlci4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsIGFycmF5X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbiAgICByZXR1cm4gQmFzZVJlc291cmNlQnVpbGRlcjtcclxufSkoKTtcclxuZXhwb3J0cy5CYXNlUmVzb3VyY2VCdWlsZGVyID0gQmFzZVJlc291cmNlQnVpbGRlcjtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbYXJyYXlfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQmFzZVJlc291cmNlQnVpbGRlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGFycmF5X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uLy4uL2FycmF5L2FycmF5LnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlRGF0YVNlcnZpY2UnO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2Jhc2VEYXRhU2VydmljZSc7XHJcbnZhciBCYXNlRGF0YVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQmFzZURhdGFTZXJ2aWNlKCRodHRwLCAkcSwgYXJyYXksIF9lbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgICAgICB0aGlzLl9lbmRwb2ludCA9IF9lbmRwb2ludDtcclxuICAgICAgICB0aGlzLm1vY2tEYXRhID0gbW9ja0RhdGE7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcbiAgICAgICAgdGhpcy51c2VNb2NrID0gdXNlTW9jaztcclxuICAgICAgICB0aGlzLmxvZ1JlcXVlc3RzID0gbG9nUmVxdWVzdHM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmFzZURhdGFTZXJ2aWNlLnByb3RvdHlwZSwgXCJlbmRwb2ludFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZ2V0SXRlbUVuZHBvaW50ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZC50b1N0cmluZygpO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZ2V0TGlzdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbih0aGlzLm1vY2tEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldCh0aGlzLmVuZHBvaW50LCB7IHBhcmFtczogcGFyYW1zIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMudHJhbnNmb3JtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBfLm1hcChkYXRhLCBfdGhpcy50cmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nKCdnZXRMaXN0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZURhdGFTZXJ2aWNlLnByb3RvdHlwZS5nZXREZXRhaWwgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihfLmZpbmQodGhpcy5tb2NrRGF0YSwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KHRoaXMuZ2V0SXRlbUVuZHBvaW50KGlkKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF90aGlzLnRyYW5zZm9ybShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZygnZ2V0RGV0YWlsJywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZURhdGFTZXJ2aWNlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluT2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXh0SWQgPSBfLm1heCh0aGlzLm1vY2tEYXRhLCAnaWQnKS5pZCArIDE7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdC5pZCA9IG5leHRJZDtcclxuICAgICAgICAgICAgdGhpcy5tb2NrRGF0YS5wdXNoKGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4oZG9tYWluT2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnBvc3QodGhpcy5lbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZG9tYWluT2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2coJ2NyZWF0ZScsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbWFpbk9iamVjdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHByb21pc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9jaykge1xyXG4gICAgICAgICAgICB2YXIgb2xkT2JqZWN0ID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIF8uZmluZCh0aGlzLm1vY2tEYXRhLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGRvbWFpbk9iamVjdC5pZDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBvbGRPYmplY3QgPSBfLmFzc2lnbihvbGRPYmplY3QsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnB1dCh0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLCBkb21haW5PYmplY3QpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZygndXBkYXRlJywgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGRvbWFpbk9iamVjdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHByb21pc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9jaykge1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5LnJlbW92ZSh0aGlzLm1vY2tEYXRhLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5kZWxldGUodGhpcy5nZXRJdGVtRW5kcG9pbnQoZG9tYWluT2JqZWN0LmlkKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nKCd1cGRhdGUnLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZURhdGFTZXJ2aWNlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAocmVxdWVzdE5hbWUsIGRhdGEpIHtcclxuICAgICAgICB2YXIgbW9ja1N0cmluZyA9IHRoaXMudXNlTW9jayA/ICdNb2NrZWQgJyA6ICcnO1xyXG4gICAgICAgIHZhciBlbmRwb2ludFN0cmluZyA9IHRoaXMuZW5kcG9pbnQgPT0gbnVsbCA/ICd1bnNwZWNpZmllZCcgOiB0aGlzLmVuZHBvaW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1vY2tTdHJpbmcgKyByZXF1ZXN0TmFtZSArICcgZm9yIGVuZHBvaW50ICcgKyBlbmRwb2ludFN0cmluZyArICc6Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJhc2VEYXRhU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5CYXNlRGF0YVNlcnZpY2UgPSBCYXNlRGF0YVNlcnZpY2U7XHJcbmJhc2VEYXRhU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnLCBhcnJheV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwLCAkcSwgYXJyYXkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIChlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2UoJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmJhc2VEYXRhU2VydmljZUZhY3RvcnkgPSBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5O1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFthcnJheV9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBiYXNlRGF0YVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZURhdGEuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxudmFyIGJhc2VEYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2Jhc2VEYXRhU2VydmljZS9iYXNlRGF0YS5zZXJ2aWNlJyk7XHJcbnZhciBCYXNlUGFyZW50RGF0YVNlcnZpY2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEJhc2VQYXJlbnREYXRhU2VydmljZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEJhc2VQYXJlbnREYXRhU2VydmljZSgkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCAkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA9IHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI7XHJcbiAgICB9XHJcbiAgICBCYXNlUGFyZW50RGF0YVNlcnZpY2UucHJvdG90eXBlLmNoaWxkQ29udHJhY3RzID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcih0aGlzLmVuZHBvaW50ICsgJy8nICsgaWQpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlUGFyZW50RGF0YVNlcnZpY2U7XHJcbn0pKGJhc2VEYXRhX3NlcnZpY2VfMS5CYXNlRGF0YVNlcnZpY2UpO1xyXG5leHBvcnRzLkJhc2VQYXJlbnREYXRhU2VydmljZSA9IEJhc2VQYXJlbnREYXRhU2VydmljZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZVBhcmVudERhdGEuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVBhcmVudERhdGFTZXJ2aWNlL2Jhc2VQYXJlbnREYXRhLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UnO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZSc7XHJcbnZhciBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlKCRodHRwLCAkcSwgX2VuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cykge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy5fZW5kcG9pbnQgPSBfZW5kcG9pbnQ7XHJcbiAgICAgICAgdGhpcy5tb2NrRGF0YSA9IG1vY2tEYXRhO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG4gICAgICAgIHRoaXMudXNlTW9jayA9IHVzZU1vY2s7XHJcbiAgICAgICAgdGhpcy5sb2dSZXF1ZXN0cyA9IGxvZ1JlcXVlc3RzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5wcm90b3R5cGUsIFwiZW5kcG9pbnRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbih0aGlzLm1vY2tEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldCh0aGlzLmVuZHBvaW50KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLnRyYW5zZm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gX3RoaXMudHJhbnNmb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5sb2dSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nKCdnZXQnLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW5PYmplY3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrRGF0YSA9IF8uYXNzaWduKHRoaXMubW9ja0RhdGEsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLnB1dCh0aGlzLmVuZHBvaW50LCBkb21haW5PYmplY3QpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMubG9nUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZygndXBkYXRlJywgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZS5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24gKHJlcXVlc3ROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdmFyIG1vY2tTdHJpbmcgPSB0aGlzLnVzZU1vY2sgPyAnTW9ja2VkICcgOiAnJztcclxuICAgICAgICB2YXIgZW5kcG9pbnRTdHJpbmcgPSB0aGlzLmVuZHBvaW50ID09IG51bGwgPyAndW5zcGVjaWZpZWQnIDogdGhpcy5lbmRwb2ludDtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2NrU3RyaW5nICsgcmVxdWVzdE5hbWUgKyAnIGZvciBlbmRwb2ludCAnICsgZW5kcG9pbnRTdHJpbmcgKyAnOicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlID0gQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlO1xyXG5iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XHJcbmZ1bmN0aW9uIGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkoJGh0dHAsICRxKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlKCRodHRwLCAkcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2ssIGxvZ1JlcXVlc3RzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3RvcnkgPSBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5O1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlU2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn07XHJcbnZhciBiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG52YXIgQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UoJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jaywgbG9nUmVxdWVzdHMpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCAkaHR0cCwgJHEsIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrLCBsb2dSZXF1ZXN0cyk7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZURpY3Rpb25hcnlCdWlsZGVyID0gcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcjtcclxuICAgIH1cclxuICAgIEJhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS5wcm90b3R5cGUuY2hpbGRDb250cmFjdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcih0aGlzLmVuZHBvaW50KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZVBhcmVudFNpbmdsZXRvbkRhdGFTZXJ2aWNlO1xyXG59KShiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzEuQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlKTtcclxuZXhwb3J0cy5CYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2UgPSBCYXNlUGFyZW50U2luZ2xldG9uRGF0YVNlcnZpY2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VQYXJlbnRTaW5nbGV0b25EYXRhLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VQYXJlbnRTaW5nbGV0b25EYXRhU2VydmljZS9iYXNlUGFyZW50U2luZ2xldG9uRGF0YS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbW9tZW50X21vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxudmFyIHRpbWVfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vdGltZS90aW1lLnNlcnZpY2UnKTtcclxudmFyIGRhdGVfc2VydmljZV8xID0gcmVxdWlyZSgnLi9kYXRlLnNlcnZpY2UnKTtcclxudmFyIGRhdGVUaW1lRm9ybWF0U3RyaW5nc18xID0gcmVxdWlyZSgnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9kYXRlLnNlcnZpY2UnKSk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFttb21lbnRfbW9kdWxlXzEubW9kdWxlTmFtZSwgdGltZV9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuc2VydmljZShkYXRlX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZSwgZGF0ZV9zZXJ2aWNlXzEuRGF0ZVV0aWxpdHkpXHJcbiAgICAudmFsdWUoZGF0ZVRpbWVGb3JtYXRTdHJpbmdzXzEuZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGF0ZVRpbWVGb3JtYXRTdHJpbmdzXzEuZGVmYXVsdEZvcm1hdHMpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ21vbWVudFdyYXBwZXInO1xyXG5mdW5jdGlvbiBtb21lbnRXcmFwcGVyKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLy8gVXNpbmcgYGFueWAgaW5zdGVhZCBvZiBNb21lbnRTdGF0aWMgYmVjYXVzZVxyXG4gICAgLy8gIGNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrIGRvZXNuJ3QgYXBwZWFyIHRvIGJlXHJcbiAgICAvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcbiAgICB2YXIgbW9tZW50V3JhcHBlciA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuICAgIC8vIFNldCBkZWZhdWx0IG1ldGhvZCBmb3IgaGFuZGxpbmcgbm9uLUlTTyBkYXRlIGNvbnZlcnNpb25zLlxyXG4gICAgLy8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG4gICAgLy8gVGhpcyBhbHNvIHByZXZlbnRzIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXHJcbiAgICBtb21lbnRXcmFwcGVyLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcbn1cclxuZXhwb3J0cy5tb21lbnRXcmFwcGVyID0gbW9tZW50V3JhcHBlcjtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuc2VydmljZU5hbWUsIG1vbWVudFdyYXBwZXIpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb21lbnQubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm1vbWVudFwiXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAndGltZVV0aWxpdHknO1xyXG52YXIgVGltZVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVGltZVV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBUaW1lVXRpbGl0eS5wcm90b3R5cGUubWlsbGlzZWNvbmRzVG9TZWNvbmRzID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG4gICAgfTtcclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb01pbnV0ZXMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuICAgIH07XHJcbiAgICBUaW1lVXRpbGl0eS5wcm90b3R5cGUubWlsbGlzZWNvbmRzVG9Ib3VycyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG4gICAgfTtcclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb0RheXMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRpbWVVdGlsaXR5O1xyXG59KSgpO1xyXG5leHBvcnRzLlRpbWVVdGlsaXR5ID0gVGltZVV0aWxpdHk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIHRpbWVfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vdGltZS90aW1lLnNlcnZpY2UnKTtcclxudmFyIG1vbWVudF9tb2R1bGVfMSA9IHJlcXVpcmUoJy4uL21vbWVudC9tb21lbnQubW9kdWxlJyk7XHJcbnZhciBjb21wYXJlUmVzdWx0XzEgPSByZXF1aXJlKCcuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0Jyk7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnZGF0ZVV0aWxpdHknO1xyXG52YXIgRGF0ZVV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRGF0ZVV0aWxpdHkobW9tZW50LCB0aW1lKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm1vbWVudCA9IG1vbWVudDtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMuYmFzZUZvcm1hdCA9ICdNTS1ERC1ZWVlZJztcclxuICAgICAgICB0aGlzLm1vbnRoID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnRmVicnVhcnknLCBkYXlzOiBmdW5jdGlvbiAoeWVhcikgeyByZXR1cm4gX3RoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjg7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnTWFyY2gnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdBcHJpbCcsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMwOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ01heScsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0p1bmUnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdKdWx5JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnQXVndXN0JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnT2N0b2JlcicsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuaXNMZWFwWWVhciA9IGZ1bmN0aW9uICh5ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXRGdWxsU3RyaW5nID0gZnVuY3Rpb24gKG1vbnRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldERheXMgPSBmdW5jdGlvbiAobW9udGgsIHllYXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuc3VidHJhY3REYXRlcyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBkYXRlRm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFydERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHZhciBlbmREYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHJlc3VsdC55ZWFycyA9IGVuZERhdGUuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICBpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tb250aHMgLT0gMTtcclxuICAgICAgICAgICAgcmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG4gICAgICAgICAgICByZXN1bHQueWVhcnMgLT0gMTtcclxuICAgICAgICAgICAgcmVzdWx0Lm1vbnRocyArPSAxMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuc3VidHJhY3REYXRlSW5EYXlzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICBpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmNvbXBhcmVEYXRlcyA9IGZ1bmN0aW9uIChkYXRlMSwgZGF0ZTIsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICAvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG4gICAgICAgIHZhciBkaWZmZXJlbmNlID0gdGhpcy5zdWJ0cmFjdERhdGVJbkRheXMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICByZXR1cm4gY29tcGFyZVJlc3VsdF8xLmdldENvbXBhcmVSZXN1bHQoZGlmZmVyZW5jZSk7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmRhdGVJblJhbmdlID0gZnVuY3Rpb24gKGRhdGUsIHJhbmdlU3RhcnQsIHJhbmdlRW5kKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlU3RhcnQpID09PSBjb21wYXJlUmVzdWx0XzEuQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBjb21wYXJlUmVzdWx0XzEuQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uIChkYXRlLCBkYXRlRm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIGZvcm1hdCA9IGRhdGVGb3JtYXQgIT0gbnVsbCA/IGRhdGVGb3JtYXQgOiB0aGlzLmJhc2VGb3JtYXQ7XHJcbiAgICAgICAgaWYgKF8uaXNEYXRlKGRhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUsIGZvcm1hdCkudG9EYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXROb3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkuJGluamVjdCA9IFttb21lbnRfbW9kdWxlXzEuc2VydmljZU5hbWUsIHRpbWVfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuICAgIHJldHVybiBEYXRlVXRpbGl0eTtcclxufSkoKTtcclxuZXhwb3J0cy5EYXRlVXRpbGl0eSA9IERhdGVVdGlsaXR5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbihmdW5jdGlvbiAoQ29tcGFyZVJlc3VsdCkge1xyXG4gICAgQ29tcGFyZVJlc3VsdFtDb21wYXJlUmVzdWx0W1wiZ3JlYXRlclwiXSA9IDFdID0gXCJncmVhdGVyXCI7XHJcbiAgICBDb21wYXJlUmVzdWx0W0NvbXBhcmVSZXN1bHRbXCJlcXVhbFwiXSA9IDBdID0gXCJlcXVhbFwiO1xyXG4gICAgQ29tcGFyZVJlc3VsdFtDb21wYXJlUmVzdWx0W1wibGVzc1wiXSA9IC0xXSA9IFwibGVzc1wiO1xyXG59KShleHBvcnRzLkNvbXBhcmVSZXN1bHQgfHwgKGV4cG9ydHMuQ29tcGFyZVJlc3VsdCA9IHt9KSk7XHJcbnZhciBDb21wYXJlUmVzdWx0ID0gZXhwb3J0cy5Db21wYXJlUmVzdWx0O1xyXG5mdW5jdGlvbiBnZXRDb21wYXJlUmVzdWx0KG51bSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgaWYgKG51bSA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBDb21wYXJlUmVzdWx0LmVxdWFsO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobnVtID4gMCkge1xyXG4gICAgICAgIHJldHVybiBDb21wYXJlUmVzdWx0LmdyZWF0ZXI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0Q29tcGFyZVJlc3VsdCA9IGdldENvbXBhcmVSZXN1bHQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBhcmVSZXN1bHQuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS90eXBlcy9jb21wYXJlUmVzdWx0LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0cy5kYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcbmV4cG9ydHMuZGVmYXVsdEZvcm1hdHMgPSB7XHJcbiAgICBkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcbiAgICBkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG4gICAgdGltZUZvcm1hdDogJ2g6bW1BJyxcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBudW1iZXJfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlJyk7XHJcbnZhciBmaWxlU2l6ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplLnNlcnZpY2UnKTtcclxudmFyIGZpbGVTaXplRmlsdGVyXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplRmlsdGVyJyk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZmlsZVNpemUuc2VydmljZScpKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWxlU2l6ZUZpbHRlcicpKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW251bWJlcl9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShmaWxlU2l6ZV9zZXJ2aWNlXzEuZmFjdG9yeU5hbWUsIGZpbGVTaXplX3NlcnZpY2VfMS5maWxlU2l6ZUZhY3RvcnkpXHJcbiAgICAuZmlsdGVyKGZpbGVTaXplRmlsdGVyXzEuc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXJfMS5maWxlU2l6ZUZpbHRlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGVTaXplLm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbnVtYmVyVXRpbGl0eSc7XHJcbnZhciBTaWduO1xyXG4oZnVuY3Rpb24gKFNpZ24pIHtcclxuICAgIFNpZ25bU2lnbltcInBvc2l0aXZlXCJdID0gMV0gPSBcInBvc2l0aXZlXCI7XHJcbiAgICBTaWduW1NpZ25bXCJuZWdhdGl2ZVwiXSA9IC0xXSA9IFwibmVnYXRpdmVcIjtcclxufSkoU2lnbiB8fCAoU2lnbiA9IHt9KSk7XHJcbnZhciBOdW1iZXJVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE51bWJlclV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5wcmVjaXNlUm91bmQgPSBmdW5jdGlvbiAobnVtLCBkZWNpbWFscykge1xyXG4gICAgICAgIHZhciBzaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuICAgICAgICByZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKHNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcbiAgICB9O1xyXG4gICAgTnVtYmVyVXRpbGl0eS5wcm90b3R5cGUuaW50ZWdlckRpdmlkZSA9IGZ1bmN0aW9uIChkaXZpZGVuZCwgZGl2aXNvcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcbiAgICB9O1xyXG4gICAgTnVtYmVyVXRpbGl0eS5wcm90b3R5cGUucm91bmRUb1N0ZXAgPSBmdW5jdGlvbiAobnVtLCBzdGVwKSB7XHJcbiAgICAgICAgaWYgKCFzdGVwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZW1haW5kZXIgPSBudW0gJSBzdGVwO1xyXG4gICAgICAgIGlmIChyZW1haW5kZXIgPj0gc3RlcCAvIDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bSArIChzdGVwIC0gcmVtYWluZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW0gLSByZW1haW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBOdW1iZXJVdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW51bWJlci5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIG51bWJlcl9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdmaWxlU2l6ZUZhY3RvcnknO1xyXG52YXIgRmlsZVNpemVTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEZpbGVTaXplU2VydmljZShudW1iZXJVdGlsaXR5LCBieXRlcykge1xyXG4gICAgICAgIHRoaXMuQllURVNfUEVSX0dCID0gMTA3Mzc0MTgyNDtcclxuICAgICAgICB0aGlzLkJZVEVTX1BFUl9NQiA9IDEwNDg1NzY7XHJcbiAgICAgICAgdGhpcy5CWVRFU19QRVJfS0IgPSAxMDI0O1xyXG4gICAgICAgIHRoaXMuYnl0ZXMgPSBieXRlcztcclxuICAgICAgICBpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0dCID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcbiAgICAgICAgICAgIHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNHQiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfTUIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNQiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuICAgICAgICAgICAgICAgIHRoaXMuTUIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLk1CLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNQiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0tCKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0tCID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLktCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5LQiwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzS0IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuICAgIH1cclxuICAgIEZpbGVTaXplU2VydmljZS5wcm90b3R5cGUuZGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0dCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5NQiArICcgTUInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBGaWxlU2l6ZVNlcnZpY2U7XHJcbn0pKCk7XHJcbmZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlcl9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBmaWxlU2l6ZUZhY3RvcnkobnVtYmVyVXRpbGl0eSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKGJ5dGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmZpbGVTaXplRmFjdG9yeSA9IGZpbGVTaXplRmFjdG9yeTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgZmlsZVNpemVfc2VydmljZV8xID0gcmVxdWlyZSgnLi9maWxlU2l6ZS5zZXJ2aWNlJyk7XHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuZXhwb3J0cy5zaW1wbGVGaWx0ZXJOYW1lID0gJ2ZpbGVTaXplJztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gZXhwb3J0cy5zaW1wbGVGaWx0ZXJOYW1lICsgJ0ZpbHRlcic7XHJcbmZpbGVTaXplRmlsdGVyLiRpbmplY3QgPSBbZmlsZVNpemVfc2VydmljZV8xLmZhY3RvcnlOYW1lXTtcclxuZnVuY3Rpb24gZmlsZVNpemVGaWx0ZXIoZmlsZVNpemVGYWN0b3J5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGJ5dGVzKSB7XHJcbiAgICAgICAgdmFyIGZpbGVTaXplID0gZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKGJ5dGVzKTtcclxuICAgICAgICByZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmZpbGVTaXplRmlsdGVyID0gZmlsZVNpemVGaWx0ZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGVTaXplRmlsdGVyLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIG9iamVjdF9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UnKTtcclxudmFyIHN0cmluZ19zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcbmV4cG9ydHMuZmlsdGVyTmFtZSA9ICdzZWFyY2gnO1xyXG52YXIgR2VuZXJpY1NlYXJjaEZpbHRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBHZW5lcmljU2VhcmNoRmlsdGVyKG9iamVjdCwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XHJcbiAgICAgICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICAgICAgdGhpcy50eXBlID0gZXhwb3J0cy5maWx0ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMubWluU2VhcmNoTGVuZ3RoID0gMTtcclxuICAgICAgICB0aGlzLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIEdlbmVyaWNTZWFyY2hGaWx0ZXIucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSB8fCB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDwgdGhpcy5taW5TZWFyY2hMZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcbiAgICB9O1xyXG4gICAgR2VuZXJpY1NlYXJjaEZpbHRlci5wcm90b3R5cGUuc2VhcmNoT2JqZWN0ID0gZnVuY3Rpb24gKGl0ZW0sIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IF8udmFsdWVzKGl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gXy5hbnkodmFsdWVzLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLnNlYXJjaE9iamVjdCh2YWx1ZSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGF0YVN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoIWNhc2VTZW5zaXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmcuY29udGFpbnMoZGF0YVN0cmluZywgc2VhcmNoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbn0pKCk7XHJcbmV4cG9ydHMuR2VuZXJpY1NlYXJjaEZpbHRlciA9IEdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZSwgc3RyaW5nX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KG9iamVjdCwgc3RyaW5nVXRpbGl0eSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmdVdGlsaXR5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW29iamVjdF9zZXJ2aWNlXzEubW9kdWxlTmFtZSwgc3RyaW5nX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxudmFyIFN0cmluZ1V0aWxpdHlTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFN0cmluZ1V0aWxpdHlTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiArc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIFN0cmluZ1V0aWxpdHlTZXJ2aWNlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChzdHIsIHN1YnN0cmluZykge1xyXG4gICAgICAgIGlmIChzdWJzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICBTdHJpbmdVdGlsaXR5U2VydmljZS5wcm90b3R5cGUuc3Vic3RpdHV0ZSA9IGZ1bmN0aW9uIChmb3JtYXRTdHJpbmcpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBwYXJhbXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF8uZWFjaChwYXJhbXMsIGZ1bmN0aW9uIChwYXJhbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgZm9ybWF0U3RyaW5nID0gX3RoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybWF0U3RyaW5nO1xyXG4gICAgfTtcclxuICAgIFN0cmluZ1V0aWxpdHlTZXJ2aWNlLnByb3RvdHlwZS5yZXBsYWNlQWxsID0gZnVuY3Rpb24gKHN0ciwgcGF0dGVyblRvRmluZCwgcmVwbGFjZW1lbnRTdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTdHJpbmdVdGlsaXR5U2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5TdHJpbmdVdGlsaXR5U2VydmljZSA9IFN0cmluZ1V0aWxpdHlTZXJ2aWNlO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgU3RyaW5nVXRpbGl0eVNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHJpbmcuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIGJhc2VOb3RpZmllcl8xID0gcmVxdWlyZSgnLi9iYXNlTm90aWZpZXInKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9ub3RpZmljYXRpb25UeXBlcycpKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24nO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ25vdGlmaWNhdGlvbic7XHJcbnZhciBOb3RpZmljYXRpb25TZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE5vdGlmaWNhdGlvblNlcnZpY2Uobm90aWZpZXIpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XHJcbiAgICB9XHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyLmluZm8obWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci53YXJuaW5nKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuc3VjY2VzcyhtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTm90aWZpY2F0aW9uU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5Ob3RpZmljYXRpb25TZXJ2aWNlID0gTm90aWZpY2F0aW9uU2VydmljZTtcclxuZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHZhciBwcm92aWRlciA9IHtcclxuICAgICAgICBub3RpZmllcjogbmV3IGJhc2VOb3RpZmllcl8xLkJhc2VOb3RpZmllcigpLFxyXG4gICAgICAgIHNldE5vdGlmaWVyOiBmdW5jdGlvbiAobm90aWZpZXIpIHtcclxuICAgICAgICAgICAgX3RoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgICRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb3RpZmljYXRpb25TZXJ2aWNlKF90aGlzLm5vdGlmaWVyKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBwcm92aWRlcjtcclxufVxyXG5leHBvcnRzLm5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciA9IG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcjtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5wcm92aWRlcihleHBvcnRzLnNlcnZpY2VOYW1lLCBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3RpZmljYXRpb24uc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBCYXNlTm90aWZpZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQmFzZU5vdGlmaWVyKCkge1xyXG4gICAgfVxyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLndhcm5pbmcgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHdpbmRvdy5hbGVydChtZXNzYWdlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZU5vdGlmaWVyO1xyXG59KSgpO1xyXG5leHBvcnRzLkJhc2VOb3RpZmllciA9IEJhc2VOb3RpZmllcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZU5vdGlmaWVyLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL2Jhc2VOb3RpZmllci5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdGlmaWNhdGlvblR5cGVzLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvblR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIG5nID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ29ic2VydmFibGVGYWN0b3J5JztcclxudmFyIE9ic2VydmFibGVTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVTZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLm5leHRLZXkgPSAwO1xyXG4gICAgfVxyXG4gICAgT2JzZXJ2YWJsZVNlcnZpY2UucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGFjdGlvbiwgZXZlbnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSB0aGlzLm5leHRLZXk7XHJcbiAgICAgICAgdGhpcy5uZXh0S2V5Kys7XHJcbiAgICAgICAgdGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXHJcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBPYnNlcnZhYmxlU2VydmljZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF8odGhpcy53YXRjaGVycykuZmlsdGVyKGZ1bmN0aW9uICh3YXRjaGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAod2F0Y2hlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gd2F0Y2hlci5hY3Rpb24uYXBwbHkoX3RoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgfSkudmFsdWUoKTtcclxuICAgIH07XHJcbiAgICBPYnNlcnZhYmxlU2VydmljZS5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBPYnNlcnZhYmxlU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5PYnNlcnZhYmxlU2VydmljZSA9IE9ic2VydmFibGVTZXJ2aWNlO1xyXG5mdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMub2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5ID0gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5O1xyXG5uZy5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAncGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcbnZhciBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSgpIHtcclxuICAgIH1cclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS5nZXRDaGlsZEJlaGF2aW9yID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLnZpZXdEYXRhICE9IG51bGxcclxuICAgICAgICAgICAgPyBjaGlsZC52aWV3RGF0YS5iZWhhdmlvclxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLnRyaWdnZXJDaGlsZEJlaGF2aW9yID0gZnVuY3Rpb24gKGNoaWxkLCBhY3Rpb24pIHtcclxuICAgICAgICB2YXIgYmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG4gICAgICAgIGlmIChiZWhhdmlvciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMgPSBmdW5jdGlvbiAoY2hpbGRMaXN0LCBhY3Rpb24pIHtcclxuICAgICAgICB2YXIgYmVoYXZpb3JzID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG4gICAgICAgIHJldHVybiBfLm1hcChiZWhhdmlvcnMsIGZ1bmN0aW9uIChiZWhhdmlvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMgPSBmdW5jdGlvbiAoY2hpbGRMaXN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gXyhjaGlsZExpc3QpLm1hcChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIF90aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpOyB9KVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChiZWhhdmlvcikgeyByZXR1cm4gYmVoYXZpb3IgIT0gbnVsbDsgfSlcclxuICAgICAgICAgICAgLnZhbHVlKCk7XHJcbiAgICB9O1xyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciA9IGZ1bmN0aW9uIChjaGlsZCwgYmVoYXZpb3IpIHtcclxuICAgICAgICBpZiAoY2hpbGQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnZpZXdEYXRhID0geyBiZWhhdmlvcjogbnVsbCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEJlaGF2aW9yID0gY2hpbGQudmlld0RhdGEuYmVoYXZpb3I7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IF8uZXh0ZW5kKGN1cnJlbnRCZWhhdmlvciwgYmVoYXZpb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UgPSBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdwcm9taXNlVXRpbGl0eSc7XHJcbnZhciBQcm9taXNlVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQcm9taXNlVXRpbGl0eSgkcSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuJGluamVjdG9yID0gJGluamVjdG9yO1xyXG4gICAgfVxyXG4gICAgUHJvbWlzZVV0aWxpdHkucHJvdG90eXBlLmlzUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIF8uaXNPYmplY3QocHJvbWlzZSkgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UudGhlbikgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UuY2F0Y2gpO1xyXG4gICAgfTtcclxuICAgIFByb21pc2VVdGlsaXR5LnByb3RvdHlwZS5yZXNvbHZlUHJvbWlzZXMgPSBmdW5jdGlvbiAocmVzb2x2ZXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlcyA9IHt9O1xyXG4gICAgICAgIF8uZWFjaChyZXNvbHZlcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkgfHwgXy5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXNba2V5XSA9IChfdGhpcy4kcS53aGVuKF90aGlzLiRpbmplY3Rvci5pbnZva2UodmFsdWUpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzW2tleV0gPSAoX3RoaXMuJHEud2hlbihfdGhpcy4kaW5qZWN0b3IuZ2V0KHZhbHVlKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXNba2V5XSA9IChfdGhpcy4kcS53aGVuKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcS5hbGwocHJvbWlzZXMpO1xyXG4gICAgfTtcclxuICAgIFByb21pc2VVdGlsaXR5LiRpbmplY3QgPSBbJyRxJywgJyRpbmplY3RvciddO1xyXG4gICAgcmV0dXJuIFByb21pc2VVdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgUHJvbWlzZVV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9taXNlLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN5bmNocm9uaXplZFJlcXVlc3RzJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdzeW5jaHJvbml6ZWRSZXF1ZXN0cyc7XHJcbnZhciBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpIHtcclxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IGRhdGFQcm92aWRlcjtcclxuICAgICAgICB0aGlzLmhhbmRsZVJlcXVlc3QgPSBoYW5kbGVSZXF1ZXN0O1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLnJlcXVlc3RJZCA9IDA7XHJcbiAgICB9XHJcbiAgICBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgcGFyYW1zW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbmNyZW1lbnQgdGhlIGlkIGZpcnN0IC0gc2hvdWxkIG1hdGNoIGN1cnJlbnQgcmVxdWVzdCBpZFxyXG4gICAgICAgIHRoaXMucmVxdWVzdElkKys7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRSZXF1ZXN0SWQgPSB0aGlzLnJlcXVlc3RJZDtcclxuICAgICAgICB0aGlzLiRxLndoZW4odGhpcy5kYXRhUHJvdmlkZXIuYXBwbHkodGhpcywgcGFyYW1zKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50UmVxdWVzdElkID09IF90aGlzLnJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlUmVxdWVzdC5hcHBseShfdGhpcywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSA9IFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZTtcclxuc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5LiRpbmplY3QgPSBbJyRxJ107XHJcbmZ1bmN0aW9uIHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSgkcSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZShkYXRhUHJvdmlkZXIsIGhhbmRsZVJlcXVlc3QsICRxKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLnN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSA9IHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIHN5bmNocm9uaXplZFJlcXVlc3RzRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy9zeW5jaHJvbml6ZWRSZXF1ZXN0cy5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG1vY2sgPSByZXF1aXJlKCcuL21vY2snKTtcclxuZXhwb3J0cy5tb2NrID0gbW9jaztcclxuX19leHBvcnQocmVxdWlyZSgnLi9hbmd1bGFyRml4dHVyZScpKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0JztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXHJcbiAgICBtb2NrLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZXN0Lm1vZHVsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyB1c2VzIHNpbm9uIGJ1dCBjYW4ndCBpbXBvcnQgYmVjYXVzZSBzaW5vbiB1c2VzIGR5bmFtaWMgcmVxdWlyZXNcclxuLy8gc2lub24gdHlwZXMgd2lsbCBiZSByZXNvbHZlZCBmcm9tIHRzZC5kLnRzXHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QubW9jayc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbW9ja1V0aWxpdHknO1xyXG52YXIgTW9jayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBNb2NrKCRxLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcbiAgICBNb2NrLnByb3RvdHlwZS5zZXJ2aWNlID0gZnVuY3Rpb24gKHNlcnZpY2UpIHtcclxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzZXJ2aWNlKSkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICB9O1xyXG4gICAgTW9jay5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uIChzZXJ2aWNlLCBtZXRob2ROYW1lLCBkYXRhLCBzdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gX3RoaXMuJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlOiBkZWZlcnJlZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTW9jay5wcm90b3R5cGUucHJvbWlzZVdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uIChzZXJ2aWNlLCBtZXRob2ROYW1lLCBjYWxsYmFjaywgc3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG4gICAgICAgICAgICBzdWNjZXNzZnVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBfdGhpcy4kcS5kZWZlcigpO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHByb21pc2U6IGRlZmVycmVkLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogY2FsbGJhY2suYXBwbHkoX3RoaXMsIHBhcmFtcyksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTW9jay5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoc2VydmljZSwgc2NvcGUpIHtcclxuICAgICAgICAvLyBTYXZlIGxvY2FsIHJlZmVyZW5jZSB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCB0aGVuIGNsZWFyXHJcbiAgICAgICAgdmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMgPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuICAgICAgICBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG4gICAgICAgIC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcbiAgICAgICAgLy8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdFxyXG4gICAgICAgIC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcbiAgICAgICAgXy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgfTtcclxuICAgIE1vY2suJGluamVjdCA9IFsnJHEnLCAnJHJvb3RTY29wZSddO1xyXG4gICAgcmV0dXJuIE1vY2s7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBNb2NrKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9jay5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5yZXF1aXJlKCdhbmd1bGFyLW1vY2tzJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBBbmd1bGFyRml4dHVyZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBbmd1bGFyRml4dHVyZSgpIHtcclxuICAgIH1cclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VOYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2VOYW1lc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcbiAgICAgICAgdmFyIHNlcnZpY2VzID0ge307XHJcbiAgICAgICAgLy8gY2xvbmUgdGhlIGFycmF5IGFuZCBhZGQgYSBmdW5jdGlvbiB0aGF0IGl0ZXJhdGVzIG92ZXIgdGhlIG9yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgLy8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG4gICAgICAgIHZhciBpbmplY3RQYXJhbWV0ZXJzID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG4gICAgICAgIGluamVjdFBhcmFtZXRlcnMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmplY3RlZFNlcnZpY2VzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpbmplY3RlZFNlcnZpY2VzW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNob3VsZCBnZXQgY2FsbGVkIHdpdGggdGhlIHNlcnZpY2VzIGluamVjdGVkIGJ5IGFuZ3VsYXJcclxuICAgICAgICAgICAgLy8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcbiAgICAgICAgICAgIF8uZWFjaChzZXJ2aWNlTmFtZXMsIGZ1bmN0aW9uIChzZXJ2aWNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYW5ndWxhci5tb2NrLmluamVjdChpbmplY3RQYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gc2VydmljZXM7XHJcbiAgICB9O1xyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLm1vY2sgPSBmdW5jdGlvbiAobW9ja3MpIHtcclxuICAgICAgICBhbmd1bGFyLm1vY2subW9kdWxlKGZ1bmN0aW9uICgkcHJvdmlkZSkge1xyXG4gICAgICAgICAgICBfLmVhY2gobW9ja3MsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBbmd1bGFyRml4dHVyZS5wcm90b3R5cGUuY29udHJvbGxlcldpdGhCaW5kaW5ncyA9IGZ1bmN0aW9uIChjb250cm9sbGVyTmFtZSwgYmluZGluZ3MsIGxvY2Fscywgc2NvcGUpIHtcclxuICAgICAgICB2YXIgc2VydmljZXMgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29udHJvbGxlcicpO1xyXG4gICAgICAgIHZhciAkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuICAgICAgICB2YXIgJGNvbnRyb2xsZXIgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuICAgICAgICBzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcbiAgICAgICAgaWYgKGxvY2FscyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxvY2FscyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAkY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzLCBiaW5kaW5ncyksXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBBbmd1bGFyRml4dHVyZS5wcm90b3R5cGUuZGlyZWN0aXZlID0gZnVuY3Rpb24gKGRvbSkge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb21waWxlJyk7XHJcbiAgICAgICAgdmFyICRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG4gICAgICAgIHZhciAkY29tcGlsZSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG4gICAgICAgIGFuZ3VsYXIubW9jay5tb2R1bGUoJ3Jlbm92b1RlbXBsYXRlcycpO1xyXG4gICAgICAgIHZhciBjb21wb25lbnQgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG4gICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpcmVjdGl2ZTogY29tcG9uZW50LFxyXG4gICAgICAgICAgICBzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFuZ3VsYXJGaXh0dXJlO1xyXG59KSgpO1xyXG5leHBvcnRzLmFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuZ3VsYXJGaXh0dXJlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgbm90aWZpY2F0aW9uX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24nO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ3ZhbGlkYXRpb25GYWN0b3J5JztcclxudmFyIFZhbGlkYXRpb25TZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZhbGlkYXRpb25TZXJ2aWNlKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5uZXh0S2V5ID0gMDtcclxuICAgICAgICB0aGlzLm5vdGlmeUFzRXJyb3IgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBpc0FjdGl2ZSA9IChfLmlzRnVuY3Rpb24oaGFuZGxlci5pc0FjdGl2ZSkgJiYgaGFuZGxlci5pc0FjdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgfHwgaGFuZGxlci5pc0FjdGl2ZSA9PSBudWxsXHJcbiAgICAgICAgICAgICAgICB8fCBoYW5kbGVyLmlzQWN0aXZlID09PSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgID8gaGFuZGxlci5lcnJvck1lc3NhZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIDogaGFuZGxlci5lcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMubm90aWZ5QXNFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ub3RpZmljYXRpb24ud2FybmluZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH07XHJcbiAgICBWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUucmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgY3VycmVudEtleSA9IHRoaXMubmV4dEtleTtcclxuICAgICAgICB0aGlzLm5leHRLZXkrKztcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1trZXldO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5WYWxpZGF0aW9uU2VydmljZSA9IFZhbGlkYXRpb25TZXJ2aWNlO1xyXG52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtub3RpZmljYXRpb25fc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gdmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5KG5vdGlmaWNhdGlvbikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRpb25TZXJ2aWNlKG5vdGlmaWNhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSA9IHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbbm90aWZpY2F0aW9uX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhbGlkYXRpb24uc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbl9fZXhwb3J0KHJlcXVpcmUoJy4vY29tcGFyZVJlc3VsdCcpKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvdHlwZXMvdHlwZXMubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=