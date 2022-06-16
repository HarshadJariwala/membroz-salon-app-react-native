import Axios from '../../helpers/appConfig'

function SliderService() {
    const body = {
        'search': [{
            'searchfield': 'status',
            'searchvalue': 'active',
            'criteria': 'eq',
            'datatype': 'text'
        }, {
            'searchfield': 'formid',
            'searchvalue': '6083be0b94adcc2da269c7e6',
            'criteria': 'eq',
            'datatype': 'objectId'
        }]
    }
    return Axios.post('formdatas/filter', body);
}

export default SliderService;
