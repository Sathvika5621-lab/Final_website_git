import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "./styles.css";
import loginlogo from './logo/stacklogo.png';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email === 'admin' && data.password === 'admin') {
      navigate('/home-page');
      // navigate('/animal-housing');
    } else {
      console.error('Invalid credentials');
    }
    console.log(data);
  };

  return (
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <img src={loginlogo} alt="Logo" className='logo' />
      <Card title="Login" style={{ width: '25em' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="field">
            <label htmlFor="email">Username</label>
            <InputText id="email" {...register('email', { required: true })} />
            {errors.email && <small className="p-error">Username is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <InputText id="password" type="password" {...register('password', { required: true })} />
            {errors.password && <small className="p-error">Password is required.</small>}
          </div>
          <Button type="submit" label="Login" className="p-button-lg form-blue-button-sm" />
          <div style={{ padding: '5px' }} className='links'>
            <Link to="/register-hqp">Register</Link> | <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
