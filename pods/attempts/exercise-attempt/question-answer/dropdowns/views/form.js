define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/models/question',

		'text!pods/attempts/exercise-attempt/question-answer/dropdowns/templates/form.html',
		'text!pods/attempts/exercise-attempt/question-answer/dropdowns/templates/form-dropdown.html',

		'less!pods/attempts/exercise-attempt/question-answer/dropdowns/style.less'
	],
	function($, _, Backbone, Config,
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
				var html = this.template({question: this.model.questionModel().toJSON(true), config: Config});
				this.$el.html(html);

				if (this.model.questionModel().get('question_image_url') != null)
				{
					this.$('.question-image-media').html('<a href="' + this.model.questionModel().get('question_image_url') + '" target="_blank"><img src="' + this.model.questionModel().get('question_image_url') + '"></a>');
				}
				else
				{
					this.$('.question-image-media').hide();
				}

				var text = this.model.questionModel().get('text');
				var splittedText = text.split("[%%]");

				var dropdowns = this.model.questionModel().get('dropdowns');
				_.each(splittedText, function(fragment, index, fragments){
					this.$('.dropdowns-text').append(fragment);
					if (index < fragments.length - 1)
					{
						// We add the dropdown here
						var dropdown = dropdowns[index];
						var dropdownHTML = this.dropdownTemplate({
							dropdown: dropdown,
							index: index
						});
						this.$('.dropdowns-text').append(dropdownHTML);
						self = this;
						this.$(".dropdown-menu li a").click(function(e){
							e.preventDefault();
							self.onPropositionSelected($(this));
						});
					}
				}, this);

				return this;
			},

			onPropositionSelected: function($proposition) {
				var selText = $proposition.text();
				$dropdown = $proposition.parents('.dropdown');
				$dropdown.find('input').attr('value', $proposition.data('proposition-id'));
				$dropdown.find('.dropdown-toggle').html(selText+' <span class="caret"></span>').removeClass('unselected').addClass('selected');
				
				this.trigger('onDropdownSelected', $dropdown.data('dropdown-id'), $proposition.data('proposition-id'));
			}

		});
		
	}
);
