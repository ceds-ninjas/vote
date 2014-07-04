App.IssueCreateRoute = Ember.Route.extend({
	model: function() {
		return Ember.Object.create();
	},

	renderTemplate: function() {
		var me = this;

		this.render('issue.update', {
			model: me.model,
			controller: 'issueCreate'   // require a new controller, don't want to reuse Update model
		})
	}

});
