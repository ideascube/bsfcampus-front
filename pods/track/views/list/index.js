define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/track/views/list/trackListItem',
        'text!pods/track/templates/list.html',

        'app/views/loadingBar',

        'less!pods/track/styles/list'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              TrackListItemView, listTemplate) {

        return AbstractView.extend({

            className: 'row',
            id: 'track-list-container',

            template: _.template(listTemplate),

            loadingBarOptions: {
                'containerClassName': 'col-sm-6 col-center'
            },

            renderFetched: function () {
                var html = this.template();
                this.$el.html(html);
                this.$trackList = this.$('#track-list');

                this.collection.each(this.appendTrack, this);

                return this;
            },

            appendTrack: function (track) {
                var listItemView = new TrackListItemView({model: track});
                this.$trackList.append(listItemView.render().$el);
            }

        });

    }
);
