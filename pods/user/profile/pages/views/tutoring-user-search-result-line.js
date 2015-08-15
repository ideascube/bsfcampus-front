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

            className: 'user-search-result row',

            events: {
                'click .btn-tutor-action': 'tutorAction',
                'click .btn-student-action': 'studentAction'
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

                var $tutorButton = this.$('.btn-tutor-action');
                var $icon = $('<span/>')
                        .addClass('btn-action-icon')
                        .addClass('glyphicon-status')
                        .addClass('glyphicon');
                if (isAlreadyTutor) {
                    $tutorButton
                        .removeClass('btn-bordered').addClass('btn-success btn-remove')
                        .prepend($icon.addClass('glyphicon-remove glyphicon-status-danger'));
                }
                else if (isTutorRequestAwaiting) {
                    var $pending = $('<div/>')
                        .addClass('pending-request text-center')
                        .html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_PENDING_REQUEST);
                    $tutorButton
                        .removeClass('btn-bordered').addClass('btn-primary btn-cancel')
                        .prepend($icon.addClass('glyphicon-remove glyphicon-status-danger'))
                        .after($pending);
                }
                else {
                    $tutorButton
                        .addClass('btn-add')
                        .prepend($icon.addClass('glyphicon-plus glyphicon-status-bordered'));
                }
            },

            updateStudentButton: function () {
                var list = this.model.get('tutors');
                var isAlreadyStudent = _.some(list, function (user) {
                    return (user._id == currentUser.id);
                });
                list = this.model.get('awaiting_student_requests');
                var isStudentRequestAwaiting = _.some(list, function (user) {
                    return (user._id == currentUser.id);
                });

                var $studentButton = this.$('.btn-student-action');
                var $icon = $('<span/>')
                    .addClass('btn-action-icon')
                    .addClass('glyphicon-status')
                    .addClass('glyphicon');
                if (isAlreadyStudent) {
                    $studentButton
                        .removeClass('btn-bordered').addClass('btn-success btn-remove')
                        .prepend($icon.addClass('glyphicon-remove glyphicon-status-danger'));
                }
                else if (isStudentRequestAwaiting) {
                    var $pending = $('<div/>')
                        .addClass('pending-request text-center')
                        .html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_RESULT_PENDING_REQUEST);
                    $studentButton
                        .removeClass('btn-bordered').addClass('btn-primary btn-cancel')
                        .prepend($icon.addClass('glyphicon-remove glyphicon-status-danger'))
                        .after($pending);
                }
                else {
                    $studentButton
                        .addClass('btn-add')
                        .prepend($icon.addClass('glyphicon-plus glyphicon-status-bordered'));
                }
            },

            render: function () {
                var html = this.template({
                    user: this.model.toJSON(true),
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

                if ($button.hasClass('btn-add')) {
                    this.trigger('addTutor', this.model.id);
                }
                else if ($button.hasClass('btn-cancel')) {
                    this.trigger('cancelTutorRequest', this.model.id);
                }
                else if ($button.hasClass('btn-remove')) {
                    this.trigger('removeTutor', this.model.id);
                }
            },

            studentAction: function (e) {
                e.preventDefault();
                var $button = $(e.currentTarget);

                if ($button.hasClass('btn-add')) {
                    this.trigger('addStudent', this.model.id);
                }
                else if ($button.hasClass('btn-cancel')) {
                    this.trigger('cancelStudentRequest', this.model.id);
                }
                else if ($button.hasClass('btn-remove')) {
                    this.trigger('removeStudent', this.model.id);
                }
            }

        });

    }
);