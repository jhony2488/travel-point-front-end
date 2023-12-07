/* eslint-disable no-unused-vars */
import React,{useState,useRef} from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaUser } from '../../schemasValidations/user';
import { Input,Button } from '../../Components';
import {setUser} from '../../services/users';
import {upload} from '../../services/upload';
import { useStyles } from './style';

export default function SignUp() {
    const classes = useStyles();

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const { handleSubmit, formState: { errors },control, reset } = useForm({
        resolver: yupResolver(schemaUser),
    });

    const handleUpload = async () => {
        try {
          const formData = await new FormData();
          
          await formData.append('file', file);
          

          const response = await upload(formData)
    
          console.log(response.data); // Lidere com a resposta do servidor conforme necessário
          return response;
        } catch (error) {
          console.error('Erro ao fazer upload do arquivo:', error);
        }
      };

    const handleSubmitSignUp = async ({name, email, password}) => {

        await handleUpload().then((uploadSubmit) => {
            setUser(name, email, password,  uploadSubmit.data.path).then((response)=>{
                alert('Cadastro realizado com sucesso');
               reset();
            }).catch((err)=>{
                alert(err.data.message | err.message);
            });
          });
        
    };

    return (
        <>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Sign Up
                </Typography>
                <Box className={classes.box}>
                <form onSubmit={handleSubmit(handleSubmitSignUp)}>
                <Box className={classes.boxWrapper}>
                <label htmlFor="input-name">
                            Name
                        </label>
                        <Input id="input-name" control={control} nameInput={'name'}  placeholder="André Roberto"   />
                        <p className={classes.errorMessage}>{errors.name?.message}</p>
                        <label htmlFor="input-email">
                            Email
                        </label>
                        <Input id="input-email" control={control} nameInput={'email'}  placeholder="jhonata@email.com"   />
                        <p className={classes.errorMessage}>{errors.email?.message}</p>
                        <label htmlFor="input-password">
                            Password
                        </label>
                        <Input id="input-password" placeholder="***********" type="password" hintText="Password" control={control} nameInput={'password'} />
                        <label htmlFor="input-password">
                           Image perfil user
                        </label>
                        <input type="file" name='file' onChange={handleFileChange} />
                        <p className={classes.errorMessage}>{errors.password?.message}</p>
                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' className={classes.buttonSubmit} type='submit'>
                                Sign Up
                            </Button>
                        </div>
                    </Box>
                </form>
                    
                </Box>
            </Container>
        </>
    );
}