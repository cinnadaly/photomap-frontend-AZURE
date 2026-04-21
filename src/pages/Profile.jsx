function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/me", {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error");
                return res.json();
            })
            .then(meData => {
                return fetch(
                    `https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/users/${meData.id}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
            })
            .then(res => {
                if (!res.ok) throw new Error("Error /users/id");
                return res.json();
            })
            .then(userRes => {
                const fullUser = userRes.data;

                setUser(fullUser);

                setFormData({
                    name: fullUser.name || "",
                    lastname: fullUser.lastname || "",
                    email: fullUser.email || "",
                    username: fullUser.username || "",
                    password: ""
                });

                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDeleteAccount = () => {
        console.log("account deleted")
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const myAction = async () => {
        const dataToSend = { ...formData };

        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        const response = await fetch(
            `https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/users/${user.id}`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            }
        );

        if (response.ok) {
            alert("user updated");
        }
    };

    // ✅ TODO ESTO VA DENTRO
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>Unable to load user</p>;
    }

    return (
        <div className='home-component'>
            <div className="profile-wrapper">
                <div className="profile-card p-4">

                    <div className="text-center mb-4">
                        <h4 className="fw-bold">@{user.username}</h4>
                    </div>

                    <div className="mb-4">
                        <div className="section-title">Edit Profile</div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            await myAction();
                        }}>

                            <div className="row mb-3">
                                <div className="col">
                                    <input name='name' value={formData.name}
                                        onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col">
                                    <input name='lastname' value={formData.lastname}
                                        onChange={handleChange} className="form-control" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <input name='email' value={formData.email}
                                    onChange={handleChange} className="form-control" />
                            </div>

                            <div className="mb-3">
                                <input name='username' value={formData.username}
                                    onChange={handleChange} className="form-control" />
                            </div>

                            <div className="mb-3">
                                <input name='password' type="password"
                                    value={formData.password}
                                    onChange={handleChange} className="form-control" />
                            </div>

                            <button type="submit" className="btn btn-dark w-100">
                                Update Profile
                            </button>

                        </form>
                    </div>

                    <div className="text-center">
                        <button onClick={handleDeleteAccount}
                            type="button"
                            className="btn btn-outline-danger">
                            Deactivate My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;