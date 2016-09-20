define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryuitouch',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/ordering/templates/content.html',
        'text!pods/attempts/exercise-attempt/question-answer/ordering/templates/item.html',

        'less!pods/attempts/exercise-attempt/question-answer/ordering/style.less'
    ],
    function ($, _, Backbone, JQueryUI, Config,
              QuestionAnswerModel, QuestionModel,
              contentTemplate, itemTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            id: 'ordering',

            template: _.template(contentTemplate),
            orderingTemplate: _.template(itemTemplate),

            render: function () {
                var html = this.template({
                    question: this.model.get('question').toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$target = this.$("#ordering-items-target");
                this.$source = this.$("#ordering-items-source");

                this.$target.empty();
                this.$source.empty();
                _.each(this.model.get('question').get('items'), this.appendItemToSource, this);

                var self = this;
                this.$(".connected-sortable").sortable({
                    connectWith: ".connected-sortable",
                    placeholder: "item-draggable-placeholder",
                    receive: function() { self.itemDropped(); }
                }).disableSelection();

                return this;
            },

            appendItemToSource: function (item) {
                var html = this.orderingTemplate({ item: item });
                this.$source.append(html);
            },

            renderFeedback: function() {
                this.$source.empty();
                var correctAnswerItems = this.model.get('question').get('items');
                _.each(correctAnswerItems, this.appendItemToSource, this);

                this.$source.sortable({disabled: true});

                this.$target.empty();
                // Transforms a list of IDs into a list of detailed items.
                var givenItems = _.map(
                    this.model.get('given_answer').given_ordered_items,
                    function (itemId) {
                        return _.find(
                            correctAnswerItems,
                            function (item) {
                                return (itemId == item._id);
                            },
                            this
                        );
                    },
                    this
                );
                _.each(givenItems, function(item, index) {
                    var html = this.orderingTemplate({ item: item });
                    var $html = $(html);
                    var correct = item._id == correctAnswerItems[index]._id;
                    $html.addClass(correct ? 'has-success' : 'has-error');
                    this.$target.append($html);
                }, this);

                this.$target.sortable({disabled: true});
            },

            serializeForm: function() {
                var orderedItems = [];
                var items = this.$target.sortable('toArray');
                _.each(items, function(item) {
                    var matches = item.match(/^item_(\w+)$/);
                    if (matches.length == 2) {
                        orderedItems.push(matches[1]);
                    }
                }, this);
                return {ordered_items: orderedItems};
            },

            validationAllowed: false,

            itemDropped: function() {
                this.validationAllowed = this.$source.children().size() == 0;
                this.trigger('givenAnswerChanged');
            }

        })

    }
);
