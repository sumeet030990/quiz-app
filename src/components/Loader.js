import { isUndefined } from "lodash";
import ErrorContainer from './Error';

const Loader = ({ isLoading, children }) => {
  try {
    if (isLoading) {
      return (
        <h3>Loading Questions ...</h3>
      );
    } else if (!isUndefined(children)) {
      return children;
    }

    return "";
  } catch (error) {
    return <ErrorContainer errorMessage={error.message}></ErrorContainer>;
  }
};

Loader.defaultProps = {
  isLoading: false,
};
export default Loader;
