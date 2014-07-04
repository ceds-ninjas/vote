App.ApplicationRoute = Ember.Route.extend({

	actions: {

		/**
		 * Create an issue
		 * @param issue {object}
		 */
		addIssue: function(issue) {
			var self = this;

			var attrs = issue.getProperties(
				'title',
				'description',
				'department'
			);

			self.get('store').createRecord('issue', attrs);
		},

		/**
		 * Update an existing issue
		 * @param issue {object}
		 */
		updateIssue: function(issue) {
			var self = this,
				currentIssue = null;

			var attrs = issue.getProperties(
				'id',
				'title',
				'description',
				'department'
			);

			currentIssue = self.controllerFor('issue').get('content', attrs.id);

			currentIssue.save().then(function() {
				self.transitionTo('issues');
			});

		},

		/**
		 * Delete an issue
		 * @param issue {object}
		 */
		deleteIssue: function(issue) {
			var self = this,
				currentIssue = null;

			currentIssue = self.controllerFor('issue').get('content', issue.getProperties('id'));

			currentIssue.deleteRecord();
			currentIssue.save().then(function() {
				self.transitionTo('issues');
			});

		},

		/**
		 * Add a vote
		 * @param issue {object}
		 * @param vote {boolean} @optional
		 */
		addVote: function(issue, vote) {
			var self = this,
				currentIssue = null,
				currentVote = null;

			currentIssue = self.controllerFor('issue').get('content', issue.getProperties('id'));

			currentVote = self.get('store').createRecord('vote', {
				user: self.get('currentUser'),
				issue: currentIssue
			}).save();

		},


		removeVote: function(issue) {
			var self = this;

//			var vote = self.get('store').deleteRecord('vote')
		}

//		saveIssue: function(issue) {
//			var me = this,
//				store = me.store,
//				issueToSave,
//				model;
//
//			issueToSave = {
//				title: issue.title,
//				description: issue.description,
//				department: issue.department
//			};
//
//			if (issue.id) {
//				model = this.controllerFor('issue').get('model')
//			} else {
//				model = store.createRecord('issue', issueToSave);
//			}
//
//			model.set('creationDate', new Date());
//
//			// persist the record and transition
//			model.save().then(function() {
//				me.transitionTo('issues');
//			});
//
//		},

	}
});