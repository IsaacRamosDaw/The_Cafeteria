import "./CreditBalance.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { MdAttachMoney } from "react-icons/md";
import { RiCoinLine } from "react-icons/ri";

import { useState } from "react";
import Button from "../../button/Button";
import InputFormSetting from "../inputFormSetting/InputFormSetting";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

export default function WalletBalance({amount = 10.20}) {
  let [credits, setCredits] = useState(amount);

  const [openAmount, setOpenAmount] = useState(false);
  const handleAddAmount = () => setOpenAmount(openAmount ? false : true);

  const [openCredits, setOpenCredits] = useState(false);
  const handleCredits = () => setOpenCredits(openCredits ? false : true);

  const handleAddCredits = (amount) => {
    setCredits((credits += amount));
  };

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

  // const handleCheckBoxes = (index) => {
  //   optionCredits[index].checked = true
  //   setOpenCredits(...optionCredits)
  // }

  const style = {
    p: 0,
    width: "100%",
    borderRadius: 2,
  };

  return (
    <section id="credits-balance-container">
      <div className="container-credit-balance">
        <h1 className="text-credit-balance"> €{credits} </h1>
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
