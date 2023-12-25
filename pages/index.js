// Home.js
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState("");
  const [users, setUsers] = useState([]);

  const updateData = () => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  };

  useEffect(() => {
    updateData();
  }, []);

  const postHandler = async () => {
    const res = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify({ name, age, phone, email, address }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    updateData();
    console.log(data);
  };

  const detailsHandler = (id) => {
    fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  };

  const editHandler = (user) => {
    setEdit(user._id);
    setEmail(user.email);
    setName(user.name);
    setAge(user.age.toString());
    setPhone(user.phone);
    setAddress(user.address);
  };

  const deleteHandler = async (id) => {
    const res = await fetch(`/api/data/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    updateData();
    console.log(data);
  };

  const saveHandler = async (id) => {
    const res = await fetch(`/api/data/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name, age, address, phone, email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setEdit("");
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading1}>Connecting DataBase to Next.js Project!</h1>
      <h2 className={styles.heading2}>Methods POST - GET - EDIT - DELETE</h2>
      <div className={styles.inputContainer}>
        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.inputField}
        />
        <input
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={styles.inputField}
        />
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.inputField}
        />
        <div className={styles.buttonGroup}>
          <button onClick={postHandler} className={styles.button}>
            Post
          </button>
        </div>
      </div>
      <div>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user._id} className={styles.userItem}>
              <div>
                <h3>Name: {user.name}</h3>
                <button onClick={() => detailsHandler(user._id)} className={styles.buttonLog}>
                  Log Details
                </button>
                <button onClick={() => deleteHandler(user._id)} className={styles.buttonDelete} >Delete</button>
                <button onClick={() => editHandler(user)} className={styles.buttonEdit}>Edit</button>
                {edit && edit === user._id ? (
                  <div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.inputField}
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.inputField}
                    />
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={styles.inputField}
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.inputField}
                    />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={styles.inputField}
                    />
                    <button onClick={() => saveHandler(user._id)}>Save</button>
                  </div>
                ) : null}
              </div>
              Age: {user.age}, Phone: {user.phone}, Email: {user.email},
              Address: {user.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
