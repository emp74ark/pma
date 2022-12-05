import { FC } from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { openModal } from '../../redux/modalSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface ItemActionProps {
  item: string;
  callback?: () => void;
}

export const ItemActions: FC<ItemActionProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const addBoardHadle = () => {
    dispatch(openModal({ name: 'addBoard', data: null }));
  };

  return (
    <Row className="justify-content-center">
      <ButtonGroup size="sm" className="col-auto">
        <Button variant="secondary" onClick={addBoardHadle}>
          {t('dashboard.addBoard')}
        </Button>
        {props.item === 'column' && (
          <Button variant="secondary" onClick={props.callback}>
            {t('board.addColumn')}
          </Button>
        )}
      </ButtonGroup>
    </Row>
  );
};
