import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { RecipeCard } from './components';

const ListView = () => {
    const [recipes, setRecipes] = useState([]);
    const getList = () => {
        axios
            .get('http://localhost:3001/recipes')
            .then(res => res.data ? setRecipes(res.data) : {})
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div>
            <div className="container-1200 margin-auto-h pad-top-50 pad-bottom-50">
                <div className="flex space-between align-center">
                    <div className="txt-header-2 txt-bold">
                        Recipes
                    </div>
                    <div>
                        <Link
                            to="/recipe/create"
                            className="btn btn-pad-large btn-success txt-center"
                        >
                            Create
                        </Link>
                    </div>
                </div>
                <div className="margin-top-20 grid grid-3 grid-gap-20">
                    {
                        recipes.map(recipe => (
                            <div key={ recipe.uuid } >
                                <Link to={`/recipe/view/${ recipe.uuid }`}>
                                    <RecipeCard
                                        recipe={ recipe }
                                        deleteCallback={getList}
                                    />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ListView;