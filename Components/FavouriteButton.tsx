import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/Hooks/useCurrentUser";
import useFavourites from "@/Hooks/useFavourites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();
  const isFavourites = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourites = useCallback(async () => {
    let response;
    if (isFavourites) {
      response = await axios.delete("api/favourite", { data: { movieId } });
    } else {
      response = await axios.post("api/favourite", { movieId });
    }

    const updatedFavouriteIds = response?.data?.favouriteIds;

    mutate({
      ...currentUser,
      favouriteIds: updatedFavouriteIds,
    });
    mutateFavourites();
  }, [movieId, isFavourites, currentUser, mutate, mutateFavourites]);

  const Icon = isFavourites ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavourites}
      className="cursor-pointer w-6 h-6 group/item lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon
        className="text-white"
        size={25}
      />
    </div>
  );
};

export default FavouriteButton;
