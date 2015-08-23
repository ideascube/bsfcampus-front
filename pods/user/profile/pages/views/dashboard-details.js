define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'tracksCollection',

        'pods/track/model',
        'pods/skill/model',

        'pods/user/profile/pages/views/dashboard-track',
        'pods/user/profile/pages/views/dashboard-skill',

        'text!pods/user/profile/pages/templates/dashboard-details.html'
    ],
    function ($, _, Backbone, $serialize, Config,
              tracksCollection,
              TrackModel, SkillModel,
              DashboardTrackItemView, DashboardSkillItemView,
              dashboardDetailsTemplate) {

        return Backbone.View.extend({

            template: _.template(dashboardDetailsTemplate),

            'events': {
                'click .track': 'onTrackSelected'
            },

            currentTrack: null,

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$dashboardTracksComputer = this.$('#dashboard-tracks-md-lg-list');
                this.$dashboardTracksTablet = this.$('#dashboard-tracks-xs-sm-list');
                this.$dashboardTrackSkills = this.$('#dashboard-track-skills');

                //$.when([
                //    tracksCollection.fetchIfNeeded(),
                //    this.model.fetchDashboard()
                //]).done(
                //    $.proxy(this.renderFetched, this)
                //);

                var self = this;
                this.model.fetchDashboard().done(function(){
                    tracksCollection.fetchIfNeeded().done(function(){
                        self.renderFetched();
                    });
                });

                return this;
            },

            renderFetched: function() {
                tracksCollection.each(this.renderTrack, this); // FIXME use a dedicated view instead

                this.selectTrack(this.currentTrack || tracksCollection.at(0));

                return this;
            },

            renderTrack: function (track) {
                var trackComputerItemView = new DashboardTrackItemView({model: this.model, track: track, size: 'md-up'});
                this.$dashboardTracksComputer.append(trackComputerItemView.render().$el);

                var trackTabletItemView = new DashboardTrackItemView({model: this.model, track: track, size: 'sm-down'});
                this.$dashboardTracksTablet.append(trackTabletItemView.render().$el);
            },

            onTrackSelected: function (e) {
                var trackId = $(e.currentTarget).data('track');
                var track = tracksCollection.get(trackId);
                if (track != this.currentTrack) {
                    e.preventDefault();
                    this.selectTrack(track);
                }
                else {
                    // we do not prevent default behavior => it will open the selected track
                }
            },

            selectTrack: function(track) {
                this.currentTrack = track;
                this.$(".track").removeClass('active');
                this.$(".track[data-track='" + track.id + "']").addClass('active');
                this.renderCurrentTrackOutline();
            },

            renderCurrentTrackOutline: function () {
                // FIXME use a dedicated view instead
                this.$dashboardTrackSkills.empty();
                var skills = this.currentTrack.get('skills');
                var self = this;
                skills.fetchIfNeeded().done(function(){
                    skills.each(function (skill) {
                        var skillOutlineItemView = new DashboardSkillItemView({
                            model: this.model,
                            skill: skill
                        });
                        self.$dashboardTrackSkills.append(skillOutlineItemView.render().$el);
                    }, self);
                });
            }

        });

    }
);
