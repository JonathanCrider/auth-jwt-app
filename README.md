# Test Authentication

Just a quick project to test basic implementation of password encryption and JWT authentication.

## Resources

- [https://atalupadhyay.wordpress.com/2025/03/05/refresh-tokens-in-jwt-authentication-keeping-users-logged-in-securely/](https://atalupadhyay.wordpress.com/2025/03/05/refresh-tokens-in-jwt-authentication-keeping-users-logged-in-securely/)

## Local Dev

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)

### Installation

```bash
git clone https://github.com/JonathanCrider/auth-jwt-app.git
cd auth-jwt-app
npm i
touch .env
```

Navigate to your `.env` file and add the following keys. Feel free to insert your own values.

```env
PORT=3001
ACCESS_TOKEN_SECRET=mysupercookaccesstokensecret
REFRESH_TOKEN_SECRET=myextracoolrefreshtokensecret
```

Once you save this file, you are ready to run the server locally.

```bash
npm run dev
```

Server access on `localhost:3001`

### Routes and Payloads

I could set up an OpenAPI doc, but maybe later. This will be fine for now.

It's pretty easy to follow if you look in the `app.js` file, and reference files in the `/routes` folder.

- GET `/users/all`: retrieve all users.
- POST `/access`
  - `/signup`: Requires `username`, `password`, and `email`
  - `/login`: Requires `username` and `password`
    - returns body `accessToken`
    - cookie `refreshToken`
- POST `/protected`: Should contain header `authorization: Bearer accessToken`
