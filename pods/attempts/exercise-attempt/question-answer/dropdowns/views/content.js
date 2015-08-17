define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/dropdowns/templates/content.html',
		'text!pods/attempts/exercise-attempt/question-answer/dropdowns/templates/dropdown.html',

		'less!pods/attempts/exercise-attempt/question-answer/dropdowns/style.less'
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		contentTemplate, dropdownTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			id: 'dropdowns',

			template: _.template(contentTemplate),
			dropdownTemplate: _.template(dropdownTemplate),
			
			render: function() {
				var html = this.template({
                    question: this.model.questionModel().toJSON(true),
                    config: Config
                });
				this.$el.html(html);

				var splittedText = this.model.questionModel().get('text').split("[%%]");

				var dropdowns = this.model.questionModel().get('dropdowns');
                this.$('.dropdowns-text').empty();
				_.each(splittedText, function(fragment, index, fragments){
					this.$('.dropdowns-text').append(fragment);
					if (index < fragments.length - 1)
					{
						// We add the dropdown here
						var dropdown = dropdowns[index];
						var dropdownHTML = this.dropdownTemplate({ dropdown: dropdown });
						this.$('.dropdowns-text').append(dropdownHTML);
					}
				}, this);

                return this;
			},

            renderFeedback: function(){
				var dropdowns = this.model.questionModel().get('dropdowns');
				_.each(dropdowns, this.addDropdownFeedback, this);
            },

            addDropdownFeedback: function(dropdown) {
                var $dropdown = this.$('[data-dropdown="' + dropdown._id + '"]');
                var correctProposition = _.find(
                    dropdown.propositions,
                    function (proposition) {
                        return proposition.is_correct_answer;
                    }
                );
                $dropdown.find('select')
                    .val(correctProposition._id)
                    .prop('disabled', true);
                var answerIsCorrect = _.contains(
                    this.model.get('given_answer').given_propositions,
                    correctProposition._id
                );
                $dropdown.addClass(answerIsCorrect ? 'has-success' : 'has-error');
            },

			events: {
				'change select': 'propositionSelected'
			},

			validationAllowed: false,

			propositionSelected: function() {
                var validationAllowed = true;
				this.$('.dropdown select').each(function(){
					if ($(this).val() == "") {
                        validationAllowed = false;
                    }
				});
                this.validationAllowed = validationAllowed;
				this.trigger('givenAnswerChanged');
			}

		});
		
	}
);
