define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/models/question',

		'text!pods/exercise-attempt/question-answer/unique-answer-mcq/templates/feedback.html',
		'text!pods/exercise-attempt/question-answer/unique-answer-mcq/templates/feedback-proposition.html',
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		feedbackTemplate, feedbackPropositionTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			template: _.template(feedbackTemplate),
			propositionTemplate: _.template(feedbackPropositionTemplate),
			
			render: function() {
				var html = this.template({question: this.model.forTemplate()});
				this.$el.html(html);

				var self = this;
				_.each(this.model.questionModel().get('propositions'), function(proposition) {
					var html = self.propositionTemplate({proposition: proposition});
					self.$el.find('.list-group').append(html);
				});
			},

		});
		
	}
);
