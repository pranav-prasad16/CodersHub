import React, { useEffect } from 'react';
import { useState } from 'react';
import profileImg from './../assets/logo/profile-user.png';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('UserId');
  const token = localStorage.getItem('Token');

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://codershub-api.onrender.com/api/profile/' + userId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${token}`,
          },
        }
      );
      const json = response.json();
      console.log(json);
      setUserInfo(json);
      setLoading(false);
    } catch (error) {
      console.log('Error : ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // if (!userName || !email || !password) {
  //   return <h2>User not Found</h2>;
  // }

  return (
    <>
      {loading ? (
        <div className="container">Loading ...</div>
      ) : (
        <div className="container">
          <h1>Profile</h1>
          <div className="profile-info">
            <img src={profileImg} alt="profile-photo" className="logo" />
            <h5>Name : {userInfo.userName}</h5>
            <h5>Email : {userInfo.email}</h5>
            <h5>Password : {userInfo.password}</h5>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
