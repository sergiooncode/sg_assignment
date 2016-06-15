$(function(){
	var SearchResultModel = Backbone.Model.extend({
		defaults: {
			first_name: '',
			last_name: ''
		}
	});

	var SearchResultList = Backbone.Collection.extend({
		model: SearchResultModel,
		performSearch: function(query) {
			var url = "/api/students/search/?" +
				"first_name=" + "&" + query.first_name +
				"last_name=" + query.last_name;
			$.ajax({
				type: "GET",
				url: url,
				success: this._searchComplete
			});
		},
		_searchComplete: function(results) {
			//searchResultModel.set({searchResults: results});
			$.each(results, function (index) {
				var fn = results[index].first_name;
				var ln = results[index].last_name;
				var searchResult = new SearchResultModel();
				searchResult.set({first_name: fn});
				searchResult.set({last_name: ln});
				searchResultList.add(searchResult);
			})
			console.log(searchResultList);
		}
	});

	var SearchFormView = Backbone.View.extend({
		el: '#search-form',
		events: {
			'submit': 'submit',
		},
		submit: function(event) {
			var data = {};
			event.preventDefault();
			this.form = $(event.currentTarget);
			query = {
				first_name: $(':input[name="first_name"]', this.form).val(),
				last_name: $(':input[name="last_name"]', this.form).val()
			};
			this.collection.performSearch(query);
		}
	});

	var SearchResultView = Backbone.View.extend({
		tagName: 'li',
		initialize: function () {
			this.template = _.template($('#result-template').html());
			this.render();
		},
		render: function () {
			this.$el.html(this.template({student: "yoo"}));
			return this;
		}
	});

	var SearchResultListView = Backbone.View.extend({
		el: '#result-list',
		tagName: 'ul',
		initialize: function () {
			this.template = _.template($('#result-list-template').html());
			//this.template = _.template($(this.templateName).html());
			//this.model.on("change:searchResults", this.render, this);
			this.render();
		},
		render: function () {
			that = this;
			this.$el.empty();
			this.$el.append(this.template);
			searchResultList.each(function (model) {
				that.$el.append(new SearchResultView({model: model.toJSON()}));
			});
			return this;
		}
	});

	//var searchResultModel = new SearchResultModel();
	var searchResultList = new SearchResultList();
	var searchFormView = new SearchFormView({collection: searchResultList});
	//var searchResultView = new SearchResultView({model: searchResultModel});
	var searchResultListView = new SearchResultListView({collection: searchResultList});
});
