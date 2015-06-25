/**
 * Created by Fred on 10/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model'
    ],
    function($, _, Backbone, Config,
             AbstractModel
    ) {

        var CurrentUserClass = AbstractModel.extend({

            jsonKey: "user",

            jwt: null,

            urlRoot: function() {
                return Config.constants.serverGateway + '/users/current';
            },

            url: function() {
                return this.urlRoot();
            },

            dashboardUrl: function() {
                return this.urlRoot + "/dashboard";
            },

            logIn: function(username, password) {
                var self = this;
                var data = {
                    "username": username,
                    "password": password
                };
                return $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/auth",
                    data: JSON.stringify(data),
                    dataType: 'json'
                }).done(
                    function(result){
                        self.jwt = result.token;
                        self.fetch();
                    }
                );
            },

            logOut: function() {
                this.jwt = null;
                this.clear();
            },

            isLoggedIn: function() {
                return (this.jwt !== null);
            }

        });

        return new CurrentUserClass;

    }
);
