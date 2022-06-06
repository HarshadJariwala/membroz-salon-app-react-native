import Axios from '../../helpers/appConfig';

export const getAllWorkOutListService = () => {
    let body = {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        },
        {
            "searchfield": "formid",
            "searchvalue": "60af51ea12b3771364ec5bc8",
            "criteria": "eq",
            "datatype": "objectId"
        },
        {
            "searchfield": "memberid",
            "searchvalue": false,
            "criteria": "exists",
            "datatype": "boolean"
        }
        ],
        "formname": "weekschedule"
    }
    return Axios.post('weekschedules/filter', body);
}

export const getMyWorkOutListService = (id, date) => {
    let body = {
        "search": [
            {
                "searchfield": "formid",
                "searchvalue": "628f2a7afe0e483e932240f6",
                "criteria": "eq",
                "datatype": "objectId"
            },
            {
                "searchfield": "contextid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "objectId"
            },
            {
                "searchfield": "property.myexecisedate",
                "searchvalue": date,
                "criteria": "eq",
                "datatype": "text"
            }
            // {
            //     "searchfield": "createdAt",
            //     "searchvalue": date,
            //     "criteria": "gte",
            //     "datatype": "Date",
            //     "cond": "and"
            // },
            // {
            //     "searchfield": "createdAt",
            //     "searchvalue": date,
            //     "criteria": "lte",
            //     "datatype": "Date",
            //     "cond": "and"
            // },
        ],
        "formname": "myexercise"
    }
    return Axios.post('formdatas/filter', body);
}

export const addMyWorkOutService = (body) => {
    JSON.stringify(body);
    return Axios.post('formdatas', body)
}

export const updateMyWorkOutService = (id, body) => {
    JSON.stringify(body);
    return Axios.patch('formdatas/' + id, body)
}