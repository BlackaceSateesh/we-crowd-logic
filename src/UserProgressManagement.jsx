import { useState } from "react";

const UserProgressManagement = () => {
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
    setUserCounter(userCounter + 1);

    const updatedSlots = [...slots];
    const firstSlot = updatedSlots[0];

    if (firstSlot.tier1.length < 2) {
      firstSlot.tier1.push({ userName, status: "waiting" });
    } else {
      // Move oldest from tier1 to tier2
      const oldestUser = firstSlot.tier1.shift();
      oldestUser.status = "waiting";
      firstSlot.tier2.push(oldestUser);
      firstSlot.tier1.push({ userName, status: "waiting" });

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
        {slots.map((slot, index) => (
          <div key={index}>
            <h3>Slot {index + 1}</h3>
            <div>
              <h4>Tier 1:</h4>
              {slot.tier1.length === 0
                ? "No Users"
                : slot.tier1.map((user, idx) => (
                    <p key={idx}>{user.userName} - {user.status}</p>
                  ))}
            </div>
            <div>
              <h4>Tier 2:</h4>
              {slot.tier2.length === 0
                ? "No Users"
                : slot.tier2.map((user, idx) => (
                    <p key={idx}>{user.userName} - {user.status}</p>
                  ))}
            </div>
          </div>
        ))}
      </div>

      {completedUsers.length > 0 && (
        <div>
          <h3>Completed Users</h3>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {completedUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.userName}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProgressManagement;
