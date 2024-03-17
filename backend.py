import os
import streamlit as st
import pandas as pd

from dotenv import load_dotenv

from convex import ConvexClient

load_dotenv(".env.local")
load_dotenv()

client = ConvexClient(os.getenv("CONVEX_URL"))


# print(
#     client.query(
#         "vouchers:adminGet",
#         {
#             "tokenIdentifier": "https://unique-barnacle-31.clerk.accounts.dev|user_2d8YN0xueB1obh3qttBSSLqoJ7D"
#         },
#     )
# )
def delete_voucher(voucher):
    res = client.mutation("vouchers:adminDelete", {"id": voucher})
    st.toast(res)


tab1, tab2 = st.tabs(["Voucher List", "Create Voucher"])
with tab2:
    farmers = client.query("farmers:getAllFarmers")
    issuer = st.text_input("Issuer")
    choice = st.selectbox("FarmerID", [farmer["tokenIdentifier"] for farmer in farmers])
    amount = st.text_input("Amount")
    expiration_date = st.date_input("Expiration Date")
    ok = st.button("Submit")

    if ok:
        voucher_id = client.mutation(
            "vouchers:adminPost",
            {
                "amount": float(amount),
                "issuer": issuer,
                "expirationDate": expiration_date.isoformat(),
                "farmerId": choice,
            },
        )
        st.write(voucher_id)


with tab1:
    vouchers = client.query("vouchers:adminGetAll")
    for voucher in vouchers:
        with st.expander(f"{voucher['issued_by']} : {voucher['_id']}"):
            row1 = st.columns([1, 2])
            row1[0].write("Amount")
            row1[1].write(voucher["amount"])
            row1 = st.columns([1, 2])
            row1[0].write("Expiry Date")
            row1[1].write(voucher["expiration_date"])
            row1 = st.columns([1, 2])
            row1[0].write("Status")
            row1[1].write(voucher["status"])

            button_row = st.columns([1, 1, 3])
            button_row[0].button(
                "Void",
                key=f"void-{voucher['_id']}",
                on_click=delete_voucher,
                args=[voucher["_id"]],
            )
            button_row[1].button(
                "Delete",
                key=voucher["_id"],
                on_click=delete_voucher,
                args=[voucher["_id"]],
            )


df = pd.DataFrame(
    [
        {"command": "st.selectbox", "rating": 4, "is_widget": True},
        {"command": "st.balloons", "rating": 5, "is_widget": False},
        {"command": "st.time_input", "rating": 3, "is_widget": True},
    ]
)
