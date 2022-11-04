import { FC } from 'react';
import kanban from '../../assets/images/kanban.png';
import monitoring from '../../assets/images/monitoring.png';

export const Welcome: FC = () => {
  return(
    <>
      <h2>Welcome</h2>
      <img src={kanban} alt="Kanban" />
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod dolor temporibus sed quasi repudiandae dignissimos quis suscipit assumenda dolore quae!</p>
      <img src={monitoring} alt="Monitoring" />
    </>
  );
};
