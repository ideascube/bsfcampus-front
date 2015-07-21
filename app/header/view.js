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
                'click #navbar-login-btn': 'login'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function () {
                var html = this.template({currentUser: currentUser.forTemplate(), config: Config});
                this.$el.html(html);

                this.$notificationsList = this.$el.find("#bs-example-navbar-collapse-1 li.dropdown ul#notifications-list");
                this.$notificationsList.html('');
                var awaitingTutorRequests = currentUser.get('awaiting_tutor_requests');
                _.each(awaitingTutorRequests, this.renderTutorRequestNotification, this);
                var awaitingStudentRequests = currentUser.get('awaiting_student_requests');
                _.each(awaitingStudentRequests, this.renderTutoredStudentRequestNotification, this);

                this.updateHeaderButtonFocus(this.currentFocusedElement);
            },

            renderTutorRequestNotification: function(requestingUser) {
                var notificationView = new NotificationView();
                notificationView.requestingUser = requestingUser;
                notificationView.isTutorRequest = true;

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
                }).done(function(response) {
                    console.log("the tutor request has been successfully accepted");
                    currentUser.set(currentUser.parse(response));
                }).fail(function (error) {
                    console.log("Error while accepting the tutor request:", error );
                });
            },

            declineTutorRequest: function(notification, requestingUserId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/decline/tutor/" + requestingUserId,
                    dataType: 'json'
                }).done(function(response) {
                    console.log("the tutor request has been successfully accepted");
                    currentUser.set(currentUser.parse(response));
                }).fail(function (error) {
                    console.log("Error while accepting the tutor request:", error.responseJSON.data.error_message );
                });
            },

            renderTutoredStudentRequestNotification: function(requestingUser) {
                var notificationView = new NotificationView();
                notificationView.requestingUser = requestingUser;
                notificationView.isTutorRequest = false;

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
                }).done(function(response) {
                    console.log("the tutored student request has been successfully accepted");
                    currentUser.set(currentUser.parse(response));
                }).fail(function (error) {
                    console.log("Error while accepting the tutored student request:", error );
                });
            },

            declineTutoredStudentRequest: function(notification, requestingUserId) {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/decline/student/" + requestingUserId,
                    dataType: 'json'
                }).done(function(response) {
                    console.log("the tutored student request has been successfully declined");
                    currentUser.set(currentUser.parse(response));
                }).fail(function (error) {
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
            }

        });

    }
);
