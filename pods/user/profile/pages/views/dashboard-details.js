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

            tagName: 'div',

            className: 'row dashboard-details',

            template: _.template(dashboardDetailsTemplate),

            'events': {
                'click a.track': 'onTrackSelected'
            },

            currentTrackIndex: 0,

            render: function() {
                var html = this.template({config: Config});
                this.$el.html(html);

                var tracks = this.model.get('tracks');
                for (var i = 0; i < tracks.length; i++) {
                    this.renderTrack(tracks[i], i, (i >= tracks.length - 1));
                }
                this.renderTrackOutline(this.currentTrackIndex);

                return this.$el;
            },

            renderTrack: function(track, index, doRemoveBottomBorder) {
                var trackModel = new TrackModel({data: track}, {parse: true});
                var trackComputerItemView = new DashboardTrackComputerItemView({model: trackModel});
                trackComputerItemView.index = index;
                trackComputerItemView.render();
                if (doRemoveBottomBorder) {
                    trackComputerItemView.$el.find('.link_border_bottom').remove();
                }
                this.$el.find('#dashboard-tracks .computer_version').append(trackComputerItemView.$el);

                var trackTabletItemView = new DashboardTrackTabletItemView({model: trackModel, index: index});
                trackTabletItemView.index = index;
                trackTabletItemView.render();
                this.$el.find('#dashboard-tracks .tablet_version .navbar-nav').append(trackTabletItemView.$el);
            },

            renderTrackOutline: function (index) {
                var currentTrackNode = this.$el.find("a.track[index='" + this.currentTrackIndex + "']");
                currentTrackNode.removeClass('link_selected');
                this.$el.find("a.track[index='" + index + "']").addClass('link_selected');
                this.currentTrackIndex = index;
                var track = this.model.get('tracks')[index];
                var $dashboardTrackSkills = this.$el.find('#dashboard-track-skills');
                $dashboardTrackSkills.html('');
                for (var i = 0; i < track.skills.length; i++) {
                    var skill = track.skills[i];
                    var skillOutlineItemView = new DashboardSkillItemView({model: new SkillModel({data: skill}, {parse: true})});
                    skillOutlineItemView.render();
                    if (i >= track.skills.length - 1)
                    {
                        skillOutlineItemView.$el.find('.link_border_bottom').remove();
                    }
                    $dashboardTrackSkills.append(skillOutlineItemView.$el);
                }
            },

            onTrackSelected: function(e) {
                var $a = $(e.currentTarget);
                var index = parseInt($a.attr('index'));
                if (index != this.currentTrackIndex)
                {
                    // we will change the list of resources displayed, so we prevent the default behavior (i.e. open the track page)
                    e.preventDefault();
                    this.renderTrackOutline(index);
                }
                else
                {
                    // we do not prevent default behavior => it will open the selected track
                }
            }

        });

    }
);
