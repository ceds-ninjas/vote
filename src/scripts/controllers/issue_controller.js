App.IssueController = Ember.ObjectController.extend({

	needs: ['application', 'currentUser'],

	application: Ember.computed.alias('controllers.application'),
	currentUser: Ember.computed.alias('controllers.currentUser'),

	_debug: function() {
		console.log('ISSUE Controller');
	}.on('init'),



//	users: function() {
//		return this.get('votes').mapBy('user');
//	}.property('votes.@each.user').readOnly(),
//
	users: Em.computed.mapBy('votes', 'user'),

	usersFirstNames: function() {
		return this.get('users').getEach('firstName').join(', ');
	}.property('users.@each.firstName'),


	isVote: null,


	isVoteChecked: function(vote) {
		var self = this,
			isChecked = self.get('isVote');

		self.send(isChecked ? 'addVote' : 'removeVote', self);

	}.observes('isVote'),





	canVote: function() {
		return this.get('voted') ? true : this.get('currentUser.canVote');
	}.property('currentUser.canVote', 'voted'),

	cantVote: Em.computed.not('canVote'),

	/**
	 * return {App.Vote}
	 */
	currentUserVote: function() {
		return this.get('votes').findBy('user', this.get('controllers.currentUser.content'));
	}.property('controllers.currentUser.content', 'votes.length'),

	voted: function() {
		return Boolean(this.get('currentUserVote'));
	}.property('currentUserVote')

});
