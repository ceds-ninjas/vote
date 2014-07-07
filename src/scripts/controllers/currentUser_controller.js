App.CurrentUserController = Ember.Controller.extend({

	_debug: function() {
		//
	}.on('init'),



	getUser: function(id) {
		var _id = id || SiteSettings.currentUserId;
		return this.get('store').find('user', _id);
	}

});