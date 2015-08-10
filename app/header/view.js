define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',

        'app/header/notifications/view',

        'text!app/header/template.html',

        'less!app/header/style'
    ],
    function ($, _, Backbone, Config,
              currentUser,
              NotificationView,
              template) {

        return Backbone.View.extend({

            el: $('#header'),

            template: _.template(template),

            events: {
                'click #navbar-login-btn': 'login',
                'submit form.navbar-form': 'search'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function () {
                var html = this.template({currentUser: currentUser.forTemplate(), config: Config});
                this.$el.html(html);

                this.$notificationsList = this.$("#bs-example-navbar-collapse-1 li.dropdown ul#notifications-list");
                this.$notificationsList.empty();

                this.firstNotificationRendered = false;
                var notAcknowledgedTutorRequests = currentUser.get('not_acknowledged_tutors');
                _.each(notAcknowledgedTutorRequests, this.renderNotAcknowledgedTutorNotification, this);
                var notAcknowledgedStudentRequests = currentUser.get('not_acknowledged_students');
                _.each(notAcknowledgedStudentRequests, this.renderNotAcknowledgedStudentNotification, this);
                var awaitingTutorRequests = currentUser.get('awaiting_tutor_requests');
                _.each(awaitingTutorRequests, this.renderTutorRequestNotification, this);
                var awaitingStudentRequests = currentUser.get('awaiting_student_requests');
                _.each(awaitingStudentRequests, this.renderTutoredStudentRequestNotification, this);

                this.updateHeaderButtonFocus(this.currentFocusedElement);
            },

            renderNotification: function(user, isTutorRequest, isAcknowledged) {
                var notificationView = new NotificationView();
                notificationView.user = user;
                notificationView.isTutorRequest = isTutorRequest;
                notificationView.isAcknowledgeNotification = isAcknowledged;
                notificationView.render();

                if (this.firstNotificationRendered) {
                    this.$notificationsList.append('<li class="divider"></li>');
                } else {
                    this.firstNotificationRendered = true;
                }

                this.$notificationsList.append(notificationView.$el);

                return notificationView;
            },

            renderNotAcknowledgedTutorNotification: function(user) {
                var notificationView = this.renderNotification(user, true, true);
                this.listenTo(notificationView, 'acknowledge', this.acknowledgeTutorNotification);
            },

            renderNotAcknowledgedStudentNotification: function(user) {
                var notificationView = this.renderNotification(user, false, true);
                this.listenTo(notificationView, 'acknowledge', this.acknowledgeStudentNotification);
            },

            renderTutorRequestNotification: function(user) {
                var notificationView = this.renderNotification(user, true, false);
                this.listenTo(notificationView, 'accept', this.acceptTutorRequest);
                this.listenTo(notificationView, 'decline', this.declineTutorRequest);
            },

            renderTutoredStudentRequestNotification: function(user) {
                var notificationView = this.renderNotification(user, false, false);
                this.listenTo(notificationView, 'accept', this.acceptTutoredStudentRequest);
                this.listenTo(notificationView, 'decline', this.declineTutoredStudentRequest);
            },

            acknowledgeTutorNotification: function(notification, userId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/acknowledge/tutor/" + userId,
                    dataType: 'json'
                }).then(
                    function(response) {
                        console.log("the notification has been successfully acknowledged");
                        currentUser.set(currentUser.parse(response));
                    }, function(error) {
                        console.log("Error while acknowledging the tutor notification:", error );
                    });
            },

            acknowledgeStudentNotification: function(notification, userId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/acknowledge/student/" + userId,
                    dataType: 'json'
                }).then(function(response) {
                    console.log("the notification has been successfully acknowledged");
                    currentUser.set(currentUser.parse(response));
                }, function (error) {
                    console.log("Error while acknowledging the student notification:", error );
                });
            },

            acceptTutorRequest: function(notification, requestingUserId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/accept/tutor/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    console.log("the tutor request has been successfully accepted");
                    currentUser.set(currentUser.parse(response));
                }, function (error) {
                    console.log("Error while accepting the tutor request:", error );
                });
            },

            declineTutorRequest: function(notification, requestingUserId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/decline/tutor/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    console.log("the tutor request has been successfully accepted");
                    currentUser.set(currentUser.parse(response));
                }, function (error) {
                    console.log("Error while accepting the tutor request:", error.responseJSON.data.error_message );
                });
            },

            acceptTutoredStudentRequest: function(notification, requestingUserId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/accept/student/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    console.log("the tutored student request has been successfully accepted");
                    currentUser.set(currentUser.parse(response));
                }, function (error) {
                    console.log("Error while accepting the tutored student request:", error );
                });
            },

            declineTutoredStudentRequest: function(notification, requestingUserId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/decline/student/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    console.log("the tutored student request has been successfully declined");
                    currentUser.set(currentUser.parse(response));
                }, function (error) {
                    console.log("Error while declining the tutored student request:", error );
                });
            },

            login: function (e) {
                e.preventDefault();
                console.log('header -> login');
                Backbone.history.loadUrl("/login");
            },

            resetHeaderButtonFocus: function () {
                this.$('#navbar-home-btn').removeClass('focus');
                this.$('#navbar-tracks-btn').removeClass('focus');
                this.$('#navbar-user-btn').removeClass('focus');
            },

            updateHeaderButtonFocus: function (element) {
                this.resetHeaderButtonFocus();
                this.currentFocusedElement = element;
                var buttonId = null;
                switch (element) {
                    case 'home':
                        buttonId = '#navbar-home-btn';
                        break;
                    case 'hierarchy':
                        buttonId = '#navbar-tracks-btn';
                        break;
                    case 'user':
                        buttonId = '#navbar-user-btn';
                        break;
                }
                if (buttonId != null)
                {
                    this.$(buttonId).addClass('focus');
                }
            },

            search: function(e) {
                e.preventDefault();

                var $form = $(e.currentTarget);
                var searchedString = $form.find('input').val();
                Backbone.history.navigate('search?search_string=' + searchedString, {trigger: true});
            }
        });

    }
);
