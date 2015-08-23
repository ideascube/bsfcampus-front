define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/track/model',
        'text!pods/track/templates/list-item.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              TrackModel, listItemTemplate) {

        return AbstractView.extend({

            className: 'col-sm-6',

            template: _.template(listItemTemplate),

            renderMinimum: function () {
                var html = this.template({
                    track: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                this.$thumbnail = this.$('.track-thumbnail');
                this.$thumbnailHeading = this.$thumbnail.find('.panel-heading');
                this.$progress = this.$('.track-progress');
                this.$btnStart = this.$('.btn-start');

                return this;
            },

            renderFetched: function () {
                this.renderProgress();

                return this;
            },

            renderProgress: function () {
                var progress = this.model.get('progress');

                this.$progress.html(
                    progress.current.toString()
                    + "/" + progress.max.toString()
                    + " " + Config.stringsDict.SKILLS_ACQUIRED
                );

                if (this.model.isValidated()) {
                    this.$thumbnail.addClass('track-validated panel-info');
                    this.$thumbnailHeading.addClass('golden-effect');
                    this.$btnStart
                        .removeClass('btn-bordered')
                        .addClass('btn-info golden-effect')
                        .html(Config.stringsDict.TRACK_VALIDATED);
                }
                else if (this.model.isStarted()) {
                    this.$thumbnail.addClass('track-started panel-primary');
                    this.$btnStart
                        .removeClass('btn-bordered')
                        .addClass('btn-primary')
                        .html(Config.stringsDict.RESUME_TRACK);
                }

                return this;
            }

        });

    }
);
