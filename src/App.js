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

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
      <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
      <Route path="/meals/:id-da-receita/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ RecipeInProgress } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
