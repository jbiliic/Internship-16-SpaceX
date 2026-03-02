import React from 'react';
import LoadingCircle from '../components/loadingCircle/LoadingCircle';

interface WithLoadingProps {
  isLoading: boolean;
}

export function withLoading<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T & WithLoadingProps) => {
    const { isLoading, ...remainingProps } = props;

    if (isLoading) {
      return <LoadingCircle />;
    }
    return <WrappedComponent {...(remainingProps as T)} />;
  };
}