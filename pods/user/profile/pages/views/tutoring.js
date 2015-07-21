define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',
        'pods/user/models/user',

        'pods/user/profile/pages/views/tutoring-user-search-result-line',

        'text!pods/user/profile/pages/templates/tutoring.html',

        'less!pods/user/profile/pages/styles/tutoring'
    ],
    function($, _, Backbone, Config,
             currentUser, User,
             UserSearchResultLineView,
             tutoringTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'user-profile-tutoring-container',

            template: _.template(tutoringTemplate),

            events: {
                'submit form': 'searchUser'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                return this;
            },

            searchUser: function(e) {
                e.preventDefault();

                var $form = $(e.currentTarget);
                var searchedUsername = $form.find('#user_search').val();

                var self = this;
                var endpointUrl = Config.constants.serverGateway + "/users/search/" + searchedUsername;
                $.ajax({
                    type: 'GET',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("user search is successful:", result.data);
                    self.renderSearchResults(result.data);
                })
                .fail(function(error) {
                    console.log("user search has failed:", error['responseJSON']['error_message']);
                });

            },

            renderSearchResults: function (usersList) {
                this.$searchResultList = this.$el.find('#tutoring-user-search-results');
                this.$searchResultList.html('');
                _.each(usersList, this.renderSingleUserResult, this);
            },

            renderSingleUserResult: function(userSON) {
                var user = new User({data: userSON}, {parse: true});
                var userSearchResultLineView = new UserSearchResultLineView({model: user});
                this.addSearchedUserListeners(userSearchResultLineView);
                this.$searchResultList.append(userSearchResultLineView.render());
            },

            addSearchedUserListeners: function (userSearchResultLineView) {
                this.listenTo(userSearchResultLineView, 'addTutor', this.addTutor);
                this.listenTo(userSearchResultLineView, 'cancelTutorRequest', this.cancelTutorRequest);
                this.listenTo(userSearchResultLineView, 'removeTutor', this.removeTutor);
                this.listenTo(userSearchResultLineView, 'addStudent', this.addStudent);
                this.listenTo(userSearchResultLineView, 'cancelStudentRequest', this.cancelStudentRequest);
                this.listenTo(userSearchResultLineView, 'removeStudent', this.removeStudent);
            },

            addTutor: function(userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/request/tutor/" + userId;

                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("add tutor request successful:", result.data);
                })
                .fail(function(error) {
                    console.log("add tutor request failed:", error['responseJSON']['error_message']);
                });
            },

            cancelTutorRequest: function(userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/cancel/tutor/" + userId;

                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("cancel tutor request successful:", result.data);
                })
                .fail(function(error) {
                    console.log("cancel tutor request failed:", error['responseJSON']['error_message']);
                });
            },

            removeTutor: function(userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/remove/tutor/" + userId;

                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("remove tutor request successful:", result.data);
                })
                .fail(function(error) {
                    console.log("remove tutor request failed:", error['responseJSON']['error_message']);
                });
            },

            addStudent: function(userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/request/student/" + userId;

                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("add student request successful:", result.data);
                })
                .fail(function(error) {
                    console.log("add student request failed:", error['responseJSON']['error_message']);
                });
            },

            cancelStudentRequest: function(userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/cancel/student/" + userId;

                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("cancel student request successful:", result.data);
                })
                .fail(function(error) {
                    console.log("cancel student request failed:", error['responseJSON']['error_message']);
                });
            },

            removeStudent: function(userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/remove/student/" + userId;

                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                .done(function(result) {
                    console.log("remove student request successful:", result.data);
                })
                .fail(function(error) {
                    console.log("remove student request failed:", error['responseJSON']['error_message']);
                });
            }

        });
    }
);
