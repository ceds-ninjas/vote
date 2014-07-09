App.ApplicationRoute = Ember.Route.extend({

	beforeModel: function() {
		var self = this,
			currentUserController = self.controllerFor('currentUser');

		return self.get('store').find('user', 1).then(function(user) {
			currentUserController.set('content', user);
		})
	},

	actions: {

		/**
		 * Save an Issue
		 * todo - split method in to smaller parts addIssue or updateIssue
		 * @param issue {object.App.IssueController}
		 */
		saveIssue: function(issue) {
			var self = this,
				issueToSave = null;

			var attrs = issue.getProperties(
				'title',
				'description',
				'department'
			);

			if (!!issue.id) {   // existing issue
				issueToSave = self.controllerFor('issue', issue.id).get('content');
				issueToSave.setProperties(attrs);

			} else {    // new issue
				issueToSave = self.get('store').createRecord('issue', attrs);
				issueToSave.set('creationDate', new Date());

			}

			issueToSave.save().then(function() {
				self.transitionTo('issues');
			});

		},

		/**
		 * Delete an issue
		 * @param issue {object.<App.IssueController>}
		 */
		deleteIssue: function(issue) {
			var self = this,
				currentRoute = self.get('controller').get('currentPath');

			issue.deleteRecord();
			issue.save().then(function() {
				if (currentRoute === 'issue.update' || 'issue.new') {
					self.transitionTo('issues');
				}
			});
		},

		/**
		 * Remove a vote
		 * Assume that if that if an issue is checked, I have already
		 * voted for it
		 * @param id {String}
		 */
		removeVote: function(issue) {
			var self = this,
				currentUser = self.controllerFor('currentUser').get('model'),
				currentVote = issue.get('currentUserVote');

			currentVote.deleteRecord();
			currentVote.save().then(function(rec) {
				issue.get('model').save();
				currentUser.get('votes').removeObject(rec);
//				currentUser.save();
			}).then(function() {

			});
		},

		/**
		 * Add a vote
		 * @param issue {object}
		 */
		addVote: function(issue) {
			var self = this,
				currentUser = self.controllerFor('currentUser');

			self.get('store').createRecord('vote', {
				'issue': issue.get('model'),
				'user': currentUser.get('model')
			}).save().then(function(currentVote) {
				currentUser.get('votes').addObject(currentVote);
				issue.get('votes').addObject(currentVote);

//				currentUser.get('model').save();
//				issue.get('model').save();
			});
		}
	}
});