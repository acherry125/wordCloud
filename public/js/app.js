/* This is a js file to run on the client side (browser), 
   feel free to make more in this folder */ 


var wordCloud = {};

// initialize Foundation
$(document).foundation();

$(document).on('click', '#submit-button', function(e) {
	submitPhrase(false);
});

$(document).on('keypress', '#new-word-input', function(e) {
	var keyPressed = e.keycode || e.which;
	if(keyPressed == 13) {
		submitPhrase(false);
	}
})


$(document).on('click', '#twitter-submit-button', function(e) {
	getUserTweets($('#twitter-user-input').val());
});

$(document).on('keypress', '#twitter-user-input', function(e) {
	var keyPressed = e.keycode || e.which;
	if(keyPressed == 13) {
		getUserTweets($('#twitter-user-input').val());
	}
})

function submitPhrase(twitterFeed) {	
	wordCloud = {};
	var $input = $('#new-word-input'),
		inputVal;
	if(!twitterFeed) {
		inputVal = $input.val()
	} else {
		inputVal = twitterFeed;
	}

	var parsedInputVal = inputVal.split(/\.| |!|;|\?|-|,/);
	var dontRecordList = ['', '"', 'will', 'i', 'on', 'the', 'and', 'a', 'it', 
	'in', 'to', 'when', 'as', 'just', 'am', 'of', 'are', 'be', 'for', 'was', 'is', 'that', 'have', 'would', '&', 'get'];	

	for(var i = 0; i < parsedInputVal.length; i++) {
		var lowerCaseWord = parsedInputVal[i].toLowerCase();
		if (dontRecordList.indexOf(lowerCaseWord) == -1 && lowerCaseWord.indexOf('/') == -1 && lowerCaseWord.indexOf('@') == -1) {
			submitWord(lowerCaseWord);
		}
	}
	$input.val('');
	updateCloud();
}


function submitWord(inputVal) {
	if(inputVal) {
		if (wordCloud[inputVal]) {
			wordCloud[inputVal]+= 1;
		} else {
			wordCloud[inputVal] = 1;
		}
	}	
}

function updateCloud() {
	var cloudWords = Object.keys(wordCloud),
		$wordCloudContainer = $('#js-word-cloud'),
		mostWord;
	$wordCloudContainer.html('');
	for(var i = 0; i < cloudWords.length; i++) {
		var curWord = cloudWords[i],
			wordCount = wordCloud[curWord],
			tagOpen = '<span data-word="' + curWord + '" data-count="' + wordCount + '">',
			tagClose = ' </span>';
		if(i == 0) {
			mostWord = curWord;
		} else if(wordCount >= wordCloud[mostWord]) {
			mostWord = curWord;
			if(wordCount < 3) {
				continue;
			}
		} else {
			if(wordCount < 3) {
				continue;
			}
		}
		var $thisElement,
			color;
		if(i % 2 == 0) {
			$wordCloudContainer.append(tagOpen + curWord + tagClose);
			$thisElement = $('#js-word-cloud span:last-child');
		} else {
			$wordCloudContainer.prepend(tagOpen + curWord + tagClose);
			$thisElement = $('#js-word-cloud span:first-child');
		}
		$thisElement.css('font-size', (wordCount * 4 + 8) + 'px');
		if(i % 9 == 0) {
			color = '#d53e4f';
		} else if (i % 7 == 0) {
			color = '#fdae61';
		} else if (i % 3 == 0) {
			color = '#fee08b';
		} else if (i % 5 == 0) {
			color = '#abdda4';
		} else if (i % 2 == 0) {
			color = '#66c2a5';
		} else {
			color = '#3288bd';
		}
		$thisElement.css('color', color);
	}
	$('[data-word="' + mostWord + '"]').css({'color': 'red', 'font-weight': 'bold'});
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}




function getUserTweets(username) {
	var url = '/api/twitter/' + username;
	$.get(url)
		.done(function(data) {
			submitPhrase(data.join(';'));
		});
}