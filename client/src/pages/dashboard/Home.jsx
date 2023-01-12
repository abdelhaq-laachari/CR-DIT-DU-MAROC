import React from "react";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCard } from "../../features/card/cardSlice";
import { useEffect } from "react";
import MasterCard from "../../components/Credit card/MasterCard";
import Sidebar from "../../components/Side bar/Sidebar";
import Nav from "../../components/Top nav/Nav";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { card, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.card
  );

  if (isSuccess) {
    var balance = card.balance;
    var currency = card.currency;
  }
  console.log(card);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/signin");
    }

    dispatch(getCard());
  }, []);

  if (!card) {
    return <Spinner />;
  }

  const ShowAlert = () => {
    Swal.fire({
      title: "Select the transaction type.",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Deposit",
      denyButtonText: `Withdraw`,
      cancelButtonText: "payment",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("deposit");
      } else if (result.isDenied) {
        navigate("withdraw");
      } else if (result.isDismissed) {
        navigate("makePayment");
      }
    });
  };


  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex w-full flex-col ">
        <Nav />
        <div className="w-full flex justify-center items-center h-[95vh] bg-slate-200">
          <div className="w-[90%] flex p-2 rounded-lg  gap-x-5 bg-[#F8F8F8]">
            <div className="flex flex-col p-2">
              <span className="text-xl font-semibold mb-3">May Cards</span>
              <MasterCard />
            </div>
            <div className="w-1/2 flex flex-col  bg-red-">
              <div className="my-3 w-3/4 space-x-9 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#9AA1B0]">
                  Card Balance:
                </span>
                <span className="text-lg w-1/2 font-bold text-[#191C1F]">
                  {balance} DH
                </span>
              </div>
              <div className=" w-3/4 space-x-9 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#9AA1B0]">
                  Credit limit:
                </span>
                <span className="text-lg w-1/2 font-bold text-[#191C1F]">
                  100,000 DH
                </span>
              </div>
              <div className="w-full my-3">
                <span className="font-bold text-xl">Information</span>
                <div className="my-3 w-3/4 space-x-9 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#9AA1B0]">
                    Status:
                  </span>
                  <span className="text-lg w-1/2 flex items-center font-bold text-[#191C1F]">
                    <AiFillCheckCircle className="text-green-600 text-sm mr-3" />{" "}
                    Active
                  </span>
                </div>
                <div className=" w-3/4 space-x-9 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#9AA1B0]">
                    Type of card:
                  </span>
                  <span className="text-lg w-1/2 font-bold text-[#191C1F]">
                    MasterCard
                  </span>
                </div>
                <div className="my-3 w-3/4 space-x-9 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#9AA1B0]">
                    Currency
                  </span>
                  <span className="text-lg w-1/2 font-bold text-[#191C1F]">
                    {currency}
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  onClick={ShowAlert}
                  className="w-max flex items-center gap-x-2 bg-blue-500 text-white font-normal text-base rounded-lg p-2"
                >
                  <AiOutlinePlus />
                  New Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
