# WhatsApp Cloud API Test

A TypeScript script that sends a WhatsApp test message using the Meta WhatsApp Cloud API.

## Features

- Reads configuration from environment variables
- Validates required configuration
- Sends a WhatsApp test message
- Handles success and error responses
- Displays the returned Message ID
- Never prints the access token

---

## Prerequisites

- Node.js (v18 or later)
- Meta Developer Account
- Meta Business Portfolio
- WhatsApp Cloud API configured
- System User Access Token
- Verified recipient phone number

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file and add the following:

```env
WHATSAPP_ACCESS_TOKEN=YOUR_SYSTEM_USER_ACCESS_TOKEN
PHONE_NUMBER_ID=YOUR_PHONE_NUMBER_ID
GRAPH_API_VERSION=v25.0
RECIPIENT_PHONE_NUMBER=YOUR_VERIFIED_PHONE_NUMBER
```

---

## Run the Script

Using npm:

```bash
npm run whatsapp:test
```

Or using tsx:

```bash
npx tsx src/scripts/send-whatsapp-test.ts
```

---

## Example Output

Successful execution:

```text
Configuration validated.

Sending WhatsApp test message...

Message sent successfully!

Message ID:
wamid.HBgMXXXXXXXXXXXXXX
```

---

## Project Structure

```
.
├── docs
│   └── meta-whatsapp-setup.md
├── src
│   └── scripts
│       └── send-whatsapp-test.ts
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

---

## Error Handling

The script handles:

- Missing access token
- Invalid Phone Number ID
- Recipient not verified
- Missing permissions
- Incorrect Graph API version
- API rate limiting
- Network errors
- Unexpected API responses

---

## Security

- Never commit `.env` to GitHub.
- Never expose your access token.
- Use a System User Access Token instead of a temporary token.
- Keep credentials secure.

---

## Author

Priyanshu Das