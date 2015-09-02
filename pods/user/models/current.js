define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/user',

        'pods/analytics/models/misc'
    ],
    function($, _, Backbone, Config,
             UserModel,
             MiscAnalyticsModel) {

        var CurrentUserModel = UserModel.extend({

            jwt: null,

            clear: function(){
                this.jwt = null;
                if ('localStorage' in window && window['localStorage'] != null) {
                    localStorage = window['localStorage'];
                    localStorage.removeItem('mookbsf_jwt');
                }
                this.trigger("clear");
                UserModel.prototype.clear.apply(this, arguments);

                // TODO: delete data from previous current user
            },

            url: function() {
                return this.urlRoot() + '/current';
            },

            parse: function(response, options) {
                this.set('username', response.username);
                return UserModel.prototype.parse.call(this, response, options);
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
                        self.set('username', username);
                        if ('localStorage' in window && window['localStorage'] !== null) {
                            localStorage = window['localStorage'];
                            localStorage['mookbsf_jwt'] = self.jwt;
                        }
                        self.fetch();
                    }
                );
            },

            logOut: function() {
                var logoutAnalytics = new MiscAnalyticsModel();
                logoutAnalytics.set('type', 'user_logout');
                logoutAnalytics.set('object_title', this.username);
                logoutAnalytics.save();

                this.clear();
            },

            isLoggedIn: function() {
                return !!this.jwt;
            },

            findSession: function() {
                if ('localStorage' in window && window['localStorage'] !== null) {
                    localStorage = window['localStorage'];
                    var storedToken = localStorage.getItem('mookbsf_jwt');
                    if (storedToken === null) {
                        return false;
                    } else {
                        this.jwt = storedToken;
                        return true;
                    }
                } else {
                    return false;
                }
            }

        });

        return new CurrentUserModel();

    }
);
