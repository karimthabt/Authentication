import tls from "tls";
import { Buffer } from "buffer";

export async function sendTOCode(to: string, subject: string, message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const username = process.env.EMAIL_USER!;
    const password = process.env.EMAIL_PASS!;

    const client = tls.connect(465, "smtp.gmail.com", {}, () => {
      const write = (line: string) => {
        console.log("📤 إرسال:", line); // Log الخطوات
        client.write(line + "\r\n");
      };

      let step = 0;
      const steps = [
        `EHLO smtp.gmail.com`,
        `AUTH LOGIN`,
        Buffer.from(username).toString("base64"),
        Buffer.from(password).toString("base64"),
        `MAIL FROM:<${username}>`,
        `RCPT TO:<${to}>`,
        `DATA`,
        `Subject: ${subject}\r\nContent-Type: text/plain\r\n\r\n${message}\r\n.`,
        `QUIT`,
      ];

      const next = () => {
        if (step < steps.length) {
          write(steps[step++]);
        } else {
          client.end();
        }
      };

      client.on("data", (data) => {
        const response = data.toString();
        console.log("📩 رد السيرفر:", response);

        // لو السيرفر رد برسالة خطأ
        if (response.startsWith("5") || response.includes("Error")) {
          client.end();
          reject(new Error("SMTP Error: " + response));
        } else {
          next();
        }
      });

      client.on("end", () => {
        console.log("✅ تم إرسال الإيميل بنجاح");
        resolve();
      });

      client.on("error", (err) => {
        console.error("❌ خطأ أثناء الإرسال", err);
        reject(err);
      });

      next(); // ابدأ أول خطوة
    });
  });
}