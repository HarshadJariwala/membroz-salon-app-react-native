import Axios from '../../helpers/appConfig';

export const ServiceList = () => {
    const body = {
        "search":
            [
                { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
                { "searchfield": "formid", "searchvalue": "5e426741d466f1115c2e7d50", "criteria": "eq", "datatype": "objectId" }
            ],
        "select": [
            {
                "fieldname": "property",
                "value": "1"
            }
        ],
        "formname": "treatment"
    }
    return Axios.post('formdatas/filter', body);
}

export const ServiceTypeList = (id) => {
    let body
    if (id != null && id != undefined) {
        body =
        {
            "search":
                [
                    { "searchfield": "category", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" },
                    { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }
                ]
        }
    }
    else {
        body =
        {
            "search":
                [
                    { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }
                ]
        }
    }
    return Axios.post('services/filter', body);
}