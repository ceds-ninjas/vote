App.ApplicationController = Ember.ObjectController.extend({

	siteName: 'Voting system',

	currentPathChange: function() {
		App.set('currentPath', this.get('currentPath'));
	}.observes('currentPath'),

	currentUser: function() {
		return this.store.find('user', 2);
	}.property()

});