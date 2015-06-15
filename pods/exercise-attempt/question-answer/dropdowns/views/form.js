define(
	[
		'jquery',
		'underscore',
		'backbone',
		'form2js',
		'app/config',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/models/question',

		'text!pods/exercise-attempt/question-answer/dropdowns/templates/form.html',
		'text!pods/exercise-attempt/question-answer/dropdowns/templates/form-dropdown.html',

		'less!pods/exercise-attempt/question-answer/dropdowns/style.less'
	],
	function($, _, Backbone, form2js, Config,
		QuestionAnswerModel, QuestionModel,
		formTemplate, formDropdownTemplate
		) {

		return Backbone.View.extend({

			model: QuestionAnswerModel,

			tagName: 'div',

			id: 'dropdowns',

			template: _.template(formTemplate),
			dropdownTemplate: _.template(formDropdownTemplate),
			
			render: function() {
				var html = this.template({question: this.model.questionModel().forTemplate(), config: Config});
				this.$el.html(html);

				if (this.model.questionModel().get('question_image_url') != null)
				{
					this.$el.find('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
				}
				else
				{
					this.$el.find('.question-image-media').hide();
				}

				var text = this.model.questionModel().get('text');
				var splittedText = text.split("[%%]");

				var dropdowns = this.model.questionModel().get('dropdowns');
				dropdownHtmlText = '';
				for (var i=0; i < splittedText.length; i++)
				{
					this.$el.find('.dropdowns-text').append(splittedText[i]);
					if (i < splittedText.length-1)
					{
						// We add the dropdown here
						dropdown = dropdowns[i];
						console.log('dropdown' + JSON.stringify(dropdown));
						var html = this.dropdownTemplate({dropdown: dropdown, index: i});
						this.$el.find('.dropdowns-text').append(html);
						self = this;
						this.$el.find(".dropdown-menu li a").click(function(e){
                            e.preventDefault();
							self.onPropositionSelected($(this));
						});
					}
				}

				return this;
			},

			onPropositionSelected: function($proposition) {
				var selText = $proposition.text();
				$dropdown = $proposition.parents('.dropdown');
				$dropdown.find('input').attr('value', $proposition.attr('proposition-id'));
				$dropdown.find('.dropdown-toggle').html(selText+' <span class="caret"></span>').removeClass('unselected').addClass('selected');
				
				this.trigger('onDropdownSelected', $dropdown.attr('dropdown-id'), $proposition.attr('proposition-id'));
			},

			serializeForm: function () {
				return {form_data: JSON.stringify(form2js('question-form', '.'))};
			}

		});
		
	}
);
