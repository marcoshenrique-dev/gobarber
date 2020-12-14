import React, { useCallback, useRef } from 'react';
import {
   Image,
   KeyboardAvoidingView,
   Platform,
   View,
   ScrollView,
   TextInput,
   Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import getValidationErrors from '../../utils/getValidationErros';

interface SignUpFormData {
   name: string;
   email: string;
   password: string;
}

const SignUp: React.FC = () => {
   const navigation = useNavigation();
   const formRef = useRef<FormHandles | null>(null);
   const passwordInputRef = useRef<TextInput>(null);
   const emailInputRef = useRef<TextInput>(null);

   const handleSignUp = useCallback(
      async (data: SignUpFormData) => {
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
            await api.post('/users', data);

            Alert.alert(
               'Cadastro realizado com sucesso',
               'Você já pode fazer login na aplicação',
            );

            navigation.goBack();

            // history.push('/dashboard');
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }

            Alert.alert(
               'Erro no cadastro',
               'Ocorreu um erro ao fazer cadastro, cheque as credenciais',
            );
         }
      },
      [navigation],
   );
   return (
      <>
         <KeyboardAvoidingView
            style={{ flex: 1 }}
           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
           enabled
         >
            <ScrollView
               contentContainerStyle={{ flex: 1 }}
               keyboardShouldPersistTaps="handled"
            >
               <Container>
                  <Image source={logoImg} />
                  <View>
                     <Title>Crie sua conta</Title>
                  </View>
                  <Form
                     style={{ width: '100%' }}
                     ref={formRef}
                     onSubmit={handleSignUp}
                  >
                     <Input
                        autoCorrect
                        autoCapitalize="words"
                        name="name"
                        icon="user"
                        placeholder="Nome"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                           emailInputRef.current?.focus();
                        }}
                     />
                     <Input
                       ref={emailInputRef}
                       name="email"
                       keyboardType="email-address"
                       icon="mail"
                       placeholder="E-mail"
                       autoCorrect={false}
                       autoCapitalize="none"
                       returnKeyType="next"
                       onSubmitEditing={() => {
                           passwordInputRef.current?.focus();
                        }}
                     />
                     <Input
                       ref={passwordInputRef}
                        secureTextEntry
                        name="password"
                        icon="lock"
                        placeholder="Senha"
                        returnKeyType="send"
                       onSubmitEditing={() => {
                           formRef.current?.submitForm();
                        }}
                     />
                     <Button
                        onPress={() => {
                           formRef.current?.submitForm();
                        }}
                     >
                        Criar
                     </Button>
                  </Form>
               </Container>
            </ScrollView>
         </KeyboardAvoidingView>
         <BackToSignIn
            onPress={() => {
               navigation.goBack();
            }}
         >
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
         </BackToSignIn>
      </>
   );
};

export default SignUp;
