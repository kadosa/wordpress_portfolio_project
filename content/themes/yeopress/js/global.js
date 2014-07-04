require.config({
	"baseUrl": "content/themes/yeopress/js",
	"paths": {
		"jquery": "vendor/jquery/jquery"
	}
});

require(['jquery'], function($) {
	console.log('Working!!');
});
