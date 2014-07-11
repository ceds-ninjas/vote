// https://github.com/emberjs/data/pull/1488
App.Issue = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.belongsTo('user'),   // userID
	description: DS.attr('string'),
	department: DS.attr('string'),
	dateCreated: DS.attr('date', {
        readOnly: true,
		defaultValue: function() { return new Date(); }
	}),
	dateUpdated: DS.attr('date', {
        readOnly: true,
		defaultValue: function() { return new Date(); }
	}),
	votes:          DS.hasMany('vote', {
		async: true
	})
});


App.Issue.FIXTURES = [{
	id: 1,
    "title": "Issue 1",
    "author": "1",
    "description": "This is the issue that there is no issue.",
    "department": "Credit Card",
    "dateCreated": "2014-07-09T14:19:00",
    "dateUpdated": "2014-07-09T14:19:00",
	"votes": [1, 2]
},{
	id: 2,
    "title": "Issue 2",
    "author": "2",
    "description": "This is the issue that there is no issue.",
    "department": "Credit Card",
    "dateCreated": "2014-07-09T14:19:00",
    "dateUpdated": "2014-07-09T14:19:00",
	"votes": [3]
}];

