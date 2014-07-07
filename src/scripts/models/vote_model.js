// pivot model
App.Vote = DS.Model.extend({
	user: DS.belongsTo('user', {
		inverse: 'votes',
//		async: false
	}),
	issue: DS.belongsTo('issue', {
		inverse: 'votes',
//		async: false
	}),
	date: DS.attr('string', {
		defaultValue: function() { return new Date(); }
	})
});


App.Vote.FIXTURES = [{
	id: 1,
	user: 1,
	issue: 1,
	date: 'Mon, 26 Aug 2013 20:23:43 GMT'
},{
	id: 2,
	user: 2,
	issue: 1,
	date: 'Mon, 26 Aug 2013 20:23:43 GMT'
},{
	id: 3,
	user: 1,
	issue: 3,
	date: 'Mon, 26 Aug 2013 20:23:43 GMT'
}];
