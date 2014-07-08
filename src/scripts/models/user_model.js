App.User = DS.Model.extend({
	staffNumber: DS.attr('string'),
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),

	// todo - move this outside of model
	fullName: function() {
		return [this.get('firstName'), this.get('lastName')].join(' ');
	}.property('firstName', 'lastName'),

	votes: DS.hasMany('vote', {
		inverse: 'user',    // corresponding key
		async: true
	})
});

App.User.FIXTURES = [{
	id: 1,
	staffNumber: '003265326',
	firstName: 'Harry',
	lastName: 'Kewell',
	fullName: 'Harry Kewell',
	votes: ['1', '3']
},{
	id: 2,
	staffNumber: '006262626',
	firstName: 'Gerry',
	lastName: 'Simon',
	fullName: 'Gerry Simon',
	votes: ['2']
}];
