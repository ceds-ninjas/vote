// todo

var UserService = Ember.Object.extend({
	_debug: function() {
		console.log('inside user manager');
	}.on('init'),


	getCurrentUser: function(id) {
		var _id = id || SiteSettings.currentUserId;

		var self = App.get('content');

		return self.get('store').find('user', _id);
	}
});

