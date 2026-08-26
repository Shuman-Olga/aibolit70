import OptimizedImage from "../common/OptimizedImage";

export default function AdvantageItem(props) {
  return (
    <div className="col">
      <div className="card  h-100">
        <OptimizedImage
          src={`${props.data.img}.png`}
          alt={props.data.title}
          title={props.data.title}
          loading="lazy"
          width={86}
          height={86}
          className="card-img-top"
        />

        <div className="card-body">
          <p className="card-text">{props.data.title}</p>
        </div>
      </div>
    </div>
  );
}
