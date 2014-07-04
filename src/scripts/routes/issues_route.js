App.IssuesRoute = Ember.Route.extend({
	model: function() {
		return this.get('store').find('issue');
	}
});