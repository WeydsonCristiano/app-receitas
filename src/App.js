import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeProvider from './context/recipeProvider';
import Chefs from './pages/Chefs';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/chefs" component={ Chefs } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
