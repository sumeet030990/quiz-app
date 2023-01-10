import { isUndefined } from "lodash";

const ErrorContainer = ({ errorMessage, children }) => {
  try {
    if (errorMessage) {
      return (
        <>
          <h3>Oops there's an error in application</h3>
          <h4>Details: {errorMessage}</h4>
        </>
      );
    } else if (!isUndefined(children)) {
      return children;
    }

    return "";
  } catch (error) {
    return <>{error.message}</>;
  }
};

ErrorContainer.defaultProps = {
  errorMessage: '',
};
export default ErrorContainer;
