import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function CreateProduct() {
  const navigate = useNavigate();

  function createProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));

    formData.set("sizes", formData.getAll("sizes").join(","));

    api
      .post("/product", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <div>
      <h1>Create Product</h1>
      <hr />

      <form onSubmit={createProduct}>
        <div className="form-group mt-2">
          <label htmlFor="" className="form-label">
            Product Name
          </label>
          <input
            name="productname"
            required
            type="text"
            defaultValue={"Tshirt Green"}
            className="form-control"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="" className="form-label">
            Base Price
          </label>
          <input
            name="baseprice"
            required
            type="number"
            className="form-control"
            defaultValue={1000}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            required
            type="text"
            className="form-control"
            defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio soluta amet nesciunt repudiandae esse veritatis nam reiciendis quidem doloremque. Ipsum, suscipit ducimus provident at labore laborum expedita impedit iusto voluptas.
            `}
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="" className="form-label">
            Quantity
          </label>
          <input
            name="quantity"
            required
            type="number"
            defaultValue={10}
            className="form-control"
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="" className="form-label">
            Sizes
          </label>
          <select required name="sizes" multiple className="form-control" id="">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
          </select>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="" className="form-label">
            Image
          </label>
          <input
            required
            name="productimage"
            type="file"
            className="form-control"
            id=""
          />
        </div>

        <div className="form-group mt-4">
          <input
            type="submit"
            name=""
            className="form-control btn btn-success"
            id=""
            value="Save Product"
          />
        </div>
      </form>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

// {
//     "data": {
//       "shopId": "642ec62980dc7b939bde0df1",
//       "productname": "product",
//       "description": "lorem loremlorem loremlorem loremlorem lorem",
//       "baseprice": "34",
//       "quantity": 10,
//       "sizes": [
//         "Small",
//         "Medium"
//       ],
//       "colors": [],
//       "productImage": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/userProfileImageYoutube%20Thumbnail%20%281%29.png",
//       "availability": true,
//       "_id": "6432850925dc4b06c8b36a28",
//       "createdAt": "2023-04-09T09:27:37.953Z",
//       "updatedAt": "2023-04-09T09:27:37.953Z",
//       "__v": 0
//     }
//   }
