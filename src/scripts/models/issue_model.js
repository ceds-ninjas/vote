// https://github.com/emberjs/data/pull/1488
App.Issue = DS.Model.extend({
	title:          DS.attr('string'),
	author:         DS.belongsTo('user'),   // userID
	description:    DS.attr('string'),
	department:     DS.attr('string'),
	creationDate: DS.attr('date', {
		defaultValue: function() { return new Date(); }
	}),
	lastUpdatedDate: DS.attr('date', {
		defaultValue: function() { return new Date(); }
	}),
	votes:          DS.hasMany('vote', {
		async: true
	})
});



App.Issue.FIXTURES = [{
    id: 1,
    title: 'record one',
    author: 2,
    description: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    department: 'CE&DS',
    creationDate: 'Mon, 26 Aug 2013 20:23:43 GMT',
    votes: [1, 2]
},{
    id: 2,
    title: 'record two',
    author: 1,
    description: 'Lorxcvcxvcxem ispum dolor scxvxcvit amet in voluptate fugiat nulla pariatur.',
    department: 'CE&DS',
    creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT',
    votes: [3]
},{
    id: 3,
    title: 'record three',
    author: 2,
    description: 'aaaa a dLorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    department: 'DS',
    creationDate: 'Mon, 26 Aug 2013 20:23:43 GMT',
    votes: []
}];

//App.Issue.FIXTURES = [{
//	id: 1,
//    "title": "Issue 1",
//    "author": "1",
//    "description": "This is the issue that there is no issue.",
//    "department": "Credit Card",
//    "creationDate": "2014-07-09T14:19:00",
//    "lastUpdateDate": "2014-07-09T14:19:00",
//	votes: [1, 2]
//},{
//	id: 2,
//    "title": "Issue 2",
//    "author": "2",
//    "description": "This is the issue that there is no issue.",
//    "department": "Credit Card",
//    "creationDate": "2014-07-09T14:19:00",
//    "lastUpdateDate": "2014-07-09T14:19:00",
//	votes: [3]
//}];
