import Spinner from "../Components/spinner/Spinner";
import Page404 from "../Components/errorMessage/ErrorMessage";

const setContent = (process, Component, props, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component {...props}/> : null;
        case 'confirmed':
            return <Component {...props}/>;
        case 'error':
            return <Page404 />;
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent;