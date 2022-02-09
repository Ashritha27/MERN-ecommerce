function Rating(props){
    const { ratings,numReviews} = props;

    return (
        <div>
        <div className="rating">
            <span>
            <i className={ratings >= 1 ? "fas fa-star" : ratings >= 0.5 ?"fas fa-star-half" :"far fa-star"}></i>
            </span>
            <span>
            <i className={ratings >= 2 ? "fas fa-star" : ratings >= 1.5 ?"fas fa-star-half" :"far fa-star"}></i>
            </span>
            <span>
            <i className={ratings >= 3 ? "fas fa-star" : ratings >= 2.5 ?"fas fa-star-half" :"far fa-star"}></i>
            </span>
            <span>
            <i className={ratings >= 4 ? "fas fa-star" : ratings >= 3.5 ?"fas fa-star-half" :"far fa-star"}></i>
            </span>
            <span>
            <i className={ratings >= 5 ? "fas fa-star" : ratings >= 4.5 ?"fas fa-star-half" :"far fa-star"}></i>
            </span>
            </div>
            <span>{numReviews} reviews</span>
        </div>
    )
}

export default Rating;
