import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

const AppAlerts = () => {
  const { messages } = useSelector(state => state.appAlerts);

  return (
    <Fragment>
      {messages.map(msg => {
        return (
          <Alert key={msg.id} color={msg.type}>
            {msg.text}
          </Alert>
        );
      })}
    </Fragment>
  );
};

export default AppAlerts;