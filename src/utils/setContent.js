import Spinner from "../Components/spinner/Spinner";
import Page404 from "../Components/errorMessage/ErrorMessage";

const setContent = (process, Component, props) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return <Spinner />;
            break;
        case 'confirmed':
            return <Component {...props}/>;
            break;
        case 'error':
            return <Page404 />;
            break;
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent;