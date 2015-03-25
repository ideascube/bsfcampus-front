define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/models/question',

		'text!pods/exercise-attempt/question-answer/unique-answer-mcq/templates/form.html',
		'text!pods/exercise-attempt/question-answer/unique-answer-mcq/templates/form-proposition.html',
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		formTemplate, formPropositionTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			template: _.template(formTemplate),
			propositionTemplate: _.template(formPropositionTemplate),

			events: {
				'change input[type=radio]': 'changedRadio'
			},

			changedRadio: function() {
			    this.trigger('onAnswerRadioSelected');
			},
			
			render: function() {
				var modelSON = this.model.forTemplate();
				var html = this.template({question: modelSON.question, config: Config});
				this.$el.html(html);

				var self = this;
				_.each(this.model.questionModel().get('propositions'), function(proposition) {
					var html = self.propositionTemplate({proposition: proposition});
					self.$el.find('.unique-answer-mcq-propositions').append(html);
				});
			},

		});
		
	}
);