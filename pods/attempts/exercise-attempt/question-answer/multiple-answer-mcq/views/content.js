define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/templates/content.html',
        'text!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/templates/proposition.html',

        'less!pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/style.less'
    ],
    function ($, _, Backbone, Config,
              QuestionAnswerModel, QuestionModel,
              contentTemplate, propositionTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            id: 'multiple-answer-mcq',

            template: _.template(contentTemplate),
            propositionTemplate: _.template(propositionTemplate),

            failedText: Config.stringsDict.EXERCISES.WRONG_ANSWER_MULTI,

            render: function () {
                var html = this.template({
                    question: this.model.questionModel().toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$propositionsContainer = this.$('.propositions-container');

                var propositions = this.model.questionModel().get('propositions');
                _.each(propositions, this.renderProposition, this);

                return this;
            },

            renderProposition: function (proposition) {
                var propositionHTML = this.propositionTemplate({
                    proposition: proposition
                });
                this.$propositionsContainer.append(propositionHTML);
            },

            renderFeedback: function () {
                var propositions = this.model.questionModel().get('propositions');
                _.each(propositions, this.addPropositionFeedback, this);
            },

            addPropositionFeedback: function (proposition) {
                var $proposition = this.$propositionsContainer.find('[data-proposition="' + proposition._id + '"]');
                $proposition.find('input').prop('disabled', true);
                var correctProposition = proposition.is_correct_answer;
                var givenProposition = _.contains(
                    this.model.get('given_answer').given_propositions,
                    proposition._id
                );
                if (givenProposition) {
                    $proposition.find('input').prop('checked', true);
                }
                if (correctProposition && givenProposition) {
                    $proposition.addClass('has-success');
                } else if (!correctProposition && givenProposition) {
                    $proposition.addClass('has-error');
                } else if (correctProposition && !givenProposition) {
                    $proposition.addClass('has-warning');
                }
            }

        });

    }
);
