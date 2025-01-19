import { useState } from 'react';

const TwoTierConcept = () => {
  const [userId, setUserId] = useState('user');
  const [purchaseAmount, setPurchaseAmount] = useState(25);
  const [slots, setSlots] = useState([]); // To hold the slots and tiers
  const [completedUsers, setCompletedUsers] = useState([]); // To hold users who completed slot 15

  // Function to calculate financial details for a new user
  const calculateFinancials = (amount) => {
    const activationFee = amount * 0.20;
    const upgradationFee = activationFee * 0.50; // 50% of activationFee
    const rebirthDeduction = activationFee * 0.20; // 20% of activationFee
    const totalNetReward = activationFee * 0.30; // 30% of activationFee
    return { activationFee, upgradationFee, rebirthDeduction, totalNetReward };
  };

  // Function to add a user to the slots and tiers
  const addUser = () => {
    if (!userId || !purchaseAmount) {
      alert('Please enter both User ID and Purchase Amount');
      return;
    }

    const amount = parseFloat(purchaseAmount);
    const { activationFee, upgradationFee, rebirthDeduction, totalNetReward } = calculateFinancials(amount);

    // Create the user object
    const newUser = {
      userId,
      purchaseAmount: amount,
      activationFee,
      upgradationFee,
      rebirthDeduction,
      totalNetReward,
      status: 'New',
    };

    let newSlots = [...slots];

    // If no slots exist, create Slot 1
    if (newSlots.length === 0) {
      newSlots.push({
        tier1: [],
        tier2: [],
        activationFee,
      });
    }

    // Get first slot
    let firstSlot = newSlots[0];

    // If Tier 1 has less than 2 users, add to Tier 1
    if (firstSlot.tier1.length < 2) {
      firstSlot.tier1.push(newUser);
      newUser.status = 'Waiting in Tier 1';
    } else {
      // Tier 1 is full, move users to Tier 2
      if (firstSlot.tier2.length < 4) {
        // Move Tier 1 users to Tier 2
        firstSlot.tier2.push(...firstSlot.tier1.map(user => ({
          ...user,
          status: 'Moved to Tier 2'
        })));
        // Clear Tier 1 and add new user
        firstSlot.tier1 = [newUser];
        newUser.status = 'Waiting in Tier 1';
      } else {
        // If first slot is full, create or find next slot
        if (newSlots.length === 1) {
          newSlots.push({
            tier1: [],
            tier2: [],
            activationFee: 0
          });
        }

        // Move users from first slot's Tier 2 to second slot's Tier 1
        const secondSlot = newSlots[1];
        const usersToMoveToTier1 = firstSlot.tier2.splice(0, 2);
        secondSlot.tier1.push(...usersToMoveToTier1.map(user => ({
          ...user,
          status: 'Moved to Next Slot Tier 1'
        })));

        // Move remaining users to second slot's Tier 2
        const remainingUsers = firstSlot.tier2;
        secondSlot.tier2.push(...remainingUsers.map(user => ({
          ...user,
          status: 'Moved to Next Slot Tier 2'
        })));

        // Clear first slot's Tier 2
        firstSlot.tier2 = [];

        // Move current Tier 1 users to Tier 2
        firstSlot.tier2 = firstSlot.tier1.map(user => ({
          ...user,
          status: 'Moved to Tier 2'
        }));

        // Add new user to Tier 1
        firstSlot.tier1 = [newUser];
        newUser.status = 'Waiting in Tier 1';
      }
    }

    setSlots(newSlots);

    // Calculate and log total users
    let totalUsers = 0;
    newSlots.forEach(slot => {
      totalUsers += slot.tier1.length + slot.tier2.length;
    });
    totalUsers += completedUsers.length;
    console.log('Total number of users:', totalUsers);
  };

  // Render the slots and tiers in tables
  const renderSlots = () => {
    return (
      <>
        {slots.map((slot, slotIndex) => (
          <div key={slotIndex}>
            <h3>Slot {slotIndex + 1}</h3>

            <h4>Tier 1 (Max 2 Users)</h4>
            <table border="1">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Purchase Amount</th>
                  <th>Activation Fee</th>
                  <th>Upgradation Fee</th>
                  <th>Rebirth Deduction</th>
                  <th>Total Net Reward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {slot.tier1.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.userId}</td>
                    <td>{user.purchaseAmount.toFixed(2)}</td>
                    <td>{user.activationFee.toFixed(2)}</td>
                    <td>{user.upgradationFee.toFixed(2)}</td>
                    <td>{user.rebirthDeduction.toFixed(2)}</td>
                    <td>{user.totalNetReward.toFixed(2)}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4>Tier 2 (Max 4 Users)</h4>
            <table border="1">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Purchase Amount</th>
                  <th>Activation Fee</th>
                  <th>Upgradation Fee</th>
                  <th>Rebirth Deduction</th>
                  <th>Total Net Reward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {slot.tier2.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.userId}</td>
                    <td>{user.purchaseAmount.toFixed(2)}</td>
                    <td>{user.activationFee.toFixed(2)}</td>
                    <td>{user.upgradationFee.toFixed(2)}</td>
                    <td>{user.rebirthDeduction.toFixed(2)}</td>
                    <td>{user.totalNetReward.toFixed(2)}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {completedUsers.length > 0 && (
          <div>
            <h3>Completed Users (Finished Slot 15)</h3>
            <table border="1">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Purchase Amount</th>
                  <th>Activation Fee</th>
                  <th>Upgradation Fee</th>
                  <th>Rebirth Deduction</th>
                  <th>Total Net Reward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedUsers.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.userId}</td>
                    <td>{user.purchaseAmount.toFixed(2)}</td>
                    <td>{user.activationFee.toFixed(2)}</td>
                    <td>{user.upgradationFee.toFixed(2)}</td>
                    <td>{user.rebirthDeduction.toFixed(2)}</td>
                    <td>{user.totalNetReward.toFixed(2)}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="two-tier-concept">
      <h1>Two Tier Concept - User Management</h1>

      {/* User input form */}
      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Amount"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Display slots and tiers */}
      <h2>Slot Data</h2>
      {renderSlots()}
    </div>
  );
};

export default TwoTierConcept;
