App.CurrentUserController = Ember.ObjectController.extend({

	needs: ['application', 'votes'],


	canVote: function() {
		return this.get('remainingVotes');
	}.property('remainingVotes'),

	remainingVotes: function() {
		return this.get('controllers.application.maxVotesAllowed') - this.get('votes.length');
	}.property('votes.length'),




//	votes: Em.computed.filterBy('allVotes', 'user', this.get('model'))


	votes: function() {
		return this.get('controllers.votes').filterBy('user', this.get('model'));
	}.property('controllers.votes.length')
//

});
