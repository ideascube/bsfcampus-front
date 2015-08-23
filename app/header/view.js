define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'app/header/notifications/view',

        'text!app/header/template.html',
        'text!app/header/user-menu.html',

        'less!app/header/style'
    ],
    function ($, _, Backbone, Config,
              NotificationView,
              template, userMenuTemplate) {

        return Backbone.View.extend({

            template: _.template(template),
            userMenuTemplate: _.template(userMenuTemplate),

            events: {
                'click #navbar-login-btn': 'login',
                'submit form.navbar-form': 'search'
            },

            initialize: function(){
                this.listenTo(this.model, 'change', this.render);
            },

            render: function () {
                var html = this.template({
                    user: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$loginButton = this.$('#navbar-login-btn');

                if (!this.model.isNew()) {
                    this.renderUserMenu();
                }

                this.updateHeaderButtonFocus(this.currentFocusedElement);

                return this;
            },

            renderUserMenu: function() {
                var html = this.userMenuTemplate({
                    config: Config,
                    user: this.model.toJSON(true)
                });
                this.$loginButton.closest('li').replaceWith(html);
                this.renderNotifications();
            },

            renderNotifications: function(){
                this.$notificationsList = this.$("#bs-example-navbar-collapse-1 li.dropdown ul#notifications-list");
                this.$notificationsList.empty();
                this.firstNotificationRendered = false;

                if (!this.model.isNew()) {
                    this.model.get('not_acknowledged_tutors').each(this.renderNotAcknowledgedTutorNotification, this);
                    this.model.get('not_acknowledged_students').each(this.renderNotAcknowledgedStudentNotification, this);
                    this.model.get('awaiting_tutor_requests').each(this.renderTutorRequestNotification, this);
                    this.model.get('awaiting_student_requests').each(this.renderTutoredStudentRequestNotification, this);
                }
            },

            renderNotification: function(user, isTutorRequest, isAcknowledged) {
                if (this.firstNotificationRendered) {
                    this.$notificationsList.append('<li class="divider"></li>');
                } else {
                    this.firstNotificationRendered = true;
                }

                var notificationView = new NotificationView();
                notificationView.user = user;
                notificationView.isTutorRequest = isTutorRequest;
                notificationView.isAcknowledgeNotification = isAcknowledged;

                this.$notificationsList.append(notificationView.render().$el);

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
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/acknowledge/tutor/" + userId,
                    dataType: 'json'
                }).then(
                    function(response) {
                        self.model.set(self.model.parse(response));
                    }, function(error) {
                        console.log("Error while acknowledging the tutor notification:", error );
                    });
            },

            acknowledgeStudentNotification: function(notification, userId) {
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/acknowledge/student/" + userId,
                    dataType: 'json'
                }).then(function(response) {
                    self.model.set(self.model.parse(response));
                }, function (error) {
                    console.log("Error while acknowledging the student notification:", error );
                });
            },

            acceptTutorRequest: function(notification, requestingUserId) {
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/accept/tutor/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    self.model.set(self.model.parse(response));
                }, function (error) {
                    console.log("Error while accepting the tutor request:", error );
                });
            },

            declineTutorRequest: function(notification, requestingUserId) {
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/decline/tutor/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    self.model.set(self.model.parse(response));
                }, function (error) {
                    console.log("Error while accepting the tutor request:", error.responseJSON.data.error_message );
                });
            },

            acceptTutoredStudentRequest: function(notification, requestingUserId) {
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/accept/student/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    self.model.set(self.model.parse(response));
                }, function (error) {
                    console.log("Error while accepting the tutored student request:", error );
                });
            },

            declineTutoredStudentRequest: function(notification, requestingUserId) {
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/tutoring/decline/student/" + requestingUserId,
                    dataType: 'json'
                }).then(function(response) {
                    self.model.set(self.model.parse(response));
                }, function (error) {
                    console.log("Error while declining the tutored student request:", error );
                });
            },

            login: function (e) {
                e.preventDefault();
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
