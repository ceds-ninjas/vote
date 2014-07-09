App.CurrentUserController = Ember.ObjectController.extend({

	needs: ['application'],

	canVote: function() {
		return this.get('remainingVotes');
	}.property('remainingVotes'),

	remainingVotes: function() {
		return this.get('controllers.application.maxVotesAllowed') - this.get('votes.length');
	}.property('votes.length'),



	votesObserver: function() {



	}.observesBefore('votes.length')



});
