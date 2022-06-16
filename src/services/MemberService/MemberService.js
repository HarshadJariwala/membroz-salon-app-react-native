import Axios from '../../helpers/appConfig';

export const getByIdMemberService = (id) => {
    return Axios.get('members/' + id);
}

export const getByIdUserService = (id) => {
    return Axios.get('users/' + id);
}

export const getByMembershipService = (id) => {
    const body = {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "datatype": "text",
                "criteria": "eq"
            },
            {
                "searchfield": "property.type",
                "searchvalue": "package",
                "datatype": "text",
                "criteria": "ne"
            },
            {
                "searchfield": "branchid",
                "searchvalue": id,
                "datatype": "ObjectId",
                "criteria": "eq"
            }
        ]
    }
    return Axios.post('memberships/filter', body);
}

export const getPackageService = (id) => {
    const body = {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "datatype": "text",
                "criteria": "eq"
            },
            {
                "searchfield": "property.type",
                "searchvalue": "package",
                "datatype": "text",
                "criteria": "eq"
            },
            {
                "searchfield": "branchid",
                "searchvalue": id,
                "datatype": "ObjectId",
                "criteria": "eq"
            }
        ]
    }
    return Axios.post('memberships/filter', body);
}

export const patchMemberService = (id, body) => {
    JSON.stringify(body);
    return Axios.patch('members/' + id, body);
}

export const CheckMemberService = (body) => {
    return Axios.post('public/checkmember', body);
}

export const getMembershipOfferService = (id) => {
    const body = {
        "search": [
            {
                "searchfield": "formid",
                "searchvalue": "60deb6f4761d7a1cbf5df0e8",
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
                "searchvalue": { id },
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ]
    }
    return Axios.post('formdatas/filter', body);
}