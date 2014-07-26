<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes() ?>><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" <?php language_attributes() ?>><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" <?php language_attributes() ?>><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" <?php language_attributes() ?>><!--<![endif]-->
    <head>
        <meta charset="<?php bloginfo( 'charset' ) ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <title><?php wp_title( '|', true, 'right' ) ?></title>
		<meta name="author" content="">
		<link rel="author" href="">
		<?php wp_head() ?>
    </head>
    <?php $args = array( 'post_type' => 'posts', 'posts_per_page' => -1 );
        //$loop = new WP_Query( $args );
        $posts = get_posts();
        $about_page = get_page_by_title('About');
        ?>
    <script type="text/javascript">
        var AppData = {};
        AppData.aboutPage = <?php echo json_encode($about_page);?>;
        AppData.projects = <?php echo json_encode($posts);?>;

    </script>
    <body <?php body_class() ?>>
