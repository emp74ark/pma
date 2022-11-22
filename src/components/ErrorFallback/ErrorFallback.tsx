import { FallbackProps } from 'react-error-boundary';
import { Alert, Button } from 'react-bootstrap';
import { FC } from 'react';

export const ErrorFallback: FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props;
  return (
    <Alert>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Alert>
  );
};
