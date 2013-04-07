<?php
/**
 * Register the jQuery UI Geo location autocomplete widget for inclusion
 *
 * @package Libraries
 * @subpackage JqueryTmpl
 * @version $Id: library.php 14482 2012-01-19 03:38:57Z teknocat $
 */
class JqueryLiveupdate extends LibraryLoader {
	protected static function register() {
		Biscuit::instance()->Theme->register_js('footer', 'libraries/jquery_liveupdate/score.js');
		Biscuit::instance()->Theme->register_js('footer', 'libraries/jquery_liveupdate/liveupdate.js');
	}
}
