define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/profile/pages/views/dashboard-details',

        'text!pods/user/profile/pages/templates/dashboard.html',

        'less!pods/user/profile/pages/styles/dashboard'
    ],
    function($, _, Backbone, $serialize, Config,
             DashboardDetailsView,
             dashboardTemplate
    ) {

        return Backbone.View.extend({

            id: 'user-profile-dashboard-container',

            className: 'panel panel-default',

            template: _.template(dashboardTemplate),

            currentTrackIndex: 0,

            render: function() {
                var html = this.template({config: Config});
                this.$el.html(html);

                var self = this;
                this.model.fetch().done(function(data){
                    var dashboardDetailsView = new DashboardDetailsView({
                        model: self.model,
                        el: self.$('#dashboard-details')
                    });
                    dashboardDetailsView.render();
                });

                return this;
            }

        });

    }
);
