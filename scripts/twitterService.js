var Twitter = require('twitter');

module.exports = function(app) {
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });

    app.get("/api/twitter/:username", getTweets);

    function getTweets(req, res) {
        var username = req.params.username,
            tweetCount = 1000;
        var params = {screen_name: username, count: tweetCount, include_rts: false, trim_user: true, exclude_replies: true};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                res.json(formatTweets(tweets));
            }
        });
    }

    function formatTweets(tweets) {
        var tweetTexts = [];
        for(var i = 0; i < tweets.length; i++) {
            tweetTexts.push(tweets[i].text);
        }
        return tweetTexts;
    }


};