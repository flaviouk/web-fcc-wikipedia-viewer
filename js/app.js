$(document).ready(init);

function init(){
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
					
					console.log(dataResults);

					for(var key in dataResults){
						var dataTitle = dataResults[key].title;
						var dataDescription = dataResults[key].extract;
						var dataImage = dataResults[key].thumbnail.source;
						var dataLink = 'https://en.wikipedia.org/?curid=' + dataResults[key].pageid;

						var html = 
							'<div class="card cyan darken-4">' +
							'<div class="row">' +
							'<div class="col s3">' +
							'<img id="image" src="' + dataImage + '">' +
							'</div>' +
							'<div class="col s9">' +
							'<div class="card-content white-text">' +
							'<span class="card-title">' + dataTitle + '</span>' +
							'<p>' + dataDescription + '</p>' +
							'</div>' +
							'<div class="card-action">' +
							'<a href="' + dataLink + '">Learn more</a>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>';

						$('.item-content').append(html);
					}

				},
				error: function(){
					alert('Error');
				}
			});
	};

	$('#search-btn').keypress(function(event) {
		if(event.which == 13){
			$('.item').empty();
			ajax();
		}
	});

}