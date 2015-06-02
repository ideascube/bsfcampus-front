define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/user/templates/login.html',
        'text!pods/user/templates/error-login.html'
    ],
    function($, _, Backbone, Config,
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
                    var html = self.template({ config: Config, form: result });
                    self.$el.html(html);
                }).fail(function(error){
                    console.log("Could not get login token", error);
                    var html = this.errorTemplate({ config: Config });
                    self.$el.html(html);
                });

                return this;
            },

            submit: function () {
                console.log("submit");
                var self = this;
                var formData = this.$el.find('form').serialize();
                $.ajax({
                    type: 'POST',
                    url: Config.constants.serverGateway + "/login",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    self.trigger('close');
                }).fail(function(error){
                    console.log("Could not submit login data", error);
                });
            }
        });
    }
);
