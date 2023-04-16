import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "./HomePage";

export default function Order() {
  const [data, setData] = useState("");
  const params = useParams();
  const [status, setStatus] = useState("");

  //TODO: PAyment ==========================================================
  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const proceedPayment = async (data) => {
    let amount = data.totalPrice;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_VdGdvprTKB8u1w",
      currency: "INR",
      amount: amount * 100,
      name: "Tee-Shirts",
      description: "Thanks for purchasing",
      image: "https://www.vhv.rs/dpng/f/28-281275_megumin-png.png",

      handler: function (response) {
        alert(
          "Please do note it down for further references " +
            response.razorpay_payment_id
        );
        alert("Payment Successfully");
        setStatus("placed");
      },
      prefill: {
        name: "Tee-Shirts",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  //============================================================================================================

  if (status != "") {
    api
      .put(
        `/order/${data._id}`,
        { status: status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setData(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    api
      .get(`/order/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="row mt-5 bg-white p-4">
        {data.userId ? (
          <div className="col">
            <img
              className="shadow lg p-3 mb-5 rounded img-fluid "
              src={data.productId.productImage}
            />
            <div className="row">
              <h5 className="fw-bold">Total Quantity :-</h5>
              <h3>{data.quantity}</h3>
            </div>
            {data.status == "pending" ? (
              <div className="row">
                {" "}
                <button
                  className="bg-success my-2"
                  value={"placed"}
                  onClick={() => proceedPayment(data)}
                >
                  Proceed Payment
                </button>
              </div>
            ) : (
              <div className="row">
                {" "}
                <button className="bg-secondary my-2" disabled>
                  Proceed Payment
                </button>
              </div>
            )}

            {data.status == "pending" ? (
              <div className="row">
                {" "}
                <button
                  className="bg-info"
                  value={"cancled"}
                  onClick={(e) => setStatus(e.target.value)}
                >
                  Cancle Order
                </button>
              </div>
            ) : (
              <div className="row">
                {" "}
                <button className="bg-secondary" disabled>
                  Cancle Order
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {data.userId ? (
          <div className="col me-9">
            <h1 className="shadow lg p-3 mb-2 bg-body-tertiary rounded fw-bold fst-italic">
              {data.productId.productname}
            </h1>
            <h2 className="shadow lg mb-3 rounded fw-bold fst-italic">
              ₹ {data.totalPrice}
            </h2>
            <h3 className="shadow lg mb-3 rounded text-danger fst-italic">
              Status :- {data.status}
            </h3>
            <hr />
            <h3 className="shadow lg  mb-3 rounded fw-bold">
              Shipping Details :-
            </h3>
            <h5 className="fst-italic">
              • will be delivered in 7 working days <br />• Shipping address :-{" "}
              {data.address}.
            </h5>
          </div>
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
