import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import InputFormSetting from "../inputFormSetting/InputFormSetting";
import Button from "../../button/Button";

import { IoClose } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { RiCoinLine } from "react-icons/ri";
import { useState, useEffect } from "react";

import { getUserId } from "../../../services/utils";
import { getWallet, addCredits } from "../../../services/wallet.service";

import "./CreditBalance.scss";

export default function WalletBalance() {

  const [id, setId] = useState()
  const [walletAmount, setWalletAmount] = useState(null)
  const [openAmount, setOpenAmount] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);
  const [value, setValue] = useState("");
  const optionCredits = ["5.00", "10.00", "15.00", "20.00"];

  const handleAddAmount = () => setOpenAmount(openAmount ? false : true);
  const handleCredits = () => setOpenCredits(openCredits ? false : true);

  useEffect(() => {
    const getWalletData = async () => {
      const wallet = await getWallet(id);
      const userGetId = await getUserId()
      setId(userGetId);
      setWalletAmount(wallet.amount);
    };
    getWalletData();
  }, [id, value, walletAmount]);

  const handleAddCredits = (e) => {
    e.preventDefault();
    addCredits(id, value);

    handleCredits();
    handleChange(e);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };
 

  return (
    <section id="credits-balance-container">
      <div className="container-credit-balance">
        <h1 className="text-credit-balance" id="wallet-amount"> {walletAmount}€ </h1>
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
          <form onSubmit={handleAddCredits} className="content-modal">
            <InputFormSetting
              className="input-form-modal-add-credit"
              title={"Numero de tarjeta"}
              placeholder={0}
              disable={false}
              type={"text"}
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
          <form onSubmit={handleAddCredits} className="content-modal">

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              className="container-radio-list"
            >
              {optionCredits.map((option, index) => (
                <div key={index} className="container-item-divider-card-radio">
                <FormControlLabel
                  sx={{
                    ".MuiTypography-root ":{
                      fontSize: 28,
                      color: "var(--text-1)",
                      fontWeight: "600"
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 30,
                      color: "#EB5E28",
                    },
                  }}
                  className="card-radio-item-credit"
                  value={parseInt(option)}
                  control={<Radio />}
                  label={'$ '+ option}
                />
                <Divider sx={{ border: "1px solid #757575" }} />
                </div>
              ))}
            </RadioGroup>
            {/* <button type='submit'>Añadir</button> */}
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
