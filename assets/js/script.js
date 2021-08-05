window.fbAsyncInit = function() {
  FB.init({
    appId: '3062616300689009',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v11.0'
  });
  FB.AppEvents.logPageView();


  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });
};

