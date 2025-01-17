import React from 'react';
import Purchase from './Purchase';

const App = () => {
  // Sample code to store users data in localStorage (simulating backend storage)
const usersData = {
  users: [
    { userId: 1, userName: "RajeshKumar", email: "rajesh.kumar@example.com", purchaseAmount: 150.50, referredBy: null },
      { userId: 2, userName: "PriyaSharma", email: "priya.sharma@example.com", purchaseAmount: 200.00, referredBy: 1, childNo: 1 },
      { userId: 3, userName: "AmitPatel", email: "amit.patel@example.com", purchaseAmount: 120.75, referredBy: 2, childNo: 1 },
      { userId: 4, userName: "NehaMehta", email: "neha.mehta@example.com", purchaseAmount: 180.20, referredBy: 3, childNo: 1 },
      { userId: 5, userName: "SureshIyer", email: "suresh.iyer@example.com", purchaseAmount: 220.00, referredBy: 4, childNo: 1 },
      { userId: 6, userName: "DivyaReddy", email: "divya.reddy@example.com", purchaseAmount: 135.50, referredBy: 5, childNo: 1 },
      { userId: 7, userName: "ArjunSingh", email: "arjun.singh@example.com", purchaseAmount: 250.00, referredBy: 6, childNo: 1 },
      { userId: 8, userName: "AnanyaGupta", email: "ananya.gupta@example.com", purchaseAmount: 190.25, referredBy: 7, childNo: 1 },
      { userId: 9, userName: "KarthikRao", email: "karthik.rao@example.com", purchaseAmount: 160.75, referredBy: 8, childNo: 1 },
      { userId: 10, userName: "SanjanaKrishnan", email: "sanjana.krishnan@example.com", purchaseAmount: 300.10, referredBy: 9, childNo: 1 },
      { userId: 11, userName: "VikramJoshi", email: "vikram.joshi@example.com", purchaseAmount: 210.00, referredBy: 10, childNo: 1 },
      { userId: 12, userName: "AditiVerma", email: "aditi.verma@example.com", purchaseAmount: 110.00, referredBy: 11, childNo: 1 },
      { userId: 13, userName: "RahulMalhotra", email: "rahul.malhotra@example.com", purchaseAmount: 175.50, referredBy: 12, childNo: 1 },
      { userId: 14, userName: "NikhilNair", email: "nikhil.nair@example.com", purchaseAmount: 195.80, referredBy: 13, childNo: 1 },
      { userId: 15, userName: "MeenakshiSundaram", email: "meenakshi.sundaram@example.com", purchaseAmount: 155.25, referredBy: 14, childNo: 1 },
      { userId: 88, userName: "ArunKumar", email: "arun.kumar@example.com", purchaseAmount: 175.50, referredBy: 15, childNo: 1 },
      { userId: 89, userName: "LakshmiPrasad", email: "lakshmi.prasad@example.com", purchaseAmount: 190.25, referredBy: 15, childNo: 2 },
      { userId: 90, userName: "RameshBabu", email: "ramesh.babu@example.com", purchaseAmount: 220.00, referredBy: 15, childNo: 3 },
      { userId: 91, userName: "SunitaRani", email: "sunita.rani@example.com", purchaseAmount: 165.75, referredBy: 15, childNo: 4 },
      { userId: 92, userName: "VinodKapoor", email: "vinod.kapoor@example.com", purchaseAmount: 185.50, referredBy: 15, childNo: 5 },
      { userId: 93, userName: "PreetiBhalla", email: "preeti.bhalla@example.com", purchaseAmount: 195.25, referredBy: 15, childNo: 6 },
      { userId: 94, userName: "DeepakSharma", email: "deepak.sharma@example.com", purchaseAmount: 205.00, referredBy: 15, childNo: 7 },
      { userId: 95, userName: "AnushkaIyer", email: "anushka.iyer@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 8 },
      { userId: 96, userName: "GauravChandran", email: "gaurav.chandran@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 9 },
      { userId: 97, userName: "SaritaMenon", email: "sarita.menon@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 10 },
      { userId: 98, userName: "MohitAgarwal", email: "mohit.agarwal@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 11 },
      { userId: 99, userName: "RenukaDesai", email: "renuka.desai@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 12 },
      { userId: 100, userName: "SandeepKumar", email: "sandeep.kumar@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 13 },
      { userId: 101, userName: "PoojaRathore", email: "pooja.rathore@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 14 },
      { userId: 102, userName: "AshishTiwari", email: "ashish.tiwari@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 15 },
      { userId: 103, userName: "ShwetaKamath", email: "shweta.kamath@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 16 },
      { userId: 104, userName: "RohitSingh", email: "rohit.singh@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 17 },
      { userId: 105, userName: "KavitaRao", email: "kavita.rao@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 18 },
      { userId: 106, userName: "ManishPillai", email: "manish.pillai@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 19 },
      { userId: 107, userName: "ShaliniReddy", email: "shalini.reddy@example.com", purchaseAmount: 215.75, referredBy: 15, childNo: 20 },
  ]
};

localStorage.setItem('users', JSON.stringify(usersData));
    
  return (
    <div>
      <h1>Welcome to Our Referral System</h1>
      <Purchase />
    </div>
  );
};

export default App;
