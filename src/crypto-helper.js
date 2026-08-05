const DEFAULT_KEY_PHRASE = "SoulCafe-Recipe-Vault-Secret-2026";

async function deriveKey(secretPhrase) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretPhrase || DEFAULT_KEY_PHRASE);
  const hash = await crypto.subtle.digest("SHA-256", keyData);
  return crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encryptPayload(dataObj, secretPhrase) {
  const key = await deriveKey(secretPhrase);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(dataObj));

  const encryptedContent = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedData
  );

  return {
    iv: bufferToBase64(iv),
    ciphertext: bufferToBase64(encryptedContent),
  };
}

export async function decryptPayload(encryptedObj, secretPhrase) {
  if (!encryptedObj || !encryptedObj.iv || !encryptedObj.ciphertext) {
    throw new Error("Invalid encrypted payload format.");
  }

  const key = await deriveKey(secretPhrase);
  const iv = new Uint8Array(base64ToBuffer(encryptedObj.iv));
  const ciphertext = base64ToBuffer(encryptedObj.ciphertext);

  const decryptedContent = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  const jsonStr = decoder.decode(decryptedContent);
  return JSON.parse(jsonStr);
}

if (typeof window !== "undefined") {
  window.CryptoHelper = { encryptPayload, decryptPayload };
  window.RECIPES = window.RECIPES || [];
  window.DRINKS = window.DRINKS || [];
  window.SEASONAL_SPECIALS = window.SEASONAL_SPECIALS || [];
  window.MASTER = window.MASTER || {};
  window.RECIPE_LINKS = window.RECIPE_LINKS || {};
}
