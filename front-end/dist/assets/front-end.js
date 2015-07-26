/* jshint ignore:start */

/* jshint ignore:end */

define('front-end/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend({
    namespace: 'api/v1',
    host: 'http://localhost:3000'
  });

});
define('front-end/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'front-end/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('front-end/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('front-end/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('front-end/helpers/formatted-date', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /* global moment:true */

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function (date, format) {
    return moment(date).format(format);
  });

});
define('front-end/initializers/export-application-global', ['exports', 'ember', 'front-end/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('front-end/instance-initializers/app-version', ['exports', 'front-end/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('front-end/models/contact', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    firstName: DS['default'].attr('string'),
    lastName: DS['default'].attr('string'),
    email: DS['default'].attr('string'),
    title: DS['default'].attr('string'),
    createdAt: DS['default'].attr('date'),
    updatedAt: DS['default'].attr('date')
  });

});
define('front-end/router', ['exports', 'ember', 'front-end/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  exports['default'] = Router.map(function () {
    this.resource('contacts', function () {
      this.resource('contact', { path: '/:contact_id' });
    });
    this.route('contacts', function () {});
    this.route('contact');
  });

});
define('front-end/routes/contact', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('contact', params.contact_id);
    }
  });

});
define('front-end/routes/contacts/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.find('contact');
    }
  });

});
define('front-end/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 10
          }
        },
        "moduleName": "front-end/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Ember Rails Weightrack");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(fragment,6,6,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","link-to",["Home","index"],[],["loc",[null,[4,6],[4,32]]]],
        ["inline","link-to",["Contacts","contacts"],[],["loc",[null,[5,6],[5,39]]]],
        ["content","outlet",["loc",[null,[10,0],[10,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('front-end/templates/contact', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 4
          }
        },
        "moduleName": "front-end/templates/contact.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("dl");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("Email");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("Title");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Updated at: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  Created at: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(fragment, [4]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(element0,0,0);
        morphs[1] = dom.createMorphAt(element0,2,2);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [7]),0,0);
        morphs[4] = dom.createMorphAt(element2,1,1);
        morphs[5] = dom.createMorphAt(element2,5,5);
        return morphs;
      },
      statements: [
        ["content","firstName",["loc",[null,[1,4],[1,17]]]],
        ["content","lastName",["loc",[null,[1,18],[1,30]]]],
        ["content","email",["loc",[null,[5,6],[5,15]]]],
        ["content","title",["loc",[null,[8,6],[8,15]]]],
        ["inline","formatted-date",[["get","updatedAt",["loc",[null,[12,31],[12,40]]]],"MMMM Do, YYYY [at] h:mm a"],[],["loc",[null,[12,14],[12,70]]]],
        ["inline","formatted-date",[["get","createdAt",["loc",[null,[14,31],[14,40]]]],"MMMM Do, YYYY [at] h:mm a"],[],["loc",[null,[14,14],[14,70]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('front-end/templates/contacts/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 6
              }
            },
            "moduleName": "front-end/templates/contacts/index.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(",\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
            return morphs;
          },
          statements: [
            ["content","contact.lastName",["loc",[null,[5,8],[5,28]]]],
            ["content","contact.firstName",["loc",[null,[6,8],[6,29]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 2
            }
          },
          "moduleName": "front-end/templates/contacts/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["block","link-to",["contact",["get","contact",["loc",[null,[4,27],[4,34]]]]],[],0,null,["loc",[null,[4,6],[7,18]]]]
        ],
        locals: ["contact"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 2
            },
            "end": {
              "line": 11,
              "column": 2
            }
          },
          "moduleName": "front-end/templates/contacts/index.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("No contacts found.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 5
          }
        },
        "moduleName": "front-end/templates/contacts/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[2,21],[2,26]]]]],[],0,1,["loc",[null,[2,2],[11,11]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('front-end/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('front-end/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('front-end/tests/helpers/formatted-date.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/formatted-date.js should pass jshint', function() { 
    ok(true, 'helpers/formatted-date.js should pass jshint.'); 
  });

});
define('front-end/tests/helpers/resolver', ['exports', 'ember/resolver', 'front-end/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('front-end/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('front-end/tests/helpers/start-app', ['exports', 'ember', 'front-end/app', 'front-end/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('front-end/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('front-end/tests/models/contact.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/contact.js should pass jshint', function() { 
    ok(true, 'models/contact.js should pass jshint.'); 
  });

});
define('front-end/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('front-end/tests/routes/contact.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/contact.js should pass jshint', function() { 
    ok(true, 'routes/contact.js should pass jshint.'); 
  });

});
define('front-end/tests/routes/contacts/index.jshint', function () {

  'use strict';

  module('JSHint - routes/contacts');
  test('routes/contacts/index.js should pass jshint', function() { 
    ok(true, 'routes/contacts/index.js should pass jshint.'); 
  });

});
define('front-end/tests/test-helper', ['front-end/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('front-end/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('front-end/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('front-end/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('front-end/tests/unit/helpers/formatted-date-test', ['front-end/helpers/formatted-date', 'qunit'], function (formatted_date, qunit) {

  'use strict';

  qunit.module('Unit | Helper | formatted date');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = formatted_date.formattedDate(42);
    assert.ok(result);
  });

});
define('front-end/tests/unit/helpers/formatted-date-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/formatted-date-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/formatted-date-test.js should pass jshint.'); 
  });

});
define('front-end/tests/unit/models/contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('contact', 'Unit | Model | contact', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('front-end/tests/unit/models/contact-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/contact-test.js should pass jshint', function() { 
    ok(true, 'unit/models/contact-test.js should pass jshint.'); 
  });

});
define('front-end/tests/unit/routes/contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:contact', 'Unit | Route | contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('front-end/tests/unit/routes/contact-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/contact-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/contact-test.js should pass jshint.'); 
  });

});
define('front-end/tests/unit/routes/contacts/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:contacts/index', 'Unit | Route | contacts/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('front-end/tests/unit/routes/contacts/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/contacts');
  test('unit/routes/contacts/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/contacts/index-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('front-end/config/environment', ['ember'], function(Ember) {
  var prefix = 'front-end';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("front-end/tests/test-helper");
} else {
  require("front-end/app")["default"].create({"name":"front-end","version":"0.0.0+a54d3b4c"});
}

/* jshint ignore:end */
//# sourceMappingURL=front-end.map