(function($, $up){

	$up.actBadge = function(obj) {
		var target, ctaText, ctaLink;
		if (obj){
			obj.hasOwnProperty("target")
				? target = obj.target
				: return false;
			obj.hasOwnProperty("ctaLink") ? ctaLink = "a": ctaLink="b";

		}
	};

	/*
	* Act Badge
	*
	* - find target
	* - wrap target in div and create structure
	*
	* *target (img?)
	*
	* .up-badge--group
	*   *target
	*   .up-badge
	*     .up-badge--front
	*       .up-badge--message Message
	*     .up-badge--back
	*       .up-badge--c2a Call to Action
	*       .up-badge--action(href: Button link) Button Text
	*
	* Parameters:
	*  - Target
	*  - MessageText
	*  - Call to Action
	*  - ButtonLink
	*  - ButtonText
	* */
	
})(jQuery, window.$up)