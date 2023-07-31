import React, { useEffect, useState } from "react";

export default function Test2() {
  const [dataProduct, setDataProduct] = useState([]);
  const [searchDataProduct, setSearchDataProduct] = useState([]);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const [searchFavoriteProduct, setSearchFavoriteProduct] = useState([]);
  // console.log(favoriteProduct);

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = () => {
    const response = [
      {
        id: "1001",
        productName: "Ice Camppucino",
        price: 15000,
        img: "Cappucino-Ice.png",
      },
      {
        id: "1002",
        productName: "Hot Coffee",
        price: 20000,
        img: "Cappucino-Ice.png",
      },
      {
        id: "1003",
        productName: "Ice Lemon Tea",
        price: 21000,
        img: "Cappucino-Ice.png",
      },
      {
        id: "1004",
        productName: "Coffee Latte",
        price: 12000,
        img: "Cappucino-Ice.png",
      },
      {
        id: "1005",
        productName: "Green Thai Tea",
        price: 25000,
        img: "Cappucino-Ice.png",
      },
    ];
    setDataProduct(response);
    setSearchDataProduct(response);
  };

  const handelSearchDataProduct = (e) => {
    const seractInput = e.target.value;
    const response = dataProduct.filter(
      (item) =>
        item.id.includes(seractInput) ||
        item.productName.toLowerCase().includes(seractInput.toLowerCase()) ||
        item.price.toString().includes(seractInput)
    );
    setSearchDataProduct(response);
  };

  const handleAddToFavoriteProduct = (prodictId) => {
    const favoriteProductById = favoriteProduct.find(
      (item) => item.id === prodictId
    );
    const productById = dataProduct.find((item) => item.id === prodictId);
    if (!favoriteProductById) {
      setFavoriteProduct(favoriteProduct.concat(productById));
      setSearchFavoriteProduct(favoriteProduct.concat(productById));
      return;
    }
  };

  const handleRemoveProductFromFavorite = (prodictId) => {
    // console.log(prodictId);
    setFavoriteProduct(favoriteProduct.filter((item) => item.id !== prodictId));
  };

  const handleSearchFavoriteProduct = (e) => {
    // console.log(e.target.value);
    const seractInput = e.target.value;
    const response = favoriteProduct.filter(
      (item) =>
        item.id.includes(seractInput) ||
        item.productName.toLowerCase().includes(seractInput.toLowerCase()) ||
        item.price.toString().includes(seractInput)
    );
    setSearchFavoriteProduct(response);
  };

  return (
    <div
      className="container"
      style={{ marginTop: "70px", marginBottom: "70px" }}
    >
      <div style={{ marginBottom: "70px" }}>
        <div
          className="row mb-2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div className="col-md-9">
            <h1>Product</h1>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              onChange={handelSearchDataProduct}
            />
          </div>
        </div>
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr className="bg-secondary" style={{ color: "white" }}>
              <th scope="col" style={{ textAlign: "center", width: "70px" }}>
                No
              </th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col" style={{ textAlign: "center", width: "130px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {searchDataProduct?.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    {index + 1}
                  </th>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.img}</td>
                  <td style={{ textAlign: "center", width: "130px" }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        handleAddToFavoriteProduct(item.id);
                      }}
                    >
                      Add to Favorite
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Data: {searchDataProduct?.length}</p>
        <hr />
      </div>
      <div>
        <div
          className="row mb-2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div className="col-md-9">
            <h1>Favorite Product</h1>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                handleSearchFavoriteProduct(e);
              }}
            />
          </div>
        </div>
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr className="bg-secondary" style={{ color: "white" }}>
              <th scope="col" style={{ textAlign: "center", width: "70px" }}>
                No
              </th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col" style={{ width: "130px", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {searchFavoriteProduct?.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    {index + 1}
                  </th>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.img}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      style={{
                        height: "30px",
                        backgroundColor: "red",
                        border: "1px solid silver",
                        borderRadius: "5px",
                        color: "white",
                        width: "100px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleRemoveProductFromFavorite(item.id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Data: {searchFavoriteProduct?.length}</p>
        <hr />
      </div>
    </div>
  );
}
