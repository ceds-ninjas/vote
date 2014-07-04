var NeedsIssue = Ember.Mixin.create({
	needs: ['issue'],
	issue: Ember.computed.alias('controllers.issue'),

	isNotComplete: function() { // todo - refactor
		return !!((this.get('title') && this.get('title').length) &&
		(this.get('description') && this.get('description').length) &&
		(this.get('department') && this.get('department').length)) === false;
	}.property('title', 'description', 'department')
});