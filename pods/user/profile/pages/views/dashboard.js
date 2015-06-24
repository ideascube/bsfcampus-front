/**
 * Created by Fred on 24/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',
        'pods/user/models/dashboard',
        'pods/track/model',
        'pods/skill/model',

        'pods/user/profile/pages/views/dashboard-track-computer',
        'pods/user/profile/pages/views/dashboard-track-tablet',
        'pods/user/profile/pages/views/dashboard-skill',

        'text!pods/user/profile/pages/templates/dashboard.html',

        'less!pods/user/profile/pages/styles/dashboard'
    ],
    function($, _, Backbone, $serialize, Config,
             currentUser, DashboardModel, TrackModel, SkillModel,
             DashboardTrackComputerItemView, DashboardTrackTabletItemView, DashboardSkillItemView,
             dashboardTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'user-profile-dashboard-container',

            template: _.template(dashboardTemplate),

            currentTrackIdx: 0,

            render: function() {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.model = new DashboardModel({_id: currentUser.id});
                var self = this;
                this.model.fetch().done(function(data){
                    _.each(self.model.tracks, self.renderTrack, self);

                    self.renderTrackOutline(self.currentTrackIdx);
                });

                return this;
            },

            renderTrack: function(track) {
                var trackComputerItemView = new DashboardTrackComputerItemView({model: new TrackModel(track, {parse: true})});
                trackComputerItemView.render();
                this.$el.find('#dashboard-tracks .computer_version').append(trackComputerItemView.$el);
                var trackTabletItemView = new DashboardTrackTabletItemView({model: new TrackModel(track, {parse: true})});
                trackTabletItemView.render();
                this.$el.find('#dashboard-tracks .tablet_version .navbar-nav').append(trackTabletItemView.$el);
            },

            renderTrackOutline: function (idx) {
                var track = this.model.get('tracks')[idx];
                var self = this;
                _.each(track.skills, function(skill) {
                    var skillOutlineItemView = new DashboardSkillItemView({model: new SkillModel({skill: skill}, {parse: true})});
                    skillOutlineItemView.render();
                    self.$el.find('#dashboard-track-skills').append(skillOutlineItemView.$el);
                });
            }

        });

    }
);
