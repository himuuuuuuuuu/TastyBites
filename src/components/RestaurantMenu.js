import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { RestaurantMenuShimmer } from "./Shimmer";
import { IMG_CDN_URL } from "../config";

const RestaurantMenu = () => {
  const params = useParams();
  const { resId } = params;

  const restaurantInfo = useRestaurantInfo(resId);

  return !restaurantInfo ? (
    <RestaurantMenuShimmer />
  ) : (
    <div className="w-full text-white bg-yellow-400 flex items-center justify-center">
      <img
        src={IMG_CDN_URL + restaurantInfo.cloudinaryImageId}
        alt=""
        srcset=""
      />
      <h1>{restaurantInfo.name}</h1>
    </div>
  );
};

export default RestaurantMenu;
