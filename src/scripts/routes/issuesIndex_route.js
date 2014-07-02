App.IssuesIndexRoute = Ember.Route.extend({

	// proxy to Issues
	controllerName: 'issues',

	model: function() {
		return this.modelFor('issues');
	}

});
