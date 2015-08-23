define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'app/views/loadingBar'
    ],
    function ($, _, Backbone, Config,
              LoadingBarView) {

        return Backbone.View.extend({

            initialize: function () {
                if (this.model) {
                    this.source = this.model;
                } else if (this.collection) {
                    this.source = this.collection;
                }
                this.startListeners();
            },

            startListeners: function () {
                if (this.model) {
                    this.listenTo(this.model, 'change', this.render);
                } else if (this.collection) {
                    this.listenTo(this.collection, 'update', this.render);
                }
            },

            render: function () {
                var self = this;

                if (!this.source.minimumFilled) {
                    this.renderLoadingBar();
                    this.source.fetchIfNeeded().done(function () {
                        self.tryRenderMinimum();
                        self.tryRenderFetched();
                    });
                } else if (!this.source.fetched) {
                    this.renderMinimumOrLoadingBar();
                    if (typeof this.renderFetched === "function") {
                        this.source.fetchIfNeeded().done(function () {
                            self.tryRenderFetched();
                        });
                    }
                } else {
                    this.tryRenderMinimum();
                    this.tryRenderFetched();
                }

                return this;
            },

            renderLoadingBar: function () {
                var loadingBarView = new LoadingBarView(_.result(this, 'loadingBarOptions'));
                this.$el.html(loadingBarView.render().$el);
            },

            tryRenderMinimum: function () {
                if (typeof this.renderMinimum === "function") {
                    return this.renderMinimum();
                }
                return this;
            },

            renderMinimumOrLoadingBar: function () {
                if (typeof this.renderMinimum === "function") {
                    this.renderMinimum();
                } else {
                    this.renderLoadingBar();
                }
            },


            tryRenderFetched: function () {
                if (typeof this.renderFetched === "function") {
                    return this.renderFetched();
                }
                return this;
            }

        });

    }
);
