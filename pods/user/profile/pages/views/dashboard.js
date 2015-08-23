define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'pods/user/profile/pages/views/dashboard-details',

        'text!pods/user/profile/pages/templates/dashboard.html',

        'less!pods/user/profile/pages/styles/dashboard'
    ],
    function ($, _, Backbone, VM, Config,
              DashboardDetailsView,
              dashboardTemplate) {

        return Backbone.View.extend({

            className: 'panel panel-default',
            id: 'user-profile-dashboard-container',

            template: _.template(dashboardTemplate),

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$dashboardDetails = this.$('#dashboard-details');

                var self = this;
                var dashboardDetailsView = VM.createView(Config.constants.VIEWS_ID.DASHBOARD_DETAILS, function () {
                    return new DashboardDetailsView({model: self.model});
                });
                this.$dashboardDetails.html(dashboardDetailsView.render().$el);

                return this;
            }

        });

    }
);
