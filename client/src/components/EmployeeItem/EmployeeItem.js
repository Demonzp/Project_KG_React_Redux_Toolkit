import { Fragment, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDelEmployeeMutation } from '../../services/employees';

const EmployeeItem = ({ employee, isLoadingEdit, openEditModal}) => {
  const [del, {isLoading: isLoadingDel}] = useDelEmployeeMutation();

  useEffect(()=>{
    if(!isLoadingDel){
      setIsLoading(false);
    }
  }, [isLoadingDel]);

  const [isOpened, setIsOpened] = useState(false);

  useEffect(()=>{
    if(!isLoadingEdit){
      setIsLoading(false);
    }else if(isOpened){
      setIsLoading(true);
      setIsOpened(false);
    }
  }, [isLoadingEdit, isOpened]);

  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = ()=>{
    openEditModal(employee._id);
    setIsOpened(true);
  };

  const handleDel = ()=>{
    del(employee._id);
    setIsLoading(true);
  };

  return (
    <tr>
      {
        !isLoading?
          <Fragment>
            <td>{employee.name}</td>
            <td>{employee.sex}</td>
            <td>{employee.birthday}</td>
            <td>{employee.contacts}</td>
            <td>{employee.position}</td>
            <td>{employee.salary}</td>
            <td>
              <Button color='secondary' size='sm' className='mr-2' outline onClick={handleEdit}>EDIT</Button>{' '}
              <Button color='danger' size='sm' outline onClick={handleDel}>DELETE</Button>
            </td>
          </Fragment>
        :
        "Loading..."
      }
    </tr>
  );
};

export default EmployeeItem;