define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/feedback.html',
		'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/feedback-categorizer-item.html',
		'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/feedback-categorizer-category.html',
	],
	function($, _, Backbone, Config,
		QuestionAnswerModel, QuestionModel,
		feedbackTemplate, feedbackCategorizerItemTemplate, feedbackCategorizerCategoryTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'categorizer',

			template: _.template(feedbackTemplate),
			categorizerItemTemplate: _.template(feedbackCategorizerItemTemplate),
			categorizerCategoryTemplate: _.template(feedbackCategorizerCategoryTemplate),

            render: function() {
				var html = this.template({question: this.model.questionModel().forTemplate(), config: Config});
				this.$el.html(html);

				if (this.model.questionModel().get('question_image_url') != null) {
					this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
                }
                else
                {
                    this.$('.question-image-media').hide();
                }

				var correctAnswerCategories = this.model.questionModel().get('categories');
				for (var i = 0; i < correctAnswerCategories.length; i++)
				{
					var correctAnsweredCategory = correctAnswerCategories[i];
					var answeredCategoryItems = this.getAnsweredItemsByCategoryId(correctAnsweredCategory._id);
                    this.renderCategory(correctAnsweredCategory, answeredCategoryItems);
				}

				//for (var i = 0; i < correctAnswerItems.length; i++)
				//{
				//	item = correctAnswerItems[i];
				//	this.renderCorrectAnswerItem(item);
				//}

				return this;
			},

            getAnsweredItemsByCategoryId: function (categoryId) {
                var givenAnswer = this.model.get('given_answer');
                var givenCategories = givenAnswer.given_categories;
                var categoryIndex = -1;
                for (var i = 0; (i < givenCategories.length && categoryIndex < 0); i++)
                {
                    if (categoryId == givenCategories[i])
                    {
                        categoryIndex = i;
                    }
                }
                return givenAnswer.given_categorized_items[categoryIndex];
            },

            getCorrectCategoryIdByItemId: function (itemId) {
                var correctCategories = this.model.questionModel().get('categories');
                for (var i = 0; i < correctCategories.length; i++)
                {
                    if (_.some(correctCategories[i].items, function(item) {
                           return (item._id == itemId);
                        }))
                    {
                        return correctCategories[i]._id;
                    }
                }
            },

            renderCategory: function (answeredCategory, answeredCategoryItems) {
                var $category = $(this.categorizerCategoryTemplate({category: answeredCategory, config:Config}));

                var isCategoryFailed = (answeredCategory.items.length != answeredCategoryItems.length);
                if (!isCategoryFailed)
                {
                    for (var i = 0; (i < answeredCategory.items.length && !isCategoryFailed); i++)
                    {
                        var itemId = answeredCategory.items[i]._id;
                        isCategoryFailed = (answeredCategoryItems.indexOf(itemId) < 0);
                    }
                }
                if (isCategoryFailed)
                {
                    $category.addClass('wrong-answer');
                }
                else
                {
                    $category.addClass('right-answer');
                }

                var allItems = [];
                _.each(this.model.questionModel().get('categories'), function (category) {
                    allItems = allItems.concat(category.items);
                }, this);
                for( i = 0; i < answeredCategoryItems.length; i++)
                {
                    var itemId = answeredCategoryItems[i];
                    var answeredItem = _.findWhere(allItems, {_id: itemId});
                    var parentCorrectCategoryId = this.getCorrectCategoryIdByItemId(itemId);
                    var isItemFailed = (parentCorrectCategoryId != answeredCategory._id);
                    var $item = this.renderItem(answeredItem, isItemFailed);
                    $category.find(".categorizer-category-items").append($item);
                }

                this.$("#categorizer-groups").append($category);
			},

			renderItem: function(item, isFailed) {
				console.log("renderItem", item, isFailed);
				var $html = $(this.categorizerItemTemplate({item: item}));
				if (isFailed)
				{
					$html.addClass('wrong-answer');
				}
				else
				{
					$html.addClass('right-answer');
				}

                return $html;
			},

            renderCorrectAnswerItem: function(item) {
				var $html = $(this.categorizerItemTemplate({item: item}));
				this.$("#categorizer-items-answer-feedback").append($html);
			}

		});
		
	}
);
