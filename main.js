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

