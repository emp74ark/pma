import { FC, useState } from 'react';
import { fakeUser } from './User.props';
import { UserForm } from './UserForm';

export const User: FC = () => {
  const { name, login } = fakeUser;
  const [formVisibility, setFormVisibility] = useState(false);

  return (
    <>
      {!formVisibility && (
        <>
          <h2>{name}</h2>
          <h3>Email: {login}</h3>
          <button className="btn btn-primary" onClick={() => setFormVisibility(true)}>
            Edit
          </button>
        </>
      )}
      {formVisibility && (
        <>
          <UserForm />
          <button className="btn btn-warning" onClick={() => setFormVisibility(false)}>
            Cancel
          </button>
        </>
      )}
    </>
  );
};
