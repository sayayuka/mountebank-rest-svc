const settings = require('../settings');

function addService(mbHelper) {
    const stubs = [
        {
            predicates: [{ contains: { path: "nonExistentUser" } }],
            responses: [{ is: { body: [] } }]
        },
        {
            predicates: [{
                and: [
                    { equals: { method: "GET" } },
                    { startsWith: { "path": settings.odata_v4_path + settings.get_user} }
                ]
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: ['{ "userId": "${row}[USERS_SYS_ID]", "userName": "${row}[USERS_SYS_USERNAME]", "userLastName": "${row}[USERS_SYS_LASTNAME]", "userFirstName": "${row}[USERS_SYS_FIRSTNAME]", "mi": "${row}[USERS_SYS_MI]", "userManagerId": "${row}[USERS_SYS_MANAGERUID]", "email": "${row}[USERS_SYS_EMAIL]", "valid": "${row}[USERS_SYS_VALID]" }']
                    },
                    _behaviors: {
                        lookup: [
                            {
                                "key": {
                                  "from": "path",
                                  "using": { "method": "regex", "selector": settings.odata_v4_path + settings.get_user + "(.*)$" },
                                  "index": 1
                                },
                                "fromDataSource": {
                                  "csv": {
                                    "path": "data/users.csv",
                                    "keyColumn": "USERS_SYS_ID"
                                  }
                                },
                                "into": "${row}"
                              }
                        ]
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.odata_user_service_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };