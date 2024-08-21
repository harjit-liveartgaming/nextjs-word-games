export const users = [
    {   
        "id":"410544b2-4001-4271-9855-fec4b6a6442a",
        "displayName": "Harjit",
        "email": "Harjit@test.com",
        "password": "test"
    },
    {
        "id": "120544b2-4002-4273-9755-fec4b6a6442b",
        "displayName": "Valentina Dibs",
        "email": "tina@test.com",
        "password": "test"
    }

];

export const challenges = [
    {
        "author": users[0].id,
        "word": "level",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "author": users[1].id,
        "word": "stare",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "author": users[0].id,
        "word": "doggy",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "author": users[1].id,
        "word": "author",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "author":users[0].id,
        "word": "tries",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "author": users[1].id,
        "word": "eerie",
        "attempts": 6,
        "expiration":"2024-10-01"
    }
]