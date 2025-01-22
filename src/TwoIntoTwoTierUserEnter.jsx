import axios from "axios";
import { useRef, useState } from "react";

const TwoIntoTwoTierUserEnter = () => {
  const userCountRef = useRef(0);
  const [purchaseAmount, setPurchaseAmount] = useState(25);
  const [activationFee, setActivationFee] = useState(purchaseAmount * 0.2);
  const [upgradationFee, setUpgradationFee] = useState(activationFee * 0.5);
  const [rebirthFee, setRebirthFee] = useState(activationFee * 0.2);
  const [totalNetReward, setTotalNetReward] = useState(activationFee * 0.3);
  const handleRegisterUser = async () => {
    userCountRef.current = userCountRef.current + 1;
    const userId = `user${userCountRef.current}`;
    const userName = `name${userCountRef.current}`;


    const payload = {
      purchaseAmount,
      activationFee,
      upgradationFee,
      rebirthFee,
      totalNetReward,
      userId,
      userName,
    };
    console.log(payload);

    try {
      const res= await axios.post("http://192.168.29.221:3000/api/add-user", payload);
      console.log(res.message)
    } catch (err) {
      console.log(err);
    }
  };

//   setInterval(() => {
//     handleRegisterUser()
//   }, 10);

  return (
    <>
      <div>
        <input type="text" placeholder="User ID" value={`user`} />
        <input type="text" placeholder="User Name" value={`name`} />
        <input
          type="number"
          placeholder="Purchase Amount"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Activation Fee"
          value={activationFee}
          onChange={(e) => setActivationFee(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Upgradation Fee"
          value={upgradationFee}
          onChange={(e) => setUpgradationFee(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Rebirth Fee"
          value={rebirthFee}
          onChange={(e) => setRebirthFee(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Total Net Reward"
          value={totalNetReward}
          onChange={(e) => setTotalNetReward(Number(e.target.value))}
        />
      </div>
      <button onClick={handleRegisterUser}>Register User</button>
    </>
  );
};

export default TwoIntoTwoTierUserEnter;
