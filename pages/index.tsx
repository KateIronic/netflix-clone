import useCurrentUser from "@/Hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Navbar from "@/Components/Navbar";
import Billboard from "@/Components/Billboard";
import MovieList from "@/Components/MovieList";
import useMovieList from "@/Hooks/useMovieList";
import useFavourites from "@/Hooks/useFavourites";
import InfoModal from "@/Components/InfoModal";
import useInfoModal from "@/Hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
      />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList
          title="Trending Now"
          data={movies}
        />
        <MovieList
          title="My List"
          data={favourites}
        />
      </div>
    </>
  );
};

export default Home;
function useInfoModalStore(): { isOpen: any; closeModal: any } {
  throw new Error("Function not implemented.");
}
