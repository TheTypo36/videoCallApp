import React, { useEffect } from "react";
import { useSocket } from "../providers/Socket";
export default function Room() {
  const socket = useSocket();

  const handleNewUserJoined = (data) => {
    const { emailId } = data;
    console.log("first user have joined", emailId);
  };
  useEffect(() => {
    socket.on("user=joined", handleNewUserJoined);
  }, []);
  return (
    <div>
      <h1> room </h1>
    </div>
  );
}
