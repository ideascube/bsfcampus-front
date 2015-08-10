define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',

        'app/header/notifications/view',

        'text!app/header/template.html'
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

                this.$notificationsList = this.$el.find("#bs-example-navbar-collapse-1 li.dropdown ul#notifications-list");
                this.$notificationsList.html('');
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

            renderNotAcknowledgedTutorNotification: function(user) {
                var notificationView = new NotificationView();
                notificationView.user = user;
                notificationView.isTutorRequest = true;
                notificationView.isAcknowledgeNotification = true;

                this.$notificationsList.append(notificationView.render());

                this.listenTo(notificationView, 'acknowledge', this.acknowledgeTutorNotification);
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

            renderNotAcknowledgedStudentNotification: function(user) {
                var notificationView = new NotificationView();
                notificationView.user = user;
                notificationView.isTutorRequest = false;
                notificationView.isAcknowledgeNotification = true;

                this.$notificationsList.append(notificationView.render());

                this.listenTo(notificationView, 'acknowledge', this.acknowledgeStudentNotification);
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

            renderTutorRequestNotification: function(user) {
                var notificationView = new NotificationView();
                notificationView.user = user;
                notificationView.isTutorRequest = true;
                notificationView.isAcknowledgeNotification = false;

                this.$notificationsList.append(notificationView.render());

                this.listenTo(notificationView, 'accept', this.acceptTutorRequest);
                this.listenTo(notificationView, 'decline', this.declineTutorRequest);
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

            renderTutoredStudentRequestNotification: function(user) {
                var notificationView = new NotificationView();
                notificationView.user = user;
                notificationView.isTutorRequest = false;
                notificationView.isAcknowledgeNotification = false;

                this.$notificationsList.append(notificationView.render());

                this.listenTo(notificationView, 'accept', this.acceptTutoredStudentRequest);
                this.listenTo(notificationView, 'decline', this.declineTutoredStudentRequest);
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
                this.$el.find('#navbar-home-btn').removeClass('focus');
                this.$el.find('#navbar-tracks-btn').removeClass('focus');
                this.$el.find('#navbar-user-btn').removeClass('focus');
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
                    this.$el.find(buttonId).addClass('focus');
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
