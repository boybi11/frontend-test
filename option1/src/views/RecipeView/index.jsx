import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router';
import axios from 'axios';

import { Ingredient } from './components';

const ListView = () => {
    const [recipe, setRecipe] = useState(null);
    const [specials, setSpecials] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/recipes/${params.uuid}`)
                .then(res => res.data ? setRecipe(res.data) : {});

        axios
            .get(`http://localhost:3001/specials`)
                .then(res => res.data ? setSpecials(res.data) : {});
    }, []);
    
    return recipe ? (
        <div>
            <div className="container-1200 margin-auto-h pad-top-50 pad-bottom-50">
                <div className="margin-bottom-10">
                    <Link to="/" className="btn btn-clear-bordered-black txt-center">
                        Go Back
                    </Link>
                </div>
                <div style={{
                    backgroundImage: `url(${ recipe.images ? recipe.images.full : "https://picsum.photos/300/800" })`,
                    backgroundSize: "cover",
                    backggroundAttachment: "fixed",
                    height: 300
                }} />
                <div className="txt-header-2 txt-bold margin-top-30">
                    { recipe.title }
                </div>
                <div className="marign-top">
                    Posted on { moment(recipe.postDate, "MM/DD/YYYY hh:mm:ss A").format("MMM DD, YYYY hh:mm A") }
                </div>
                <div className="margin-top-50">
                    <div className="txt-bold txt-xlarge">
                        Description
                    </div>
                    <div className="txt-large margin-top-10">
                        { recipe.description }
                    </div>
                </div>
                <div className="txt-large">
                    <div className="margin-top-50">
                        <span className="txt-bold">Preparation:</span> { recipe.prepTime }mins
                    </div>
                    <div className="margin-top">
                        <span className="txt-bold">Cook Time:</span> { recipe.cookTime }mins
                    </div>
                    <div className="margin-top">
                        <span className="txt-bold">Servings:</span> { recipe.servings } pax
                    </div>
                </div>
                {
                    recipe.ingredients ? (
                        <div className="margin-top-50">
                            <div className="txt-bold txt-xlarge">
                                Ingredients
                            </div>
                            <div className="txt-large margin-top-10">
                                <ul>
                                    {
                                        recipe.ingredients.map(ing => (
                                            <li
                                                key={ing.uuid}
                                                className="margin-top"
                                            >
                                                <Ingredient
                                                    ingredient={ ing }
                                                    specials={ specials }
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    ) : null
                }
                {
                    recipe.directions ? (
                        <div className="margin-top-50">
                            <div className="txt-bold txt-xlarge">
                                Directions
                            </div>
                            <div className="txt-large margin-top-10">
                                <div>
                                    {
                                        recipe.directions.map((dir, index) => (
                                            <div
                                                key={`step${index + 1}`}
                                                className="margin-bottom-20"
                                            >
                                                <div className="txt-bold">
                                                    Step { index + 1 }: { dir.option ? "(optional)" : ''}
                                                </div>
                                                <div className="margin-top" >
                                                    { dir.instructions }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    ) : null
}

export default ListView;