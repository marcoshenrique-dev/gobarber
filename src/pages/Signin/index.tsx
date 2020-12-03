import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Container, Content, Background, AnimationContainer } from './styles';

import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const { signIn, user } = useAuth();
   const { addToast } = useToast();

   const handleSubmit = useCallback(
      async (data: SignInFormData) => {
         formRef.current?.setErrors({});
         try {
            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('Digite um E-mail válido'),
               password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });
            await signIn({
               email: data.email,
               password: data.password,
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }

            addToast({
               type: 'error',
               title: 'Erro na autenticação',
               description:
                  'Ocorreu um erro ao fazer login, cheque as credenciais',
            });
         }
      },
      [SignIn, addToast],
   );

   return (
      <Container>
         <Content>
            <AnimationContainer>
               <img src={logo} alt="Gobarber" />
               <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Faça seu logon</h1>
                  <Input name="email" icon={FiMail} placeholder="E-mail" />
                  <Input
                     name="password"
                     icon={FiLock}
                     type="password"
                     placeholder="Senha"
                  />
                  <Button type="submit">Entrar</Button>

                  <a href="forgot">Esqueci minha senha</a>
               </Form>
               <Link to="/signup">
                  <FiLogIn />
                  Criar conta
               </Link>
            </AnimationContainer>
         </Content>
         <Background />
      </Container>
   );
};

export default SignIn;
