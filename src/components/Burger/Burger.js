import React from 'react';
import Ingredient from "./Ingredient/Ingredient";
import classes from './Burger.css';

const burger = (props) => {
    // const ingredientsArr = Object.keys(props.ingredients)
    //     .map(ingr => {
    //         return [...Array(props.ingredients[ingr])]
    //             .map((_, i) => {
    //                 return <Ingredient key={ingr + i} type={ingr} />
    //             })
    //     });
    let ingredientsArr = [];
    for (const ingr in props.ingredients) {
        for (let i = 0; i < props.ingredients[ingr]; i++) {
            ingredientsArr.push(<Ingredient key={ingr + i} type={ingr} />)
        }
    }
    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type='bread-top'/>
            {ingredientsArr}
            <Ingredient type='bread-bottom'/>
        </div>
    );
};

export default burger;