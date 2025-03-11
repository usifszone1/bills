
import React from 'react';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
