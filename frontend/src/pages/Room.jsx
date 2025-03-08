import React, { useCallback, useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";
export default function Room() {
  const socket = useSocket();
  const { peer, createOffer } = usePeer();
  const handleJoinNewUser = useCallback(
    async ({ emailId }) => {
      console.log("new user joined", emailId);

      const offer = await createOffer();

      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback((data) => {
    const { from, offer } = data;
    console.log("incoming call from", from, offer);
  }, []);
  useEffect(() => {
    socket.on("user-joined", handleJoinNewUser);
    socket.on("incoming-call", handleIncomingCall);
  }, [socket]);
  return (
    <div>
      <h1> room </h1>
    </div>
  );
}
