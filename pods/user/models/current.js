define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',

        'pods/analytics/models/misc'
    ],
    function($, _, Backbone, Config,
             AbstractModel,
             MiscAnalyticsModel) {

        var CurrentUserClass = AbstractModel.extend({

            jwt: null,
            username: null,

            serverPath: '/users',

            url: function() {
                return this.urlRoot() + '/current';
            },

            parse: function(response, options) {
                this.username = response.username;
                return AbstractModel.prototype.parse.call(this, response, options);
            },

            dashboardUrl: function() {
                return this.url() + "/dashboard";
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
                        self.username = username;
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

                this.jwt = null;
                this.username = null;
                if ('localStorage' in window && window['localStorage'] !== null) {
                    localStorage = window['localStorage'];
                    localStorage.removeItem('mookbsf_jwt');
                }
                this.clear();
            },

            isLoggedIn: function() {
                return (this.jwt !== null);
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
            },

            toJSON: function(forTemplate) {
                var json = AbstractModel.prototype.toJSON.call(this, forTemplate);
                if (forTemplate === true) {
                    json.username = this.username;
                }
                return json;
            }

        });

        return new CurrentUserClass;

    }
);
