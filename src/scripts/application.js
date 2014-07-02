"use strict";

var App = Ember.Application.create({
	LOG_ACTIVE_GENERATION: true,        // log generated controllers
	LOG_MODULE_RESOLVER: true,
//	LOG_TRANSITIONS: true,
//	LOG_TRANSITIONS_INTERNAL: true,
//	LOG_VIEW_LOOKUPS: true,
//	LOG_BINDINGS: true

	ready: function() {
		// console.log('application ready')
		// attach plugins?
		// FastClick.attach(document.body);
	},

	currentPath: ''
});
