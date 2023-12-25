import React from "react";
import connectDB from "../utils/connectDB";
import User from "../models/User";

function ssg({users}) {
    console.log(users);
  return <div>ssg</div>;
}

export default ssg;

export async function getStaticProps() {
  try {
    await connectDB();
    const users = await User.find();
    return {
      props: { users: JSON.parse(JSON.stringify(users)) },
    };
  } catch (error) {
    return {
      NotFound: true,
    };
  }
}
