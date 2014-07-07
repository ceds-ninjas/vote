App.IssuesController = Ember.ArrayController.extend({

	needs: ['application'],

	application: Ember.computed.alias('controllers.application'),

	itemController: 'issue',

	sortAscending: false,

	sortProperties: ['votes.length'],

	selectedAuthor: null,

	filtered: function() {
		var self = this;

		if (self.get('selectedAuthor') === null) {
			return self;
		} else {
			return self.filterBy('author', self.get('selectedAuthor'));
		}
	}.property('selectedAuthor'),

	isIssues: function() {
		return this.get('length') > 0;
	}.property('length'),

	uniqueAuthors: function() {
		return this.getEach('author').uniq();
	}.property('@each.author')

});


