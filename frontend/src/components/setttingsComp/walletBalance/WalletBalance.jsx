import "./WalletBalance.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { MdCreditCard } from "react-icons/md";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { RiMastercardFill } from "react-icons/ri";
import { RiVisaLine } from "react-icons/ri";
import { useState } from "react";
import InputFormSetting from "../../../components/setttingsComp/inputFormSetting/InputFormSetting";

export default function WalletBalance() {
  const [card, setCard] = useState({
    number: `${0}`,
    date: `-`,
    cvc: `${0}`,
    balance: 0,
  });

  const [openMoney, setOpenMoney] = useState(false);
  const handleOpenMoney = () => setOpenMoney(true);
  const handleCloseMoney = () => setOpenMoney(false);

  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleAddMoney = (e) => {
    e.preventDefault();

    console.log(e.target);
  };

  const [openAddCard, setOpenAddCard] = useState(false);
  const handleOpenAddCard = () => setOpenAddCard(true);
  const handleCloseAddCard = () => setOpenAddCard(false);

  const handleAddCard = (e) => {
    e.preventDefault();

    const numberCard = document.getElementById("numero");
    const dateCard = document.getElementById("fecha");
    const cvcCard = document.getElementById("cvc");

    console.log(numberCard, dateCard, cvcCard);

    setCard(
      {
      number: numberCard,
      date: dateCard,
      cvc: cvcCard,
    }
  );

    handleCloseAddCard();
  };

  const handleRemoveCard = () => {

  };

  return (
    <section id="wallet-balance-container">
      <div id="container-balance">
        <p className="balance-title">Your balance</p>
        <h1 className="amount-balance"> €{card.balance} </h1>
      </div>
      <div id="container-card-credit">
        <div id="carusel-credit-card">
          {card.number == 0 ? (
            ""
          ) : (
            <div className="credit-card">
              {card.number[0] == 4 ? (
                <RiVisaLine />
              ) : card.number[0] == 5 ? (
                <RiMastercardFill />
              ) : (
                ""
              )}
            </div>
          )}

          {card.number != 0 ? (
            ""
          ) : (
            <div onClick={handleOpenAddCard} id="credit-card-add">
              <IoIosAddCircle />
              <h3 className="text-add-card">Añade tu tarjeta</h3>
            </div>
          )}

          <Modal open={openAddCard} onClose={handleCloseAddCard}>
            <Box className="modal-container">
              <div className="container-exit-icon">
                <IoClose className="icon-exit" onClick={handleCloseAddCard} />
              </div>
              <form onSubmit={handleAddCard} className="content-modal">
                <InputFormSetting
                  title={"Numero de tarjeta"}
                  placeholder={card.number}
                  disable={false}
                  type={"number"}
                />
                <InputFormSetting
                  title={"Fecha de caducidad"}
                  placeholder={card.date}
                  disable={false}
                  type={"date"}
                />
                <InputFormSetting
                  title={"CVC"}
                  placeholder={card.cvc}
                  disable={false}
                  type={"number"}
                />
                <button
                  onClick={handleAddCard}
                  type="submit"
                  className="btn-modal"
                >
                  Añadir
                </button>
              </form>
            </Box>
          </Modal>
        </div>
        <h2>{card.number == 0 ? "- - - -" : card.number}</h2>
      </div>

      <div id="card-options">
        <div className="option-card add" onClick={handleOpenMoney}>
          <IoMdAddCircleOutline className="card-icon-option" />
          <h2>Add Money</h2>
        </div>
        <Modal open={openMoney} onClose={handleCloseMoney}>
          <Box className="modal-container">
            <div className="container-exit-icon">
              <IoClose className="icon-exit" onClick={handleCloseMoney} />
            </div>
            <form onSubmit={handleAddMoney} className="content-modal">
              <InputFormSetting
                title={"Cuenta"}
                placeholder={card.number}
                disable={true}
              />
              <InputFormSetting
                title={"Importe"}
                placeholder={"0,00 €"}
                type={"number"}
              />
              <div className="container-btn-recargar">
                <button type="submit" className="btn-modal">
                  Recargar
                </button>
              </div>
            </form>
          </Box>
        </Modal>

        <div className="option-card details" onClick={handleOpenDetails}>
          <MdCreditCard className="card-icon-option" />
          <h2>Card Details</h2>
        </div>
        <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box className="modal-container">
            <div className="container-exit-icon">
              <IoClose className="icon-exit" onClick={handleCloseDetails} />
            </div>
            <div className="content-modal">
              <InputFormSetting
                title={"Numero de tarjeta"}
                placeholder={card.number}
                disable={true}
                type={"number"}
              />
              <InputFormSetting
                title={"Fecha de caducidad"}
                placeholder={card.date}
                disable={true}
                type={"text"}
              />
              <InputFormSetting
                title={"CVC"}
                placeholder={card.cvc}
                disable={true}
                type={"number"}
              />
            </div>
          </Box>
        </Modal>

        <div onClick={handleRemoveCard} className="option-card">
          <MdOutlineRemoveCircleOutline className="card-icon-option trash" />
          <h2>Remove Card</h2>
        </div>
      </div>
    </section>
  );
}
