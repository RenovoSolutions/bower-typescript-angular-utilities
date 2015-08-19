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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='autosave.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_2) {
            var autosave;
            (function (autosave_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('autosave', function () {
                    var autosave;
                    var autosaveFactory;
                    var saveSpy;
                    var triggerSpy;
                    var setPristineSpy;
                    var baseContentForm;
                    var $rootScope;
                    beforeEach(function () {
                        angular.mock.module(autosave_1.moduleName);
                        triggerSpy = sinon.spy(function (promise) { return promise; });
                        var autosaveActionService = { trigger: triggerSpy };
                        __test.angularFixture.mock({
                            autosaveAction: autosaveActionService,
                        });
                        setPristineSpy = sinon.spy();
                        baseContentForm = {
                            $pristine: false,
                            $setPristine: setPristineSpy,
                        };
                        var services = __test.angularFixture.inject(autosave_1.factoryName, '$q', '$rootScope');
                        autosaveFactory = services[autosave_1.factoryName];
                        var $q = services.$q;
                        $rootScope = services.$rootScope;
                        saveSpy = sinon.spy(function () { return $q.when(); });
                    });
                    it('should call save on the parent and set the form to pristine', function () {
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm);
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(saveSpy);
                        $rootScope.$digest();
                        sinon.assert.calledOnce(setPristineSpy);
                    });
                    it('should not save if the form is pristine', function () {
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm);
                        baseContentForm.$pristine = true;
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.notCalled(saveSpy);
                    });
                    it('should validate using the validator if one exists', function () {
                        var validateSpy = sinon.spy(function () { return true; });
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm, validateSpy);
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(validateSpy);
                        sinon.assert.calledOnce(saveSpy);
                    });
                    it('should return false without saving if validation fails', function () {
                        var validateSpy = sinon.spy(function () { return false; });
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm, validateSpy);
                        var close = autosave.autosave();
                        expect(close).to.be.false;
                        sinon.assert.calledOnce(validateSpy);
                        sinon.assert.notCalled(saveSpy);
                    });
                    it('should always save if no form is specified', function () {
                        autosave = autosaveFactory.getInstance(saveSpy);
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(saveSpy);
                    });
                });
            })(autosave = services_2.autosave || (services_2.autosave = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='array.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_3) {
            var array;
            (function (array_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('arrayUtility', function () {
                    var arrayUtility;
                    beforeEach(function () {
                        angular.mock.module(array_2.moduleName);
                        var services = __test.angularFixture.inject(array_2.serviceName);
                        arrayUtility = services[array_2.serviceName];
                    });
                    describe('findIndexOf', function () {
                        it('should find the index of the first item in array that matches the predicate', function () {
                            var array = [1, 2, 3, 4, 5];
                            expect(arrayUtility.findIndexOf(array, function (item) { return (item % 2) === 0; })).to.equal(1);
                            expect(arrayUtility.findIndexOf(array, function (item) { return (item > 10); })).to.equal(-1);
                        });
                    });
                    describe('remove', function () {
                        it('should remove the specified item from the array and return the item', function () {
                            var array = [1, 2, 3, 4, 5];
                            expect(arrayUtility.remove(array, 3)).to.equal(3);
                            expect(array.length).to.equal(4);
                            expect(arrayUtility.remove(array, 10)).to.not.exist;
                        });
                        it('should remove the first item matching the predicate and return it', function () {
                            var array = [1, 2, 3, 4, 5];
                            expect(arrayUtility.remove(array, function (item) { return (item > 3); })).to.equal(4);
                            expect(array.length).to.equal(4);
                            expect(arrayUtility.remove(array, function (item) { return (item > 10); })).to.not.exist;
                        });
                    });
                    describe('replace', function () {
                        it('should replace an item in the array with another item', function () {
                            var arrayWithItems = [3, 5, 7];
                            arrayUtility.replace(arrayWithItems, 5, 10);
                            expect(arrayWithItems[0]).to.equal(3);
                            expect(arrayWithItems[1]).to.equal(10);
                            expect(arrayWithItems[2]).to.equal(7);
                        });
                        it('should do nothing if the item to replace is not found', function () {
                            var arrayWithItems = [4, 6, 8];
                            arrayUtility.replace(arrayWithItems, 5, 10);
                            expect(arrayWithItems[0]).to.equal(4);
                            expect(arrayWithItems[1]).to.equal(6);
                            expect(arrayWithItems[2]).to.equal(8);
                        });
                    });
                    describe('sum', function () {
                        it('should sum the values in an array', function () {
                            var values = [1, 2, 3, 4, 5];
                            expect(arrayUtility.sum(values)).to.equal(15);
                        });
                        it('should apply a transform to the values before summing them', function () {
                            var values = [{ prop: 1 }, { prop: 4 }, { prop: 7 }];
                            var transform = function (item) { return item.prop; };
                            expect(arrayUtility.sum(values, transform)).to.equal(12);
                        });
                        it('should return 0 if there are no items to sum', function () {
                            var values = [];
                            expect(arrayUtility.sum(values)).to.equal(0);
                        });
                    });
                    describe('toDictionary', function () {
                        it('should convert an array to a dictionary', function () {
                            var array = [
                                { key: 11 },
                                { key: 12 },
                                { key: 13 },
                                { key: 14 },
                                { key: 15 },
                            ];
                            var dictionary = arrayUtility.toDictionary(array, function (item) { return item.key; });
                            expect(dictionary[11]).to.equal(array[0]);
                            expect(dictionary[12]).to.equal(array[1]);
                            expect(dictionary[13]).to.equal(array[2]);
                            expect(dictionary[14]).to.equal(array[3]);
                            expect(dictionary[15]).to.equal(array[4]);
                        });
                    });
                });
            })(array = services_3.array || (services_3.array = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='autosaveAction.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_4) {
            var autosaveAction;
            (function (autosaveAction_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('autosaveAction', function () {
                    var autosaveAction;
                    var $timeout;
                    var $q;
                    var $rootScope;
                    var deferred;
                    beforeEach(function () {
                        angular.mock.module(autosaveAction_1.moduleName);
                        var services = __test.angularFixture.inject(autosaveAction_1.serviceName, '$timeout', '$q', '$rootScope');
                        autosaveAction = services[autosaveAction_1.serviceName];
                        $timeout = services.$timeout;
                        $q = services.$q;
                        $rootScope = services.$rootScope;
                        deferred = $q.defer();
                        autosaveAction.trigger(deferred.promise);
                        expect(autosaveAction.saving).to.be.true;
                    });
                    it('should set successful to true if the promise resolves successfully', function () {
                        deferred.resolve();
                        $rootScope.$digest();
                        expect(autosaveAction.saving).to.be.false;
                        expect(autosaveAction.complete).to.be.true;
                        expect(autosaveAction.successful).to.be.true;
                    });
                    it('should set successful to false if the promise fails', function () {
                        deferred.reject();
                        $rootScope.$digest();
                        expect(autosaveAction.saving).to.be.false;
                        expect(autosaveAction.complete).to.be.true;
                        expect(autosaveAction.successful).to.be.false;
                    });
                    it('should set complete to false after 1 second', function () {
                        deferred.resolve();
                        $rootScope.$digest();
                        expect(autosaveAction.complete).to.be.true;
                        $timeout.flush(1000);
                        expect(autosaveAction.complete).to.be.false;
                    });
                });
            })(autosaveAction = services_4.autosaveAction || (services_4.autosaveAction = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='boolean.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_5) {
            var boolean;
            (function (boolean) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('booleanUtility', function () {
                    var booleanUtility;
                    beforeEach(function () {
                        angular.mock.module(boolean.moduleName);
                        var services = __test.angularFixture.inject(boolean.serviceName);
                        booleanUtility = services[boolean.serviceName];
                    });
                    describe('toBool', function () {
                        it('should convert null and undefined to false', function () {
                            expect(booleanUtility.toBool(null)).to.be.false;
                            expect(booleanUtility.toBool(undefined)).to.be.false;
                        });
                        it('should leave bool values unchanged', function () {
                            expect(booleanUtility.toBool(false)).to.be.false;
                            expect(booleanUtility.toBool(true)).to.be.true;
                        });
                    });
                });
            })(boolean = services_5.boolean || (services_5.boolean = {}));
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
                contentProvider.moduleName = 'rl21.utilities.services.contentProvider';
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='contentProvider.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_6) {
            var contentProvider;
            (function (contentProvider_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('contentProvider', function () {
                    var contentProvider;
                    var transcludeSpy;
                    var filterSpy;
                    var jqueryClone;
                    beforeEach(function () {
                        angular.mock.module(contentProvider_1.moduleName);
                        var services = __test.angularFixture.inject(contentProvider_1.serviceName);
                        var contentProviderFactory = services[contentProvider_1.serviceName];
                        contentProvider = contentProviderFactory.getInstance();
                        jqueryClone = {};
                        filterSpy = sinon.spy(function (object) { return object; });
                        jqueryClone.filter = filterSpy;
                        transcludeSpy = sinon.spy(function (func) { return func(jqueryClone); });
                    });
                    it('should get the content that was set by setContent', function () {
                        contentProvider.setContent(jqueryClone);
                        expect(contentProvider.getContent()).to.equal(jqueryClone);
                    });
                    it('should set the content to the content provided by the transclude function', function () {
                        contentProvider.setTranscludeContent(transcludeSpy);
                        sinon.assert.calledOnce(transcludeSpy);
                        expect(contentProvider.getContent()).to.equal(jqueryClone);
                    });
                    it('should filter the jquery object with the specified selector', function () {
                        contentProvider.setContent(jqueryClone);
                        contentProvider.getContent('selector');
                        sinon.assert.calledOnce(filterSpy);
                        sinon.assert.calledWith(filterSpy, 'selector');
                    });
                    it('should call the action with the new content when the content changes', function () {
                        var actionSpy = sinon.spy();
                        contentProvider.register(actionSpy);
                        contentProvider.setContent(jqueryClone);
                        sinon.assert.calledOnce(actionSpy);
                        sinon.assert.calledWith(actionSpy, jqueryClone);
                    });
                    it('should call the action immediately if there is already content', function () {
                        var actionSpy = sinon.spy();
                        contentProvider.setContent(jqueryClone);
                        contentProvider.register(actionSpy);
                        sinon.assert.calledOnce(actionSpy);
                        sinon.assert.calledWith(actionSpy, jqueryClone);
                    });
                });
            })(contentProvider = services_6.contentProvider || (services_6.contentProvider = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var breakpoints;
            (function (breakpoints) {
                'use strict';
                breakpoints.lg = 'lg';
                breakpoints.md = 'md';
                breakpoints.sm = 'sm';
                breakpoints.xs = 'xs';
            })(breakpoints = services.breakpoints || (services.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/*
 * Implementation also requires the following elements to be inserted on the page:
 *   <div class="device-xs visible-xs"></div>
 *   <div class="device-sm visible-sm"></div>
 *   <div class="device-md visible-md"></div>
 *   <div class="device-lg visible-lg"></div>
 */
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var breakpoints;
            (function (breakpoints) {
                'use strict';
                breakpoints.visibleBreakpointsServiceName = 'visibleBreakpoint';
                var VisibleBreakpointService = (function () {
                    function VisibleBreakpointService() {
                    }
                    VisibleBreakpointService.prototype.isVisible = function (breakpoint) {
                        // jquery gets the breakpoint trigger directives listed above on line 3
                        return $('.device-' + breakpoint).is(':visible');
                    };
                    return VisibleBreakpointService;
                })();
                breakpoints.VisibleBreakpointService = VisibleBreakpointService;
            })(breakpoints = services.breakpoints || (services.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
// uses typings/jquery
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var window;
            (function (window) {
                'use strict';
                window.moduleName = 'rl.utilities.services.window';
                window.serviceName = 'windowControl';
                var WindowService = (function () {
                    function WindowService() {
                        this.windowControl = $(window);
                    }
                    WindowService.prototype.resize = function (callback) {
                        this.windowControl.resize(callback);
                    };
                    return WindowService;
                })();
                angular.module(window.moduleName, [])
                    .service(window.serviceName, WindowService);
            })(window = services.window || (services.window = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
/// <reference path='breakpoints.ts' />
/// <reference path='visibleBreakpoints.service.ts' />
/// <reference path='../observable/observable.service.ts' />
/// <reference path='../window/window.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var breakpoints;
            (function (breakpoints) {
                'use strict';
                var __window = rl.utilities.services.window;
                var __observable = rl.utilities.services.observable;
                breakpoints.moduleName = 'rl.utilities.services.breakpoints';
                breakpoints.serviceName = 'breakpoints';
                var BreakpointService = (function () {
                    function BreakpointService(visibleBreakpoints, resizeDebounceMilliseconds, windowService, observableFactory) {
                        var _this = this;
                        this.visibleBreakpoints = visibleBreakpoints;
                        this.updateBreakpoint = function () {
                            var newBreakPoint = _this.getBreakpoint();
                            if (newBreakPoint !== _this.currentBreakpoint) {
                                _this.currentBreakpoint = newBreakPoint;
                                _this.observable.fire('window.breakpointChanged', _this.currentBreakpoint);
                            }
                        };
                        this.currentBreakpoint = this.getBreakpoint();
                        this.observable = observableFactory.getInstance();
                        var efficientResize = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
                            leading: true,
                            trailing: true,
                            maxWait: resizeDebounceMilliseconds,
                        });
                        windowService.resize(efficientResize);
                    }
                    BreakpointService.prototype.getBreakpoint = function () {
                        if (this.visibleBreakpoints.isVisible(breakpoints.lg)) {
                            return breakpoints.lg;
                        }
                        else if (this.visibleBreakpoints.isVisible(breakpoints.md)) {
                            return breakpoints.md;
                        }
                        else if (this.visibleBreakpoints.isVisible(breakpoints.sm)) {
                            return breakpoints.sm;
                        }
                        else {
                            return breakpoints.xs;
                        }
                    };
                    BreakpointService.prototype.isBreakpoint = function (breakpoint) {
                        return this.currentBreakpoint === breakpoint;
                    };
                    BreakpointService.prototype.register = function (action) {
                        return this.observable.register(action, 'window.breakpointChanged');
                    };
                    BreakpointService.$inject = [breakpoints.visibleBreakpointsServiceName, 'resizeDebounceMilliseconds', __window.serviceName, __observable.factoryName];
                    return BreakpointService;
                })();
                breakpoints.BreakpointService = BreakpointService;
                angular.module(breakpoints.moduleName, [__window.moduleName, __observable.moduleName])
                    .constant('resizeDebounceMilliseconds', 500)
                    .service(breakpoints.visibleBreakpointsServiceName, breakpoints.VisibleBreakpointService)
                    .service(breakpoints.serviceName, BreakpointService);
            })(breakpoints = services.breakpoints || (services.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='breakpoints.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_7) {
            var breakpoints;
            (function (breakpoints_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('breakpoints', function () {
                    var breakpoints;
                    var visibleBreakpoint;
                    var triggerResize;
                    beforeEach(function () {
                        angular.mock.module(breakpoints_1.moduleName);
                    });
                    it('should have visible breakpoint marked as current', function () {
                        visibleBreakpoint = breakpoints_1.md;
                        buildService();
                        expect(breakpoints.currentBreakpoint).to.equal(breakpoints_1.md);
                        expect(breakpoints.isBreakpoint(breakpoints_1.md)).to.be.true;
                        expect(breakpoints.isBreakpoint(breakpoints_1.lg)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.sm)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.xs)).to.be.false;
                    });
                    it('should signal registered listeners when the breakpoint changes', function () {
                        var breakpointChangeSpy = sinon.spy();
                        visibleBreakpoint = breakpoints_1.sm;
                        buildService();
                        breakpoints.register(breakpointChangeSpy);
                        visibleBreakpoint = breakpoints_1.md;
                        triggerResize();
                        expect(breakpoints.currentBreakpoint).to.equal(breakpoints_1.md);
                        expect(breakpoints.isBreakpoint(breakpoints_1.md)).to.be.true;
                        expect(breakpoints.isBreakpoint(breakpoints_1.lg)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.sm)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.xs)).to.be.false;
                        sinon.assert.calledOnce(breakpointChangeSpy);
                    });
                    function buildService() {
                        var mockVisibleBreakpointService = {
                            isVisible: function (breakpoint) {
                                return breakpoint === visibleBreakpoint;
                            },
                        };
                        var mockWindowControl = {
                            resize: function (callback) {
                                triggerResize = callback;
                            },
                        };
                        __test.angularFixture.mock({
                            visibleBreakpoint: mockVisibleBreakpointService,
                            windowControl: mockWindowControl,
                        });
                        var services = __test.angularFixture.inject(breakpoints_1.serviceName);
                        breakpoints = services[breakpoints_1.serviceName];
                    }
                });
            })(breakpoints = services_7.breakpoints || (services_7.breakpoints = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='fileSize.module.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_8) {
            var fileSize;
            (function (fileSize) {
                describe('fileSize', function () {
                    var fileSizeFactory;
                    beforeEach(function () {
                        angular.mock.module(fileSize.moduleName);
                        var services = services_8.test.angularFixture.inject(fileSize.factoryName);
                        fileSizeFactory = services[fileSize.factoryName];
                    });
                    it('should determine bytes', function () {
                        expect(fileSizeFactory.getInstance(1).display()).to.equal('1 bytes');
                        expect(fileSizeFactory.getInstance(1023).display()).to.equal('1023 bytes');
                    });
                    it('should determine kilo bytes', function () {
                        expect(fileSizeFactory.getInstance(1024).display()).to.equal('1 KB');
                        expect(fileSizeFactory.getInstance(1048575).display()).to.equal('1024 KB');
                    });
                    it('should determine mega bytes', function () {
                        expect(fileSizeFactory.getInstance(1048576).display()).to.equal('1 MB');
                        expect(fileSizeFactory.getInstance(1073741823).display()).to.equal('1024 MB');
                    });
                    it('should determine giga bytes', function () {
                        expect(fileSizeFactory.getInstance(1073741824).display()).to.equal('1 GB');
                        expect(fileSizeFactory.getInstance(1073741825).display()).to.equal('1 GB');
                    });
                });
            })(fileSize = services_8.fileSize || (services_8.fileSize = {}));
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
            var date;
            (function (date) {
                'use strict';
                date.dateServiceName = 'dateUtility';
                var DateUtility = (function () {
                    function DateUtility() {
                        var _this = this;
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
                    return DateUtility;
                })();
                date.DateUtility = DateUtility;
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
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                date.moduleName = 'rl.utilities.services.date';
                angular.module(date.moduleName, [])
                    .service(date.dateServiceName, date.DateUtility)
                    .value(date.dateTimeFormatServiceName, date.defaultFormats);
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='date.module.ts' />
/// <reference path='date.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_9) {
            var date;
            (function (date) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('dateUtility', function () {
                    var dateUtility;
                    beforeEach(function () {
                        angular.mock.module(date.moduleName);
                        var services = __test.angularFixture.inject(date.dateServiceName);
                        dateUtility = services[date.dateServiceName];
                    });
                    describe('getFullString', function () {
                        it('should get the month name', function () {
                            expect(dateUtility.getFullString(0)).to.equal('January');
                            expect(dateUtility.getFullString(1)).to.equal('February');
                            expect(dateUtility.getFullString(2)).to.equal('March');
                            expect(dateUtility.getFullString(3)).to.equal('April');
                            expect(dateUtility.getFullString(4)).to.equal('May');
                            expect(dateUtility.getFullString(5)).to.equal('June');
                            expect(dateUtility.getFullString(6)).to.equal('July');
                            expect(dateUtility.getFullString(7)).to.equal('August');
                            expect(dateUtility.getFullString(8)).to.equal('September');
                            expect(dateUtility.getFullString(9)).to.equal('October');
                            expect(dateUtility.getFullString(10)).to.equal('November');
                            expect(dateUtility.getFullString(11)).to.equal('December');
                        });
                    });
                    describe('getDays', function () {
                        it('should get the number of days in the month', function () {
                            expect(dateUtility.getDays(0)).to.equal(31);
                            expect(dateUtility.getDays(2)).to.equal(31);
                            expect(dateUtility.getDays(3)).to.equal(30);
                            expect(dateUtility.getDays(4)).to.equal(31);
                            expect(dateUtility.getDays(5)).to.equal(30);
                            expect(dateUtility.getDays(6)).to.equal(31);
                            expect(dateUtility.getDays(7)).to.equal(31);
                            expect(dateUtility.getDays(8)).to.equal(30);
                            expect(dateUtility.getDays(9)).to.equal(31);
                            expect(dateUtility.getDays(10)).to.equal(30);
                            expect(dateUtility.getDays(11)).to.equal(31);
                        });
                        it('should account for leap years', function () {
                            expect(dateUtility.getDays(1, 2015)).to.equal(28);
                            expect(dateUtility.getDays(1, 2016)).to.equal(29);
                        });
                    });
                });
            })(date = services_9.date || (services_9.date = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='genericSearchFilter.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_10) {
            var genericSearchFilter;
            (function (genericSearchFilter_1) {
                'use strict';
                describe('genericSearchFilter', function () {
                    var genericSearchFilter;
                    beforeEach(function () {
                        angular.mock.module(genericSearchFilter_1.moduleName);
                        var services = services_10.test.angularFixture.inject(genericSearchFilter_1.factoryName);
                        var genericSearchFilterFactory = services[genericSearchFilter_1.factoryName];
                        genericSearchFilter = genericSearchFilterFactory.getInstance();
                    });
                    it('should include all items if query is null or empty', function () {
                        genericSearchFilter.searchText = null;
                        var object1 = {
                            prop: 'some string',
                        };
                        var object2 = {
                            prop: 'another value',
                        };
                        expect(genericSearchFilter.filter(object1)).to.be.true;
                        expect(genericSearchFilter.filter(object2)).to.be.true;
                        genericSearchFilter.searchText = '';
                        expect(genericSearchFilter.filter(object1)).to.be.true;
                        expect(genericSearchFilter.filter(object2)).to.be.true;
                    });
                    it('should search the actual data values if they arent objects', function () {
                        genericSearchFilter.searchText = '2';
                        expect(genericSearchFilter.filter(1)).to.be.false;
                        expect(genericSearchFilter.filter(2)).to.be.true;
                        expect(genericSearchFilter.filter(3)).to.be.false;
                        expect(genericSearchFilter.filter(4)).to.be.false;
                        expect(genericSearchFilter.filter(5)).to.be.false;
                    });
                    it('should include items that contain the search string', function () {
                        genericSearchFilter.searchText = 'my';
                        genericSearchFilter.caseSensitive = true;
                        var matchingObject1 = {
                            prop2: 'my string',
                        };
                        var matchingObject2 = {
                            prop1: 5,
                            prop2: 'some string with my',
                        };
                        var objectWithoutSearchString = {
                            prop1: 2,
                        };
                        var objectWithDifferentCase = {
                            prop1: 5,
                            prop2: 'MY string',
                        };
                        expect(genericSearchFilter.filter(matchingObject1)).to.be.true;
                        expect(genericSearchFilter.filter(objectWithoutSearchString)).to.be.false;
                        expect(genericSearchFilter.filter(matchingObject2)).to.be.true;
                        expect(genericSearchFilter.filter(objectWithDifferentCase)).to.be.false;
                    });
                    it('should include items that contain the search string, case insensitive', function () {
                        genericSearchFilter.searchText = 'my';
                        genericSearchFilter.caseSensitive = false;
                        var lowercaseMatch = {
                            prop2: 'my string',
                        };
                        var uppercaseMatch = {
                            prop1: 2.2,
                            prop2: 'MY string',
                        };
                        expect(genericSearchFilter.filter(lowercaseMatch)).to.be.true;
                        expect(genericSearchFilter.filter(uppercaseMatch)).to.be.true;
                    });
                    it('should recursively search the properties of an object', function () {
                        genericSearchFilter.searchText = 'my';
                        genericSearchFilter.caseSensitive = false;
                        var objectWithNestedObject = {
                            nestedObject: {
                                prop2: 'my string',
                            },
                        };
                        expect(genericSearchFilter.filter(objectWithNestedObject)).to.be.true;
                    });
                });
            })(genericSearchFilter = services_10.genericSearchFilter || (services_10.genericSearchFilter = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='number.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_11) {
            var number;
            (function (number) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('numberUtility', function () {
                    var numberUtility;
                    beforeEach(function () {
                        angular.mock.module(number.moduleName);
                        var services = __test.angularFixture.inject(number.serviceName);
                        numberUtility = services[number.serviceName];
                    });
                    describe('preciseRound', function () {
                        it('should round 6 to 6', function () {
                            var roundedNum = numberUtility.preciseRound(6, 2);
                            expect(roundedNum).to.equal(6);
                        });
                        it('should round 1.275 to 1.28', function () {
                            var roundedNum = numberUtility.preciseRound(1.275, 2);
                            expect(roundedNum).to.equal(1.28);
                        });
                        it('should round 1.274 to 1.27', function () {
                            var roundedNum = numberUtility.preciseRound(1.274, 2);
                            expect(roundedNum).to.equal(1.27);
                        });
                        it('should round 1.55555555555555555555 to 1.5555555555555555556', function () {
                            // 20 5's. This is the max precision precise_round is valid for
                            var roundedNum = numberUtility.preciseRound(1.55555555555555555555, 19);
                            expect(roundedNum).to.equal(1.5555555555555555556);
                        });
                        it('should round 1.999999999999999999999 to 2', function () {
                            var roundedNum = numberUtility.preciseRound(1.999999999999999999999, 20); // 21 9's
                            expect(roundedNum).to.equal(2);
                        });
                        it('should not round 1.111111111111111111111', function () {
                            var roundedNum = numberUtility.preciseRound(1.111111111111111111111, 20); // 21 1's
                            expect(roundedNum).to.equal(1.11111111111111111111); // trimmed 1 from the end
                        });
                    });
                });
            })(number = services_11.number || (services_11.number = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='object.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_12) {
            var object;
            (function (object_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('objectUtility', function () {
                    var objectUtility;
                    beforeEach(function () {
                        angular.mock.module(object_2.moduleName);
                        var services = __test.angularFixture.inject(object_2.serviceName);
                        objectUtility = services[object_2.serviceName];
                    });
                    describe('isNullOrEmpty', function () {
                        it('should return true when null', function () {
                            expect(objectUtility.isNullOrEmpty(null)).to.be.true;
                        });
                        it('should return true when empty', function () {
                            expect(objectUtility.isNullOrEmpty('')).to.be.true;
                        });
                        it('should return false when string has contents', function () {
                            expect(objectUtility.isNullOrEmpty('random string')).to.be.false;
                        });
                        it('should return true for null or empty arrays', function () {
                            expect(objectUtility.isNullOrEmpty(null)).to.be.true;
                            expect(objectUtility.isNullOrEmpty([])).to.be.true;
                            expect(objectUtility.isNullOrEmpty([1, 2, 3])).to.be.false;
                        });
                        it('should return true if number type is not a number', function () {
                            expect(objectUtility.isNullOrEmpty(Number.NaN)).to.be.true;
                            expect(objectUtility.isNullOrEmpty(5)).to.be.false;
                        });
                    });
                    describe('isNullOrWhitespace', function () {
                        it('should return true for empty whitespace strings', function () {
                            expect(objectUtility.isNullOrWhitespace('   ')).to.be.true;
                        });
                        it('should handle null and empty objects like isNullOrEmpty', function () {
                            expect(objectUtility.isNullOrWhitespace(null)).to.equal(objectUtility.isNullOrEmpty(null));
                            expect(objectUtility.isNullOrWhitespace([])).to.equal(objectUtility.isNullOrEmpty([]));
                            expect(objectUtility.isNullOrWhitespace({})).to.equal(objectUtility.isNullOrEmpty({}));
                            expect(objectUtility.isNullOrWhitespace('')).to.equal(objectUtility.isNullOrEmpty(''));
                            expect(objectUtility.isNullOrWhitespace('random string')).to.equal(objectUtility.isNullOrEmpty('random string'));
                        });
                    });
                    describe('areEqual', function () {
                        it('should return true if two primitives are equal', function () {
                            var string1 = 'abc';
                            var string2 = 'abc';
                            var num1 = 1;
                            var num2 = 1;
                            expect(objectUtility.areEqual(string1, string2)).to.be.true;
                            expect(objectUtility.areEqual(num1, num2)).to.be.true;
                        });
                        it('should return false if two objects are not of the same type', function () {
                            var string = 'abc';
                            var num = 1;
                            var obj = {};
                            var array = [];
                            expect(objectUtility.areEqual(string, num)).to.be.false;
                            expect(objectUtility.areEqual(string, obj)).to.be.false;
                            expect(objectUtility.areEqual(string, array)).to.be.false;
                            expect(objectUtility.areEqual(num, obj)).to.be.false;
                            expect(objectUtility.areEqual(num, array)).to.be.false;
                            //obj and array are considered the same type
                        });
                        it('should return false if one object is valid and the other is null', function () {
                            var obj = { '1': 1, '2': 2 };
                            expect(objectUtility.areEqual(obj, null)).to.be.false;
                        });
                        it('should return false if arrays have different lengths', function () {
                            var array1 = [1, 2, 3, 4, 5];
                            var array2 = [1, 2, 3];
                            expect(objectUtility.areEqual(array1, array2)).to.be.false;
                        });
                        it('should compare arrays by element if they are the same length', function () {
                            var array = [1, 2, 3, 4, 5];
                            var similarArray = [1, 2, 3, 4, 5];
                            var differentArray = [5, 4, 3, 2, 1];
                            expect(objectUtility.areEqual(array, similarArray)).to.be.true;
                            expect(objectUtility.areEqual(array, differentArray)).to.be.false;
                        });
                        it('should use the keys from the first object to compare properties', function () {
                            var object = {
                                '1': 1,
                                '2': 2,
                                '3': 3,
                            };
                            var similarObject = {
                                '2': 2,
                                '3': 3,
                                '1': 1,
                            };
                            var differentObject = {
                                '1': 1,
                                'two': 2,
                                '3': 3,
                            };
                            expect(objectUtility.areEqual(object, similarObject)).to.be.true;
                            expect(objectUtility.areEqual(object, differentObject)).to.be.false;
                        });
                        it('should return false if object 2 has the properties of object 1 with additional properties', function () {
                            var object1 = {
                                '1': 1,
                                '2': 2,
                                '3': 3,
                            };
                            var object2 = {
                                '1': 1,
                                '2': 2,
                                '3': 3,
                                '4': 4,
                                '5': 5,
                            };
                            expect(objectUtility.areEqual(object1, object2)).to.be.false;
                        });
                        it('should recursively compare nested objects', function () {
                            var object = {
                                nestedObj: {
                                    '1': 1,
                                    '2': 2,
                                },
                                nestedArray: [1, 2, 3],
                                '3': 3,
                            };
                            var similarObject = {
                                nestedObj: {
                                    '1': 1,
                                    '2': 2,
                                },
                                nestedArray: [1, 2, 3],
                                '3': 3,
                            };
                            var differentObject1 = {
                                nestedObj: {
                                    'one': 1,
                                    'two': 2,
                                },
                                nestedArray: [1, 2, 3],
                                '3': 3,
                            };
                            var differentObject2 = {
                                nestedObj: {
                                    '1': 1,
                                    '2': 2,
                                },
                                nestedArray: [1, 2, 3, 4, 5],
                                '3': 3,
                            };
                            expect(objectUtility.areEqual(object, similarObject)).to.be.true;
                            expect(objectUtility.areEqual(object, differentObject1)).to.be.false;
                            expect(objectUtility.areEqual(object, differentObject2)).to.be.false;
                        });
                    });
                    describe('toString', function () {
                        it('should turn numbers into strings', function () {
                            expect(objectUtility.toString(5)).to.equal('5');
                            expect(objectUtility.toString(2.5)).to.equal('2.5');
                        });
                        it('should turn booleans into strings', function () {
                            expect(objectUtility.toString(false)).to.equal('false');
                            expect(objectUtility.toString(true)).to.equal('true');
                        });
                        it('should turn undefined and null into strings', function () {
                            expect(objectUtility.toString(undefined)).to.equal('undefined');
                            expect(objectUtility.toString(null)).to.equal('null');
                        });
                    });
                    describe('valueOrDefault', function () {
                        it('should return the value if it is defined', function () {
                            var someObject = { existingProperty: 'value' };
                            expect(objectUtility.valueOrDefault(someObject.existingProperty, 'default')).to.equal('value');
                        });
                        it('should return the default if the value is not defined', function () {
                            var someObject = { nullProperty: null };
                            expect(objectUtility.valueOrDefault(someObject.nullProperty, 'default')).to.equal('default');
                            expect(objectUtility.valueOrDefault(someObject.missingProperty, 'default')).to.equal('default');
                        });
                    });
                });
            })(object = services_12.object || (services_12.object = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='observable.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_13) {
            var observable;
            (function (observable_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('observable', function () {
                    var observable;
                    beforeEach(function () {
                        angular.mock.module(observable_1.moduleName);
                        var services = __test.angularFixture.inject(observable_1.factoryName);
                        var observableFactory = services[observable_1.factoryName];
                        observable = observableFactory.getInstance();
                    });
                    it('should register a watcher and call the action when fire is called', function () {
                        var func = sinon.spy();
                        observable.register(func);
                        observable.fire();
                        sinon.assert.calledOnce(func);
                    });
                    it('should unregister only the indicated watcher', function () {
                        var registeredFunc1 = sinon.spy();
                        var unregisteredFunc = sinon.spy();
                        var registeredFunc2 = sinon.spy();
                        observable.register(registeredFunc1);
                        var cancel = observable.register(unregisteredFunc);
                        observable.register(registeredFunc2);
                        cancel();
                        observable.fire();
                        sinon.assert.calledOnce(registeredFunc1);
                        sinon.assert.notCalled(unregisteredFunc);
                        sinon.assert.calledOnce(registeredFunc2);
                    });
                    it('should only call watcher registered with the specified event if fire is called with an event', function () {
                        var funcWithEvent = sinon.spy();
                        var funcWithoutEvent = sinon.spy();
                        observable.register(funcWithEvent, 'myEvent');
                        observable.register(funcWithoutEvent);
                        observable.fire('myEvent');
                        sinon.assert.notCalled(funcWithoutEvent);
                        sinon.assert.calledOnce(funcWithEvent);
                    });
                    it('should not call watchers registered with a different event', function () {
                        var func = sinon.spy();
                        observable.register(func, 'myEvent');
                        observable.fire('otherEvent');
                        sinon.assert.notCalled(func);
                    });
                    it('should call the registered watchers with the additional params passed into the fire function', function () {
                        var func = sinon.spy();
                        observable.register(func, 'myEvent');
                        observable.fire('myEvent', 1, 2, 3, 4, 5);
                        sinon.assert.calledOnce(func);
                        var args = func.firstCall.args;
                        expect(args[0]).to.equal(1);
                        expect(args[1]).to.equal(2);
                        expect(args[2]).to.equal(3);
                        expect(args[3]).to.equal(4);
                        expect(args[4]).to.equal(5);
                    });
                    it('should return with an error if no function is provided', function () {
                        var originalLog = console.log;
                        var logSpy = sinon.spy();
                        console.log = logSpy;
                        var cancel = observable.register(null);
                        sinon.assert.calledOnce(logSpy);
                        sinon.assert.calledWith(logSpy, 'Error: watcher must be a function');
                        expect(cancel).to.be.null;
                        console.log = originalLog;
                    });
                });
            })(observable = services_13.observable || (services_13.observable = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='parentChildBehavior.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_14) {
            var parentChildBehavior;
            (function (parentChildBehavior_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('parentChildBehavior', function () {
                    var parentChildBehavior;
                    beforeEach(function () {
                        angular.mock.module(parentChildBehavior_1.moduleName);
                        var services = __test.angularFixture.inject(parentChildBehavior_1.serviceName);
                        parentChildBehavior = services[parentChildBehavior_1.serviceName];
                    });
                    describe('register', function () {
                        it('should register a child behavior by putting it on the view data of the child', function () {
                            var child = { viewData: null };
                            var behavior = { action: function () { return 3; } };
                            parentChildBehavior.registerChildBehavior(child, behavior);
                            expect(child.viewData.behavior).to.equal(behavior);
                        });
                        it('should use the existing viewData object if one exists', function () {
                            var childWithViewData = { viewData: { randomValue: 5 } };
                            var behavior = { action: function () { return 5; } };
                            parentChildBehavior.registerChildBehavior(childWithViewData, behavior);
                            expect(childWithViewData.viewData.behavior).to.equal(behavior);
                            expect(childWithViewData.viewData.randomValue).to.equal(5);
                        });
                        it('should not register child behavior if child object is null', function () {
                            var behavior = { action: function () { return 3; } };
                            var child = null;
                            parentChildBehavior.registerChildBehavior(child, behavior);
                            expect(parentChildBehavior.getChildBehavior(child)).to.be.null;
                        });
                    });
                    describe('getChildBehavior', function () {
                        it('should get the behavior of an individual child', function () {
                            var behavior1 = { action: function () { return 3; } };
                            var child = { viewData: { behavior: behavior1 } };
                            expect(parentChildBehavior.getChildBehavior(child)).to.equal(behavior1);
                        });
                        it('should get existing behaviors for a list of children', function () {
                            var behavior1 = { action: function () { return 3; } };
                            var behavior2 = { action: function () { return 7; } };
                            var childList = [
                                { viewData: { behavior: behavior1 } },
                                { viewData: { behavior: null } },
                                { viewData: { behavior: behavior2 } },
                            ];
                            var behaviors = parentChildBehavior.getAllChildBehaviors(childList);
                            expect(behaviors.length).to.equal(2);
                            expect(behaviors[0]).to.equal(behavior1);
                            expect(behaviors[1]).to.equal(behavior2);
                        });
                    });
                    describe('triggerChildBehavior', function () {
                        it('should trigger the specified child action and return the result', function () {
                            var behavior1 = { action: function () { return 3; } };
                            var child = { viewData: { behavior: behavior1 } };
                            var behaviorResult = parentChildBehavior.triggerChildBehavior(child, function (behavior) {
                                return behavior.action();
                            });
                            expect(behaviorResult).to.equal(3);
                        });
                        it('should return null if the behavior does not exist', function () {
                            var child = {};
                            var behaviorResult = parentChildBehavior.triggerChildBehavior(child, function (behavior) {
                                return behavior.action();
                            });
                            expect(behaviorResult).to.be.null;
                        });
                    });
                    describe('triggerAllChildBehaviors', function () {
                        it('should trigger the specified child actions and return the results', function () {
                            var behavior1 = { action: function () { return 1; } };
                            var child1 = { viewData: { behavior: behavior1 } };
                            var behavior2 = { action: function () { return 2; } };
                            var child2 = { viewData: { behavior: behavior2 } };
                            var behavior3 = { action: function () { return 3; } };
                            var child3 = { viewData: { behavior: behavior3 } };
                            var childWithoutBehavior = {};
                            var behaviorResult = parentChildBehavior.triggerAllChildBehaviors([child1, child2, child3, childWithoutBehavior], function (behavior) {
                                return behavior.action();
                            });
                            expect(behaviorResult).to.have.length(3);
                            expect(behaviorResult[0]).to.equal(1);
                            expect(behaviorResult[1]).to.equal(2);
                            expect(behaviorResult[2]).to.equal(3);
                        });
                    });
                });
            })(parentChildBehavior = services_14.parentChildBehavior || (services_14.parentChildBehavior = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='promise.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_15) {
            var promise;
            (function (promise_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('promiseUtility', function () {
                    var promiseUtility;
                    beforeEach(function () {
                        angular.mock.module(promise_2.moduleName);
                        var services = __test.angularFixture.inject(promise_2.serviceName);
                        promiseUtility = services[promise_2.serviceName];
                    });
                    describe('isPromise', function () {
                        it('should return true if the object is a promise', function () {
                            var promise = {
                                then: sinon.spy(),
                                catch: sinon.spy(),
                            };
                            expect(promiseUtility.isPromise(promise)).to.be.true;
                        });
                        it('should return false if the object is not a promise', function () {
                            var str = 'promise';
                            var obj = {};
                            expect(promiseUtility.isPromise(str)).to.be.false;
                            expect(promiseUtility.isPromise(obj)).to.be.false;
                        });
                    });
                });
            })(promise = services_15.promise || (services_15.promise = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='string.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_16) {
            var string;
            (function (string) {
                var __test = rl.utilities.services.test;
                describe('stringUtility', function () {
                    var stringUtility;
                    beforeEach(function () {
                        angular.mock.module(string.moduleName);
                        var services = __test.angularFixture.inject(string.serviceName);
                        stringUtility = services[string.serviceName];
                    });
                    describe('toNumber', function () {
                        it('should convert a string to a number', function () {
                            expect(stringUtility.toNumber('5')).to.equal(5);
                            expect(stringUtility.toNumber('3')).to.equal(3);
                            expect(stringUtility.toNumber('1.25')).to.equal(1.25);
                        });
                    });
                    describe('contains', function () {
                        it('should return true if the substring is contained within the string', function () {
                            expect(stringUtility.contains('my string', 'my')).to.be.true;
                            expect(stringUtility.contains('123', '1')).to.be.true;
                            expect(stringUtility.contains('', null)).to.be.true;
                            expect(stringUtility.contains('my string', '')).to.be.true;
                        });
                        it('should return false if the substring is not contained within the string', function () {
                            expect(stringUtility.contains('my string', 'my val')).to.be.false;
                            expect(stringUtility.contains('123', '4')).to.be.false;
                            expect(stringUtility.contains('my string', 'my string 1')).to.be.false;
                        });
                    });
                    describe('replaceAll', function () {
                        it('should replace all occurances of some given text with another inside a string', function () {
                            expect(stringUtility.replaceAll('hello world', 'foo', 'bar')).to.equal('hello world');
                            expect(stringUtility.replaceAll('fooHellofooWorldfoo', 'foo', 'bar')).to.equal('barHellobarWorldbar');
                        });
                    });
                    describe('substitute', function () {
                        it('should substitute strings with their positional placeholder value in other strings', function () {
                            expect(stringUtility.substitute('hello world', 'foo')).to.equal('hello world');
                            expect(stringUtility.substitute('hello {0} world {1}', 'foo', 'bar')).to.equal('hello foo world bar');
                        });
                    });
                });
            })(string = services_16.string || (services_16.string = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='jquery.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_17) {
            var jquery;
            (function (jquery) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('jqueryUtility', function () {
                    var jqueryUtility;
                    var emptySpy;
                    var appendSpy;
                    beforeEach(function () {
                        angular.mock.module(jquery.moduleName);
                        var services = __test.angularFixture.inject(jquery.serviceName);
                        jqueryUtility = services.jqueryUtility;
                        emptySpy = sinon.spy();
                        appendSpy = sinon.spy();
                    });
                    it('should empty the existing content and append the new content', function () {
                        var existingElement = {
                            empty: emptySpy,
                            append: appendSpy,
                        };
                        var newContent = {};
                        jqueryUtility.replaceContent(existingElement, newContent);
                        sinon.assert.calledOnce(emptySpy);
                        sinon.assert.calledOnce(appendSpy);
                        sinon.assert.calledWith(appendSpy, newContent);
                    });
                });
            })(jquery = services_17.jquery || (services_17.jquery = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='time.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_18) {
            var time;
            (function (time) {
                var __test = rl.utilities.services.test;
                describe('timeUtility', function () {
                    var timeUtility;
                    beforeEach(function () {
                        angular.mock.module(time.moduleName);
                        var services = __test.angularFixture.inject(time.serviceName);
                        timeUtility = services[time.serviceName];
                    });
                    it('should return expected number of seconds for milliseconds', function () {
                        expect(timeUtility.millisecondsToSeconds(4000)).to.equal(4);
                        expect(timeUtility.millisecondsToSeconds(4600)).to.equal(4);
                    });
                    it('should return expected number of minutes for milliseconds', function () {
                        var seconds1 = 120;
                        var seconds2 = 59;
                        seconds1 *= 1000;
                        seconds2 *= 1000;
                        expect(timeUtility.millisecondsToMinutes(seconds1)).to.equal(2);
                        expect(timeUtility.millisecondsToMinutes(seconds2)).to.equal(0);
                    });
                    it('should return expected number of hours for milliseconds', function () {
                        var minutes1 = 59;
                        var minutes2 = 60;
                        minutes1 *= 60 * 1000;
                        minutes2 *= 60 * 1000;
                        expect(timeUtility.millisecondsToHours(minutes1)).to.equal(0);
                        expect(timeUtility.millisecondsToHours(minutes2)).to.equal(1);
                    });
                    it('should return expected number of hours for milliseconds', function () {
                        var hours1 = 23;
                        var hours2 = 24;
                        hours1 *= 60 * 60 * 1000;
                        hours2 *= 60 * 60 * 1000;
                        expect(timeUtility.millisecondsToDays(hours1)).to.equal(0);
                        expect(timeUtility.millisecondsToDays(hours2)).to.equal(1);
                    });
                });
            })(time = services_18.time || (services_18.time = {}));
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='isEmpty.ts' />
/// <reference path='../../services/test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var isEmpty;
            (function (isEmpty_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('isEmpty', function () {
                    var isEmpty;
                    beforeEach(function () {
                        angular.mock.module(isEmpty_2.moduleName);
                        var services = __test.angularFixture.inject(isEmpty_2.filterName);
                        isEmpty = services[isEmpty_2.filterName];
                    });
                    it('should return true if the array is null or empty', function () {
                        expect(isEmpty(null)).to.be.true;
                        expect(isEmpty([])).to.be.true;
                    });
                    it('should return false if the array has items', function () {
                        expect(isEmpty([1, 2, 3])).to.be.false;
                        expect(isEmpty(['1', '2', '3'])).to.be.false;
                    });
                    it('should invert the result if trueIfEmpty is specified as false', function () {
                        expect(isEmpty(null, false)).to.be.false;
                        expect(isEmpty([1, 2, 3], false)).to.be.true;
                    });
                });
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
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='truncate.ts' />
/// <reference path='../../services/test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var truncate;
            (function (truncate_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('truncate', function () {
                    var truncate;
                    beforeEach(function () {
                        angular.mock.module(truncate_2.moduleName);
                        var services = __test.angularFixture.inject(truncate_2.filterName);
                        truncate = services[truncate_2.filterName];
                    });
                    it('should return an empty string when no string is passed', function () {
                        expect(truncate()).to.equal('');
                    });
                    it('should return an empty string when an empty string is passed', function () {
                        expect(truncate('')).to.equal('');
                    });
                    it('should return a string when a number is passed', function () {
                        expect(truncate(34.5)).to.equal('34.5');
                    });
                    it('should not truncate a string when no parameters are passed', function () {
                        expect(truncate('Test string')).to.equal('Test string');
                    });
                    it('should return an empty string when truncateTo is 0', function () {
                        expect(truncate('Test string', 0)).to.equal('');
                    });
                    it('should truncate but not ellipsimogrify a string when only truncateTo is passed', function () {
                        expect(truncate('Test string', 6)).to.equal('Test s');
                    });
                    it('should not truncate a string when truncateTo is greater than the string length', function () {
                        expect(truncate('Test string', 25)).to.equal('Test string');
                    });
                    it('should truncate but not ellipsimogrify a string when both truncateTo and includeEllipses are passed', function () {
                        expect(truncate('Test string', 6, false)).to.equal('Test s');
                    });
                    it('should truncate and ellipsimogrify a string when both truncateTo and includeEllipses are passed', function () {
                        expect(truncate('Test string', 6, true)).to.equal('Test s...');
                    });
                });
            })(truncate = filters.truncate || (filters.truncate = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsInNlcnZpY2VzL2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9hcnJheS9hcnJheS5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9icmVha3BvaW50cy9icmVha3BvaW50cy50cyIsInNlcnZpY2VzL2JyZWFrcG9pbnRzL3Zpc2libGVCcmVha3BvaW50cy5zZXJ2aWNlLnRzIiwic2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL2JyZWFrcG9pbnRzL2JyZWFrcG9pbnRzLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cyIsInNlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50cyIsImZpbHRlcnMvZmlsdGVyLnRzIiwic2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvcHJvbWlzZS9wcm9taXNlVXRpbGl0eS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzIiwic2VydmljZXMvanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvdGVzdC9tb2NrLnRzIiwic2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50ZXN0cy50cyIsImZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwiZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkudGVzdHMudHMiLCJmaWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwiZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50ZXN0cy50cyIsImJlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwiZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cyIsInNlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cyIsInV0aWxpdGllcy50cyJdLCJuYW1lcyI6WyJybCIsInJsLnV0aWxpdGllcyIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24ubGluayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zYXZpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbXBsZXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zdWNjZXNzZnVsIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS50cmlnZ2VyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLm51bGxGb3JtIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybS4kc2V0UHJpc3RpbmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5hdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuaW5qZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUubW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmNvbnRyb2xsZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5kaXJlY3RpdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuZmluZEluZGV4T2YiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlbW92ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkucmVwbGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuc3VtIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS50b0Jvb2wiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLmZpcmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS51bnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUub2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUub2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5zZXRDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmdldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5jb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5WaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLlZpc2libGVCcmVha3BvaW50U2VydmljZS5pc1Zpc2libGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLnJlc2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5nZXRCcmVha3BvaW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLkJyZWFrcG9pbnRTZXJ2aWNlLmlzQnJlYWtwb2ludCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5idWlsZFNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5TaWduIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmRpc3BsYXkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuYXJlRXF1YWwiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkudG9TdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suc2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2sucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2sucHJvbWlzZVdpdGhDYWxsYmFjayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suZmx1c2giLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0hvdXJzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMiLCJybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eS5pc0VtcHR5IiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZS50cnVuY2F0ZSJdLCJtYXBwaW5ncyI6IkFBQUEsdUJBQXVCO0FBRXZCLElBQU8sRUFBRSxDQTJCUjtBQTNCRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0EyQmxCQTtJQTNCU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsU0FBU0EsQ0EyQjVCQTtRQTNCbUJBLFdBQUFBLFNBQVNBO1lBQUNDLElBQUFBLG9CQUFvQkEsQ0EyQmpEQTtZQTNCNkJBLFdBQUFBLG9CQUFvQkEsRUFBQ0EsQ0FBQ0E7Z0JBQ25EQyxZQUFZQSxDQUFDQTtnQkFFRkEsK0JBQVVBLEdBQVdBLDZDQUE2Q0EsQ0FBQ0E7Z0JBQ25FQSxrQ0FBYUEsR0FBV0Esd0JBQXdCQSxDQUFDQTtnQkFNNURBO29CQUNDQyxZQUFZQSxDQUFDQTtvQkFDYkEsTUFBTUEsQ0FBQ0E7d0JBQ05BLFFBQVFBLEVBQUVBLEdBQUdBO3dCQUNiQSxJQUFJQSxZQUFDQSxLQUFnQkEsRUFDbEJBLE9BQTRCQSxFQUM1QkEsS0FBaUNBOzRCQUNuQ0MsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxVQUFDQSxLQUF3QkE7Z0NBQ2pFQSxLQUFLQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtnQ0FDdkJBLEtBQUtBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBOzRCQUN6QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ0pBLENBQUNBO3FCQUNERCxDQUFDQTtnQkFDSEEsQ0FBQ0E7Z0JBRURELE9B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QSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbEhBLENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0EsUUFBUUEsRUFBRUE7d0JBQ2xCQSxFQUFFQSxDQUFDQSxxRUFBcUVBLEVBQUVBOzRCQUN6RUEsSUFBSUEsS0FBS0EsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBRXRDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNqQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ3JEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsbUVBQW1FQSxFQUFFQTs0QkFDdkVBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUV0Q0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBQ0EsSUFBWUEsSUFBZ0JBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENB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OzRCQUVGQSxJQUFJQSxVQUFVQSxHQUFjQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxJQUFhQSxJQUFlQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFFOUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMxQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDMUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMxQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzNDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLEVBNUc0QnRCLEtBQUtBLEdBQUxBLGdCQUFLQSxLQUFMQSxnQkFBS0EsUUE0R2pDQTtRQUFEQSxDQUFDQSxFQTVHbUJMLFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFS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LElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBOzRCQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7NEJBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbERBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7NEJBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDaENBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO2dDQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7Z0NBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbERBLENBQUNBOzRCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQ0FDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0NBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDaENBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO29DQUNqQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7b0NBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxD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TUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7b0JBQzVFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQ0EsNkJBQTZCQSxFQUFFQTt3QkFDakNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO3dCQUNyRUEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQ0EsNkJBQTZCQSxFQUFFQTt3QkFDakNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO3dCQUN4RUEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7b0JBQy9FQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQ0EsNkJBQTZCQSxFQUFFQTt3QkFDakNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO3dCQUMzRUEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7b0JBQzVFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDSkEsQ0FBQ0EsRUEvQjRCdEUsUUFBUUEsR0FBUkEsbUJBQVFBLEtBQVJBLG1CQUFRQSxRQStCcENBO1FBQURBLENBQUNBLEVBL0JtQkwsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQStCM0JBO0lBQURBLENBQUNBLEVBL0JTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQStCbEJBO0FBQURBLENBQUNBLEVBL0JNLEVBQUUsS0FBRixFQUFFLFFBK0JSO0FDdkNELHlCQUF5QjtBQUV6QixJQUFPLEVBQUUsQ0ErQ1I7QUEvQ0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBK0NsQkE7SUEvQ1NBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBK0MzQkE7UUEvQ21CQSxXQUFBQSxRQUFRQTtZQUFDSyxJQUFBQSxJQUFJQSxDQStDaENBO1lBL0M0QkEsV0FBQUEsSUFBSUEsRUFBQ0EsQ0FBQ0E7Z0JBQ2xDNkUsWUFBWUEsQ0FBQ0E7Z0JBRUZBLG9CQUFlQSxHQUFXQSxhQUFhQSxDQUFDQTtnQkFZbkRBO29CQUNDQzt3QkFEREMsaUJBK0JDQTt3QkE3QkNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBOzRCQUNaQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFDQSxJQUFZQSxJQUFlQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDakdBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDckRBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDekRBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0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QSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTs0QkFDeERBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBOzRCQUMzREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3pEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTs0QkFDM0RBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3dCQUM1REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxRQUFRQSxDQUFDQSxTQUFTQSxFQUFFQTt3QkFDbkJBLEVBQUVBLENBQUNBLDRDQUE0Q0EsRUFBRUE7NEJBQ2hEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDN0NBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENB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RUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0NBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDL0NBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2dDQUNkQSxDQUFDQTs0QkFDRkEsQ0FBQ0E7d0JBQ0ZBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDL0JBLHdDQUF3Q0E7NEJBQ3hDQSxJQUFJQSxLQUFLQSxHQUFhQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDbkNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLEtBQVVBLEVBQUVBLEdBQVdBO2dDQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQ3RCQSxnRkFBZ0ZBO29DQUNoRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0NBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtvQ0FDZEEsQ0FBQ0E7b0NBQUNBLElBQUlBLENBQUNBLENBQUNBO3dDQUNQQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtvQ0FDL0JBLENBQUNBO2dDQUNGQSxDQUFDQTtnQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0NBQ1BBLE1B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Q3JCQSxDQUFDQTt3QkFFRkEsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDdkRBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBRXZEQSxtQkFBbUJBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNwQ0EsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDdkRBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBQ3hEQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQ0EsNERBQTREQSxFQUFFQTt3QkFDaEVBLG1CQUFtQkEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0E7d0JBRXJDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNsREEsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDakRBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ2xEQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNsREEsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDbkRBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSxxREFBcURBLEVBQUVBO3dCQUN6REEsbUJBQW1CQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDdENBLG1CQUFtQkEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ3pDQSxJQUFJQSxlQUFlQSxHQUFpQkE7NEJBQ25DQSxLQUFLQSxFQUFFQSxXQUFXQTt5QkFDbEJBLENBQUNBO3dCQUVGQSxJQUFJQSxlQUFlQSxHQUFpQkE7NEJBQ25DQSxLQUFLQSxFQUFFQSxDQUFDQTs0QkFDUkEsS0FBS0EsRUFBRUEscUJBQXFCQTt5QkFDNUJBLENBQUNBO3dCQUVGQSxJQUFJQSx5QkFBeUJBLEdBQWlCQTs0QkFDN0NBLEtBQUtBLEVBQUVBLENBQUNBO3lCQUNSQSxDQUFDQTt3QkFFRkEsSUFBSUEsdUJBQXVCQSxHQUFpQkE7NEJBQzNDQSxLQUFLQSxFQUFFQSxDQUFDQTs0QkFDUkEsS0FBS0EsRUFBRUEsV0FBV0E7eUJBQ2xCQSxDQUFDQTt3QkFFRkEsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDL0RBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDMUVBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQy9EQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE1BQU1BLENBQUNBLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7b0JBQ3pFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQ0EsdUVBQXVFQSxFQUFFQTt3QkFDM0VBLG1CQUFtQkEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ3RDQSxtQkFBbUJBLENBQUNBLGFBQWFBLEdBQUdBLEtBQUtBLENBQUNBO3dCQUMxQ0EsSUFBSUEsY0FBY0EsR0FBaUJBOzRCQUNsQ0EsS0FBS0EsRUFBRUEsV0FBV0E7eUJBQ2xCQSxDQUFDQTt3QkFFRkEsSUFBSUEsY0FBY0EsR0FBaUJBOzRCQUNsQ0EsS0FBS0EsRUFBRUEsR0FBR0E7NEJBQ1ZBLEtBQUtBLEVBQUVBLFdBQVdBO3lCQUNsQkEsQ0FBQ0E7d0JBRUZBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQzlEQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO29CQUMvREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLHVEQUF1REEsRUFBRUE7d0JBQzNEQSxtQkFBbUJBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO3dCQUN0Q0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDMUNBLElBQUlBLHNCQUFzQkEsR0FBc0JBOzRCQUMvQ0EsWUFBWUEsRUFBRUE7Z0NBQ2JBLEtBQUtBLEVBQUVBLFdBQVdBOzZCQUNsQkE7eUJBQ0RBLENBQUNBO3dCQUVGQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE1BQU1BLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBQ3ZFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDSkEsQ0FBQ0EsRUE5RzRCbkcsbUJBQW1CQSxHQUFuQkEsK0JBQW1CQSxLQUFuQkEsK0JBQW1CQSxRQThHL0NBO1FBQURBLENBQUNBLEVBOUdtQkwsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQThHM0JBO0lBQURBLENBQUNBLEVBOUdTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQThHbEJBO0FBQURBLENBQUNBLEVBOUdNLEVBQUUsS0FBRixFQUFFLFFBOEdSO0FDdEhELHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFDMUQsMkRBQTJEO0FBQzNELDZEQUE2RDtBQUU3RCwwQ0FBMEM7QUFDMUMsa0RBQWtEO0FBRWxELElBQU8sRUFBRSxDQWdEUjtBQWhERCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FnRGxCQTtJQWhEU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0FnRDNCQTtRQWhEbUJBLFdBQUFBLFdBQVFBO1lBQUNLLElBQUFBLE1BQU1BLENBZ0RsQ0E7WUFoRDRCQSxXQUFBQSxNQUFNQSxFQUFDQSxDQUFDQTtnQkFDcENnRSxZQUFZQSxDQUFDQTtnQkFFYkEsSUFBT0EsTUFBTUEsR0FBR0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBRTNDQSxRQUFRQSxDQUFDQSxlQUFlQSxFQUFFQTtvQkFDekJBLElBQUlBLGFBQTZCQSxDQUFDQTtvQkFFbENBLFVBQVVBLENBQUNBO3dCQUNWQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxpQkFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBRWhDQSxJQUFJQSxRQUFRQSxHQUFRQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQSxDQUFDQSxrQkFBV0EsQ0FBQ0EsQ0FBQ0E7d0JBQzlEQSxhQUFhQSxHQUFHQSxRQUFRQSxDQUFDQSxrQkFBV0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0EsY0FBY0EsRUFBRUE7d0JBQ3hCQSxFQUFFQSxDQUFDQSxxQkFBcUJBLEVBQUVBOzRCQUN6QkEsSUFBSUEsVUFBVUEsR0FBV0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzFEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDaENBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSw0QkFBNEJBLEVBQUVBOzRCQUNoQ0EsSUFBSUEsVUFBVUEsR0FBV0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzlEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDbkNBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSw0QkFBNEJBLEVBQUVBOzRCQUNoQ0EsSUFBSUEsVUFBVUEsR0FBV0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzlEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDbkNBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSw4REFBOERBLEVBQUVBOzRCQUNsRUEsK0RBQStEQTs0QkFDL0RBLElBQUlBLFVBQVVBLEdBQVdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLHNCQUFzQkEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQ2hGQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxxQkFBcUJBLENBQUNBLENBQUNBO3dCQUNwREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLDJDQUEyQ0EsRUFBRUE7NEJBQy9DQSxJQUFJQSxVQUFVQSxHQUFXQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSx1QkFBdUJBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFNBQVNBOzRCQUMzRkEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsMENBQTBDQSxFQUFFQTs0QkFDOUNBLElBQUlBLFVBQVVBLEdBQVdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLHVCQUF1QkEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsU0FBU0E7NEJBQzNGQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxzQkFBc0JBLENBQUNBLENBQUNBLENBQUNBLHlCQUF5QkE7d0JBQy9FQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLEVBaEQ0QmhFLE1BQU1BLEdBQU5BLGtCQUFNQSxLQUFOQSxrQkFBTUEsUUFnRGxDQTtRQUFEQSxDQUFDQSxFQWhEbUJMLFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFnRDNCQTtJQUFEQSxDQUFDQSxFQWhEU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFnRGxCQTtBQUFEQSxDQUFDQSxFQWhETSxFQUFFLEtBQUYsRUFBRSxRQWdEUjtBQ3hERCx3REFBd0Q7QUFDeEQsMERBQTBEO0FBQzFELDJEQUEyRDtBQUMzRCw2REFBNkQ7QUFFN0QsMENBQTBDO0FBQzFDLGtEQUFrRDtBQUVsRCxJQUFPLEVBQUUsQ0F5TVI7QUF6TUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBeU1sQkE7SUF6TVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBeU0zQkE7UUF6TW1CQSxXQUFBQSxXQUFRQTtZQUFDSyxJQUFBQSxNQUFNQSxDQXlNbENBO1lBek00QkEsV0FBQUEsUUFBTUEsRUFBQ0EsQ0FBQ0E7Z0JBQ3BDbUYsWUFBWUEsQ0FBQ0E7Z0JBRWJBLElBQU9BLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBO2dCQUUzQ0EsUUFBUUEsQ0FBQ0EsZUFBZUEsRUFBRUE7b0JBQ3pCQSxJQUFJQSxhQUE2QkEsQ0FBQ0E7b0JBRWxDQSxVQUFVQSxDQUFDQTt3QkFDVkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQVVBLENBQUNBLENBQUNBO3dCQUVoQ0EsSUFBSUEsUUFBUUEsR0FBUUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQVdBLENBQUNBLENBQUNBO3dCQUM5REEsYUFBYUEsR0FBR0EsUUFBUUEsQ0FBQ0Esb0JBQVdBLENBQUNBLENBQUNBO29CQUN2Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLFFBQVFBLENBQUNBLGVBQWVBLEVBQUVBO3dCQUN6QkEsRUFBRUEsQ0FBQ0EsOEJBQThCQSxFQUFFQTs0QkFDbENBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLCtCQUErQkEsRUFBRUE7NEJBQ25DQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDcERBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSw4Q0FBOENBLEVBQUVBOzRCQUNsREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ2xFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsNkNBQTZDQSxFQUFFQTs0QkFDakRBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBOzRCQUNyREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7NEJBQ25EQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDNURBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSxtREFBbURBLEVBQUVBOzRCQUN2REEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7NEJBQzNEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDcERBLENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQTt3QkFDOUJBLEVBQUVBLENBQUNBLGlEQUFpREEsRUFBRUE7NEJBQ3JEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUM1REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLHlEQUF5REEsRUFBRUE7NEJBQzdEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUMzRkEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkZBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3ZGQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUN2RkEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbEhBLENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0EsVUFBVUEsRUFBRUE7d0JBQ3BCQSxFQUFFQSxDQUFDQSxnREFBZ0RBLEVBQUVBOzRCQUNwREEsSUFBSUEsT0FBT0EsR0FBV0EsS0FBS0EsQ0FBQ0E7NEJBQzVCQSxJQUFJQSxPQUFPQSxHQUFXQSxLQUFLQSxDQUFDQTs0QkFDNUJBLElBQUlBLElBQUlBLEdBQVdBLENBQUNBLENBQUNBOzRCQUNyQkEsSUFBSUEsSUFBSUEsR0FBV0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTs0QkFDNURBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLDZEQUE2REEsRUFBRUE7NEJBQ2pFQSxJQUFJQSxNQUFNQSxHQUFXQSxLQUFLQSxDQUFDQTs0QkFDM0JBLElBQUlBLEdBQUdBLEdBQVdBLENBQUNBLENBQUNBOzRCQUNwQkEsSUFBSUEsR0FBR0EsR0FBUUEsRUFBRUEsQ0FBQ0E7NEJBQ2xCQSxJQUFJQSxLQUFLQSxHQUFVQSxFQUFFQSxDQUFDQTs0QkFDdEJBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUN4REEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTs0QkFDMURBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUNyREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3ZEQSw0Q0FBNENBO3dCQUM3Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLGtFQUFrRUEsRUFBRUE7NEJBQ3RFQSxJQUFJQSxHQUFHQSxHQUFRQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLHNEQUFzREEsRUFBRUE7NEJBQzFEQSxJQUFJQSxNQUFNQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkNBLElBQUlBLE1BQU1BLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNqQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQzVEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsOERBQThEQSxFQUFFQTs0QkFDbEVBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUN0Q0EsSUFBSUEsWUFBWUEsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzdDQSxJQUFJQSxjQUFjQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDL0NBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBOzRCQUMvREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ25FQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsaUVBQWlFQSxFQUFFQTs0QkFDckVBLElBQUlBLE1BQU1BLEdBQVFBO2dDQUNqQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEdBQUdBLEVBQUVBLENBQUNBO2dDQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLElBQUlBLGFBQWFBLEdBQVFBO2dDQUN4QkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEdBQUdBLEVBQUVBLENBQUNBO2dDQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLElBQUlBLGVBQWVBLEdBQVFBO2dDQUMxQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEtBQUtBLEVBQUVBLENBQUNBO2dDQUNSQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBOzRCQUNqRUEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ3JFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsMkZBQTJGQSxFQUFFQTs0QkFDL0ZBLElBQUlBLE9BQU9BLEdBQVFBO2dDQUNsQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEdBQUdBLEVBQUVBLENBQUNBO2dDQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLElBQUlBLE9BQU9BLEdBQVFBO2dDQUNsQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEdBQUdBLEVB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QWpCbUJMLFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFpQjNCQTtJQUFEQSxDQUFDQSxFQWpCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFpQmxCQTtBQUFEQSxDQUFDQSxFQWpCTSxFQUFFLEtBQUYsRUFBRSxRQWlCUjtBQ2hDRCxpQkFBaUI7QUFFakIsc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxvREFBb0Q7QUFFcEQsSUFBTyxFQUFFLENBUVI7QUFSRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FRbEJBO0lBUlNBLFdBQUFBLFNBQVNBLEVBQUNBLENBQUNBO1FBQ1RDLG9CQUFVQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUUvQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUE7WUFDcEJBLG1CQUFTQSxDQUFDQSxVQUFVQTtZQUNwQkEsaUJBQU9BLENBQUNBLFVBQVVBO1lBQ2xCQSxrQkFBUUEsQ0FBQ0EsVUFBVUE7U0FDbkJBLENBQUNBLENBQUNBO0lBQ0pBLENBQUNBLEVBUlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBUWxCQTtBQUFEQSxDQUFDQSxFQVJNLEVBQUUsS0FBRixFQUFFLFFBUVIiLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuXHRleHBvcnQgdmFyIGRpcmVjdGl2ZU5hbWU6IHN0cmluZyA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyBleHRlbmRzIG5nLklBdHRyaWJ1dGVzIHtcclxuXHRcdHJsU3RvcEV2ZW50UHJvcGFnYXRpb246IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCk6IG5nLklEaXJlY3RpdmUge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdFx0bGluayhzY29wZTogbmcuSVNjb3BlXHJcblx0XHRcdFx0LCBlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdFx0LCBhdHRyczogSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMpOiB2b2lkIHtcclxuXHRcdFx0XHRlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXV0b3NhdmVBY3Rpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogdm9pZDtcclxuXHRcdHNhdmluZzogYm9vbGVhbjtcclxuXHRcdGNvbXBsZXRlOiBib29sZWFuO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlQWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckdGltZW91dCddO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdHByaXZhdGUgY29tcGxldGVNZXNzYWdlRHVyYXRpb246IG51bWJlciA9IDEwMDA7XHJcblxyXG5cdFx0cHJpdmF0ZSBfc2F2aW5nOiBib29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBfY29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9zdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cclxuXHRcdGdldCBzYXZpbmcoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zYXZpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IGNvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcGxldGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IHN1Y2Nlc3NmdWwoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zdWNjZXNzZnVsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGFueSB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IHRydWU7XHJcblx0XHRcdHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwpXHJcblx0XHRcdFx0XHRcdC5jYXRjaCh0aGlzLmF1dG9zYXZlRmFpbGVkKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGF1dG9zYXZlU3VjY2Vzc2Z1bDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVGYWlsZWQ6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gKGRhdGE6IGFueSk6IGFueSA9PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSByZXNvbHZlQXV0b3NhdmU6IHsgKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSB9ID0gKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSA9PiB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9jb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuX3N1Y2Nlc3NmdWwgPSBzdWNjZXNzO1xyXG5cclxuXHRcdFx0dGhpcy4kdGltZW91dCgoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy5fY29tcGxldGUgPSBmYWxzZTtcclxuXHRcdFx0fSwgdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbik7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEF1dG9zYXZlQWN0aW9uU2VydmljZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX2F1dG9zYXZlQWN0aW9uID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0YXV0b3NhdmUoLi4uZGF0YTogYW55W10pOiBib29sZWFuO1xyXG5cdFx0Y29udGVudEZvcm06IG5nLklGb3JtQ29udHJvbGxlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSBoYXNWYWxpZGF0b3I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBhdXRvc2F2ZVNlcnZpY2U6IF9fYXV0b3NhdmVBY3Rpb24uSUF1dG9zYXZlQWN0aW9uU2VydmljZVxyXG5cdFx0XHRcdCwgcHJpdmF0ZSBzYXZlOiB7KC4uLmRhdGE6IGFueVtdKTogbmcuSVByb21pc2U8dm9pZD59XHJcblx0XHRcdFx0LCBwdWJsaWMgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXJcclxuXHRcdFx0XHQsIHByaXZhdGUgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KSB7XHJcblx0XHRcdHRoaXMuaGFzVmFsaWRhdG9yID0gdmFsaWRhdGUgIT0gbnVsbDtcclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtID09IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRGb3JtID0gdGhpcy5udWxsRm9ybSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YXV0b3NhdmU6IHsgKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiB9ID0gKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtLiRwcmlzdGluZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdFx0XHRpZiAodGhpcy5oYXNWYWxpZGF0b3IpIHtcclxuXHRcdFx0XHR2YWxpZCA9IHRoaXMudmFsaWRhdGUoKTtcclxuXHRcdFx0XHRpZiAodmFsaWQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbGlkKSB7XHJcblx0XHRcdFx0dGhpcy5hdXRvc2F2ZVNlcnZpY2UudHJpZ2dlcih0aGlzLnNhdmUoLi4uZGF0YSkudGhlbigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY29udGVudEZvcm0uJHNldFByaXN0aW5lKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgbnVsbEZvcm0oKTogbmcuSUZvcm1Db250cm9sbGVyIHtcclxuXHRcdFx0cmV0dXJuIDxhbnk+e1xyXG5cdFx0XHRcdCRwcmlzdGluZTogZmFsc2UsXHJcblx0XHRcdFx0JHNldFByaXN0aW5lKCk6IHZvaWQge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKHNhdmU6IHsoKTogbmcuSVByb21pc2U8dm9pZD59LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KTogSUF1dG9zYXZlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGF1dG9zYXZlU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtfX2F1dG9zYXZlQWN0aW9uLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTogSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeyAoKTogbmcuSVByb21pc2U8dm9pZD4gfSwgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXIsIHZhbGlkYXRlPzogeyAoKTogYm9vbGVhbiB9KTogSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBBdXRvc2F2ZVNlcnZpY2UoYXV0b3NhdmVTZXJ2aWNlLCBzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fYXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyTW9ja3NcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCB7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxuXHRcdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRkaXJlY3RpdmU6IGFuZ3VsYXIuSURpcmVjdGl2ZTtcclxuXHRcdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdDogKC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pID0+IGFueTtcclxuXHRcdG1vY2s6IChtb2NrczogYW55KSA9PiB2b2lkO1xyXG5cdFx0Y29udHJvbGxlcjxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIHNjb3BlPzogYW55LCBsb2NhbHM/OiBhbnkpOiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG5cdFx0ZGlyZWN0aXZlOiAoZG9tOiBzdHJpbmcpID0+IElEaXJlY3RpdmVSZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBbmd1bGFyRml4dHVyZSBpbXBsZW1lbnRzIElBbmd1bGFyRml4dHVyZSB7XHJcblx0XHRpbmplY3QoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSk6IE9iamVjdCB7XHJcblx0XHRcdC8vIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiBhbGwgb2YgdGhlIHNlcnZpY2VzIHJlcXVlc3RlZFxyXG5cdFx0XHR2YXIgc2VydmljZXM6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdFx0Ly8gY2xvbmUgdGhlIGFycmF5IGFuZCBhZGQgYSBmdW5jdGlvbiB0aGF0IGl0ZXJhdGVzIG92ZXIgdGhlIG9yaWdpbmFsIGFycmF5XHJcblx0XHRcdC8vIHRoaXMgYXZvaWRzIGl0ZXJhdGluZyBvdmVyIHRoZSBmdW5jdGlvbiBpdHNlbGZcclxuXHRcdFx0dmFyIGluamVjdFBhcmFtZXRlcnM6IGFueVtdID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG5cdFx0XHRpbmplY3RQYXJhbWV0ZXJzLnB1c2goKC4uLmluamVjdGVkU2VydmljZXM6IGFueVtdKSA9PiB7XHJcblx0XHRcdFx0Ly8gc2hvdWxkIGdldCBjYWxsZWQgd2l0aCB0aGUgc2VydmljZXMgaW5qZWN0ZWQgYnkgYW5ndWxhclxyXG5cdFx0XHRcdC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG5cdFx0XHRcdF8uZWFjaChzZXJ2aWNlTmFtZXMsIChzZXJ2aWNlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRcdHNlcnZpY2VzW3NlcnZpY2VdID0gaW5qZWN0ZWRTZXJ2aWNlc1tpbmRleF07XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLmluamVjdChpbmplY3RQYXJhbWV0ZXJzKTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlcztcclxuXHRcdH1cclxuXHJcblx0XHRtb2NrKG1vY2tzOiBhbnkpOiB2b2lkIHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgoJHByb3ZpZGU6IGFuZ3VsYXIuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0XHRfLmVhY2gobW9ja3MsICh2YWx1ZTogYW55LCBrZXk6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0JHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udHJvbGxlcjxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIHNjb3BlPzogYW55LCBsb2NhbHM/OiBhbnkpOiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29udHJvbGxlcicpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbnRyb2xsZXI6IGFueSA9IHNlcnZpY2VzLiRjb250cm9sbGVyO1xyXG5cclxuXHRcdFx0c2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdFx0aWYgKGxvY2FscyA9PSBudWxsKSB7XHJcblx0XHRcdFx0bG9jYWxzID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2NvcGU6IHNjb3BlLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6IDxUQ29udHJvbGxlclR5cGU+JGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGlyZWN0aXZlKGRvbTogc3RyaW5nKTogSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb21waWxlOiBhbnkgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoJ3Jlbm92b1RlbXBsYXRlcycpO1xyXG5cclxuXHRcdFx0dmFyIGNvbXBvbmVudDogYW55ID0gJGNvbXBpbGUoZG9tKSgkcm9vdFNjb3BlKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0ZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcblx0XHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgYW5ndWxhckZpeHR1cmU6IElBbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSUF1dG9zYXZlQWN0aW9uTW9jayB7XHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPHZvaWQ+KTogbmcuSVByb21pc2U8dm9pZD47XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU1vY2tGb3JtQ29udHJvbGxlciB7XHJcblx0XHQkcHJpc3RpbmU6IGJvb2xlYW47XHJcblx0XHQkc2V0UHJpc3RpbmU6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ2F1dG9zYXZlJywgKCkgPT4ge1xyXG5cdFx0dmFyIGF1dG9zYXZlOiBJQXV0b3NhdmVTZXJ2aWNlO1xyXG5cdFx0dmFyIGF1dG9zYXZlRmFjdG9yeTogSUF1dG9zYXZlU2VydmljZUZhY3Rvcnk7XHJcblx0XHR2YXIgc2F2ZVNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIgdHJpZ2dlclNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIgc2V0UHJpc3RpbmVTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIGJhc2VDb250ZW50Rm9ybTogSU1vY2tGb3JtQ29udHJvbGxlcjtcclxuXHRcdHZhciAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHRyaWdnZXJTcHkgPSBzaW5vbi5zcHkoKHByb21pc2U6IG5nLklQcm9taXNlPHZvaWQ+KTogbmcuSVByb21pc2U8dm9pZD4gPT4geyByZXR1cm4gcHJvbWlzZTsgfSk7XHJcblx0XHRcdHZhciBhdXRvc2F2ZUFjdGlvblNlcnZpY2U6IElBdXRvc2F2ZUFjdGlvbk1vY2sgPSB7IHRyaWdnZXI6IHRyaWdnZXJTcHkgfTtcclxuXHJcblx0XHRcdF9fdGVzdC5hbmd1bGFyRml4dHVyZS5tb2NrKHtcclxuXHRcdFx0XHRhdXRvc2F2ZUFjdGlvbjogYXV0b3NhdmVBY3Rpb25TZXJ2aWNlLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNldFByaXN0aW5lU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRiYXNlQ29udGVudEZvcm0gPSB7XHJcblx0XHRcdFx0JHByaXN0aW5lOiBmYWxzZSxcclxuXHRcdFx0XHQkc2V0UHJpc3RpbmU6IHNldFByaXN0aW5lU3B5LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lLCAnJHEnLCAnJHJvb3RTY29wZScpO1xyXG5cdFx0XHRhdXRvc2F2ZUZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHRcdHZhciAkcTogbmcuSVFTZXJ2aWNlID0gc2VydmljZXMuJHE7XHJcblx0XHRcdCRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cclxuXHRcdFx0c2F2ZVNweSA9IHNpbm9uLnNweSgoKTogbmcuSVByb21pc2U8dm9pZD4gPT4geyByZXR1cm4gJHEud2hlbigpOyB9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCBzYXZlIG9uIHRoZSBwYXJlbnQgYW5kIHNldCB0aGUgZm9ybSB0byBwcmlzdGluZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSwgPGFueT5iYXNlQ29udGVudEZvcm0pO1xyXG5cclxuXHRcdFx0dmFyIGNsb3NlOiBib29sZWFuID0gYXV0b3NhdmUuYXV0b3NhdmUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChjbG9zZSkudG8uYmUudHJ1ZTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHNhdmVTcHkpO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzZXRQcmlzdGluZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG5vdCBzYXZlIGlmIHRoZSBmb3JtIGlzIHByaXN0aW5lJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5LCA8YW55PmJhc2VDb250ZW50Rm9ybSk7XHJcblxyXG5cdFx0XHRiYXNlQ29udGVudEZvcm0uJHByaXN0aW5lID0gdHJ1ZTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHNhdmVTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCB2YWxpZGF0ZSB1c2luZyB0aGUgdmFsaWRhdG9yIGlmIG9uZSBleGlzdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciB2YWxpZGF0ZVNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKCk6IGJvb2xlYW4gPT4geyByZXR1cm4gdHJ1ZTsgfSk7XHJcblxyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5LCA8YW55PmJhc2VDb250ZW50Rm9ybSwgdmFsaWRhdGVTcHkpO1xyXG5cclxuXHRcdFx0dmFyIGNsb3NlOiBib29sZWFuID0gYXV0b3NhdmUuYXV0b3NhdmUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChjbG9zZSkudG8uYmUudHJ1ZTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHZhbGlkYXRlU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uoc2F2ZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aXRob3V0IHNhdmluZyBpZiB2YWxpZGF0aW9uIGZhaWxzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgdmFsaWRhdGVTcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCgpOiBib29sZWFuID0+IHsgcmV0dXJuIGZhbHNlOyB9KTtcclxuXHJcblx0XHRcdGF1dG9zYXZlID0gYXV0b3NhdmVGYWN0b3J5LmdldEluc3RhbmNlKHNhdmVTcHksIDxhbnk+YmFzZUNvbnRlbnRGb3JtLCB2YWxpZGF0ZVNweSk7XHJcblxyXG5cdFx0XHR2YXIgY2xvc2U6IGJvb2xlYW4gPSBhdXRvc2F2ZS5hdXRvc2F2ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNsb3NlKS50by5iZS5mYWxzZTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHZhbGlkYXRlU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChzYXZlU3B5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgYWx3YXlzIHNhdmUgaWYgbm8gZm9ybSBpcyBzcGVjaWZpZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGF1dG9zYXZlID0gYXV0b3NhdmVGYWN0b3J5LmdldEluc3RhbmNlKHNhdmVTcHkpO1xyXG5cclxuXHRcdFx0dmFyIGNsb3NlOiBib29sZWFuID0gYXV0b3NhdmUuYXV0b3NhdmUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChjbG9zZSkudG8uYmUudHJ1ZTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHNhdmVTcHkpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXI7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQ7XHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0XHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogVERhdGFUeXBlW107XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IG51bWJlcn0pOiBURGF0YVR5cGVbXTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFycmF5VXRpbGl0eSBpbXBsZW1lbnRzIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRfLmVhY2goYXJyYXksIChpdGVtOiBURGF0YVR5cGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZCB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtPzogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRsaXN0ID0gXy5tYXAoYXJyYXksIChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgPT4geyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsgKGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZyB8IG51bWJlciB9KTogVERhdGFUeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlW10gPT4ge1xyXG5cdFx0XHRcdGRpY3Rpb25hcnlbPGFueT5rZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG5cdFx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0XHR9LCBbXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RPYmoge1xyXG5cdFx0cHJvcDogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElLZXlPYmoge1xyXG5cdFx0a2V5OiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRkZXNjcmliZSgnYXJyYXlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGFycmF5VXRpbGl0eTogSUFycmF5VXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdGFycmF5VXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdmaW5kSW5kZXhPZicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBmaW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBpbiBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHByZWRpY2F0ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtICUgMikgPT09IDA7IH0pKS50by5lcXVhbCgxKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtID4gMTApOyB9KSkudG8uZXF1YWwoLTEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZW1vdmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBzcGVjaWZpZWQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgcmV0dXJuIHRoZSBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAzKSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5Lmxlbmd0aCkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIDEwKSkudG8ubm90LmV4aXN0O1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBmaXJzdCBpdGVtIG1hdGNoaW5nIHRoZSBwcmVkaWNhdGUgYW5kIHJldHVybiBpdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAzKTsgfSkpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheS5sZW5ndGgpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAoaXRlbTogbnVtYmVyKTogYm9vbGVhbiA9PiB7IHJldHVybiAoaXRlbSA+IDEwKTsgfSkpLnRvLm5vdC5leGlzdDtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncmVwbGFjZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXBsYWNlIGFuIGl0ZW0gaW4gdGhlIGFycmF5IHdpdGggYW5vdGhlciBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheVdpdGhJdGVtczogbnVtYmVyW10gPSBbMywgNSwgN107XHJcblx0XHRcdFx0YXJyYXlVdGlsaXR5LnJlcGxhY2UoYXJyYXlXaXRoSXRlbXMsIDUsIDEwKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzBdKS50by5lcXVhbCgzKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMV0pLnRvLmVxdWFsKDEwKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgZG8gbm90aGluZyBpZiB0aGUgaXRlbSB0byByZXBsYWNlIGlzIG5vdCBmb3VuZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXlXaXRoSXRlbXM6IG51bWJlcltdID0gWzQsIDYsIDhdO1xyXG5cdFx0XHRcdGFycmF5VXRpbGl0eS5yZXBsYWNlKGFycmF5V2l0aEl0ZW1zLCA1LCAxMCk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1swXSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzFdKS50by5lcXVhbCg2KTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdzdW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgc3VtIHRoZSB2YWx1ZXMgaW4gYW4gYXJyYXknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMTUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgYXBwbHkgYSB0cmFuc2Zvcm0gdG8gdGhlIHZhbHVlcyBiZWZvcmUgc3VtbWluZyB0aGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IElUZXN0T2JqW10gPSBbeyBwcm9wOiAxIH0sIHsgcHJvcDogNCB9LCB7IHByb3A6IDcgfV07XHJcblx0XHRcdFx0dmFyIHRyYW5zZm9ybTogeyAoaXRlbTogSVRlc3RPYmopOiBudW1iZXIgfSA9IChpdGVtOiBJVGVzdE9iaik6IG51bWJlciA9PiB7IHJldHVybiBpdGVtLnByb3A7IH07XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzLCB0cmFuc2Zvcm0pKS50by5lcXVhbCgxMik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gMCBpZiB0aGVyZSBhcmUgbm8gaXRlbXMgdG8gc3VtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IG51bWJlcltdID0gW107XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RvRGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IElLZXlPYmpbXSA9IFtcclxuXHRcdFx0XHRcdHsga2V5OiAxMSB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDEyIH0sXHJcblx0XHRcdFx0XHR7IGtleTogMTMgfSxcclxuXHRcdFx0XHRcdHsga2V5OiAxNCB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDE1IH0sXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0dmFyIGRpY3Rpb25hcnk6IElLZXlPYmpbXSA9IGFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkoYXJyYXksIChpdGVtOiBJS2V5T2JqKTogbnVtYmVyID0+IHsgcmV0dXJuIGl0ZW0ua2V5OyB9KTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTFdKS50by5lcXVhbChhcnJheVswXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTJdKS50by5lcXVhbChhcnJheVsxXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTNdKS50by5lcXVhbChhcnJheVsyXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTRdKS50by5lcXVhbChhcnJheVszXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTVdKS50by5lcXVhbChhcnJheVs0XSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdhdXRvc2F2ZUFjdGlvbicsICgpID0+IHtcclxuXHRcdHZhciBhdXRvc2F2ZUFjdGlvbjogSUF1dG9zYXZlQWN0aW9uU2VydmljZTtcclxuXHRcdHZhciAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlO1xyXG5cdFx0dmFyICRxOiBuZy5JUVNlcnZpY2U7XHJcblx0XHR2YXIgJHJvb3RTY29wZTogbmcuSVNjb3BlO1xyXG5cdFx0dmFyIGRlZmVycmVkOiBuZy5JRGVmZXJyZWQ8dm9pZD47XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUsICckdGltZW91dCcsICckcScsICckcm9vdFNjb3BlJyk7XHJcblx0XHRcdGF1dG9zYXZlQWN0aW9uID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0XHQkdGltZW91dCA9IHNlcnZpY2VzLiR0aW1lb3V0O1xyXG5cdFx0XHQkcSA9IHNlcnZpY2VzLiRxO1xyXG5cdFx0XHQkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHJcblx0XHRcdGRlZmVycmVkID0gJHEuZGVmZXI8dm9pZD4oKTtcclxuXHJcblx0XHRcdGF1dG9zYXZlQWN0aW9uLnRyaWdnZXIoZGVmZXJyZWQucHJvbWlzZSk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uc2F2aW5nKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgc3VjY2Vzc2Z1bCB0byB0cnVlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzIHN1Y2Nlc3NmdWxseScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zYXZpbmcpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uY29tcGxldGUpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zdWNjZXNzZnVsKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgc3VjY2Vzc2Z1bCB0byBmYWxzZSBpZiB0aGUgcHJvbWlzZSBmYWlscycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnNhdmluZykudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5jb21wbGV0ZSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnN1Y2Nlc3NmdWwpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgY29tcGxldGUgdG8gZmFsc2UgYWZ0ZXIgMSBzZWNvbmQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGRlZmVycmVkLnJlc29sdmUoKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uY29tcGxldGUpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHQkdGltZW91dC5mbHVzaCgxMDAwKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5jb21wbGV0ZSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiAhIW9iamVjdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdib29sZWFuVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBib29sZWFuVXRpbGl0eTogSUJvb2xlYW5VdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0Ym9vbGVhblV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndG9Cb29sJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGNvbnZlcnQgbnVsbCBhbmQgdW5kZWZpbmVkIHRvIGZhbHNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2wobnVsbCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2wodW5kZWZpbmVkKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBsZWF2ZSBib29sIHZhbHVlcyB1bmNoYW5nZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGJvb2xlYW5VdGlsaXR5LnRvQm9vbChmYWxzZSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2wodHJ1ZSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXI8VFJldHVyblR5cGU+IHtcclxuXHRcdGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT47XHJcblx0XHRldmVudD86IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IElBY3Rpb248dm9pZD4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXTtcclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdFx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQ7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlci5hY3Rpb24uYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHRcdFx0fSkudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCk6IElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnY29udGVudFByb3ZpZGVyRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkO1xyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeTtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdUZXh0OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0fVxyXG5cclxuXHRjbGFzcyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlIGltcGxlbWVudHMgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3Iob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0XHRwcml2YXRlIGNvbnRlbnQ6IEpRdWVyeTtcclxuXHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudDogeyh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWR9ID0gKHRyYW5zY2x1ZGVGdW5jdGlvbjogbmcuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKHRyYW5zY2x1ZGVGdW5jdGlvbikpIHtcclxuXHRcdFx0XHR0cmFuc2NsdWRlRnVuY3Rpb24oKGNsb25lOiBKUXVlcnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q29udGVudChjbG9uZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YWJsZS5yZWdpc3RlcigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9LCAnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5IHtcclxuXHRcdFx0aWYgKHNlbGVjdG9yICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50LmZpbHRlcihzZWxlY3Rvcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbb2JzZXJ2YWJsZS5mYWN0b3J5TmFtZV07XHJcblx0ZnVuY3Rpb24gY29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQ29udGVudFByb3ZpZGVyU2VydmljZShvYnNlcnZhYmxlRmFjdG9yeSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JzZXJ2YWJsZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnY29udGVudFByb3ZpZGVyJywgKCkgPT4ge1xyXG5cdFx0dmFyIGNvbnRlbnRQcm92aWRlcjogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0XHR2YXIgdHJhbnNjbHVkZVNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIgZmlsdGVyU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBqcXVlcnlDbG9uZTogYW55O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0dmFyIGNvbnRlbnRQcm92aWRlckZhY3Rvcnk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeVxyXG5cdFx0XHRcdD0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIgPSBjb250ZW50UHJvdmlkZXJGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblxyXG5cdFx0XHRqcXVlcnlDbG9uZSA9IHt9O1xyXG5cdFx0XHRmaWx0ZXJTcHkgPSBzaW5vbi5zcHkoKG9iamVjdDogYW55KTogYW55ID0+IHsgcmV0dXJuIG9iamVjdDsgfSk7XHJcblx0XHRcdGpxdWVyeUNsb25lLmZpbHRlciA9IGZpbHRlclNweTtcclxuXHJcblx0XHRcdHRyYW5zY2x1ZGVTcHkgPSBzaW5vbi5zcHkoKGZ1bmM6IEZ1bmN0aW9uKSA9PiBmdW5jKGpxdWVyeUNsb25lKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGdldCB0aGUgY29udGVudCB0aGF0IHdhcyBzZXQgYnkgc2V0Q29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cdFx0XHRleHBlY3QoY29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoKSkudG8uZXF1YWwoanF1ZXJ5Q2xvbmUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRlbnQgdG8gdGhlIGNvbnRlbnQgcHJvdmlkZWQgYnkgdGhlIHRyYW5zY2x1ZGUgZnVuY3Rpb24nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlU3B5KTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHRyYW5zY2x1ZGVTcHkpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCkpLnRvLmVxdWFsKGpxdWVyeUNsb25lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZmlsdGVyIHRoZSBqcXVlcnkgb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBzZWxlY3RvcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoJ3NlbGVjdG9yJyk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmaWx0ZXJTcHkpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmaWx0ZXJTcHksICdzZWxlY3RvcicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBjYWxsIHRoZSBhY3Rpb24gd2l0aCB0aGUgbmV3IGNvbnRlbnQgd2hlbiB0aGUgY29udGVudCBjaGFuZ2VzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYWN0aW9uU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnJlZ2lzdGVyKGFjdGlvblNweSk7XHJcblxyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShhY3Rpb25TcHkpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChhY3Rpb25TcHksIGpxdWVyeUNsb25lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCB0aGUgYWN0aW9uIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGlzIGFscmVhZHkgY29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFjdGlvblNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5yZWdpc3RlcihhY3Rpb25TcHkpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYWN0aW9uU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYWN0aW9uU3B5LCBqcXVlcnlDbG9uZSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbGc6IHN0cmluZyA9ICdsZyc7XHJcblx0ZXhwb3J0IHZhciBtZDogc3RyaW5nID0gJ21kJztcclxuXHRleHBvcnQgdmFyIHNtOiBzdHJpbmcgPSAnc20nO1xyXG5cdGV4cG9ydCB2YXIgeHM6IHN0cmluZyA9ICd4cyc7XHJcbn1cclxuIiwiLypcclxuICogSW1wbGVtZW50YXRpb24gYWxzbyByZXF1aXJlcyB0aGUgZm9sbG93aW5nIGVsZW1lbnRzIHRvIGJlIGluc2VydGVkIG9uIHRoZSBwYWdlOlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UteHMgdmlzaWJsZS14c1wiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2Utc20gdmlzaWJsZS1zbVwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbWQgdmlzaWJsZS1tZFwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbGcgdmlzaWJsZS1sZ1wiPjwvZGl2PlxyXG4gKi9cclxuXHJcbiBtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWU6IHN0cmluZyA9ICd2aXNpYmxlQnJlYWtwb2ludCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpc2libGVCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UgaW1wbGVtZW50cyBJVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdGlzVmlzaWJsZShicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0Ly8ganF1ZXJ5IGdldHMgdGhlIGJyZWFrcG9pbnQgdHJpZ2dlciBkaXJlY3RpdmVzIGxpc3RlZCBhYm92ZSBvbiBsaW5lIDNcclxuXHRcdFx0cmV0dXJuICQoJy5kZXZpY2UtJyArIGJyZWFrcG9pbnQpLmlzKCc6dmlzaWJsZScpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnd2luZG93Q29udHJvbCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdpbmRvd1NlcnZpY2Uge1xyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiBhbnkgfSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBXaW5kb3dTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2luZG93Q29udHJvbDogSlF1ZXJ5ID0gJCh3aW5kb3cpO1xyXG5cclxuXHRcdHJlc2l6ZShjYWxsYmFjazogeyAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogYW55IH0pOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53aW5kb3dDb250cm9sLnJlc2l6ZShjYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBXaW5kb3dTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYnJlYWtwb2ludHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Zpc2libGVCcmVha3BvaW50cy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX193aW5kb3cgPSBybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93O1xyXG5cdGltcG9ydCBfX29ic2VydmFibGUgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZTtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYnJlYWtwb2ludHMnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRjdXJyZW50QnJlYWtwb2ludDogc3RyaW5nO1xyXG5cdFx0aXNCcmVha3BvaW50KGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZH0pOiBfX29ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBCcmVha3BvaW50U2VydmljZSBpbXBsZW1lbnRzIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsICdyZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcycsIF9fd2luZG93LnNlcnZpY2VOYW1lLCBfX29ic2VydmFibGUuZmFjdG9yeU5hbWVdXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHZpc2libGVCcmVha3BvaW50czogSVZpc2libGVCcmVha3BvaW50U2VydmljZVxyXG5cdFx0XHRcdCwgcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHM6IG51bWJlclxyXG5cdFx0XHRcdCwgd2luZG93U2VydmljZTogX193aW5kb3cuSVdpbmRvd1NlcnZpY2VcclxuXHRcdFx0XHQsIG9ic2VydmFibGVGYWN0b3J5OiBfX29ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gdGhpcy5nZXRCcmVha3BvaW50KCk7XHJcblxyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdFx0dmFyIGVmZmljaWVudFJlc2l6ZTogeygpOiB2b2lkfSA9IF8uZGVib3VuY2UodGhpcy51cGRhdGVCcmVha3BvaW50LCByZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcywge1xyXG5cdFx0XHRcdGxlYWRpbmc6IHRydWUsXHJcblx0XHRcdFx0dHJhaWxpbmc6IHRydWUsXHJcblx0XHRcdFx0bWF4V2FpdDogcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR3aW5kb3dTZXJ2aWNlLnJlc2l6ZShlZmZpY2llbnRSZXNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogX19vYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdGN1cnJlbnRCcmVha3BvaW50OiBzdHJpbmc7XHJcblxyXG5cdFx0cHJpdmF0ZSBnZXRCcmVha3BvaW50KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLnZpc2libGVCcmVha3BvaW50cy5pc1Zpc2libGUobGcpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGxnO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudmlzaWJsZUJyZWFrcG9pbnRzLmlzVmlzaWJsZShtZCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbWQ7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy52aXNpYmxlQnJlYWtwb2ludHMuaXNWaXNpYmxlKHNtKSkge1xyXG5cdFx0XHRcdHJldHVybiBzbTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4geHM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc0JyZWFrcG9pbnQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyAoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZCB9KTogX19vYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKGFjdGlvbiwgJ3dpbmRvdy5icmVha3BvaW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdXBkYXRlQnJlYWtwb2ludDogeygpOiB2b2lkfSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG5ld0JyZWFrUG9pbnQ6IHN0cmluZyA9IHRoaXMuZ2V0QnJlYWtwb2ludCgpO1xyXG5cclxuXHRcdFx0aWYgKG5ld0JyZWFrUG9pbnQgIT09IHRoaXMuY3VycmVudEJyZWFrcG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gbmV3QnJlYWtQb2ludDtcclxuXHRcdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnd2luZG93LmJyZWFrcG9pbnRDaGFuZ2VkJywgdGhpcy5jdXJyZW50QnJlYWtwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX3dpbmRvdy5tb2R1bGVOYW1lLCBfX29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuY29uc3RhbnQoJ3Jlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzJywgNTAwKVxyXG5cdFx0LnNlcnZpY2UodmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsIFZpc2libGVCcmVha3BvaW50U2VydmljZSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCcmVha3BvaW50U2VydmljZSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdicmVha3BvaW50cy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGludGVyZmFjZSBJVmlzaWJsZUJyZWFrcG9pbnRzTW9jayB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJV2luZG93U2VydmljZU1vY2sge1xyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7KGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IGFueX0pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ2JyZWFrcG9pbnRzJywgKCkgPT4ge1xyXG5cdFx0dmFyIGJyZWFrcG9pbnRzOiBJQnJlYWtwb2ludFNlcnZpY2U7XHJcblxyXG5cdFx0dmFyIHZpc2libGVCcmVha3BvaW50OiBzdHJpbmc7XHJcblx0XHR2YXIgdHJpZ2dlclJlc2l6ZTogeyAoKTogdm9pZCB9O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBoYXZlIHZpc2libGUgYnJlYWtwb2ludCBtYXJrZWQgYXMgY3VycmVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQgPSBtZDtcclxuXHJcblx0XHRcdGJ1aWxkU2VydmljZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmN1cnJlbnRCcmVha3BvaW50KS50by5lcXVhbChtZCk7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQobWQpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KGxnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQoc20pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludCh4cykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzaWduYWwgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMgd2hlbiB0aGUgYnJlYWtwb2ludCBjaGFuZ2VzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYnJlYWtwb2ludENoYW5nZVNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdHZpc2libGVCcmVha3BvaW50ID0gc207XHJcblxyXG5cdFx0XHRidWlsZFNlcnZpY2UoKTtcclxuXHJcblx0XHRcdGJyZWFrcG9pbnRzLnJlZ2lzdGVyKGJyZWFrcG9pbnRDaGFuZ2VTcHkpO1xyXG5cclxuXHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQgPSBtZDtcclxuXHRcdFx0dHJpZ2dlclJlc2l6ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmN1cnJlbnRCcmVha3BvaW50KS50by5lcXVhbChtZCk7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQobWQpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KGxnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQoc20pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludCh4cykpLnRvLmJlLmZhbHNlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYnJlYWtwb2ludENoYW5nZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRmdW5jdGlvbiBidWlsZFNlcnZpY2UoKTogdm9pZCB7XHJcblx0XHRcdHZhciBtb2NrVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlOiBJVmlzaWJsZUJyZWFrcG9pbnRzTW9jayA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IChicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBicmVha3BvaW50ID09PSB2aXNpYmxlQnJlYWtwb2ludDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG1vY2tXaW5kb3dDb250cm9sOiBJV2luZG93U2VydmljZU1vY2sgPSB7XHJcblx0XHRcdFx0cmVzaXplOiAoY2FsbGJhY2s6IHsgKCk6IHZvaWQgfSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclJlc2l6ZSA9IGNhbGxiYWNrO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRfX3Rlc3QuYW5ndWxhckZpeHR1cmUubW9jayh7XHJcblx0XHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQ6IG1vY2tWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UsXHJcblx0XHRcdFx0d2luZG93Q29udHJvbDogbW9ja1dpbmRvd0NvbnRyb2wsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0YnJlYWtwb2ludHMgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBOdW1iZXJVdGlsaXR5IGltcGxlbWVudHMgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0XHRyZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKDxudW1iZXI+c2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRcdEJZVEVTX1BFUl9HQjogbnVtYmVyID0gMTA3Mzc0MTgyNDtcclxuXHRcdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRcdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0XHRieXRlczogbnVtYmVyO1xyXG5cclxuXHRcdEdCOiBudW1iZXI7XHJcblx0XHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRcdE1COiBudW1iZXI7XHJcblx0XHRpc01COiBib29sZWFuO1xyXG5cclxuXHRcdEtCOiBudW1iZXI7XHJcblx0XHRpc0tCOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSwgYnl0ZXM6IG51bWJlcikge1xyXG5cdFx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlci5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHkpOiBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemUge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0XHRyZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZUZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHRcdC5maWx0ZXIoc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZGVzY3JpYmUoJ2ZpbGVTaXplJywgKCkgPT4ge1xyXG5cdFx0dmFyIGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmFjdG9yeU5hbWUpO1xyXG5cdFx0XHRmaWxlU2l6ZUZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGRldGVybWluZSBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxKS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIGJ5dGVzJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTAyMykuZGlzcGxheSgpKS50by5lcXVhbCgnMTAyMyBieXRlcycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUga2lsbyBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxMDI0KS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIEtCJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA0ODU3NSkuZGlzcGxheSgpKS50by5lcXVhbCgnMTAyNCBLQicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUgbWVnYSBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxMDQ4NTc2KS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIE1CJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA3Mzc0MTgyMykuZGlzcGxheSgpKS50by5lcXVhbCgnMTAyNCBNQicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUgZ2lnYSBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxMDczNzQxODI0KS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIEdCJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA3Mzc0MTgyNSkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBHQicpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgZGF0ZVNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdFx0eyBuYW1lOiAnSmFudWFyeScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0FwcmlsJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bHknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vbnRoOiBJTW9udGhbXTtcclxuXHJcblx0XHRwcml2YXRlIGlzTGVhcFllYXIoeWVhcj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0XHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0XHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0XHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdFx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxuXHR9O1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2UoZGF0ZVNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHRcdC52YWx1ZShkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2RhdGVVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGRhdGVVdGlsaXR5OiBJRGF0ZVV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZGF0ZVNlcnZpY2VOYW1lKTtcclxuXHRcdFx0ZGF0ZVV0aWxpdHkgPSBzZXJ2aWNlc1tkYXRlU2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2dldEZ1bGxTdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgZ2V0IHRoZSBtb250aCBuYW1lJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDApKS50by5lcXVhbCgnSmFudWFyeScpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEpKS50by5lcXVhbCgnRmVicnVhcnknKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygyKSkudG8uZXF1YWwoJ01hcmNoJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMykpLnRvLmVxdWFsKCdBcHJpbCcpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDQpKS50by5lcXVhbCgnTWF5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNSkpLnRvLmVxdWFsKCdKdW5lJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNikpLnRvLmVxdWFsKCdKdWx5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNykpLnRvLmVxdWFsKCdBdWd1c3QnKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg4KSkudG8uZXF1YWwoJ1NlcHRlbWJlcicpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDkpKS50by5lcXVhbCgnT2N0b2JlcicpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEwKSkudG8uZXF1YWwoJ05vdmVtYmVyJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMTEpKS50by5lcXVhbCgnRGVjZW1iZXInKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnZ2V0RGF5cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygwKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDIpKS50by5lcXVhbCgzMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMykpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg0KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDUpKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNikpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg3KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDgpKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoOSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMCkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIGFjY291bnQgZm9yIGxlYXAgeWVhcnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMSwgMjAxNSkpLnRvLmVxdWFsKDI4KTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxLCAyMDE2KSkudG8uZXF1YWwoMjkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHQgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW2FycmF5LnNlcnZpY2VOYW1lXTtcclxuXHRcdCBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBhcnJheS5JQXJyYXlVdGlsaXR5KSB7XHJcblx0XHQgfVxyXG5cclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdFx0dmFyIGtleXMyOiBzdHJpbmdbXSA9IF8ua2V5cyhvYmoyKTtcclxuXHRcdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdFx0Ly9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRcdGlmIChfLmFueShrZXlzMikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcblx0XHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCArICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdzdHJpbmdVdGlsaXR5U2VydmljZSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHRcdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdFx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxpdHlTZXJ2aWNlIGltcGxlbWVudHMgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHRcdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuICtzdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoc3Vic3RyaW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdFx0Xy5lYWNoKHBhcmFtcywgKHBhcmFtOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRmb3JtYXRTdHJpbmcgPSB0aGlzLnJlcGxhY2VBbGwoZm9ybWF0U3RyaW5nLCAnXFxcXHsnICsgaW5kZXggKyAnXFxcXH0nLCBwYXJhbSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZm9ybWF0U3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgU3RyaW5nVXRpbGl0eVNlcnZpY2UpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0XHR1cGRhdGVPcHRpb25Db3VudHM8VEl0ZW1UeXBlPihkYXRhOiBUSXRlbVR5cGVbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL2ZpbHRlcnMvZmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnknO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gJ3NlYXJjaCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXIgZXh0ZW5kcyBmaWx0ZXIuSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0XHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuO1xyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBHZW5lcmljU2VhcmNoRmlsdGVyIGltcGxlbWVudHMgSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG9iamVjdDogb2JqZWN0LklPYmplY3RVdGlsaXR5LCBwcml2YXRlIHN0cmluZzogc3RyaW5nLklTdHJpbmdVdGlsaXR5U2VydmljZSkge31cclxuXHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QoaXRlbSwgdGhpcy5zZWFyY2hUZXh0LCB0aGlzLmNhc2VTZW5zaXRpdmUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IGFueSA9IF8udmFsdWVzKGl0ZW0pO1xyXG5cdFx0XHRcdHJldHVybiBfLmFueSh2YWx1ZXMsICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7IHJldHVybiB0aGlzLnNlYXJjaE9iamVjdCh2YWx1ZSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0XHRpZiAoIWNhc2VTZW5zaXRpdmUpIHtcclxuXHRcdFx0XHRcdHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuXHR9XHJcblxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0LnNlcnZpY2VOYW1lLCBzdHJpbmcuc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KG9iamVjdDogb2JqZWN0LklPYmplY3RVdGlsaXR5LFxyXG5cdFx0c3RyaW5nVXRpbGl0eTogc3RyaW5nLklTdHJpbmdVdGlsaXR5U2VydmljZSk6IElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblxyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmdVdGlsaXR5KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3QubW9kdWxlTmFtZSwgc3RyaW5nLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RPYmplY3Qge1xyXG5cdFx0cHJvcDogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElUZXN0T2JqZWN0MiB7XHJcblx0XHRwcm9wMT86IG51bWJlcjtcclxuXHRcdHByb3AyPzogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElOZXN0ZWRUZXN0T2JqZWN0IHtcclxuXHRcdG5lc3RlZE9iamVjdDogSVRlc3RPYmplY3QyO1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ2dlbmVyaWNTZWFyY2hGaWx0ZXInLCAoKSA9PiB7XHJcblx0XHR2YXIgZ2VuZXJpY1NlYXJjaEZpbHRlcjogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmFjdG9yeU5hbWUpO1xyXG5cdFx0XHR2YXIgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnk6IElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSA9IHNlcnZpY2VzW2ZhY3RvcnlOYW1lXTtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlciA9IGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGluY2x1ZGUgYWxsIGl0ZW1zIGlmIHF1ZXJ5IGlzIG51bGwgb3IgZW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoVGV4dCA9IG51bGw7XHJcblxyXG5cdFx0XHR2YXIgb2JqZWN0MTogSVRlc3RPYmplY3QgPSB7XHJcblx0XHRcdFx0cHJvcDogJ3NvbWUgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBvYmplY3QyOiBJVGVzdE9iamVjdCA9IHtcclxuXHRcdFx0XHRwcm9wOiAnYW5vdGhlciB2YWx1ZScsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0MSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3QyKSkudG8uYmUudHJ1ZTtcclxuXHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoVGV4dCA9ICcnO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0MSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3QyKSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2VhcmNoIHRoZSBhY3R1YWwgZGF0YSB2YWx1ZXMgaWYgdGhleSBhcmVudCBvYmplY3RzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnMic7XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoMSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoMikpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcigzKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcig0KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcig1KSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGluY2x1ZGUgaXRlbXMgdGhhdCBjb250YWluIHRoZSBzZWFyY2ggc3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnbXknO1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLmNhc2VTZW5zaXRpdmUgPSB0cnVlO1xyXG5cdFx0XHR2YXIgbWF0Y2hpbmdPYmplY3QxOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDI6ICdteSBzdHJpbmcnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG1hdGNoaW5nT2JqZWN0MjogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AxOiA1LFxyXG5cdFx0XHRcdHByb3AyOiAnc29tZSBzdHJpbmcgd2l0aCBteScsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgb2JqZWN0V2l0aG91dFNlYXJjaFN0cmluZzogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AxOiAyLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG9iamVjdFdpdGhEaWZmZXJlbnRDYXNlOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDE6IDUsXHJcblx0XHRcdFx0cHJvcDI6ICdNWSBzdHJpbmcnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG1hdGNoaW5nT2JqZWN0MSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3RXaXRob3V0U2VhcmNoU3RyaW5nKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihtYXRjaGluZ09iamVjdDIpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0V2l0aERpZmZlcmVudENhc2UpKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgaW5jbHVkZSBpdGVtcyB0aGF0IGNvbnRhaW4gdGhlIHNlYXJjaCBzdHJpbmcsIGNhc2UgaW5zZW5zaXRpdmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoVGV4dCA9ICdteSc7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHR2YXIgbG93ZXJjYXNlTWF0Y2g6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMjogJ215IHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgdXBwZXJjYXNlTWF0Y2g6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMTogMi4yLFxyXG5cdFx0XHRcdHByb3AyOiAnTVkgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihsb3dlcmNhc2VNYXRjaCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcih1cHBlcmNhc2VNYXRjaCkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJlY3Vyc2l2ZWx5IHNlYXJjaCB0aGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoVGV4dCA9ICdteSc7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHR2YXIgb2JqZWN0V2l0aE5lc3RlZE9iamVjdDogSU5lc3RlZFRlc3RPYmplY3QgPSB7XHJcblx0XHRcdFx0bmVzdGVkT2JqZWN0OiB7XHJcblx0XHRcdFx0XHRwcm9wMjogJ215IHN0cmluZycsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3RXaXRoTmVzdGVkT2JqZWN0KSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdudW1iZXJVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0bnVtYmVyVXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdwcmVjaXNlUm91bmQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgNiB0byA2JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCg2LCAyKTtcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoNik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjI3NSB0byAxLjI4JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjI3NSwgMik7XHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuMjgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgMS4yNzQgdG8gMS4yNycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS4yNzQsIDIpO1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjI3KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuNTU1NTU1NTU1NTU1NTU1NTU1NTUgdG8gMS41NTU1NTU1NTU1NTU1NTU1NTU2JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdC8vIDIwIDUncy4gVGhpcyBpcyB0aGUgbWF4IHByZWNpc2lvbiBwcmVjaXNlX3JvdW5kIGlzIHZhbGlkIGZvclxyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjU1NTU1NTU1NTU1NTU1NTU1NTU1LCAxOSk7XHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuNTU1NTU1NTU1NTU1NTU1NTU1Nik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjk5OTk5OTk5OTk5OTk5OTk5OTk5OSB0byAyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjk5OTk5OTk5OTk5OTk5OTk5OTk5OSwgMjApOyAvLyAyMSA5J3NcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBub3Qgcm91bmQgMS4xMTExMTExMTExMTExMTExMTExMTEnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuMTExMTExMTExMTExMTExMTExMTExLCAyMCk7IC8vIDIxIDEnc1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjExMTExMTExMTExMTExMTExMTExKTtcdC8vIHRyaW1tZWQgMSBmcm9tIHRoZSBlbmRcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnb2JqZWN0VXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBvYmplY3RVdGlsaXR5OiBJT2JqZWN0VXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdG9iamVjdFV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnaXNOdWxsT3JFbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gZW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgnJykpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBzdHJpbmcgaGFzIGNvbnRlbnRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJ3JhbmRvbSBzdHJpbmcnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgbnVsbCBvciBlbXB0eSBhcnJheXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFtdKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFsxLCAyLCAzXSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgbnVtYmVyIHR5cGUgaXMgbm90IGEgbnVtYmVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoTnVtYmVyLk5hTikpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSg1KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2lzTnVsbE9yV2hpdGVzcGFjZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgZW1wdHkgd2hpdGVzcGFjZSBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgnICAgJykpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBoYW5kbGUgbnVsbCBhbmQgZW1wdHkgb2JqZWN0cyBsaWtlIGlzTnVsbE9yRW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKG51bGwpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShbXSkpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShbXSkpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSh7fSkpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSh7fSkpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgnJykpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgnJykpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgncmFuZG9tIHN0cmluZycpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJ3JhbmRvbSBzdHJpbmcnKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2FyZUVxdWFsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHR3byBwcmltaXRpdmVzIGFyZSBlcXVhbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc3RyaW5nMTogc3RyaW5nID0gJ2FiYyc7XHJcblx0XHRcdFx0dmFyIHN0cmluZzI6IHN0cmluZyA9ICdhYmMnO1xyXG5cdFx0XHRcdHZhciBudW0xOiBudW1iZXIgPSAxO1xyXG5cdFx0XHRcdHZhciBudW0yOiBudW1iZXIgPSAxO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKHN0cmluZzEsIHN0cmluZzIpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG51bTEsIG51bTIpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHR3byBvYmplY3RzIGFyZSBub3Qgb2YgdGhlIHNhbWUgdHlwZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc3RyaW5nOiBzdHJpbmcgPSAnYWJjJztcclxuXHRcdFx0XHR2YXIgbnVtOiBudW1iZXIgPSAxO1xyXG5cdFx0XHRcdHZhciBvYmo6IGFueSA9IHt9O1xyXG5cdFx0XHRcdHZhciBhcnJheTogYW55W10gPSBbXTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChzdHJpbmcsIG51bSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKHN0cmluZywgb2JqKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoc3RyaW5nLCBhcnJheSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG51bSwgb2JqKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwobnVtLCBhcnJheSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdC8vb2JqIGFuZCBhcnJheSBhcmUgY29uc2lkZXJlZCB0aGUgc2FtZSB0eXBlXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgb25lIG9iamVjdCBpcyB2YWxpZCBhbmQgdGhlIG90aGVyIGlzIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIG9iajogYW55ID0geyAnMSc6IDEsICcyJzogMiB9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iaiwgbnVsbCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGFycmF5cyBoYXZlIGRpZmZlcmVudCBsZW5ndGhzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTE6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRcdHZhciBhcnJheTI6IG51bWJlcltdID0gWzEsIDIsIDNdO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBjb21wYXJlIGFycmF5cyBieSBlbGVtZW50IGlmIHRoZXkgYXJlIHRoZSBzYW1lIGxlbmd0aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRcdHZhciBzaW1pbGFyQXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbnRBcnJheTogbnVtYmVyW10gPSBbNSwgNCwgMywgMiwgMV07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoYXJyYXksIHNpbWlsYXJBcnJheSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoYXJyYXksIGRpZmZlcmVudEFycmF5KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCB1c2UgdGhlIGtleXMgZnJvbSB0aGUgZmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUgcHJvcGVydGllcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgb2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgc2ltaWxhck9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVudE9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0J3R3byc6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIHNpbWlsYXJPYmplY3QpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgZGlmZmVyZW50T2JqZWN0KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgb2JqZWN0IDIgaGFzIHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCAxIHdpdGggYWRkaXRpb25hbCBwcm9wZXJ0aWVzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBvYmplY3QxOiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgb2JqZWN0MjogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdFx0JzQnOiA0LFxyXG5cdFx0XHRcdFx0JzUnOiA1LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0MSwgb2JqZWN0MikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmVjdXJzaXZlbHkgY29tcGFyZSBuZXN0ZWQgb2JqZWN0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgb2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bmVzdGVkQXJyYXk6IFsxLCAyLCAzXSxcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBzaW1pbGFyT2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bmVzdGVkQXJyYXk6IFsxLCAyLCAzXSxcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbnRPYmplY3QxOiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0J29uZSc6IDEsXHJcblx0XHRcdFx0XHRcdCd0d28nOiAyLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG5lc3RlZEFycmF5OiBbMSwgMiwgM10sXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgZGlmZmVyZW50T2JqZWN0MjogYW55ID0ge1xyXG5cdFx0XHRcdFx0bmVzdGVkT2JqOiB7XHJcblx0XHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG5lc3RlZEFycmF5OiBbMSwgMiwgMywgNCwgNV0sXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIHNpbWlsYXJPYmplY3QpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgZGlmZmVyZW50T2JqZWN0MSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgZGlmZmVyZW50T2JqZWN0MikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd0b1N0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCB0dXJuIG51bWJlcnMgaW50byBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKDUpKS50by5lcXVhbCgnNScpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKDIuNSkpLnRvLmVxdWFsKCcyLjUnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHR1cm4gYm9vbGVhbnMgaW50byBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKGZhbHNlKSkudG8uZXF1YWwoJ2ZhbHNlJyk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcodHJ1ZSkpLnRvLmVxdWFsKCd0cnVlJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCB0dXJuIHVuZGVmaW5lZCBhbmQgbnVsbCBpbnRvIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcodW5kZWZpbmVkKSkudG8uZXF1YWwoJ3VuZGVmaW5lZCcpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKG51bGwpKS50by5lcXVhbCgnbnVsbCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd2YWx1ZU9yRGVmYXVsdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdGhlIHZhbHVlIGlmIGl0IGlzIGRlZmluZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHNvbWVPYmplY3Q6IGFueSA9IHsgZXhpc3RpbmdQcm9wZXJ0eTogJ3ZhbHVlJyB9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0KHNvbWVPYmplY3QuZXhpc3RpbmdQcm9wZXJ0eSwgJ2RlZmF1bHQnKSkudG8uZXF1YWwoJ3ZhbHVlJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdGhlIGRlZmF1bHQgaWYgdGhlIHZhbHVlIGlzIG5vdCBkZWZpbmVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBzb21lT2JqZWN0OiBhbnkgPSB7IG51bGxQcm9wZXJ0eTogbnVsbCB9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0KHNvbWVPYmplY3QubnVsbFByb3BlcnR5LCAnZGVmYXVsdCcpKS50by5lcXVhbCgnZGVmYXVsdCcpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0KHNvbWVPYmplY3QubWlzc2luZ1Byb3BlcnR5LCAnZGVmYXVsdCcpKS50by5lcXVhbCgnZGVmYXVsdCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnb2JzZXJ2YWJsZScsICgpID0+IHtcclxuXHRcdHZhciBvYnNlcnZhYmxlOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmFjdG9yeU5hbWUpO1xyXG5cdFx0XHR2YXIgb2JzZXJ2YWJsZUZhY3Rvcnk6IElPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHRcdG9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIHdhdGNoZXIgYW5kIGNhbGwgdGhlIGFjdGlvbiB3aGVuIGZpcmUgaXMgY2FsbGVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYyk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZnVuYyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHVucmVnaXN0ZXIgb25seSB0aGUgaW5kaWNhdGVkIHdhdGNoZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciByZWdpc3RlcmVkRnVuYzE6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHRcdHZhciB1bnJlZ2lzdGVyZWRGdW5jOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHR2YXIgcmVnaXN0ZXJlZEZ1bmMyOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihyZWdpc3RlcmVkRnVuYzEpO1xyXG5cdFx0XHR2YXIgY2FuY2VsOiAoKSA9PiB2b2lkID0gb2JzZXJ2YWJsZS5yZWdpc3Rlcih1bnJlZ2lzdGVyZWRGdW5jKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihyZWdpc3RlcmVkRnVuYzIpO1xyXG5cclxuXHRcdFx0Y2FuY2VsKCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLmZpcmUoKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHJlZ2lzdGVyZWRGdW5jMSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQodW5yZWdpc3RlcmVkRnVuYyk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHJlZ2lzdGVyZWRGdW5jMik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG9ubHkgY2FsbCB3YXRjaGVyIHJlZ2lzdGVyZWQgd2l0aCB0aGUgc3BlY2lmaWVkIGV2ZW50IGlmIGZpcmUgaXMgY2FsbGVkIHdpdGggYW4gZXZlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBmdW5jV2l0aEV2ZW50OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHR2YXIgZnVuY1dpdGhvdXRFdmVudDogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuY1dpdGhFdmVudCwgJ215RXZlbnQnKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihmdW5jV2l0aG91dEV2ZW50KTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCdteUV2ZW50Jyk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZ1bmNXaXRob3V0RXZlbnQpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jV2l0aEV2ZW50KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IGNhbGwgd2F0Y2hlcnMgcmVnaXN0ZXJlZCB3aXRoIGEgZGlmZmVyZW50IGV2ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYywgJ215RXZlbnQnKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCdvdGhlckV2ZW50Jyk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZ1bmMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBjYWxsIHRoZSByZWdpc3RlcmVkIHdhdGNoZXJzIHdpdGggdGhlIGFkZGl0aW9uYWwgcGFyYW1zIHBhc3NlZCBpbnRvIHRoZSBmaXJlIGZ1bmN0aW9uJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYywgJ215RXZlbnQnKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCdteUV2ZW50JywgMSwgMiwgMywgNCwgNSk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jKTtcclxuXHJcblx0XHRcdHZhciBhcmdzOiBudW1iZXJbXSA9IGZ1bmMuZmlyc3RDYWxsLmFyZ3M7XHJcblx0XHRcdGV4cGVjdChhcmdzWzBdKS50by5lcXVhbCgxKTtcclxuXHRcdFx0ZXhwZWN0KGFyZ3NbMV0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRleHBlY3QoYXJnc1syXSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdGV4cGVjdChhcmdzWzNdKS50by5lcXVhbCg0KTtcclxuXHRcdFx0ZXhwZWN0KGFyZ3NbNF0pLnRvLmVxdWFsKDUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gd2l0aCBhbiBlcnJvciBpZiBubyBmdW5jdGlvbiBpcyBwcm92aWRlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG9yaWdpbmFsTG9nOiAobWVzc2FnZT86IHN0cmluZykgPT4gdm9pZCA9IGNvbnNvbGUubG9nO1xyXG5cdFx0XHR2YXIgbG9nU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyA9IGxvZ1NweTtcclxuXHJcblx0XHRcdHZhciBjYW5jZWw6ICgpID0+IHZvaWQgPSBvYnNlcnZhYmxlLnJlZ2lzdGVyKG51bGwpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UobG9nU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgobG9nU3B5LCAnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2FuY2VsKS50by5iZS5udWxsO1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2cgPSBvcmlnaW5hbExvZztcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdEYXRhPFRCZWhhdmlvcj4ge1xyXG5cdFx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNoaWxkPFRCZWhhdmlvcj4ge1xyXG5cdFx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0XHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPGFueT5cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGU7XHJcblx0XHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW107XHJcblx0XHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdO1xyXG5cdFx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdFx0cmV0dXJuIGNoaWxkICYmIGNoaWxkLnZpZXdEYXRhICE9IG51bGxcclxuXHRcdFx0XHQ/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcblx0XHRcdFx0OiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcjogVEJlaGF2aW9yID0gdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTtcclxuXHJcblx0XHRcdGlmIChiZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3JzOiBUQmVoYXZpb3JbXSA9IHRoaXMuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMoY2hpbGRMaXN0KTtcclxuXHJcblx0XHRcdHJldHVybiBfLm1hcChiZWhhdmlvcnMsIChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdFx0cmV0dXJuIF8oY2hpbGRMaXN0KS5tYXAoKGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciA9PiB7IHJldHVybiB0aGlzLmdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZCk7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQuZmlsdGVyKChiZWhhdmlvcjogVEJlaGF2aW9yKTogYm9vbGVhbiA9PiB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZCB7XHJcblx0XHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhID0geyBiZWhhdmlvcjogbnVsbCB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50QmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSA8VEJlaGF2aW9yPl8uZXh0ZW5kKGN1cnJlbnRCZWhhdmlvciwgYmVoYXZpb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3Ige1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RCZWhhdmlvciB7XHJcblx0XHRhY3Rpb246IEZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ3BhcmVudENoaWxkQmVoYXZpb3InLCAoKSA9PiB7XHJcblx0XHR2YXIgcGFyZW50Q2hpbGRCZWhhdmlvcjogSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvciA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZWdpc3RlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIGNoaWxkIGJlaGF2aW9yIGJ5IHB1dHRpbmcgaXQgb24gdGhlIHZpZXcgZGF0YSBvZiB0aGUgY2hpbGQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGNoaWxkOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiBudWxsIH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cclxuXHRcdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoY2hpbGQudmlld0RhdGEuYmVoYXZpb3IpLnRvLmVxdWFsKGJlaGF2aW9yKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHVzZSB0aGUgZXhpc3Rpbmcgdmlld0RhdGEgb2JqZWN0IGlmIG9uZSBleGlzdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGNoaWxkV2l0aFZpZXdEYXRhOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSA8YW55Pnsgdmlld0RhdGE6IHsgcmFuZG9tVmFsdWU6IDUgfSB9O1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDU7IH0gfTtcclxuXHJcblx0XHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGRXaXRoVmlld0RhdGEsIGJlaGF2aW9yKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhLmJlaGF2aW9yKS50by5lcXVhbChiZWhhdmlvcik7XHJcblx0XHRcdFx0ZXhwZWN0KCg8YW55PmNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhKS5yYW5kb21WYWx1ZSkudG8uZXF1YWwoNSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBub3QgcmVnaXN0ZXIgY2hpbGQgYmVoYXZpb3IgaWYgY2hpbGQgb2JqZWN0IGlzIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0gbnVsbDtcclxuXHRcdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cdFx0XHRcdGV4cGVjdChwYXJlbnRDaGlsZEJlaGF2aW9yLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpKS50by5iZS5udWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdnZXRDaGlsZEJlaGF2aW9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGdldCB0aGUgYmVoYXZpb3Igb2YgYW4gaW5kaXZpZHVhbCBjaGlsZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KHBhcmVudENoaWxkQmVoYXZpb3IuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCkpLnRvLmVxdWFsKGJlaGF2aW9yMSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgZXhpc3RpbmcgYmVoYXZpb3JzIGZvciBhIGxpc3Qgb2YgY2hpbGRyZW4nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMTogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gNzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZExpc3Q6IElDaGlsZDxJVGVzdEJlaGF2aW9yPltdID0gW1xyXG5cdFx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfSxcclxuXHRcdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IG51bGwgfSB9LFxyXG5cdFx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IyIH0gfSxcclxuXHRcdFx0XHRdO1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JzOiBJVGVzdEJlaGF2aW9yW10gPSBwYXJlbnRDaGlsZEJlaGF2aW9yLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvcnMubGVuZ3RoKS50by5lcXVhbCgyKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JzWzBdKS50by5lcXVhbChiZWhhdmlvcjEpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvcnNbMV0pLnRvLmVxdWFsKGJlaGF2aW9yMik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RyaWdnZXJDaGlsZEJlaGF2aW9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHRyaWdnZXIgdGhlIHNwZWNpZmllZCBjaGlsZCBhY3Rpb24gYW5kIHJldHVybiB0aGUgcmVzdWx0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjEgfSB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlciA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckNoaWxkQmVoYXZpb3IoY2hpbGQsXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgdGhlIGJlaGF2aW9yIGRvZXMgbm90IGV4aXN0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlciA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckNoaWxkQmVoYXZpb3IoY2hpbGQsXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmJlLm51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCB0cmlnZ2VyIHRoZSBzcGVjaWZpZWQgY2hpbGQgYWN0aW9ucyBhbmQgcmV0dXJuIHRoZSByZXN1bHRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAxOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkMTogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMjsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDI6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMiB9IH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMzogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGQzOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjMgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZFdpdGhvdXRCZWhhdmlvcjogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlcltdID0gcGFyZW50Q2hpbGRCZWhhdmlvci50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMoW2NoaWxkMSwgY2hpbGQyLCBjaGlsZDMsIGNoaWxkV2l0aG91dEJlaGF2aW9yXSxcclxuXHRcdFx0XHRcdChiZWhhdmlvcjogSVRlc3RCZWhhdmlvcik6IG51bWJlciA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYmVoYXZpb3IuYWN0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdCkudG8uaGF2ZS5sZW5ndGgoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yUmVzdWx0WzBdKS50by5lcXVhbCgxKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHRbMV0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdFsyXSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2Uge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwcm9taXNlVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVByb21pc2VVdGlsaXR5IHtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgUHJvbWlzZVV0aWxpdHkgaW1wbGVtZW50cyBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQcm9taXNlVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Byb21pc2Uuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdwcm9taXNlVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBwcm9taXNlVXRpbGl0eTogSVByb21pc2VVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0cHJvbWlzZVV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnaXNQcm9taXNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYSBwcm9taXNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBwcm9taXNlOiBPYmplY3QgPSB7XHJcblx0XHRcdFx0XHR0aGVuOiBzaW5vbi5zcHkoKSxcclxuXHRcdFx0XHRcdGNhdGNoOiBzaW5vbi5zcHkoKSxcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRleHBlY3QocHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlKHByb21pc2UpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgbm90IGEgcHJvbWlzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc3RyOiBzdHJpbmcgPSAncHJvbWlzZSc7XHJcblx0XHRcdFx0dmFyIG9iajogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2Uoc3RyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KHByb21pc2VVdGlsaXR5LmlzUHJvbWlzZShvYmopKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0cmluZy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdzdHJpbmdVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIHN0cmluZ1V0aWxpdHk6IElTdHJpbmdVdGlsaXR5U2VydmljZTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHN0cmluZ1V0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndG9OdW1iZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgY29udmVydCBhIHN0cmluZyB0byBhIG51bWJlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS50b051bWJlcignNScpKS50by5lcXVhbCg1KTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS50b051bWJlcignMycpKS50by5lcXVhbCgzKTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS50b051bWJlcignMS4yNScpKS50by5lcXVhbCgxLjI1KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnY29udGFpbnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIHN1YnN0cmluZyBpcyBjb250YWluZWQgd2l0aGluIHRoZSBzdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJ215IHN0cmluZycsICdteScpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCcxMjMnLCAnMScpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCcnLCBudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnbXkgc3RyaW5nJywgJycpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBzdWJzdHJpbmcgaXMgbm90IGNvbnRhaW5lZCB3aXRoaW4gdGhlIHN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnbXkgc3RyaW5nJywgJ215IHZhbCcpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnMTIzJywgJzQnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJ215IHN0cmluZycsICdteSBzdHJpbmcgMScpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncmVwbGFjZUFsbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXBsYWNlIGFsbCBvY2N1cmFuY2VzIG9mIHNvbWUgZ2l2ZW4gdGV4dCB3aXRoIGFub3RoZXIgaW5zaWRlIGEgc3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnJlcGxhY2VBbGwoJ2hlbGxvIHdvcmxkJywgJ2ZvbycsICdiYXInKSkudG8uZXF1YWwoJ2hlbGxvIHdvcmxkJyk7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkucmVwbGFjZUFsbCgnZm9vSGVsbG9mb29Xb3JsZGZvbycsICdmb28nLCAnYmFyJykpLnRvLmVxdWFsKCdiYXJIZWxsb2JhcldvcmxkYmFyJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3N1YnN0aXR1dGUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgc3Vic3RpdHV0ZSBzdHJpbmdzIHdpdGggdGhlaXIgcG9zaXRpb25hbCBwbGFjZWhvbGRlciB2YWx1ZSBpbiBvdGhlciBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnN1YnN0aXR1dGUoJ2hlbGxvIHdvcmxkJywgJ2ZvbycpKS50by5lcXVhbCgnaGVsbG8gd29ybGQnKTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5zdWJzdGl0dXRlKCdoZWxsbyB7MH0gd29ybGQgezF9JywgJ2ZvbycsICdiYXInKSkudG8uZXF1YWwoJ2hlbGxvIGZvbyB3b3JsZCBiYXInKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnanF1ZXJ5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUpRdWVyeVV0aWxpdHkge1xyXG5cdFx0cmVwbGFjZUNvbnRlbnQoY29udGVudEFyZWE6IEpRdWVyeSwgbmV3Q29udGVudHM6IEpRdWVyeSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBKUXVlcnlVdGlsaXR5IGltcGxlbWVudHMgSUpRdWVyeVV0aWxpdHkge1xyXG5cdFx0cmVwbGFjZUNvbnRlbnQoY29udGVudEFyZWE6IEpRdWVyeSwgbmV3Q29udGVudDogSlF1ZXJ5KTogdm9pZCB7XHJcblx0XHRcdGNvbnRlbnRBcmVhLmVtcHR5KCk7XHJcblx0XHRcdGNvbnRlbnRBcmVhLmFwcGVuZChuZXdDb250ZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEpRdWVyeVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2pxdWVyeVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIganF1ZXJ5VXRpbGl0eTogSUpRdWVyeVV0aWxpdHk7XHJcblx0XHR2YXIgZW1wdHlTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIGFwcGVuZFNweTogU2lub24uU2lub25TcHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRqcXVlcnlVdGlsaXR5ID0gc2VydmljZXMuanF1ZXJ5VXRpbGl0eTtcclxuXHJcblx0XHRcdGVtcHR5U3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHRcdGFwcGVuZFNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBlbXB0eSB0aGUgZXhpc3RpbmcgY29udGVudCBhbmQgYXBwZW5kIHRoZSBuZXcgY29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGV4aXN0aW5nRWxlbWVudDogYW55ID0ge1xyXG5cdFx0XHRcdGVtcHR5OiBlbXB0eVNweSxcclxuXHRcdFx0XHRhcHBlbmQ6IGFwcGVuZFNweSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBuZXdDb250ZW50OiBhbnkgPSB7fTtcclxuXHJcblx0XHRcdGpxdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQoZXhpc3RpbmdFbGVtZW50LCBuZXdDb250ZW50KTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGVtcHR5U3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYXBwZW5kU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYXBwZW5kU3B5LCBuZXdDb250ZW50KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL3Npbm9uXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdFx0cHJvbWlzZTogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRcdGRhdGE6IFREYXRhVHlwZTtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChzZXJ2aWNlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKCk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBjYWxsYmFjay5hcHBseSh0aGlzLCBwYXJhbXMpLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogbmcuSVNjb3BlKTogdm9pZCB7XHJcblx0XHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3QgXHJcblx0XHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRcdF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCAocmVxdWVzdDogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4pOiB2b2lkID0+IHtcclxuXHRcdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9jazogSU1vY2sgPSBuZXcgTW9jaygpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGltZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndGltZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIHtcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgndGltZVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgdGltZVV0aWxpdHk6IElUaW1lVXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHRpbWVVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZXhwZWN0ZWQgbnVtYmVyIG9mIHNlY29uZHMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyg0MDAwKSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMoNDYwMCkpLnRvLmVxdWFsKDQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZXhwZWN0ZWQgbnVtYmVyIG9mIG1pbnV0ZXMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHNlY29uZHMxOiBudW1iZXIgPSAxMjA7XHJcblx0XHRcdHZhciBzZWNvbmRzMjogbnVtYmVyID0gNTk7XHJcblxyXG5cdFx0XHRzZWNvbmRzMSAqPSAxMDAwO1xyXG5cdFx0XHRzZWNvbmRzMiAqPSAxMDAwO1xyXG5cclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvTWludXRlcyhzZWNvbmRzMSkpLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzKHNlY29uZHMyKSkudG8uZXF1YWwoMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBleHBlY3RlZCBudW1iZXIgb2YgaG91cnMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG1pbnV0ZXMxOiBudW1iZXIgPSA1OTtcclxuXHRcdFx0dmFyIG1pbnV0ZXMyOiBudW1iZXIgPSA2MDtcclxuXHJcblx0XHRcdG1pbnV0ZXMxICo9IDYwICogMTAwMDtcclxuXHRcdFx0bWludXRlczIgKj0gNjAgKiAxMDAwO1xyXG5cclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMobWludXRlczEpKS50by5lcXVhbCgwKTtcclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMobWludXRlczIpKS50by5lcXVhbCgxKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGV4cGVjdGVkIG51bWJlciBvZiBob3VycyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgaG91cnMxOiBudW1iZXIgPSAyMztcclxuXHRcdFx0dmFyIGhvdXJzMjogbnVtYmVyID0gMjQ7XHJcblxyXG5cdFx0XHRob3VyczEgKj0gNjAgKiA2MCAqIDEwMDA7XHJcblx0XHRcdGhvdXJzMiAqPSA2MCAqIDYwICogMTAwMDtcclxuXHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMoaG91cnMxKSkudG8uZXF1YWwoMCk7XHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMoaG91cnMyKSkudG8uZXF1YWwoMSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdpc0VtcHR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGlzRW1wdHk6IElJc0VtcHR5RmlsdGVyO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZpbHRlck5hbWUpO1xyXG5cdFx0XHRpc0VtcHR5ID0gc2VydmljZXNbZmlsdGVyTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBhcnJheSBpcyBudWxsIG9yIGVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkoW10pKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGFycmF5IGhhcyBpdGVtcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkoWzEsIDIsIDNdKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KFsnMScsICcyJywgJzMnXSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbnZlcnQgdGhlIHJlc3VsdCBpZiB0cnVlSWZFbXB0eSBpcyBzcGVjaWZpZWQgYXMgZmFsc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KG51bGwsIGZhbHNlKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KFsxLCAyLCAzXSwgZmFsc2UpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fb2JqZWN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdDtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRydW5jYXRlRmlsdGVyIHtcclxuXHRcdChpbnB1dD86IHN0cmluZywgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHRcdChpbnB1dD86IG51bWJlciwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdHRydW5jYXRlLiRpbmplY3QgPSBbX19vYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIHRydW5jYXRlKG9iamVjdFV0aWxpdHk6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSVRydW5jYXRlRmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoaW5wdXQ/OiBhbnksIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG5cdFx0XHRpbmNsdWRlRWxsaXBzZXMgPSBpbmNsdWRlRWxsaXBzZXMgPT0gbnVsbCA/IGZhbHNlIDogaW5jbHVkZUVsbGlwc2VzO1xyXG5cclxuXHRcdFx0dmFyIG91dDogc3RyaW5nID0gb2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoaW5wdXQpID8gJycgOiBpbnB1dC50b1N0cmluZygpO1xyXG5cdFx0XHRpZiAob3V0Lmxlbmd0aCkge1xyXG5cdFx0XHRcdGlmICh0cnVuY2F0ZVRvICE9IG51bGwgJiYgb3V0Lmxlbmd0aCA+IHRydW5jYXRlVG8pIHtcclxuXHRcdFx0XHRcdG91dCA9IG91dC5zdWJzdHJpbmcoMCwgdHJ1bmNhdGVUbyk7XHJcblx0XHRcdFx0XHRpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcblx0XHRcdFx0XHRcdG91dCArPSAnLi4uJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG91dDtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cnVuY2F0ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCd0cnVuY2F0ZScsICgpID0+IHtcclxuXHRcdHZhciB0cnVuY2F0ZTogSVRydW5jYXRlRmlsdGVyO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZpbHRlck5hbWUpO1xyXG5cdFx0XHR0cnVuY2F0ZSA9IHNlcnZpY2VzW2ZpbHRlck5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gbm8gc3RyaW5nIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCkpLnRvLmVxdWFsKCcnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyB3aGVuIGFuIGVtcHR5IHN0cmluZyBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnJykpLnRvLmVxdWFsKCcnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGEgc3RyaW5nIHdoZW4gYSBudW1iZXIgaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoMzQuNSkpLnRvLmVxdWFsKCczNC41Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG5vdCB0cnVuY2F0ZSBhIHN0cmluZyB3aGVuIG5vIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycpKS50by5lcXVhbCgnVGVzdCBzdHJpbmcnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyB3aGVuIHRydW5jYXRlVG8gaXMgMCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDApKS50by5lcXVhbCgnJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHRydW5jYXRlIGJ1dCBub3QgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBvbmx5IHRydW5jYXRlVG8gaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgNikpLnRvLmVxdWFsKCdUZXN0IHMnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IHRydW5jYXRlIGEgc3RyaW5nIHdoZW4gdHJ1bmNhdGVUbyBpcyBncmVhdGVyIHRoYW4gdGhlIHN0cmluZyBsZW5ndGgnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCAyNSkpLnRvLmVxdWFsKCdUZXN0IHN0cmluZycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCB0cnVuY2F0ZSBidXQgbm90IGVsbGlwc2ltb2dyaWZ5IGEgc3RyaW5nIHdoZW4gYm90aCB0cnVuY2F0ZVRvIGFuZCBpbmNsdWRlRWxsaXBzZXMgYXJlIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDYsIGZhbHNlKSkudG8uZXF1YWwoJ1Rlc3QgcycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCB0cnVuY2F0ZSBhbmQgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBib3RoIHRydW5jYXRlVG8gYW5kIGluY2x1ZGVFbGxpcHNlcyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgNiwgdHJ1ZSkpLnRvLmVxdWFsKCdUZXN0IHMuLi4nKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYmVoYXZpb3JzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0c3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0naXNFbXB0eS9pc0VtcHR5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cnVuY2F0ZS90cnVuY2F0ZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcblx0XHR0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udGVudFByb3ZpZGVyL2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlL2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdudW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwcm9taXNlL3Byb21pc2Uuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGFycmF5Lm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZS5tb2R1bGVOYW1lLFxyXG5cdFx0YXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZSxcclxuXHRcdGJvb2xlYW4ubW9kdWxlTmFtZSxcclxuXHRcdGNvbnRlbnRQcm92aWRlci5tb2R1bGVOYW1lLFxyXG5cdFx0ZGF0ZS5tb2R1bGVOYW1lLFxyXG5cdFx0anF1ZXJ5Lm1vZHVsZU5hbWUsXHJcblx0XHRudW1iZXIubW9kdWxlTmFtZSxcclxuXHRcdG9iamVjdC5tb2R1bGVOYW1lLFxyXG5cdFx0b2JzZXJ2YWJsZS5tb2R1bGVOYW1lLFxyXG5cdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdFx0cHJvbWlzZS5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdiZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdFx0YmVoYXZpb3JzLm1vZHVsZU5hbWUsXHJcblx0XHRmaWx0ZXJzLm1vZHVsZU5hbWUsXHJcblx0XHRzZXJ2aWNlcy5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==