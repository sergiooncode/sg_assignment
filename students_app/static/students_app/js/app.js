$(function () {
	var Student = Backbone.Model.extend({
		initialize: function(fn, ln) {
			this.first_name = fn;
			this.last_name = ln;
		}
	});

	var StudentSearch = Backbone.Collection.extend({
		model: Student,
		initialize : function(options){
			this.first_name = options.query.first_name;
			this.last_name = options.query.last_name;
		},
		url: function(){
			return "/api/students/search?="+"first_name="+this.first_name+"&last_name="+this.last_name;
		},
		parse: function(response, xhr) {
			return response;
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

	var SearchResultListView = Backbone.View.extend({
		tagName: 'ul',
		id: 'result-list',
		initialize: function () {
			//this.listenTo(this.collection, 'reset', this.render);
			//console.log(this.collection);
		},
		render: function () {
			var template = $("#result-template").html();
			var el = $(this.el);
			console.log(this.collection);
			this.collection.each(function (model) {
				var student = model.student;
				console.log(student);
				var tmpl = _.template(template);
				el.append(tmpl(model.toJSON()));
			});
		}
	});

	var students = new StudentSearch({query: {first_name: '', last_name: 'smith'}});
	//var students = new StudentCollection([
	//	{id: 1,name:"student 1"},
	//	{id: 2,name:"student 2"},
	//	{id: 3,name:"student 3"}
	//]);
	//console.log(students.models);

	var view = new SearchResultListView({collection: students});
	students.fetch({success: view.render()});
	//students.fetch({success: function () {
	//	students.each(function(model){console.log(model)});
	//}});
	view.render();
	$("#results").html(view.el);
});
