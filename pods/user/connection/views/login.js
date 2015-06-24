define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',

        'text!pods/user/connection/templates/login.html',
        'text!pods/user/connection/templates/error-login.html',

        'less!pods/user/connection/styles/login'
    ],
    function($, _, Backbone, $serialize, Config,
             currentUser,
             loginTemplate, errorLoginTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(loginTemplate),

            errorTemplate: _.template(errorLoginTemplate),

            events: {
                'click .btn-submit': 'submit'
            },

            render: function () {
                var self = this;
                $.ajax({
                    type: 'GET',
                    url: Config.constants.serverGateway + "/login"
                }).done(function(result){
                    console.log("get login done", result);
                    var $result = $(result);
                    var csrf_token = $result.attr('value');
                    var html = self.template({ config: Config, csrf_token: csrf_token });
                    self.$el.html(html);
                    console.log(self.$el.html());
                }).fail(function(error){
                    console.log("Could not get login token", error);
                    var html = self.errorTemplate({ config: Config });
                    self.$el.html(html);
                });

                return this;
            },

            traceUser: function (currentUser) {
                console.log(currentUser.forTemplate());
            },

            submit: function () {
                console.log("submit");
                var self = this;
                var formData = this.$el.find('form').serializeJSON();
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/login",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    console.log(JSON.stringify(result));
                    currentUser.fetch().done(function (userResponse) {
                        console.log(JSON.stringify(userResponse));
                    });
                    self.trigger('close');
                }).fail(function(error){
                    console.log("Could not submit login data", error);
                    // TODO: implement case where login is false
                });
            }
        });
    }
);
