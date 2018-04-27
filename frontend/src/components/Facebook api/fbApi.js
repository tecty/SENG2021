
var pageAccessToken = 'EAACEdEose0cBADUvquhkrDU6chCTTg7QPDZAu5pbZCqEplxobZC3OLc0cBQhB7rEX7ZCvDGy9FpiI5q9PoDXwaHMOdZBJgZAQrfZAMZBZArg7riVv5iHZCYt3wbtzvKfSRe5ZCc01Mvj1J8KofWJ2AofTZAdhkgDjJqCSuQLKNzZAcNPvroWSbSBiVapmrdXwbZCEA97AZD';

FB.init({
  appId      : '{2018449195072219}',
  status     : true,
  xfbml      : true,
  version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=2018449195072219&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
FB.AppEvents.logPageView();


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	if (response.status === 'connected') {
	  // Logged into your app and Facebook.
	  testAPI();
	} else {
	  // The person is not logged into your app or we are unable to tell.
	  document.getElementById('status').innerHTML = 'Please log ' +
	    'into this app.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});
}


// Only works after `FB.init` is called
function facebookLogin() {
  FB.login(function(response) {
  console.log(response);
  if (response.status=="connected") {
    console.log("You're loggued in");
    FB.api('/me', function(response) {
       alert(response.name);
      }); 
  } 
});
}



FB.logout(function(response) {});


FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
  }
  else {
    FB.login();
  }
});


function testAPI() {
  	console.log('Fetching your information.. ');
	FB.api(
		'/me',
		'GET',
		{"fields":"id,name,posts{place}"},
		function(response) {
			//response code		  
		}
	);
}
