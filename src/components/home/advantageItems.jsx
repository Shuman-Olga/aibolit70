export default function AdvantageItem(props) {
  return (
    <div className="col">
      <div className="card  h-100">
        <picture>
          <source
            srcSet={require(`../../assets/img/${props.data.img}.avif`)}
            type="image/avif"
          />
          <source
            srcSet={require(`../../assets/img/${props.data.img}.webp`)}
            type="image/webp"
          />
          <img
            src={require(`../../assets/img/${props.data.img}.png`)}
            className="card-img-top"
            alt="aibolit"
            title={props.data.title}
            loading="lazy"
            width={86}
            height={86}
          />
        </picture>

        <div className="card-body">
          <p className="card-text">{props.data.title}</p>
        </div>
      </div>
    </div>
  );
}
