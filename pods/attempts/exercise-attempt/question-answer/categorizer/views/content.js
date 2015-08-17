define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryui',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/content.html',
        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/item.html',
        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/category.html',

        'less!pods/attempts/exercise-attempt/question-answer/categorizer/style.less'
    ],
    function ($, _, Backbone, JQueryUI, Config,
              QuestionAnswerModel, QuestionModel,
              contentTemplate, itemTemplate, categoryTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            id: 'categorizer',

            template: _.template(contentTemplate),
            itemTemplate: _.template(itemTemplate),
            categoryTemplate: _.template(categoryTemplate),

            $categoryBoxes: {},

            render: function () {
                var html = this.template({
                    question: this.model.questionModel().toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$source = this.$("#categorizer-items-source");
                this.$targets = this.$("#categorizer-groups");

                _.each(this.model.questionModel().get('categories'), this.renderCategory, this);

                _.each(this.model.questionModel().get('items'), this.appendItemToSource, this);

                var self = this;
                this.$(".connected-sortable").sortable({
                    connectWith: ".connected-sortable",
                    placeholder: "item-draggable-placeholder",
                    receive: function () {
                        self.itemDropped();
                    }
                }).disableSelection();

                return this;
            },

            renderCategory: function (category, index, categories) {
                var html = this.categoryTemplate({category: category});
                var $html = $(html);
                if (categories.length > 2) {
                    $html.find('.category-items-container').addClass('small-box');
                }
                this.$categoryBoxes[category._id] = $html;
                this.$targets.append($html);
            },

            appendItemToSource: function (item) {
                var html = this.itemTemplate({item: item});
                this.$source.append(html);
            },

            renderFeedback: function () {
                var categories = this.model.questionModel().get('categories');
                _.each(categories, this.renderCorrectCategory, this);

                this.$source.empty().hide();
            },

            renderCorrectCategory: function (category) {
                var answeredItems = this.getAnsweredItemsForCategory(category);
                var categoryCorrect = true;
                _.each(category.items, function(item){
                    var html = this.itemTemplate({item: item});
                    var $html = $(html);
                    var itemWasGivenInThisCategory = _.contains(answeredItems, item._id);
                    $html.addClass(itemWasGivenInThisCategory ? 'has-success' : 'has-error');
                    categoryCorrect &= itemWasGivenInThisCategory;
                    this.$categoryBoxes[category._id]
                        .find('.category-items-container')
                        .append($html);
                }, this);
                this.$categoryBoxes[category._id]
                    .removeClass('panel-primary')
                    .addClass(categoryCorrect ? 'panel-success' : 'panel-danger');
            },

            getAnsweredItemsForCategory: function(category) {
                var givenAnswer = this.model.get('given_answer');
                var givenCategories = givenAnswer.given_categories;
                var index = _.indexOf(givenCategories, category._id);
                return givenAnswer.given_categorized_items[index];
            },

            serializeForm: function () {
                var categorizedItems = {};
                var items;
                var categories = this.model.questionModel().get('categories');
                _.each(categories, function (category) {
                    categorizedItems[category._id] = [];
                    items = this.$('#category_' + category._id + ' .connected-sortable').sortable('toArray');
                    _.each(items, function (item) {
                        var matches = item.match(/^item_(\w+)$/);
                        if (matches.length == 2) {
                            categorizedItems[category._id].push(matches[1]);
                        }
                    }, this);
                }, this);
                return {categorized_items: categorizedItems};
            },

            validationAllowed: false,

            itemDropped: function () {
                this.validationAllowed = this.$('#categorizer-items-source').children().size() == 0;
                this.trigger('givenAnswerChanged');
            }

        })

    }
);
