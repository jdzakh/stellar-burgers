import { useNavigate } from "react-router-dom";
import OrderList from "../../pages/order-list/order-list";
import Modal from "../modal/Modal"


const ModalOrder = () => {
   const navigate = useNavigate();
   
   const onClose = () => {
      navigate(-1);
   }

   return (
      <>
         <Modal onClick={onClose} >
            <OrderList />
         </Modal>
      </>
   )
}

export default ModalOrder;