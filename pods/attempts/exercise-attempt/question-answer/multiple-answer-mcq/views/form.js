define(
	[
		'jquery',
		'underscore',
		'backbone',
		'form2js',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/templates/form.html',
		'text!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/templates/form-proposition.html',

		'less!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/style.less'
	],
	function($, _, Backbone, form2js, Config,
		QuestionAnswerModel, QuestionModel,
		formTemplate, formPropositionTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'multiple-answer-mcq',

			template: _.template(formTemplate),
			propositionTemplate: _.template(formPropositionTemplate),
			
			render: function() {
				var html = this.template({question: this.model.questionModel().forTemplate(), config: Config});
				this.$el.html(html);

				if (this.model.questionModel().get('question_image_url') != null)
				{
					this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
				}
				else
				{
					this.$('.question-image-media').hide();
				}

				var propositions = this.model.questionModel().get('propositions');
				for (var i=0; i < propositions.length; i++)
				{
					var proposition = propositions[i];
					html = this.propositionTemplate({proposition: proposition, index: i});
					var el = this.$('.multiple-answer-mcq-propositions');
					el.append(html);
				}

                return this;
			},

			serializeForm: function () {
				return {form_data: JSON.stringify(form2js('question-form', '.'))};
			}
		});
		
	}
);
