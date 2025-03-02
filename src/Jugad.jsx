import axios from "axios";
import { useEffect, useState } from "react";

const Jugad = () => {
  const [payload, setPayload] = useState({
    txResponse: {},
    amount: 10,
    walletAddress: "BlackAce1",
    walletName: "Safepal",
    referral: "",
    deviceId: "",
  });
  useEffect(() => {
    setPayload({
      ...payload,
      txResponse: {
        from: payload.walletAddress,
        to: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
        gasLimit: 34408,
        gasPrice: 1000000,
        hash: "0xc23e807f46d2611f78e636fb736fcf4734f952fbb2520f92265edeed58f5f31c",
        value: "0",
        _type: "TransactionResponse",
        amount: 10,
      },
    });
  }, []);
  const transactionHandler = async () => {
    try {
      const response = axios.post(
        "http://192.168.29.221:3000/api/wallet/register",
        payload
      );
      console.log(response);
      
      const currentNumber = parseInt(payload.walletAddress.match(/\d+/)[0]);
      
      const newWalletAddress = `BlackAce${currentNumber + 1}`;
      
      setPayload(prev => ({
        ...prev,
        walletAddress: newWalletAddress
      }));

    } catch (error) {
      console.error("Error during FDUSD payment:", error);
    }
  };
  return (
    <div>
      <div className="">
        <label htmlFor="" className="">
          Referral Code
        </label>
        <input
          type="text"
          onChange={(e) => setPayload({ ...payload, referral: e.target.value })}
          value={payload.referral}
        />
      </div>
      <div className="" style={{marginTop:"10px"}}>
        <label htmlFor="" className="">
          Wallet Address
        </label>
        <input
          type="text"
          onChange={(e) =>
            setPayload({ ...payload, walletAddress: e.target.value })
          }
          value={payload.walletAddress}
        />
      </div>
      <button style={{ marginTop: "10px", padding: "10px" , backgroundColor: "green", color: "white" }}  onClick={transactionHandler}>Submit</button>
    </div>
  );
};

export default Jugad;
