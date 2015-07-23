define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',

        'text!pods/user/profile/pages/templates/tutoring-user-search-result-line.html'

    ],
    function ($, _, Backbone, Config,
              currentUser,
              template) {

        return Backbone.View.extend({

            template: _.template(template),

            className: 'user-search-result-line row',

            events: {
                'click button.tutor': 'tutorAction',
                'click button.student': 'studentAction'
            },

            updateTutorButton: function () {
                var list = this.model.get('students');
                var isAlreadyTutor = _.some(list, function (user) {
                    return (user._id == currentUser.id);
                });
                list = this.model.get('awaiting_tutor_requests');
                var isTutorRequestAwaiting = _.some(list, function (user) {
                    return (user._id == currentUser.id);
                });

                var $tutorButton = this.$el.find('button.tutor');
                if (isAlreadyTutor) {
                    $tutorButton.addClass('remove');
                    $tutorButton.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_REMOVE_TUTOR);
                }
                else if (isTutorRequestAwaiting) {
                    $tutorButton.addClass('cancel');
                    $tutorButton.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_CANCEL_TUTOR);
                }
                else {
                    $tutorButton.addClass('add');
                    $tutorButton.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_ADD_TUTOR);
                }
            },

            updateStudentButton: function () {
                var list = this.model.get('tutors');
                var isAlreadyStudent = _.some(list, function (user) {
                    return (user._id == currentUser.id);
                });
                list = this.model.get('awaiting_students');
                var isStudentRequestAwaiting = _.some(list, function (user) {
                    return (user._id == currentUser.id);
                });

                var $studentButton = this.$el.find('button.student');
                if (isAlreadyStudent) {
                    $studentButton.addClass('remove');
                    $studentButton.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_REMOVE_STUDENT);
                }
                else if (isStudentRequestAwaiting) {
                    $studentButton.addClass('cancel');
                    $studentButton.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_CANCEL_STUDENT);
                }
                else {
                    $studentButton.addClass('add');
                    $studentButton.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_ADD_STUDENT);
                }
            },

            render: function () {
                var html = this.template({
                    user: this.model.forTemplate(),
                    config: Config
                });
                this.$el.html(html);

                this.updateTutorButton();
                this.updateStudentButton();

                return this;
            },

            tutorAction: function (e) {
                e.preventDefault();
                var $button = $(e.currentTarget);

                if ($button.hasClass('add')) {
                    this.trigger('addTutor', this.model.id);
                }
                else if ($button.hasClass('cancel')) {
                    this.trigger('cancelTutorRequest', this.model.id);
                }
                else if ($button.hasClass('remove')) {
                    this.trigger('removeTutor', this.model.id);
                }
            },

            studentAction: function (e) {
                e.preventDefault();
                var $button = $(e.currentTarget);

                if ($button.hasClass('add')) {
                    this.trigger('addStudent', this.model.id);
                }
                else if ($button.hasClass('cancel')) {
                    this.trigger('cancelStudentRequest', this.model.id);
                }
                else if ($button.hasClass('remove')) {
                    this.trigger('removeStudent', this.model.id);
                }
            }

        });

    }
);