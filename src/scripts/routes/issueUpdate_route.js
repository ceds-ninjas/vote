App.IssueUpdateRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('issue');
	}
});