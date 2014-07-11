App.ApplicationRoute = Ember.Route.extend({

	beforeModel: function() {
		var self = this;

		return self.get('store').find('user', 1).then(function(user) {
            self.controllerFor('currentUser').set('model', user);
            return self.get('store').find('vote');
		}).then(function(votes) {
            self.controllerFor('votes').set('model', votes);
        }); 
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
		 * @param issue {App.IssueController}
		 */
		removeVote: function(issue) {
			var self = this,
				currentVote = issue.get('currentUserVote');

            // store a handle to the vote
            // Delete the vote
            currentVote.deleteRecord();

            // remove the linked dependency in parent
            issue.get('votes').removeObject(currentVote);

            // persist
            currentVote.save();
        },

		/**
		 * Add a vote
		 * @param issue {object}
		 */
		addVote: function(issue) {
			var self = this,
				currentUser = self.controllerFor('currentUser');

			// Create a vote
			var vote = self.get('store').createRecord('vote', {
				'issue': issue.get('model'),
				'user': currentUser.get('model')
			});

			// Add the reference value to parent model
			issue.get('votes').addObject(vote);

            // persist
			vote.save();
		}
	}
});