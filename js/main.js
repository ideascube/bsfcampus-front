var AppRouter = Backbone.Router.extend({

    routes: {
        "tracks"            : "tracks",
        "tracks/:track_id"  : "tracks"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('#header').html(this.headerView.el);
    },

	tracks: function(track_id) {
        // var p = page ? parseInt(page, 10) : 1;
        // var wineList = new WineCollection();
        // wineList.fetch({success: function(){
        //     $("#content").html(new WineListView({model: wineList, page: p}).el);
        // }});
        // this.headerView.selectMenuItem('home-menu');
    }

});

utils.loadTemplate(['HeaderView'], function() {
    app = new AppRouter();
    // Backbone.history.start(); // Not used so far, but keep it to remember to use it
});