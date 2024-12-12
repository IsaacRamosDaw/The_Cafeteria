import "./CreditBalance.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { RiCoinLine } from "react-icons/ri";
import InputFormSetting from "../inputFormSetting/InputFormSetting";
import Button from "../../button/Button";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
      console.log("wallet", wallet)
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
    e.preventDefault();

    console.log(e.target, value);
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let optionCredits = ["5.00", "10.00", "15.00", "20.00"];

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
          <form onSubmit={handleFormData} className="content-modal">
            {/* <List sx={style} aria-label="mailbox folders">
              <ListItem>
                <input type="radio" name="" id="" />
                <input type="radio" name="" id="" />
                <input type="radio" name="" id="" />
                <ListItem>
                  <h1 className="text-option-credits">$ {5}</h1>
                </ListItem>
                <Divider component="li" />
              </ListItem>
            </List> */}

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
                  value={ parseInt(option)}
                  control={<Radio />}
                  label={'$ '+option}
                />
                <Divider sx={{ border: "1px solid #757575" }} />
                </div>
              ))}
            </RadioGroup>

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
