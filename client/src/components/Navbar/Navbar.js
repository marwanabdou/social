import React, { useState, useEffect} from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import social from '../../images/social.png';
import memoriesLogo from '../../images/memoriesLogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";




const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({type: 'LOGOUT'})

    history('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    
     
      //JWT

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


    return (
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to = '/' className={classes.brandContainer}>
        <img src={social} alt="icon" height="45px"/>
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px"/>

</Link>
<Toolbar className={classes.toolbar}>
{user ? (
<div className={classes.profile}>
<Avatar className={classes.purple} alt = {user.result?.name} src={user.result?.imageUrl}>{user.result?.name.charAt(0)}</Avatar>
<Typography className={classes.userName}  variant="h6">{user.result?.name}</Typography>
<Button varitant="contained" className={classes.logout} color='secondary' onClick={logout} >Logout</Button>
</div>
) : (
 <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button> 

)}

</Toolbar>
      </AppBar>
  )
}

export default Navbar
