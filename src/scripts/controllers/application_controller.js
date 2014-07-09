App.ApplicationController = Ember.ObjectController.extend({

	siteName: 'Voting system',

	maxVotesAllowed: 2,

	needs: ['currentUser'],
	currentUser: Ember.computed.alias('controllers.currentUser'),

	_debug: function() {
		//
	}.on('init'),



	currentPathChange: function() {
		this.set('currentPath', this.get('currentPath'));
	}.observes('currentPath'),

});