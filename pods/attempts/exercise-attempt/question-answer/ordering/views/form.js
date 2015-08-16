define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryui',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/ordering/templates/form.html',
        'text!pods/attempts/exercise-attempt/question-answer/ordering/templates/form-ordering.html',

        'less!pods/attempts/exercise-attempt/question-answer/ordering/style.less'
    ],
    function ($, _, Backbone, JQueryUI, Config,
              QuestionAnswerModel, QuestionModel,
              formTemplate, formOrderingTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            id: 'ordering',

            template: _.template(formTemplate),
            orderingTemplate: _.template(formOrderingTemplate),

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

                _.each(this.model.questionModel().get('items'), this.renderItem, this);

                self = this;
                this.$("#ordering-items-target, #ordering-items-source").sortable({
                    connectWith: ".connectedSortable",
                    placeholder: "item-draggable-placeholder",
                    receive: function (event, ui) {
                        self.trigger('onOrderingSortableItemReceived');
                    }
                }).disableSelection();

                return this;
            },

            renderItem: function (item) {
                var html = this.orderingTemplate({item: item});
                this.$("#ordering-items-source").append(html);
            },

            serializeForm: function() {
                var orderedItems = [];
                var items = this.$('#ordering-items-target').sortable('toArray');
                _.each(items, function(item) {
                    var matches = item.match(/^item_(\w+)$/);
                    if (matches.length == 2) {
                        orderedItems.push(matches[1]);
                    }
                }, this);
                return {ordered_items: orderedItems};
            }

        })

    }
);
