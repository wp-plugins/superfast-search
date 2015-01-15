<?php
/*
	Superfastsearch - widget.php
	Copyright 2015  Creatomatic Ltd.  GPLv2
*/

if(!defined("SUPERFASTSEARCH_VERSION"))
	return false;

class superfastsearch_widget extends WP_Widget {

	public function __construct() {
		parent::__construct(
	 		"superfastsearch_widget",  // widget ID
			"Superfast Search",        // name
			array(
				"description" => __( "Superfast Search widget"),
			)
		);
	}


	public function update($new_instance, $old_instance) {

		// checkboxes.  because we want unticked ones to still exist, just be set to false
		foreach(array("show_powered_by", "post_titles") as $checkbox) {
			$new_instance[$checkbox] = ( isset($new_instance[$checkbox]) ? "true" : "false" );
		}

		return $new_instance;
	}



	public function form($instance) {

		//echo "<pre>" . print_r( $instance, true ) . "</pre>\n";

		// must use $this->get_field_name() as there are multiple instances of this form, which breaks id="" and thus for=""

		?>

		<?php // ##### title ?>
		<p>
			<label for="<?php echo $this->get_field_name('title'); ?>">Title</label><br />
			<input name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo htmlentities( isset($instance['title']) ? $instance['title'] : false ); ?>" />
		</p>

		<?php // ##### placeholder ?>
		<p>
			<label for="<?php echo $this->get_field_name('placeholder'); ?>">Placeholder text</label><br />
			<input name="<?php echo $this->get_field_name('placeholder'); ?>" type="text" value="<?php echo htmlentities( isset($instance['placeholder']) ? $instance['placeholder'] : false ); ?>" />
		</p>

		<?php // ##### post_titles ?>
		<p>
			<label>Show post type titles</label><br />
			<input name="<?php echo $this->get_field_name('post_titles'); ?>" type="checkbox" value="true" <?php echo @$instance["post_titles"] == "true" ? "checked" : false; ?> />
		</p>


		<?php // ##### show_powered_by ?>
		<p>
			<label>Show 'Powered by...'</label><br />
			<input name="<?php echo $this->get_field_name('show_powered_by'); ?>" type="checkbox" value="true" <?php echo @$instance["show_powered_by"] == "true" ? "checked" : false; ?> />
		</p>

		<p>
			<a target="_blank" href="http://superfastsearch.co.uk/">How to configure Superfast Search</a>
			<br /><br />

			<a target="_blank" href="http://superfastsearch.co.uk/">
				<img style="border-style: none; max-width: 100%;" src="<?php echo plugin_dir_url(__FILE__); ?>support_us.jpg" alt="Support us" />
			</a>
		</p>
<?php
	}





	// client end
	public function widget($args, $instance) {
		extract( $args );

		echo $before_widget;

		$instance["title"] = $before_title . apply_filters("widget_title", @$instance["title"]) . $after_title;

		echo superfastsearch($instance);

		echo $after_widget;
	}


} // end of class




function register_superfastsearch_widget () {
	register_widget("superfastsearch_widget");
}

add_action("widgets_init", "register_superfastsearch_widget");


?>
