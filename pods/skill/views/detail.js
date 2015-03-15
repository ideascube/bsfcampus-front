define(
	[
		'jquery',
		'underscore',
		'backbone',
		'pods/skill/views/backToTrack',
		'text!pods/skill/templates/detail.html',
		'pods/track/model',
		'pods/lesson/collections/skill',
		'pods/resource/collections/lesson',
		'text!pods/skill/templates/detail-lesson-item.html',
		'text!pods/skill/templates/detail-lesson-resource-item.html'
	],
	function($, _, Backbone, BackToTrackView, detailTemplate, TrackModel, LessonSkillCollection, ResourceLessonCollection, lessonItemTemplate, lessonResourceItemTemplate) {

		var LessonItemView = Backbone.View.extend({
			
			tagName: 'div',

			template: _.template(lessonItemTemplate),

			render: function() {
				var html = this.template({lesson: this.model.forTemplate()});
				this.$el.html(html);
				return this;
			}
		});

		var LessonResourceItemView = Backbone.View.extend({
			
			tagName: 'div',

			template: _.template(lessonResourceItemTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				this.$el.html(html);
				return this;
			}
		});

		var DetailView = Backbone.View.extend({

			el: $('#container'),
			
			template: _.template(detailTemplate),

			render: function() {
				var son = this.model.forTemplate();
				var html = this.template({skill: son});
				$("body").css("background", "#e9e9e9 url('" + son.bgImageUrl + "') no-repeat")
					.css("background-size", "100%")
					.css("background-position", "0% 100%")
					.css("background-attachment", "fixed");
				this.$el.html(html);

				var self = this;

				var trackModel = new TrackModel({_id: this.model.get('track')});
				trackModel.fetch().done(function(){
					var backToTrackView = new BackToTrackView({model: trackModel});
					backToTrackView.render();
				});

				var lessonsCollection = new LessonSkillCollection();
				lessonsCollection.meta('skill_id', this.model.id);
				lessonsCollection.fetch().then(function(){
					$('#skill-lessons').html('');
					_.each(lessonsCollection.models, self.renderOneLesson, self);
				});
			},

			renderOneLesson: function(lesson, lessonIndex) {
				var lessonItemView = new LessonItemView({model: lesson});
				lessonItemView.render();
				lessonItemView.$el.attr('id', 'skill-lesson-' + lessonIndex);

				$('#skill-lessons').append(lessonItemView.$el);

				self = this;

				var resourcesCollection = new ResourceLessonCollection();
				resourcesCollection.meta('lesson_id', lesson.id);
				resourcesCollection.fetch().then(function(){
					$('#skill-lesson-' + lessonIndex + ' .lesson-resources').html('');
					self.lessonIndex = lessonIndex;
					_.each(resourcesCollection.models, self.renderOneResource, self);
				})
			},

			renderOneResource: function(resource) {
				var lessonResourceItemView = new LessonResourceItemView({model: resource});
				lessonResourceItemView.render();
				$('#skill-lesson-' + this.lessonIndex + ' .lesson-resources').append(lessonResourceItemView.$el);
			},

		});

		return DetailView;
		
	}
);
