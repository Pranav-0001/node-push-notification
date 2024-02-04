import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://push-images.appspot.com",
});

const bucket = admin.storage().bucket();

export const imageUploadController = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileMimetype = req.file.mimetype;
    const fileName = req.file.originalname;
    const image = bucket.file(fileName);
    const data = await image.save(fileBuffer, { contentType: "image/jpeg" });
    const [url] =await image.getSignedUrl({
      action:'read',
      expires:'01-01-2200'
    })
    console.log(url);
    res.json({status:true,url})
  } catch (error) {}
};
