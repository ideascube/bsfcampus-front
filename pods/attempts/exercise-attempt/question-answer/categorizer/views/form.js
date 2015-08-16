define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryui',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/form.html',
        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/form-categorizer-item.html',
        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/form-categorizer-category.html',

        'less!pods/attempts/exercise-attempt/question-answer/categorizer/style.less'
    ],
    function ($, _, Backbone, JQueryUI, Config,
              QuestionAnswerModel, QuestionModel,
              formTemplate, formCategorizerItemTemplate, formCategorizerCategoryTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            id: 'categorizer',

            template: _.template(formTemplate),
            categorizerItemTemplate: _.template(formCategorizerItemTemplate),
            categorizerCategoryTemplate: _.template(formCategorizerCategoryTemplate),

            render: function () {
                var html = this.template({question: this.model.questionModel().toJSON(true), config: Config});
                this.$el.html(html);

                if (this.model.questionModel().get('question_image_url') != null) {
                    this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
                }
                else
                {
                    this.$('.question-image-media').hide();
                }

                _.each(this.model.questionModel().get('categories'), this.renderCategory, this);

                _.each(this.model.questionModel().get('items'), this.renderItem, this);

                var self = this;
                this.$(".connectedSortable").sortable({
                    connectWith: ".connectedSortable",
                    placeholder: "item-draggable-placeholder",
                    receive: function (event, ui) {
                        self.trigger('onCategorizerSortableItemReceived');
                    }
                }).disableSelection();

                return this;
            },

            renderCategory: function (category, index, categories) {
                var sizeAttr = (categories.length <= 2) ? '' : 'category-small';
                var html = this.categorizerCategoryTemplate({category: category, sizeAttr: sizeAttr});
                this.$("#categorizer-groups").append(html);
            },

            renderItem: function (item) {
                var html = this.categorizerItemTemplate({item: item});
                this.$("#categorizer-items-source").append(html);
            },

            serializeForm: function() {
                var categorizedItems = {};
                var items;
                var categories = this.model.questionModel().get('categories');
                _.each(categories, function(category){
                    categorizedItems[category._id] = [];
                    items = this.$('#category_' + category._id + ' .connectedSortable').sortable('toArray');
                    _.each(items, function(item) {
                        var matches = item.match(/^item_(\w+)$/);
                        if (matches.length == 2) {
                            categorizedItems[category._id].push(matches[1]);
                        }
                    }, this);
                }, this);
                return {categorized_items: categorizedItems};
            }

        })

    }
);
