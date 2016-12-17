/* This is a js file to run on the client side (browser), 
   feel free to make more in this folder */ 


var wordCloud = {};

// initialize Foundation
$(document).foundation();

$(document).on('click', '#submit-button', function(e) {
	submitPhrase();
});

$(document).on('keypress', '#new-word-input', function(e) {
	var keyPressed = e.keycode || e.which;
	if(keyPressed == 13) {
		submitPhrase();
	}
})

function submitPhrase() {
	var $input = $('#new-word-input'),
		inputVal = $input.val(),
		parsedInputVal = inputVal.split(/\.| |!|;|\?|,/);

	for(var i = 0; i < parsedInputVal.length; i++) {
		if (parsedInputVal[i]) {
			submitWord(parsedInputVal[i]);
		}
	}
	$input.val('');
	updateCloud();
}


function submitWord(inputVal) {
	if(inputVal) {
		if (wordCloud[inputVal]) {
			wordCloud[inputVal]+= 5;
		} else {
			wordCloud[inputVal] = 16;
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
			tagOpen = '<span data-word="' + curWord + '">',
			tagClose = ' </span>',
			wordCount = wordCloud[curWord];
		if(i == 0) {
			mostWord = curWord;
		} else if(wordCloud[curWord] >= wordCloud[mostWord]) {
			mostWord = curWord;
		}
		$wordCloudContainer.append(tagOpen + curWord + tagClose);
		$('#js-word-cloud span:last-child').css('font-size', wordCount + 'px');
	}
	$('[data-word="' + mostWord + '"]').css('color', 'red');
}