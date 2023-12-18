import { useState, useEffect } from "react";
import {
    CheckUser,
    getToken,
    getUserData,
    invalidateSession,
} from "../SessionHelper";

const Dashboard = () => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataNote, setDataNote] = useState([]);
    const [dataById, setDatabyId] = useState([]);

    const getDatabyId = async (id) => {
        return await fetch(`http://localhost:3001/notes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
            },
        })
            .then((reply) => {
                return reply.json();
            })
            .then((reply) => {
                console.log(reply);
                setLoading(false);
                setDatabyId(reply);
            })
            .catch((err) => {
                setMsg("❌  Error occurred");
                setLoading(false);
            });
    };

    const updateDataNote = async (id, title, content, date, color) => {
        await fetch(`http://localhost:3001/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
            },
            body: JSON.stringify({
                title,
                content,
                date,
                color,
            }),
        })
            .then((reply) => {
                return reply.json();
            })
            .then((reply) => {
                console.log(reply);
                setLoading(false);
            })
            .catch((err) => {
                setMsg("❌  Error occurred");
                setLoading(false);
            });
    };

    const deleteDataNote = async (id) => {
        await fetch(`http://localhost:3001/notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
            },
        })
            .then((reply) => {
                return reply.json();
            })
            .then((reply) => {
                console.log(reply);
                setLoading(false);
                window.location.reload();
            })
            .catch((err) => {
                setMsg("❌  Error occurred");
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!loading) return;

        fetch("http://localhost:3001/notes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
            },
            body: JSON.stringify({
                title,
                content,
                date,
                color,
            }),
        })
            .then((reply) => {
                return reply.json();
            })
            .then((reply) => {
                console.log(reply);
                setLoading(false);
            })
            .catch((err) => {
                setMsg("❌  Error occurred");
                setLoading(false);
            });
    }, [loading]);

    useEffect(() => {
        fetch("http://localhost:3001/notes/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
            },
        })
            .then((reply) => {
                return reply.json();
            })
            .then((reply) => {
                console.log(reply);
                setDataNote(reply);
                setLoading(false);
            })
            .catch((err) => {
                setMsg("❌  Error occurred");
                setLoading(false);
            });
    }, []);

    return (
        <>
            <CheckUser red />
            <div className="w-[80%] mx-auto">
                <div>{getUserData.username}</div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true);
                    }}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label>Title</label>
                        <input
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="border border-cyan-900"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>content</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            cols="30"
                            rows="10"
                            className="border border-cyan-900"
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Date</label>
                        <input
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className="border border-cyan-900"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Color</label>
                        <select
                            name="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="border border-cyan-900"
                        >
                            <option value="" disabled>
                                {" "}
                                --- Pilih ---
                            </option>
                            <option value="HIJAU">HIJAU</option>
                            <option value="BEIGE">BEIGE</option>
                            <option value="PUTIH">PUTIH</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="bg-slate-500">
                            SUBMIT
                        </button>
                    </div>
                </form>

                <div className="mt-10">
                    {dataNote.length != 0 &&
                        dataNote.map(
                            (
                                { title, content, color, date, createdAt, id },
                                index
                            ) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 mt-10 border border-black "
                                    >
                                        <input
                                            type="text"
                                            defaultValue={id}
                                            onChange={(e) =>
                                                setId(e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            defaultValue={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                        <textarea
                                            type="text"
                                            defaultValue={content}
                                            onChange={(e) =>
                                                setContent(e.target.value)
                                            }
                                        />
                                        <select
                                            name="color"
                                            value={color}
                                            onChange={(e) =>
                                                setColor(e.target.value)
                                            }
                                            className="border border-cyan-900"
                                        >
                                            <option value={color} disabled>
                                                {" "}
                                                {color}
                                            </option>
                                            <option value="HIJAU">HIJAU</option>
                                            <option value="BEIGE">BEIGE</option>
                                            <option value="PUTIH">PUTIH</option>
                                        </select>
                                        <input
                                            name="date"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                            type="date"
                                        />
                                        <button
                                            onClick={() => {
                                                deleteDataNote(id);
                                            }}
                                            className="bg-red-400"
                                        >
                                            delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                updateDataNote(
                                                    id,
                                                    title,
                                                    content,
                                                    date,
                                                    color
                                                );
                                            }}
                                            className="bg-red-400"
                                        >
                                            update
                                        </button>
                                    </div>
                                );
                            }
                        )}

                    <div className="flex flex-col gap-2 mt-10">
                        <label>Ambil data by Id</label>
                        <input
                            name="id"
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                            className="border border-cyan-900"
                        />
                        <button
                            onClick={() => {
                                getDatabyId(id);
                            }}
                            type="submit"
                            className="bg-blue-600"
                        >
                            get data Id
                        </button>
                        <div className="bg-slate-300 ">
                            <h1>{dataById.id}</h1>
                            <h1>{dataById.title}</h1>
                            <p>{dataById.content}</p>
                            <p>{dataById.color}</p>
                            <p>{dataById.date}</p>
                            <p>{dataById.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => {
                    invalidateSession();
                    window.location.reload();
                }}
            >
                logout
            </button>
        </>
    );
};

export default Dashboard;
