// ==========================================================================
// Project:   Ember - JavaScript Application Framework
// Copyright: Copyright 2013 Stefan Penner and Ember App Kit Contributors
// License:   Licensed under MIT license
//            See https://raw.github.com/ember-cli/ember-resolver/master/LICENSE
// ==========================================================================


var JSHINTRC = {
    "predef": [
        "console",
        "Ember",
        "DS",
        "Handlebars",
        "Metamorph",
        "ember_assert",
        "ember_warn",
        "ember_deprecate",
        "ember_deprecateFunc",
        "require",
        "equal",
        "asyncTest",
        "test",
        "raises",
        "deepEqual",
        "start",
        "stop",
        "ok",
        "strictEqual",
        "module",
        "expect",
        "minispade",
        "async",
        "invokeAsync",
        "expectAssertion",
        "expectDeprecation",
        "expectNoDeprecation",
        "throws"
    ],

    "node" : false,
    "es5" : true,
    "browser" : true,

    "boss" : true,
    "curly": false,
    "debug": false,
    "devel": false,
    "eqeqeq": true,
    "evil": true,
    "forin": false,
    "immed": false,
    "laxbreak": false,
    "newcap": true,
    "noarg": true,
    "noempty": false,
    "nonew": false,
    "nomen": false,
    "onevar": false,
    "plusplus": false,
    "regexp": false,
    "undef": true,
    "sub": true,
    "strict": false,
    "white": false
}
;

