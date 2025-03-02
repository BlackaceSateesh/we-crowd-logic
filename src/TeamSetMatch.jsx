import React, { useState, useEffect } from 'react';

const TeamSetMatch = () => {
    const [team, setTeam] = useState([]); // Array to store all teams
    const [left, setLeft] = useState([]); // Left team users
    const [right, setRight] = useState([]); // Right team users
    const [userCount, setUserCount] = useState(0); // Track user ID

    // Function to add user to the left team
    const setLeftUser = () => {
        const newUser = {
            username: `User${userCount + 1}`,
            userId: userCount + 1,
        };
        setLeft((prev) => [...prev, newUser]);
        setUserCount(userCount + 1); // Increment userId for the next user
    };

    // Function to add user to the right team
    const setRightUser = () => {
        const newUser = {
            username: `User${userCount + 1}`,
            userId: userCount + 1,
        };
        setRight((prev) => [...prev, newUser]);
        setUserCount(userCount + 1); // Increment userId for the next user
    };

    // Function to create teams based on user count (first team 2:1 or 1:2, then sequential pairing)
    const createTeam = () => {
        if (team.length === 0) {
            // First team: Check if there are 2 users on one side and 1 on the other side
            if ((left.length === 2 && right.length === 1) || (right.length === 2 && left.length === 1)) {
                // Create and store the first team
                setTeam((prev) => [
                    ...prev,
                    { left: [...left], right: [...right] },
                ]);
                console.log('Creating first team with the following users:');
                console.log('Left Team:', left);
                console.log('Right Team:', right);

                // Reset teams after creating the first team
                setLeft([]); // Clear left team
                setRight([]); // Clear right team
            }
        } else {
            // Subsequent teams: Match users at the same index from left and right
            const teamCount = Math.min(left.length, right.length);
            const newTeams = [];

            for (let i = 0; i < teamCount; i++) {
                const newTeam = {
                    left: [left[i]],  // Take user from the same index in the left team
                    right: [right[i]],  // Take user from the same index in the right team
                };
                newTeams.push(newTeam);
            }

            setTeam((prev) => [...prev, ...newTeams]);  // Append newly created teams
        }
    };

    // Check and create teams whenever left or right side changes
    useEffect(() => {
        createTeam();
    }, [left, right]);

    return (
        <div>
            <button onClick={setLeftUser}>Add left user</button>
            <button onClick={setRightUser}>Add right user</button>

            <div>
                <h3>Left Team:</h3>
                <ul>
                    {left.map((user) => (
                        <li key={user.userId}>{user.username}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Right Team:</h3>
                <ul>
                    {right.map((user) => (
                        <li key={user.userId}>{user.username}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Teams Created:</h3>
                <ul>
                    {team.map((t, index) => (
                        <li key={index}>
                            <strong>Team {index + 1}:</strong>
                            <br />
                            Left: {t.left.map((user) => user.username).join(', ')}
                            <br />
                            Right: {t.right.map((user) => user.username).join(', ')}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeamSetMatch;
