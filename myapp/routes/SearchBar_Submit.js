var express = require('express');
var router = express.Router();
var fs = require('fs');

const axios = require('axios');
const { Console } = require('console');


/* GET home page. */
router.post('/',async function(req, res, next) {
    
    var first_name = req.body.ArtistSearch;
    var last_name = req.body.Songsearch;

    axios.get('http://api.musixmatch.com/ws/1.1/track.search?q_artist=' + first_name.toLowerCase() +'&page=1&s_track_rating=desc&apikey=ea589f0726cc035d19c71d1f879d9794')
            .then(function (response) {

            console.log(JSON.stringify((response.data.message.header.status_code)));
                    

            if(JSON.stringify((response.data.message.header.status_code)) ==200){

                var data = JSON.stringify(response.data.message.body.track_list);
                fs.writeFileSync('Lyrics.json', data);

                data1 = JSON.parse(data);

                var index = 0;
                var topSongs = "";


                if(first_name==""){
                    topSongs="  Top 10 songs are: \n \n \t\t";
                }
                else{
                    topSongs="  Top 10 songs of " +first_name +" are: \n \n \t\t";
                }
                
                for (index = 0; index < data1.length; ++index) {

                    var user = data1[index];
                    console.log(user.track.track_name);
                    topSongs = topSongs + user.track.track_name +" by "+user.track.artist_name+ "; \n \n \t\t"
                }
                res.render('SearchBar', { artist_name :first_name, lyrics:topSongs});
            }
            else{
                res.render('SearchBar', { artist_name :"ERROR", lyrics:"Please check the name of the Artist."});
            }
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            res.render('SearchBar', { artist_name :first_name, lyrics:error});
            })
            .then(function () {
            // always executed
            });
});

module.exports = router;