define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/search/templates/search.html',
        'text!pods/search/templates/search-result.html',

        'less!pods/search/style'
    ],
    function($, _, Backbone, Config,
             searchTemplate, searchResultTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'search-results-container',

            template: _.template(searchTemplate),
            resultTemplate: _.template(searchResultTemplate),

            render: function() {
                $("body").removeAttr("style");
                this.$el.html(this.template({searchedString: this.searchedString, config: Config}));
                this.$el.find('#search-results').html('');
                _.each(this.results, this.renderResult, this);

                return this.$el;
            },

            renderResult: function(result) {
                var $result = $(this.resultTemplate({result: result, config: Config}));
                var document = result['document'];
                var breadcrumbArray = document['breadcrumb'];
                var $breadcrumb = $result.find('ol.breadcrumb');
                for (var i = 0; i < breadcrumbArray.length-1; i++)
                {
                    $breadcrumb.append('<li>' + breadcrumbArray[i].title + '</li>');
                }
                $breadcrumb.append('<li class="active">' + breadcrumbArray[i].title + '</li>');
                this.$el.find('#search-results').append($result);
                console.log(this.$el.html());
            }

        });

    }
);
