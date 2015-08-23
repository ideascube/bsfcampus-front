define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'text!pods/track/templates/track-outline-item.html',
        'text!pods/track/templates/track-outline-item-progress.html',
        'text!pods/skill/templates/validation-badge.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              trackOutlineItemTemplate, trackOutlineItemProgressTemplate, badgeTemplate) {

        return AbstractView.extend({

            className: 'skill media',
            tagName: 'a',
            attributes: function () {
                return {
                    'href': this.model.route()
                }
            },

            template: _.template(trackOutlineItemTemplate),
            progressTemplate: _.template(trackOutlineItemProgressTemplate),

            renderMinimum: function () {
                var html = this.template({
                    skill: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                this.$skillTitle = this.$('.skill-title');
                this.$progress = this.$('.skill-progress');

                return this;
            },

            renderFetched: function(){
                this.renderProgress();

                return this;
            },

            renderProgress: function () {
                var progress = this.model.get('progress');
                var progressPercents = Math.round(100 * progress.current / progress.max);

                var html = this.progressTemplate({
                    skill: this.model.toJSON(true),
                    progress_percents: progressPercents,
                    config: Config
                });
                this.$progress.html(html);
                this.$progressBar = this.$progress.find('.progress-bar');

                if (this.model.isValidated()) {
                    this.$el.addClass('skill-validated');
                    this.$skillTitle.append(badgeTemplate);
                    this.$progressBar.removeClass('progress-bar-success').addClass('progress-bar-info golden-effect');
                }

                return this;
            }

        });

    }
);
