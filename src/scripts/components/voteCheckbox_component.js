App.VoteCheckboxComponent = Ember.Component.extend({

	isShowingChecked: null,


	click: function() {
		var checked = this.get('checked'),
			item = this.get('item');

		if (this.get('disabled')) {
			return;
		}

		this.sendAction(checked ? 'remove' : 'add', item);
	}

});