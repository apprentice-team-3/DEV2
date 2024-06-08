export default function PDCAList({ pdcaList }) {
  return (
    <>
      {pdcaList &&
        pdcaList.map((item) => {
          <div key={item.doneName}>おっす</div>;
        })}
    </>
  );
}
