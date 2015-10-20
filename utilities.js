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
	var types = __webpack_require__(44);
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
	var date = __webpack_require__(20);
	exports.date = date;
	var fileSize = __webpack_require__(27);
	exports.fileSize = fileSize;
	var genericSearchFilter = __webpack_require__(31);
	exports.genericSearchFilter = genericSearchFilter;
	var moment = __webpack_require__(21);
	exports.moment = moment;
	var notification = __webpack_require__(33);
	exports.notification = notification;
	var numberService = __webpack_require__(28);
	exports.number = numberService;
	var objectService = __webpack_require__(6);
	exports.object = objectService;
	var observable = __webpack_require__(36);
	exports.observable = observable;
	var parentChildBehavior = __webpack_require__(37);
	exports.parentChildBehavior = parentChildBehavior;
	var promise = __webpack_require__(38);
	exports.promise = promise;
	var stringService = __webpack_require__(32);
	exports.string = stringService;
	var synchronizedRequests = __webpack_require__(39);
	exports.synchronizedRequests = synchronizedRequests;
	var test = __webpack_require__(40);
	exports.test = test;
	var time = __webpack_require__(23);
	exports.time = time;
	var validation = __webpack_require__(43);
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
	exports.moduleName = 'rl.utilities.services.baseResourceBuilder';
	exports.serviceName = 'baseResourceBuilder';
	var BaseResourceBuilder = (function () {
	    function BaseResourceBuilder($http, $q, array) {
	        this.$http = $http;
	        this.$q = $q;
	        this.array = array;
	    }
	    BaseResourceBuilder.prototype.createResource = function (endpoint, mockData, transform, useMock) {
	        return new baseData_service_1.BaseDataService(this.$http, this.$q, this.array, endpoint, mockData, transform, useMock);
	    };
	    BaseResourceBuilder.prototype.createParentResource = function (endpoint, mockData, resourceDictionaryBuilder, transform, useMock) {
	        return new baseParentData_service_1.BaseParentDataService(this.$http, this.$q, this.array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock);
	    };
	    BaseResourceBuilder.prototype.createSingletonResource = function (endpoint, mockData, transform, useMock) {
	        return new baseSingletonData_service_1.BaseSingletonDataService(this.$http, this.$q, endpoint, mockData, transform, useMock);
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
	    function BaseDataService($http, $q, array, endpoint, mockData, transform, useMock) {
	        this.$http = $http;
	        this.$q = $q;
	        this.array = array;
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.transform = transform;
	        this.useMock = useMock;
	    }
	    // Build request URL
	    BaseDataService.prototype.getEndpoint = function () {
	        return this.endpoint;
	    };
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
	            promise = this.$http.get(this.getEndpoint(), { params: params })
	                .then(function (response) {
	                return response.data;
	            });
	        }
	        return promise.then(function (data) {
	            if (_this.transform != null) {
	                data = _.map(data, _this.transform);
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
	            return data;
	        });
	    };
	    BaseDataService.prototype.create = function (domainObject) {
	        if (this.useMock) {
	            var nextId = _.max(this.mockData, 'id').id + 1;
	            domainObject.id = nextId;
	            this.mockData.push(domainObject);
	            return this.$q.when(domainObject);
	        }
	        else {
	            return this.$http.post(this.getEndpoint(), JSON.stringify(domainObject))
	                .then(function (result) {
	                return result.data;
	            });
	        }
	    };
	    BaseDataService.prototype.update = function (domainObject) {
	        if (this.useMock) {
	            var oldObject = _.find(this.mockData, _.find(this.mockData, function (item) {
	                return item.id === domainObject.id;
	            }));
	            oldObject = _.assign(oldObject, domainObject);
	            return this.$q.when();
	        }
	        else {
	            return this.$http.put(this.getItemEndpoint(domainObject.id), domainObject).then(function () { return null; });
	        }
	    };
	    BaseDataService.prototype.delete = function (domainObject) {
	        if (this.useMock) {
	            this.array.remove(this.mockData, domainObject);
	            return this.$q.when();
	        }
	        else {
	            return this.$http.delete(this.getItemEndpoint(domainObject.id)).then(function () { return null; });
	        }
	    };
	    return BaseDataService;
	})();
	exports.BaseDataService = BaseDataService;
	baseDataServiceFactory.$inject = ['$http', '$q', array_service_1.serviceName];
	function baseDataServiceFactory($http, $q, array) {
	    return {
	        getInstance: function (endpoint, mockData, transform, useMock) {
	            return new BaseDataService($http, $q, array, endpoint, mockData, transform, useMock);
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
	    function BaseParentDataService($http, $q, array, endpoint, mockData, resourceDictionaryBuilder, transform, useMock) {
	        _super.call(this, $http, $q, array, endpoint, mockData, transform, useMock);
	        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
	    }
	    BaseParentDataService.prototype.childContracts = function (id) {
	        return this.resourceDictionaryBuilder(id);
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
	    function BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock) {
	        this.$http = $http;
	        this.$q = $q;
	        this.endpoint = endpoint;
	        this.mockData = mockData;
	        this.transform = transform;
	        this.useMock = useMock;
	    }
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
	            return data;
	        });
	    };
	    BaseSingletonDataService.prototype.update = function (domainObject) {
	        if (this.useMock) {
	            this.mockData = _.assign(this.mockData, domainObject);
	            return this.$q.when();
	        }
	        else {
	            return this.$http.put(this.endpoint, domainObject).then(function () { return null; });
	        }
	    };
	    return BaseSingletonDataService;
	})();
	exports.BaseSingletonDataService = BaseSingletonDataService;
	baseSingletonDataServiceFactory.$inject = ['$http', '$q'];
	function baseSingletonDataServiceFactory($http, $q) {
	    return {
	        getInstance: function (endpoint, mockData, transform, useMock) {
	            return new BaseSingletonDataService($http, $q, endpoint, mockData, transform, useMock);
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

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var moment_module_1 = __webpack_require__(21);
	var time_service_1 = __webpack_require__(23);
	var date_service_1 = __webpack_require__(24);
	var dateTimeFormatStrings_1 = __webpack_require__(26);
	__export(__webpack_require__(24));
	__export(__webpack_require__(26));
	exports.moduleName = 'rl.utilities.services.date';
	angular.module(exports.moduleName, [moment_module_1.moduleName, time_service_1.moduleName])
	    .service(date_service_1.serviceName, date_service_1.DateUtility)
	    .value(dateTimeFormatStrings_1.dateTimeFormatServiceName, dateTimeFormatStrings_1.defaultFormats);
	//# sourceMappingURL=date.module.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var moment = __webpack_require__(22);
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
/* 22 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var time_service_1 = __webpack_require__(23);
	var moment_module_1 = __webpack_require__(21);
	var compareResult_1 = __webpack_require__(25);
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var number_service_1 = __webpack_require__(28);
	var fileSize_service_1 = __webpack_require__(29);
	var fileSizeFilter_1 = __webpack_require__(30);
	__export(__webpack_require__(29));
	__export(__webpack_require__(30));
	exports.moduleName = 'rl.utilities.services.fileSize';
	angular.module(exports.moduleName, [number_service_1.moduleName])
	    .factory(fileSize_service_1.factoryName, fileSize_service_1.fileSizeFactory)
	    .filter(fileSizeFilter_1.simpleFilterName, fileSizeFilter_1.fileSizeFilter);
	//# sourceMappingURL=fileSize.module.js.map

/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var number_service_1 = __webpack_require__(28);
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fileSize_service_1 = __webpack_require__(29);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var object_service_1 = __webpack_require__(6);
	var string_service_1 = __webpack_require__(32);
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var baseNotifier_1 = __webpack_require__(34);
	__export(__webpack_require__(35));
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
/* 34 */
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
/* 35 */
/***/ function(module, exports) {

	'use strict';
	//# sourceMappingURL=notificationTypes.js.map

/***/ },
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var angular = __webpack_require__(1);
	var mock = __webpack_require__(41);
	exports.mock = mock;
	__export(__webpack_require__(42));
	exports.moduleName = 'rl.utilities.services.test';
	angular.module(exports.moduleName, [
	    mock.moduleName,
	]);
	//# sourceMappingURL=test.module.js.map

/***/ },
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);
	var _ = __webpack_require__(7);
	var notification_service_1 = __webpack_require__(33);
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(25));
	//# sourceMappingURL=types.module.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGRmOGM5ODQzYjRiNDIxNjcwNzYiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9iZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2ZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9maWx0ZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUmVzb3VyY2VCdWlsZGVyL2Jhc2VSZXNvdXJjZUJ1aWxkZXIuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvdHlwZXMvY29tcGFyZVJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvdGVzdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NlcnZpY2VzL3Rlc3QvbW9jay5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3R5cGVzL3R5cGVzLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBRWIsS0FBWSxPQUFPLHVCQUFNLENBQVMsQ0FBQztBQUVuQyxLQUFZLFNBQVMsdUJBQU0sQ0FBOEIsQ0FBQztBQUtqRCxrQkFBUztBQUpsQixLQUFZLE9BQU8sdUJBQU0sQ0FBMEIsQ0FBQztBQUloQyxnQkFBTztBQUgzQixLQUFZLFFBQVEsdUJBQU0sRUFBNEIsQ0FBQztBQUcxQixpQkFBUTtBQUZyQyxLQUFZLEtBQUssdUJBQU0sRUFBc0IsQ0FBQztBQUVQLGNBQUs7QUFFakMsYUFBSSxHQUFXLGNBQWMsQ0FBQztBQUV6QyxRQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtLQUNwQixTQUFTLENBQUMsSUFBSTtLQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1osUUFBUSxDQUFDLFVBQVU7RUFDbkIsQ0FBQyxDQUFDOzs7Ozs7O0FDakJILGNBQWEsa0NBQWtDLEVBQUUsSTs7Ozs7O0FDQWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUQ7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDakdBLGNBQWEsNEJBQTRCLEVBQUUsSTs7Ozs7O0FDQTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWlELHdCQUF3QixFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELGtCQUFrQixFQUFFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsSUFBSTtBQUNiO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDBDOzs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7QUMxQkE7QUFDQSxtQzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDOzs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLG1EOzs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsNEM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHdEOzs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTBELGlCQUFpQjtBQUMzRTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEdBQXlHLGFBQWEsRUFBRTtBQUN4SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQThGLGFBQWEsRUFBRTtBQUM3RztBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qzs7Ozs7O0FDaEhBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsbUQ7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWlGLGFBQWEsRUFBRTtBQUNoRztBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRDs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7OztBQ3RCQSxjQUFhLGlDQUFpQyxFQUFFLEk7Ozs7OztBQ0FoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHlDOzs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxxQ0FBcUMsV0FBVyxFQUFFLEVBQUU7QUFDakUsY0FBYSwwQ0FBMEMseUNBQXlDLEVBQUUsRUFBRTtBQUNwRyxjQUFhLG1DQUFtQyxXQUFXLEVBQUUsRUFBRTtBQUMvRCxjQUFhLG1DQUFtQyxXQUFXLEVBQUUsRUFBRTtBQUMvRCxjQUFhLGlDQUFpQyxXQUFXLEVBQUUsRUFBRTtBQUM3RCxjQUFhLGtDQUFrQyxXQUFXLEVBQUUsRUFBRTtBQUM5RCxjQUFhLGtDQUFrQyxXQUFXLEVBQUUsRUFBRTtBQUM5RCxjQUFhLG9DQUFvQyxXQUFXLEVBQUUsRUFBRTtBQUNoRSxjQUFhLHVDQUF1QyxXQUFXLEVBQUUsRUFBRTtBQUNuRSxjQUFhLHFDQUFxQyxXQUFXLEVBQUUsRUFBRTtBQUNqRSxjQUFhLHNDQUFzQyxXQUFXLEVBQUUsRUFBRTtBQUNsRSxjQUFhLHNDQUFzQyxXQUFXLEVBQUUsRUFBRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLHlDOzs7Ozs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsc0RBQXNEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0Q7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Qzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0JBQW9CO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDJDOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQseURBQXlELEVBQUU7QUFDOUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RDs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLCtEQUE4RCxnQkFBZ0I7QUFDOUUsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEOzs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EseUM7Ozs7OztBQ3ZCQTtBQUNBLDhDOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBa0Qsc0NBQXNDLEVBQUU7QUFDMUYsMENBQXlDLHlCQUF5QixFQUFFO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHdEOzs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsNEM7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUQ7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxpQzs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLDJDOzs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDOzs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDIiwiZmlsZSI6InV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGRmOGM5ODQzYjRiNDIxNjcwNzZcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgYmVoYXZpb3JzIGZyb20gJy4vYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUnO1xyXG5pbXBvcnQgKiBhcyBmaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9maWx0ZXJzLm1vZHVsZSc7XHJcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMvc2VydmljZXMubW9kdWxlJztcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi90eXBlcy90eXBlcy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHsgYmVoYXZpb3JzLCBmaWx0ZXJzLCBzZXJ2aWNlcywgdHlwZXMgfTtcclxuXHJcbmV4cG9ydCB2YXIgbmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0YmVoYXZpb3JzLm5hbWUsXHJcblx0ZmlsdGVycy5uYW1lLFxyXG5cdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcbl0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS91dGlsaXRpZXMudHNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImFuZ3VsYXJcIl07IH0oKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBzdG9wRXZlbnRQcm9wb2dhdGlvbiA9IHJlcXVpcmUoJy4vc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24nKTtcclxuZXhwb3J0cy5zdG9wRXZlbnRQcm9wb2dhdGlvbiA9IHN0b3BFdmVudFByb3BvZ2F0aW9uO1xyXG5leHBvcnRzLm5hbWUgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubmFtZSwgW1xyXG4gICAgc3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJlaGF2aW9ycy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9iZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcbmV4cG9ydHMuZGlyZWN0aXZlTmFtZSA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZGlyZWN0aXZlKGV4cG9ydHMuZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9wRXZlbnRQcm9wYWdhdGlvbi5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL2JlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIGlzRW1wdHkgPSByZXF1aXJlKCcuL2lzRW1wdHkvaXNFbXB0eScpO1xyXG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xyXG52YXIgdHJ1bmNhdGUgPSByZXF1aXJlKCcuL3RydW5jYXRlL3RydW5jYXRlJyk7XHJcbmV4cG9ydHMudHJ1bmNhdGUgPSB0cnVuY2F0ZTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWx0ZXInKSk7XHJcbmV4cG9ydHMubmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubmFtZSwgW1xyXG4gICAgaXNFbXB0eS5tb2R1bGVOYW1lLFxyXG4gICAgdHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlcnMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBvYmplY3Rfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdpc0VtcHR5JztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gZXhwb3J0cy5zZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5pc0VtcHR5LiRpbmplY3QgPSBbb2JqZWN0X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB0cnVlV2hlbkVtcHR5KSB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcbiAgICAgICAgaWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhaXNFbXB0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRW1wdHk7XHJcbiAgICB9O1xyXG59XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW29iamVjdF9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmlsdGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIGlzRW1wdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0VtcHR5LmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYXJyYXlfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnb2JqZWN0VXRpbGl0eSc7XHJcbnZhciBPYmplY3RVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9iamVjdFV0aWxpdHkoYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5pc051bGxPckVtcHR5ID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QgPT09ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS5pc051bGxPcldoaXRlc3BhY2UgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG4gICAgICAgICAgICBvYmplY3QgPSBvYmplY3QudHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUuYXJlRXF1YWwgPSBmdW5jdGlvbiAob2JqMSwgb2JqMikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR5cGUxID0gdHlwZW9mIG9iajE7XHJcbiAgICAgICAgdmFyIHR5cGUyID0gdHlwZW9mIG9iajI7XHJcbiAgICAgICAgaWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgLy9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG4gICAgICAgICAgICB2YXIga2V5czIgPSBfLmtleXMob2JqMik7XHJcbiAgICAgICAgICAgIF8uZm9ySW4ob2JqMSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFycmF5LnJlbW92ZShrZXlzMiwga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgIGlmIChfLmFueShrZXlzMikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcbiAgICAgICAgICAgIHJldHVybiBvYmoxID09PSBvYmoyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICBPYmplY3RVdGlsaXR5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gb2JqZWN0ICsgJyc7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0VXRpbGl0eS5wcm90b3R5cGUudmFsdWVPckRlZmF1bHQgPSBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdFV0aWxpdHkuJGluamVjdCA9IFthcnJheV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2FycmF5X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYmplY3Quc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiX1wiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiX1wiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnYXJyYXlVdGlsaXR5JztcclxudmFyIEFycmF5VXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcnJheVV0aWxpdHkoKSB7XHJcbiAgICB9XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLmZpbmRJbmRleE9mID0gZnVuY3Rpb24gKGFycmF5LCBwcmVkaWNhdGUpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0SW5kZXg7XHJcbiAgICAgICAgXy5lYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuICAgIH07XHJcbiAgICBBcnJheVV0aWxpdHkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChhcnJheSwgaXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleDtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChhcnJheSwgb2xkSXRlbSwgbmV3SXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQXJyYXlVdGlsaXR5LnByb3RvdHlwZS5zdW0gPSBmdW5jdGlvbiAoYXJyYXksIHRyYW5zZm9ybSkge1xyXG4gICAgICAgIHZhciBsaXN0O1xyXG4gICAgICAgIGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsaXN0ID0gXy5tYXAoYXJyYXksIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdCA9IGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXy5yZWR1Y2UobGlzdCwgZnVuY3Rpb24gKHN1bSwgbnVtKSB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG4gICAgfTtcclxuICAgIEFycmF5VXRpbGl0eS5wcm90b3R5cGUudG9EaWN0aW9uYXJ5ID0gZnVuY3Rpb24gKGFycmF5LCBrZXlTZWxlY3Rvcikge1xyXG4gICAgICAgIC8vIG5lZWRzIHRvIGJlIHNlZWRlZCB3aXRoIGFuIG9iamVjdCBvciBpdCB3aWxsIGJlIHZpZXdlZCBhcyBhbiBhcnJheSB3aXRoIG5vIGl0ZW1zXHJcbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKGFycmF5LCBmdW5jdGlvbiAoZGljdGlvbmFyeSwgaXRlbSkge1xyXG4gICAgICAgICAgICBkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXJyYXlVdGlsaXR5O1xyXG59KSgpO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXkuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcbnZhciBvYmplY3Rfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAndHJ1bmNhdGUnO1xyXG5leHBvcnRzLmZpbHRlck5hbWUgPSBleHBvcnRzLnNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcbnRydW5jYXRlLiRpbmplY3QgPSBbb2JqZWN0X3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIHRydW5jYXRlKG9iamVjdFV0aWxpdHkpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIHRydW5jYXRlVG8sIGluY2x1ZGVFbGxpcHNlcykge1xyXG4gICAgICAgIGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcbiAgICAgICAgdmFyIG91dCA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAob3V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dCArPSAnLi4uJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfTtcclxufVxyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtvYmplY3Rfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZpbHRlcihleHBvcnRzLnNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRydW5jYXRlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2UvZmlsdGVycy9maWx0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIGFycmF5ID0gcmVxdWlyZSgnLi9hcnJheS9hcnJheS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuYXJyYXkgPSBhcnJheTtcclxudmFyIGF1dG9zYXZlID0gcmVxdWlyZSgnLi9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuYXV0b3NhdmUgPSBhdXRvc2F2ZTtcclxudmFyIGF1dG9zYXZlQWN0aW9uID0gcmVxdWlyZSgnLi9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuYXV0b3NhdmVBY3Rpb24gPSBhdXRvc2F2ZUFjdGlvbjtcclxudmFyIGJvb2xlYW4gPSByZXF1aXJlKCcuL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuYm9vbGVhbiA9IGJvb2xlYW47XHJcbnZhciBkYXRhQ29udHJhY3RzID0gcmVxdWlyZSgnLi9kYXRhQ29udHJhY3RzL2RhdGFDb250cmFjdHMubW9kdWxlJyk7XHJcbmV4cG9ydHMuZGF0YUNvbnRyYWN0cyA9IGRhdGFDb250cmFjdHM7XHJcbnZhciBkYXRlID0gcmVxdWlyZSgnLi9kYXRlL2RhdGUubW9kdWxlJyk7XHJcbmV4cG9ydHMuZGF0ZSA9IGRhdGU7XHJcbnZhciBmaWxlU2l6ZSA9IHJlcXVpcmUoJy4vZmlsZVNpemUvZmlsZVNpemUubW9kdWxlJyk7XHJcbmV4cG9ydHMuZmlsZVNpemUgPSBmaWxlU2l6ZTtcclxudmFyIGdlbmVyaWNTZWFyY2hGaWx0ZXIgPSByZXF1aXJlKCcuL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMuZ2VuZXJpY1NlYXJjaEZpbHRlciA9IGdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcbnZhciBtb21lbnQgPSByZXF1aXJlKCcuL21vbWVudC9tb21lbnQubW9kdWxlJyk7XHJcbmV4cG9ydHMubW9tZW50ID0gbW9tZW50O1xyXG52YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5ub3RpZmljYXRpb24gPSBub3RpZmljYXRpb247XHJcbnZhciBudW1iZXJTZXJ2aWNlID0gcmVxdWlyZSgnLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5udW1iZXIgPSBudW1iZXJTZXJ2aWNlO1xyXG52YXIgb2JqZWN0U2VydmljZSA9IHJlcXVpcmUoJy4vb2JqZWN0L29iamVjdC5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMub2JqZWN0ID0gb2JqZWN0U2VydmljZTtcclxudmFyIG9ic2VydmFibGUgPSByZXF1aXJlKCcuL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGU7XHJcbnZhciBwYXJlbnRDaGlsZEJlaGF2aW9yID0gcmVxdWlyZSgnLi9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZScpO1xyXG5leHBvcnRzLnBhcmVudENoaWxkQmVoYXZpb3IgPSBwYXJlbnRDaGlsZEJlaGF2aW9yO1xyXG52YXIgcHJvbWlzZSA9IHJlcXVpcmUoJy4vcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5wcm9taXNlID0gcHJvbWlzZTtcclxudmFyIHN0cmluZ1NlcnZpY2UgPSByZXF1aXJlKCcuL3N0cmluZy9zdHJpbmcuc2VydmljZScpO1xyXG5leHBvcnRzLnN0cmluZyA9IHN0cmluZ1NlcnZpY2U7XHJcbnZhciBzeW5jaHJvbml6ZWRSZXF1ZXN0cyA9IHJlcXVpcmUoJy4vc3luY2hyb25pemVkUmVxdWVzdHMvc3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZScpO1xyXG5leHBvcnRzLnN5bmNocm9uaXplZFJlcXVlc3RzID0gc3luY2hyb25pemVkUmVxdWVzdHM7XHJcbnZhciB0ZXN0ID0gcmVxdWlyZSgnLi90ZXN0L3Rlc3QubW9kdWxlJyk7XHJcbmV4cG9ydHMudGVzdCA9IHRlc3Q7XHJcbnZhciB0aW1lID0gcmVxdWlyZSgnLi90aW1lL3RpbWUuc2VydmljZScpO1xyXG5leHBvcnRzLnRpbWUgPSB0aW1lO1xyXG52YXIgdmFsaWRhdGlvbiA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UnKTtcclxuZXhwb3J0cy52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW1xyXG4gICAgYXJyYXkubW9kdWxlTmFtZSxcclxuICAgIGF1dG9zYXZlLm1vZHVsZU5hbWUsXHJcbiAgICBhdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lLFxyXG4gICAgYm9vbGVhbi5tb2R1bGVOYW1lLFxyXG4gICAgZGF0YUNvbnRyYWN0cy5tb2R1bGVOYW1lLFxyXG4gICAgZGF0ZS5tb2R1bGVOYW1lLFxyXG4gICAgZmlsZVNpemUubW9kdWxlTmFtZSxcclxuICAgIGdlbmVyaWNTZWFyY2hGaWx0ZXIubW9kdWxlTmFtZSxcclxuICAgIG1vbWVudC5tb2R1bGVOYW1lLFxyXG4gICAgbm90aWZpY2F0aW9uLm1vZHVsZU5hbWUsXHJcbiAgICBudW1iZXJTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcbiAgICBvYmplY3RTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcbiAgICBvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcbiAgICBwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcbiAgICBwcm9taXNlLm1vZHVsZU5hbWUsXHJcbiAgICBzdHJpbmdTZXJ2aWNlLm1vZHVsZU5hbWUsXHJcbiAgICBzeW5jaHJvbml6ZWRSZXF1ZXN0cy5tb2R1bGVOYW1lLFxyXG4gICAgdGltZS5tb2R1bGVOYW1lLFxyXG4gICAgdGVzdC5tb2R1bGVOYW1lLFxyXG4gICAgdmFsaWRhdGlvbi5tb2R1bGVOYW1lLFxyXG5dKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VydmljZXMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBhdXRvc2F2ZUFjdGlvbl9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUnO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2F1dG9zYXZlRmFjdG9yeSc7XHJcbnZhciBBdXRvc2F2ZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXV0b3NhdmVTZXJ2aWNlKGF1dG9zYXZlU2VydmljZSwgc2F2ZSwgY29udGVudEZvcm0sIHZhbGlkYXRlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmF1dG9zYXZlU2VydmljZSA9IGF1dG9zYXZlU2VydmljZTtcclxuICAgICAgICB0aGlzLnNhdmUgPSBzYXZlO1xyXG4gICAgICAgIHRoaXMuY29udGVudEZvcm0gPSBjb250ZW50Rm9ybTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlID0gdmFsaWRhdGU7XHJcbiAgICAgICAgdGhpcy5hdXRvc2F2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90aGlzLmNvbnRlbnRGb3JtLiRwcmlzdGluZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmhhc1ZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWQgPSBfdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IF90aGlzLnNhdmUuYXBwbHkoX3RoaXMsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKHByb21pc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXV0b3NhdmVTZXJ2aWNlLnRyaWdnZXIocHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvbnRlbnRGb3JtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvbnRlbnRGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFzVmFsaWRhdG9yID0gdmFsaWRhdGUgIT0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50Rm9ybSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudEZvcm0gPSB0aGlzLm51bGxGb3JtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgQXV0b3NhdmVTZXJ2aWNlLnByb3RvdHlwZS5udWxsRm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAkcHJpc3RpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAkc2V0UHJpc3RpbmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBdXRvc2F2ZVNlcnZpY2U7XHJcbn0pKCk7XHJcbmF1dG9zYXZlU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFthdXRvc2F2ZUFjdGlvbl9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KGF1dG9zYXZlU2VydmljZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFthdXRvc2F2ZUFjdGlvbl9zZXJ2aWNlXzEubW9kdWxlTmFtZV0pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0b3NhdmUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2F1dG9zYXZlQWN0aW9uJztcclxudmFyIEF1dG9zYXZlQWN0aW9uU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBdXRvc2F2ZUFjdGlvblNlcnZpY2UoJHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uID0gMTAwMDtcclxuICAgICAgICB0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmF1dG9zYXZlRmFpbGVkID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlc29sdmVBdXRvc2F2ZSA9IGZ1bmN0aW9uIChkYXRhLCBzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgX3RoaXMuX3N1Y2Nlc3NmdWwgPSBzdWNjZXNzO1xyXG4gICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgX3RoaXMuY29tcGxldGVNZXNzYWdlRHVyYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUsIFwic2F2aW5nXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NhdmluZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBdXRvc2F2ZUFjdGlvblNlcnZpY2UucHJvdG90eXBlLCBcImNvbXBsZXRlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEF1dG9zYXZlQWN0aW9uU2VydmljZS5wcm90b3R5cGUsIFwic3VjY2Vzc2Z1bFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWNjZXNzZnVsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgICAgICB0aGlzLl9zYXZpbmcgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmF1dG9zYXZlRmFpbGVkKTtcclxuICAgIH07XHJcbiAgICBBdXRvc2F2ZUFjdGlvblNlcnZpY2UuJGluamVjdCA9IFsnJHRpbWVvdXQnXTtcclxuICAgIHJldHVybiBBdXRvc2F2ZUFjdGlvblNlcnZpY2U7XHJcbn0pKCk7XHJcbm5nLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0b3NhdmVBY3Rpb24uc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdib29sZWFuVXRpbGl0eSc7XHJcbnZhciBCb29sZWFuVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCb29sZWFuVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIEJvb2xlYW5VdGlsaXR5LnByb3RvdHlwZS50b0Jvb2wgPSBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuICEhb2JqZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCb29sZWFuVXRpbGl0eTtcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vbGVhbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnKTtcclxudmFyIGJhc2VEYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxudmFyIGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRhQ29udHJhY3RzJztcclxudmFyIGJhc2VEYXRhX3NlcnZpY2VfMiA9IHJlcXVpcmUoJy4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5CYXNlRGF0YVNlcnZpY2UgPSBiYXNlRGF0YV9zZXJ2aWNlXzIuQmFzZURhdGFTZXJ2aWNlO1xyXG5leHBvcnRzLmJhc2VEYXRhU2VydmljZUZhY3RvcnlOYW1lID0gYmFzZURhdGFfc2VydmljZV8yLmZhY3RvcnlOYW1lO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJykpO1xyXG52YXIgYmFzZVNpbmdsZXRvbkRhdGFfc2VydmljZV8yID0gcmVxdWlyZSgnLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG5leHBvcnRzLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSA9IGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMi5CYXNlU2luZ2xldG9uRGF0YVNlcnZpY2U7XHJcbmV4cG9ydHMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeU5hbWUgPSBiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzIuZmFjdG9yeU5hbWU7XHJcbnZhciBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMiA9IHJlcXVpcmUoJy4vYmFzZVJlc291cmNlQnVpbGRlci9iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UnKTtcclxuZXhwb3J0cy5idWlsZGVyU2VydmljZU5hbWUgPSBiYXNlUmVzb3VyY2VCdWlsZGVyX3NlcnZpY2VfMi5zZXJ2aWNlTmFtZTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXHJcbiAgICBiYXNlRGF0YV9zZXJ2aWNlXzEubW9kdWxlTmFtZSxcclxuICAgIGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMS5tb2R1bGVOYW1lLFxyXG4gICAgYmFzZVJlc291cmNlQnVpbGRlcl9zZXJ2aWNlXzEubW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFDb250cmFjdHMubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9kYXRhQ29udHJhY3RzLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYXJyYXlfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vLi4vYXJyYXkvYXJyYXkuc2VydmljZScpO1xyXG52YXIgYmFzZURhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxudmFyIGJhc2VQYXJlbnREYXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL2Jhc2VQYXJlbnREYXRhU2VydmljZS9iYXNlUGFyZW50RGF0YS5zZXJ2aWNlJyk7XHJcbnZhciBiYXNlU2luZ2xldG9uRGF0YV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9iYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UvYmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ2Jhc2VSZXNvdXJjZUJ1aWxkZXInO1xyXG52YXIgQmFzZVJlc291cmNlQnVpbGRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlUmVzb3VyY2VCdWlsZGVyKCRodHRwLCAkcSwgYXJyYXkpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgIH1cclxuICAgIEJhc2VSZXNvdXJjZUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVJlc291cmNlID0gZnVuY3Rpb24gKGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBiYXNlRGF0YV9zZXJ2aWNlXzEuQmFzZURhdGFTZXJ2aWNlKHRoaXMuJGh0dHAsIHRoaXMuJHEsIHRoaXMuYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrKTtcclxuICAgIH07XHJcbiAgICBCYXNlUmVzb3VyY2VCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVQYXJlbnRSZXNvdXJjZSA9IGZ1bmN0aW9uIChlbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jaykge1xyXG4gICAgICAgIHJldHVybiBuZXcgYmFzZVBhcmVudERhdGFfc2VydmljZV8xLkJhc2VQYXJlbnREYXRhU2VydmljZSh0aGlzLiRodHRwLCB0aGlzLiRxLCB0aGlzLmFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXIsIHRyYW5zZm9ybSwgdXNlTW9jayk7XHJcbiAgICB9O1xyXG4gICAgQmFzZVJlc291cmNlQnVpbGRlci5wcm90b3R5cGUuY3JlYXRlU2luZ2xldG9uUmVzb3VyY2UgPSBmdW5jdGlvbiAoZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2spIHtcclxuICAgICAgICByZXR1cm4gbmV3IGJhc2VTaW5nbGV0b25EYXRhX3NlcnZpY2VfMS5CYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UodGhpcy4kaHR0cCwgdGhpcy4kcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2spO1xyXG4gICAgfTtcclxuICAgIEJhc2VSZXNvdXJjZUJ1aWxkZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnLCBhcnJheV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIEJhc2VSZXNvdXJjZUJ1aWxkZXI7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZVJlc291cmNlQnVpbGRlciA9IEJhc2VSZXNvdXJjZUJ1aWxkZXI7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2FycmF5X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIEJhc2VSZXNvdXJjZUJ1aWxkZXIpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlUmVzb3VyY2VCdWlsZGVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRhQ29udHJhY3RzL2Jhc2VSZXNvdXJjZUJ1aWxkZXIvYmFzZVJlc291cmNlQnVpbGRlci5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBhcnJheV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi8uLi9hcnJheS9hcnJheS5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYmFzZURhdGFTZXJ2aWNlJztcclxuZXhwb3J0cy5mYWN0b3J5TmFtZSA9ICdiYXNlRGF0YVNlcnZpY2UnO1xyXG52YXIgQmFzZURhdGFTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJhc2VEYXRhU2VydmljZSgkaHR0cCwgJHEsIGFycmF5LCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaykge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcclxuICAgICAgICB0aGlzLm1vY2tEYXRhID0gbW9ja0RhdGE7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcbiAgICAgICAgdGhpcy51c2VNb2NrID0gdXNlTW9jaztcclxuICAgIH1cclxuICAgIC8vIEJ1aWxkIHJlcXVlc3QgVVJMXHJcbiAgICBCYXNlRGF0YVNlcnZpY2UucHJvdG90eXBlLmdldEVuZHBvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZHBvaW50O1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZ2V0SXRlbUVuZHBvaW50ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kcG9pbnQgKyAnLycgKyBpZC50b1N0cmluZygpO1xyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZ2V0TGlzdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbih0aGlzLm1vY2tEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRodHRwLmdldCh0aGlzLmdldEVuZHBvaW50KCksIHsgcGFyYW1zOiBwYXJhbXMgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF8ubWFwKGRhdGEsIF90aGlzLnRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZURhdGFTZXJ2aWNlLnByb3RvdHlwZS5nZXREZXRhaWwgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJHEud2hlbihfLmZpbmQodGhpcy5tb2NrRGF0YSwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuJGh0dHAuZ2V0KHRoaXMuZ2V0SXRlbUVuZHBvaW50KGlkKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF90aGlzLnRyYW5zZm9ybShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCYXNlRGF0YVNlcnZpY2UucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW5PYmplY3QpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXh0SWQgPSBfLm1heCh0aGlzLm1vY2tEYXRhLCAnaWQnKS5pZCArIDE7XHJcbiAgICAgICAgICAgIGRvbWFpbk9iamVjdC5pZCA9IG5leHRJZDtcclxuICAgICAgICAgICAgdGhpcy5tb2NrRGF0YS5wdXNoKGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRxLndoZW4oZG9tYWluT2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRodHRwLnBvc3QodGhpcy5nZXRFbmRwb2ludCgpLCBKU09OLnN0cmluZ2lmeShkb21haW5PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQmFzZURhdGFTZXJ2aWNlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluT2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9jaykge1xyXG4gICAgICAgICAgICB2YXIgb2xkT2JqZWN0ID0gXy5maW5kKHRoaXMubW9ja0RhdGEsIF8uZmluZCh0aGlzLm1vY2tEYXRhLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGRvbWFpbk9iamVjdC5pZDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBvbGRPYmplY3QgPSBfLmFzc2lnbihvbGRPYmplY3QsIGRvbWFpbk9iamVjdCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRxLndoZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRodHRwLnB1dCh0aGlzLmdldEl0ZW1FbmRwb2ludChkb21haW5PYmplY3QuaWQpLCBkb21haW5PYmplY3QpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEJhc2VEYXRhU2VydmljZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGRvbWFpbk9iamVjdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vY2spIHtcclxuICAgICAgICAgICAgdGhpcy5hcnJheS5yZW1vdmUodGhpcy5tb2NrRGF0YSwgZG9tYWluT2JqZWN0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEud2hlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAuZGVsZXRlKHRoaXMuZ2V0SXRlbUVuZHBvaW50KGRvbWFpbk9iamVjdC5pZCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlRGF0YVNlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZURhdGFTZXJ2aWNlID0gQmFzZURhdGFTZXJ2aWNlO1xyXG5iYXNlRGF0YVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgYXJyYXlfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSgkaHR0cCwgJHEsIGFycmF5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXNlRGF0YVNlcnZpY2UoJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2spO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuYmFzZURhdGFTZXJ2aWNlRmFjdG9yeSA9IGJhc2VEYXRhU2VydmljZUZhY3Rvcnk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW2FycmF5X3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGV4cG9ydHMuZmFjdG9yeU5hbWUsIGJhc2VEYXRhU2VydmljZUZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlRGF0YS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlRGF0YVNlcnZpY2UvYmFzZURhdGEuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG52YXIgYmFzZURhdGFfc2VydmljZV8xID0gcmVxdWlyZSgnLi4vYmFzZURhdGFTZXJ2aWNlL2Jhc2VEYXRhLnNlcnZpY2UnKTtcclxudmFyIEJhc2VQYXJlbnREYXRhU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQmFzZVBhcmVudERhdGFTZXJ2aWNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQmFzZVBhcmVudERhdGFTZXJ2aWNlKCRodHRwLCAkcSwgYXJyYXksIGVuZHBvaW50LCBtb2NrRGF0YSwgcmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciwgdHJhbnNmb3JtLCB1c2VNb2NrKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJGh0dHAsICRxLCBhcnJheSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2spO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlciA9IHJlc291cmNlRGljdGlvbmFyeUJ1aWxkZXI7XHJcbiAgICB9XHJcbiAgICBCYXNlUGFyZW50RGF0YVNlcnZpY2UucHJvdG90eXBlLmNoaWxkQ29udHJhY3RzID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VEaWN0aW9uYXJ5QnVpbGRlcihpZCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJhc2VQYXJlbnREYXRhU2VydmljZTtcclxufSkoYmFzZURhdGFfc2VydmljZV8xLkJhc2VEYXRhU2VydmljZSk7XHJcbmV4cG9ydHMuQmFzZVBhcmVudERhdGFTZXJ2aWNlID0gQmFzZVBhcmVudERhdGFTZXJ2aWNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlUGFyZW50RGF0YS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0YUNvbnRyYWN0cy9iYXNlUGFyZW50RGF0YVNlcnZpY2UvYmFzZVBhcmVudERhdGEuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJhc2VTaW5nbGV0b25EYXRhU2VydmljZSc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlJztcclxudmFyIEJhc2VTaW5nbGV0b25EYXRhU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UoJGh0dHAsICRxLCBlbmRwb2ludCwgbW9ja0RhdGEsIHRyYW5zZm9ybSwgdXNlTW9jaykge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xyXG4gICAgICAgIHRoaXMubW9ja0RhdGEgPSBtb2NrRGF0YTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuICAgICAgICB0aGlzLnVzZU1vY2sgPSB1c2VNb2NrO1xyXG4gICAgfVxyXG4gICAgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLiRxLndoZW4odGhpcy5tb2NrRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy4kaHR0cC5nZXQodGhpcy5lbmRwb2ludClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IF90aGlzLnRyYW5zZm9ybShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCYXNlU2luZ2xldG9uRGF0YVNlcnZpY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW5PYmplY3QpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9ja0RhdGEgPSBfLmFzc2lnbih0aGlzLm1vY2tEYXRhLCBkb21haW5PYmplY3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcS53aGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kaHR0cC5wdXQodGhpcy5lbmRwb2ludCwgZG9tYWluT2JqZWN0KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLkJhc2VTaW5nbGV0b25EYXRhU2VydmljZSA9IEJhc2VTaW5nbGV0b25EYXRhU2VydmljZTtcclxuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckcSddO1xyXG5mdW5jdGlvbiBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KCRodHRwLCAkcSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gKGVuZHBvaW50LCBtb2NrRGF0YSwgdHJhbnNmb3JtLCB1c2VNb2NrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlKCRodHRwLCAkcSwgZW5kcG9pbnQsIG1vY2tEYXRhLCB0cmFuc2Zvcm0sIHVzZU1vY2spO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlRmFjdG9yeSA9IGJhc2VTaW5nbGV0b25EYXRhU2VydmljZUZhY3Rvcnk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuZmFjdG9yeShleHBvcnRzLmZhY3RvcnlOYW1lLCBiYXNlU2luZ2xldG9uRGF0YVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZVNpbmdsZXRvbkRhdGEuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGFDb250cmFjdHMvYmFzZVNpbmdsZXRvbkRhdGFTZXJ2aWNlL2Jhc2VTaW5nbGV0b25EYXRhLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBtb21lbnRfbW9kdWxlXzEgPSByZXF1aXJlKCcuLi9tb21lbnQvbW9tZW50Lm1vZHVsZScpO1xyXG52YXIgdGltZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi90aW1lL3RpbWUuc2VydmljZScpO1xyXG52YXIgZGF0ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2RhdGUuc2VydmljZScpO1xyXG52YXIgZGF0ZVRpbWVGb3JtYXRTdHJpbmdzXzEgPSByZXF1aXJlKCcuL2RhdGVUaW1lRm9ybWF0U3RyaW5ncycpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2RhdGUuc2VydmljZScpKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9kYXRlVGltZUZvcm1hdFN0cmluZ3MnKSk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW21vbWVudF9tb2R1bGVfMS5tb2R1bGVOYW1lLCB0aW1lX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5zZXJ2aWNlKGRhdGVfc2VydmljZV8xLnNlcnZpY2VOYW1lLCBkYXRlX3NlcnZpY2VfMS5EYXRlVXRpbGl0eSlcclxuICAgIC52YWx1ZShkYXRlVGltZUZvcm1hdFN0cmluZ3NfMS5kYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkYXRlVGltZUZvcm1hdFN0cmluZ3NfMS5kZWZhdWx0Rm9ybWF0cyk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGUubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbW9tZW50V3JhcHBlcic7XHJcbmZ1bmN0aW9uIG1vbWVudFdyYXBwZXIoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICAvLyBVc2luZyBgYW55YCBpbnN0ZWFkIG9mIE1vbWVudFN0YXRpYyBiZWNhdXNlXHJcbiAgICAvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuICAgIC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuICAgIHZhciBtb21lbnRXcmFwcGVyID0gbW9tZW50OyAvLyBtb21lbnQgbXVzdCBhbHJlYWR5IGJlIGxvYWRlZFxyXG4gICAgLy8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcbiAgICAvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcbiAgICAvLyBUaGlzIGFsc28gcHJldmVudHMgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cclxuICAgIG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gbW9tZW50V3JhcHBlcjtcclxufVxyXG5leHBvcnRzLm1vbWVudFdyYXBwZXIgPSBtb21lbnRXcmFwcGVyO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgbW9tZW50V3JhcHBlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vbWVudC5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIm1vbWVudFwiXTsgfSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibW9tZW50XCJcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICd0aW1lVXRpbGl0eSc7XHJcbnZhciBUaW1lVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUaW1lVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb1NlY29uZHMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XHJcbiAgICB9O1xyXG4gICAgVGltZVV0aWxpdHkucHJvdG90eXBlLm1pbGxpc2Vjb25kc1RvTWludXRlcyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG4gICAgfTtcclxuICAgIFRpbWVVdGlsaXR5LnByb3RvdHlwZS5taWxsaXNlY29uZHNUb0hvdXJzID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcbiAgICB9O1xyXG4gICAgVGltZVV0aWxpdHkucHJvdG90eXBlLm1pbGxpc2Vjb25kc1RvRGF5cyA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzKSAvIDI0KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGltZVV0aWxpdHk7XHJcbn0pKCk7XHJcbmV4cG9ydHMuVGltZVV0aWxpdHkgPSBUaW1lVXRpbGl0eTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIFRpbWVVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgdGltZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi90aW1lL3RpbWUuc2VydmljZScpO1xyXG52YXIgbW9tZW50X21vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9tZW50L21vbWVudC5tb2R1bGUnKTtcclxudmFyIGNvbXBhcmVSZXN1bHRfMSA9IHJlcXVpcmUoJy4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQnKTtcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdkYXRlVXRpbGl0eSc7XHJcbnZhciBEYXRlVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEYXRlVXRpbGl0eShtb21lbnQsIHRpbWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubW9tZW50ID0gbW9tZW50O1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy5iYXNlRm9ybWF0ID0gJ01NLURELVlZWVknO1xyXG4gICAgICAgIHRoaXMubW9udGggPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6IGZ1bmN0aW9uICh5ZWFyKSB7IHJldHVybiBfdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdNYXJjaCcsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0FwcmlsJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzA7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnTWF5JywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnSnVuZScsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMwOyB9IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0p1bHknLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMTsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogZnVuY3Rpb24gKCkgeyByZXR1cm4gMzE7IH0gfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiBmdW5jdGlvbiAoKSB7IHJldHVybiAzMDsgfSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDMxOyB9IH0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5pc0xlYXBZZWFyID0gZnVuY3Rpb24gKHllYXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldEZ1bGxTdHJpbmcgPSBmdW5jdGlvbiAobW9udGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZ2V0RGF5cyA9IGZ1bmN0aW9uIChtb250aCwgeWVhcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5zdWJ0cmFjdERhdGVzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICBpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgcmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgcmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgcmVzdWx0Lm1vbnRocyA9IGVuZERhdGUuZ2V0TW9udGgoKSAtIHN0YXJ0RGF0ZS5nZXRNb250aCgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQuZGF5cyA8IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm1vbnRocyAtPSAxO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF5cyArPSB0aGlzLmdldERheXMoc3RhcnREYXRlLmdldE1vbnRoKCksIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC55ZWFycyAtPSAxO1xyXG4gICAgICAgICAgICByZXN1bHQubW9udGhzICs9IDEyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5zdWJ0cmFjdERhdGVJbkRheXMgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgZGF0ZUZvcm1hdCkge1xyXG4gICAgICAgIGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhcnREYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuICAgICAgICB2YXIgZW5kRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuY29tcGFyZURhdGVzID0gZnVuY3Rpb24gKGRhdGUxLCBkYXRlMiwgZGF0ZUZvcm1hdCkge1xyXG4gICAgICAgIC8vIHN1YnRyYWN0RGF0ZUluRGF5cyBzdWJ0cmFjdHMgdGhlIGZpc3QgZnJvbSB0aGUgc2Vjb25kLCBhc3N1bWluZyBzdGFydCBhbmQgZW5kIGRhdGVzXHJcbiAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSB0aGlzLnN1YnRyYWN0RGF0ZUluRGF5cyhkYXRlMiwgZGF0ZTEsIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlUmVzdWx0XzEuZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS5wcm90b3R5cGUuZGF0ZUluUmFuZ2UgPSBmdW5jdGlvbiAoZGF0ZSwgcmFuZ2VTdGFydCwgcmFuZ2VFbmQpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IGNvbXBhcmVSZXN1bHRfMS5Db21wYXJlUmVzdWx0Lmxlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZUVuZCkgPT09IGNvbXBhcmVSZXN1bHRfMS5Db21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERhdGVVdGlsaXR5LnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24gKGRhdGUsIGRhdGVGb3JtYXQpIHtcclxuICAgICAgICB2YXIgZm9ybWF0ID0gZGF0ZUZvcm1hdCAhPSBudWxsID8gZGF0ZUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuICAgICAgICBpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRGF0ZVV0aWxpdHkucHJvdG90eXBlLmdldE5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcclxuICAgIH07XHJcbiAgICBEYXRlVXRpbGl0eS4kaW5qZWN0ID0gW21vbWVudF9tb2R1bGVfMS5zZXJ2aWNlTmFtZSwgdGltZV9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG4gICAgcmV0dXJuIERhdGVVdGlsaXR5O1xyXG59KSgpO1xyXG5leHBvcnRzLkRhdGVVdGlsaXR5ID0gRGF0ZVV0aWxpdHk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGUuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuKGZ1bmN0aW9uIChDb21wYXJlUmVzdWx0KSB7XHJcbiAgICBDb21wYXJlUmVzdWx0W0NvbXBhcmVSZXN1bHRbXCJncmVhdGVyXCJdID0gMV0gPSBcImdyZWF0ZXJcIjtcclxuICAgIENvbXBhcmVSZXN1bHRbQ29tcGFyZVJlc3VsdFtcImVxdWFsXCJdID0gMF0gPSBcImVxdWFsXCI7XHJcbiAgICBDb21wYXJlUmVzdWx0W0NvbXBhcmVSZXN1bHRbXCJsZXNzXCJdID0gLTFdID0gXCJsZXNzXCI7XHJcbn0pKGV4cG9ydHMuQ29tcGFyZVJlc3VsdCB8fCAoZXhwb3J0cy5Db21wYXJlUmVzdWx0ID0ge30pKTtcclxudmFyIENvbXBhcmVSZXN1bHQgPSBleHBvcnRzLkNvbXBhcmVSZXN1bHQ7XHJcbmZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBpZiAobnVtID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChudW0gPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBDb21wYXJlUmVzdWx0Lmxlc3M7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRDb21wYXJlUmVzdWx0ID0gZ2V0Q29tcGFyZVJlc3VsdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcGFyZVJlc3VsdC5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3R5cGVzL2NvbXBhcmVSZXN1bHQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnRzLmRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuZXhwb3J0cy5kZWZhdWx0Rm9ybWF0cyA9IHtcclxuICAgIGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuICAgIGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcbiAgICB0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlVGltZUZvcm1hdFN0cmluZ3MuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxudmFyIG51bWJlcl9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UnKTtcclxudmFyIGZpbGVTaXplX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4vZmlsZVNpemUuc2VydmljZScpO1xyXG52YXIgZmlsZVNpemVGaWx0ZXJfMSA9IHJlcXVpcmUoJy4vZmlsZVNpemVGaWx0ZXInKTtcclxuX19leHBvcnQocmVxdWlyZSgnLi9maWxlU2l6ZS5zZXJ2aWNlJykpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2ZpbGVTaXplRmlsdGVyJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplJztcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbbnVtYmVyX3NlcnZpY2VfMS5tb2R1bGVOYW1lXSlcclxuICAgIC5mYWN0b3J5KGZpbGVTaXplX3NlcnZpY2VfMS5mYWN0b3J5TmFtZSwgZmlsZVNpemVfc2VydmljZV8xLmZpbGVTaXplRmFjdG9yeSlcclxuICAgIC5maWx0ZXIoZmlsZVNpemVGaWx0ZXJfMS5zaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcl8xLmZpbGVTaXplRmlsdGVyKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemUubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdudW1iZXJVdGlsaXR5JztcclxudmFyIFNpZ247XHJcbihmdW5jdGlvbiAoU2lnbikge1xyXG4gICAgU2lnbltTaWduW1wicG9zaXRpdmVcIl0gPSAxXSA9IFwicG9zaXRpdmVcIjtcclxuICAgIFNpZ25bU2lnbltcIm5lZ2F0aXZlXCJdID0gLTFdID0gXCJuZWdhdGl2ZVwiO1xyXG59KShTaWduIHx8IChTaWduID0ge30pKTtcclxudmFyIE51bWJlclV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTnVtYmVyVXRpbGl0eSgpIHtcclxuICAgIH1cclxuICAgIE51bWJlclV0aWxpdHkucHJvdG90eXBlLnByZWNpc2VSb3VuZCA9IGZ1bmN0aW9uIChudW0sIGRlY2ltYWxzKSB7XHJcbiAgICAgICAgdmFyIHNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoc2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuICAgIH07XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5pbnRlZ2VyRGl2aWRlID0gZnVuY3Rpb24gKGRpdmlkZW5kLCBkaXZpc29yKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuICAgIH07XHJcbiAgICBOdW1iZXJVdGlsaXR5LnByb3RvdHlwZS5yb3VuZFRvU3RlcCA9IGZ1bmN0aW9uIChudW0sIHN0ZXApIHtcclxuICAgICAgICBpZiAoIXN0ZXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IG51bSAlIHN0ZXA7XHJcbiAgICAgICAgaWYgKHJlbWFpbmRlciA+PSBzdGVwIC8gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtICsgKHN0ZXAgLSByZW1haW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bSAtIHJlbWFpbmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE51bWJlclV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnVtYmVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbnVtYmVyX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL251bWJlci9udW1iZXIuc2VydmljZScpO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcbnZhciBGaWxlU2l6ZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKSB7XHJcbiAgICAgICAgdGhpcy5CWVRFU19QRVJfR0IgPSAxMDczNzQxODI0O1xyXG4gICAgICAgIHRoaXMuQllURVNfUEVSX01CID0gMTA0ODU3NjtcclxuICAgICAgICB0aGlzLkJZVEVTX1BFUl9LQiA9IDEwMjQ7XHJcbiAgICAgICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xyXG4gICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG4gICAgICAgICAgICB0aGlzLmlzR0IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9HQjtcclxuICAgICAgICAgICAgdGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc0dCID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01CID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTUIgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX01CO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01CID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzS0IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNLQiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG4gICAgfVxyXG4gICAgRmlsZVNpemVTZXJ2aWNlLnByb3RvdHlwZS5kaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzR0IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEZpbGVTaXplU2VydmljZTtcclxufSkoKTtcclxuZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyX3NlcnZpY2VfMS5zZXJ2aWNlTmFtZV07XHJcbmZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZmlsZVNpemVGYWN0b3J5ID0gZmlsZVNpemVGYWN0b3J5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWxlU2l6ZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBmaWxlU2l6ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKCcuL2ZpbGVTaXplLnNlcnZpY2UnKTtcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5leHBvcnRzLnNpbXBsZUZpbHRlck5hbWUgPSAnZmlsZVNpemUnO1xyXG5leHBvcnRzLmZpbHRlck5hbWUgPSBleHBvcnRzLnNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmaWxlU2l6ZV9zZXJ2aWNlXzEuZmFjdG9yeU5hbWVdO1xyXG5mdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3RvcnkpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuICAgICAgICB2YXIgZmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG4gICAgICAgIHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZmlsZVNpemVGaWx0ZXIgPSBmaWxlU2l6ZUZpbHRlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsZVNpemVGaWx0ZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgb2JqZWN0X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL29iamVjdC9vYmplY3Quc2VydmljZScpO1xyXG52YXIgc3RyaW5nX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3N0cmluZy9zdHJpbmcuc2VydmljZScpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuZXhwb3J0cy5maWx0ZXJOYW1lID0gJ3NlYXJjaCc7XHJcbnZhciBHZW5lcmljU2VhcmNoRmlsdGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgICAgICB0aGlzLnR5cGUgPSBleHBvcnRzLmZpbHRlck5hbWU7XHJcbiAgICAgICAgdGhpcy5taW5TZWFyY2hMZW5ndGggPSAxO1xyXG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgR2VuZXJpY1NlYXJjaEZpbHRlci5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpIHx8IHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPCB0aGlzLm1pblNlYXJjaExlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuICAgIH07XHJcbiAgICBHZW5lcmljU2VhcmNoRmlsdGVyLnByb3RvdHlwZS5zZWFyY2hPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gXy52YWx1ZXMoaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmFueSh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhU3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcbiAgICAgICAgICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxufSkoKTtcclxuZXhwb3J0cy5HZW5lcmljU2VhcmNoRmlsdGVyID0gR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Rfc2VydmljZV8xLnNlcnZpY2VOYW1lLCBzdHJpbmdfc2VydmljZV8xLnNlcnZpY2VOYW1lXTtcclxuZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0LCBzdHJpbmdVdGlsaXR5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbb2JqZWN0X3NlcnZpY2VfMS5tb2R1bGVOYW1lLCBzdHJpbmdfc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG52YXIgU3RyaW5nVXRpbGl0eVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3RyaW5nVXRpbGl0eVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBTdHJpbmdVdGlsaXR5U2VydmljZS5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICtzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKHN0ciwgc3Vic3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHN1YnN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIFN0cmluZ1V0aWxpdHlTZXJ2aWNlLnByb3RvdHlwZS5zdWJzdGl0dXRlID0gZnVuY3Rpb24gKGZvcm1hdFN0cmluZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXy5lYWNoKHBhcmFtcywgZnVuY3Rpb24gKHBhcmFtLCBpbmRleCkge1xyXG4gICAgICAgICAgICBmb3JtYXRTdHJpbmcgPSBfdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXRTdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nVXRpbGl0eVNlcnZpY2UucHJvdG90eXBlLnJlcGxhY2VBbGwgPSBmdW5jdGlvbiAoc3RyLCBwYXR0ZXJuVG9GaW5kLCByZXBsYWNlbWVudFN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN0cmluZ1V0aWxpdHlTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlN0cmluZ1V0aWxpdHlTZXJ2aWNlID0gU3RyaW5nVXRpbGl0eVNlcnZpY2U7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmluZy5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgYmFzZU5vdGlmaWVyXzEgPSByZXF1aXJlKCcuL2Jhc2VOb3RpZmllcicpO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL25vdGlmaWNhdGlvblR5cGVzJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbic7XHJcbmV4cG9ydHMuc2VydmljZU5hbWUgPSAnbm90aWZpY2F0aW9uJztcclxudmFyIE5vdGlmaWNhdGlvblNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTm90aWZpY2F0aW9uU2VydmljZShub3RpZmllcikge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuICAgIH1cclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS53YXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgTm90aWZpY2F0aW9uU2VydmljZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLk5vdGlmaWNhdGlvblNlcnZpY2UgPSBOb3RpZmljYXRpb25TZXJ2aWNlO1xyXG5mdW5jdGlvbiBub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgdmFyIHByb3ZpZGVyID0ge1xyXG4gICAgICAgIG5vdGlmaWVyOiBuZXcgYmFzZU5vdGlmaWVyXzEuQmFzZU5vdGlmaWVyKCksXHJcbiAgICAgICAgc2V0Tm90aWZpZXI6IGZ1bmN0aW9uIChub3RpZmllcikge1xyXG4gICAgICAgICAgICBfdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UoX3RoaXMubm90aWZpZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHByb3ZpZGVyO1xyXG59XHJcbmV4cG9ydHMubm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyID0gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnByb3ZpZGVyKGV4cG9ydHMuc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIEJhc2VOb3RpZmllciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlTm90aWZpZXIoKSB7XHJcbiAgICB9XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIEJhc2VOb3RpZmllci5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgQmFzZU5vdGlmaWVyLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBCYXNlTm90aWZpZXIucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlTm90aWZpZXI7XHJcbn0pKCk7XHJcbmV4cG9ydHMuQmFzZU5vdGlmaWVyID0gQmFzZU5vdGlmaWVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlTm90aWZpZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vYmFzZU5vdGlmaWVyLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90aWZpY2F0aW9uVHlwZXMuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgbmcgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG52YXIgT2JzZXJ2YWJsZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMubmV4dEtleSA9IDA7XHJcbiAgICB9XHJcbiAgICBPYnNlcnZhYmxlU2VydmljZS5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEtleSA9IHRoaXMubmV4dEtleTtcclxuICAgICAgICB0aGlzLm5leHRLZXkrKztcclxuICAgICAgICB0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcclxuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgcGFyYW1zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoZnVuY3Rpb24gKHdhdGNoZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh3YXRjaGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseShfdGhpcywgcGFyYW1zKTtcclxuICAgICAgICB9KS52YWx1ZSgpO1xyXG4gICAgfTtcclxuICAgIE9ic2VydmFibGVTZXJ2aWNlLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9ic2VydmFibGVTZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLk9ic2VydmFibGVTZXJ2aWNlID0gT2JzZXJ2YWJsZVNlcnZpY2U7XHJcbmZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkgPSBvYnNlcnZhYmxlU2VydmljZUZhY3Rvcnk7XHJcbm5nLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuZXhwb3J0cy5tb2R1bGVOYW1lID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxudmFyIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLmdldENoaWxkQmVoYXZpb3IgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG4gICAgICAgICAgICA/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUudHJpZ2dlckNoaWxkQmVoYXZpb3IgPSBmdW5jdGlvbiAoY2hpbGQsIGFjdGlvbikge1xyXG4gICAgICAgIHZhciBiZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcbiAgICAgICAgaWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucHJvdG90eXBlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyA9IGZ1bmN0aW9uIChjaGlsZExpc3QsIGFjdGlvbikge1xyXG4gICAgICAgIHZhciBiZWhhdmlvcnMgPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgZnVuY3Rpb24gKGJlaGF2aW9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnByb3RvdHlwZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyA9IGZ1bmN0aW9uIChjaGlsZExpc3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBfKGNoaWxkTGlzdCkubWFwKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gX3RoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7IH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGJlaGF2aW9yKSB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG4gICAgICAgICAgICAudmFsdWUoKTtcclxuICAgIH07XHJcbiAgICBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5wcm90b3R5cGUucmVnaXN0ZXJDaGlsZEJlaGF2aW9yID0gZnVuY3Rpb24gKGNoaWxkLCBiZWhhdmlvcikge1xyXG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50QmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuICAgICAgICBpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gXy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZTtcclxufSkoKTtcclxuZXhwb3J0cy5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSA9IFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLnNlcnZpY2UoZXhwb3J0cy5zZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5leHBvcnRzLnNlcnZpY2VOYW1lID0gJ3Byb21pc2VVdGlsaXR5JztcclxudmFyIFByb21pc2VVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFByb21pc2VVdGlsaXR5KCRxLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kaW5qZWN0b3IgPSAkaW5qZWN0b3I7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlVXRpbGl0eS5wcm90b3R5cGUuaXNQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcbiAgICB9O1xyXG4gICAgUHJvbWlzZVV0aWxpdHkucHJvdG90eXBlLnJlc29sdmVQcm9taXNlcyA9IGZ1bmN0aW9uIChyZXNvbHZlcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHByb21pc2VzID0ge307XHJcbiAgICAgICAgXy5lYWNoKHJlc29sdmVzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfLmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlc1trZXldID0gKF90aGlzLiRxLndoZW4oX3RoaXMuJGluamVjdG9yLmludm9rZSh2YWx1ZSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXNba2V5XSA9IChfdGhpcy4kcS53aGVuKF90aGlzLiRpbmplY3Rvci5nZXQodmFsdWUpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlc1trZXldID0gKF90aGlzLiRxLndoZW4odmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRxLmFsbChwcm9taXNlcyk7XHJcbiAgICB9O1xyXG4gICAgUHJvbWlzZVV0aWxpdHkuJGluamVjdCA9IFsnJHEnLCAnJGluamVjdG9yJ107XHJcbiAgICByZXR1cm4gUHJvbWlzZVV0aWxpdHk7XHJcbn0pKCk7XHJcbmFuZ3VsYXIubW9kdWxlKGV4cG9ydHMubW9kdWxlTmFtZSwgW10pXHJcbiAgICAuc2VydmljZShleHBvcnRzLnNlcnZpY2VOYW1lLCBQcm9taXNlVXRpbGl0eSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2Uuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3luY2hyb25pemVkUmVxdWVzdHMnO1xyXG5leHBvcnRzLmZhY3RvcnlOYW1lID0gJ3N5bmNocm9uaXplZFJlcXVlc3RzJztcclxudmFyIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2UoZGF0YVByb3ZpZGVyLCBoYW5kbGVSZXF1ZXN0LCAkcSkge1xyXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gZGF0YVByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUmVxdWVzdCA9IGhhbmRsZVJlcXVlc3Q7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdElkID0gMDtcclxuICAgIH1cclxuICAgIFN5bmNocm9uaXplZFJlcXVlc3RzU2VydmljZS5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBwYXJhbXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluY3JlbWVudCB0aGUgaWQgZmlyc3QgLSBzaG91bGQgbWF0Y2ggY3VycmVudCByZXF1ZXN0IGlkXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWQrKztcclxuICAgICAgICB2YXIgY3VycmVudFJlcXVlc3RJZCA9IHRoaXMucmVxdWVzdElkO1xyXG4gICAgICAgIHRoaXMuJHEud2hlbih0aGlzLmRhdGFQcm92aWRlci5hcHBseSh0aGlzLCBwYXJhbXMpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRSZXF1ZXN0SWQgPT0gX3RoaXMucmVxdWVzdElkKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVSZXF1ZXN0LmFwcGx5KF90aGlzLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTeW5jaHJvbml6ZWRSZXF1ZXN0c1NlcnZpY2U7XHJcbn0pKCk7XHJcbmV4cG9ydHMuU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlID0gU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlO1xyXG5zeW5jaHJvbml6ZWRSZXF1ZXN0c0ZhY3RvcnkuJGluamVjdCA9IFsnJHEnXTtcclxuZnVuY3Rpb24gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KCRxKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoZGF0YVByb3ZpZGVyLCBoYW5kbGVSZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3luY2hyb25pemVkUmVxdWVzdHNTZXJ2aWNlKGRhdGFQcm92aWRlciwgaGFuZGxlUmVxdWVzdCwgJHEpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5ID0gc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5O1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgc3luY2hyb25pemVkUmVxdWVzdHNGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3luY2hyb25pemVkUmVxdWVzdHMuc2VydmljZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc291cmNlL3NlcnZpY2VzL3N5bmNocm9uaXplZFJlcXVlc3RzL3N5bmNocm9uaXplZFJlcXVlc3RzLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG52YXIgbW9jayA9IHJlcXVpcmUoJy4vbW9jaycpO1xyXG5leHBvcnRzLm1vY2sgPSBtb2NrO1xyXG5fX2V4cG9ydChyZXF1aXJlKCcuL2FuZ3VsYXJGaXh0dXJlJykpO1xyXG5leHBvcnRzLm1vZHVsZU5hbWUgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QnO1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtcclxuICAgIG1vY2subW9kdWxlTmFtZSxcclxuXSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlc3QubW9kdWxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC90ZXN0Lm1vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIHVzZXMgc2lub24gYnV0IGNhbid0IGltcG9ydCBiZWNhdXNlIHNpbm9uIHVzZXMgZHluYW1pYyByZXF1aXJlc1xyXG4vLyBzaW5vbiB0eXBlcyB3aWxsIGJlIHJlc29sdmVkIGZyb20gdHNkLmQudHNcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5tb2NrJztcclxuZXhwb3J0cy5zZXJ2aWNlTmFtZSA9ICdtb2NrVXRpbGl0eSc7XHJcbnZhciBNb2NrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vY2soJHEsICRyb290U2NvcGUpIHtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuICAgIE1vY2sucHJvdG90eXBlLnNlcnZpY2UgPSBmdW5jdGlvbiAoc2VydmljZSkge1xyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHNlcnZpY2UpKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH07XHJcbiAgICBNb2NrLnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gKHNlcnZpY2UsIG1ldGhvZE5hbWUsIGRhdGEsIHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuICAgICAgICAgICAgc3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBfdGhpcy4kcS5kZWZlcigpO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHByb21pc2U6IGRlZmVycmVkLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNb2NrLnByb3RvdHlwZS5wcm9taXNlV2l0aENhbGxiYWNrID0gZnVuY3Rpb24gKHNlcnZpY2UsIG1ldGhvZE5hbWUsIGNhbGxiYWNrLCBzdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF90aGlzLiRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTogZGVmZXJyZWQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBjYWxsYmFjay5hcHBseShfdGhpcywgcGFyYW1zKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNb2NrLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChzZXJ2aWNlLCBzY29wZSkge1xyXG4gICAgICAgIC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuICAgICAgICB2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0cyA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG4gICAgICAgIHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcbiAgICAgICAgLy8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuICAgICAgICAvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0XHJcbiAgICAgICAgLy8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuICAgICAgICBfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICB9O1xyXG4gICAgTW9jay4kaW5qZWN0ID0gWyckcScsICckcm9vdFNjb3BlJ107XHJcbiAgICByZXR1cm4gTW9jaztcclxufSkoKTtcclxuYW5ndWxhci5tb2R1bGUoZXhwb3J0cy5tb2R1bGVOYW1lLCBbXSlcclxuICAgIC5zZXJ2aWNlKGV4cG9ydHMuc2VydmljZU5hbWUsIE1vY2spO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2NrLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdGVzdC9tb2NrLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItbW9ja3MnKTtcclxudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIEFuZ3VsYXJGaXh0dXJlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFuZ3VsYXJGaXh0dXJlKCkge1xyXG4gICAgfVxyXG4gICAgQW5ndWxhckZpeHR1cmUucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VydmljZU5hbWVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgc2VydmljZU5hbWVzW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuICAgICAgICB2YXIgc2VydmljZXMgPSB7fTtcclxuICAgICAgICAvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcbiAgICAgICAgdmFyIGluamVjdFBhcmFtZXRlcnMgPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcbiAgICAgICAgaW5qZWN0UGFyYW1ldGVycy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGluamVjdGVkU2VydmljZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGluamVjdGVkU2VydmljZXNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2hvdWxkIGdldCBjYWxsZWQgd2l0aCB0aGUgc2VydmljZXMgaW5qZWN0ZWQgYnkgYW5ndWxhclxyXG4gICAgICAgICAgICAvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuICAgICAgICAgICAgXy5lYWNoKHNlcnZpY2VOYW1lcywgZnVuY3Rpb24gKHNlcnZpY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcclxuICAgIH07XHJcbiAgICBBbmd1bGFyRml4dHVyZS5wcm90b3R5cGUubW9jayA9IGZ1bmN0aW9uIChtb2Nrcykge1xyXG4gICAgICAgIGFuZ3VsYXIubW9jay5tb2R1bGUoZnVuY3Rpb24gKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChtb2NrcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICRwcm92aWRlLnZhbHVlKGtleS50b1N0cmluZygpLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5jb250cm9sbGVyV2l0aEJpbmRpbmdzID0gZnVuY3Rpb24gKGNvbnRyb2xsZXJOYW1lLCBiaW5kaW5ncywgbG9jYWxzLCBzY29wZSkge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcbiAgICAgICAgdmFyICRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG4gICAgICAgIHZhciAkY29udHJvbGxlciA9IHNlcnZpY2VzLiRjb250cm9sbGVyO1xyXG4gICAgICAgIHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuICAgICAgICBpZiAobG9jYWxzID09IG51bGwpIHtcclxuICAgICAgICAgICAgbG9jYWxzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMsIGJpbmRpbmdzKSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEFuZ3VsYXJGaXh0dXJlLnByb3RvdHlwZS5kaXJlY3RpdmUgPSBmdW5jdGlvbiAoZG9tKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuICAgICAgICB2YXIgJHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcbiAgICAgICAgdmFyICRjb21waWxlID0gc2VydmljZXMuJGNvbXBpbGU7XHJcbiAgICAgICAgYW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9ICRjb21waWxlKGRvbSkoJHJvb3RTY29wZSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcbiAgICAgICAgICAgIHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQW5ndWxhckZpeHR1cmU7XHJcbn0pKCk7XHJcbmV4cG9ydHMuYW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5ndWxhckZpeHR1cmUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBub3RpZmljYXRpb25fc2VydmljZV8xID0gcmVxdWlyZSgnLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJyk7XHJcbmV4cG9ydHMubW9kdWxlTmFtZSA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcbmV4cG9ydHMuZmFjdG9yeU5hbWUgPSAndmFsaWRhdGlvbkZhY3RvcnknO1xyXG52YXIgVmFsaWRhdGlvblNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVmFsaWRhdGlvblNlcnZpY2Uobm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24gPSBub3RpZmljYXRpb247XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnMgPSB7fTtcclxuICAgICAgICB0aGlzLm5leHRLZXkgPSAwO1xyXG4gICAgICAgIHRoaXMubm90aWZ5QXNFcnJvciA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgVmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLnZhbGlkYXRpb25IYW5kbGVycywgZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGlzQWN0aXZlID0gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiBoYW5kbGVyLmlzQWN0aXZlKCkpXHJcbiAgICAgICAgICAgICAgICB8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuICAgICAgICAgICAgICAgIHx8IGhhbmRsZXIuaXNBY3RpdmUgPT09IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBfLmlzRnVuY3Rpb24oaGFuZGxlci5lcnJvck1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBoYW5kbGVyLmVycm9yTWVzc2FnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBoYW5kbGVyLmVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5ub3RpZnlBc0Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfTtcclxuICAgIFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5yZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjdXJyZW50S2V5ID0gdGhpcy5uZXh0S2V5O1xyXG4gICAgICAgIHRoaXMubmV4dEtleSsrO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2N1cnJlbnRLZXldID0gaGFuZGxlcjtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgVmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2tleV07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25TZXJ2aWNlO1xyXG59KSgpO1xyXG5leHBvcnRzLlZhbGlkYXRpb25TZXJ2aWNlID0gVmFsaWRhdGlvblNlcnZpY2U7XHJcbnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW25vdGlmaWNhdGlvbl9zZXJ2aWNlXzEuc2VydmljZU5hbWVdO1xyXG5mdW5jdGlvbiB2YWxpZGF0aW9uU2VydmljZUZhY3Rvcnkobm90aWZpY2F0aW9uKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdGlvblNlcnZpY2Uobm90aWZpY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMudmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5ID0gdmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5O1xyXG5hbmd1bGFyLm1vZHVsZShleHBvcnRzLm1vZHVsZU5hbWUsIFtub3RpZmljYXRpb25fc2VydmljZV8xLm1vZHVsZU5hbWVdKVxyXG4gICAgLmZhY3RvcnkoZXhwb3J0cy5mYWN0b3J5TmFtZSwgdmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmFsaWRhdGlvbi5zZXJ2aWNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zb3VyY2Uvc2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuX19leHBvcnQocmVxdWlyZSgnLi9jb21wYXJlUmVzdWx0JykpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5tb2R1bGUuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NvdXJjZS90eXBlcy90eXBlcy5tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==