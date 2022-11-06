import { FC } from 'react';
import ufo from '../../assets/images/ufo.png';

export const UFO: FC = () => {
  return (
    <>
      <div className="row">
        <h2 className="col">Page not found</h2>
      </div>
      <div className="row">
        <img src={ufo} alt="Page not found" className="w-50" />
      </div>
    </>
  );
};
