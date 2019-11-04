import {NextPage} from "next";
import React from "react";

import Link from "next/link";
import Button from "../components/button";

const MeetingRooms: NextPage = () => {
  return (
    <>
      <p>Meeting rooms</p>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </>
  );
};

export default MeetingRooms;