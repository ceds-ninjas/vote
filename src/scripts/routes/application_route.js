App.ApplicationRoute = Ember.Route.extend({

	actions: {

		/**
		 * Save an Issue
		 * todo - split method in to smaller parts addIssue or updateIssue
		 * @param issue {object}
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

		/**
		 * Remove a vote
		 * Assume that if that if an issue is checked, I have already
		 * voted for it
		 * @param issue {object}
		 */
		removeVote: function(issue) {
			console.log('remove vote');

			var self = this,
				currentUser = self.get('controller').get('currentUser').get('content'),
				currentIssue = issue.get('content'),
				currentVote = '';


			// i am a user
			// i am checking an issue
			// if issue is checked I have already selected it ,
			//	find vote by user id, delete the issue
			// update any non magical dependencies

			var usersWhoVotesOnIssue = issue.get('content').get('votes').getEach('user.id');

			for (var i=0; i<usersWhoVotesOnIssue.length; i++) {
				if (currentUser.get('id') === usersWhoVotesOnIssue[i]) {
					// vote index of matched users
					var voteIdInContext = issue.get('content').get('votes').getEach('id')[i];

					currentVote = self.get('store').find('vote', voteIdInContext).then(function(rec) {
						rec.deleteRecord();
						rec.save();

						currentIssue.get('votes').removeObject(rec);
						currentUser.get('votes').removeObject(rec);
					});
				}
			}
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

				// todo - saving here is probably important
//				currentUser.save();
//				currentIssue.save();
			});
		}

	}
});