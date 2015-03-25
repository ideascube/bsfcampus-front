define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/models/question',

		'text!pods/exercise-attempt/question-answer/multiple-answer-mcq/templates/feedback.html',
		'text!pods/exercise-attempt/question-answer/multiple-answer-mcq/templates/feedback-proposition.html',
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
				var html = this.template({question_answer: this.model.forTemplate()});
				this.$el.html(html);

				_.each(this.model.questionModel().get('propositions'), this.renderProposition, this);

				return this;
			},

			renderProposition: function(proposition) {
				var html = this.propositionTemplate({proposition: proposition});
				var $proposition = $(html);
				if (_.contains(this.model.get('given_answer').given_propositions, proposition._id)) {
					$proposition.addClass('proposition_selected');
				}
				if (_.contains(this.model.questionModel().get('correct_answer'), proposition._id)) {
					$proposition.addClass('proposition_correct');
				}
				this.$el.find('.list-group').append($proposition);
			},

		});
		
	}
);
