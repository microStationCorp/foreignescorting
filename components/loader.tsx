import ReactLoading, { LoadingType } from "react-loading";

function Loader({ type, color }: { type: LoadingType; color: string }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactLoading type={type} color={color} width={100} height={200} />
      </div>
    </>
  );
}

export default Loader;
