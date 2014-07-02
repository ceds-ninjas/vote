App.IssueController = Ember.ObjectController.extend({

	needs: ['application'],

	init: function() {
		this._super();
		console.log('Issue Controller');
	},


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

	}.observes('isVote')

});
