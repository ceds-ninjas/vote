App.IssuesController = Ember.ArrayController.extend({

	needs: ['application'],

	init: function() {
		this._super();
		console.log('Issues Controller');
	},

	filtered: function() {
		var self = this;

		if (self.get('selectedAuthor') === null) {
			return self;
		} else {
			return self.filterBy('author', self.get('selectedAuthor'));
		}
	}.property('selectedAuthor'),

	itemController: 'issue',

	sortAscending: false,
	sortProperties: ['votes.length'],




	isIssues: function() {
		return this.get('length') > 0;
	}.property('length'),


	selectedAuthor: null,

	uniqueAuthors: function() {
		return this.getEach('author').uniq();
	}.property('@each.author')

});


