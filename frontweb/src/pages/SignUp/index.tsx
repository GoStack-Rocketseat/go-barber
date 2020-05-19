import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'

import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="Go Barber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" type="password" icon={FiLock} placeholder="senha" />

          <Button type="submit">Entrar</Button>
        </form>
        <a href="login">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
}

export default SignUp;
