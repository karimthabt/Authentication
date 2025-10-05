import crypto from "crypto";

const SECRET_KEY = process.env.ENCRYPTION_SECRET!;
if (!SECRET_KEY) throw new Error("ENCRYPTION_SECRET غير معرف");

// تشفير نص مع IV عشوائي
export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "utf-8"),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

// فك التشفير
export const decrypt = (data: string): string => {
  const [ivHex, encryptedHex] = data.split(":");
  if (!ivHex || !encryptedHex) throw new Error("النص المشفر غير صحيح");

  const iv = Buffer.from(ivHex, "hex");
  // encryptedHex يبقى string - نمرره مباشرة (مش نحوله لـ Buffer)

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "utf-8"),
    iv
  );

  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// هاش ثابت للإيميل (لتجنب تكرار الإيميلات)
export const hashEmail = (email: string): string => {
  return crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");
};
