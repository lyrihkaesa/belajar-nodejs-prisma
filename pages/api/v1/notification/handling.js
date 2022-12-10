import { firestore } from "../../../../firebase/firebaseAdmin.js";

export default async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const orderId = req.body.order_id;
    const statusCode = req.body.status_code;
    if (req.body === null) {
      return res.status(200).json({ message: "body tidak boleh kosong" });
    }

    if (orderId === undefined) {
      return res.status(200).json({ message: "order_id tidak boleh kosong" });
    }

    const doc = await firestore.collection("appointments").doc(orderId).get();
    let newDoc = doc.data();
    newDoc.status.code = "paid";
    newDoc.status.updatedAt = Date.now();
    if (statusCode != undefined) {
      newDoc.status.code = statusCode;
    }
    await firestore.collection("appointments").doc(orderId).set(newDoc);

    return res.status(200).json({ message: "ok", data: newDoc });
  }
  return res.status(200).json({ message: "ok" });
};
