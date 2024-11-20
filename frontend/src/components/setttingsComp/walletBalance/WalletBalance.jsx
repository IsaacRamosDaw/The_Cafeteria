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
  
  const [cards, setCards] = useState([
    {
      number: `${4234678912345678}`,
      date: `12/06/2014`,
      cvc: 521,
      balance: 45.02,
    },
    {
      number: `${5299384789732592}`,
      date: `26/11/2022`,
      cvc: 146,
      balance: 0.20,
    },
    {
      number: `${4908549028489045}`,
      date: `01/01/2023`,
      cvc: 521,
      balance: 100.01,
    }
  ])

  const [card, setCard] = useState(cards[0]);

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

  const handleAddCard = (e) => {
    e.preventDefault()

    console.log(e.target)
  }

  const [openAddCard, setOpenAddCard] = useState(false);
  const handleOpenAddCard = () => setOpenAddCard(true);
  const handleCloseAddCard = () => setOpenAddCard(false);

  return (
    <section id="wallet-balance-container">
      <div id="container-balance">
        <p className="balance-title">Your balance</p>
        <h1 className="amount-balance"> €{card.balance} </h1>
      </div>
      <div id="container-card-credit">
        <div id="carusel-credit-card">
          <div className="credit-card">
            {card.number[0] == 4 ? <RiVisaLine /> : <RiMastercardFill />}
          </div>
          <div onClick={handleOpenAddCard} id="credit-card-add">
            <IoIosAddCircle />
            <h3 className="text-add-card">Añade tu visa</h3>

          </div>
          <Modal open={openAddCard} onClose={handleCloseAddCard}>
          <Box className="modal-container">
            <div className="container-exit-icon">
              <IoClose className="icon-exit" onClick={handleCloseAddCard} />
            </div>
            <form onSubmit={handleAddCard} className="content-modal">
              <InputFormSetting
                title={"Numero de tarjeta"}
                subvalue={card.number}
                disable={false}
              />
              <InputFormSetting
                title={"Fecha de caducidad"}
                subvalue={card.date}
                disable={false}
              />
              <InputFormSetting
                title={"CVC"}
                subvalue={card.cvc}
                disable={false}
              />
              <button type="submit" className="btn-modal">
                  Añadir
                </button>
            </form>
          </Box>
        </Modal>
        </div>
        <h2>{card.number}</h2>
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
                subvalue={card.number}
                disable={true}
              />
              <InputFormSetting title={"Importe"} subvalue={"0,00 €"} />
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
                subvalue={card.number}
                disable={true}
              />
              <InputFormSetting
                title={"Fecha de caducidad"}
                subvalue={card.date}
                disable={true}
              />
              <InputFormSetting
                title={"CVC"}
                subvalue={card.cvc}
                disable={true}
              />
            </div>
          </Box>
        </Modal>

        <div className="option-card">
          <MdOutlineRemoveCircleOutline className="card-icon-option trash" />
          <h2>Remove Card</h2>
        </div>
      </div>
    </section>
  );
}
