var request = require("request")
var Student = require("./models/student")
var students = Student.all()

for( var i = 0, len = students.length; i < len; i++ ){
  var student = students[i]
  var uri = "https://api.github.com/users/"+ student.github +"/repos?sort=updated"
  request({
    uri: uri + '&access_token=' + process.env.access_token,
    method: 'GET',
    headers: {
      'User-Agent': 'ga'
    }
  }, function(err, response, body){
    var repos = JSON.parse(body)
    if( repos[0] ){
      var fork = repos[0].fork 
      if( !fork ){
        console.log( "https://github.com/"+repos[0].full_name )
      } 
    }
  })
}
