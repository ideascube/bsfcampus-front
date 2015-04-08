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
				console.log("multiple-answer-mcq render", this.model.forTemplate());
				var html = this.template({question: this.model.forTemplate().question, config: Config});
				this.$el.html(html);

				var propositions = this.model.questionModel().get('propositions');
				for (var i=0; i < propositions.length; i++)
				{
					proposition = propositions[i];
					this.renderProposition(proposition, i);
					var el = this.$el.find('.multiple-answer-mcq-propositions');
				};

				return this;
			},

			renderProposition: function(proposition, index) {
				var html = this.propositionTemplate({proposition: proposition, index: index, config:Config});
				var $proposition = $(html);
				$proposition.addClass('disabled');
				if (_.contains(this.model.get('given_answer').given_propositions, proposition._id)) {
					$proposition.addClass('proposition_selected');
				}
				if (_.contains(this.model.questionModel().get('correct_answer'), proposition._id)) {
					$proposition.addClass('proposition_correct');
				}
				this.$el.find('.multiple-answer-mcq-propositions').append($proposition);
			},

		});
		
	}
);
