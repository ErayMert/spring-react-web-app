import React from 'react';
import {signup} from '../api/apiCalls';
import Input from '../components/input';

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
        
        if(name === 'password' || name === 'passwordRepeat'){
            if(name === 'password' && value !== this.state.passwordRepeat){
                errors.passwordRepeat = 'Password mismacth!!'
            }else if(name === 'passwordRepeat' && value !== this.state.password){
                errors.password = 'Password mismacth!!'
            }else {
                errors.passwordRepeat = undefined;
            }
        }

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
        const {username,displayName,password,passwordRepeat} = errors;
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <form>
                            <h1 className="text-center">Sign Up</h1>
                            <Input name="username" label="Username" error={username} onChange = {this.onChange}></Input>

                            <Input name="displayName" label="Displaye Name" error={displayName} onChange = {this.onChange}></Input>
                            
                            <Input name="password" label="Password" error={password} onChange = {this.onChange} type="password"></Input>

                            <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange = {this.onChange} type="password"></Input>

                            <button className="btn btn-primary"
                            onClick = {this.onClickSignUp}
                            disabled={pendingApiCall || passwordRepeat !== undefined}>
                                {pendingApiCall && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} Sign Up</button>
                            
                        </form>
                    </div>
                </div>
                    
            </div>
        );
    }
}

export default UserSignupPage;