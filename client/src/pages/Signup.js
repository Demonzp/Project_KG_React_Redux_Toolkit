import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import ValidationsErrors from '../constants/validationErrors';
import useAuth from '../hooks/useAuth';
import FormErrorAlert from '../components/FormErrorAlert';
import { useHistory } from 'react-router-dom';
import RouteNames from '../constants/routeNames';

const Signup = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm();
  const { isLoading, signup } = useAuth();
  const history = useHistory();

  const onSubmit = (data) => {
    if(data.confirmPassword!==data.password){
      setError('confirmPassword', {
        type: 'equel',
        message: ValidationsErrors.CONFIRM_PASSWORD.equel
      });
      return;
    }

    signup(data)
      .then(()=>history.push(RouteNames.SIGNIN))
      .catch((err)=>console.error(err.message));
  };

  return (
    <Card outline color='secondary'>
      <CardHeader>
        <h1>Registration</h1>
        Please fill the fields below:
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="login">Login:</Label>
            <Controller
              name="login"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <Input {...field} placeholder="Alex" />}
            />
            <FormErrorAlert keyField="login" error={errors} decrypt={ValidationsErrors.LOGIN}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail:</Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              render={({ field }) => <Input {...field} placeholder="example@email.com" />}
            />
            <FormErrorAlert keyField="email" error={errors} decrypt={ValidationsErrors.EMAIL}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true, minLength: 3, maxLength: 20 }}
              render={({ field }) => <Input {...field} type="password" />}
            />
            <FormErrorAlert keyField="password" error={errors} decrypt={ValidationsErrors.PASSWORD}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Confirm Password:</Label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <Input {...field} type="password" />}
            />
            <FormErrorAlert keyField="confirmPassword" error={errors} decrypt={ValidationsErrors.CONFIRM_PASSWORD}/>
          </FormGroup>
          <br />
          {
            isLoading ?
              <div>Loading...</div>
              :
              <Button outline color="success" type="submit">SUBMIT</Button>
          }
        </Form>
      </CardBody>
    </Card>
  );
};

export default Signup;