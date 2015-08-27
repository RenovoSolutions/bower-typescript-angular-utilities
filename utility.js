// uses typings/angular
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var behaviors;
        (function (behaviors) {
            var stopEventPropogation;
            (function (stopEventPropogation) {
                'use strict';
                stopEventPropogation.moduleName = 'rl.utilities.behaviors.stopEventPropogation';
                stopEventPropogation.directiveName = 'rlStopEventPropagation';
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
                angular.module(stopEventPropogation.moduleName, [])
                    .directive(stopEventPropogation.directiveName, stopEventPropagation);
            })(stopEventPropogation = behaviors.stopEventPropogation || (behaviors.stopEventPropogation = {}));
        })(behaviors = utilities.behaviors || (utilities.behaviors = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var array;
            (function (array_1) {
                'use strict';
                array_1.moduleName = 'rl.utilities.services.array';
                array_1.serviceName = 'arrayUtility';
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
                        return _.reduce(array, function (dictionary, item) {
                            dictionary[keySelector(item)] = item;
                            return dictionary;
                        }, []);
                    };
                    return ArrayUtility;
                })();
                angular.module(array_1.moduleName, [])
                    .service(array_1.serviceName, ArrayUtility);
            })(array = services.array || (services.array = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
/// <reference path='../array/array.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var object;
            (function (object_1) {
                'use strict';
                object_1.moduleName = 'rl.utilities.services.object';
                object_1.serviceName = 'objectUtility';
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
                    ObjectUtility.$inject = [services.array.serviceName];
                    return ObjectUtility;
                })();
                angular.module(object_1.moduleName, [services.array.moduleName])
                    .service(object_1.serviceName, ObjectUtility);
            })(object = services.object || (services.object = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
/// <reference path='../../services/object/object.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var isEmpty;
            (function (isEmpty_1) {
                'use strict';
                var __object = rl.utilities.services.object;
                isEmpty_1.moduleName = 'rl.utilities.filters.isEmpty';
                isEmpty_1.serviceName = 'isEmpty';
                isEmpty_1.filterName = isEmpty_1.serviceName + 'Filter';
                isEmpty.$inject = [__object.serviceName];
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
                angular.module(isEmpty_1.moduleName, [__object.moduleName])
                    .filter(isEmpty_1.serviceName, isEmpty);
            })(isEmpty = filters.isEmpty || (filters.isEmpty = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
/// <reference path='../../services/object/object.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var truncate;
            (function (truncate_1) {
                'use strict';
                var __object = rl.utilities.services.object;
                truncate_1.moduleName = 'rl21.utilities.filters.truncate';
                truncate_1.serviceName = 'truncate';
                truncate_1.filterName = truncate_1.serviceName + 'Filter';
                truncate.$inject = [__object.serviceName];
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
                angular.module(truncate_1.moduleName, [__object.moduleName])
                    .filter(truncate_1.serviceName, truncate);
            })(truncate = filters.truncate || (filters.truncate = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var autosaveAction;
            (function (autosaveAction) {
                'use strict';
                autosaveAction.moduleName = 'rl.utilities.services.autosaveAction';
                autosaveAction.serviceName = 'autosaveAction';
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
                angular.module(autosaveAction.moduleName, [])
                    .service(autosaveAction.serviceName, AutosaveActionService);
            })(autosaveAction = services.autosaveAction || (services.autosaveAction = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
/// <reference path='../autosaveAction/autosaveAction.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var autosave;
            (function (autosave) {
                'use strict';
                var __autosaveAction = rl.utilities.services.autosaveAction;
                autosave.moduleName = 'rl.utilities.services.autosave';
                autosave.factoryName = 'autosaveFactory';
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
                                _this.autosaveService.trigger(_this.save.apply(_this, data).then(function () {
                                    if (_this.contentForm != null) {
                                        _this.contentForm.$setPristine();
                                    }
                                }));
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
                autosaveServiceFactory.$inject = [__autosaveAction.serviceName];
                function autosaveServiceFactory(autosaveService) {
                    'use strict';
                    return {
                        getInstance: function (save, contentForm, validate) {
                            return new AutosaveService(autosaveService, save, contentForm, validate);
                        }
                    };
                }
                angular.module(autosave.moduleName, [__autosaveAction.moduleName])
                    .factory(autosave.factoryName, autosaveServiceFactory);
            })(autosave = services.autosave || (services.autosave = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var boolean;
            (function (boolean) {
                'use strict';
                boolean.moduleName = 'rl.utilities.services.boolean';
                boolean.serviceName = 'booleanUtility';
                var BooleanUtility = (function () {
                    function BooleanUtility() {
                    }
                    BooleanUtility.prototype.toBool = function (object) {
                        return !!object;
                    };
                    return BooleanUtility;
                })();
                angular.module(boolean.moduleName, [])
                    .service(boolean.serviceName, BooleanUtility);
            })(boolean = services.boolean || (services.boolean = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var observable;
            (function (observable) {
                'use strict';
                observable.moduleName = 'rl.utilities.services.observable';
                observable.factoryName = 'observableFactory';
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
                observable.ObservableService = ObservableService;
                function observableServiceFactory() {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new ObservableService();
                        }
                    };
                }
                observable.observableServiceFactory = observableServiceFactory;
                angular.module(observable.moduleName, [])
                    .factory(observable.factoryName, observableServiceFactory);
            })(observable = services.observable || (services.observable = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/jquery
// uses typings/lodash
/// <reference path='../observable/observable.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var contentProvider;
            (function (contentProvider) {
                'use strict';
                contentProvider.moduleName = 'rl.utilities.services.contentProvider';
                contentProvider.serviceName = 'contentProviderFactory';
                var ContentProviderService = (function () {
                    function ContentProviderService(observableFactory) {
                        var _this = this;
                        this.setTranscludeContent = function (transcludeFunction) {
                            if (_.isFunction(transcludeFunction)) {
                                transcludeFunction(function (clone) {
                                    _this.setContent(clone);
                                });
                            }
                            else {
                                _this.setContent(null);
                            }
                        };
                        this.observable = observableFactory.getInstance();
                    }
                    ContentProviderService.prototype.setContent = function (content) {
                        this.content = content;
                        this.observable.fire('contentChanged');
                    };
                    ContentProviderService.prototype.register = function (action, selector) {
                        var _this = this;
                        if (this.content != null) {
                            action(this.getContent(selector));
                        }
                        return this.observable.register(function () {
                            action(_this.getContent(selector));
                        }, 'contentChanged');
                    };
                    ContentProviderService.prototype.getContent = function (selector) {
                        if (selector != null) {
                            return this.content.filter(selector);
                        }
                        return this.content;
                    };
                    return ContentProviderService;
                })();
                contentProviderServiceFactory.$inject = [services.observable.factoryName];
                function contentProviderServiceFactory(observableFactory) {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new ContentProviderService(observableFactory);
                        }
                    };
                }
                angular.module(contentProvider.moduleName, [services.observable.moduleName])
                    .factory(contentProvider.serviceName, contentProviderServiceFactory);
            })(contentProvider = services.contentProvider || (services.contentProvider = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var time;
            (function (time) {
                'use strict';
                time.moduleName = 'rl.utilities.services.time';
                time.serviceName = 'timeUtility';
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
                time.TimeUtility = TimeUtility;
                angular.module(time.moduleName, [])
                    .service(time.serviceName, TimeUtility);
            })(time = services.time || (services.time = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var momentWrapper;
            (function (momentWrapper_1) {
                momentWrapper_1.moduleName = 'rl.utilities.services.momentWrapper';
                momentWrapper_1.serviceName = 'momentWrapper';
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
                momentWrapper_1.momentWrapper = momentWrapper;
                angular.module(momentWrapper_1.moduleName, [])
                    .factory(momentWrapper_1.serviceName, momentWrapper);
            })(momentWrapper = services.momentWrapper || (services.momentWrapper = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var types;
        (function (types) {
            var compareResult;
            (function (compareResult) {
                'use strict';
                compareResult.moduleName = 'rl.utilities.types.compareResult';
                (function (CompareResult) {
                    CompareResult[CompareResult["greater"] = 1] = "greater";
                    CompareResult[CompareResult["equal"] = 0] = "equal";
                    CompareResult[CompareResult["less"] = -1] = "less";
                })(compareResult.CompareResult || (compareResult.CompareResult = {}));
                var CompareResult = compareResult.CompareResult;
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
                compareResult.getCompareResult = getCompareResult;
            })(compareResult = types.compareResult || (types.compareResult = {}));
        })(types = utilities.types || (utilities.types = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path="../time/time.service.ts" />
/// <reference path="../moment/moment.module.ts" />
/// <reference path="../../types/compareResult.ts" />
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date_1) {
                'use strict';
                var compareResult = rl.utilities.types.compareResult;
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
                        return compareResult.getCompareResult(difference);
                    };
                    DateUtility.prototype.dateInRange = function (date, rangeStart, rangeEnd) {
                        if (this.compareDates(date, rangeStart) === compareResult.CompareResult.less) {
                            return false;
                        }
                        else if (this.compareDates(date, rangeEnd) === compareResult.CompareResult.greater) {
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
                    DateUtility.$inject = [services.momentWrapper.serviceName, services.time.serviceName];
                    return DateUtility;
                })();
                date_1.DateUtility = DateUtility;
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                date.dateTimeFormatServiceName = 'dateTimeFormatStrings';
                date.defaultFormats = {
                    dateTimeFormat: 'M/D/YYYY h:mm A',
                    dateFormat: 'M/D/YYYY',
                    timeFormat: 'h:mmA',
                };
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='date.service.ts' />
/// <reference path='dateTimeFormatStrings.ts' />
/// <reference path='../time/time.service.ts' />
/// <reference path='../moment/moment.module.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                date.moduleName = 'rl.utilities.services.date';
                date.serviceName = 'dateUtility';
                angular.module(date.moduleName, [services.momentWrapper.moduleName, services.time.moduleName])
                    .service(date.serviceName, date.DateUtility)
                    .value(date.dateTimeFormatServiceName, date.defaultFormats);
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var number;
            (function (number) {
                'use strict';
                number.moduleName = 'rl.utilities.services.number';
                number.serviceName = 'numberUtility';
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
                    return NumberUtility;
                })();
                angular.module(number.moduleName, [])
                    .service(number.serviceName, NumberUtility);
            })(number = services.number || (services.number = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../number/number.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var fileSize;
            (function (fileSize) {
                fileSize.factoryName = 'fileSizeFactory';
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
                fileSizeFactory.$inject = [services.number.serviceName];
                function fileSizeFactory(numberUtility) {
                    'use strict';
                    return {
                        getInstance: function (bytes) {
                            return new FileSizeService(numberUtility, bytes);
                        },
                    };
                }
                fileSize.fileSizeFactory = fileSizeFactory;
            })(fileSize = services.fileSize || (services.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
/// <reference path='fileSize.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var fileSize;
            (function (fileSize_1) {
                'use strict';
                fileSize_1.simpleFilterName = 'fileSize';
                fileSize_1.filterName = fileSize_1.simpleFilterName + 'Filter';
                fileSizeFilter.$inject = [fileSize_1.factoryName];
                function fileSizeFilter(fileSizeFactory) {
                    'use strict';
                    return function (bytes) {
                        var fileSize = fileSizeFactory.getInstance(bytes);
                        return fileSize.display();
                    };
                }
                fileSize_1.fileSizeFilter = fileSizeFilter;
            })(fileSize = services.fileSize || (services.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
/// <reference path='../number/number.service.ts' />
/// <reference path='fileSize.service.ts' />
/// <reference path='fileSizeFilter.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var fileSize;
            (function (fileSize) {
                'use strict';
                fileSize.moduleName = 'rl21.utilities.services.fileSize';
                angular.module(fileSize.moduleName, [services.number.moduleName])
                    .factory(fileSize.factoryName, fileSize.fileSizeFactory)
                    .filter(fileSize.simpleFilterName, fileSize.fileSizeFilter);
            })(fileSize = services.fileSize || (services.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var string;
            (function (string_1) {
                'use strict';
                string_1.moduleName = 'rl.utilities.services.string';
                string_1.serviceName = 'stringUtilityService';
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
                string_1.StringUtilityService = StringUtilityService;
                angular.module(string_1.moduleName, [])
                    .service(string_1.serviceName, StringUtilityService);
            })(string = services.string || (services.string = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filter;
        (function (filter) {
            'use strict';
            filter.moduleName = 'rl.utilities.filter';
        })(filter = utilities.filter || (utilities.filter = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../object/object.service.ts' />
/// <reference path='../string/string.service.ts' />
/// <reference path='../../filters/filter.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var genericSearchFilter;
            (function (genericSearchFilter) {
                'use strict';
                genericSearchFilter.moduleName = 'rl.utilities.services.genericSearchFilter';
                genericSearchFilter.factoryName = 'genericSearchFilterFactory';
                genericSearchFilter.filterName = 'search';
                var GenericSearchFilter = (function () {
                    function GenericSearchFilter(object, string) {
                        this.object = object;
                        this.string = string;
                        this.type = genericSearchFilter.filterName;
                        this.caseSensitive = false;
                    }
                    GenericSearchFilter.prototype.filter = function (item) {
                        if (this.object.isNullOrEmpty(this.searchText)) {
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
                genericSearchFilter.GenericSearchFilter = GenericSearchFilter;
                genericSearchFilterFactory.$inject = [services.object.serviceName, services.string.serviceName];
                function genericSearchFilterFactory(object, stringUtility) {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new GenericSearchFilter(object, stringUtility);
                        }
                    };
                }
                angular.module(genericSearchFilter.moduleName, [services.object.moduleName, services.string.moduleName])
                    .factory(genericSearchFilter.factoryName, genericSearchFilterFactory);
            })(genericSearchFilter = services.genericSearchFilter || (services.genericSearchFilter = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/jquery
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var jquery;
            (function (jquery) {
                'use strict';
                jquery.moduleName = 'rl.utilities.services.jquery';
                jquery.serviceName = 'jqueryUtility';
                var JQueryUtility = (function () {
                    function JQueryUtility() {
                    }
                    JQueryUtility.prototype.replaceContent = function (contentArea, newContent) {
                        contentArea.empty();
                        contentArea.append(newContent);
                    };
                    return JQueryUtility;
                })();
                angular.module(jquery.moduleName, [])
                    .service(jquery.serviceName, JQueryUtility);
            })(jquery = services.jquery || (services.jquery = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var parentChildBehavior;
            (function (parentChildBehavior) {
                'use strict';
                parentChildBehavior.moduleName = 'rl21.utilities.services.parentChildBehavior';
                parentChildBehavior.serviceName = 'parentChildBehavior';
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
                parentChildBehavior.ParentChildBehaviorService = ParentChildBehaviorService;
                angular.module(parentChildBehavior.moduleName, [])
                    .service(parentChildBehavior.serviceName, ParentChildBehaviorService);
            })(parentChildBehavior = services.parentChildBehavior || (services.parentChildBehavior = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var promise;
            (function (promise_1) {
                'use strict';
                promise_1.moduleName = 'rl.utilities.services.promise';
                promise_1.serviceName = 'promiseUtility';
                var PromiseUtility = (function () {
                    function PromiseUtility() {
                    }
                    PromiseUtility.prototype.isPromise = function (promise) {
                        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
                    };
                    return PromiseUtility;
                })();
                angular.module(promise_1.moduleName, [])
                    .service(promise_1.serviceName, PromiseUtility);
            })(promise = services.promise || (services.promise = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
// uses typings/angularMocks
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_1) {
            var test;
            (function (test) {
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
                    AngularFixture.prototype.controller = function (controllerName, scope, locals) {
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
                            controller: $controller(controllerName, locals),
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
                test.angularFixture = new AngularFixture();
            })(test = services_1.test || (services_1.test = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/lodash
// uses typings/sinon
// uses typings/jquery
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var test;
            (function (test) {
                'use strict';
                var Mock = (function () {
                    function Mock() {
                    }
                    Mock.prototype.service = function (service) {
                        if (angular.isDefined(service) === false) {
                            service = {};
                        }
                        service._mock_requestList_ = [];
                        return service;
                    };
                    Mock.prototype.promise = function (service, methodName, data, successful) {
                        // Default successful to true
                        if (_.isUndefined(successful)) {
                            successful = true;
                        }
                        service[methodName] = sinon.spy(function () {
                            var deferred = jQuery.Deferred();
                            service._mock_requestList_.push({
                                promise: deferred,
                                data: data,
                                successful: successful,
                            });
                            return deferred.promise();
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
                            var deferred = jQuery.Deferred();
                            service._mock_requestList_.push({
                                promise: deferred,
                                data: callback.apply(_this, params),
                                successful: successful,
                            });
                            return deferred.promise();
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
                    };
                    return Mock;
                })();
                test.mock = new Mock();
            })(test = services.test || (services.test = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='stopEventPropagation/stopEventPropagation.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var behaviors;
        (function (behaviors) {
            behaviors.moduleName = 'rl.utilities.behaviors';
            angular.module(behaviors.moduleName, [
                behaviors.stopEventPropogation.moduleName,
            ]);
        })(behaviors = utilities.behaviors || (utilities.behaviors = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='isEmpty/isEmpty.ts' />
/// <reference path='truncate/truncate.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            filters.moduleName = 'rl.utilities.filters';
            angular.module(filters.moduleName, [
                filters.isEmpty.moduleName,
                filters.truncate.moduleName,
            ]);
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='array/array.service.ts' />
/// <reference path='autosave/autosave.service.ts' />
/// <reference path='autosaveAction/autosaveAction.service.ts' />
/// <reference path='boolean/boolean.service.ts' />
/// <reference path='contentProvider/contentProvider.service.ts' />
/// <reference path='date/date.service.ts' />
/// <reference path='jquery/jquery.service.ts' />
/// <reference path='number/number.service.ts' />
/// <reference path='object/object.service.ts' />
/// <reference path='observable/observable.service.ts' />
/// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
/// <reference path='promise/promise.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            services.moduleName = 'rl.utilities.services';
            angular.module(services.moduleName, [
                services.array.moduleName,
                services.autosave.moduleName,
                services.autosaveAction.moduleName,
                services.boolean.moduleName,
                services.contentProvider.moduleName,
                services.date.moduleName,
                services.jquery.moduleName,
                services.number.moduleName,
                services.object.moduleName,
                services.observable.moduleName,
                services.parentChildBehavior.moduleName,
                services.promise.moduleName,
            ]);
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='behaviors/behaviors.module.ts' />
/// <reference path='filters/filters.module.ts' />
/// <reference path='services/services.module.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        utilities.moduleName = 'rl.utilities';
        angular.module(name, [
            utilities.behaviors.moduleName,
            utilities.filters.moduleName,
            utilities.services.moduleName,
        ]);
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cyIsInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsImZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsInNlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwidHlwZXMvY29tcGFyZVJlc3VsdC50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzIiwic2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwiZmlsdGVycy9maWx0ZXIudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzIiwic2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzIiwic2VydmljZXMvdGVzdC9tb2NrLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc2F2aW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb21wbGV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc3VjY2Vzc2Z1bCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UudHJpZ2dlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0uJHNldFByaXN0aW5lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIubW9tZW50V3JhcHBlciIsInJsLnV0aWxpdGllcy50eXBlcyIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0LmdldENvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldERheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29tcGFyZURhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZGF0ZUluUmFuZ2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0Tm93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuU2lnbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5pc1Byb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5pbmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5tb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29udHJvbGxlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmRpcmVjdGl2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5zZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5wcm9taXNlV2l0aENhbGxiYWNrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5mbHVzaCJdLCJtYXBwaW5ncyI6IkFBQUEsdUJBQXVCO0FBRXZCLElBQU8sRUFBRSxDQTJCUjtBQTNCRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0EyQmxCQTtJ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Q0EsRUFBRUE7NEJBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ25EQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3REQSxFQUFFQSxJQUFJQSxFQUFFQSxXQUFXQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3pEQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3hEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7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QUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2dDQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xEQSxDQUFDQTs0QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0NBQ1BBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO2dDQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtvQ0FDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO29DQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ2xEQSxDQUFDQTtnQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0NBQ1BBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO2dDQUNuQkEsQ0FBQ0E7NEJBQ0ZBLENBQUNBO3dCQUNGQSxDQUFDQTt3QkFFREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JDQSxDQUFDQTtvQkFFREQsaUNBQU9BLEdBQVBBO3dCQUNDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDZkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBQ3hCQSxDQUFDQTt3QkFBQ0EsSUFBSUEs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akJBLGVBQU1BLENBQUNBLFVBQVVBO2dCQUNqQkEsbUJBQVVBLENBQUNBLFVBQVVBO2dCQUNyQkEsNEJBQW1CQSxDQUFDQSxVQUFVQTtnQkFDOUJBLGdCQUFPQSxDQUFDQSxVQUFVQTthQUNsQkEsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0EsRUFqQm1CTCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBaUIzQkE7SUFBREEsQ0FBQ0EsRUFqQlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBaUJsQkE7QUFBREEsQ0FBQ0EsRUFqQk0sRUFBRSxLQUFGLEVBQUUsUUFpQlI7QUNoQ0QsaUJBQWlCO0FBRWpCLHNEQUFzRDtBQUN0RCxrREFBa0Q7QUFDbEQsb0RBQW9EO0FBRXBELElBQU8sRUFBRSxDQVFSO0FBUkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBUWxCQTtJQVJTQSxXQUFBQSxTQUFTQSxFQUFDQSxDQUFDQTtRQUNUQyxvQkFBVUEsR0FBV0EsY0FBY0EsQ0FBQ0E7UUFFL0NBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBO1lBQ3BCQSxtQkFBU0EsQ0FBQ0EsVUFBVUE7WUFDcEJBLGlCQUFPQSxDQUFDQSxVQUFVQTtZQUNsQkEsa0JBQVFBLENBQUNBLFVBQVVBO1NBQ25CQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQSxFQVJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQVFsQkE7QUFBREEsQ0FBQ0EsRUFSTSxFQUFFLEtBQUYsRUFBRSxRQVFSIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcblx0ZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMgZXh0ZW5kcyBuZy5JQXR0cmlidXRlcyB7XHJcblx0XHRybFN0b3BFdmVudFByb3BhZ2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZVxyXG5cdFx0XHRcdCwgZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeVxyXG5cdFx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdFx0ZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhcnJheVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZTtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkO1xyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm06IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyO1xyXG5cdFx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IFREYXRhVHlwZVtdO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBudW1iZXJ9KTogVERhdGFUeXBlW107XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBcnJheVV0aWxpdHkgaW1wbGVtZW50cyBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0Xy5lYWNoKGFycmF5LCAoaXRlbTogVERhdGFUeXBlLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0aWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG5cdFx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldEluZGV4ICE9IG51bGwgPyB0YXJnZXRJbmRleCA6IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0XHR2YXIgaW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24oaXRlbSkpIHtcclxuXHRcdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5kZXggPSBfLmluZGV4T2YoYXJyYXksIDxURGF0YVR5cGU+aXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSlbMF07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQge1xyXG5cdFx0XHR2YXIgaW5kZXg6IG51bWJlciA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdGFycmF5LnNwbGljZShpbmRleCwgMSwgbmV3SXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybT86IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIGxpc3Q6IG51bWJlcltdO1xyXG5cclxuXHRcdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0bGlzdCA9IF8ubWFwKGFycmF5LCAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyID0+IHsgcmV0dXJuIHRyYW5zZm9ybShpdGVtKTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIF8ucmVkdWNlKGxpc3QsIChzdW06IG51bWJlciwgbnVtOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gc3VtICsgbnVtOyB9LCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7IChpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmcgfCBudW1iZXIgfSk6IFREYXRhVHlwZVtdIHtcclxuXHRcdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZVtdID0+IHtcclxuXHRcdFx0XHRkaWN0aW9uYXJ5Wzxhbnk+a2V5U2VsZWN0b3IoaXRlbSldID0gaXRlbTtcclxuXHRcdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdFx0fSwgW10pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9iamVjdFV0aWxpdHkge1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRcdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbjtcclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nO1xyXG5cdFx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnk7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBPYmplY3RVdGlsaXR5IGltcGxlbWVudHMgSU9iamVjdFV0aWxpdHkge1xyXG5cdFx0IHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFthcnJheS5zZXJ2aWNlTmFtZV07XHJcblx0XHQgY29uc3RydWN0b3IocHJpdmF0ZSBhcnJheTogYXJyYXkuSUFycmF5VXRpbGl0eSkge1xyXG5cdFx0IH1cclxuXHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNBcnJheShvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmlzTmFOKG9iamVjdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG9iamVjdCA9PT0gJyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG5cdFx0XHRcdG9iamVjdCA9ICg8c3RyaW5nPm9iamVjdCkudHJpbSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIHR5cGUxOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMTtcclxuXHRcdFx0dmFyIHR5cGUyOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMjtcclxuXHJcblx0XHRcdGlmIChvYmoxID09IG51bGwgJiYgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAob2JqMSA9PSBudWxsIHx8IG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGUxICE9PSB0eXBlMikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwob2JqMVtpXSwgb2JqMltpXSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZTEgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0Ly9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG5cdFx0XHRcdHZhciBrZXlzMjogc3RyaW5nW10gPSBfLmtleXMob2JqMik7XHJcblx0XHRcdFx0Xy5mb3JJbihvYmoxLCAodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRcdGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcblx0XHRcdFx0XHRcdC8vY29tcGFyZSB2YWx1ZSBhZ2FpbnN0IHRoZSB2YWx1ZSB3aXRoIHRoZSBzYW1lIGtleSBpbiBvYmoyLCB0aGVuIHJlbW92ZSB0aGUga2V5XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKHZhbHVlLCBvYmoyW2tleV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFycmF5LnJlbW92ZShrZXlzMiwga2V5KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdC8vaWYgdGhlcmUgYXJlIHN0aWxsIGtleXMgbGVmdCBpbiBrZXlzMiwgd2Uga25vdyB0aGV5IGFyZSBub3QgZXF1YWwgKG9iajIgaGFzIG1vcmUgcHJvcGVydGllcylcclxuXHRcdFx0XHRpZiAoXy5hbnkoa2V5czIpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vaWYgdHlwZXMgYXJlIHByaW1pdGl2ZSwgZG8gYSBzaW1wbGUgY29tcGFyaXNvblxyXG5cdFx0XHRcdHJldHVybiBvYmoxID09PSBvYmoyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiBvYmplY3QgKyAnJztcclxuXHRcdH1cclxuXHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcblx0XHRcdGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFthcnJheS5tb2R1bGVOYW1lXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBPYmplY3RVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fb2JqZWN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdDtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2lzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJSXNFbXB0eUZpbHRlciB7XHJcblx0XHQoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0aXNFbXB0eS4kaW5qZWN0ID0gW19fb2JqZWN0LnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBpc0VtcHR5KG9iamVjdDogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJSXNFbXB0eUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHZhciBpc0VtcHR5OiBib29sZWFuID0gb2JqZWN0LmlzTnVsbE9yRW1wdHkoaW5wdXQpO1xyXG5cclxuXHRcdFx0aWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuICFpc0VtcHR5O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpc0VtcHR5O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIGlzRW1wdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0cnVuY2F0ZSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQoaW5wdXQ/OiBzdHJpbmcsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0XHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHR0cnVuY2F0ZS4kaW5qZWN0ID0gW19fb2JqZWN0LnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0PzogYW55LCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuXHRcdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdFx0aWYgKG91dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG5cdFx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBvdXQ7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlQWN0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIHtcclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IHZvaWQ7XHJcblx0XHRzYXZpbmc6IGJvb2xlYW47XHJcblx0XHRjb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBdXRvc2F2ZUFjdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHRpbWVvdXQnXTtcclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSkge31cclxuXHJcblx0XHRwcml2YXRlIGNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uOiBudW1iZXIgPSAxMDAwO1xyXG5cclxuXHRcdHByaXZhdGUgX3NhdmluZzogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX2NvbXBsZXRlOiBib29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBfc3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHJcblx0XHRnZXQgc2F2aW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fc2F2aW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldCBjb21wbGV0ZSgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBsZXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldCBzdWNjZXNzZnVsKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fc3VjY2Vzc2Z1bDtcclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiBhbnkge1xyXG5cdFx0XHR0aGlzLl9zYXZpbmcgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKHRoaXMuYXV0b3NhdmVTdWNjZXNzZnVsKVxyXG5cdFx0XHRcdFx0XHQuY2F0Y2godGhpcy5hdXRvc2F2ZUZhaWxlZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZVN1Y2Nlc3NmdWw6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gKGRhdGE6IGFueSk6IGFueSA9PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCB0cnVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGF1dG9zYXZlRmFpbGVkOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgcmVzb2x2ZUF1dG9zYXZlOiB7IChkYXRhOiBhbnksIHN1Y2Nlc3M6IGJvb2xlYW4pOiBhbnkgfSA9IChkYXRhOiBhbnksIHN1Y2Nlc3M6IGJvb2xlYW4pOiBhbnkgPT4ge1xyXG5cdFx0XHR0aGlzLl9zYXZpbmcgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5fY29tcGxldGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLl9zdWNjZXNzZnVsID0gc3VjY2VzcztcclxuXHJcblx0XHRcdHRoaXMuJHRpbWVvdXQoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMuX2NvbXBsZXRlID0gZmFsc2U7XHJcblx0XHRcdH0sIHRoaXMuY29tcGxldGVNZXNzYWdlRHVyYXRpb24pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBdXRvc2F2ZUFjdGlvblNlcnZpY2UpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19hdXRvc2F2ZUFjdGlvbiA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbjtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYXV0b3NhdmVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdGF1dG9zYXZlKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGNvbnRlbnRGb3JtOiBuZy5JRm9ybUNvbnRyb2xsZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBdXRvc2F2ZVNlcnZpY2UgaW1wbGVtZW50cyBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgaGFzVmFsaWRhdG9yOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2VcclxuXHRcdFx0XHQsIHByaXZhdGUgc2F2ZTogeyguLi5kYXRhOiBhbnlbXSk6IG5nLklQcm9taXNlPHZvaWQ+fVxyXG5cdFx0XHRcdCwgcHVibGljIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyXHJcblx0XHRcdFx0LCBwcml2YXRlIHZhbGlkYXRlPzogeygpOiBib29sZWFufSkge1xyXG5cdFx0XHR0aGlzLmhhc1ZhbGlkYXRvciA9IHZhbGlkYXRlICE9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybSA9PSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybSA9IHRoaXMubnVsbEZvcm0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGF1dG9zYXZlOiB7ICguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW4gfSA9ICguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybS4kcHJpc3RpbmUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuaGFzVmFsaWRhdG9yKSB7XHJcblx0XHRcdFx0dmFsaWQgPSB0aGlzLnZhbGlkYXRlKCk7XHJcblx0XHRcdFx0aWYgKHZhbGlkID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh2YWxpZCkge1xyXG5cdFx0XHRcdHRoaXMuYXV0b3NhdmVTZXJ2aWNlLnRyaWdnZXIodGhpcy5zYXZlKC4uLmRhdGEpLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRlbnRGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG51bGxGb3JtKCk6IG5nLklGb3JtQ29udHJvbGxlciB7XHJcblx0XHRcdHJldHVybiA8YW55PntcclxuXHRcdFx0XHQkcHJpc3RpbmU6IGZhbHNlLFxyXG5cdFx0XHRcdCRzZXRQcmlzdGluZSgpOiB2b2lkIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZShzYXZlOiB7KCk6IG5nLklQcm9taXNlPHZvaWQ+fSwgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXIsIHZhbGlkYXRlPzogeygpOiBib29sZWFufSk6IElBdXRvc2F2ZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbX19hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeShhdXRvc2F2ZVNlcnZpY2U6IF9fYXV0b3NhdmVBY3Rpb24uSUF1dG9zYXZlQWN0aW9uU2VydmljZSk6IElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKHNhdmU6IHsgKCk6IG5nLklQcm9taXNlPHZvaWQ+IH0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsgKCk6IGJvb2xlYW4gfSk6IElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQXV0b3NhdmVTZXJ2aWNlKGF1dG9zYXZlU2VydmljZSwgc2F2ZSwgY29udGVudEZvcm0sIHZhbGlkYXRlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX2F1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGF1dG9zYXZlU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdib29sZWFuVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHRcdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBCb29sZWFuVXRpbGl0eSBpbXBsZW1lbnRzIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuICEhb2JqZWN0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQm9vbGVhblV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0XHRhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+O1xyXG5cdFx0ZXZlbnQ/OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBY3Rpb248VFJldHVyblR5cGU+IHtcclxuXHRcdCguLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW107XHJcblx0XHRmaXJlKGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlU2VydmljZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIHdhdGNoZXJzOiBJV2F0Y2hlcjxhbnk+W10gPSBbXTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0XHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0aWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNbY3VycmVudEtleV0gPSB7XHJcblx0XHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdFx0cmV0dXJuIF8odGhpcy53YXRjaGVycykuZmlsdGVyKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQubWFwKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHRcdH0pLnZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdjb250ZW50UHJvdmlkZXJGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQ7XHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5O1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld1RleHQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIENvbnRlbnRQcm92aWRlclNlcnZpY2UgaW1wbGVtZW50cyBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRjb25zdHJ1Y3RvcihvYnNlcnZhYmxlRmFjdG9yeTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KSB7XHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGVGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBvYnNlcnZhYmxlOiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdHByaXZhdGUgY29udGVudDogSlF1ZXJ5O1xyXG5cclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZCB7XHJcblx0XHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZS5maXJlKCdjb250ZW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50OiB7KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZH0gPSAodHJhbnNjbHVkZUZ1bmN0aW9uOiBuZy5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24odHJhbnNjbHVkZUZ1bmN0aW9uKSkge1xyXG5cdFx0XHRcdHRyYW5zY2x1ZGVGdW5jdGlvbigoY2xvbmU6IEpRdWVyeSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRDb250ZW50KGNsb25lKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldENvbnRlbnQobnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3Q29udGVudDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH0sICdjb250ZW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cdFx0XHRpZiAoc2VsZWN0b3IgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQuZmlsdGVyKHNlbGVjdG9yKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtvYnNlcnZhYmxlLmZhY3RvcnlOYW1lXTtcclxuXHRmdW5jdGlvbiBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeShvYnNlcnZhYmxlRmFjdG9yeTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlKG9ic2VydmFibGVGYWN0b3J5KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYnNlcnZhYmxlLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0aW1lVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRpbWVVdGlsaXR5IHtcclxuXHRcdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzKSAvIDI0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFRpbWVVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlciB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdtb21lbnRXcmFwcGVyJztcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG1vbWVudFdyYXBwZXIoKTogdm9pZCB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0Ly8gVXNpbmcgYGFueWAgaW5zdGVhZCBvZiBNb21lbnRTdGF0aWMgYmVjYXVzZVxyXG5cdFx0Ly8gIGNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrIGRvZXNuJ3QgYXBwZWFyIHRvIGJlXHJcblx0XHQvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcblx0XHR2YXIgbW9tZW50V3JhcHBlcjogYW55ID0gbW9tZW50OyAvLyBtb21lbnQgbXVzdCBhbHJlYWR5IGJlIGxvYWRlZFxyXG5cclxuXHRcdC8vIFNldCBkZWZhdWx0IG1ldGhvZCBmb3IgaGFuZGxpbmcgbm9uLUlTTyBkYXRlIGNvbnZlcnNpb25zLlxyXG5cdFx0Ly8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG5cdFx0Ly8gVGhpcyBhbHNvIHByZXZlbnRzIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXHJcblx0XHRtb21lbnRXcmFwcGVyLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gKGNvbmZpZzogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBtb21lbnRXcmFwcGVyO1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIG1vbWVudFdyYXBwZXIpO1xyXG5cclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0JztcclxuXHJcblx0ZXhwb3J0IGVudW0gQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRncmVhdGVyID0gMSxcclxuXHRcdGVxdWFsID0gMCxcclxuXHRcdGxlc3MgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRDb21wYXJlUmVzdWx0KG51bTogbnVtYmVyKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRpZiAobnVtID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmVxdWFsO1xyXG5cdFx0fSBlbHNlIGlmIChudW0gPiAwKSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmdyZWF0ZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3RpbWUvdGltZS5zZXJ2aWNlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vbWVudC9tb21lbnQubW9kdWxlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQudHNcIiAvPlxyXG5cclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBjb21wYXJlUmVzdWx0ID0gcmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQ7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vbnRoIHtcclxuXHRcdG5hbWU6IHN0cmluZztcclxuXHRcdGRheXMoeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVWYWx1ZSB7XHJcblx0XHR5ZWFyczogbnVtYmVyO1xyXG5cdFx0bW9udGhzOiBudW1iZXI7XHJcblx0XHRkYXlzOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlO1xyXG5cdFx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0O1xyXG5cdFx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuO1xyXG5cdFx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZTtcclxuXHRcdGdldE5vdygpOiBEYXRlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIERhdGVVdGlsaXR5IHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFttb21lbnRXcmFwcGVyLnNlcnZpY2VOYW1lLCB0aW1lLnNlcnZpY2VOYW1lXTtcclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgbW9tZW50OiBtb21lbnQuTW9tZW50U3RhdGljLCBwcml2YXRlIHRpbWU6IHRpbWUuSVRpbWVVdGlsaXR5KSB7XHJcblx0XHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdFx0eyBuYW1lOiAnSmFudWFyeScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0FwcmlsJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bHknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vbnRoOiBJTW9udGhbXTtcclxuXHRcdHByaXZhdGUgYmFzZUZvcm1hdDogc3RyaW5nID0gJ01NLURELVlZWVknO1xyXG5cclxuXHRcdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlIHtcclxuXHRcdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHRcdHZhciBlbmREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0XHR2YXIgcmVzdWx0OiBJRGF0ZVZhbHVlID0gPGFueT57fTtcclxuXHRcdFx0cmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcblx0XHRcdHJlc3VsdC55ZWFycyA9IGVuZERhdGUuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0XHRyZXN1bHQubW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcblx0XHRcdFx0cmVzdWx0Lm1vbnRocyAtPSAxO1xyXG5cdFx0XHRcdHJlc3VsdC5kYXlzICs9IHRoaXMuZ2V0RGF5cyhzdGFydERhdGUuZ2V0TW9udGgoKSwgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0Lm1vbnRocyA8IDApIHtcclxuXHRcdFx0XHRyZXN1bHQueWVhcnMgLT0gMTtcclxuXHRcdFx0XHRyZXN1bHQubW9udGhzICs9IDEyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHRcdHZhciBlbmREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0XHR2YXIgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy50aW1lLm1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQge1xyXG5cdFx0XHQvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG5cdFx0XHR2YXIgZGlmZmVyZW5jZTogbnVtYmVyID0gdGhpcy5zdWJ0cmFjdERhdGVJbkRheXMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0cmV0dXJuIGNvbXBhcmVSZXN1bHQuZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlRW5kKSA9PT0gY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdFx0dmFyIGZvcm1hdDogc3RyaW5nID0gZGF0ZUZvcm1hdCAhPSBudWxsID8gZGF0ZUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuXHJcblx0XHRcdGlmIChfLmlzRGF0ZShkYXRlKSkge1xyXG5cdFx0XHRcdHJldHVybiA8RGF0ZT5kYXRlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIGZvcm1hdCkudG9EYXRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXROb3coKTogRGF0ZSB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlRm9ybWF0U3RyaW5ncyB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdFx0ZGF0ZUZvcm1hdDogc3RyaW5nO1xyXG5cdFx0dGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBkZWZhdWx0Rm9ybWF0czogSURhdGVGb3JtYXRTdHJpbmdzID0ge1xyXG5cdFx0ZGF0ZVRpbWVGb3JtYXQ6ICdNL0QvWVlZWSBoOm1tIEEnLFxyXG5cdFx0ZGF0ZUZvcm1hdDogJ00vRC9ZWVlZJyxcclxuXHRcdHRpbWVGb3JtYXQ6ICdoOm1tQScsXHJcblx0fTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGltZS90aW1lLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL21vbWVudC9tb21lbnQubW9kdWxlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVVdGlsaXR5JztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW21vbWVudFdyYXBwZXIubW9kdWxlTmFtZSwgdGltZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHRcdC52YWx1ZShkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBOdW1iZXJVdGlsaXR5IGltcGxlbWVudHMgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0XHRyZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKDxudW1iZXI+c2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRcdEJZVEVTX1BFUl9HQjogbnVtYmVyID0gMTA3Mzc0MTgyNDtcclxuXHRcdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRcdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0XHRieXRlczogbnVtYmVyO1xyXG5cclxuXHRcdEdCOiBudW1iZXI7XHJcblx0XHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRcdE1COiBudW1iZXI7XHJcblx0XHRpc01COiBib29sZWFuO1xyXG5cclxuXHRcdEtCOiBudW1iZXI7XHJcblx0XHRpc0tCOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSwgYnl0ZXM6IG51bWJlcikge1xyXG5cdFx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlci5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHkpOiBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemUge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0XHRyZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZUZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHRcdC5maWx0ZXIoc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdzdHJpbmdVdGlsaXR5U2VydmljZSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHRcdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdFx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxpdHlTZXJ2aWNlIGltcGxlbWVudHMgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHRcdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuICtzdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoc3Vic3RyaW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdFx0Xy5lYWNoKHBhcmFtcywgKHBhcmFtOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRmb3JtYXRTdHJpbmcgPSB0aGlzLnJlcGxhY2VBbGwoZm9ybWF0U3RyaW5nLCAnXFxcXHsnICsgaW5kZXggKyAnXFxcXH0nLCBwYXJhbSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZm9ybWF0U3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgU3RyaW5nVXRpbGl0eVNlcnZpY2UpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0XHR1cGRhdGVPcHRpb25Db3VudHM8VEl0ZW1UeXBlPihkYXRhOiBUSXRlbVR5cGVbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL2ZpbHRlcnMvZmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnknO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gJ3NlYXJjaCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXIgZXh0ZW5kcyBmaWx0ZXIuSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0XHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuO1xyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBHZW5lcmljU2VhcmNoRmlsdGVyIGltcGxlbWVudHMgSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG9iamVjdDogb2JqZWN0LklPYmplY3RVdGlsaXR5LCBwcml2YXRlIHN0cmluZzogc3RyaW5nLklTdHJpbmdVdGlsaXR5U2VydmljZSkge31cclxuXHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QoaXRlbSwgdGhpcy5zZWFyY2hUZXh0LCB0aGlzLmNhc2VTZW5zaXRpdmUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IGFueSA9IF8udmFsdWVzKGl0ZW0pO1xyXG5cdFx0XHRcdHJldHVybiBfLmFueSh2YWx1ZXMsICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7IHJldHVybiB0aGlzLnNlYXJjaE9iamVjdCh2YWx1ZSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0XHRpZiAoIWNhc2VTZW5zaXRpdmUpIHtcclxuXHRcdFx0XHRcdHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuXHR9XHJcblxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0LnNlcnZpY2VOYW1lLCBzdHJpbmcuc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KG9iamVjdDogb2JqZWN0LklPYmplY3RVdGlsaXR5LFxyXG5cdFx0c3RyaW5nVXRpbGl0eTogc3RyaW5nLklTdHJpbmdVdGlsaXR5U2VydmljZSk6IElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblxyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmdVdGlsaXR5KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3QubW9kdWxlTmFtZSwgc3RyaW5nLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdqcXVlcnlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50czogSlF1ZXJ5KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEpRdWVyeVV0aWxpdHkgaW1wbGVtZW50cyBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0Y29udGVudEFyZWEuZW1wdHkoKTtcclxuXHRcdFx0Y29udGVudEFyZWEuYXBwZW5kKG5ld0NvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgSlF1ZXJ5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29udHJvbGxlcjogYW55ID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbXBpbGU6IGFueSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcblxyXG5cdFx0XHR2YXIgY29tcG9uZW50OiBhbnkgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3Mvc2lub25cclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnk7XHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0XHRwcm9taXNlOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+O1xyXG5cdFx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNlcnZpY2UpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNlcnZpY2UgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCguLi5wYXJhbXM6IGFueVtdKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBuZy5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0XHR2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0czogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT5bXSA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdFx0Ly8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdCBcclxuXHRcdFx0Ly8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuXHRcdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBtb2NrOiBJTW9jayA9IG5ldyBNb2NrKCk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpc0VtcHR5L2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlL3RydW5jYXRlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHRcdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUvZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkvanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlLm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lLFxyXG5cdFx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdFx0Y29udGVudFByb3ZpZGVyLm1vZHVsZU5hbWUsXHJcblx0XHRkYXRlLm1vZHVsZU5hbWUsXHJcblx0XHRqcXVlcnkubW9kdWxlTmFtZSxcclxuXHRcdG51bWJlci5tb2R1bGVOYW1lLFxyXG5cdFx0b2JqZWN0Lm1vZHVsZU5hbWUsXHJcblx0XHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0XHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0XHRiZWhhdmlvcnMubW9kdWxlTmFtZSxcclxuXHRcdGZpbHRlcnMubW9kdWxlTmFtZSxcclxuXHRcdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9