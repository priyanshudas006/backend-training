# Meta WhatsApp Cloud API Setup Guide

## Project

WhatsApp Cloud API Testing using Meta Developer Platform

---

# Objective

The objective of this project is to configure the Meta WhatsApp Cloud API, generate the required credentials, verify a recipient phone number, and successfully send a WhatsApp message using the Graph API.

---

# Prerequisites

- Meta (Facebook) Account
- Internet Connection
- Node.js
- VS Code
- npm

---

# Step 1: Create a Meta Developer Account

1. Visit https://developers.facebook.com/
2. Login using your Facebook account.
3. Complete Developer Account registration.
4. Verify your email or phone number if prompted.
5. Enable Two-Factor Authentication if required.

Result:

Successfully gained access to the Meta Developer Dashboard.

---

# Step 2: Create a Business Portfolio

1. Open Meta Business Suite.
2. Create a new Business Portfolio.

Business Portfolio Name:

```

TryLity WhatsApp API Testing

```

Result:

Business Portfolio created successfully.

---

# Step 3: Create a Meta App

1. Open Meta Developer Dashboard.
2. Click Create App.
3. Enter App Name.

```

TryLity Cloud API Test

```

4. Select the use case:

```

Connect with customers through WhatsApp

```

5. Connect the app with the Business Portfolio.
6. Create the application.

Result:

Meta App created successfully.

---

# Step 4: Configure WhatsApp Cloud API

Inside the Meta App:

1. Open Use Cases.
2. Select WhatsApp.
3. Click Customize.
4. Open Basic Setup.
5. Open Step 1 - Try it out.

Meta automatically generated:

- Temporary Access Token
- Test Phone Number
- Phone Number ID
- WhatsApp Business Account ID

---

# Step 5: Verify Recipient Phone Number

1. Add your own WhatsApp phone number.
2. Complete OTP verification.
3. Verify the number successfully.

Result:

Recipient phone number successfully verified.

---

# Step 6: Send Test Message

Message Type:

```

hello_world

```

Recipient:

Verified WhatsApp Number

Result:

Successfully received the WhatsApp message on the recipient device.

---

# Project Structure

```

whatsapp-cloud-api-test/
│
├── src/
│ └── scripts/
│ └── send-whatsapp-test.ts
│
├── docs/
│ └── meta-whatsapp-setup.md
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json

```

---

# Environment Variables

```

WHATSAPP_ACCESS_TOKEN=

WHATSAPP_PHONE_NUMBER_ID=

WHATSAPP_RECIPIENT=

GRAPH_API_VERSION=v25.0

```

Sensitive information should never be committed to GitHub.

---

# Running the Project

Install dependencies:

```bash
npm install
```

Run the script:

```bash
npm run whatsapp:test
```

---

# Expected Output

On successful execution:

- WhatsApp message delivered
- Message ID returned
- API response displayed

---

# Error Handling

The application handles the following scenarios:

- Missing Access Token
- Missing Phone Number ID
- Missing Recipient Number
- Invalid Access Token
- Invalid Phone Number ID
- Recipient not verified
- Graph API errors
- Network failures

---

# Security Best Practices

- Store credentials in `.env`
- Do not expose Access Tokens
- Do not commit `.env`
- Add `.env` to `.gitignore`
- Rotate expired tokens when necessary

---

# Technologies Used

- Node.js
- TypeScript
- Axios
- Dotenv
- Meta Graph API
- WhatsApp Cloud API

---

# Outcome

Successfully configured the Meta WhatsApp Cloud API environment, verified the recipient phone number, generated API credentials, and sent a WhatsApp template message using the Meta Graph API.
