import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  let navigate = useNavigate();
  const newPassword = watch('newPassword');

  const onSubmit = (data) => {
    console.log('Password reset data:', data);
    // Add the logic for updating the password
    // For demonstration, we'll just navigate back to the login page
    navigate('/');
  };

  return (
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card title="Forgot Password" style={{ width: '25em' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText id="email" {...register('email', { required: 'Email is required.', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
            {errors.email && <small className="p-error">{errors.email.message}</small>}
          </div>
          <div className="field">
            <label htmlFor="newPassword">New Password</label>
            <InputText id="newPassword" type="password" {...register('newPassword', { required: 'New password is required.' })} />
            {errors.newPassword && <small className="p-error">{errors.newPassword.message}</small>}
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <InputText id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Please confirm your password.', validate: value => value === newPassword || 'Passwords do not match.' })} />
            {errors.confirmPassword && <small className="p-error">{errors.confirmPassword.message}</small>}
          </div>
          <Button type="submit" label="Reset Password" className="p-button-lg form-blue-button-sm" />
        </form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
