import React from "react";
import { produce } from "immer";
import { generate } from "shortid";

function App() {
  const [people, setPeople] = React.useState([
    {
      id: "5",
      firstName: "Lucas",
      lastName: "Lamas",
    },
  ]);

  const handleAddNewPerson = () => {
    setPeople((currentPeople) => [
      ...currentPeople,
      {
        id: generate(),
        firstName: "",
        lastName: "",
      },
    ]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleAddNewPerson}>add new person</button>
      {people.map((p, index) => (
        <div key={p.id}>
          <input
            value={p.firstName}
            type="text"
            placeholder="first name"
            onChange={(e) => {
              const firstName = e.target.value;
              setPeople((currentPeople) =>
                produce(currentPeople, (v) => {
                  v[index].firstName = firstName;
                })
              );
            }}
          />
          <input
            value={p.lastName}
            type="text"
            placeholder="last name"
            onChange={(e) => {
              const lastName = e.target.value;
              setPeople((currentPeople) =>
                produce(currentPeople, (v) => {
                  v[index].lastName = lastName;
                })
              );
            }}
          />
          <button
            onClick={() => {
              setPeople((currentPeople) =>
                currentPeople.filter((x) => x.id !== p.id)
              );
            }}
          >
            x
          </button>
        </div>
      ))}

      <pre
        style={{
          padding: 15,
          backgroundColor: "#f2f2f2",
          width: "30%",
          margin: "2rem auto",
          textAlign: "initial",
        }}
      >
        {JSON.stringify(people, null, 2)}
      </pre>
    </div>
  );
}

/*
  onChange={(e) => {
    const firstName = e.target.value;
    setPeople((currentPeople) =>
      currentPeople.map((x) =>
        x.id === p.id
          ? {
              firstName,
            }
          : x
      )
    );
  }}
*/

export default App;
