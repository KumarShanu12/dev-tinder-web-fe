import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../utils/constant";

const Premium = () => {
  const [premium, setPremium] = useState(false);

  React.useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setPremium(true);
    }
  };

  const paymentHandler = async (type) => {
    // console.log(type)

    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          memberShipType: type,
        },
        {
          withCredentials: true,
        }
      );

      const { notes, keyId, currency, orderId, amount } = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "Road Laundry Side Payment",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend

        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!premium ? (
        <div className="flex gap-2 justify-center mt-6">
          <div className="card border-2 bg-secondary text-primary-content w-f">
            <div className="card-body">
              <h2 className="card-title">Plan 1</h2>
              <p>
                A card component has a figure, a body part, and inside body there
                are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => paymentHandler("silver")}>
                  Silver
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-primary border-2 text-primary-content w-f">
            <div className="card-body">
              <h2 className="card-title">Plan 2</h2>
              <p>
                A card component has a figure, a body part, and inside body there
                are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => paymentHandler("gold")}>
                  Gold
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Premium User</h1>
      )}
    </>
  );
   
};

export default Premium;
