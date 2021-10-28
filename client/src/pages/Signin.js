import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import ValidationsErrors from '../constants/validationErrors';
import useAuth from '../hooks/useAuth';
import FormErrorAlert from '../components/FormErrorAlert';

const Signin = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { signin, isLoading } = useAuth();

  const onSubmit = (data) => {
    signin(data);
  }

  return (
    <Card outline color='secondary'>
      <CardHeader>
        <h1>Authorization</h1>
        Please fill the fields below:
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <br />
          {
            isLoading?
              <div>Loading...</div>
            :
              <Button outline color="success" type="submit">SUBMIT</Button>
          }
        </Form>
      </CardBody>
    </Card>
  );
};

export default Signin;