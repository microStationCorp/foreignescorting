
export default function Test() {
  const getData = () => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <div>test page</div>
      <button onClick={getData}>get</button>
    </>
  );
}
