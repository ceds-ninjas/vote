App.IssueController = Ember.ObjectController.extend({

	needs: ['application'],

	application: Ember.computed.alias('controllers.application'),

	_debug: function() {
		console.log('ISSUE Controller');
	}.on('init'),



	isVote: null,

//	users: function() {
//		return this.get('votes').mapBy('user');
//	}.property('votes.@each.user').readOnly(),
//
	users: Em.computed.mapBy('votes', 'user'),

	usersFirstNames: function() {
		return this.get('users').getEach('firstName').join(', ');
	}.property('users.@each.firstName'),

	isVoteChecked: function(vote) {
		var self = this,
			isChecked = self.get('isVote');

		self.send(isChecked ? 'addVote' : 'removeVote', self);

		return false;
	}.observes('isVote')

});
