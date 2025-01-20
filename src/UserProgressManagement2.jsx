import { useState } from "react";

const UserProgressManagement2 = () => {
  const [slots, setSlots] = useState(
    Array.from({ length: 15 }, () => ({
      tier1: [],
      tier2: [],
    }))
  );

  const [userCounter, setUserCounter] = useState(1);
  const [completedUsers, setCompletedUsers] = useState([]);

  const moveUserToNextSlot = (user, currentSlotIndex, updatedSlots) => {
    const nextSlotIndex = currentSlotIndex + 1;
    
    if (nextSlotIndex >= 15) {
      // Move to completed status
      user.status = "completed";
      setCompletedUsers(prev => [...prev, user]);
      return;
    }

    const nextSlot = updatedSlots[nextSlotIndex];
    user.status = "waiting";

    // Double the activation fee when moving to the next slot
    user.activationFee = user.activationFee * 2;

    // Double the upgradation fee based on the updated activation fee
    user.upgradationFee = user.activationFee * 0.5;

    if (nextSlot.tier1.length < 2) {
      user.status = "waiting";
      nextSlot.tier1.push(user);
    } else {
      // Move oldest from tier1 to tier2
      const oldestTier1 = nextSlot.tier1.shift();
      oldestTier1.status = "waiting";
      nextSlot.tier2.push(oldestTier1);
      user.status = "waiting";
      nextSlot.tier1.push(user);

      // Check tier2 overflow
      const waitingInTier2 = nextSlot.tier2.filter(u => u.status === "waiting");
      if (waitingInTier2.length > 4) {
        const oldestWaitingIndex = nextSlot.tier2.findIndex(u => u.status === "waiting");
        const userToMove = nextSlot.tier2.splice(oldestWaitingIndex, 1)[0];
        moveUserToNextSlot(userToMove, nextSlotIndex, updatedSlots);
      }
    }
  };

  const addUser = () => {
    const userName = `User${userCounter}`;
    const purchaseAmount = 25;
    const activationFee = purchaseAmount * 0.2; // 20% of purchaseAmount
    const upgradationFee = activationFee * 0.5; // 50% of activationFee

    setUserCounter(userCounter + 1);

    const updatedSlots = [...slots];
    const firstSlot = updatedSlots[0];

    const newUser = { 
      userName, 
      status: "waiting", 
      purchaseAmount, 
      activationFee, 
      upgradationFee 
    };

    if (firstSlot.tier1.length < 2) {
      firstSlot.tier1.push(newUser);
    } else {
      // Move oldest from tier1 to tier2
      const oldestUser = firstSlot.tier1.shift();
      oldestUser.status = "waiting";
      firstSlot.tier2.push(oldestUser);
      firstSlot.tier1.push(newUser);

      // Check tier2 overflow
      const waitingInTier2 = firstSlot.tier2.filter(user => user.status === "waiting");
      if (waitingInTier2.length > 4) {
        const oldestWaitingIndex = firstSlot.tier2.findIndex(user => user.status === "waiting");
        const userToMove = firstSlot.tier2.splice(oldestWaitingIndex, 1)[0];
        moveUserToNextSlot(userToMove, 0, updatedSlots);
      }
    }

    setSlots(updatedSlots);
  };

  return (
    <div>
      <h2>User Progress Management</h2>
      <button onClick={addUser}>Create New User</button>

      <div>
        <h3>Slot Data</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Tier</th>
              <th>User Name</th>
              <th>Status</th>
              <th>Purchase Amount</th>
              <th>Activation Fee</th>
              <th>Upgradation Fee</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, slotIndex) => (
              <>
                {/* Render Tier 1 */}
                {slot.tier1.map((user, idx) => (
                  <tr key={`tier1-${slotIndex}-${idx}`}>
                    <td>{slotIndex + 1}</td>
                    <td>Tier 1</td>
                    <td>{user.userName}</td>
                    <td>{user.status}</td>
                    <td>${user.purchaseAmount}</td>
                    <td>${user.activationFee}</td>
                    <td>${user.upgradationFee}</td>
                  </tr>
                ))}
                {/* Render Tier 2 */}
                {slot.tier2.map((user, idx) => (
                  <tr key={`tier2-${slotIndex}-${idx}`}>
                    <td>{slotIndex + 1}</td>
                    <td>Tier 2</td>
                    <td>{user.userName}</td>
                    <td>{user.status}</td>
                    <td>${user.purchaseAmount}</td>
                    <td>${user.activationFee}</td>
                    <td>${user.upgradationFee}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {completedUsers.length > 0 && (
        <div>
          <h3>Completed Users</h3>
          <table border="1">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Status</th>
                <th>Purchase Amount</th>
                <th>Activation Fee</th>
                <th>Upgradation Fee</th>
              </tr>
            </thead>
            <tbody>
              {completedUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.userName}</td>
                  <td>{user.status}</td>
                  <td>{user.purchaseAmount}</td>
                  <td>{user.activationFee}</td>
                  <td>{user.upgradationFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProgressManagement2;
