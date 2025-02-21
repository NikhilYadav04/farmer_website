import React, { useState } from 'react';
import { Mail, LockKeyhole } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../ui/Button';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:2000/auth/signin',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        toast.success('Signed in successfully!', {
          position: 'bottom-center',
        });
        setTimeout(() => {
          navigate('/home');
        }, 1500);
        console.log(`Token is ${response.data.message}`);
        localStorage.setItem(
          'token',
          JSON.stringify({
            token: response.data.message,
          })
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          toast.error(error.response.data.message, {
            position: 'bottom-center',
          });
        } else if (error.request) {
          console.error('No response received:', error.request);
          toast.error('No response from server. Please try again later.', {
            position: 'bottom-center',
          });
        } else {
          console.error('Error:', error.message);
          toast.error('An error occurred. Please try again.', {
            position: 'bottom-center',
          });
        }
      });
  };

  return (
    <div className="m-auto mt-20 flex w-[550px] flex-col bg-neutral-900 pb-8">
      <div className="mt-8 flex w-full flex-col items-center gap-4">
        <div className="text-3xl font-medium">Welcome Back!</div>
        <div className="h-1 w-14 rounded-md bg-green-400"></div>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="m-auto flex h-10 w-96 items-center rounded-md">
          <Mail className="mx-8 my-0" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-10 w-96 border-none bg-transparent text-base outline-none"
          />
        </div>
        <div className="m-auto flex h-10 w-96 items-center rounded-md">
          <LockKeyhole className="mx-8 my-0" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="h-10 w-96 border-none bg-transparent text-base outline-none"
          />
        </div>
        <div className="mx-auto my-5 flex gap-8">
          <Button type="primary">Sign In</Button>
        </div>
      </form>
      <div className="mx-auto cursor-pointer text-sm">
        Don't have an account?
        <Link className="text-blue-600 underline" to="/register">
          {' '}
          Sign Up Here!
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
