import React , {Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';

export default class Facebook extends Component{
    state = {
        isLoggedIn : false,
        userID:'',
        name:'',
        picture:'',
    }
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    componentDidMount = () =>{
        
    }
    login = () =>{
        console.log("COME");
        window.fbAsyncInit = () =>{
            console.log("SET");
            window.FB.init({
                appId      : 'APP_ID',
                cookie     : true,   
                xfbml      : true,  
                version    : 'v3.1' 
            });
            
            window.FB.getLoginStatus((response) => {
                console.log("CALL");
                this.statusChangeCallback(response);
            });
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    
    statusChangeCallback = (response) => {
        console.log('statusChangeCallback');
        console.log(response);
        
        if (response.status === 'connected') {
            this.testAPI();
            this.setState({
                isLoggedIn:true
            })
        } else {
            this.setState({
                isLoggedIn:false
            })
        }
    }
        
    checkLoginState = () =>  {
        window.FB.getLoginStatus((response) =>{
            this.statusChangeCallback(response);
        });
    }

    testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', (response) =>{
            console.log('Data: ' ,response);
            this.setState({
                userID:response.id,
                name:response.name,
                picture:'https://graph.facebook.com/'+response.id+'/picture?width=800',
            })
            console.log('Successful login for: ' + response.name);

        });
    }
    getMe=()=> {
        window.FB.api('/me',  (response) =>{
            console.log(JSON.stringify(response));
        });
    }

    logout = ()=>{
        window.FB.logout((response) =>{
        console.log('Logout')
        this.setState({
            isLoggedIn:false
        })
        });
        window.fbAsyncInit = function () {
            window.FB.Event.subscribe('auth.logout', function () {
                // subscribe parts
            });
        
            // here is where fb.init() code was
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=X";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    render(){
       
        return(
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">บริษัทหมี จำกัดแห่งประเทศไทย</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    {!this.state.isLoggedIn  && (
                        
                        <NavItem>
                           <Button color="primary" onClick={this.login}>Login</Button>
                       </NavItem>
                       
                       
                        
                        )}
                    {this.state.isLoggedIn  && (
                        <div>
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            Welcome {this.state.name}-{this.state.userID}
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem onClick={this.logout}>
                                Logout
                            </DropdownItem>
                           
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </div>
                    )}
                    
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}