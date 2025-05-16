import React from 'react';
import { Link } from 'react-router-dom';

const MailSuccess: React.FC = () => {
  return (
    <div>
      <h3>
        Seu email foi verificado com sucesso, você já pode fazer o <Link  style={{color:'lightblue'}} to={'/login'}>login</Link> na sua conta
      </h3>
    </div>
  )
};

export default MailSuccess;
