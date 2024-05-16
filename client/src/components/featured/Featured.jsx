import useFetch from '../../hooks/useFetch.js';
import './featured.css';

import ImgHN from '../../asset/CityImage/HaNoi.jpg';
import ImgHCM from '../../asset/CityImage/HCM.jpg';
import ImgDN from '../../asset/CityImage/DaNang.jpg';

const Featured = () => {
    const { data, isLoading, error } = useFetch('/hotel/find/countByCity?cities=HaNoi,HoChiMinh,DaNang');
    
    return (
        <div className="featured">
            {error && <h1>City Not Found</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <div className="featuredItem">
                        <img src={ImgHN} alt="HN" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Hà Nội</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>

                    <div className="featuredItem">
                        <img src={ImgHCM} alt="HCM" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Hồ Chí Minh</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src={ImgDN} alt="DN" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Đà Nẵng</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Featured;