minispade.register('ember-resolver/~tests/container_debug_adapter_test', "(function() {/*globals define registry requirejs */\n\nvar resolver,\n    containerDebugAdapter,\n    App, get = Ember.get,\n    set = Ember.set,\n    Resolver = require('ember/resolver'),\n    ContainerDebugAdapter = require('ember/container-debug-adapter'),\n    Model = Ember.Object.extend();\n\n\nvar modules = {};\nfunction def(module) {\n  modules[module] = {};\n}\nfunction undef(module) {\n  if (module) {\n    delete modules[module];\n  } else {\n    modules = {};\n  }\n}\n\n\nmodule(\"Container Debug Adapter Tests\", {\n  setup:function() {\n    Ember.run(function() {\n      App = Ember.Application.extend({\n        init: function () {\n            this._super.apply(this, arguments);\n            this.deferReadiness();\n        },\n        toString: function() { return 'App'; },\n        modulePrefix: 'appkit',\n        Resolver: Resolver['default'],\n        ContainerDebugAdapter: ContainerDebugAdapter['default']\n      }).create();\n    });\n    Ember.run(function() {\n      containerDebugAdapter = App.__container__.lookup('container-debug-adapter:main');\n      containerDebugAdapter._getEntries = function() { return modules; };\n    });\n  },\n  teardown: function() {\n    Ember.run(function() {\n      containerDebugAdapter.destroy();\n      App.destroy();\n      App = null;\n    });\n    undef();\n  }\n});\n\ntest(\"can access Container Debug Adapter which can catalog typical entries by type\", function() {\n  equal(containerDebugAdapter.canCatalogEntriesByType('model'), true, \"canCatalogEntriesByType should return false for model\");\n  equal(containerDebugAdapter.canCatalogEntriesByType('template'), true, \"canCatalogEntriesByType should return false for template\");\n  equal(containerDebugAdapter.canCatalogEntriesByType('controller'), true, \"canCatalogEntriesByType should return true for controller\");\n  equal(containerDebugAdapter.canCatalogEntriesByType('route'), true, \"canCatalogEntriesByType should return true for route\");\n  equal(containerDebugAdapter.canCatalogEntriesByType('view'), true, \"canCatalogEntriesByType should return true for view\");\n});\n\ntest(\"the default ContainerDebugAdapter catalogs controller entries\", function() {\n  def('appkit/controllers/foo');\n  def('appkit/controllers/users/foo');\n\n  var controllers = containerDebugAdapter.catalogEntriesByType('controller');\n\n  equal(controllers.length, 2, \"controllers discovered\");\n  equal(controllers[0], 'foo', \"found the right class\");\n  equal(controllers[1], 'users/foo', \"the name is correct\");\n});\n\ntest(\"Does not duplicate entries\", function() {\n  def('appkit/models/foo');\n  def('appkit/more/models/foo');\n\n  var models = containerDebugAdapter.catalogEntriesByType('model');\n\n  equal(models.length, 1, \"Only one is returned\");\n  equal(models[0], 'foo', \"the name is correct\");\n});\n\ntest(\"Pods support\", function() {\n  def('appkit/user/model');\n  def('appkit/post/model');\n\n  var models = containerDebugAdapter.catalogEntriesByType('model');\n\n  equal(models.length, 2, \"All models are found\");\n  equal(models[0], 'user', \"the name is correct\");\n  equal(models[1], 'post', \"the name is correct\");\n});\n\ntest(\"Pods podModulePrefix support\", function() {\n  App.podModulePrefix = 'my-prefix';\n\n  def('my-prefix/user/model');\n  def('my-prefix/users/user/model');\n\n  var models = containerDebugAdapter.catalogEntriesByType('model');\n\n  equal(models.length, 2, \"models discovered\");\n  equal(models[0], 'user', \"the name is correct\");\n  equal(models[1], 'users/user', \"the name is correct\");\n});\n\n\n})();\n//@ sourceURL=ember-resolver/~tests/container_debug_adapter_test");minispade.register('ember-resolver/~tests/core_test', "(function() {/*globals define registry requirejs */\n\nvar Resolver, resolver, logCalls, originalLog;\n\nfunction lookupResolver() {\n  return requirejs.entries['ember/resolver'];\n}\n\nfunction resetRegistry() {\n  var keeper = lookupResolver();\n\n  requirejs.clear();\n  define('ember/resolver', keeper['deps'], keeper['callback']);\n}\n\nfunction setupResolver(options) {\n  if (!options) {\n    options = { namespace: { modulePrefix: 'appkit' } };\n  }\n\n  Resolver = require('ember/resolver')['default'];\n  resolver = Resolver.create(options);\n}\n\nmodule(\"Resolver Tests\",{\n  setup: function(){\n    setupResolver();\n  },\n\n  teardown: function() {\n    resetRegistry();\n    Ember.TEMPLATES = {};\n  }\n});\n\ntest(\"can access at deprecated 'resolver' module name\", function(){\n  expect(2);\n\n  expectDeprecation(/Importing\\/requiring Ember Resolver as \"resolver\" is deprecated, please use \"ember\\/resolver\" instead/);\n\n  var ResolverAlias = require('resolver')['default'];\n\n  equal(Resolver, ResolverAlias, \"both 'ember/resolver' and 'resolver' return the same Resolver\");\n});\n\ntest(\"can access Resolver\", function(){\n  ok(resolver);\n});\n\ntest('does not require `namespace` to exist at `init` time', function() {\n  expect(0);\n\n  resolver = Resolver.create();\n});\n\ntest(\"can lookup something\", function(){\n  expect(2);\n\n  define('appkit/adapters/post', [], function(){\n    ok(true, \"adapter was invoked properly\");\n\n    return Ember.K;\n  });\n\n  var adapter = resolver.resolve('adapter:post');\n\n  ok(adapter, 'adapter was returned');\n\n  adapter();\n});\n\ntest(\"can lookup something in another namespace\", function(){\n  expect(2);\n\n  define('other/adapters/post', [], function(){\n    ok(true, \"adapter was invoked properly\");\n\n    return Ember.K;\n  });\n\n  var adapter = resolver.resolve('other@adapter:post');\n\n  ok(adapter, 'adapter was returned');\n\n  adapter();\n});\n\ntest(\"can lookup a view in another namespace\", function() {\n  expect(2);\n\n  define('other/views/post', [], function(){\n    ok(true, \"view was invoked properly\");\n\n    return Ember.K;\n  });\n\n  var view = resolver.resolve('view:other@post');\n\n  ok(view, 'view was returned');\n\n  view();\n});\n\ntest(\"can lookup a view\", function() {\n  expect(2);\n\n  define('appkit/views/queue-list', [], function(){\n    ok(true, \"view was invoked properly\");\n\n    return Ember.K;\n  });\n\n  var view = resolver.resolve('view:queue-list');\n\n  ok(view, 'view was returned');\n\n  view();\n});\n\ntest(\"will return the raw value if no 'default' is available\", function() {\n  define('appkit/fruits/orange', [], function(){\n    return 'is awesome';\n  });\n\n  equal(resolver.resolve('fruit:orange'), 'is awesome', 'adapter was returned');\n});\n\ntest(\"will unwrap the 'default' export automatically\", function(){\n  define('appkit/fruits/orange', [], function(){\n    return {default: 'is awesome'};\n  });\n\n  equal(resolver.resolve('fruit:orange'), 'is awesome', 'adapter was returned');\n});\n\ntest(\"router:main is hard-coded to prefix/router.js\", function() {\n  expect(1);\n\n  define('appkit/router', [], function(){\n    ok(true, 'router:main was looked up');\n    return 'whatever';\n  });\n\n  resolver.resolve('router:main');\n});\n\ntest(\"store:main is looked up as prefix/store\", function() {\n  expect(1);\n\n  define('appkit/store', [], function(){\n    ok(true, 'store:main was looked up');\n    return 'whatever';\n  });\n\n  resolver.resolve('store:main');\n});\n\ntest(\"store:posts as prefix/stores/post\", function() {\n  expect(1);\n\n  define('appkit/stores/post', [], function(){\n    ok(true, 'store:post was looked up');\n    return 'whatever';\n  });\n\n  resolver.resolve('store:post');\n});\n\ntest(\"will raise error if both dasherized and underscored modules exist\", function() {\n  define('appkit/big-bands/steve-miller-band', [], function(){\n    ok(true, 'dasherized version looked up');\n    return 'whatever';\n  });\n\n  define('appkit/big_bands/steve_miller_band', [], function(){\n    ok(false, 'underscored version looked up');\n    return 'whatever';\n  });\n\n  try {\n    resolver.resolve('big-band:steve-miller-band');\n  } catch (e) {\n    equal(e.message, 'Ambiguous module names: `appkit/big-bands/steve-miller-band` and `appkit/big_bands/steve_miller_band`', \"error with a descriptive value is thrown\");\n  }\n});\n\ntest(\"will lookup an underscored version of the module name when the dasherized version is not found\", function() {\n  expect(1);\n\n  define('appkit/big_bands/steve_miller_band', [], function(){\n    ok(true, 'underscored version looked up properly');\n    return 'whatever';\n  });\n\n  resolver.resolve('big-band:steve-miller-band');\n});\n\ntest(\"can lookup templates with mixed naming moduleName\", function(){\n  expectDeprecation('Modules should not contain underscores. Attempted to lookup \"appkit/bands/-steve-miller-band\" which was not found. Please rename \"appkit/bands/_steve-miller-band\" to \"appkit/bands/-steve-miller-band\" instead.');\n\n  expect(2);\n\n  define('appkit/bands/_steve-miller-band', [], function(){\n    ok(true, 'underscored version looked up properly');\n    return 'whatever';\n  });\n\n  resolver.resolve('band:-steve-miller-band');\n});\n\ntest(\"can lookup templates via Ember.TEMPLATES\", function() {\n  Ember.TEMPLATES['application'] = function() {\n    return '<h1>herp</h1>';\n  };\n\n  var template = resolver.resolve('template:application');\n  ok(template, 'template should resolve');\n});\n\ntest('it provides eachForType which invokes the callback for each item found', function() {\n\n  function orange() { }\n  define('appkit/fruits/orange', [], function() {\n    return { default: orange };\n  });\n\n  function apple() { }\n  define('appkit/fruits/apple', [], function() {\n    return {default: apple };\n  });\n\n  function other() {}\n  define('appkit/stuffs/other', [], function() {\n    return { default: other };\n  });\n\n  var items = resolver.knownForType('fruit');\n\n  deepEqual(items, {\n    'fruit:orange': true,\n    'fruit:apple': true\n  });\n});\n\ntest('eachForType can find both pod and non-pod factories', function() {\n  function orange() { }\n  define('appkit/fruits/orange', [], function() {\n    return { default: orange };\n  });\n\n  function lemon() { }\n  define('appkit/lemon/fruit', [], function() {\n    return { default: lemon };\n  });\n\n  var items = resolver.knownForType('fruit');\n\n  deepEqual(items, {\n    'fruit:orange': true,\n    'fruit:lemon': true\n  });\n});\n\ntest('if shouldWrapInClassFactory returns true a wrapped object is returned', function() {\n  resolver.shouldWrapInClassFactory = function(defaultExport, parsedName) {\n    equal(defaultExport, 'foo');\n    equal(parsedName.fullName, 'string:foo');\n\n    return true;\n  };\n\n  define('appkit/strings/foo', [], function() {\n    return { default: 'foo' };\n  });\n\n  var value = resolver.resolve('string:foo');\n\n  equal(value.create(), 'foo');\n});\n\nmodule(\"Logging\", {\n  setup: function() {\n    originalLog = Ember.Logger.info;\n    logCalls = [];\n    Ember.Logger.info = function(arg) { logCalls.push(arg); };\n    setupResolver();\n  },\n\n  teardown: function() {\n    Ember.Logger.info = originalLog;\n  }\n});\n\ntest(\"logs lookups when logging is enabled\", function() {\n  define('appkit/fruits/orange', [], function(){\n    return 'is logged';\n  });\n\n  Ember.ENV.LOG_MODULE_RESOLVER = true;\n\n  resolver.resolve('fruit:orange');\n\n  ok(logCalls.length, \"should log lookup\");\n});\n\ntest(\"doesn't log lookups if disabled\", function() {\n  define('appkit/fruits/orange', [], function(){\n    return 'is not logged';\n  });\n\n  Ember.ENV.LOG_MODULE_RESOLVER = false;\n\n  resolver.resolve('fruit:orange');\n\n  equal(logCalls.length, 0, \"should not log lookup\");\n});\n\nmodule(\"custom prefixes by type\", {\n  setup: setupResolver,\n  teardown: resetRegistry\n});\n\ntest(\"will use the prefix specified for a given type if present\", function() {\n  setupResolver({ namespace: {\n    fruitPrefix: 'grovestand',\n    modulePrefix: 'appkit'\n  }});\n\n  define('grovestand/fruits/orange', [], function(){\n    ok(true, 'custom prefix used');\n    return 'whatever';\n  });\n\n  resolver.resolve('fruit:orange');\n});\n\nmodule(\"pods lookup structure\", {\n  setup: function() {\n    setupResolver();\n  },\n\n  teardown: resetRegistry\n});\n\ntest(\"will lookup modulePrefix/name/type before prefix/type/name\", function() {\n  define('appkit/controllers/foo', [], function(){\n    ok(false, 'appkit/controllers was used');\n    return 'whatever';\n  });\n\n  define('appkit/foo/controller', [], function(){\n    ok(true, 'appkit/foo/controllers was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('controller:foo');\n});\n\ntest(\"will lookup names with slashes properly\", function() {\n  define('appkit/controllers/foo/index', [], function(){\n    ok(false, 'appkit/controllers was used');\n    return 'whatever';\n  });\n\n  define('appkit/foo/index/controller', [], function(){\n    ok(true, 'appkit/foo/index/controller was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('controller:foo/index');\n});\n\ntest(\"specifying a podModulePrefix overrides the general modulePrefix\", function() {\n  setupResolver({\n    namespace: {\n      modulePrefix: 'appkit',\n      podModulePrefix: 'appkit/pods'\n    }\n  });\n\n  define('appkit/controllers/foo', [], function(){\n    ok(false, 'appkit/controllers was used');\n    return 'whatever';\n  });\n\n  define('appkit/foo/controller', [], function(){\n    ok(false, 'appkit/foo/controllers was used');\n    return 'whatever';\n  });\n\n  define('appkit/pods/foo/controller', [], function(){\n    ok(true, 'appkit/pods/foo/controllers was used');\n    return 'whatever';\n  });\n\n  // Temporarily disabling podModulePrefix deprecation\n  // expectDeprecation(function() {\n      resolver.resolve('controller:foo');\n  // }, \"`podModulePrefix` is deprecated and will be removed from future versions of ember-cli. Please move existing pods from 'app/pods/' to 'app/'.\");\n});\n\n// Temporarily disabling podModulePrefix deprecation\n/*\ntest(\"specifying a podModulePrefix is deprecated\", function() {\n  setupResolver({\n    namespace: {\n      modulePrefix: 'appkit',\n      podModulePrefix: 'appkit/pods'\n    }\n  });\n\n  expectDeprecation(function() {\n    resolver.resolve('foo:bar');\n  }, \"`podModulePrefix` is deprecated and will be removed from future versions of ember-cli. Please move existing pods from 'app/pods/' to 'app/'.\");\n\n  expectNoDeprecation(function() {\n    resolver.resolve('foo:bar');\n  });\n});\n*/\n\ntest(\"will not use custom type prefix when using POD format\", function() {\n  resolver.namespace['controllerPrefix'] = 'foobar';\n\n  define('foobar/controllers/foo', [], function(){\n    ok(false, 'foobar/controllers was used');\n    return 'whatever';\n  });\n\n  define('foobar/foo/controller', [], function(){\n    ok(false, 'foobar/foo/controllers was used');\n    return 'whatever';\n  });\n\n  define('appkit/foo/controller', [], function(){\n    ok(true, 'appkit/foo/controllers was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('controller:foo');\n});\n\ntest(\"will lookup a components template without being rooted in `components/`\", function() {\n  define('appkit/components/foo-bar/template', [], function(){\n    ok(false, 'appkit/components was used');\n    return 'whatever';\n  });\n\n  define('appkit/foo-bar/template', [], function(){\n    ok(true, 'appkit/foo-bar/template was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('template:components/foo-bar');\n});\n\ntest(\"will use pods format to lookup components in components/\", function() {\n  expect(2);\n\n  define('appkit/components/foo-bar/template', [], function(){\n    ok(true, 'appkit/components was used');\n    return 'whatever';\n  });\n\n  define('appkit/components/foo-bar/component', [], function(){\n    ok(true, 'appkit/components was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('template:components/foo-bar');\n  resolver.resolve('component:foo-bar');\n});\n\ntest(\"will not lookup routes in components/\", function() {\n  expect(1);\n\n  define('appkit/components/foo-bar/route', [], function(){\n    ok(false, 'appkit/components was used');\n    return 'whatever';\n  });\n\n  define('appkit/routes/foo-bar', [], function(){\n    ok(true, 'appkit/routes was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('route:foo-bar');\n});\n\ntest(\"will not lookup non component templates in components/\", function() {\n  expect(1);\n\n  define('appkit/components/foo-bar/template', [], function(){\n    ok(false, 'appkit/components was used');\n    return 'whatever';\n  });\n\n  define('appkit/templates/foo-bar', [], function(){\n    ok(true, 'appkit/templates was used');\n    return 'whatever';\n  });\n\n  resolver.resolve('template:foo-bar');\n});\n\nmodule(\"custom pluralization\", {\n  teardown: resetRegistry\n});\n\ntest(\"will use the pluralization specified for a given type\", function() {\n  expect(1);\n\n  setupResolver({\n    namespace: {\n      modulePrefix: 'appkit'\n    },\n\n    pluralizedTypes: {\n      'sheep': 'sheep',\n      'octipus': 'octipii'\n    }\n  });\n\n  define('appkit/sheep/baaaaaa', [], function(){\n    ok(true, 'custom pluralization used');\n    return 'whatever';\n  });\n\n  resolver.resolve('sheep:baaaaaa');\n});\n\ntest(\"will pluralize 'config' as 'config' by default\", function() {\n  expect(1);\n\n  setupResolver();\n\n  define('appkit/config/environment', [], function(){\n    ok(true, 'config/environment is found');\n    return 'whatever';\n  });\n\n  resolver.resolve('config:environment');\n});\n\ntest(\"'config' can be overridden\", function() {\n  expect(1);\n\n  setupResolver({\n    namespace: {\n      modulePrefix: 'appkit'\n    },\n\n    pluralizedTypes: {\n      'config': 'super-duper-config'\n    }\n  });\n\n  define('appkit/super-duper-config/environment', [], function(){\n    ok(true, 'super-duper-config/environment is found');\n    return 'whatever';\n  });\n\n  resolver.resolve('config:environment');\n});\n\n})();\n//@ sourceURL=ember-resolver/~tests/core_test");