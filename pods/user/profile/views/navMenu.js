/**
 * Created by Fred on 24/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/templates/nav-menu.html',

        'less!pods/user/profile/styles/nav-menu'

    ],
    function($, _, Backbone, Config,
             currentUser, userProfileNavTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            className: 'row',

            id: "user-profile-menu",

            'events': {
                'click button': 'onNavButtonSelected'
            },

            template: _.template(userProfileNavTemplate),

            currentSelectionId: null,

            render: function() {
                var html = this.template({user: currentUser.forTemplate(), config: Config});
                this.$el.html(html);

                return this;
            },

            changeSelectedPage: function (newSelectionId) {
                this.$el.find('#'+this.currentSelectionId).removeClass('selected');
                this.$el.find('#'+newSelectionId).addClass('selected');
                this.currentSelectionId = newSelectionId;
                this.trigger('onRenderNavContentPage', newSelectionId);
            },

            onNavButtonSelected: function(e) {
                var $button = $(e.currentTarget);
                var newSelectionId = $button.attr('id');
                if (newSelectionId != this.currentSelectionId)
                {
                    this.changeSelectedPage(newSelectionId);
                }
            }

        });

    }
);
