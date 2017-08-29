$(document).ready(function() {
	// Load parameters from cookie
	if(Cookies.get("search")) {
		$("#q").val(Cookies.get("search"));
	}
	if(Cookies.get("category")) {
		$("#category").val(Cookies.get("category"));
	}
	if(Cookies.get("format")) {
		$("#format").val(Cookies.get("format"));
	}
	if(Cookies.get("sort")) {
		$("#sort").val(Cookies.get("sort"));
	}
	if(Cookies.get("layout")) {
		$("#l").val(Cookies.get("layout"));
	}
	if(Cookies.get("movie")) {
		$("#movie").val(Cookies.get("movie"));
	}
	if(Cookies.get("tv")) {
		$("#tv").val(Cookies.get("tv"));
	}
	if(Cookies.get("own")) {
		$("#own").val(Cookies.get("own"));
	}
	if(Cookies.get("seen")) {
		$("#seen").val(Cookies.get("seen"));
	}
	if(Cookies.get("favourite")) {
		$("#favourite").val(Cookies.get("favourite"));
	}
	if(Cookies.get("page")) {
		$("#p").val(Cookies.get("page"));
	}
	if(Cookies.get("results")) {
		$("#n").val(Cookies.get("results"));
	}
	
	// Set parameters from url when the page is loaded
	var parameters = getQueryStringParameters();
	if(typeof parameters["search"] === 'string') {
		$("#q").val(parameters["search"]);
	}
	if(typeof parameters["category"] === 'string') {
		$("#category").val(parameters["category"]);
	}
	if(typeof parameters["format"] === 'string') {
		$("#format").val(parameters["format"]);
	}
	if(typeof parameters["sort"] === 'string') {
		$("#sort").val(parameters["sort"]);
	}
	if(typeof parameters["page"] === 'string') {
		$("#p").val(parameters["page"]);
	}
	if(typeof parameters["results"] === 'string') {
		$("#n").val(parameters["results"]);
	}
	
	// Search handling
	$("#q").keyup(function(event) {
		if ( event.which == 13 ) {
			search();
		}
		if ( event.which == 46 ) {
			this.value = '';
			search();
		}
		if( event.which == 35 ) {
			resetSearch();
			search();
		}
	});
	
	// Focus search field on CTRL+F, CMD+F and F3
	window.addEventListener("keydown",function (e) {
		if (e.keyCode === 114 || ((e.ctrlKey||e.metaKey) && e.keyCode === 70)) {
			document.getElementById("q").focus();
			e.preventDefault();
		}
	});
	
	// Change collection layout
	$('i','#layout').on('click', function() {
		var $this = $(this);
		$this.addClass('active').siblings().removeClass('active');
		document.getElementById("l").value = $this.data('value');
		search();
	});
	
	// Filter by: Movie | TV-Series | Own | Seen | Favorites
	$('.sidebar-menu').on('click','#filter-by i', function() {
		var $this = $(this),
		runOnce = true;
		$this.addClass('active');
		
		if($this.data('toggle')) {
			if($this.data('value') == -1 && runOnce) {
				$this.data('value',0);
				runOnce = false;
			}
			if($this.data('value') == 0 && runOnce) {
				$this.data('value',1);
				$this.removeClass($this.data('remove'));
				$this.addClass($this.data('add'));
				runOnce = false;
			}
			if($this.data('value') == 1 && runOnce) {
				$this.data('value',-1);
				$this.removeClass('active');
				$this.removeClass($this.data('add'));
				$this.addClass($this.data('remove'));
				runOnce = false;
			}
		} else {
			if($this.data('value') == 0) {
				$this.data('value',1);
			} else {
				$this.removeClass('active');
				$this.data('value',0);
			}
		}
		document.getElementById($this.data('id')).value = $this.data('value');
		search();
	});
	
	// Search by default
	search();
	
	$(document).ajaxComplete(function() {
		// Get scroll position from url or position from cookie if set
		if(typeof parameters["scroll"] === 'string') {
		} else if(Cookies.get("scroll") !== null) {
			$(window).scrollTop( Cookies.get("scroll") );
		}

		// Set cookie to remember scroll position
		$(window).on("scroll", function() {
			Cookies.set("scroll", $(window).scrollTop() );
		});
		
		$("img.lazy").lazyload({effect : "fadeIn", threshold : 200});
	});
});
