import bgImg from "../assets/bg_bggenerator_com.jpg"

const BgDiv = ({children}) => {
  return (
    <div
      className=" min-h-screen min-w-max"
      style={{ backgroundImage: `${bgImg}`, backgroundSize: "cover" }}
    >
      {children}
    </div>
  );
}

export default BgDiv