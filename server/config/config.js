
module.exports = {
    dbUrl : "mongodb://localhost:27017/meetupsshowcase",
    port : process.env.PORT || 8000,
    secret: 'nodeauthsecret', 
    sendJSONresponse: function(res, content) {
      res.json(content);
    }
  };