App.Router.map(function() {

	this.resource('issues', { path: '/issues' }, function() {
		this.route('index', { path: '' });
	});

	this.resource('issue', { path: '/issue/:issue_id' }, function() {
		this.route('index', { path: '' });
		this.route('update');
	});

	this.route('issue.create', { path: '/issue/new' });

});



