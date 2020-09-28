import React from 'react';
import {signup} from '../api/apiCalls';

class UserSignupPage extends React.Component{

    state = {
        username: null,
        displayName : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall:false
    };

    onChange = event =>{
        const {name, value} = event.target;

        // const value = event.target.value;
        // const name = event.target.name;
        this.setState({
            [name] : value
        });
    };

    onClickSignUp = async event =>{
        event.preventDefault();
        
        const {username, displayName, password} = this.state;

        const body ={
            username,
            displayName,
            password
        };

        this.setState({pendingApiCall:true});
//burada axios ile post işlemi yaptıktan sonra pendingCall değişkeninin değeri false set edilir.
//böylece signUp butonu tekrar aktif hale gelir.
// axios asenkron olarak çalışır.

        

        // signup(body)
        //     .then(response =>{
        //         this.setState({pendingApiCall:false});
        //     })
        //     .catch(error =>{
        //         this.setState({pendingApiCall:false});
        //     });

        try{
            const response = await signup(body);
            this.setState({pendingApiCall:false});
        }catch{
        }
        this.setState({pendingApiCall:false});

    };

   

    // onChangeUserName = event => {

    //     this.setState({
    //         username: event.target.value
    //     });
    // };

    // onChangeDisplayName = event => {

    //     this.setState({
    //         displayName: event.target.value
    //     });
    // };

    // onChangePassword = event => {

    //     this.setState({
    //         password: event.target.value
    //     });
    // };

    // onChangePasswordRepeat = event => {

    //     this.setState({
    //         passwordRepeat: event.target.value
    //     });
    // };

    render(){
        const {pendingApiCall} = this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <form>
                            <h1 className="text-center">Sign Up</h1>
                            <div className="form-group">
                                <label>Username: </label>
                                <input className="form-control" name="username" onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Displaye Name: </label>
                                <input className="form-control" name="displayName" onChange = {this.onChange}/>
                            </div>
                            <div className="form-group"> 
                                <label>Password: </label>
                                <input className="form-control" name="password" type="password" onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password Repeat: </label>
                                <input className="form-control" name="passwordRepeat" type="password" onChange = {this.onChange}/>
                            </div>
                            <button className="btn btn-primary"
                            onClick = {this.onClickSignUp}
                            disabled={pendingApiCall}>
                                {pendingApiCall && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} Sign Up</button>
                            
                        </form>
                    </div>
                </div>
                    
            </div>
        );
    }
}

export default UserSignupPage;