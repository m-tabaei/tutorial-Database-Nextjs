import React from "react";
import connectDB from "../utils/connectDB";
import User from "../models/User";

function ssr({users}) {
    console.log(users)
  return <div>ssr</div>;
}

export default ssr;

export async function getServerSideProps(){
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