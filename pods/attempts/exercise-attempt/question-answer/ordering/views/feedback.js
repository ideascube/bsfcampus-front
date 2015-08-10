define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/ordering/templates/feedback.html',
		'text!pods/attempts/exercise-attempt/question-answer/ordering/templates/feedback-ordering.html',
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		feedbackTemplate, feedbackOrderingTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'ordering',

			template: _.template(feedbackTemplate),
			orderingTemplate: _.template(feedbackOrderingTemplate),
			
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

				correctAnswerItems = this.model.questionModel().get('items');
				userGivenItems = _.map(this.model.get('given_answer').given_ordered_items, function (itemId) {
					return _.find(correctAnswerItems, function (item) {
						return (itemId == item._id);
					}, this);
				}, this);
				for (var i = 0; i < userGivenItems.length; i++)
				{
					item = userGivenItems[i];
					isFailed = false;
					if (item._id != correctAnswerItems[i]._id)
					{
						isFailed = true;
					}
					this.renderItem(item, isFailed);
				}
				for (var i = 0; i < correctAnswerItems.length; i++)
				{
					item = correctAnswerItems[i];
					this.renderCorrectAnswerItem(item);
				}

				return this;
			},

			renderItem: function(item, isFailed) {
				console.log("renderItem", item, isFailed);
				var $html = $(this.orderingTemplate({item: item}));
				console.log
				if (isFailed)
				{
					$html.addClass('wrong-answer');
				}
				else
				{
					$html.addClass('right-answer');
				}
				this.$("#ordering-items-target-feedback").append($html);
			},

            renderCorrectAnswerItem: function(item) {
				var $html = $(this.orderingTemplate({item: item}));
				this.$("#ordering-items-answer-feedback").append($html);
			}

		});
		
	}
);
