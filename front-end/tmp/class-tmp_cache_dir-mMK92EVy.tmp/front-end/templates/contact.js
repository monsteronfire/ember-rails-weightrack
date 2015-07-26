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