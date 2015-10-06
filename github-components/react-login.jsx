var LoginForm = React.createClass({
	processLogin: function(){
		var username = this.refs.username.getDOMNode().value;
		var pass = this.refs.pass.getDOMNode().value;		
		Parse.User.logIn( username, pass, {
  			success: function(login) {
	  			this.props.filter({ loggedIn:true });
  			}.bind(this),
  			error: function(error) {
  			alert('Invalid Login');
  			$('#username').val('');
  			$('#pass').val('');
  			$('#login').blur()
	   		this.props.filter({loggedIn: false});
	   		//FIX ME: after 10 shut it down
  			}.bind(this)
		});
	return false;
	},
	render: function(){
		return( 
			<div>
				<h2>Login</h2>	
				<form onSubmit={this.processLogin}>
     				<div className="center-400w">
        				<input type="text" placeholder="Enter your username" id="username" ref="username" className="form-control input-margin" required/>
        				<input type="password" placeholder="Enter your password" id="pass" ref="pass" className="form-control input-margin" required/>
        				<input type="submit" id="login" value="Login" className="btn btn-primary"/>
        			</div>
      			</form>				
			</div>
		);
	}
});

var Dashboard = React.createClass({
	logout: function(){
		Parse.User.logOut().then( function(results){
		console.log(results);
		this.props.filter({loggedIn: false});
		}.bind(this));
	},
	render: function(){
		return(
			<div>
			<h2>Dashboard <button onClick={this.logout} >Logout</button></h2>
			</div>
		);
	}
});

var App = React.createClass({
	getInitialState: function(){
		return {
			data: [],
			loggedIn:true,
			isAdmin:false
		};
	},
	userAuth: function(auth){
		this.setState(auth);
		//alert(authCheck);
	},

	render: function(){
		var isLoggedIn = this.state.loggedIn ? <Dashboard filter={this.userAuth} /> : <LoginForm filter={this.userAuth} />;
		return (
			<div>
			<h1>SwingShift</h1>
				{isLoggedIn}
			</div>
		);
	}
});

React.render(
  <App />,
  document.getElementById('content')
);



