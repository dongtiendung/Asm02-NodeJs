import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import './featuredProperties.css';

const FeaturedProperties = () => {
    const { data, isLoading, error } = useFetch('/hotel/find/topRate');

    return (
        <div className="fp">
            {error && <h1>Hotel Not Found</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    {data &&
                        data.map((hotel, i) => (
                            <div className="fpItem" key={i}>
                                <img src={hotel?.photos[i]} alt="" className="fpImg" />
                                <span className="fpName">
                                    <Link to={`./hotels/${hotel?._id}`}>{hotel?.name}</Link>
                                </span>
                                <span className="fpCity">{hotel?.city}</span>
                                <span className="fpPrice">Starting from ${hotel?.cheapestPrice}</span>
                                <div className="fpRating">
                                    <button>{hotel?.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default FeaturedProperties;
