define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/models/question',

		'text!pods/exercise-attempt/question-answer/multiple-answer-mcq/templates/form.html',
		'text!pods/exercise-attempt/question-answer/multiple-answer-mcq/templates/form-proposition.html',

		'less!pods/exercise-attempt/question-answer/multiple-answer-mcq/style',
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
			
			render: function() {
				var html = this.template({question: this.model.questionModel().forTemplate(), config: Config});
				this.$el.html(html);

				var self = this;
				var propositions = this.model.questionModel().get('propositions');
				for (var i=0; i < propositions.length; i++)
				{
					proposition = propositions[i];
					var html = self.propositionTemplate({proposition: proposition, index: i});
					var el = self.$el.find('.multiple-answer-mcq-propositions');
					el.append(html);
				};
			},

		});
		
	}
);
