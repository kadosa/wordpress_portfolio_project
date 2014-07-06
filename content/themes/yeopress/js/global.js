require.config({
	"baseUrl": "content/themes/yeopress/js",
	"paths": {
		"jquery": "vendor/jquery/jquery",
        "backbone": "vendor/backbone/backbone"
	}
});

require(['jquery', 'backbone'], function($, Backbone) {
	console.log('Working!!');
    console.log(Backbone);
});
