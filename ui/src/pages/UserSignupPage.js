import React from 'react';
import {signup, changeLanguage} from '../api/apiCalls';
import Input from '../components/input';
import {withTranslation} from 'react-i18next';

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
        const { t } = this.props;
        
        if(name === 'password' || name === 'passwordRepeat'){
            if(name === 'password' && value !== this.state.passwordRepeat){
                errors.passwordRepeat = t('Password mismatch');
            }else if(name === 'passwordRepeat' && value !== this.state.password){
                errors.password = t('Password mismatch')
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

    onChangeLanguage = language =>{
        const {i18n} = this.props;

        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render(){
        const {pendingApiCall, errors} = this.state;
        const {username,displayName,password,passwordRepeat} = errors;
        const {t} = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <form>
                            <h1 className="text-center">{t('Sign Up')}</h1>
                            <Input name="username" label={t("Username")} error={username} onChange = {this.onChange}></Input>

                            <Input name="displayName" label={t("Display Name")} error={displayName} onChange = {this.onChange}></Input>
                            
                            <Input name="password" label= {t("Password")} error={password} onChange = {this.onChange} type="password"></Input>

                            <Input name="passwordRepeat" label= {t("Password Repeat")} error={passwordRepeat} onChange = {this.onChange} type="password"></Input>
                            <div className = 'text-center'>
                                <button className="btn btn-primary "
                                onClick = {this.onClickSignUp}
                                disabled={pendingApiCall || passwordRepeat !== undefined}>
                                    {pendingApiCall && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} {t('Sign Up')}</button>
                            </div>
                            <div>
                                <img className="mr-1" src={window.location.origin + '/turkey.png'} 
                                alt = "Turkish"
                                onClick ={() => this.onChangeLanguage('tr')} 
                                style={{curser: 'pointer'}} width = "30" height= "30" >

                                </img>
                                <img src={window.location.origin + '/united-states.png'}  
                                alt = "USA" 
                                onClick ={() => this.onChangeLanguage('en')} 
                                style={{curser: 'pointer'}} width = "30" height= "30"></img>
                            </div>
                        </form>
                    </div>
                </div>
                    
            </div>
        );
    }
}

const UserSignUpTranslation = withTranslation()(UserSignupPage);

export default UserSignUpTranslation;