const LoginModal = () => (
  <div className="LoginModal">
    <h1>Login</h1>
    <form action="POST">
      <input type="text" placeholder="username" />
      <input type="password" id="pass" placeholder="password" />
    </form>
  </div>
);

export default LoginModal;
