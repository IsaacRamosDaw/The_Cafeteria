import "./CreditBalance.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { RiCoinLine } from "react-icons/ri";
import InputFormSetting from "../inputFormSetting/InputFormSetting";
import Button from "../../button/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { getUserId } from "../../../services/utils";
import { getWallet } from "../../../services/wallet.service";

export default function WalletBalance() {

  const id = getUserId();
  const [walletAmount, setWalletAmount] = useState(null)
  const [openAmount, setOpenAmount] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);

  const handleAddAmount = () => setOpenAmount(openAmount ? false : true);
  const handleCredits = () => setOpenCredits(openCredits ? false : true);

  useEffect(() => {
    const getWalletData = async () => {
      const token = localStorage.getItem("token"); 
      const wallet = await getWallet(token, id);
      console.log("wallet;", wallet.id)
      setWalletAmount(wallet.amount);
    };
    getWalletData();
  }, [id]);

  useEffect(() => {
    if (walletAmount !== null) {
      console.log("Segundo log (actualizado):", walletAmount);
    }
  }, [walletAmount]);





  const handleFormData = (e) => {
    console.log(e.target);
  };

  const [optionCredits, setOptionCredits] = [
    {
      amount: "5.00",
      checked: false
    },
    {
      amount: "10.00",
      checked: false
    },
    {
      amount: "15.00",
      checked: false
    },
    {
      amount: "20.00",
      checked: false
    },
  ];

  const style = {
    p: 0,
    width: "100%",
    borderRadius: 2,
  };

  return (
    <section id="credits-balance-container">
      <div className="container-credit-balance">
        <h1 className="text-credit-balance"> {walletAmount}€ </h1>
      </div>

      <div className="container-control-credit-add">
        <Button
          icon={<MdAttachMoney />}
          onClick={handleAddAmount}
          className="btn-credits-balance"
          text={"Añadir"}
        />
        <Button
          icon={<RiCoinLine />}
          onClick={handleCredits}
          className="btn-credits-balance"
          text={"Creditos"}
        />
      </div>

      <Modal open={openAmount} onClose={handleAddAmount}>
        <Box className="modal-container">
          <div className="container-exit-icon">
            <IoClose className="icon-exit" onClick={handleAddAmount} />
          </div>
          <form onSubmit={handleFormData} className="content-modal">
            <InputFormSetting
              title={"Numero de tarjeta"}
              placeholder={0}
              disable={false}
              type={"number"}
            />
            <Button
              className="btn-modal-credits"
              submit={true}
              text={"Añadir"}
            />
          </form>
        </Box>
      </Modal>

      <Modal open={openCredits} onClose={handleCredits}>
        <Box className="modal-container">
          <div className="container-exit-icon">
            <IoClose className="icon-exit" onClick={handleCredits} />
          </div>
          <form onSubmit={handleFormData} className="content-modal">
            <List sx={style} aria-label="mailbox folders">

              {/* {optionCredits.map((o, index) => (
                < >  
                  <input type="radio" checked={o.checked} name="" id="" />
                  <ListItem>
                    <h1 className="text-option-credits">$ {o.amount}</h1>
                  </ListItem>
                  <Divider component="li" />
                </>
              ))} */}
            </List>
            <Button
              className="btn-modal-credits"
              submit={true}
              text={"Añadir"}
            />
          </form>
        </Box>
      </Modal>
    </section>
  );
}
