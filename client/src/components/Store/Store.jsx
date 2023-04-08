import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Store() {
  const [tshirts, setTshirts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/t-shirts").then((response) => {
      setTshirts(response.data.data);
    });
  }, []);

  console.log(tshirts);

  return (
    <div>
      <div className="row">
        {tshirts.map((t) => (
          <div className="mx-auto col-lg-4 col-sm-10 mt-3 col-md-5">
            <div class="card">
              <img src={t.productImage} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{t.productname}</h5>

                <Link to={`/store/t-shirts/${t._id}`} class="btn btn-dark">
                  Show More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
