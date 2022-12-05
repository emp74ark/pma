import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import dashboard from './../../assets/images/welcomeDashboard.png';
import darkDashboard from './../../assets/images/welcomeDashboardDark.png';
import simpleInterface from './../../assets/animations/interface.gif';
import infinityBoards from './../../assets/animations/infinity.gif';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { motion } from 'framer-motion';
import { DeveloperCard } from '../../components/DeveloperCard/DeveloperCard';
import andrey_gudin from '../../assets/images/developers/andrey_gudin.jpg';
import andrei_yurkouski from '../../assets/images/developers/andrei_yurkouski.jpg';
import daniil_khlybov from '../../assets/images/developers/daniil_khlybov.jpg';
import { fromAbove, fromBelow, fromLeft, fromRight } from './animations';

export const Welcome: FC = () => {
  const {
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const { t } = useTranslation();
  return (
    <motion.div
      className="container flex-fill"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="d-flex justify-content-center align-items-center flex-wrap min-vh-75">
        <motion.div variants={fromLeft} className="col-lg-5 col-sm-12">
          <h2>{t('welcome.title')}</h2>
          <p>{t('welcome.description')}</p>
        </motion.div>
        <motion.div
          variants={fromRight}
          className="d-flex col-lg-7 col-sm-12 justify-content-center"
        >
          <img
            className="w-100 ms-2 mt-4 shadow rounded"
            src={theme === 'light' ? dashboard : darkDashboard}
            alt="Dashboard"
          />
        </motion.div>
      </div>
      <motion.h3 variants={fromAbove} className="text-center mb-4 mt-5 mb-md-5">
        {t('welcome.advantages')}
      </motion.h3>
      <div
        className="d-flex align-items-center justify-content-center flex-md-row flex-column-reverse mb-5"
        style={{ height: 'auto' }}
      >
        <motion.div variants={fromLeft} className="col-md-8 col-12">
          <img
            className="w-100 ms-md-2 shadow rounded"
            src={simpleInterface}
            alt="Simple Interface"
          />
        </motion.div>
        <motion.div
          variants={fromRight}
          className="col-md-4 col-12 ms-md-5 mb-3 mb-md-0 text-center"
        >
          <h5>{t('welcome.interface')}</h5>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        className="d-flex align-items-center justify-content-center flex-md-row flex-column"
        style={{ height: 'auto' }}
      >
        <motion.div
          variants={fromLeft}
          className="col-md-4 col-12 me-md-5 mb-3 mb-md-0 text-center"
        >
          <h5>{t('welcome.infinityBoards')}</h5>
        </motion.div>
        <motion.div variants={fromRight} className="col-md-8 col-12">
          <img
            className="w-100 ms-md-2 shadow rounded"
            src={infinityBoards}
            alt="Infinity Boards"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="d-flex flex-column align-items-center gap-1"
      >
        <motion.h3 variants={fromAbove} className="mb-4 mt-5 mb-md-5">
          {t('info.team')}
        </motion.h3>
        <motion.div variants={fromBelow} className="d-flex justify-content-lg-around gap-2 w-100">
          <DeveloperCard
            name={t('info.SteGlaset_name')}
            text={t('info.SteGlaset_info')}
            src={daniil_khlybov}
          />
          <DeveloperCard
            name={t('info.yurkouski_name')}
            text={t('info.yurkouski_info')}
            src={andrei_yurkouski}
          />
          <DeveloperCard
            name={t('info.gudin_name')}
            text={t('info.gudin_info')}
            src={andrey_gudin}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
