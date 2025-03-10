import React, { useCallback, useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";
export default function Room() {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();
  const handleJoinNewUser = useCallback(
    async ({ emailId }) => {
      console.log("new user joined", emailId);

      const offer = await createOffer();

      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("incoming call from", from, offer);

      const ans = await createAnswer(offer);

      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;

      console.log("call got accepted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  useEffect(() => {
    socket.on("user-joined", handleJoinNewUser);
    socket.on("incoming-call", handleIncomingCall);

    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleJoinNewUser);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleCallAccepted, handleIncomingCall, handleJoinNewUser]);
  return (
    <div>
      <h1> room </h1>
    </div>
  );
}
