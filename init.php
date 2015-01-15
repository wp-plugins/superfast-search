<?php
/*
	Plugin Name: Superfast Search Basic
	Plugin URI: http://superfastsearch.co.uk/
	Description: The easy to use results-as-you-type search box.  Widget and shortcode.
	Version: 1.5
	Author: Creatomatic Ltd
	Author URI: http://www.creatomatic.co.uk/
	License: Copyright 2015  Creatomatic Ltd.  GPLv2
*/

if( !defined("ABSPATH") )
	return false;

if(defined("SUPERFASTSEARCH_VERSION"))
	return false;

define("SUPERFASTSEARCH_VERSION", "basic_1.5");


include dirname(__FILE__) . "/superfastsearch.php";
include dirname(__FILE__) . "/widget.php";

?>
