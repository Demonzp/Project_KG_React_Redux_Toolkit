import { Fragment } from 'react';
import { Alert } from 'reactstrap';

const FormErrorAlert = ({keyField, error, decrypt})=>{

  return(
    <Fragment>
      {
        error[keyField]?
          <Alert color="danger">
            {decrypt[error[keyField].type]}
          </Alert>
        :
          null
      }
    </Fragment>
  );
};

export default FormErrorAlert;