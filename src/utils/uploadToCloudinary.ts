// utils/uploadToCloudinary.ts

import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../lib/config/cloudinary";

export const uploadToCloudinary = async (
  file: File
): Promise<UploadApiResponse> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "users" }, // أو غيرها حسب نوع الموديل
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};
