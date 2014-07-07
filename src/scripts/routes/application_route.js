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


//			i am a user
//			i am checking an issue
//			if issue is checked I have already selected it ,
//				find vote by user id, delete the issue
//			if not i will createRecord

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



//			if (currentVote.length) {
//				currentVote.deleteRecord();
//				currentVote.save();
//			}


//			var currentVoteIdsByIssue = currentIssue.get('votes').mapBy('id');
//			var currentVoteIdsByUser = currentUser.get('votes').mapBy('id');
//
//			for (var i=1; i<currentVoteIdsByIssue.length; i++) {
//				// is a match
//				if (currentVoteIdsByUser.indexOf(currentVoteIdsByIssue[i]) > -1) {
//					// determined vote in context
//					currentVote = self.get('store').find('vote', currentVoteIdsByIssue[i]).then(function(vote) {
//						vote.deleteRecord();
//
//					});
//				}
//			}
//
//			currentUser = '';
//			currentIssue = '';
//			currentVote = '';

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