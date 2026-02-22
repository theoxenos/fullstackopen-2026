const LoginForm = ({ onLoginFormSubmit }) => (
    <form onSubmit={onLoginFormSubmit}>
        <div>
            <label htmlFor="username">Username </label>
            <input type="text" placeholder="Username" id="username" name="username" />
        </div>
        <div>
            <label htmlFor="password">Password </label>
            <input type="password" placeholder="Password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
    </form>
);

export default LoginForm;
