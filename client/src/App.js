import React, {useEffect} from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    document.title = 'Social';
  }, []);
  return (
    <BrowserRouter>
    <Container maxwidth='xl'>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path='/posts' exact element={<Home/>}/>
        <Route path='/posts/search' exact element={<Home/>}/>
        <Route path='/posts/:id' exact element={<PostDetails/>}/>
        <Route
        path="/auth"
        element={!user ? <Auth /> : <Navigate replace to="/posts" />}
      />
      </Routes>
    </Container>
    </BrowserRouter>
  )
} 

export default App
