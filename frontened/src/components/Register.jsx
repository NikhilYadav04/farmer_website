import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { Phone } from 'lucide-react';
import axios from 'axios';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:2000/auth/signup',
        {
          name,
          phone,
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
          navigate('/signin');
        }, 1500);
        localStorage.setItem(
          'userdata',
          JSON.stringify({
            name: name,
            email: email,
            phone: phone,
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
        <div className="text-3xl font-medium">Join Us</div>
        <div className="h-1 w-14 rounded-md bg-green-400"></div>
      </div>
      <div className="mt-8 flex flex-col gap-5">
        <div className="m-auto flex h-10 w-96 items-center rounded-md">
          <User className="mx-8 my-0" />
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-96 border-none bg-transparent text-base outline-none"
          />
        </div>
        <div className="m-auto flex h-10 w-96 items-center rounded-md">
          <Phone className="mx-8 my-0" />
          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 w-96 border-none bg-transparent text-base outline-none"
          />
        </div>
        <div className="m-auto flex h-10 w-96 items-center rounded-md">
          <Mail className="mx-8 my-0" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-96 border-none bg-transparent text-base outline-none"
          />
        </div>
        <div className="m-auto flex h-10 w-96 items-center rounded-md">
          <LockKeyhole className="mx-8 my-0" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-96 border-none bg-transparent text-base outline-none"
          />
        </div>
      </div>
      <div className="mx-48 my-5 flex gap-8">
        <Button type="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
      <div className="mx-auto cursor-pointer text-sm">
        Already have an account?{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => navigate('/signin')}
        >
          Login Here!
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
