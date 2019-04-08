const LoginModal = () => (
  <div className="LoginModal">
    <h1>Login</h1>
    <form action="POST" target="/api/auth">
      <input type="text" placeholder="username" />
      <input type="password" id="pass" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default LoginModal;
