
import { useFrame } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';

export default function WarpcastButton() {
  const { user, connect, disconnect, isConnected } = useFrame();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      console.log("User Data:", user);
    }
  }, [user]);

  return (
    <div style={{ padding: '10px', marginTop: '20px' }}>
      {!isConnected ? (
        <button onClick={connect} style={{ padding: '10px', fontSize: '16px' }}>
          Connect to Warpcast
        </button>
      ) : (
        <div>
          <p>Welcome, {user?.displayName}!</p>
          <button onClick={disconnect} style={{ padding: '10px', fontSize: '16px' }}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
    