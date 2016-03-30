VK.init({ 
	apiId: 5380999
  });
VK.Auth.login(function (response){
	if (response.session) {
		console.log('successful auth')
	} else {
		console.log('Some problems with auth')
	}
})


VK.api('friends.get', {'name_case': 'nom', 'fields':'photo_100'}, function(response) {
                if (response.error) {
                  console.log('response errror')
                } else {
                //    allFriends.textContent = 'Музыка на странице ' + response.response[0].first_name + ' ' + response.response[0].last_name;
                }
                console.log(response)
                
                for (var i=0; i<response.response.length; i++){
                	var li = document.createElement('li');
                	li.textContent = response.response[i].first_name + ' ' + response.response[i].last_name;
                	friendsList.appendChild(li);
                }
 });


