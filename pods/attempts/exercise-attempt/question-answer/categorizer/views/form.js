define(
    [
        'jquery',
        'underscore',
        'backbone',
        'form2js',
        'jqueryui',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/form.html',
        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/form-categorizer-item.html',
        'text!pods/attempts/exercise-attempt/question-answer/categorizer/templates/form-categorizer-category.html',

        'less!pods/attempts/exercise-attempt/question-answer/categorizer/style.less'
    ],
    function ($, _, Backbone, form2js, JQueryUI, Config,
              QuestionAnswerModel, QuestionModel,
              formTemplate, formCategorizerItemTemplate, formCategorizerCategoryTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            tagName: 'div',

            id: 'categorizer',

            template: _.template(formTemplate),
            categorizerItemTemplate: _.template(formCategorizerItemTemplate),
            categorizerCategoryTemplate: _.template(formCategorizerCategoryTemplate),

            render: function () {
                var html = this.template({question: this.model.questionModel().forTemplate(), config: Config});
                this.$el.html(html);

                if (this.model.questionModel().get('question_image_url') != null) {
                    this.$el.find('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
                }
                else
                {
                    this.$el.find('.question-image-media').hide();
                }

                _.each(this.model.questionModel().get('categories'), this.renderCategory, this);

                _.each(this.model.questionModel().get('items'), this.renderItem, this);

                self = this;
                this.$el.find(".connectedSortable").sortable({
                    connectWith: ".connectedSortable",
                    placeholder: "item-draggable-placeholder",
                    receive: function (event, ui) {
                        self.trigger('onCategorizerSortableItemReceived');
                    }
                }).disableSelection();

                return this;
            },

            renderCategory: function (category) {
                var html = this.categorizerCategoryTemplate({category: category});
                this.$el.find("#categorizer-groups").append(html);
            },

            renderItem: function (item) {
                var html = this.categorizerItemTemplate({item: item});
                this.$el.find("#categorizer-items-source").append(html);
            },

            serializeForm: function () {
                var serializedCategories = [];
                var categories = this.model.questionModel().get('categories');
                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    var serializedCategory = this.serializeCategoryForm(category);
                    serializedCategories.push(serializedCategory);
                }
                console.log(serializedCategories);
                var result = {"given_categorized_items": serializedCategories};
                result.question_id = $('#question-form > input[name="question_id"]').attr("value");
                return {form_data: JSON.stringify(result)};
            },

            serializeCategoryForm: function(category) {
                var result = {};
                var categoryObj = form2js('category_' + category._id, '.')['given_categorized_categories'];
                result.id = categoryObj[0];
                result.items = categoryObj[1]['given_categorized_items'];
                return result;
            }

        })

    }
)
