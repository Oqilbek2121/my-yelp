import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTableCard from "./services/AddTableCard";

function Dashboard() {
    // log out function
    const portal = useNavigate();
    const handleClick = () => {
        portal("/");
    }
    
    const [tableId, setTableId] = useState("");

    const getTableIdHandle = (id) => {
        console.log("The ID of document to be edited: ", id);
        setTableId(id);
    };

  return (
    <>
        <main className="main">
            <div className="dashboard text-light">
                <nav className="navbar bg-dark border-bottom border-light p-2">
                    <div className="container-fluid m-2">
                        <h5 className="card-title">My_Yelp</h5>
                        <div className="d-flex">
                            <button onClick={handleClick} class="btn btn-success">Log Out</button>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="restauraunt_input d-flex justify-content-center align-items-center p-4">
                        <AddCard id={tableId} setTableId={setTableId} />
                    </div>
                    <div className="restaurant_table p-2">
                        <AddTablesCard getTableId={getTableIdHandle} />
                    </div>
                </div>
            </div>
        </main>
    </>
  );
};

function AddCard({ id, setTableId }) {
    // add card function
    const [titleName, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    // const [message, setMessage] = useState({ error: false, msg: ""});

    const restaurantSubmit = async (e) => {
        e.preventDefault();
        // setMessage("");
        if(titleName === "" || description === "" || city === "") {
            // setMessage({ error: true, msg: "Iltimos to'ldiring"});
            alert("Please provide value in each input field");
            return;
        }
        const newRestaurant = {
            titleName,
            description,
            city
        }
        console.log(newRestaurant);
 
        try {
            if(id !== undefined && id !== "") {
                await AddTableCard.updateTable(id, newRestaurant); 
                setTableId("");
                // setMessage({ error: false, msg: "Updated Successfully!"});
            } else {
                await AddTableCard.addRestaurant(newRestaurant); 
                // setMessage({ error: false, msg: "New Restaurant Added Successfully!"});
                alert("New Restaurant Added Successfully! Click the refresh button.");
            }
        } catch(err) {
            // setMessage({ error: true, msg: err.message });
            alert(err);
        }

        setTitleName("");
        setDescription("");
        setCity("");
    };

    // edit button function
    // const editHandle = async () => {
    //     setMessage("");
    //     try {
    //         const docSnap = await AddTableCard.getTable(id);
    //         console.log("the record is :", docSnap.data());
    //         setTitleName(docSnap.data().titleName);
    //         setDescription(docSnap.data().description);
    //         setCity(docSnap.data().city);
    //     } catch (err) {
    //         setMessage({ error: true, msg: err.message });
    //     }
    // };

    // useEffect(() => {
    //     console.log("The id here is : ", id);
    //     if(id !== undefined && id !== "") {
    //         editHandle();
    //     };
    // }, [id]);

    return (
        <>
            <div class="card w-50 bg-dark bg-dark border border-light p-3">
                <form onSubmit={restaurantSubmit}>
                    <div class="form-floating mb-3">
                        <input onChange={(e) => setTitleName(e.target.value)} value={titleName} type="text" class="form-control bg-dark border border-light text-light" id="floatingInput" placeholder="Name" />
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" class="form-control bg-dark border border-light text-light" id="floatingPassword" placeholder="Description" />
                        <label for="floatingPassword">Description</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input onChange={(e) => setCity(e.target.value)} value={city} type="text" class="form-control bg-dark border border-light text-light" id="floatingPassword" placeholder="City" />
                        <label for="floatingPassword">City</label>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                        <button type="submit" class="btn btn-success m-1 w-100">Add New Restaurant</button>
                    </div>
                </form>
                {/* {message?.msg && (
                    <div class="alert alert-warning alert-dismissible fade show mt-3" onClose={() => setMessage("")} role="alert">
                        <p className="card-title">{message?.msg}</p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )} */}
            </div>
        </>
    );
};

function AddTablesCard() {
    // add table card function
    const [table, setTable] = useState([]);
    useEffect(() => {
        getTable();
    }, []);

    const getTable = async () => {
        const data = await AddTableCard.getAllTable();
        console.log(data.docs);
        setTable(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    // remove table card function
    const deleteHandle = async (id) => {
        await AddTableCard.deleteTable(id);
        getTable();
    }

    return (
        <>
            <button onClick={getTable} className="btn btn-success">Refresh</button>
            <table class="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">City</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {table.map((doc, index) => {
                        return(
                            <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{doc.titleName}</td>
                                    <td>{doc.description}</td>
                                    <td>{doc.city}</td>
                                    <td>
                                        <button onClick={(e) => deleteHandle(doc.id)} className="btn btn-danger"><ion-icon name="trash-outline"></ion-icon></button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                  </tbody>
            </table>
        </>
    );
};

export default Dashboard;
