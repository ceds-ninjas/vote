// Local fixtures
//
App.ApplicationAdapter = DS.FixtureAdapter;


// Local REST fixtures
//
//App.ApplicationAdapter = DS.RESTAdapter.extend({
//	namespace: 'fixtures',
//	host: 'http://0.0.0.0:8000/data',
//	buildURL: function() {
//		var normalURL = this._super.apply(this, arguments);
//		return normalURL + '.json';
//	}
//});


// Prod
//
//App.ApplicationAdapter = DS.WebAPIAdapter.extend({
//	headers: {  // todo
//		"API_KEY": 'secret key',
//		"ANOTHER_HEADER": "some header value"
//	},
//	namespace: 'api',
//	host: 'http://10.234.96.72/CEDS.RND.VotingSystem'
//});
