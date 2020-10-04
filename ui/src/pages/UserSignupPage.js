import React from 'react';
import {signup} from '../api/apiCalls';

class UserSignupPage extends React.Component{

    state = {
        username: null,
        displayName : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall:false,
        errors: {}
    };

    onChange = event =>{
        const {name, value} = event.target;
        const errors = { ... this.state.errors };
        errors[name] = undefined;
        
        this.setState({
            [name] : value,
            errors
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

        try{
            const response = await signup(body);
        }catch(error){
            if(error.response.data.validationErrors){
            this.setState({errors : error.response.data.validationErrors});
            }
        }
        this.setState({pendingApiCall:false});

    };

    render(){
        const {pendingApiCall, errors} = this.state;
        const {usernameError} = errors;
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <form>
                            <h1 className="text-center">Sign Up</h1>
                            <div className="form-group">
                                <label>Username: </label>
                                <input className={usernameError ? "form-control is-invalid": "form-control"} name="username" onChange = {this.onChange}/>
                                <div className="invalid-feedback">{usernameError}</div>
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