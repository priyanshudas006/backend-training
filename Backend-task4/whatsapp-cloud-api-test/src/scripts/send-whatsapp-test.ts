import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

/**
 * Required Environment Variables
 */
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const RECIPIENT = process.env.WHATSAPP_RECIPIENT;
const GRAPH_API_VERSION = process.env.GRAPH_API_VERSION || "v25.0";

/**
 * Validate Environment Variables
 */
if (!ACCESS_TOKEN) {
  console.error(" WHATSAPP_ACCESS_TOKEN is missing.");
  process.exit(1);
}

if (!PHONE_NUMBER_ID) {
  console.error(" WHATSAPP_PHONE_NUMBER_ID is missing.");
  process.exit(1);
}

if (!RECIPIENT) {
  console.error(" WHATSAPP_RECIPIENT is missing.");
  process.exit(1);
}

/**
 * Graph API Endpoint
 */
const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}/messages`;

/**
 * Send WhatsApp Test Message
 */
async function sendWhatsAppMessage() {
  try {
    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: RECIPIENT,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("\n Message Sent Successfully!\n");

    console.log("Message ID:");
    console.log(response.data.messages[0].id);

    console.log("\nFull Response:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.log("\n Failed to send message.\n");

    if (error.response) {
      console.log("Status Code:", error.response.status);

      console.log("\nMeta Error:");

      console.log(
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.log(error.message);
    }

    process.exit(1);
  }
}

sendWhatsAppMessage();