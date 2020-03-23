db.createUser(
    {
        user: "sudokers",
        pwd: "sudokers",
        roles: [
            {
                role: "readWrite",
                db: "sudokers"
            }
        ]
    }
);