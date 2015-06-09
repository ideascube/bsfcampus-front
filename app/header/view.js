define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!app/header/template.html',
		'app/config'
	],
	function($, _, Backbone, template, Config) {

		return Backbone.View.extend({

			el: $('#header'),

			template: _.template(template),

            events: {
                'click #navbar-login-btn': 'login'
            },

			render: function() {
				this.$el.html(this.template({config: Config}));
			},

            login: function(e) {
                e.preventDefault();
                console.log('header -> login');
                Backbone.history.loadUrl("/login");
            }

		});
		
	}
);
