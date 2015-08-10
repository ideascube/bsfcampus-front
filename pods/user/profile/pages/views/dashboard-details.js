define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/track/model',
        'pods/skill/model',

        'pods/user/profile/pages/views/dashboard-track-computer',
        'pods/user/profile/pages/views/dashboard-track-tablet',
        'pods/user/profile/pages/views/dashboard-skill',

        'text!pods/user/profile/pages/templates/dashboard-details.html'
    ],
    function($, _, Backbone, $serialize, Config,
             TrackModel, SkillModel,
             DashboardTrackComputerItemView, DashboardTrackTabletItemView, DashboardSkillItemView,
             dashboardDetailsTemplate
    ) {

        return Backbone.View.extend({

            template: _.template(dashboardDetailsTemplate),

            'events': {
                'click .track': 'onTrackSelected'
            },

            currentTrack: null,

            render: function() {
                var html = this.template({config: Config});
                this.$el.html(html);

                var tracks = this.model.get('tracks');
                _.each(tracks, function(track) {
                    this.renderTrack(track);
                }, this);

                this.currentTrack = tracks[0]._id;

                this.renderTrackOutline(this.currentTrack);

                return this;
            },

            renderTrack: function(track) {
                var trackModel = new TrackModel({data: track}, {parse: true});

                var trackComputerItemView = new DashboardTrackComputerItemView({model: trackModel});
                trackComputerItemView.render();
                this.$('#dashboard-tracks-md-lg-list').append(trackComputerItemView.$el);

                var trackTabletItemView = new DashboardTrackTabletItemView({model: trackModel});
                trackTabletItemView.render();
                this.$('#dashboard-tracks-xs-sm-list').append(trackTabletItemView.$el);
            },

            renderTrackOutline: function (track) {
                this.$(".track").removeClass('active');
                this.$(".track[data-track='" + track + "']").addClass('active');
                this.currentTrack = track;

                var trackModel = _.find(this.model.get('tracks'), function(trackFromList) {
                    return trackFromList._id == track;
                });

                var $dashboardTrackSkills = this.$('#dashboard-track-skills');
                $dashboardTrackSkills.empty();
                _.each(trackModel.skills, function(skill) {
                    var skillOutlineItemView = new DashboardSkillItemView({
                        model: new SkillModel({data: skill}, {parse: true})
                    });
                    skillOutlineItemView.render();
                    $dashboardTrackSkills.append(skillOutlineItemView.$el);
                });
            },

            onTrackSelected: function(e) {
                var newTrack = $(e.currentTarget).data('track');
                if (newTrack != this.currentTrack)
                {
                    e.preventDefault();
                    this.renderTrackOutline(newTrack);
                }
                else
                {
                    // we do not prevent default behavior => it will open the selected track
                }
            }

        });

    }
);
