var express = require('express');
var router = express.Router();
var fs = require('fs');

const axios = require('axios');
const { Console } = require('console');


/* GET home page. */
router.post('/',async function(req, res, next) {
    
    var first_name = req.body.ArtistSearch;
    console.log("here"+first_name)
    var last_name = req.body.Songsearch;

    axios.get('http://api.musixmatch.com/ws/1.1/track.search?q_track=' + last_name.toLowerCase() +'&apikey=ea589f0726cc035d19c71d1f879d9794')
            .then(function (response) {
            // handle success
            if(JSON.stringify((response.data.message.header.status_code)) == 200){

            var data = JSON.stringify(response.data.message.body.track_list);
            console.log(JSON.stringify(response.data.message.body));
        
            data1 = JSON.parse(data);
            console.log(data1[1].track.track_id);
            var Artist_name = data1[1].track.track_name
            var trackId = data1[1].track.track_id;
            var link = data1[1].track.track_share_url
                axios.get('http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + trackId +'&apikey=ea589f0726cc035d19c71d1f879d9794')
                    .then(function (response) {
                    // handle success
                    if(JSON.stringify((response.data.message.header.status_code)) == 200){
                        var lyrics_Data = JSON.stringify(response.data.message.body.lyrics.lyrics_body);
                        var Lyrics = JSON.parse(lyrics_Data)
                        

                        if(Lyrics == ""){
                            res.render('SearchBar', { artist_name :Artist_name, lyrics:"The lyrics of the given song is not available.",Link:link});
                        }
                        else{
                            res.render('SearchBar', { artist_name :Artist_name, lyrics: Lyrics,Link:link});
                        }
                                
                    }
                    else{
                        res.render('SearchBar', { artist_name :Artist_name, lyrics:"The lyrics of the given song is not available.",Link:link});


                    }
                    })
                            .catch(function (error) {
                            // handle error
                            console.log(error);
                            res.render('SearchBar', { artist_name :Artist_name, lyrics:error});
                            })
                            .then(function () {
                            // always executed
                            
                        });
                    }else{
                        res.render('SearchBar', { artist_name :"ERROR", lyrics:"Please check the name of the track"});

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