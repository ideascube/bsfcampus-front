define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',
        'collection',

        'pods/user/models/coursesInfo'
    ],
    function ($, _, Backbone, Config,
              AbstractModel, AbstractCollection,
              UserCoursesInfoModel) {

        var UserModel = AbstractModel.extend({

            serverPath: '/users',

            fetchedDashboard: null,

            parse: function(response, options) {
                var coursesInfo = response.courses_info;
                var username = response.username;

                response = AbstractModel.prototype.parse.call(this, response, options);

                var tutoringFields = [
                    'tutors',
                    'students',
                    'awaiting_tutor_requests',
                    'awaiting_student_requests',
                    'pending_tutors',
                    'pending_students',
                    'not_acknowledged_tutors',
                    'not_acknowledged_students'
                ];
                _.each(tutoringFields, function(field){
                    if (response[field]) {
                        response[field] = new AbstractCollection(response[field], {model: UserModel});
                    }
                }, this);

                if (coursesInfo) {
                    response.courses_info = new UserCoursesInfoModel({data: coursesInfo}, {parse: true});
                }
                if (username) {
                    response.username = username;
                }

                return response;
            },

            dashboardUrl: function() {
                return this.url() + "/dashboard";
            },

            fetchDashboard: function(options) {
                options || (options = {});
                options.url = _.result(this, 'dashboardUrl');
                options.dashboard = true;
                var success = options.success;
                options.success = function(model, response, xhrOptions) {
                    model.markFetched(null, xhrOptions);
                    model.fetchedDashboard = _.now();
                    if (success) success.call(this, model, response, xhrOptions);
                };
                return Backbone.Model.prototype.fetch.call(this, options);
            }

        });

        return UserModel;

    }
);
