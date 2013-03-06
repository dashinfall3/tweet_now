var TweetForm = {
  init: function(){
    $('#tweet-form').on('submit',function(e){
      e.preventDefault();

      TweetForm.handleTweet();
    }); 
  },

  tweet: function() {
    return $('#tweet-form').children("textarea[name=tweet]").val()
  },

  render: function() {
    $('.messages').html('Tweet Posted!');
    $('#tweet-form').children("textarea[name=tweet]").val(''); 
    $('.load').toggle(); 
  },

  validate: function(tweet){
    if (tweet === "") return false;
    return true;
  },

  insertError: function(){
    $('.messages').html('Invalid Tweet.');
  },

  post: function(){
    $('.load').toggle();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: { tweet: TweetForm.tweet() },
    }).done(function() {
      TweetForm.render();
    });
  },

  handleTweet: function() {
    if (TweetForm.validate(TweetForm.tweet())){
      TweetForm.post();
    } 
    else {
      TweetForm.insertError();
    }
  }
};

$(document).ready(function(){
  TweetForm.init();

  $("#signout").on("click", function(e){
    e.preventDefault();

    $.ajax({
      type: "DELETE",
      url: "/signout"
    }).done(function(data){
      console.log("done");
      $(location).attr("href", "/");
    });
  });
});
