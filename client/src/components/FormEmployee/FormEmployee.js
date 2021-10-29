import { useEffect, useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import FormErrorAlert from '../FormErrorAlert';
import ValidationsErrors from '../../constants/validationErrors';
import { employeeSex } from '../../constants/employeeSex';

const FormEmployee = ({ employee, onSubmit, isSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const refEl = useRef();

  const errorCallback = ()=>{
    if(Object.keys(errors).length>0){
      onSubmit();
    }
  };

  useEffect(() => {
    if(isSubmit){
      refEl.current.click();
      errorCallback();
    }
  }, [isSubmit]);

  useEffect(()=>{
    errorCallback();
  }, [errors]);

  return (
    <Card outline color='secondary'>
      <CardHeader>
        Please fill the fields below:
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Controller
              name="name"
              control={control}
              defaultValue={employee.name}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} placeholder="Vasya" />}
            />
            <FormErrorAlert keyField="name" error={errors} decrypt={ValidationsErrors.LOGIN} />
          </FormGroup>
          <FormGroup>
            <Label for="sex">Sex:</Label>
            <Controller
              name="sex"
              control={control}
              defaultValue={employee.sex}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Input {...field} type="select">
                    <option key={-1} value="">----Select Sex---</option>
                    {
                      employeeSex.map(sex => <option key={sex} >{sex}</option>)
                    }
                  </Input>
                );
              }}
            />
            <FormErrorAlert keyField="sex" error={errors} decrypt={ValidationsErrors.LOGIN} />
          </FormGroup>
          <FormGroup>
            <Label for="birthday">Birthday:</Label>
            <Controller
              name="birthday"
              control={control}
              defaultValue={employee.birthday}
              rules={{ required: true, valueAsDate: true }}
              render={({ field }) => <Input {...field} type="date" />}
            />
            <FormErrorAlert keyField="birthday" error={errors} decrypt={ValidationsErrors.LOGIN} />
          </FormGroup>
          <FormGroup>
            <Label for="contacts">Contacts:</Label>
            <Controller
              name="contacts"
              control={control}
              defaultValue={employee.contacts}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} type='textarea' />}
            />
            <FormErrorAlert keyField="contacts" error={errors} decrypt={ValidationsErrors.LOGIN} />
          </FormGroup>
          <FormGroup>
            <Label for="position">Position:</Label>
            <Controller
              name="position"
              control={control}
              defaultValue={employee.position}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorAlert keyField="position" error={errors} decrypt={ValidationsErrors.LOGIN} />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Salary:</Label>
            <Controller
              name="salary"
              control={control}
              defaultValue={employee.salary}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} placeholder="1000.00" />}
            />
            <FormErrorAlert keyField="salary" error={errors} decrypt={ValidationsErrors.LOGIN} />
          </FormGroup>
          <br />
          <button ref={refEl} style={{visibility:"hidden"}} type="submit">Submit</button>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormEmployee;