import Axios from '../../helpers/appConfig';

export const getLastAssessmentService = (id) => {
    const body =
    {
        "search": [
            {
                "searchfield": "formid",
                "searchvalue": "60127bc4ac99d51e387bd64d",
                "criteria": "eq",
                "datatype": "ObjectId"
            },
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "contextid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ],
        "select": [
            {
                "fieldname": "property",
                "value": "1"
            },
            {
                "fieldname": "createdAt",
                "value": "1"
            }
        ],
        "formname": "assessments",
        "sort": { "createdAt": -1 },
        "size": 1
    }
    return Axios.post('formdatas/filter', body)
}

export const getLastSevenDayAssessmentService = (id) => {
    const body =
    {
        "search": [
            {
                "searchfield": "formid",
                "searchvalue": "60127bc4ac99d51e387bd64d",
                "criteria": "eq",
                "datatype": "ObjectId"
            },
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "contextid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ],
        "select": [
            {
                "fieldname": "property",
                "value": "1"
            },
            {
                "fieldname": "createdAt",
                "value": "1"
            }
        ],
        "formname": "assessments",
        "sort": { "createdAt": 1 },
        "size": 7
    }
    return Axios.post('formdatas/filter', body)
}

export const getAllAssessmentService = (id) => {
    const body =
    {
        "search": [
            {
                "searchfield": "formid",
                "searchvalue": "60127bc4ac99d51e387bd64d",
                "criteria": "eq",
                "datatype": "ObjectId"
            },
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "contextid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ],
        "select": [
            {
                "fieldname": "property",
                "value": "1"
            },
            {
                "fieldname": "createdAt",
                "value": "1"
            }
        ],
        "formname": "assessments",
        "sort": { "createdAt": -1 }
    }
    return Axios.post('formdatas/filter', body)
}

export const addAssessmentService = (body) => {
    JSON.stringify(body);
    return Axios.post('formdatas', body)
}


