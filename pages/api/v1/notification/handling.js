import { firestore } from "../../../../firebase/firebaseAdmin.js";

export default async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const orderId = req.body.order_id;
    const transactionStatus = req.body.transaction_status;
    if (req.body === null) {
      return res.status(200).json({ message: "body tidak boleh kosong" });
    }

    if (orderId === undefined) {
      return res.status(200).json({ message: "order_id tidak boleh kosong" });
    }

    const doc = await firestore.collection("appointments").doc(orderId).get();
    let newDoc = doc.data();
    newDoc.status.updatedAt = Date.now();
    if (transactionStatus != undefined) {
      switch (transactionStatus) {
        case "capture":
        case "settlement":
          newDoc.status.code = "paid";
          break;

        default:
          break;
      }
    }

    await firestore.collection("appointments").doc(orderId).set(newDoc);

    return res.status(200).json({ message: "ok", data: newDoc });
  }
  return res.status(200).json({ message: "ok" });
};
