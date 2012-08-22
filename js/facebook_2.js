   // Load the SDK Asynchronously
      (function(d){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all.js";
         ref.parentNode.insertBefore(js, ref);
       }(document));

      // Init the SDK upon load
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '218867438180293', // App ID
          channelUrl : '//'+window.location.hostname+'/channel/channel.html', // Path to your Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true,  // parse XFBML
          oauth      : true
        });

        // listen for and handle auth.statusChange events
        FB.Event.subscribe('auth.statusChange', function(response) {
          if (response.authResponse) {
            // user has auth'd your app and is logged into Facebook
            FB.api('/me', function(uid){
              if (uid.name) {
                document.getElementById('auth-displayname').innerHTML = uid.name+", "+uid.link+", "+uid.email;
              }
            })
            document.getElementById('auth-loggedout').style.display = 'none';
            document.getElementById('auth-loggedin').style.display = 'block';
          } else {
            // user has not auth'd your app, or is not logged into Facebook
            document.getElementById('auth-loggedout').style.display = 'block';
            document.getElementById('auth-loggedin').style.display = 'none';
          }
        });

        // respond to clicks on the login and logout links
        // document.getElementById('auth-loginlink').addEventListener('click', function(){
        //   FB.login();
        // });
        //button.innerHTML = 'Login';
        document.getElementById('auth-loginlink').addEventListener('click', function(){
        //showLoader(true);
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(info) {
                    login(response, info);
                });
            }
        }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me'});
        });
        document.getElementById('auth-logoutlink').addEventListener('click', function(){
          FB.logout();
        }); 
      } 