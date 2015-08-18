define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'viewmanager',
        'app/config',

        'pods/user/profile/pages/views/dashboard-details',

        'app/views/loadingBar',

        'text!pods/user/profile/pages/templates/dashboard.html',

        'less!pods/user/profile/pages/styles/dashboard'
    ],
    function ($, _, Backbone, $serialize, VM, Config,
              DashboardDetailsView,
              LoadingBarView,
              dashboardTemplate) {

        return Backbone.View.extend({

            id: 'user-profile-dashboard-container',

            className: 'panel panel-default',

            template: _.template(dashboardTemplate),

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$dashboardDetails = this.$('#dashboard-details');

                this.renderLoadingBar();

                var self = this;
                this.model.fetch().done(function (data) {
                    var dashboardDetailsView = VM.createView(Config.constants.VIEWS_ID.DASHBOARD_DETAILS, function () {
                        return new DashboardDetailsView({model: self.model});
                    });
                    self.$dashboardDetails.html(dashboardDetailsView.render().$el);
                });

                return this;
            },

            renderLoadingBar: function() {
                var loadingBarView = new LoadingBarView();
                loadingBarView.containerClassName = 'col-sm-6 col-center';
                this.$dashboardDetails.html(loadingBarView.render().$el);
            }

        });

    }
);
