# we-care-server - queries and mutations

This is a summary of all the queries and mutations already set up in the we-care-server backend, so they can be called in the frontend and passed the relevant variables.
More details available on these queries and mutations in the [we-care-server repo](https://github.com/C-Sim/we-care-server).

## 1-Queries

### 1.1-Query by ID

#### 1.1.1-Query users by ID

```graphql
query UserInfo {
  userInfo {
    id
    firstName
    lastName
    email
    accountType
    postcode
    phoneNumber
    address {
      fullAddress
    }
  }
}
```

no variables
user id from context

#### 1.1.2-Query Carer info by userId

```graphql
query CarerInfo {
  carerInfo {
    userId {
      id
      firstName
      lastName
      email
      accountType
      postcode
    }
    gender
    days
    notificationCount
    appointmentCount
  }
}
```

no variables
user id from context

#### 1.1.3-Query Patient info by userId

```graphql
query PatientInfo($userId: ID!) {
  patientInfo(userId: $userId) {
    userId {
      id
      firstName
      lastName
      email
      accountType
      postcode
    }
    gender
    days
    notificationCount
    appointmentCount
  }
}
```

variables:

```
{
    "userId": "{{patientId}}"
}
```

### 1.2-Query appointments

#### 1.2.1-Query appointments by userId (their own appointment)

Returns the appointment data including the patient's details (user details and patient details as needed) including their address/postcode for map pins

```graphql
query AppointmentsByUserId {
  appointmentsByUserId {
    id
    appointmentDate
    patientId {
      id
      firstName
      lastName
      postcode
      patientProfileId {
        gender
      }
    }
    carerId {
      id
      firstName
      lastName
    }
    start
    end
    status
  }
}
```

no variables
user id from context

#### 1.2.1-Query appointments by userId (carer or patient)

Returns the appointment data including the patient's details (user details and patient details as needed) including their address/postcode for map pins

```graphql
query AppointmentsByGivenUserId($userId: ID!) {
  appointmentsById(userId: $userId) {
    id
    appointmentDate
    patientId {
      id
      firstName
      lastName
      postcode
    }
    carerId {
      id
      firstName
      lastName
    }
    start
    end
    status
  }
}
```

#### 1.2.2-Query appointments by date range (for carer to build timeline and carer functions)

Returns the appointment data including the patient's details (user details and patient details as needed) including their address/postcode for map pins

```graphql
query AppointmentsForNextWorkingDay {
  appointmentsForNextWorkingDay {
    id
    appointmentDate
    patientId {
      id
      firstName
      lastName
      email
      postcode
      phoneNumber
      address {
        fullAddress
      }
      patientProfileId {
        gender
        genderPreference
      }
    }
    carerId {
      id
      firstName
      lastName
    }
    start
    end
    status
  }
}
```

#### 1.2.3-Query appointments by date range (for patient to build timeline and note function)

Returns the appointment data including the carer's details (user details and carer details as needed)

```graphql
query AppointmentsForNextWeek {
  appointmentsForNextWeek {
    id
    appointmentDate
    carerId {
      id
      firstName
      lastName
      email
      phoneNumber
      carerProfileId {
        gender
        genderPreference
      }
    }
    patientId {
      id
      firstName
      lastName
    }
    start
    end
    status
  }
}
```

#### 1.2.4-Query all past notes from appointments by patientId

Uses an appointment query but targets different fields for the response

```graphql
query AppointmentNotesByUserId($userId: ID!) {
  appointmentNotesByUserId(userId: $userId) {
    start
    notes
  }
}
```

variables:

```json
{
  "userId": "{{patientId}}"
}
```

### 1.3-Query notifications

#### 1.3.1-Query received notifications by userId

```graphql
query ReceivedNotificationsByUserId {
  notificationsByUserId {
    id
    notificationDate
    notificationType
    notificationText
    senderId {
      id
      firstName
      lastName
      accountType
      email
    }
    receiverId
    isRead
    appointmentId
    appointmentDate
    patientUsername
  }
}
```

#### 1.3.2-Query unread notifications by userId (for navbar badge)

```graphql
query UnreadNotificationsByUserId {
  unreadNotificationsByUserId {
    unreadCount
  }
}
```

### 1.4-Queries for supervisor account

#### 1.4.1-Query all carers

```graphql
query Carers {
  carers {
    userId {
      id
      firstName
      lastName
      email
      phoneNumber
      postcode
    }
    gender
    days
    notificationCount
    appointmentCount
  }
}
```

#### 1.4.2-Query all patients

```graphql
query Patients {
  patients {
    userId {
      id
      firstName
      lastName
      email
      phoneNumber
      postcode
    }
    gender
    genderPreference
    days
    notificationCount
    appointmentCount
  }
}
```

#### 1.4.3-Query available carers by date (if has no appointments assigned on that date already)

```graphql
query AvailableCarers($selectedDate: String!) {
  availableCarersByDate(selectedDate: $selectedDate) {
    userId
    username
    gender
    appointments {
      appointmentDate
      title
    }
  }
}
```

variables:

```json
{
  "selectedDate": "2022-09-02T16:00:00"
}
```

#### 1.4.4-Query for matching available patients - by carer gender and day

```graphql
query AvailablePatients($userId: ID!, $selectedDate: String!) {
  availablePatientsByCarerGenderAndDay(
    userId: $userId
    selectedDate: $selectedDate
  ) {
    userId
    username
    gender
    appointments {
      appointmentDate
      title
    }
  }
}
```

variables

```json
{
  "userId": "{{carerId}}",
  "selectedDate": "2022-09-21T07:00:00.000+00:00"
}
```

### 1.5-Queries for dashboards

#### 1.5.1-Query for carer dashboard

```graphql
query CarerDashboard {
  carerDashboard {
    carer {
      userId {
        id
        firstName
        lastName
        email
        phoneNumber
        postcode
      }
      days
      notificationCount
      appointmentCount
    }
    appointments {
      id
      patientId {
        firstName
      }
      carerId {
        id
      }
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

#### 1.5.2-Query for patient dashboard

```graphql
query PatientDashboard {
  patientDashboard {
    patient {
      userId {
        id
        firstName
        lastName
        email
        phoneNumber
        postcode
      }
      days
      notificationCount
      appointmentCount
    }
    appointments {
      id
      patientId {
        id
      }
      carerId {
        id
      }
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

## 2-Mutations

### 2.1-Mutation for signing up as a new user (patient account type)

Note: address to be passed at user signup (signupInput) and not in carer/patient profile

```graphql
mutation PatientSignup(
  $signupInput: SignupInput!
  $patientInput: PatientInput!
) {
  patientSignup(signupInput: $signupInput, patientInput: $patientInput) {
    success
    user {
      firstName
      lastName
      email
      accountType
      postcode
    }
    patient {
      username
      days
      notificationCount
      appointmentCount
      gender
    }
    userId
  }
}
```

variables:

```json
{
  "signupInput": {
    "firstName": "{{$randomFirstName}}",
    "lastName": "{{$randomLastName}}",
    "email": "{{randomExampleEmail}}",
    "password": "Password123!",
    "phoneNumber": "07777777777",
    "postcode": "B29 5PZ",
    "address": "????????"
  },
  "patientInput": {
    "gender": "female",
    "genderPreference": "none",
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

### 2.2-Mutation for logging in (any account type):

```graphql
mutation Login($loginInput: LoginInput!) {
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

### 2.3-Mutation for updating profile info

#### 2.3.1-Mutation for updating carer profile info

```graphql
mutation UpdateCarerInfo($updateCarerInput: CarerInfoInput) {
  updateCarerInfo(updateCarerInput: $updateCarerInput) {
    success
    userId
  }
}
```

variables (example):

```json
{
  "updateCarerInput": {
    "gender": "female"
  }
}
```

#### 2.3.2-Mutation for updating patient profile info

```graphql
mutation UpdatePatientInfo($updatePatientInput: PatientInfoInput) {
  updatePatientInfo(updatePatientInput: $updatePatientInput) {
    success
    userId
  }
}
```

variables (example):

```json
{
  "updatePatientInput": {
    "genderPreference": "female"
  }
}
```

#### 2.3.3-Mutation for updating user info (firstName/lastName/email/address/postcode/phone number)

```graphql
mutation UpdateUserInfo($updateInput: UserInfoInput) {
  updateUserInfo(updateInput: $updateInput) {
    success
    userId
  }
}
```

variables:

```json
{
  "updateInput": {
    "phoneNumber": "07945863547"
  }
}
```

### 2.4-Mutations for creating and updating a Care Plan for Patient

Create/update the Care Plan when the Patient submits the Care Plan form

```graphql
mutation CreateCarePlan($carePlanInput: CarePlanInput!) {
  createCarePlan(carePlanInput: $carePlanInput) {
    success
    id
  }
}
```

variables:

```json
{
  "carePlanInput": {
    "disabilities": "random",
    "mobility": "test"
  }
}
```

### 2.5-Mutations for supervisor account (admin tasks only done by the supervisor)

#### 2.5.1-Mutation for creating a new carer (done by supervisor)

```graphql
mutation CarerSignup($signupInput: SignupInput!, $carerInput: CarerInput!) {
  carerSignup(signupInput: $signupInput, carerInput: $carerInput) {
    success
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
    "phoneNumber": "07777777777",
    "postcode": "B29 5PZ",
    "address": "????????"
  },
  "carerInput": {
    "gender": "female",
    "days": ["monday", "tuesday", "wednesday", "thursday", "friday"]
  }
}
```

#### 2.5.2-Mutation for approving a new patient (update user field approvedStatus)

```graphql
mutation UpdateApprovedStatus($userId: ID!) {
  updateApprovedStatus(userId: $userId) {
    success
    userId
  }
}
```

variables:

```
{
    "userId": "{{nonApprovedUserId}}"
}
```

#### 2.5.3-Mutation for creating an appointment

```graphql
mutation CreateAppointment($appointmentInput: AppointmentInput!) {
  createAppointment(appointmentInput: $appointmentInput) {
    success
    id
  }
}
```

variables:

```json
{
  "appointmentInput": {
    "carerId": "{{carerId}}",
    "patientId": "{{patientId}}",
    "start": "2022-09-22T16:00:00.000+00:00",
    "end": "2022-09-22T17:00:00.000+00:00",
    "appointmentDate": "2022-09-22T16:00:00.000+00:00",
    "title": "New appointment"
  }
}
```

#### 2.5.4-Mutation for deleting an appointment

```graphql
mutation DeleteAppointment($appointmentId: ID!) {
  deleteAppointment(appointmentId: $appointmentId) {
    success
    carerId
    patientId
  }
}
```

variables:

```json
{
  "appointmentId": "{{appointmentId}}"
}
```

#### 2.5.5-Mutation for reallocating an appointment by appointmentId (update carerId)

Uses the `updateAppointment` resolver function with switch case trigger = "carerChange"

```graphql
mutation UpdateAppointmentCarer(
  $appointmentId: ID!
  $trigger: String!
  $appointmentUpdateInput: AppointmentUpdateInput
) {
  updateAppointment(
    appointmentId: $appointmentId
    trigger: $trigger
    appointmentUpdateInput: $appointmentUpdateInput
  ) {
    success
    appointment {
      id
    }
  }
}
```

variables:

```json
{
  "appointmentId": "{{appointmentId}}",
  "trigger": "carerChange",
  "appointmentUpdateInput": {
    "carerId": "{{alternativeCarerId}}",
    "start": "2022-09-22T19:00:00.000+00:00",
    "end": "2022-09-22T20:00:00.000+00:00"
  }
}
```

### 2.6-Mutations for appointments

#### 2.6.1-Mutation for checking in (carer - actual start time of an appointment)

Uses the `updateAppointment` resolver function with switch case trigger = "checkin"

```graphql
mutation UpdateAppointmentCheckin(
  $appointmentId: ID!
  $trigger: String!
  $appointmentUpdateInput: AppointmentUpdateInput
) {
  updateAppointment(
    appointmentId: $appointmentId
    trigger: $trigger
    appointmentUpdateInput: $appointmentUpdateInput
  ) {
    success
  }
}
```

variables:

```json
{
  "appointmentId": "{{appointmentId}}",
  "trigger": "checkin"
}
```

#### 2.6.2-Mutation for checking out (carer - actual end time of an appointment)

Uses the `updateAppointment` resolver function with switch case trigger = "checkout"

```graphql
mutation UpdateAppointmentCheckout(
  $appointmentId: ID!
  $trigger: String!
  $appointmentUpdateInput: AppointmentUpdateInput
) {
  updateAppointment(
    appointmentId: $appointmentId
    trigger: $trigger
    appointmentUpdateInput: $appointmentUpdateInput
  ) {
    success
  }
}
```

variables:

```json
{
  "appointmentId": "{{appointmentId}}",
  "trigger": "checkout"
}
```

#### 2.6.3-Mutation for adding a patient note to appointment

Uses the `updateAppointment` resolver function with switch case trigger = "patientNote"

```graphql
mutation UpdateAppointmentPatientNote(
  $appointmentId: ID!
  $trigger: String!
  $appointmentUpdateInput: AppointmentUpdateInput
) {
  updateAppointment(
    appointmentId: $appointmentId
    trigger: $trigger
    appointmentUpdateInput: $appointmentUpdateInput
  ) {
    success
  }
}
```

variables:

```json
{
  "appointmentId": "{{appointmentId}}",
  "trigger": "patientNote",
  "appointmentUpdateInput": {
    "note": "{{$randomLoremSentence}}"
  }
}
```

#### 2.6.4-Mutation for adding a carer note to appointment

Uses the `updateAppointment` resolver function with switch case trigger = "carerNote"

```graphql
mutation UpdateAppointmentCarerNote(
  $appointmentId: ID!
  $trigger: String!
  $appointmentUpdateInput: AppointmentUpdateInput
) {
  updateAppointment(
    appointmentId: $appointmentId
    trigger: $trigger
    appointmentUpdateInput: $appointmentUpdateInput
  ) {
    success
  }
}
```

variables:

```json
{
  "appointmentId": "{{appointmentId}}",
  "trigger": "carerNote",
  "appointmentUpdateInput": {
    "note": "{{$randomLoremSentence}}"
  }
}
```

#### 2.6.5-Mutation for adding a review in an appointment (patient review of their appointment)

```graphql
mutation UpdateAppointmentReview(
  $reviewInput: ReviewInput
  $appointmentId: ID!
) {
  updateAppointmentReview(
    reviewInput: $reviewInput
    appointmentId: $appointmentId
  ) {
    success
    userId
  }
}
```

variables

```json
{
  "appointmentId": "{{appointmentId}}",
  "reviewInput": {
    "comment": "I had a very nice carer and he was on time!",
    "score": 5
  }
}
```

### 2.7-Mutation for adding carer review

```graphql
mutation UpdateCarerReviews($reviewInput: ReviewInput) {
  updateCarerReviews(reviewInput: $reviewInput) {
    success
    userId
  }
}
```

variables:

```json
{
  "reviewInput": {
    "comment": "nice carer with good manners!",
    "score": 4
  }
}
```

### 2.8-Mutations for notifications

#### 2.8.1-Mutations for creating a notification

To be added as part of each action that triggers a notification (for clarity of who is the sender/receiver).
It requires 2 steps:

- 1: create the notification
- 2: update the receiver's notifications array

These steps are built into the `sendNotification` function in the **sendNotification.js** file in the resolvers folder.

Notifications are triggered by calling the `sendNotification` function in the following resolvers: (and passing it the relevant fields)

- **signup** > `patientSignup` > notification to supervisor
- **user** > `updateCarerReview` > notification to carer
- **appointments** > `updateAppointment` > new patientNote > notifications to the carer
- **appointments** > `updateAppointment` > reallocation of appointment > notifications to each carer
- **appointments** > `updateAppointment` > check out of appointment > notification to next appointment's patient

#### 2.8.2-Mutation for updating notification status by notification id

Updates the `isRead` status when the receiver opens the notification

```graphql
mutation UpdateIsReadStatus($notificationId: ID!) {
  updateIsReadStatus(notificationId: $notificationId) {
    id
    notificationDate
    senderId
    receiverId
    notificationText
    isRead
  }
}
```

variables:

```json
{
  "notificationId": "6311f2dcc3dd8bb84a937b55"
}
```

Note: in frontend: this mutation returns the array of received notifications after the update has been made, so this data can be assigned to the relevant state variable, and it will update the list of notifications displayed on state change
