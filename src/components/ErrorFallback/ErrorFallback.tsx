import { FallbackProps } from 'react-error-boundary';
import { Alert, Button } from 'react-bootstrap';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const ErrorFallback: FC<FallbackProps> = (props) => {
  const { t } = useTranslation();
  const { error, resetErrorBoundary } = props;
  return (
    <Alert>
      <h2>{t('errorFallback.wrong')}</h2>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>{t('errorFallback.tryAgain')}</Button>
    </Alert>
  );
};
