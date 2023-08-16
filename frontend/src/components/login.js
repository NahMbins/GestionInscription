import React from 'react';
import Form from 'react-bootstrap/Form';
import './signin.css';
import { useState } from 'react';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { fetchToken, setToken } from './auth';
import { useNavigate } from 'react-router';
import { ExpressAxios } from './baseUrl';
import Spiner from './spiner';

const Login = (event) => {
  
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    else setValidated(true);
    if (user !== '' & password !== '') {
      
      try {
        setloading(true)
        const response = await ExpressAxios.post("/login",
          { username: user, password: password },
        )

        if (response.status === 200) {
          
          setToken(response.data)
          fetchToken();
          navigate('/liste')
          
        }
        
      } catch (error) {
        toast.error("Username ou mot de passe incorrecte", { position: 'top-center' })
        
      }
      setloading(false)
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      
      {loading && <Spiner/>}
      <Form noValidate validated={validated} onSubmit={handleSubmit} >

        <h2 className="h3 mb-3 fw-normal text-center">AUTHENTIFICATION</h2>
        <div className="form-floating">
        <Form.Control.Feedback type="invalid">Veuillez completer</Form.Control.Feedback>
          <Form.Control
            className="form-control"
            required
            placeholder='username'
            type="text"
            name="nom"
            id="floatingInputuser"
            onChange={(event) => { setuser(event.target.value) }}
          />
          <Form.Label className='floatingInputuser'>Username</Form.Label>

        </div>
        <div className="form-floating">
        <Form.Control.Feedback type="invalid">Veuillez completer</Form.Control.Feedback>
          <Form.Control
            className="form-control"
            required
            placeholder='password'
            type="password"
            name="password"
            id="floatingInputpassword"
            onChange={(event) => { setpassword(event.target.value) }}
          />
          <Form.Label className='floatingInputpassword'>Password</Form.Label>
        </div>
        <div className='text-center'>
          <Button variant="btn btn-lg btn-primary" onClick={handleSubmit}>
            Se connecter
          </Button>
        </div>
      </Form>
      {/* )} */}
    </main>
  )
}

export default Login;