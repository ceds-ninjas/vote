App.IssueRoute = Ember.Route.extend({
	model: function(params) {
		return this.get('store').find('issue', params.issue_id);
	}

//	setupController: function(controller, model) {
//
//
//
//	}
});