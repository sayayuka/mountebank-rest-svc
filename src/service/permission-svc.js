const settings = require('../settings');

function addService(mbHelper) {
    const stubs = [
        {
            predicates: [
                {
                    method: "POST",
                    path: settings.permission_rest_check_user_privilege_path,
                    matches: {
                        body: { 
                            "accessUserId": "^(userA)$", 
                            "permLongValue": "[\s\S]*", 
                            "permStringValue": "[\s\S]*", 
                            "permType": "[\s\S]*", 
                            "targetUserIds": []
                        }
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: { "hasPermission": false }
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    method: "POST",
                    path: settings.permission_rest_check_user_privilege_path,
                    matches: { 
                        body: { 
                            "accessUserId": "^((?!userA).*|userA.+)$", 
                            "permLongValue": "^(-)?[0-9]*$", 
                            "permStringValue": "^(Activity)$", 
                            "permType": "^(?:CREATE|EDIT|VIEW)$", 
                            "targetUserIds": []
                        } 
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: { "hasPermission": true }
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    method: "POST",
                    path: settings.permission_rest_check_user_privilege_path,
                    matches: {
                        body: { 
                            "accessUserId": "^((?!userA).*|userA.+)$", 
                            "permLongValue": "[\s\S]*", 
                            "permStringValue": "^((?!Activity).*|Activity.+)$", 
                            "permType": "[\s\S]*", 
                            "targetUserIds": []
                        }
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: { "hasPermission": false, "code": 10001, "message": "Entity is not support!" }
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    method: "POST",
                    path: settings.permission_rest_check_user_privilege_path,
                    matches: {
                        body: { 
                            "accessUserId": "^((?!userA).*|userA.+)$", 
                            "permLongValue": "[\s\S]*", 
                            "permStringValue": "[\s\S]*", 
                            "permType": "^(?!(?:CREATE|EDIT|VIEW)).*|((?:CREATE|EDIT|VIEW).+)$", 
                            "targetUserIds": []
                        } 
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: { "hasPermission": false, "code": 10002, "message": "Permission type is not support!" }
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    method: "POST",
                    path: settings.permission_rest_check_user_privilege_path,
                    matches: {
                        body: { 
                            "accessUserId": "^((?!userA).*|userA.+)$", 
                            "permLongValue": "[^0-9]*", 
                            "permStringValue": "[\s\S]*", 
                            "permType": "[\s\S]*", 
                            "targetUserIds": []
                        } 
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: { "hasPermission": false, "code": 10003, "message": "Invalid long value!" }
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.rest_permission_service_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };