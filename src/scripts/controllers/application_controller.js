App.ApplicationController = Ember.ObjectController.extend({

	siteName: 'Voting system',

	needs: ['currentUser'],

	currentUserController: Ember.computed.alias('controllers.currentUser'),

	init: function() {
		this._super();

		// todo
//		App.UserManager = UserService.create();


	},

	_debug: function() {
		//
	}.on('init'),



	currentPathChange: function() {
		App.set('currentPath', this.get('currentPath'));
	}.observes('currentPath'),

	// todo
//	currentUser: App.UserManager.getCurrentUser(),

	currentUser: function() {
		return this.get('currentUserController').getUser();
	}.property()

});