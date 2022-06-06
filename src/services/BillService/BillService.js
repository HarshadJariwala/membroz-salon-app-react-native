import Axios from '../../helpers/appConfig'

function BillService(data) {
    const body = JSON.stringify(data)
    return Axios.post('bills', body);
}

function BillPaymentService(data) {
    const body = JSON.stringify(data)
    return Axios.post('billpayments', body);
}

function BillListService(id) {
    let body =
    {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "Unpaid",
                "criteria": "eq",
                "datatype": "text",
                "cond": "or"
            },
            {
                "searchfield": "status",
                "searchvalue": "Paid",
                "criteria": "eq",
                "datatype": "text",
                "cond": "or"
            },
            {
                "searchfield": "customerid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "objectId"
            },
            {
                "searchfield": "type",
                "searchvalue": "Wallet",
                "criteria": "eq",
                "datatype": "text"
            }
        ],
        "formname": "bill"
    }
    return Axios.post('bill/filter', body);
}

function WallettxnsListService(id) {
    let body =
    {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "customerid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "objectId"
            }
        ],
        "formname": "wallettxn"
    }
    return Axios.post('wallettxns/filter', body);
}

function WalletDetailService(id) {
    let body =
    {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "_id",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "objectId"
            }
        ],
        "formname": "member",
        "viewname": "memberviews",
        "searchtext": ""
    }
    return Axios.post('members/filter', body);
}

function WalletUsageListService(id) {
    let body =
    {
        "viewname": "bi-billspent",
        "formname": "formdata",
        "search": [{ "searchfield": "customerid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }]
    }
    return Axios.post('branches/view/filter', body);
}

function WalletRechargeWithCouponService(data) {
    const body = JSON.stringify(data)
    return Axios.post('wallettxns', body);
}

function WalletRefershService(data) {
    const body = JSON.stringify(data)
    return Axios.post('wallettxns', body);
}

function MySpendService(id) {
    let body =
    {
        "search": [{
            "searchfield": "addedby",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "objectId"
        }, {
            "searchfield": "formid",
            "searchvalue": "61961b5ba83abc153c7f3d42",
            "criteria": "eq",
            "datatype": "objectId"
        }], "sort": { "createdAt": -1 }
    }
    return Axios.post('formdatas/filter', body);
}

export {
    BillService, BillListService, WalletDetailService, WalletUsageListService,
    BillPaymentService, WalletRechargeWithCouponService, WalletRefershService,
    MySpendService, WallettxnsListService
};