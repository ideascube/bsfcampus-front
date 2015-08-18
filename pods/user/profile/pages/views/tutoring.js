define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'pods/user/models/current',
        'pods/user/models/user',
        'pods/analytics/models/visitedDashboard',
        'pods/user/models/dashboard',

        'pods/user/profile/pages/views/tutoring-user-search-result-line',
        'pods/user/profile/pages/views/tutoring-tutor-group-line',
        'pods/user/profile/pages/views/dashboard-details',

        'app/views/loadingBar',

        'text!pods/user/profile/pages/templates/tutoring.html',

        'less!pods/user/profile/pages/styles/tutoring',
        'less!pods/user/profile/pages/styles/dashboard'
    ],
    function ($, _, Backbone, VM, Config,
              currentUser, User, VisitedDashboardAnalyticsModel, DashboardModel,
              UserSearchResultLineView, TutorLineView, DashboardDetailsView,
              LoadingBarView,
              tutoringTemplate) {

        return Backbone.View.extend({

            id: 'user-profile-tutoring-container',

            className: 'panel panel-default',

            template: _.template(tutoringTemplate),

            events: {
                'submit form': 'searchUser',
                'click #tutors-list .btn-remove-tutor': 'removeTutorFromGroup',
                'change select#student-dashboard-selector': 'selectStudent'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$searchResultsList = this.$('#tutoring-user-search-results');
                this.$studentDashboardDetails = this.$('#student-dashboard-details');

                var tutors = currentUser.get('tutors');
                if (tutors.length == 0) {
                    this.$('#tutors-block').hide();
                } else {
                    _.each(tutors, this.addTutorToGroup, this);
                }

                var students = currentUser.get('students');
                if (students.length == 0) {
                    this.$('#students-block').hide();
                } else {
                    _.each(students, this.addStudentToDropdown, this);
                }

                return this;
            },

            addTutorToGroup: function (userSON) {
                var user = new User({data: userSON}, {parse: true});
                var tutorLineView = new TutorLineView({model: user});
                this.$('#tutors-list').append(tutorLineView.render().$el);
            },

            addStudentToDropdown: function (user) {
                var $studentOption = $('<option/>').val(user._id).html(user.full_name);
                this.$('#student-dashboard-selector').append($studentOption);
            },

            searchUser: function (e) {
                e.preventDefault();

                var loadingBarView = new LoadingBarView();
                loadingBarView.containerClassName = 'col-sm-6 col-center';
                this.$searchResultsList.html(loadingBarView.render().$el);

                var $form = $(e.currentTarget);
                var searchedUsername = $form.find('#user-search').val();

                var self = this;
                var endpointUrl = Config.constants.serverGateway + "/search/user";
                $.ajax({
                    type: 'GET',
                    url: endpointUrl,
                    data: {username: searchedUsername},
                    dataType: 'json'
                }).done(function (result) {
                    self.renderSearchResults(result.data);
                }).fail(function (error) {
                    console.log("user search has failed:", error['responseJSON']['error_message']);
                });

            },

            renderSearchResults: function (usersList) {
                if (usersList.length > 0) {
                    this.$searchResultsList.empty();
                    _.each(usersList, this.renderSingleUserResult, this);
                }
                else {
                    this.$searchResultsList.html(Config.stringsDict.USER.PROFILE.TUTORING.SEARCH_NO_RESULT);
                }
            },

            renderSingleUserResult: function (userSON) {
                var user = new User({data: userSON}, {parse: true});
                var userSearchResultLineView = new UserSearchResultLineView({model: user});
                this.$searchResultsList.append(userSearchResultLineView.render().$el);
                this.addSearchedUserListeners(userSearchResultLineView);
            },

            addSearchedUserListeners: function (userSearchResultLineView) {
                this.listenTo(userSearchResultLineView, 'addTutor', this.addTutor);
                this.listenTo(userSearchResultLineView, 'cancelTutorRequest', this.cancelTutorRequest);
                this.listenTo(userSearchResultLineView, 'removeTutor', this.removeTutor);
                this.listenTo(userSearchResultLineView, 'addStudent', this.addStudent);
                this.listenTo(userSearchResultLineView, 'cancelStudentRequest', this.cancelStudentRequest);
                this.listenTo(userSearchResultLineView, 'removeStudent', this.removeStudent);
            },

            removeTutorFromGroup: function (e) {
                e.preventDefault();
            },

            addTutor: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/request/tutor/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                }).done(function (result) {
                    // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                    self.$('form').submit();
                }).fail(function (error) {
                    console.log("add tutor request failed:", error['responseJSON']['error_message']);
                });
            },

            cancelTutorRequest: function (userId) {

                var r = confirm(Config.stringsDict.USER.PROFILE.TUTORING.CONFIRM_CANCEL_TUTOR);

                if (r) {
                    var endpointUrl = Config.constants.serverGateway + "/tutoring/cancel/tutor/" + userId;
                    var self = this;
                    $.ajax({
                        type: 'POST',
                        url: endpointUrl,
                        dataType: 'json'
                    }).done(function (result) {
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$('form').submit();
                    }).fail(function (error) {
                        console.log("cancel tutor request failed:", error['responseJSON']['error_message']);
                    });
                }
            },

            removeTutor: function (userId) {

                var r = confirm(Config.stringsDict.USER.PROFILE.TUTORING.CONFIRM_REMOVE_TUTOR);

                if (r) {
                    var endpointUrl = Config.constants.serverGateway + "/tutoring/remove/tutor/" + userId;
                    var self = this;
                    $.ajax({
                        type: 'POST',
                        url: endpointUrl,
                        dataType: 'json'
                    }).done(function (result) {
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$('form').submit();
                    }).fail(function (error) {
                        console.log("remove tutor request failed:", error['responseJSON']['error_message']);
                    });
                }
            },

            addStudent: function (userId) {
                var endpointUrl = Config.constants.serverGateway + "/tutoring/request/student/" + userId;

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: endpointUrl,
                    dataType: 'json'
                }).done(function (result) {
                    // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                    self.$('form').submit();
                }).fail(function (error) {
                    console.log("add student request failed:", error['responseJSON']['error_message']);
                });
            },

            cancelStudentRequest: function (userId) {
                var r = confirm(Config.stringsDict.USER.PROFILE.TUTORING.CONFIRM_CANCEL_STUDENT);

                if (r) {
                    var endpointUrl = Config.constants.serverGateway + "/tutoring/cancel/student/" + userId;
                    var self = this;
                    $.ajax({
                        type: 'POST',
                        url: endpointUrl,
                        dataType: 'json'
                    }).done(function (result) {
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$('form').submit();
                    }).fail(function (error) {
                        console.log("cancel student request failed:", error['responseJSON']['error_message']);
                    });
                }
            },

            removeStudent: function (userId) {
                var r = confirm(Config.stringsDict.USER.PROFILE.TUTORING.CONFIRM_REMOVE_STUDENT);

                if (r) {
                    var endpointUrl = Config.constants.serverGateway + "/tutoring/remove/student/" + userId;

                    var self = this;
                    $.ajax({
                        type: 'POST',
                        url: endpointUrl,
                        dataType: 'json'
                    }).done(function (result) {
                        // FIXME: this solution isn't optimized at all, we should get the user new data in the result and update the line
                        self.$('form').submit();
                    }).fail(function (error) {
                        console.log("remove student request failed:", error['responseJSON']['error_message']);
                    });
                }
            },

            selectStudent: function (e) {
                e.preventDefault();

                var loadingBarView = new LoadingBarView();
                loadingBarView.containerClassName = 'col-sm-6 col-center';
                this.$studentDashboardDetails.html(loadingBarView.render().$el);

                var selectedUserId = $(e.currentTarget).val();

                if (selectedUserId != null) {
                    var dashboardUserModel = new DashboardModel({_id: selectedUserId});
                    var self = this;
                    dashboardUserModel.fetch().done(function (data) {
                        var dashboardDetailsView = VM.createView(Config.constants.VIEWS_ID.DASHBOARD_DETAILS, function() {
                            return new DashboardDetailsView({model: dashboardUserModel});
                        });
                        self.$studentDashboardDetails.html(dashboardDetailsView.render().$el);

                        var analytics = new VisitedDashboardAnalyticsModel();
                        analytics.set('dashboard_user', selectedUserId);
                        analytics.save();
                    });
                }

            }

        });
    }
);
