"use strict";define("ember-blog/adapters/application",["exports","emberfire/adapters/firebase"],function(e,t){e.default=t.default.extend({})}),define("ember-blog/app",["exports","ember","ember-blog/resolver","ember-load-initializers","ember-blog/config/environment"],function(e,t,n,l,i){var o=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,o=t.default.Application.extend({modulePrefix:i.default.modulePrefix,podModulePrefix:i.default.podModulePrefix,Resolver:n.default}),(0,l.default)(o,i.default.modulePrefix),e.default=o}),define("ember-blog/components/the-button",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Component.extend({classNames:["the-button","add","large","inv"],tagName:"button",ui:n.service(),click:function(){this.set("ui.isWriting",!0)}})}),define("ember-blog/components/torii-iframe-placeholder",["exports","torii/components/torii-iframe-placeholder"],function(e,t){e.default=t.default}),define("ember-blog/components/x-login",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Component.extend({classNameBindings:[":x-login","errors:has-errors"],session:n.service(),errors:!1,email:null,password:null,onLogin:null,actions:{login:function(e){var t=this;this.set("errors",!1),"github"===e?this.get("session").open("firebase",{provider:"github",settings:{scope:"user,gist"}}).then(function(e){t.get("onLogin")&&t.get("onLogin")()}):this.get("session").open("firebase",{provider:"password",email:this.get("email"),password:this.get("password")}).then(function(){t.get("onLogin")&&t.get("onLogin")()}).catch(function(e){var n=e.code,l=e.message;console.log("errors",n,l),t.set("errors",l)})}}})}),define("ember-blog/components/x-nav",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Component.extend({classNames:["x-nav"],session:n.service(),actions:{logout:function(){this.get("session").close()}}})}),define("ember-blog/components/x-post",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Component.extend({classNameBindings:[":x-post","post.isDeleting"],session:n.service(),store:n.service(),ui:n.service(),post:null,actions:{delete:function(e){e.set("isDeleting",!0),this.get("store").findRecord("post",e.id).then(function(e){e.deleteRecord(),e.save()})},edit:function(e){this.get("ui").setProperties({writeable:e,isWriting:!0})}}})}),define("ember-blog/components/x-register",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Component.extend({classNameBindings:[":x-register","errors:has-errors"],store:n.service(),session:n.service(),firebaseApp:n.service(),errors:!1,email:null,password:null,onRegister:null,actions:{register:function(){var e=this;if(this.set("errors",!1),!this.get("email")||!this.get("password"))return void this.set("errors","The fields cannot be empty.");this.get("firebaseApp").auth().createUserWithEmailAndPassword(this.get("email"),this.get("password")).then(function(t){e.get("store").createRecord("user",{id:t.uid,email:t.email}).save().then(function(){e.get("session").open("firebase",{provider:"password",email:e.get("email"),password:e.get("password")})}).then(function(){e.get("onRegister")()}).catch(function(e){console.log("errors",e,e.errors)})}).catch(function(t){var n=t.code,l=t.message;console.log("errors",n,l),e.set("errors",l)})}}})}),define("ember-blog/components/x-writer",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Component.extend({classNameBindings:[":x-writer","isFullscreen"],store:n.service(),ui:n.service(),isFullscreen:!0,goTo:null,writeable:null,didInsertElement:function(){this._super.apply(this,arguments),this.get("writeable")||this.setProperties({writeable:this.get("store").createRecord("post")})},actions:{save:function(){var e=this;this.get("writeable").set("updatedAt",new Date),this.get("writeable").save().then(function(t){e.get("goTo")("post",t),e.get("ui").setProperties({isWriting:!1,writeable:null})}).catch(function(e){console.log(e.errors)})},close:function(){this.get("ui").setProperties({isWriting:!1,writeable:null})},fullscreen:function(){this.toggleProperty("isFullscreen")}}})}),define("ember-blog/controllers/application",["exports","ember","ember-computed-decorators"],function(e,t,n){var l=t.default.inject;e.default=t.default.Controller.extend(function(e){for(var t={},n=0;n<e.length;n++){var l=e[n],i=l.decorators,o=l.key;if(delete l.key,delete l.decorators,l.enumerable=!0,l.configurable=!0,("value"in l||l.initializer)&&(l.writable=!0),i)for(var a=0;a<i.length;a++){var r=i[a];if("function"!=typeof r)throw new TypeError("The decorator for method "+l.key+" is of the invalid type "+typeof r);l=r(t,o,l)||l}l.initializer&&(l.value=l.initializer.call(t)),Object.defineProperty(t,o,l)}return t}([{key:"ui",initializer:function(){return l.service()}},{key:"isScrollLocked",decorators:[(0,n.default)("ui.isWriting")],value:function(e){return e}},{key:"actions",initializer:function(){return{goTo:function(e,t){this.transitionToRoute(e,t)}}}}]))}),define("ember-blog/controllers/index",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({actions:{goToPost:function(e){this.transitionToRoute("post",e.id)}}})}),define("ember-blog/controllers/login",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({actions:{onLogin:function(){this.transitionToRoute("index")}}})}),define("ember-blog/controllers/post",["exports","ember"],function(e,t){var n=t.default.inject;e.default=t.default.Controller.extend({ui:n.service(),store:n.service(),actions:{delete:function(e){var t=this;e.set("isDeleting",!0),this.get("store").findRecord("post",e.id).then(function(e){e.deleteRecord(),e.save()}).finally(function(){t.transitionToRoute("index")})},edit:function(e){this.get("ui").setProperties({writeable:e,isWriting:!0})}}})}),define("ember-blog/controllers/register",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({actions:{onRegister:function(){this.transitionToRoute("index")}}})}),define("ember-blog/helpers/app-version",["exports","ember","ember-blog/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n,l){function i(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return t.hideSha?o.match(l.versionRegExp)[0]:t.hideVersion?o.match(l.shaRegExp)[0]:o}e.appVersion=i;var o=n.default.APP.version;e.default=t.default.Helper.helper(i)}),define("ember-blog/helpers/date",["exports","ember","moment"],function(e,t,n){function l(e){var t=i(e,2),l=t[0],a=t[1];return(0,n.default)(l).format(a||o)}var i=function(){function e(e,t){var n=[],l=!0,i=!1,o=void 0;try{for(var a,r=e[Symbol.iterator]();!(l=(a=r.next()).done)&&(n.push(a.value),!t||n.length!==t);l=!0);}catch(e){i=!0,o=e}finally{try{!l&&r.return&&r.return()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.date=l;var o="YYYY-MM-DD HH:mm";e.default=t.default.Helper.helper(l)}),define("ember-blog/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("ember-blog/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("ember-blog/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ember-blog/config/environment"],function(e,t,n){var l=n.default.APP,i=l.name,o=l.version;e.default={name:"App Version",initialize:(0,t.default)(i,o)}}),define("ember-blog/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("ember-blog/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("ember-blog/initializers/ember-data",["exports","ember-data/setup-container","ember-data/index"],function(e,t,n){e.default={name:"ember-data",initialize:t.default}}),define("ember-blog/initializers/emberfire",["exports","emberfire/initializers/emberfire"],function(e,t){e.default=t.default}),define("ember-blog/initializers/export-application-global",["exports","ember","ember-blog/config/environment"],function(e,t,n){function l(){var e=arguments[1]||arguments[0];if(!1!==n.default.exportApplicationGlobal){var l;if("undefined"!=typeof window)l=window;else if("undefined"!=typeof global)l=global;else{if("undefined"==typeof self)return;l=self}var i,o=n.default.exportApplicationGlobal;i="string"==typeof o?o:t.default.String.classify(n.default.modulePrefix),l[i]||(l[i]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete l[i]}}))}}e.initialize=l,e.default={name:"export-application-global",initialize:l}}),define("ember-blog/initializers/field-focus",["exports"],function(e){function t(){/Android/.test(navigator.appVersion)&&window.addEventListener("resize",function(){"INPUT"!=document.activeElement.tagName&&"TEXTAREA"!=document.activeElement.tagName||document.activeElement.scrollIntoView()})}e.initialize=t,e.default={name:"field-focus",initialize:t}}),define("ember-blog/initializers/firebase",["exports","firebase"],function(e,t){function n(){var e={apiKey:"AIzaSyB8XonRLT7ofxWO4dbWTpMaTRrpGQ2l8zQ",authDomain:"ember-blog-d8b5c.firebaseapp.com",databaseURL:"https://ember-blog-d8b5c.firebaseio.com",projectId:"ember-blog-d8b5c",storageBucket:"ember-blog-d8b5c.appspot.com",messagingSenderId:"692910046727"};t.default.initializeApp(e)}e.initialize=n,e.default={name:"firebase",initialize:n}}),define("ember-blog/initializers/initialize-torii-callback",["exports","ember-blog/config/environment","torii/redirect-handler"],function(e,t,n){e.default={name:"torii-callback",before:"torii",initialize:function(e){arguments[1]&&(e=arguments[1]),t.default.torii&&t.default.torii.disableRedirectInitializer||(e.deferReadiness(),n.default.handle(window).catch(function(){e.advanceReadiness()}))}}}),define("ember-blog/initializers/initialize-torii-session",["exports","torii/bootstrap/session","torii/configuration"],function(e,t,n){e.default={name:"torii-session",after:"torii",initialize:function(e){arguments[1]&&(e=arguments[1]);var l=(0,n.getConfiguration)();if(l.sessionServiceName){(0,t.default)(e,l.sessionServiceName);var i="service:"+l.sessionServiceName;e.inject("adapter",l.sessionServiceName,i)}}}}),define("ember-blog/initializers/initialize-torii",["exports","torii/bootstrap/torii","torii/configuration","ember-blog/config/environment"],function(e,t,n,l){var i={name:"torii",initialize:function(e){arguments[1]&&(e=arguments[1]),(0,n.configure)(l.default.torii||{}),(0,t.default)(e),e.inject("route","torii","service:torii")}};e.default=i}),define("ember-blog/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("ember-blog/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("ember-blog/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:function(){}}}),define("ember-blog/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("ember-blog/instance-initializers/setup-routes",["exports","torii/bootstrap/routing","torii/configuration","torii/compat/get-router-instance","torii/compat/get-router-lib","torii/router-dsl-ext"],function(e,t,n,l,i,o){e.default={name:"torii-setup-routes",initialize:function(e,o){if((0,n.getConfiguration)().sessionServiceName){var a=(0,l.default)(e),r=function n(){var l=(0,i.default)(a),o=l.authenticatedRoutes;!Ember.isEmpty(o)&&(0,t.default)(e,o),a.off("willTransition",n)};a.on("willTransition",r)}}}}),define("ember-blog/instance-initializers/walk-providers",["exports","torii/lib/container-utils","torii/configuration"],function(e,t,n){e.default={name:"torii-walk-providers",initialize:function(e){var l=(0,n.getConfiguration)();for(var i in l.providers)l.providers.hasOwnProperty(i)&&(0,t.lookup)(e,"torii-provider:"+i)}}}),define("ember-blog/models/post",["exports","ember-data","ember-computed-decorators"],function(e,t,n){e.default=t.default.Model.extend(function(e){for(var t={},n=0;n<e.length;n++){var l=e[n],i=l.decorators,o=l.key;if(delete l.key,delete l.decorators,l.enumerable=!0,l.configurable=!0,("value"in l||l.initializer)&&(l.writable=!0),i)for(var a=0;a<i.length;a++){var r=i[a];if("function"!=typeof r)throw new TypeError("The decorator for method "+l.key+" is of the invalid type "+typeof r);l=r(t,o,l)||l}l.initializer&&(l.value=l.initializer.call(t)),Object.defineProperty(t,o,l)}return t}([{key:"title",initializer:function(){return t.default.attr()}},{key:"body",initializer:function(){return t.default.attr()}},{key:"formattedBody",decorators:[(0,n.default)("body")],value:function(e){if(e)return e.split("\n").join("<br />")}},{key:"author",initializer:function(){return t.default.belongsTo("user")}},{key:"createdAt",initializer:function(){return t.default.attr("date",{defaultValue:function(){return new Date}})}},{key:"updatedAt",initializer:function(){return t.default.attr("date")}}]))}),define("ember-blog/models/user",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({email:t.default.attr(),createdAt:t.default.attr("date",{defaultValue:function(){return new Date}})})}),define("ember-blog/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("ember-blog/router",["exports","ember","ember-blog/config/environment"],function(e,t,n){var l=t.default.Router.extend({location:n.default.locationType,rootURL:n.default.rootURL});l.map(function(){this.route("index",{path:"/"}),this.route("post",{path:"post/:post_id"}),this.route("login"),this.route("account"),this.route("register")}),e.default=l}),define("ember-blog/routes/account",["exports","ember"],function(e,t){e.default=t.default.Route.extend({beforeModel:function(){this.get("session.isAuthenticated")||this.transitionTo("index")}})}),define("ember-blog/routes/application",["exports","ember"],function(e,t){var n=t.default.run,l=t.default.inject;e.default=t.default.Route.extend({session:l.service(),beforeModel:function(){return this.get("session").fetch().catch(function(){})},model:function(){return this.get("store").findAll("post")},setupController:function(e,t){this.controller.set("posts",t),$(".app-loader").addClass("fade-out"),n.later(function(){$(".app-loader").remove()},500)}})}),define("ember-blog/routes/index",["exports","ember"],function(e,t){e.default=t.default.Route.extend({model:function(){return this.get("store").findAll("post")},setupController:function(e,t){this.controller.set("posts",t)}})}),define("ember-blog/routes/login",["exports","ember"],function(e,t){e.default=t.default.Route.extend({actions:{onLogin:function(){console.log("route"),this.transitionTo("index")}}})}),define("ember-blog/routes/post",["exports","ember"],function(e,t){e.default=t.default.Route.extend({})}),define("ember-blog/routes/register",["exports","ember"],function(e,t){e.default=t.default.Route.extend({actions:{onRegister:function(){console.log("route"),this.transitionTo("index")}}})}),define("ember-blog/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ember-blog/services/firebase-app",["exports","emberfire/services/firebase-app"],function(e,t){e.default=t.default}),define("ember-blog/services/firebase",["exports","emberfire/services/firebase"],function(e,t){e.default=t.default}),define("ember-blog/services/popup",["exports","torii/services/popup"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ember-blog/services/torii-session",["exports","torii/services/torii-session"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ember-blog/services/torii",["exports","torii/services/torii"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ember-blog/services/ui",["exports","ember"],function(e,t){e.default=t.default.Service.extend({isWriting:!1,writeable:null})}),define("ember-blog/templates/account",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"1H8Y7AsO",block:'{"statements":[["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","Account"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/account.hbs"}})}),define("ember-blog/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"+qxavIWD",block:'{"statements":[["append",["unknown",["x-nav"]],false],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["viewport ",["helper",["if"],[["get",["isScrollLocked"]],"scroll-locked"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["outlet"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["session","isAuthenticated"]]],null,1],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["x-writer"],null,[["goTo","writeable"],[["helper",["action"],[["get",[null]],"goTo"],null],["get",["ui","writeable"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["the-button"]],false],["text","\\n"],["block",["if"],[["get",["ui","isWriting"]]],null,0]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/application.hbs"}})}),define("ember-blog/templates/components/the-button",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"i88fCUAv",block:'{"statements":[["partial","svg/plus"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":true}',meta:{moduleName:"ember-blog/templates/components/the-button.hbs"}})}),define("ember-blog/templates/components/x-login",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"gtrMzWJs",block:'{"statements":[["text","\\n"],["open-element","div",[]],["static-attr","class","providers"],["flush-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"login","github"],null],null],["flush-element"],["text","Github"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n\\n"],["open-element","hr",[]],["static-attr","class","or"],["flush-element"],["close-element"],["text","\\n\\n"],["append",["helper",["input"],null,[["type","value","placeholder"],["email",["get",["email"]],"Email"]]],false],["text","\\n"],["append",["helper",["input"],null,[["type","value","placeholder"],["password",["get",["password"]],"Password"]]],false],["text","\\n\\n"],["block",["if"],[["get",["errors"]]],null,0],["text","\\n"],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"login"],null],null],["flush-element"],["text","Login"],["close-element"],["text","\\n\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","errors"],["flush-element"],["append",["unknown",["errors"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/components/x-login.hbs"}})}),define("ember-blog/templates/components/x-nav",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"McFWOeLN",block:'{"statements":[["text","\\n"],["open-element","ul",[]],["static-attr","class","nav"],["flush-element"],["text","\\n  "],["open-element","li",[]],["flush-element"],["block",["link-to"],["index"],null,4],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["session","isAuthenticated"]]],null,3,2],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","Login"]],"locals":[]},{"statements":[["text","Register"]],"locals":[]},{"statements":[["text","      "],["open-element","li",[]],["flush-element"],["block",["link-to"],["register"],null,1],["close-element"],["text","\\n      "],["open-element","li",[]],["flush-element"],["block",["link-to"],["login"],null,0],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","li",[]],["flush-element"],["append",["unknown",["session","currentUser","email"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"logout"],null],null],["flush-element"],["text","Log out"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","Home"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/components/x-nav.hbs"}})}),define("ember-blog/templates/components/x-post",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"N/hY7+rW",block:'{"statements":[["open-element","h2",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["helper",["action"],[["get",[null]],["get",["goToPost"]],["get",["post"]]],null]],null],null],["flush-element"],["append",["unknown",["post","title"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","meta"],["flush-element"],["text","\\n    "],["block",["if"],[["get",["post","createdAt"]]],null,2],["text","\\n    "],["block",["if"],[["get",["post","updatedAt"]]],null,1],["text","\\n  "],["close-element"],["text","\\n"],["open-element","p",[]],["flush-element"],["append",["unknown",["post","formattedBody"]],true],["close-element"],["text","\\n\\n\\n"],["block",["if"],[["get",["session","isAuthenticated"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tools"],["flush-element"],["text","\\n    "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"delete",["get",["post"]]],null],null],["static-attr","class","small delete"],["flush-element"],["partial","svg/plus"],["close-element"],["text","\\n    "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"edit",["get",["post"]]],null],null],["static-attr","class","small ico"],["flush-element"],["text","/"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","span",[]],["flush-element"],["append",["helper",["concat"],["Last updated at: ",["helper",["date"],[["get",["post","updatedAt"]]],null]],null],false],["close-element"],["text"," "]],"locals":[]},{"statements":[["open-element","span",[]],["flush-element"],["append",["helper",["concat"],["Created at: ",["helper",["date"],[["get",["post","createdAt"]]],null]],null],false],["close-element"],["text"," "]],"locals":[]}],"hasPartials":true}',meta:{moduleName:"ember-blog/templates/components/x-post.hbs"}})}),define("ember-blog/templates/components/x-register",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"LbYYL601",block:'{"statements":[["append",["helper",["input"],null,[["type","value","placeholder"],["email",["get",["email"]],"Email"]]],false],["text","\\n"],["append",["helper",["input"],null,[["type","value","placeholder"],["password",["get",["password"]],"Password"]]],false],["text","\\n\\n"],["block",["if"],[["get",["errors"]]],null,0],["text","\\n"],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"register"],null],null],["flush-element"],["text","Register"],["close-element"],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","errors"],["flush-element"],["append",["unknown",["errors"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/components/x-register.hbs"}})}),define("ember-blog/templates/components/x-writer",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"ZQrYkWIN",block:'{"statements":[["open-element","div",[]],["static-attr","class","wrap"],["flush-element"],["text","\\n  "],["append",["helper",["textarea"],null,[["value","class","placeholder"],[["get",["writeable","title"]],"title","In the beginning..."]]],false],["text","\\n  "],["append",["helper",["textarea"],null,[["value","class","placeholder"],[["get",["writeable","body"]],"body","The earth was without form and void, and darkness was over the face of the deep..."]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","controls"],["flush-element"],["text","\\n    "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"close"],null],null],["flush-element"],["text","Close"],["close-element"],["text","\\n    "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"save"],null],null],["static-attr","class","inv"],["flush-element"],["text","Save"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/components/x-writer.hbs"}})}),define("ember-blog/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"BBWhmsmI",block:'{"statements":[["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["block",["link-to"],["index"],null,3],["close-element"],["text","\\n  "],["open-element","span",[]],["flush-element"],["text","My blog description"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["posts"]]],null,2,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","h2",[]],["flush-element"],["text","No posts"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["x-post"],null,[["post","goToPost"],[["get",["post"]],["helper",["action"],[["get",[null]],"goToPost"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["post","isNew"]]],null,1]],"locals":["post"]},{"statements":[["text","My blog title"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/index.hbs"}})}),define("ember-blog/templates/loading",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"ze1t0nA4",block:'{"statements":[["open-element","div",[]],["static-attr","class","page-loader"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","loading"],["flush-element"],["text","\\n    Loading...\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/loading.hbs"}})}),define("ember-blog/templates/login",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"B/qnlWWr",block:'{"statements":[["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","Login"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","container"],["flush-element"],["text","\\n  "],["append",["helper",["x-login"],null,[["onLogin"],[["helper",["action"],[["get",[null]],"onLogin"],null]]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/login.hbs"}})}),define("ember-blog/templates/post",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"ug2g+lz1",block:'{"statements":[["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["append",["unknown",["model","title"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","meta"],["flush-element"],["text","\\n    "],["block",["if"],[["get",["model","createdAt"]]],null,2],["text","\\n    "],["block",["if"],[["get",["model","updatedAt"]]],null,1],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","container"],["flush-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["append",["unknown",["model","formattedBody"]],true],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["session","isAuthenticated"]]],null,0],["close-element"],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tools"],["flush-element"],["text","\\n      "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"delete",["get",["model"]]],null],null],["static-attr","class","small"],["flush-element"],["text","delete"],["close-element"],["text","\\n      "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"edit",["get",["model"]]],null],null],["static-attr","class","small"],["flush-element"],["text","edit"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","span",[]],["flush-element"],["append",["helper",["concat"],["Last updated at: ",["helper",["date"],[["get",["model","updatedAt"]]],null]],null],false],["close-element"],["text"," "]],"locals":[]},{"statements":[["open-element","span",[]],["flush-element"],["append",["helper",["concat"],["Created at: ",["helper",["date"],[["get",["model","createdAt"]]],null]],null],false],["close-element"],["text"," "]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/post.hbs"}})}),define("ember-blog/templates/register",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"CJ7pivYF",block:'{"statements":[["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","Register"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","container"],["flush-element"],["text","\\n  "],["append",["helper",["x-register"],null,[["onRegister"],[["helper",["action"],[["get",[null]],"onRegister"],null]]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/register.hbs"}})}),define("ember-blog/templates/svg/plus",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"denYSOlj",
block:'{"statements":[["open-element","svg",[]],["static-attr","width","40"],["static-attr","height","40"],["static-attr","viewBox","0 0 40 40"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n    "],["open-element","g",[]],["static-attr","fill-rule","evenodd"],["flush-element"],["text","\\n        "],["open-element","rect",[]],["static-attr","x","19"],["static-attr","width","2"],["static-attr","height","40"],["static-attr","rx","1"],["flush-element"],["close-element"],["text","\\n        "],["open-element","path",[]],["static-attr","d","M40 19v1c0 .552-.45 1-1.009 1H1.01A1.002 1.002 0 0 1 0 20c0-.552.45-1 1.009-1H38.99"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"ember-blog/templates/svg/plus.hbs"}})}),define("ember-blog/torii-adapters/application",["exports","emberfire/torii-adapters/firebase"],function(e,t){e.default=t.default.extend({})}),define("ember-blog/torii-providers/firebase",["exports","emberfire/torii-providers/firebase"],function(e,t){e.default=t.default}),define("ember-blog/config/environment",["ember"],function(e){try{var t="ember-blog/config/environment",n=document.querySelector('meta[name="'+t+'"]').getAttribute("content"),l=JSON.parse(unescape(n)),i={default:l};return Object.defineProperty(i,"__esModule",{value:!0}),i}catch(e){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests||require("ember-blog/app").default.create({name:"ember-blog",version:"0.0.0+5db7dfae"});