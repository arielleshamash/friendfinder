var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;
        var userName = userData.name;
        var userPhoto = userData.photo;

        var totalDifference = 0;

        //loop through the friend array to calculate each friend's scores
        for (var i = 0; i < friends.length -1; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            //loop through each friend's scores and find the difference with user's score
            for (var j = 0; j < 10; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
};