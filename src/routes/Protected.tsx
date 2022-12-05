import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SignIn } from '../pages/SignIn/SignIn';

export const Protected: FC<{ children: JSX.Element }> = ({ children }) => {
  const { auth } = useSelector((state: RootState) => state);

  return (
    <>
      {auth.login && children}
      {!auth.login && <SignIn />}
    </>
  );
};
