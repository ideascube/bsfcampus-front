define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',
        'pods/user/models/user',
        'pods/user/models/dashboard',

        'pods/user/profile/pages/views/tutoring-user-search-result-line',
        'pods/user/profile/pages/views/dashboard-details',

        'text!pods/user/profile/pages/templates/tutoring.html',
        'text!pods/user/profile/pages/templates/tutoring-student-dropdown-line.html',

        'less!pods/user/profile/pages/styles/tutoring',
        'less!pods/user/profile/pages/styles/dashboard'
    ],
    function ($, _, Backbone, Config,
              currentUser, User, DashboardModel,
              UserSearchResultLineView, DashboardDetailsView,
              tutoringTemplate, tutoringDropdownLineTemplate) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'user-profile-tutoring-container',

            template: _.template(tutoringTemplate),

            events: {
                'submit form': 'searchUser',
                'click #tutoring-student-dashboard > .dropdown > ul.dropdown-menu > li > a': 'selectStudent'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                var tutoredStudents = currentUser.get('tutored_students');
                if (tutoredStudents.length == 0)
                {
                    this.$el.find('#tutoring-student-dashboard').hide();
                }
                else
                {
                    this.$el.find('#tutoring-student-dashboard').show();
                    _.each(tutoredStudents, this.addStudentToDropdown, this);
                }

                return this;
            },

            addStudentToDropdown: function(user) {
                var $studentUserHtml = _.template(tutoringDropdownLineTemplate)({user: user});
                this.$el.find('#tutoring-student-dashboard > .dropdown > ul.dropdown-menu').append($studentUserHtml);
            },

            searchUser: function (e) {
                e.preventDefault();

                var $form = $(e.currentTarget);
                var searchedUsername = $form.find('#user_search').val();

                var self = this;
                var endpointUrl = Config.constants.serverGateway + "/search/user";
                $.ajax({
                    type: 'GET',
                    url: endpointUrl,
                    data: {username: searchedUsername},
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("user search is successful:", result.data);
                        self.renderSearchResults(result.data);
                    })
                    .fail(function (error) {
                        console.log("user search has failed:", error['responseJSON']['error_message']);
                    });

            },

            renderSearchResults: function (usersList) {
                this.$searchResultsList = this.$('#tutoring-user-search-results');
                if (usersList.length > 0)
                {
                    this.$searchResultsList.empty();
                    _.each(usersList, this.renderSingleUserResult, this);
                }
                else
                {
                    this.$searchResultsList.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_NO_RESULT);
                }
            },

            renderSingleUserResult: function (userSON) {
                var user = new User({data: userSON}, {parse: true});
                var userSearchResultLineView = new UserSearchResultLineView({model: user});
                userSearchResultLineView.render();
                this.addSearchedUserListeners(userSearchResultLineView);
                this.$searchResultsList.append(userSearchResultLineView.$el);
            },

            addSearchedUserListeners: function (userSearchResultLineView) {
                this.listenTo(userSearchResultLineView, 'addTutor', this.addTutor);
                this.listenTo(userSearchResultLineView, 'cancelTutorRequest', this.cancelTutorRequest);
                this.listenTo(userSearchResultLineView, 'removeTutor', this.removeTutor);
                this.listenTo(userSearchResultLineView, 'addStudent', this.addStudent);
                this.listenTo(userSearchResultLineView, 'cancelStudentRequest', this.cancelStudentRequest);
                this.listenTo(userSearchResultLineView, 'removeStudent', this.removeStudent);
            },

            addTutor: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/request/tutor/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("add tutor request successful:", result.data);
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$el.find('form').submit();
                    })
                    .fail(function (error) {
                        console.log("add tutor request failed:", error['responseJSON']['error_message']);
                    });
            },

            cancelTutorRequest: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/cancel/tutor/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("cancel tutor request successful:", result.data);
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$el.find('form').submit();
                    })
                    .fail(function (error) {
                        console.log("cancel tutor request failed:", error['responseJSON']['error_message']);
                    });
            },

            removeTutor: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/remove/tutor/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("remove tutor request successful:", result.data);
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$el.find('form').submit();
                    })
                    .fail(function (error) {
                        console.log("remove tutor request failed:", error['responseJSON']['error_message']);
                    });
            },

            addStudent: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/request/student/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("add student request successful:", result.data);
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$el.find('form').submit();
                    })
                    .fail(function (error) {
                        console.log("add student request failed:", error['responseJSON']['error_message']);
                    });
            },

            cancelStudentRequest: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/cancel/student/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("cancel student request successful:", result.data);
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$el.find('form').submit();
                    })
                    .fail(function (error) {
                        console.log("cancel student request failed:", error['responseJSON']['error_message']);
                    });
            },

            removeStudent: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/remove/student/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                })
                    .done(function (result) {
                        console.log("remove student request successful:", result.data);
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$el.find('form').submit();
                    })
                    .fail(function (error) {
                        console.log("remove student request failed:", error['responseJSON']['error_message']);
                    });
            },

            selectStudent: function(e) {
                e.preventDefault();

                var $userLine = $(e.currentTarget);
                var selectedUserId = $userLine.attr('data-user-id');
                this.$el.find('#dropdown-student-menu > p').html($userLine.html());

                var dashboardUserModel = new DashboardModel({_id: selectedUserId});
                this.$el.find('.dashboard-details').remove();
                var self = this;
                dashboardUserModel.fetch().done(function(data){
                    var dashboardDetailsView = new DashboardDetailsView({model: dashboardUserModel});
                    self.$el.find('#tutoring-student-dashboard').append(dashboardDetailsView.render());
                });

            }

        });
    }
);
