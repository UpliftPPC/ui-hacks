(function($, target){
	$('article .js-petition .petition-counter').each(function(){
		var $pc = $(this),
			$bar = $pc.find('.bar'),
			c = $bar.text();
		
		$pc.find('.petition-counter--title').text('Target '+target+' signatures');
		
		$pc.find('.petition-counter--start').text('0');
		$pc.find('.petition-counter--middle').text(Math.round(target/2));
		$pc.find('.petition-counter--target').text(target);

		$bar.css({
			'max-width': '100%',
			'min-width': '7%',
			'width': Math.floor((c/target)*100) + '%'
		});
	});
})(jQuery, 500)