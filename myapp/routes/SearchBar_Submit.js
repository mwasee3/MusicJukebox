var express = require('express');
var router = express.Router();
var fs = require('fs');

const axios = require('axios');
const { Console } = require('console');
let Api = require('../api.js');


/* GET home page. */
router.post('/',async function(req, res, next) {
    
    var first_name = req.body.ArtistSearch;
    var last_name = req.body.Songsearch;
    // parseJson(users);
    // res.render('SearchBar', { artist_name :first_name, lyrics: Api.createFunction2(first_name.toLowerCase())});
    //var link = 'http://api.musixmatch.com/ws/1.1/track.search?q_artist=' + first_name.toLowerCase() +'&page=1&s_track_rating=desc&apikey=ea589f0726cc035d19c71d1f879d9794';
    
    axios.get('http://api.musixmatch.com/ws/1.1/track.search?q_artist=' + first_name.toLowerCase() +'&page=1&s_track_rating=desc&apikey=ea589f0726cc035d19c71d1f879d9794')
            .then(function (response) {
            // handle success
            console.log("here");
            var topSongs = ""
            if(first_name==""){
                topSongs="Top 10 songs are: \n \n";
            }
            else{
                topSongs="Top 10 songs of " +first_name +" are: \n";
            }
            const json= response.data.message.body.track_list;

            var data = JSON.stringify(response.data.message.body.track_list);
            fs.writeFileSync('Lyrics.json', data);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            res.render('SearchBar', { artist_name :first_name, lyrics:error});
            })
            .then(function () {
            // always executed
                let users = require('../Lyrics.json');
                var user;
                

                for (var index = 0; index < users.length; ++index) {

                    user = users[index];
                    console.log(user.track.track_name);
                    topSongs = topSongs + user.track.track_name + " \n "
                }
                res.render('SearchBar', { artist_name :first_name, lyrics:topSongs});
            });
});

// let parseJson = function(users){
//     var link = 'http://api.musixmatch.com/ws/1.1/track.search?q_artist=' +Strings +'&page=1&s_track_rating=desc&apikey=ea589f0726cc035d19c71d1f879d9794';
    
//     axios.get(link)
//             .then(function (response) {
//             // handle success
//             console.log("here");
            
//             const json= response.data.message.body.track_list;

//             data = JSON.stringify(response.data.message.body.track_list);
            
//             fs.writeFileSync('Lyrics.json', data);
//             var user;

//             for (var index = 0; index < users.length; ++index) {

//                 user = users[index];
//                 console.log(user.track.track_name);
//             }
//             return data;
//             res.render('SearchBar', { artist_name :first_name, lyrics:user});
//             })
//             .catch(function (error) {
//             // handle error
//             console.log(error);
//             res.render('SearchBar', { artist_name :first_name, lyrics:error});
//             })
//             .then(function () {
//             // always executed
//             });

// }

module.exports = router;