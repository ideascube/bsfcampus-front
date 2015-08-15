define(
	[
		'jquery',
		'underscore',
		'backbone',
		'form2js',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/right-or-wrong/templates/form.html',
		'text!pods/attempts/exercise-attempt/question-answer/right-or-wrong/templates/form-proposition.html',

		'less!pods/attempts/exercise-attempt/question-answer/right-or-wrong/style.less'
	],
	function($, _, Backbone, form2js, Config,
		QuestionAnswerModel, QuestionModel,
		formTemplate, formPropositionTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'right-or-wrong',

			template: _.template(formTemplate),
			propositionTemplate: _.template(formPropositionTemplate),

			events: {
				'change input[type=radio]': 'changedRadio'
			},

			changedRadio: function() {
			    this.trigger('onAnswerRadioSelected');
			},
			
			render: function() {
				var html = this.template({question: this.model.questionModel().toJSON(true), config: Config});
				this.$el.html(html);
				
				if (this.model.questionModel().get('question_image_url') != null)
				{
					this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
					this.$('.media-body').addClass('vertical');
				}
				else
				{
					this.$('.question-image-media').hide();
					this.$('.media-body').addClass('horizontal');
				}

				var propositions = this.model.questionModel().get('propositions');
				for (var i=0; i < propositions.length; i++)
				{
					proposition = propositions[i];
					var html = this.propositionTemplate({proposition: proposition, index: i});
					var el = this.$('.right-or-wrong-propositions');
					el.append(html);
				};

				return this;
			},

			serializeForm: function () {
				return {form_data: JSON.stringify(form2js('question-form', '.'))};
			}

		});
		
	}
);
