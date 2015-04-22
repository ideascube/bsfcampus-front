define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',

		'pods/exercise-attempt/question-answer/models/question',
	],
	function($, _, Backbone, Config,
		AbstractModel,
		ExerciseAttemptQuestionModel
		) {

		return AbstractModel.extend({
			
			jsonKey: "questionAnswer",

			currentQuestionModel: null,

			questionModel: function() {
				if (this.currentQuestionModel == null && this.get('question')) {
					this.currentQuestionModel = new ExerciseAttemptQuestionModel(this.get('question'));
				}
				return this.currentQuestionModel;
			},

			setDropdownSelection: function(dropdownId, propositionId) {
				if (this.currentQuestionModel != null)
				{
					selectedDropdown = _.find(this.currentQuestionModel.get('dropdowns'), function(dropdown) {
						return dropdown._id == dropdownId;
					});
					if (selectedDropdown != null)
					{
						selectedDropdown.givenAnswer = propositionId;
					}
				}
			},

			areAllDropdownsSelected: function() {
				result = false;
				if (this.currentQuestionModel != null)
				{
					nbDropdowns = this.currentQuestionModel.get('dropdowns').length;
					dropdowns = _.filter(this.currentQuestionModel.get('dropdowns'), function(dropdown) {
						return dropdown.givenAnswer != null;
					})
					if (dropdowns.length == nbDropdowns)
					{
						result = true;
					}
				}
				return result;
			}

		});

	}
);
