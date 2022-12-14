import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }
  return (
    <div className="search-params">
      <div className="form-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestPets();
          }}
        >
          <label htmlFor="location">
            location
            <input
              id="location"
              value={location}
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={animal}
              onChange={(e) => {
                setAnimal(e.target.value);
                setBreed("");
              }}
              onBlur={(e) => {
                setAnimal(e.target.value);
                setBreed("");
              }}
            >
              <option />
              {ANIMALS.map((animal) => {
                return (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={breed}
              onChange={(e) => {
                setBreed(e.target.value);
              }}
              onBlur={(e) => {
                setBreed(e.target.value);
              }}
            >
              <option />
              {breeds.map((breed) => {
                return (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                );
              })}
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
