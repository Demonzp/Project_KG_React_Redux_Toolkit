import { Fragment, useState } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { useAddEmployeeMutation, useEditEmployeeMutation, useGetEmployeesQuery } from '../services/employees';
import SimplePaginator from '../components/SimplePaginator';
import SimplePaginLimit from '../components/SimplePaginLimit';
import CustomModal from '../components/CustomModal';
import FormEmployee from '../components/FormEmployee';
import useModalForm from '../hooks/useModalForm';
import EmployeeItem from '../components/EmployeeItem';

const Employees = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const { data: { employees, pages, forcePage } = { employees: [], pages: 1, forcePage: 1 }, isLoading } = useGetEmployeesQuery({ page, limit });

  const [selectEditEmployee, setSelectEditEmployee] = useState(null);

  const { func: addEmployee, modal: modalAdd, toggleModal: toggleModalAdd, isLoading: isLoadingAdd } = useModalForm(useAddEmployeeMutation);
  const { func: editEmployee, modal: modalEdit, toggleModal: toggleModalEdit, isLoading: isLoadingEdit } = useModalForm(useEditEmployeeMutation);

  const openEditModal = (_id) => {
    const employee = employees.find(empl => empl._id === _id);
    setSelectEditEmployee(employee);
    toggleModalEdit();
  };

  const handleEditEmployee = (data) => {
    editEmployee({ data: { ...data, _id: selectEditEmployee._id }, overData: { page, limit } });
  };

  const handleAddEmployee = (data) => {
    addEmployee(data);
  };

  return (
    <Fragment>
      <br />
      <h1>List of Employees</h1>
      <br />
      <Button color='success' outline onClick={toggleModalAdd}>ADD NEW EMPLOYEE</Button>
      <br />
      <br />
      <CustomModal
        modal={modalEdit}
        toggleModal={toggleModalEdit}
        textHeader="Edit Employee"
        modalHandler={handleEditEmployee}
        isLoading={isLoadingEdit}
      >
        <FormEmployee employee={selectEditEmployee} />
      </CustomModal>

      <CustomModal
        modal={modalAdd}
        toggleModal={toggleModalAdd}
        textHeader="Add Employee"
        modalHandler={handleAddEmployee}
        isLoading={isLoadingAdd}
      >
        <FormEmployee employee={{ name: '', sex: '', birthday: null, salary: '', position: '', contacts: '' }} />
      </CustomModal>
      <Row>
        <Col xs="3">
          <SimplePaginLimit arrLimit={[2, 3, 5, 10]} onChange={setLimit} />
        </Col>

        <Col>
          <SimplePaginator onPage={setPage} pages={pages} forcePage={forcePage}/>
        </Col>

      </Row>
      <Table bordered striped size='sm'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>SEX</th>
            <th>BIRTHDAY</th>
            <th>CONTACTS</th>
            <th>POSITION</th>
            <th>SALARY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {
            !isLoading ?
              employees.map((employee) => (
                <EmployeeItem 
                  key={employee._id}
                  employee={employee} 
                  isLoadingEdit={isLoadingEdit}
                  openEditModal={openEditModal}
                />
              ))
              :
              null
          }
        </tbody>
      </Table>
      {
        isLoading?
        <div>Loading...</div>
        :
        null
      }
    </Fragment>
  );
};

export default Employees;