import { useState } from 'react';

const TwoTierConcept = () => {
  const [userId, setUserId] = useState('user1');
  const [purchaseAmount, setPurchaseAmount] = useState('25');
  const [slots, setSlots] = useState([]); // To hold the slots and tiers

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

    // Add new user to the slots
    let newSlots = [...slots];

    // Create first slot if none exists
    if (newSlots.length === 0) {
      newSlots.push({
        tier1: [],
        tier2: [],
        activationFee
      });
    }

    // Always add new users to first slot's tier1
    let firstSlot = newSlots[0];

    // Handle Tier 1 filling (max 2 users)
    if (firstSlot.tier1.length < 2) {
      firstSlot.tier1.push(newUser);
    } else {
      // When Tier 1 is full (2 users), move them to Tier 2
      firstSlot.tier2.push(...firstSlot.tier1.map(user => ({
        ...user,
        status: 'Upgraded to Tier 2'
      })));
      firstSlot.tier1 = [newUser]; // Start new Tier 1 with new user

      // When Tier 2 is full (4 users), create new slot
      if (firstSlot.tier2.length >= 4) {
        if (newSlots.length >= 15) {
          alert('Maximum slot limit (15) reached');
          return;
        }

        // Calculate next slot's activation fee from current tier2's total upgradation fees
        const totalUpgradationFee = firstSlot.tier2.reduce((sum, user) => sum + user.upgradationFee, 0);

        // Move Tier 2 users to new slot's Tier 1
        const nextSlot = {
          tier1: firstSlot.tier2.map(user => ({
            ...user,
            activationFee: totalUpgradationFee / 4, // Divide equally among 4 users
            status: 'Moved to Next Slot'
          })),
          tier2: [],
          activationFee: totalUpgradationFee
        };
        newSlots.push(nextSlot);
        
        // Clear tier 2 of first slot
        firstSlot.tier2 = [];
      }
    }

    setSlots(newSlots);
  };

  // Render the slots and tiers in tables
  const renderSlots = () => {
    return slots.map((slot, slotIndex) => (
      <div key={slotIndex}>
        <h3>Slot {slotIndex + 1}</h3>

        <h4>Tier 1</h4>
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

        <h4>Tier 2</h4>
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
    ));
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
