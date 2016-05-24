$(document).ready(init);

function init(){
	function ajaxSuccess(data){
		for(var key in data){
			var title = data[key].title;
			var description = data[key].extract;
			var image = data[key].thumbnail.source;
			var link = 'https://en.wikipedia.org/?curid=' + data[key].pageid;

			var html = 
				'<div class="card cyan darken-4">' +
				'<div class="row">' +
				'<div class="col s3">' +
				'<img id="image" src="' + image + '">' +
				'</div>' +
				'<div class="col s9">' +
				'<div class="card-content white-text">' +
				'<span class="card-title">' + title + '</span>' +
				'<p>' + description + '</p>' +
				'</div>' +
				'<div class="card-action">' +
				'<a href="' + link + '">Learn more</a>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';

			$('.item-content').append(html);
			}
		}

	function ajax(){
			var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
			var query = $('#search-btn').val();
			var cb = '&callback=JSON_CALLBACK';
			var page = 'https://en.wikipedia.org/?curid=';

			$.ajax({
				url: api + query + cb,
	    		dataType: 'jsonp',
	    		type: 'POST',
				success: function(data){
					$('.item-content').empty();
					var dataResults = data.query.pages;

					ajaxSuccess(dataResults);
				},
				error: function(){
					alert('Error');
				}
			});
	};

	$('#search-btn').keypress(function(event) {
		if(event.which == 13){
			$('.item-content').empty();
			ajax();
		}
	});

}