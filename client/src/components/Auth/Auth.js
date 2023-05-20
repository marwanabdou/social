import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LockIcon from '@mui/icons-material/Lock';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {signin, signup} from '../../actions/auth'


const initialState = {firstName: '', lastName: '', email:'', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    const handleSubmit = (e) => {
        e.preventDefault();

       if(isSignup){
        dispatch(signup(formData, history))
       }
       else {
        dispatch(signin(formData, history))

       }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    const googleSuccess = async (res) => {
            
    
    const result = jwt_decode(res?.credential);
            const token = result?.jti;

    
    try {
        dispatch({type: 'AUTH', data: {result, token }});
        history('/');
        

    } catch (error) {
        console.log(error);
    }
        console.log(res);
    };
    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful')
    };
  return (
    <GoogleOAuthProvider clientId="490622060847-pgs74ijfaj185e0qsjh7p5385g4givoq.apps.googleusercontent.com">
    <div>
      <Container className="main" maxWidth='xs'> 
<Paper className={classes.paper} elevation={3}>
    <Avatar className={classes.avatar}>
        <LockIcon/>
    </Avatar>
    <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing = {2}>
             {
                isSignup && (
                    <>
                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                    <Input name='lastName' label='Last Name' handleChange={handleChange}  half />

                    </>
                )
             }
                    <Input name='email' label='Email Address' handleChange={handleChange} type="email"  />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup &&  <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type="password"/>
}


        </Grid>
        
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>
        
            <GoogleLogin
        render={(renderProps) => (
            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                Google Sign In
                </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy='single_host_origin'

        />
        
        <Grid container justify ="flex-end">
            <Grid item>
            <Button onClick={switchMode}>
                {isSignup ? 'Already have an account?' : 'Dont have an account?'}
            </Button>
            </Grid>

        </Grid>
        </form> 
</Paper>
      </Container>
    </div>
    </GoogleOAuthProvider>
  )
}

export default Auth
