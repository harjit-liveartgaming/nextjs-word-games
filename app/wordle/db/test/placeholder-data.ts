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
        "id": "11111111-1111-1111-1111-11111111",
        "author": users[0].id,
        "word": "level",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "id": "22222222-2222-2222-2222-22222222",
        "author": users[1].id,
        "word": "stare",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "id": "33333333-3333-3333-3333-33333333",
        "author": users[0].id,
        "word": "doggy",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "id": "444444444-4444-4444-4444-44444444",
        "author": users[1].id,
        "word": "author",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "id": "55555555-5555-5555-5555-55555555",
        "author":users[0].id,
        "word": "tries",
        "attempts": 6,
        "expiration":"2024-10-01"
    },
    {
        "id": "66666666-6666-6666-6666-66666666",
        "author": users[1].id,
        "word": "eerie",
        "attempts": 6,
        "expiration":"2024-10-01"
    }
]