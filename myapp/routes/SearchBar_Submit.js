var express = require('express');
var router = express.Router();
var fs = require('fs');
const axios = require('axios');
const { Console } = require('console');


/* GET home page. */
router.post('/', function(req, res, next) {
    
    var first_name = req.body.ArtistSearch;
    var last_name = req.body.Songsearch;

    const Lyric = createFunction2(first_name.toLowerCase());
    console.log(Lyric);

    res.render('SearchBar', { artist_name :first_name, lyrics: Lyric});

});

let createFunction2 = (Strings='the weeknd') => {
    var data;
    var link = 'http://api.musixmatch.com/ws/1.1/track.search?q_artist=' +Strings +'&page=1&s_track_rating=desc&apikey=ea589f0726cc035d19c71d1f879d9794';
    
    axios.get(link)
            .then(function (response) {
            // handle success
            console.log("here");
            
            const json= response.data.message.body.track_list;
            //console.log(json);

            data = JSON.stringify(response.data.message.body.track_list);
            
            fs.writeFileSync('Lyrics.json', data);
            //console.log(data);
            return data;
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .then(function () {
            // always executed
            });
        return data;
    }

module.exports = router;