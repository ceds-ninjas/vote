App.IssueRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('issue', params.issue_id);
	}

//	setupController: function(controller, model) {
//
//
//
//	}
});