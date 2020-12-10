import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
    TextInput,
    TextArea
} from '../Utils/Form';

import {
    Ingredients,
    Directions
} from './components';

import history from '../../History';

const RecipeForm = () => {
    const params = useParams();
    const [recipe, setRecipe] = useState({});
    const handleInputChange = (e) => {
        const newRecipe = {...recipe};
        console.log(e)
        newRecipe[e.target.name] = e.target.value;
        setRecipe(newRecipe);
    }
    const handleCreate = () => {
        axios
            .post(`http://localhost:3001/recipes`, recipe)
            .then(res => handleSuccess("Successfully Created!"));
    }
    const handleUpdate = () => {
        axios
            .put(`http://localhost:3001/recipes/${params.uuid}`, recipe)
            .then(res => handleSuccess("Successfully Updated!"));
    }
    const handleSubmit = () => {
        if (recipe.uuid) handleUpdate();
        else handleCreate();
    }
    const handleSuccess = (message) => {
        alert(message);
        history.push('/');
    }

    useEffect(() => {
        if (params.uuid) {
            axios
                .get(`http://localhost:3001/recipes/${params.uuid}`)
                .then(res => res.data ? setRecipe(res.data) : {});
        }
    }, []);

    return (
        <div>
            <div className="container-1200 margin-auto-h pad-top-50 pad-bottom-50">
                <div className="txt-xlarge txt-bold txt-capitalize">
                    {params.action} Recipe
                </div>
                <div className="margin-top-20">
                    <TextInput
                        label="Title"
                        name="title"
                        value={ recipe.title }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                    />
                </div>
                <div className="margin-top-20">
                    <TextArea
                        label="Description"
                        name="description"
                        value={ recipe.description }
                        onChange={handleInputChange}
                    />
                </div>
                <div className="margin-top-20 grid grid-3 grid-gap-20">
                    <TextInput
                        label="Preparation Time"
                        name="prepTime"
                        numeric="decimal"
                        value={ recipe.prepTime }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                    />
                    <TextInput
                        label="Cooking Time"
                        name="cookTime"
                        value={ recipe.cookTime }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                    />
                    <TextInput
                        label="Servings"
                        name="servings"
                        numeric
                        value={ recipe.servings }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                    />
                </div>
                <Ingredients
                    data={ recipe.ingredients }
                    onChange={ value => handleInputChange({target: {name: "ingredients", value}}) }
                    onSubmit={ handleSubmit }
                />
                <Directions
                    data={ recipe.directions }
                    onChange={ value => handleInputChange({target: {name: "directions", value}}) }
                    onSubmit={ handleSubmit }
                />
                <div className="margin-top-50 flex space-between">
                    <Link
                        to="/"
                        className="btn btn-clear btn-pad-large txt-center txt-dark"
                    >
                        Cancel
                    </Link>
                    <button
                        className="btn btn-success btn-pad-large"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeForm;