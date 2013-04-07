(function($) {
	$.fn.liveUpdate = function(data_source, options) {
		if (options == undefined) {
			options = {}
		}
		options = $.extend({
			source_type: 'elements',
			filter_elements: 'li',
			clear_button: null,
			hide_clear_on_empty: true
		}, options);

		if (data_source == 'cancel') {
			this.unbind('keyup');
			this.val('');
			this.parents('form').unbind('submit');
			if (options.clear_button) {
				$(options.clear_button).unbind('click');
				if (options.hide_clear_on_empty) {
					$(options.clear_button).hide();
				}
			}
			return;
		}

		var has_data = false;

		if (options.source_type == 'elements') {
			var elements = $(data_source);
			if (elements.length) {
				has_data = true;
				var rows = elements.children(options.filter_elements),
				cache = rows.map(function() {
					return this.innerHTML.toLowerCase();
				});
			}
		} else if (options.source_type == 'data') {
			if (typeof(data_source) == 'object' && data_source.length) {
				has_data = true;
				var rows = $(options.filter_elements),
				cache = $.map(data_source, function(value) {
					return value.toLowerCase();
				});
			}
		}
		if (has_data) {
			this.keyup(filter).keyup().parents('form').submit(function() {
				return false;
			});
		}

		if (options.clear_button) {
			var me = this;
			$(options.clear_button).click(function(event) {
				event.preventDefault();
				me.val('');
				rows.show();
				me.focus();
				if (options.hide_clear_on_empty) {
					$(this).hide();
				}
				return false;
			});
			if (options.hide_clear_on_empty) {
				$(options.clear_button).hide();
			}
		}

		return this;

		function filter() {
			var term = $.trim( $(this).val().toLowerCase() ), scores = [];

			if ( !term ) {
				if (options.clear_button && options.hide_clear_on_empty) {
					$(options.clear_button).hide();
				}
				rows.show();
			} else {
				if (options.clear_button && options.hide_clear_on_empty) {
					$(options.clear_button).show();
				}
				rows.hide();

				$.each(cache, function(i){
					var score = this.score(term);
					if (score > 0) {
						scores.push([score, i]);
					}
				});

				$.each(scores.sort(function(a, b) {
					return b[0] - a[0];
				}), function() {
					$(rows[ this[1] ]).show();
				});
			}
		}
	};
})(jQuery);
