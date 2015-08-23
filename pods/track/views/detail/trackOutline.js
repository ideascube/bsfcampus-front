define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/track/views/detail/trackOutlineItem',
        'text!pods/track/templates/track-outline.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              TrackOutlineItemView,
              trackOutlineTemplate) {

        return AbstractView.extend({

            renderFetched: function(){
                this.$el.html(trackOutlineTemplate);
                this.$list = this.$('.media-list');
                this.collection.each(this.appendSkill, this);

                return this;
            },

            appendSkill: function (skill) {
                var trackOutlineItemView = new TrackOutlineItemView({model: skill});
                this.$list.append(trackOutlineItemView.render().$el);
            }

        });

    }
);
