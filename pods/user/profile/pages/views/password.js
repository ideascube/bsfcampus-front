/**
 * Created by FredFourcade on 11/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/pages/templates/password.html',

        'less!pods/user/profile/pages/styles/password'
    ],
    function($, _, Backbone, $serialize, Config,
             currentUser, passwordTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'user-profile-container',

            template: _.template(passwordTemplate),

            events: {
                'click #save_modification': 'saveModifications'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                var userModel = this.model.forTemplate();
                var html = this.template({user: userModel, config: Config});
                this.$el.html(html);

                return this;
            },

            saveModifications: function() {
                console.log("save user profile modifications");
                var formData = this.$el.find('form').serializeJSON();
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/current",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    console.log(JSON.stringify(result));
                    currentUser.fetch().done(function (userResponse) {
                        console.log(JSON.stringify(userResponse));
                    });
                }).fail(function(error){
                    console.log("Could not post user modifications", error);
                    // TODO: implement case where modifications are not saved
                });
            }

        });

    }
);
