App.User = DS.Model.extend({
    staffNumber: DS.attr('string'),
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),

	// todo - move this outside of model
	fullName: function() {
		return [this.get('firstName'), this.get('lastName')].join(' ');
	}.property('firstName', 'lastName'),

	votes: DS.hasMany('vote', {
		async: true
	})
});


App.User.FIXTURES = [
    {
        id: 9,
        "staffNumber": "CBA001",
        "firstName": "Amit",
        "lastName": "Malhotra",
        fullName: 'Amit Malhotra',
        votes: ['1', '3']
    },{
        id: 10,
        "staffNumber": "CBA002",
        "firstName": "Elise",
        "lastName": "Chant",
        fullName: 'Elise Chant',
        votes: ['2']
    }
];
