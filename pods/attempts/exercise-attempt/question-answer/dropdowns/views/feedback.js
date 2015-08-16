define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/dropdowns/templates/feedback.html',
		'text!pods/attempts/exercise-attempt/question-answer/dropdowns/templates/feedback-dropdown.html'
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		feedbackTemplate, feedbackDropdownTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'dropdowns',

			template: _.template(feedbackTemplate),
			dropdownTemplate: _.template(feedbackDropdownTemplate),
			
			render: function() {
				console.log("dropdowns render", this.model.toJSON(true));
				var html = this.template({question: this.model.toJSON(true).question, config: Config});
				this.$el.html(html);
				
				if (this.model.questionModel().get('question_image_url') != null)
				{
					this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
				}
				else
				{
					this.$('.question-image-media').hide();
				}

				var text = this.model.questionModel().get('text');
				var splittedText = text.split("[%%]");

				var dropdowns = this.model.questionModel().get('dropdowns');
				var given_propositions = this.model.get('given_answer').given_propositions;
				_.each(splittedText, function(fragment, index, fragments){
					this.$('.dropdowns-feedback').append(fragment);
					if (index < fragments.length - 1)
					{
						// We add the dropdown here
						dropdown = dropdowns[index];
						var given_answer = _.find(dropdown.propositions, function (proposition) {
							return _.contains(given_propositions, proposition._id);
						});
						var dropdownHTML = this.dropdownTemplate({dropdown: dropdown, answer: given_answer, index: index});
						$dropdown = $(dropdownHTML);
						correct_answer = _.find(dropdown.propositions, function (proposition) {
							return proposition.is_correct_answer;
						});
						if (_.contains(this.model.get('given_answer').given_propositions, correct_answer._id))
						{
							$dropdown.addClass('right-answer');
						}
						else
						{
							$dropdown.addClass('wrong-answer');
						}
						this.$('.dropdowns-feedback').append($dropdown);
					}
				}, this);

				var answerExplanationEl = this.$('.answer-explanation');
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
					answerExplanationEl.empty();
				}

				return this;
			},

			renderProposition: function(proposition, index) {
				var html = this.propositionTemplate({proposition: proposition, index: index, config:Config});
				var $proposition = $(html);
				$proposition.prop('disabled', true);
				if (_.contains(this.model.get('given_answer').given_propositions, proposition._id)) {
					$proposition.addClass('proposition_selected');
				}
				if (proposition.is_correct_answer) {
					$proposition.addClass('proposition_correct');
				}
				this.$('.dropdowns-propositions').append($proposition);
			},

		});
		
	}
);
