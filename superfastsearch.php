<?php
/*
	Superfastsearch - superfastsearch.php
	Copyright 2015  Creatomatic Ltd.  GPLv2
*/

if(!defined("SUPERFASTSEARCH_VERSION"))
	return false;

wp_enqueue_script("jquery");

wp_enqueue_script("superfastsearch", plugin_dir_url(__FILE__) . "superfastsearch.js",    array("jquery"));
wp_enqueue_style ("superfastsearch", plugin_dir_url(__FILE__) . "superfastsearch.css" );


// both widget and shortcode will call this with atts
function superfastsearch ( $atts, $content = null ) {

	//echo "<pre>" . print_r( $atts, true ) . "</pre>\n";

	// default values
	$conf = array(
		"title"              => "",

		"post_titles"        => "true",

		"placeholder"        => "Search",

		"show_powered_by"    => "false",
	);

	// shortcode overwrites
	foreach($conf as $field => $default) {
		if( isset($atts[$field]) )
			$conf[$field] = $atts[$field];
	}


	$html = "
		<div class=\"superfastsearch_outer\">

			<div class=\"superfastsearch_title\">" . $conf["title"] . "</div>

			<div class=\"superfastsearch\">

				<form name=\"superfastsearch\" method=\"get\" action=\"" . site_url() . "\">
					<input class=\"superfastsearch_input\" name=\"s\" type=\"text\" placeholder=\"" . htmlentities( $conf["placeholder"] ) . "\" alt=\"" . htmlentities( $conf["placeholder"] ) . "\" autocomplete=\"off\" autocorrect=\"off\" spellcheck=\"false\" />
				</form>
		
				<div class=\"superfastsearch_results\">
";

	if( $conf["post_titles"] == "true" ) {

		$html .= "
					<div class=\"sfs_post_title\">Pages</div>";
	}

	$args = array (
		"post_type"     => "page",
		"numberposts"   => -1,
		"orderby"       => "asc",
		"fields"        => "ids",
	);

	$possible_results = get_posts( $args );

	//print_r( $possible_results );

	foreach ($possible_results as $single_id) {

		$title = get_the_title($single_id);

		$html .= "
					<a href=\"" . get_permalink($single_id) . "\" alt=\"" . strtolower($title) . " " . get_post_meta($single_id, "keywords", true) . "\" class=\"sfs_result\">" . $title . "</a>";
	}


	if($conf["show_powered_by"] == "true")
		$html .= "
					<div class=\"superfastsearch_powered\">Powered by <a target=\"_blank\" href=\"http://superfastsearch.co.uk/\">Super Fast Search</a></div>
";


	$html .= "
				</div><!-- end superfastsearch_results -->
			</div><!-- end superfastsearch -->
		</div><!-- end superfastsearch_outer -->
";

	return $html;
}


add_shortcode("superfastsearch", "superfastsearch");
?>
