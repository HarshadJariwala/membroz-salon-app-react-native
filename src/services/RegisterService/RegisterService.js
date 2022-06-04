import Axios from '../../helpers/appConfig';

export const RegisterService = (body) => {
    return Axios.post('enquiries', body);
}