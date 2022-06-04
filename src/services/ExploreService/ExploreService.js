import Axios from '../../helpers/appConfig';

export const ExpoloreFilterService = () => {
    const body =
    {
        "search": [
            { "searchfield": "formid", "searchvalue": "621c7241c908ab0b20515f5c", "criteria": "eq", "datatype": "ObjectId" },
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }, { "formname": "explore" }]
    }
    return Axios.post('formdatas/filter', body)
}