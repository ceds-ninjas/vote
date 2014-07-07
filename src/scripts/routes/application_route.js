App.ApplicationRoute = Ember.Route.extend({

	actions: {

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
		 * @param issue {object}
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


		removeVote: function(issue) {
			console.log('remove vote')
		},


		/**
		 * Add a vote
		 * @param issue {object}
		 * @param vote {boolean} @optional
		 */
		addVote: function(issue, vote) {
			var self = this,
				currentUser = self.get('controller').get('currentUser').get('content'),
				currentIssue = issue.get('content');

			self.get('store').createRecord('vote', {
				'issue': currentIssue,
				'user': currentUser
			}).save().then(function(currentVote) {
				currentUser.get('votes').addObject(currentVote);
				currentIssue.get('votes').addObject(currentVote);

//				currentUser.save();
//				currentIssue.save();
			});
		}

	}
});