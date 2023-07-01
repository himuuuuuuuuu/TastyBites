import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { RestaurantMenuShimmer } from "./Shimmer";
import { IMG_CDN_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import { FaLocationDot } from "react-icons";

const RestaurantMenu = () => {
  const cartItems = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const checkItemInCart = (id) => {
    return cartItems.some((item) => {
      return item?.id == id;
    });
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleAdd = (item) => {
    dispatch(addItem(item));
  };

  const params = useParams();
  const { resId } = params;

  const restaurantInfo = useRestaurantInfo(resId);

  console.log("restaurantInfo");
  console.log(restaurantInfo);

  const info = restaurantInfo?.cards[0]?.card?.card?.info;

  console.log("info");
  console.log(info);

  const recommended =
    restaurantInfo?.cards[restaurantInfo.cards.length - 1]?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

  console.log("recommended");
  console.log(recommended);

  return !restaurantInfo ? (
    <RestaurantMenuShimmer />
  ) : (
    <div className="w-2/3 mx-auto h-auto border border-slate-300 font-Poppins lg:w-4/5 md:w-11/12 sm:w-full">
      <div className="flex justify-between items-start p-6">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold break-words text-[#282C3F]">
            {info.name.toUpperCase()}
          </span>
          <span className="text-[13px] text-[#686b78]">
            S{info.cuisines.join(", ")}
          </span>
          <span className="text-[13px] text-[#686b78]">
            {info.areaName}, {info.city}
            {/* <FaLocationDot /> */}
          </span>
          <span className="text-[13px] text-[#686b78] flex gap-1 items-center">
            {info.avgRating} <FaStar className="text-green-500" /> |{" "}
            {info.totalRatings / 1000}K+ ratings
          </span>
        </div>
        <img
          src={IMG_CDN_URL + info.cloudinaryImageId}
          alt="Food Image"
          className="w-60 h-36 rounded-md sm:w-40 sm:h-24"
        />
      </div>
      <hr className="mx-6" />
      <div className="h-14 flex items-center justify-start gap-8 px-7">
        <div>{info.sla.slaString}</div>
        <div>{info.costForTwoMessage}</div>
      </div>
      <hr className="mx-6" />
      <div className="h-14 pl-7 flex items-center text-xl font-bold break-words text-[#282C3F]">
        Recommended({recommended?.length})
      </div>
      {recommended?.map((recRes) => {
        return (
          <div key={recRes?.card?.info?.id}>
            <div className="flex justify-between px-7 my-6 border-black bottom-1 font-Poppins sm:flex-row-reverse sm:px-3 sm:text-xs">
              <div className="flex flex-col gap-2 md:gap-5">
                <h1 className="text-base font-semibold">
                  {recRes?.card?.info?.name}
                </h1>
                <h2 className="text-base flex items-center">
                  {recRes?.card?.info?.price / 100}{" "}
                  <FaIndianRupeeSign className="text-xs" />
                </h2>
                <p className="text-xs text-[#535665] sm:hidden">
                  {recRes?.card?.info?.description}
                </p>
              </div>
              <div className="text-center flex flex-col gap-2  items-center justify-center">
                {recRes?.card?.info?.imageId == undefined ? (
                  <img
                    src="https://placehold.co/128x80"
                    alt="Food Image"
                    className="w-32 h-20 rounded-md"
                  />
                ) : (
                  <img
                    src={IMG_CDN_URL + recRes?.card?.info?.imageId}
                    alt="Food Image"
                    className="w-32 h-20 rounded-xl"
                  />
                )}

                {(result = checkItemInCart(recRes?.card?.info?.id))}
                {result ? (
                  <button
                    className="h-7 w-28 rounded-sm font-semibold shadow-lg text-xs bg-red-400 flex items-center justify-center gap-2 transition-all"
                    onClick={() => handleRemove(recRes?.card?.info?.id)}
                  >
                    <FaShoppingCart /> Remove
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleAdd(recRes?.card?.info);
                    }}
                    className="h-7 w-28 rounded-sm font-semibold shadow-lg text-xs bg-green-300  flex items-center justify-center gap-1 transition-all"
                  >
                    <FaShoppingCart /> ADD TO CART
                  </button>
                )}
              </div>
            </div>
            <hr className="mx-8" />
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
