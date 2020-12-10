import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, deleteCallback }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm("Are you sure you want to delete this?")) {
            axios
                .delete(`http://localhost:3001/recipes/${ recipe.uuid }`)
                .then(res => {
                    alert("Delete successfull!");
                    deleteCallback();
                })
        }
    }

    return (
        <div  className="card clickable">
            <div>
                <img
                    className="img img-cover"
                    src={ recipe.images ? recipe.images.small : 'https://picsum.photos/200/300'}
                    style={{
                        width: "100%",
                        height: 200
                    }}
                />
            </div>
            <div className="pad-20">
                <div className="txt-bold txt-medium-large">
                    { recipe.title }
                </div>
                <div className="margin-top-20">
                    Preparation: { recipe.prepTime }mins
                </div>
                <div>
                    Cook Time: { recipe.cookTime }mins
                </div>
                <div>
                    Servings: { recipe.servings } pax
                </div>
            </div>
            <div className="margin-top-20 flex flex-end pad-20">
                <button
                    onClick={ handleDelete }
                    className="btn btn-clear-bordered-red btn-width-auto txt-small"
                >
                    Delete
                </button>
                <Link
                    to={`/recipe/edit/${ recipe.uuid }`}
                    className="btn btn-clear-bordered-green btn-width-auto txt-small margin-left-20"
                >
                    Edit
                </Link>
            </div>
        </div>
    )
};

export { RecipeCard };