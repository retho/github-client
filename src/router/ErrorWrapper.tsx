import React from 'react';

export type ErrorWrapperProps = {
  onError: (err: unknown, errInfo: unknown) => void;
};
class ErrorWrapper extends React.Component<ErrorWrapperProps> {
  componentDidCatch(err: unknown, errInfo: unknown) {
    this.props.onError(err, errInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorWrapper;
