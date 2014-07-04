<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
 
// Include local configuration
if (file_exists(dirname(__FILE__) . '/local-config.php')) {
	include(dirname(__FILE__) . '/local-config.php');
}

// Global DB config
if (!defined('DB_NAME')) {
	define('DB_NAME', 'giles');
}
if (!defined('DB_USER')) {
	define('DB_USER', 'root');
}
if (!defined('DB_PASSWORD')) {
	define('DB_PASSWORD', 'ujjelszo88');
}
if (!defined('DB_HOST')) {
	define('DB_HOST', 'localhost');
}

/** Database Charset to use in creating database tables. */
if (!defined('DB_CHARSET')) {
	define('DB_CHARSET', 'utf8');
}

/** The Database Collate type. Don't change this if in doubt. */
if (!defined('DB_COLLATE')) {
	define('DB_COLLATE', '');
}

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'V>8xMV!_E[YGqi|nGOA8)9N-`uae?3nqYbE@+Wa`VP&lVi4;>wxk%!?X]Nh>//FX');
define('SECURE_AUTH_KEY',  'W+0Zv)07.Mp^2~2mO=<Q+)?oJc8[_Nj146P<p4nf0py3waUE{|il|9V}7Ac)QB5c');
define('LOGGED_IN_KEY',    'fQ7p,^g|spWWnH2$<>/ZwP{#X[/#Tvhc:_::7&xOY/Sl9aT?|09A~p5Q^{7VUVAn');
define('NONCE_KEY',        '|9%4:|Nz]DU9u.$m:_*hi`o8dTc|kHp&nok{  tCxcSXp@{{-!h8~%fvl-tcJkS[');
define('AUTH_SALT',        '7|EhHVJ(zy1<R@[FMG1 a,7w<3k[1YW2-+p`O66$~~F|[tF}&-LT|w6k1sY8QElT');
define('SECURE_AUTH_SALT', '[ztB%)IjnOvlwK-,XQ|G-1[LVN1#DN&jSWL8M;*`+ hr[TI+>1[P%l:|!+w3zhdS');
define('LOGGED_IN_SALT',   'px[$~LW|XoO0J[#_Z*.3(Tc]_oX~B>^M7*M8OHcn-k!yCL6grc*<R*4RrD^za9rI');
define('NONCE_SALT',       '&!RUwJhMuK/0Y;HfTPC^rHIZ=]fNsgs=.02rpv(7p/`g-3z_HhHfs2-qYyvj|yHP');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');


/**
 * Set custom paths
 *
 * These are required because wordpress is installed in a subdirectory.
 */
if (!defined('WP_SITEURL')) {
	define('WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] . '/wordpress');
}
if (!defined('WP_HOME')) {
	define('WP_HOME',    'http://' . $_SERVER['SERVER_NAME'] . '');
}
if (!defined('WP_CONTENT_DIR')) {
	define('WP_CONTENT_DIR', dirname(__FILE__) . '/content');
}
if (!defined('WP_CONTENT_URL')) {
	define('WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/content');
}


/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if (!defined('WP_DEBUG')) {
	define('WP_DEBUG', false);
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
