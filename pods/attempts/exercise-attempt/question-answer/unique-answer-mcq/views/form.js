define(
    [
        'jquery',
        'underscore',
        'backbone',
        'form2js',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'text!pods/attempts/exercise-attempt/question-answer/unique-answer-mcq/templates/form.html',
        'text!pods/attempts/exercise-attempt/question-answer/unique-answer-mcq/templates/form-proposition.html',

        'less!pods/attempts/exercise-attempt/question-answer/unique-answer-mcq/style.less'
    ],
    function ($, _, Backbone, form2js, Config,
              QuestionAnswerModel, QuestionModel,
              formTemplate, formPropositionTemplate) {

        return Backbone.View.extend({

            model: QuestionAnswerModel,

            id: 'unique-answer-mcq',

            template: _.template(formTemplate),
            propositionTemplate: _.template(formPropositionTemplate),

            events: {
                'change input[type=radio]': 'changedRadio'
            },

            changedRadio: function () {
                this.trigger('onAnswerRadioSelected');
            },

            render: function () {
                var html = this.template({
                    question: this.model.questionModel().toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                if (this.model.questionModel().get('question_image_url') != null) {
                    this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
                }
                else {
                    this.$('.question-image-media').hide();
                }

                var propositions = this.model.questionModel().get('propositions');
                _.each(propositions, function (proposition, index) {
                    var propositionHTML = this.propositionTemplate({
                        proposition: proposition,
                        index: index
                    });
                    this.$('.unique-answer-mcq-propositions').append(propositionHTML);
                }, this);

                return this;
            },

            serializeForm: function () {
                return {form_data: JSON.stringify(form2js('question-form', '.'))};
            }

        });

    }
);
