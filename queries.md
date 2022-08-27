# social-network-graphql

## Queries

Request URL: `http://localhost:4000`
Query type: `POST`
Query & Variables location: Body > GraphQL

Query all users

```graphql
query Users {
  users {
    id
    firstName
    lastName
    email
    accountType
  }
}
```

Note: In "Tests" section, create variables `carerId` and `patientId` from the response (for use in subsequent queries)

Query for user by ID:

```graphql
query UserInfo($userId: ID!) {
  userInfo(userId: $userId) {
    id
    firstName
    lastName
    email
    accountType
  }
}
```

variables

```json
{
  "userId": "{{patientId}}"
}
```

Query all appointments (practice only - not needed for app)

```graphql
query Appointments {
  appointments {
    id
    patientId
    carerId
    start
    end
    status
    actualStart
    actualEnd
  }
}
```

Query for dashboard

```graphql
query CarerDashboard($userId: ID!) {
  carerDashboard(userId: $userId) {
    carer {
      userId
      postcode
      days
      notificationCount
    }
    appointments {
      id
      patientId
      carerId
      start
      end
      status
      actualStart
      actualEnd
    }
    notifications {
      notificationDate
      receiverId
      senderId
      isRead
      notificationText
    }
  }
}
```

variables

```json
{
  "userId": "{{carerId}}"
}
```

```graphql
query PatientDashboard($userId: ID!) {
  patientDashboard(userId: $userId) {
    patient {
      userId
      postcode
      days
      notificationCount
    }
    appointments {
      id
      patientId
      carerId
      start
      end
      status
      actualStart
      actualEnd
    }
    notifications {
      notificationDate
      receiverId
      senderId
      isRead
      notificationText
    }
  }
}
```

variables

```json
{
  "userId": "{{patientId}}"
}
```

Query for matching patients - by carer gender only, or by carer gender and day of week

```graphql
query FindPatientsByCarergender($userId: ID!) {
  findPatientsByCarergender(userId: $userId) {
      userId {
          id
          firstName
          lastName
          email
      }
      gender
      postcode
      days
      notificationCount
      appointmentCount
    }
```

variables

```json
{
  "userId": "{{carerId}}"
}
```

```graphql
query FindPatientsByCarergenderAndDay($userId: ID!, $dayInput: DayInput) {
  findPatientsByCarergenderAndDay(userId: $userId, dayInput: $dayInput) {
    userId {
      id
      firstName
      lastName
      email
    }
    gender
    postcode
    days
    notificationCount
    appointmentCount
  }
}
```

variables

```json
{
  "userId": "{{carerId}}",
  "dayInput": {
    "date": "2022-09-21T07:00:00.000+00:00"
  }
}
```

Query for signing up as a new user (patient account type):

```graphql
mutation Mutation($signupInput: SignupInput!) {
  signup(signupInput: $signupInput) {
    success
    user {
      id
      firstName
      lastName
      email
    }
  }
}
```

variables:

```json
{
  "signupInput": {
    "firstName": "{{$randomFirstName}}",
    "lastName": "{{$randomLastName}}",
    "email": "{{$randomExampleEmail}}",
    "password": "Password123!",
    "accountType": "patient"
  }
}
```

Query for setting up the new profile (account type patient if done by patient after signup (2nd page of form) - or account type carer if entered by supervisor):

```graphql
mutation Mutation($patientInput: PatientInput!) {
  patientSetup(patientInput: $patientInput) {
    success
    patient {
      username
    }
    userId
  }
}
```

variables:

```json
{
  "patientInput": {
    "userId": "{{newUserId}}",
    "gender": "female",
    "genderPreference": "none",
    "username": "{{username}}",
    "postcode": "B29 5PZ",
    "days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ]
  }
}
```

Query for logging in (any account type):

```graphql
mutation Mutation($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    success
    token
    user {
      id
      firstName
      lastName
      email
      accountType
    }
  }
}
```

variables:

```json
{
  "loginInput": {
    "email": "{{userEmail}}",
    "password": "Password123!"
  }
}
```
