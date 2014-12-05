<?php
/*
	Plugin Name: Superfast Search Basic
	Plugin URI: http://superfastsearch.co.uk/
	Description: The easy to use results-as-you-type search box.  Widget and shortcode.
	Version: 1.3
	Author: Creatomatic Ltd
	Author URI: http://www.creatomatic.co.uk/
	License: Copyright 2014  Creatomatic Ltd.  GPLv2
*/

if( !defined("ABSPATH") )
	return false;

if(defined("SUPERFASTSEARCH_VERSION"))
	return false;

define("SUPERFASTSEARCH_VERSION", "basic_1.3");


include dirname(__FILE__) . "/superfastsearch.php";
include dirname(__FILE__) . "/widget.php";

?>
