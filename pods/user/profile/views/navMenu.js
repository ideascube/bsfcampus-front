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

            className: 'panel panel-default',

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
                this.$('#'+this.currentSelectionId).removeClass('active');
                this.$('#'+newSelectionId).addClass('active');
                this.currentSelectionId = newSelectionId;
                this.trigger('onRenderNavContentPage', newSelectionId);
            },

            onNavButtonSelected: function(e) {
                var $button = $(e.currentTarget);
                var newSelectionId = $button.attr('id');
                if (newSelectionId != this.currentSelectionId)
                {
                    this.changeSelectedPage(newSelectionId);
                    Backbone.history.navigate('user/profile/' + newSelectionId, {trigger: false});
                }
            }

        });

    }
);
