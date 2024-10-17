import Animals from "@/page/Profile/Animals";

const AnimalsPage = ({ params }: { params: { id: string } }) => {
  return <Animals id={params.id} />
}

export default AnimalsPage;