const LoginModal = () => {
  const login = (event) => {
    event.preventDefault();
    console.log('test');
    console.log(event);
  };

  return (
    <div className="LoginModal">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="text" placeholder="username" />
        <input type="password" id="pass" placeholder="password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginModal;
