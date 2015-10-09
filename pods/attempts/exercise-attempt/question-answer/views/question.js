define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'pods/attempts/exercise-attempt/question-answer/views/content',

        'text!pods/attempts/exercise-attempt/question-answer/template.html'
    ],
    function ($, _, Backbone, Config,
              QuestionAnswerModel, QuestionModel,
              ContentView,
              template) {

        return Backbone.View.extend({

            template: _.template(template),

            questionIntructions: function(){
                switch (this.model.get('question').get('_cls').split('.').pop()) {
                    case 'UniqueAnswerMCQExerciseQuestion':
                        return Config.stringsDict.EXERCISES.INSTRUCTIONS.UNIQUE_ANSWER_MCQ;
                    case 'MultipleAnswerMCQExerciseQuestion':
                        return Config.stringsDict.EXERCISES.INSTRUCTIONS.MULTIPLE_ANSWER_MCQ;
                    case 'RightOrWrongExerciseQuestion':
                        return Config.stringsDict.EXERCISES.INSTRUCTIONS.RIGHT_OR_WRONG;
                    case 'DropdownExerciseQuestion':
                        return Config.stringsDict.EXERCISES.INSTRUCTIONS.DROPDOWNS;
                    case 'OrderingExerciseQuestion':
                        return Config.stringsDict.EXERCISES.INSTRUCTIONS.ORDERING;
                    case 'CategorizeExerciseQuestion':
                        return Config.stringsDict.EXERCISES.INSTRUCTIONS.CATEGORIZER;
                    default:
                        return "";
                }
            },

            render: function () {
                this.questionModel = this.model.get('question');

                var html = this.template({
                    question: this.questionModel.toJSON(true)
                });
                this.$el.html(html);

                this.contentView = new ContentView({model: this.model});

                this.$('#current-question-id').val(this.model.get('question_id'));
                this.$('#question-instructions').html(this.questionIntructions());
                this.$('#question-heading').html(this.questionModel.get('question_heading'));
                this.$('#question-content').html(this.contentView.render().$el);
                this.$('#answer-explanation')
                    .removeClass('text-danger text-success')
                    .empty();

                if (this.questionModel.get('question_image_url') == null) {
                    this.$('#question-image').hide();
                }

                if (this.model.get('given_answer') != null) {
                    this.renderFeedback();
                }

                return this;
            },

            renderFeedback: function() {
                this.contentView.renderFeedback();

                var correctAnswer = this.model.get('is_answered_correctly') === true;

                this.$('#answer-explanation')
                    .addClass(correctAnswer ? 'text-success' : 'text-danger')
                    .html(this.questionModel.get('answer_feedback'));
            }

        });

    }
);
