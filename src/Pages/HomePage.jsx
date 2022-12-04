import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const columns = [
    { field: "id", headerName: "Id", width: 220 },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "user_email",
      headerName: "User Email",
      width: 190,
    },

    {
      field: "city",
      headerName: "City",
      width: 130,
    },
    {
      field: "state",
      headerName: "State",
      width: 170,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 70,
      align: "left",
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 140,
      align: "left",
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      width: 150,
    },
  ];

  const getOrderData = async () => {
    const res = await fetch(
      "https://payment-integration-backend-production.up.railway.app/app/order/get_all/vrv123"
    );
    const data = await res.json();
    console.log(data);

    const reqData = data.order.map((item, index) => {
      return {
        id: item.id,
        product_name: item.product.id.name,
        amount: item.amount,
        payment_status: item.payment_status,
        user_email: item.user_email,
        address: item.address,
        city: item.city,
        state: item.state,
        date: new Date(item.createdAt),
      };
    });
    setRowData(reqData);
    console.log(reqData);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Shop</Typography>
              <Button
                color="inherit"
                sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                onClick={() => navigate("/buy_product")}
              >
                Checkout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Order Details</h1>
        <div
          style={{
            height: 400,
            width: "100%",
            maxWidth: "90vw",
          }}
        >
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};
