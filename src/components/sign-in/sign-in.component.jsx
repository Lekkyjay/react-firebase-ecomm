import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const [credentials, setCredentials] = useState({email: '', password: ''})

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password} = credentials

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setCredentials({email: '', password: ''})
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({...credentials, [name]: value });
    console.log('credentials:', credentials);
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={credentials.email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={credentials.password}
          handleChange={handleChange}
          label='password'
          required
        />
        <div className="buttons">
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn> 
            Sign in with Google 
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
