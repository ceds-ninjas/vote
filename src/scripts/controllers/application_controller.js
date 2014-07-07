App.ApplicationController = Ember.ObjectController.extend({

	siteName: 'Voting system',

	needs: ['currentUser'],

	currentUserController: Ember.computed.alias('controllers.currentUser'),

	_debug: function() {
		//
	}.on('init'),



	currentPathChange: function() {
		App.set('currentPath', this.get('currentPath'));
	}.observes('currentPath'),

	currentUser: function() {
		return this.get('currentUserController').getUser();
	}.property()

});