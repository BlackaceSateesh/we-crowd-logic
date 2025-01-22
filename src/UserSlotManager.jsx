import React, { useState } from "react";

const Team = ({ parent, users, status, purchaseAmount, activationFee, upgradeFee }) => (
  <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
    <h4>Admin: {parent}</h4>
    <h4>Status: {status}</h4>
    <p>Users: {users.join(", ")}</p>
    <p>Purchase Amount: {purchaseAmount}</p>
    <p>Activation Fee: {activationFee}</p>
    <p>Upgrade Fee: {upgradeFee}</p>
  </div>
);

const Plan = ({ planAmount, users }) => {
  const [tier1, setTier1] = useState([]);
  const [tier2, setTier2] = useState([]);
  const [admins, setAdmins] = useState([]);  // State to store Tier 1 admins
  const [tier2Admins, setTier2Admins] = useState([]); // New state for Tier 2 admins

  // Adds user to Tier 1 and automatically updates Tier 2
  const addUserToTier1 = () => {
    const teamIndex = tier1.length;
    const parent = teamIndex === 0 ? "admin" : users[teamIndex - 1];
    const nextUsers = users.slice(teamIndex * 2, (teamIndex + 1) * 2);
    console.log("parent", parent, "nextUsers", nextUsers)


    if (nextUsers.length === 2) {
      // Calculate purchase amounts and fees
      const purchaseAmount = 25;
      const activationFee = purchaseAmount * 0.2;
      const upgradeFee = activationFee * 0.5;


      // Update Tier 1 with new team
      setTier1([...tier1, { parent, users: nextUsers, status: "done", purchaseAmount, activationFee, upgradeFee }]);

      // Update admins array with new admin (parent of the team)
      const newAdmins = [...admins, parent];
      setAdmins(newAdmins);

      // Automatically add to Tier 2 if we have enough admins
      if (newAdmins.length >= 4) {
        addUserToTier2(newAdmins);
      }
    }
  };

  // Adds users to Tier 2 when there are enough admins
  const addUserToTier2 = (newAdmins) => {
    const teamIndex = tier2.length;
    const purchaseAmount = 25;
    const activationFee = purchaseAmount * 0.2;
    const upgradeFee = activationFee * 0.5;

    // Check if there are at least 4 admins to form a new team in Tier 2
    if (newAdmins.length >= (teamIndex + 1) * 4) {
      const nextUsers = users.slice(teamIndex * 4, (teamIndex + 1) * 4);  // Get next 4 users from the original users list
      const parent = teamIndex === 0 ? "admin" : newAdmins[teamIndex]; // Parent is either "admin" or the last admin of previous tier
      setTier2([...tier2, { parent, users: nextUsers, status: "done", purchaseAmount, activationFee, upgradeFee }]);

      // Update Tier 2 admins array and log it
      const newTier2Admins = [...tier2Admins, parent];
      setTier2Admins(newTier2Admins);
      console.log("Tier 2 Admins:", newTier2Admins);
    }
  };

  return (
    <>
      <div
        style={{
          margin: "20px",
          padding: "0 10px",
          maxHeight: "80vh",
          height: "fit-content",
          overflowY: "auto",
          border: "2px solid #000",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "#fff",
            zIndex: "1",
            padding: "10px",
          }}
        >
          <h3>Slot 1 - Tier 1</h3>
          <button
            style={{ backgroundColor: "#dad", padding: "10px", color: "#fff" }}
            onClick={addUserToTier1}
          >
            Add Team
          </button>
        </div>
        <div>
          {tier1.slice().reverse().map((team, index) => (
            <Team
              key={index}
              parent={team.parent}
              users={team.users}
              status={team.status}
              purchaseAmount={team.purchaseAmount}
              activationFee={team.activationFee}
              upgradeFee={team.upgradeFee}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          margin: "20px",
          padding: "0 10px",
          maxHeight: "80vh",
          height: "fit-content",
          overflowY: "auto",
          border: "2px solid #000",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "#fff",
            zIndex: "1",
            padding: "10px",
          }}
        >
          <h3>Slot 1 - Tier 2</h3>
        </div>
        <div>
          {tier2.slice().reverse().map((team, index) => (
            <Team
              key={index}
              parent={team.parent}
              users={team.users}
              status={team.status}
              purchaseAmount={team.purchaseAmount}
              activationFee={team.activationFee}
              upgradeFee={team.upgradeFee}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const UserSlotManager = () => {
  const [usersFor25] = useState([
    "user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", 
    "user11", "user12", "user13", "user14", "user15", "user16", "user17", "user18", "user19", "user20", 
    "user21", "user22", "user23", "user24", "user25", "user26", "user27", "user28", "user29", "user30", 
    "user31", "user32", "user33", "user34", "user35", "user36", "user37", "user38", "user39", "user40", 
    "user41", "user42", "user43", "user44", "user45", "user46", "user47", "user48", "user49", "user50",
    "user51", "user52", "user53", "user54", "user55", "user56", "user57", "user58", "user59", "user60",
    "user61", "user62", "user63", "user64", "user65", "user66", "user67", "user68", "user69", "user70",
    "user71", "user72", "user73", "user74", "user75", "user76", "user77", "user78", "user79", "user80",
    "user81", "user82", "user83", "user84", "user85", "user86", "user87", "user88", "user89", "user90",
    "user91", "user92", "user93", "user94", "user95", "user96", "user97", "user98", "user99", "user100",
    "user101", "user102", "user103", "user104", "user105", "user106", "user107", "user108", "user109", "user110",
    "user111", "user112", "user113", "user114", "user115", "user116", "user117", "user118", "user119", "user120",
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Plan planAmount={25} users={usersFor25} />
      </div>
    </div>
  );
};

export default UserSlotManager;
