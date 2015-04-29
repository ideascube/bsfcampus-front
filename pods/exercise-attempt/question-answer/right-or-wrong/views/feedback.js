define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/models/question',

		'text!pods/exercise-attempt/question-answer/right-or-wrong/templates/feedback.html',
		'text!pods/exercise-attempt/question-answer/right-or-wrong/templates/feedback-proposition.html',
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		feedbackTemplate, feedbackPropositionTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'right-or-wrong',

			template: _.template(feedbackTemplate),
			propositionTemplate: _.template(feedbackPropositionTemplate),
			
			render: function() {
				var html = this.template({question: this.model.forTemplate().question, config: Config});
				this.$el.html(html);
				
				if (this.model.questionModel().get('image_url') != null)
				{
					this.$el.find('.question-image-media').html('<a href="' + this.model.questionModel().get('image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('image_url') + '"></a>');
					this.$el.find('.media-body').addClass('vertical');
				}
				else
				{
					this.$el.find('.question-image-media').hide();
					this.$el.find('.media-body').addClass('horizontal');
				}

				var propositions = this.model.questionModel().get('propositions');
				for (var i=0; i < propositions.length; i++)
				{
					proposition = propositions[i];
					this.renderProposition(proposition, i);
				}

				return this;
			},

			renderProposition: function(proposition, index) {
				var html = this.propositionTemplate({proposition: proposition, index: index, config:Config});
				var $proposition = $(html);
				$proposition.addClass('disabled');
				if (this.model.get('given_answer').given_proposition == proposition._id) {
					$proposition.addClass('proposition_selected');
				}
				if (proposition.is_correct_answer) {
					$proposition.addClass('proposition_correct');
				}
				this.$el.find('.right-or-wrong-propositions').append($proposition);
			},

		});
		
	}
);
