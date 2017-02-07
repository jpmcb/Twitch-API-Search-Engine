//all code by jpmmcbride, find me on twitter if you have questions!

var myGameJson;
var myUserJson;
var myStreamJson = [];
var baseUrl = 'https://api.twitch.tv/kraken';
var topGames = '/games/top';
var popularUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// When the document is ready, load in the top 10 games streaming on twitch
$(document).ready(function(){
  $.ajax({
   type: 'GET',
   url: baseUrl + topGames,
   headers: { 'Client-ID': 'gavj8dbz3tejt4nb5kytimtic0g7v6' },
   error: function() {alert('there was an error')} ,//change 
   success: function(data) {
     $('.col-sm-8').hide();
     myGameJson = data;
     for (var i = 0; i < myGameJson.top.length; i++) {
       $("<a href='https://www.twitch.tv/directory/game/" + encodeURIComponent(myGameJson.top[i].game.name) + "' class='list-group-item' target='_blank'>" + myGameJson.top[i].game.name + "</a>").hide().appendTo('#topGamesList').fadeIn(3000); }
   }
  }) 
})


//when user hits enter, run function to search for games
$(document).keypress(function(e){
  if (e.which == 13) {
    $('.searchedGames').fadeOut(1250);
    $('#descriptor').fadeOut(350).html("hover to see who's streaming").fadeIn(500);
    var channel = document.getElementById('searchBar').value;
    
    //search for user information
    
    $.ajax({
      type: 'GET',
      url: baseUrl + '/search/channels?q=' + channel,
      headers: { 'Client-ID': 'gavj8dbz3tejt4nb5kytimtic0g7v6' },
      error: function() {alert('there was an error')}, //change this
      success: function(data) {
        myUserJson = data;
        
        for (var x = 0; x < myUserJson.channels.length; x++) {
          $("<div id='" + myUserJson.channels[x].name + "'class='searchedGames'><h2><a href='" + myUserJson.channels[x].url + "'target='_blank'>" + myUserJson.channels[x].name + "</a></h2></div>").hide().appendTo('#userContent').fadeIn(1500); 
        }
        
        $('div.searchedGames').hover( function(event){
          var currentID = event.target.id;
          //console.log(myStreamJson);
          
          $.ajax({
            type: 'GET',
            url: baseUrl + '/streams/' + currentID,
            headers: { 'Client-ID': 'gavj8dbz3tejt4nb5kytimtic0g7v6' },
            error: function() {alert('there was an error')}, //change this
            success: function(data) {
              myStreamJson = data;
              if(myStreamJson.stream) {
                $('#' + currentID).addClass('online')
              } else {
                $('#' + currentID).addClass('offline')
              }
            }
          })
          //console.log(event);
          
          //if (myStreamJson.indexOf(currentID) === -1 ) {
          //$('#' + currentID).addClass('offline');
          //} else {
          //$('#' + currentID).addClass('online')
          //}
        })
      }
    })
    
    
  }
})

//when user clicks box, finds if user is streaming from created array

/*
$(document.body).on('click','.searchedGames', function(evt){
  var currentID = this.id;
  console.log(currentID);
  console.log(myStreamJson);
  if (myStreamJson.indexOf(currentID) === -1 ) {
    $('#' + currentID).addClass('offline');
    } else {
    $('#' + currentID).addClass('online')
    }
})

*/