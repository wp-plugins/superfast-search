/*
	Superfastsearch - superfastsearch.js
	Copyright 2014  Creatomatic Ltd.  GPLv2
*/

jQuery(document).ready(function(){

	// disable empty search
	jQuery(".superfastsearch form").submit(function() {

		if ( jQuery(".superfastsearch_input").val() == "") {
			return false;
		}
	});


	jQuery("body").click(function(e) {

		// if click away
		if ( !jQuery(e.target).is(".superfastsearch") && !jQuery(e.target).is(".superfastsearch_input") ) {

			// hide it all results
			jQuery(".superfastsearch_results a").removeClass("sfs_result_show");

			// reset input
			jQuery(".superfastsearch_input").val("");

			// hide the titles
			jQuery(".sfs_post_title").css("display", "none");

			// hide the credits
			jQuery(".superfastsearch_powered").css("display", "none");

		}

	});





	// keyboard navigation
	jQuery(".superfastsearch").keydown(function(event) {

		// up = 38,  down = 40
		if( event.which == 38 || event.which == 40) {

			// stop page scrolling
			event.preventDefault();

			focused = false;

			// ### find which one is currently focused
			jQuery(this).find(".superfastsearch_results a.sfs_result_show").each(function() {

				if( jQuery(this).is(":focus") ) {

					focused = jQuery(this);

				}
				
			});


			// ### if not focused - focus the first
			if( !focused ) {

				jQuery(this).find(".superfastsearch_results a.sfs_result_show").first().focus();


				//console.log( "could not find one focused" );

				
			} else {

				if( event.which == 38 ) {

					prev = jQuery( focused ).prevAll(".superfastsearch_results a.sfs_result_show").first();

					jQuery( prev ).focus();


				} else {

					next = jQuery( focused ).nextAll(".superfastsearch_results a.sfs_result_show").first();

					jQuery( next ).focus();

					//console.log( jQuery( next ).html() );
				}

			}
			
		}


	});


	// the search
	jQuery(".superfastsearch_input").keyup(function() {

		// hide any prev results
		jQuery(".superfastsearch_results a").removeClass("sfs_result_show");

		// hide any titles
		jQuery(".sfs_post_title").css("display", "none");

		// hide credits
		jQuery(".superfastsearch_powered").css("display", "none");


		if (jQuery(this).val() != "") {

			// search + show
			searched = jQuery(this).val().toLowerCase();
			jQuery('.superfastsearch_results a[title*="' + searched + '"]').slice(0,5).addClass("sfs_result_show");
		}



		// say credits if there are results (and credits are enabled)
		if( jQuery(".superfastsearch_results a.sfs_result_show").length != 0 ) {

			// reverse
			//jQuery(".sfs_post_title").css("display", "block");

			// actually, only display titles that have something underneath it
			jQuery(".sfs_post_title").each(function() {

				var title_has_content = false;

				// for each title
				jQuery(this).nextUntil(".sfs_post_title").each(function() {

					//console.log( jQuery(this) );

					if( jQuery(this).hasClass("sfs_result_show") ) {

						title_has_content = true;

						return false; // break
					}

				});

				if( title_has_content ) {
					//console.log("showing " + jQuery(this).html() );

					jQuery(this).css("display", "block");
				}
			});




			jQuery(".superfastsearch_powered").css("display", "block");

		}
	});







	if ( ! jQuery.isFunction( jQuery.fn.placeholder ) ) {

		/*
		  jQuery placeholder plugin
		  by Andrey Kuzmin, @unsoundscapes

		  Based on existing plugin http://mths.be/placeholder by @mathias
		  and this demo http://robertnyman.com/2011/05/02/ by @robertnyman

		  Adopted to toggle placeholder on user input instead of focus

		  Released under the MIT license
		*/

		(function(e){"use strict";if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";function i(t){var n={},r=/^jQuery\d+$/;e.each(t.attributes,function(){if(this.specified&&!r.test(this.name)){n[this.name]=this.value}});return n}function s(e,t){if(e.createTextRange){var n=e.createTextRange();n.move("character",t);n.select()}else if(e.selectionStart!==null){e.focus();e.setSelectionRange(t,t)}}function o(t,n){this.options=n||{};this.$replacement=this.$element=e(t);this.initialize.apply(this,arguments);r=r.add(t)}var t="placeholder"in document.createElement("input"),n="placeholder"in document.createElement("textarea"),r=e();o.prototype={initialize:function(){this.isHidden=true;this.placeholderAttr=this.$element.attr("placeholder");this.$element.attr("autocomplete","off");this.$element.removeAttr("placeholder");this.isPassword=this.$element.is("[type=password]");if(this.isPassword)this.makeReplacement();this.$replacement.on({"keydown.placeholder contextmenu.placeholder":e.proxy(this.hide,this),"focus.placeholder drop.placeholder click.placeholder":e.proxy(this.setCaret,this)});this.$element.on({"blur.placeholder keyup.placeholder":e.proxy(this.show,this)});this.show()},val:function(e){if(e===undefined){return this.isHidden?this.$element[0].value:""}if(e===""){if(this.isHidden){this.$element[0].value=e;this.show()}}else{if(!this.isHidden)this.hide();this.$element[0].value=e}return this},hide:function(e){var t=this.$replacement.is(":focus");if(this.isHidden)return;if(!e||!(e.shiftKey&&e.keyCode===16)&&e.keyCode!==9){this.isHidden=true;if(this.isPassword){this.$replacement.before(this.$element.show()).hide();if(t)this.$element.focus()}else{this.$element[0].value="";this.$element.removeClass(this.options.className)}}},show:function(e){var t=this.$element.is(":focus");if(!this.isHidden)return;if(this.$element[0].value===""){this.isHidden=false;this.$replacement[0].value=this.placeholderAttr;if(this.isPassword){this.$element.before(this.$replacement.show()).hide();if(t)this.$replacement.focus()}else{this.$element.addClass(this.options.className);if(t)this.setCaret(e)}}},setCaret:function(e){if(e&&!this.isHidden){s(this.$replacement[0],0);e.preventDefault()}},makeReplacement:function(){var t=e.extend(i(this.$element[0]),{type:"text",value:this.placeholderAttr});delete t.name;this.$replacement=e("<input>",t).data("placeholder",this).addClass(this.options.className);return this.$replacement}};e.valHooks.input=e.valHooks.textarea=e.propHooks.value={get:function(t){var n=e(t).data("placeholder");return n?n.val():t.value},set:function(t,n){var r=e(t).data("placeholder");return r?r.val(n):t.value=n}};e.attrHooks.placeholder={get:function(t){var n=e(t).data("placeholder");if(n)return n.placeholderAttr;else return t.getAttribute("placeholder")},set:function(t,n){var r=e(t).data("placeholder");if(r){r.placeholderAttr=n;if(!r.isHidden){r.$replacement[0].value=n}}else{t.setAttribute("placeholder",n)}return t}};e.fn.placeholder=function(r){return this.each(function(){var i=e(this),s=i.data("placeholder"),u=e.extend({},e.fn.placeholder.defaults,typeof r==="object"&&r);if(!s&&i.is("[placeholder]")&&(u.force||!t&&i.is("input")||!n&&i.is("textarea"))){i.data("placeholder",s=new o(this,u))}if(s&&typeof r==="string")s[r]()})};e.fn.placeholder.defaults={force:false,className:"placeholder"};e.fn.placeholder.Constructor=o;e(document).on("submit.placeholder","form",function(){r.placeholder("hide");setTimeout(function(){r.placeholder("show")},10)});e(window).on("beforeunload.placeholder",function(){r.placeholder("hide")});return o})


		jQuery(".superfastsearch_input").placeholder({
			force:     true,
			className: "placeholder"
		});

	}

});
