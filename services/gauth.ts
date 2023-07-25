import { google } from "googleapis";
import { googleClientId, googleClientSecret } from "@/config";

const OAuth2 = google.auth.OAuth2;
const id = googleClientId;
const secret = googleClientSecret;

const myOAuth2Client = new OAuth2(id, secret);
export default myOAuth2Client;
