import React from 'react';

function UserList({ users }) {
  return (
    <div id="user-list">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(users).map(([username, userData]) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{userData.position_x}</td>
              <td>{userData.position_y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
