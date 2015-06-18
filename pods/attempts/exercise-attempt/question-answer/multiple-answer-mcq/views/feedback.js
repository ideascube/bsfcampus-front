define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/templates/feedback.html',
		'text!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/templates/feedback-proposition.html',
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		feedbackTemplate, feedbackPropositionTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'multiple-answer-mcq',

			template: _.template(feedbackTemplate),
			propositionTemplate: _.template(feedbackPropositionTemplate),
			
			render: function() {
				console.log("multiple-answer-mcq render", this.model.forTemplate());
				var html = this.template({question: this.model.forTemplate().question, config: Config});
				this.$el.html(html);
				
				if (this.model.questionModel().get('question_image_url') != null)
				{
					this.$el.find('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
				}
				else
				{
					this.$el.find('.question-image-media').hide();
				}

				var propositions = this.model.questionModel().get('propositions');
				for (var i=0; i < propositions.length; i++)
				{
					proposition = propositions[i];
					this.renderProposition(proposition, i);
				}

				var answerExplanationEl = this.$el.find('.answer-explanation');
				if (this.model.get('is_answered_correctly') === true)
				{
					answerExplanationEl.addClass('right-answer');
				}
				else
				{
					answerExplanationEl.addClass('wrong-answer');
				}
				if (this.model.get('question').answer_feedback != null)
				{
					answerExplanationEl.html(this.model.get('question').answer_feedback);
					answerExplanationEl.show();
				}
				else
				{
					answerExplanationEl.html('');
				}

				return this;
			},

			renderProposition: function(proposition, index) {
				var html = this.propositionTemplate({proposition: proposition, index: index, config:Config});
				var $proposition = $(html);
				$proposition.addClass('disabled');
				if (_.contains(this.model.get('given_answer').given_propositions, proposition._id)) {
					$proposition.addClass('proposition_selected');
				}
				if (proposition.is_correct_answer) {
					$proposition.addClass('proposition_correct');
				}
				this.$el.find('.multiple-answer-mcq-propositions').append($proposition);
			}

		});
		
	}
);