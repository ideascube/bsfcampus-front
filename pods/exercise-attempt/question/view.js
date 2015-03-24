define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question/model',
		'text!pods/exercise-attempt/question/templates/unique-answer-mcq.html',
		'text!pods/exercise-attempt/question/templates/multiple-answer-mcq.html',
	],
	function($, _, Backbone, Config,
		QuestionModel, uniqueAnswerMCQTemplate, multipleAnswerMCQTemplate
		) {

		return Backbone.View.extend({

			model: QuestionModel,

			tagName: 'div',

			templateHTML: function() {
				switch (this.model.get('_cls')) {
					case 'UniqueAnswerMCQExerciseQuestion':
						return uniqueAnswerMCQTemplate;
					case 'MultipleAnswerMCQExerciseQuestion':
						return multipleAnswerMCQTemplate;
					default:
						return 'Unrecognized question type: ' + this.model.get('_cls');
				}
			},

			template: function(data) {
				return _.template(this.templateHTML())(data);
			},
			
			render: function() {
				var html = this.template({question: this.model.forTemplate()});
				this.$el.html(html);
				switch (this.model.get('_cls')) {
					case 'UniqueAnswerMCQExerciseQuestion':
						this.renderUniqueAnswerMCQExerciseQuestion(); break;
					case 'MultipleAnswerMCQExerciseQuestion':
						this.renderMultipleAnswerMCQExerciseQuestion(); break;
				}
			},

			renderUniqueAnswerMCQExerciseQuestion: function() {
				var self = this;
				_.each(this.model.get('propositions'), function(proposition){
					var html = '<div class="radio"><label>' 
						+ '<input type="radio" name="proposition" value="' + proposition._id + '" /> ' 
						+ proposition.text 
						+ '</label></div>';
					self.$el.find('.unique-answer-mcq-propositions').append(html);
				});
			},

			renderMultipleAnswerMCQExerciseQuestion: function() {
				var self = this;
				_.each(this.model.get('propositions'), function(proposition){
					var html = '<div class="checkbox"><label>' 
						+ '<input type="checkbox" name="propositions[]" value="' + proposition._id + '" /> ' 
						+ proposition.text 
						+ '</label></div>';
					self.$el.find('.multiple-answer-mcq-propositions').append(html);
				});
			},

		});
		
	}
);
