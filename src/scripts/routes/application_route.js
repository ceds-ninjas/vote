App.ApplicationRoute = Ember.Route.extend({

	actions: {

		addVote: function(issue) {
			var self = this,
				appController = self.controllerFor('application'),
				currentUser = appController.get('currentUser');





			var vote = self.get('store').createRecord('vote', {
				user: currentUser.get('content'),
				issue: issue.get('model')
			}).save().then(function() {

			});

		},

		removeVote: function(issue) {

		},

		saveIssue: function(issue) {
			var me = this,
				store = me.store,
				issueToSave,
				model;

			issueToSave = {
				title: issue.title,
				description: issue.description,
				department: issue.department
			};

			if (issue.id) {
				model = this.controllerFor('issue').get('model')
			} else {
				model = store.createRecord('issue', issueToSave);
			}

			model.set('creationDate', new Date());

			// persist the record and transition
			model.save().then(function() {
				me.transitionTo('issues');
			});

		},

		deleteIssue: function(issue) {
			var me = this;

			issue.deleteRecord();
			issue.save().then(function() {
				me.transitionTo('issues');
			});
		},


		updateVote: function(issue, vote) {
			var me = this,
				currentUser = me.controller.get('currentUser'),
//				currentIssue = me.controllerFor('issues').filterBy('id', issue.id),
				voteModel;

			console.log(vote);


//
//			if (vote) {   // do vote
//				console.log('vote = true');
//				voteModel = me.store.createRecord('vote');
//				voteModel.setProperties({
//					'user': currentUser.get('content')
////					'issue':
//				});
//			} else {        // undo vote
//				console.log('vote = false');
//				voteModel = me.store.find('vote');
//				voteModel.deleteRecord();
//				// delete the vote
//			}
//
//			voteModel.save();








//
//			this.store.find('issue', issue.id).then(function(data) {
//				voteModel.set('issue', data);
//			});
//
//			voteModel.save();


//			var currentIssue = this.store.find('issue', issue.id).then(function(myissue) {
//				var voteModel = me.store.createRecord('vote');
//				voteModel.save();
//
//				console.log(myissue);
//
//				voteModel.set('user', currentUser.get('content'));
//				voteModel.set('issue', myissue);
//
//
//				voteModel.save();
//			});

//			this.store.find('story', params.story_id).then(function( story) {
//				chapter.set('story', story)  //ERROR HAPPENS HERE
//				story.get('chapters').push(chapter)
//			})

//			console.log(currentIssue);

//			console.log(me.controllerFor('issues').get('content').filterBy('id', issue.id));
//			console.log(me.controllerFor('issues').findBy('id', issue.id)); //[0].get('content'));

	//
//				var voteModel = me.store.createRecord('vote');
//				voteModel.save();
//
//				voteModel.set('user', currentUser.get('content'));
//				voteModel.set('issue', me.controllerFor('issues').findBy('id', issue.id).get('content'));
//	//
//	//
//				voteModel.save();


//			console.log(currentIssue);
//			console.log(currentUser);


//			console.log(me.controllerFor('issue').filterBy('id', issue.id));



			//voteModel.set('issue', me.store.find('issue', issue.id));


//			console.log(me.store.find('issue', issue.id));

//			console.log(voteModel);

//			console.log(currentUser.get('content').get('vote'));
//

//			Ember.RSVP.resolve(currentUser).then(function(user) {

//				console.log(user.get('content'));

//				console.log(user.id);
//				console.log(user);
//
//				var voteModel = me.store.createRecord('vote');
//
//				voteModel.save();
//
//				voteModel.set('user', user.id);
//
//				console.log(voteModel);
//				console.log(voteModel.get('user'));





//				voteModel.setProperties({
//					user: user
//				}).save();

//				voteModel.get('user').pushObject(user);
//



//				newVote = me.store.createRecord('vote', {
////					'user': this.pushObject(user.id),
////					issue: this.pushObject(issue),
//					date: new Date()
//				}).save().then(function(vote) {
//					console.log(vote);
//					vote.set('user', user);
////					vote.get('user').pushObject(user)
//				});
//
//				console.log(newVote);
//				console.log(newVote.get('id'));
//				console.log(newVote.get('issue'));
//				newVote.pushObject({
//					'issue': issue,
//					'user': user
//				});

//				console.log(user.get('votes'));
//				console.log(user.get('votes'));


//				newVote.get("user").pushObject(user);

//			});



//			console.log(currentUser);
//			console.log(currentUser.id);

//			newVote = me.store.createRecord('vote', {
//				user: this.pushObject('user'),
//				issue: this.pushObject('issue'),
//				date: new Date()
//			});

//			currentUser.pushObject(newVote);

//			Ember.RSVP.all([
//				currentUser
//			]).then(function(user) {
//				console.log(user.fullName);
//			});

//			if (!!vote) {   // do vote
//				Em.RSVP.all(currentUser, currentIssue) {
//
//				}
//
//				currentUser.then(function(user) {
//					newVote = me.store.createRecord('vote', {
//						date: new Date()
//					})
//				});
//
//
////				newVote = me.store.createRecord('vote', {
////					date: new Date()
////				});
////
////
////			.save().then(function() {
////
////				})
//			}

		}


//		updateVote: function(issue, vote) {
//			var me = this,
//				newVote;
//
//			if (vote) { // do vote
//				newVote = me.store.createRecord('vote', {
////					user: me.controller.get('currentUser').get('id'),
////					issue: issue.id,
//					date: new Date()
//				});
//			} else {    // undo vote
//				newVote = me.store.find('vote').filterBy('issue').set('vote', '');
//			}
//
//			newVote.save();
//
//		}

	}
});