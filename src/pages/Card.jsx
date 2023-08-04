export default function Card({ time }) {

if(!time) return null
  return (
    <section>
      <>
          <h3>{(time?.minutes + '').padStart(2, '0') || '00'}:{(time?.seconds + '').padStart(2, '0') || '00'}</h3>
      </>
    </section>
  );
}
